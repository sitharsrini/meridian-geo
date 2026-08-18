import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { industries, industryBySlug, locations, topics } from "@/lib/catalog";
import { composeIndustryHub } from "@/lib/compose/hubs";
import { faqNode, organizationNode } from "@/lib/seo/schema";
import { site } from "@/lib/site";
import { imageFor } from "@/lib/hash";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry: slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) return {};
  const hub = composeIndustryHub(industry);
  return {
    title: `${industry.name} SEO, AEO, and GEO`,
    description: hub.description,
  };
}

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
  const { industry: slug } = await params;
  const industry = industryBySlug(slug);
  if (!industry) notFound();
  const hub = composeIndustryHub(industry);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [organizationNode(), faqNode(hub.faqs)],
        }}
      />
      <header className="grid items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <h1 className="text-4xl tracking-tight">{industry.name} search help</h1>
          <p className="mt-4 max-w-[42ch] text-lg text-[var(--muted)]">{hub.lede}</p>
          <Link href="/contact" className="mt-8 inline-flex bg-[var(--accent)] px-5 py-3 text-sm text-[var(--paper)]">
            {site.cta.label}
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--paper-2)] md:col-span-6">
          <Image
            src={imageFor(industry.slug)}
            alt={`${industry.name} field`}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </header>

      <div className="mt-12 max-w-[68ch]">
        {hub.sections.map((section) => (
          <section key={section.heading} className="mt-10">
            <h2 className="text-2xl">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 text-[var(--muted)] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <section className="mt-12 max-w-[68ch]">
        <h2 className="text-2xl">Questions</h2>
        <div className="mt-4">
          <FaqList items={hub.faqs} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl">Start with a guide</h2>
        <div className="mt-5 columns-1 gap-6 md:columns-2">
          {topics.slice(0, 12).map((topic) => (
            <p key={topic.slug} className="mb-2 text-sm">
              <Link href={`/blog/${topic.slug}/${industry.slug}`}>{topic.title}</Link>
            </p>
          ))}
        </div>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl">Cities</h2>
        <div className="mt-5 columns-2 md:columns-4">
          {locations.slice(0, 20).map((location) => (
            <p key={location.slug} className="mb-2 text-sm">
              <Link href={`/locations/${location.slug}`}>{location.name}</Link>
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
