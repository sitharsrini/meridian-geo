import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { Crumb } from "@/components/crumb";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { composeGuide } from "@/lib/compose/guides";
import { guideBySlug, guides } from "@/lib/data/guides";
import { articleGraph } from "@/lib/seo/schema";
import { reviewer } from "@/lib/catalog";
import { site } from "@/lib/site";
import { stockForGuide } from "@/lib/stock";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const record = guideBySlug(slug);
  if (!record) return {};
  const page = composeGuide(record);
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/guides/${record.slug}` },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const record = guideBySlug(slug);
  if (!record) notFound();
  const page = composeGuide(record);
  const photo = stockForGuide(record.slug);

  return (
    <article className="mx-auto max-w-[820px] px-4 py-10">
      <JsonLd
        data={articleGraph({
          slug: `guides/${record.slug}`,
          topic: { slug: record.slug, title: record.title, angle: "explainer", summary: record.summary, questions: [] },
          industry: {
            slug: "business",
            name: "Business",
            ymyl: false,
            buyer: "founders and marketing leads",
            risk: "Buying the wrong slice of search.",
            queryExamples: [record.title.toLowerCase()],
            proof: "A written plan and dated pages.",
          },
          location: {
            slug: "global",
            name: "Global",
            country: "Worldwide",
            countryCode: "UN",
            continent: "Global",
            region: "Global",
            population: "English-speaking markets",
            languages: ["English"],
            currency: "USD / GBP / EUR",
            industries: ["search", "websites"],
            searchLanguage: "English",
            lat: 0,
            lng: 0,
          },
          title: record.title,
          description: page.description,
          h1: record.h1,
          lede: page.lede,
          sections: page.sections,
          faqs: page.faqs,
          author: {
            slug: "leila-rahman",
            name: "Leila Rahman",
            role: "Head of search",
            credentials: "SEO, AEO, and GEO",
            bio: "",
            focus: [],
          },
          reviewer,
          published: "2026-08-01",
          updated: "2026-08-18",
          readingMinutes: 6,
          image: photo.src,
          sources: [],
        })}
      />
      <Crumb
        items={[
          { href: "/", label: "Home" },
          { href: "/guides/seo-vs-geo-vs-aeo", label: "Guides" },
          { label: record.title },
        ]}
      />
      <h1 className="mt-8 text-4xl leading-[1.12] tracking-tight">{record.h1}</h1>
      <p className="mt-5 text-lg text-[var(--muted)]">{page.lede}</p>
      <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-[var(--paper-2)]">
        <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 820px) 820px, 100vw" className="object-cover" />
      </div>

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

      <section className="mt-12">
        <h2 className="text-2xl">Questions</h2>
        <div className="mt-4">
          <FaqList items={page.faqs} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl">Hire the work</h2>
        <p className="mt-3 text-[var(--muted)]">
          <Link href="/seo-agency">SEO agency</Link>, <Link href="/geo-agency">GEO agency</Link>,{" "}
          <Link href="/aeo-agency">AEO agency</Link>, or{" "}
          <Link href="/website-development-agency">website development</Link>.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
        <p className="mt-4 text-sm text-[var(--muted)]">{site.cta.label} from this page.</p>
      </section>
    </article>
  );
}
