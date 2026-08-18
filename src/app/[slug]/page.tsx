import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { Crumb } from "@/components/crumb";
import { FaqList } from "@/components/faq-list";
import { GrowthChart } from "@/components/growth-chart";
import { JsonLd } from "@/components/json-ld";
import { composeCommercial } from "@/lib/compose/commercial";
import { commercialBySlug, commercialPages } from "@/lib/data/commercial";
import { faqNode, organizationNode } from "@/lib/seo/schema";
import { site } from "@/lib/site";
import { sideStock, stockForCluster, STOCK } from "@/lib/stock";

export const dynamicParams = true;

export function generateStaticParams() {
  return commercialPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const record = commercialBySlug(slug);
  if (!record) return {};
  const page = composeCommercial(record);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${record.slug}` },
  };
}

export default async function CommercialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const record = commercialBySlug(slug);
  if (!record) notFound();
  const page = composeCommercial(record);
  const hero = stockForCluster(record.cluster);
  const side = sideStock(record.cluster);
  const extra = record.cluster === "website" ? STOCK.team : STOCK.handshake;

  return (
    <article className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            organizationNode(),
            faqNode(page.faqs),
            {
              "@type": "Service",
              name: record.keyword,
              description: page.description,
              provider: { "@id": `${site.url}/#org` },
              areaServed: "Worldwide",
              url: `${site.url}/${record.slug}`,
            },
          ],
        }}
      />
      <Crumb
        items={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { label: record.keyword },
        ]}
      />
      <header className="mt-6 grid items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-mono text-xs text-[var(--mark)]">
            {record.intent.toUpperCase()} · {record.cluster.toUpperCase()}
          </p>
          <h1 className="mt-3 max-w-[18ch] text-4xl leading-[1.08] tracking-tight md:text-5xl">{record.h1}</h1>
          <p className="mt-5 max-w-[46ch] text-lg text-[var(--muted)]">{page.lede}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex bg-[var(--accent)] px-5 py-3 text-sm text-[var(--paper)]"
          >
            {site.cta.label}
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--paper-2)] md:col-span-6">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </header>

      <GrowthChart />

      <div className="mt-16 grid gap-4 md:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--paper-2)]">
          <Image src={side.src} alt={side.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--paper-2)]">
          <Image src={extra.src} alt={extra.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>

      <div className="mt-14 max-w-[68ch]">
        {page.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-2xl tracking-tight">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="mt-4 text-[var(--muted)] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <section className="mt-14 max-w-[68ch]">
        <h2 className="text-2xl tracking-tight">Questions</h2>
        <div className="mt-4">
          <FaqList items={page.faqs} />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl">Related buyer pages</h2>
        <ul className="mt-4 columns-1 gap-6 md:columns-2">
          {page.related.map((href) => (
            <li key={href} className="mb-2">
              <Link href={href}>{href.replace(/^\//, "").replace(/-/g, " ")}</Link>
            </li>
          ))}
          <li className="mb-2">
            <Link href="/guides/seo-vs-geo-vs-aeo">SEO vs GEO vs AEO</Link>
          </li>
        </ul>
      </section>

      <section className="mt-16 grid gap-10 border-t border-[var(--line)] pt-16 md:grid-cols-2">
        <div>
          <h2 className="text-2xl">Hire Meridian for {record.keyword.toLowerCase()}</h2>
          <p className="mt-3 text-[var(--muted)]">
            Global English-speaking market. Local pages when the city matters. Audit, implementation, or a full website build.
          </p>
        </div>
        <ContactForm />
      </section>
    </article>
  );
}
