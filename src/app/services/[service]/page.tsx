import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { locations, serviceBySlug, services } from "@/lib/catalog";
import { composeServiceHub } from "@/lib/compose/hubs";
import { faqNode, organizationNode } from "@/lib/seo/schema";
import { site } from "@/lib/site";
import { stockForFamily } from "@/lib/stock";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  const hub = composeServiceHub(service);
  return {
    title: service.name,
    description: hub.description,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = serviceBySlug(slug);
  if (!service) notFound();
  const hub = composeServiceHub(service);
  const photo = stockForFamily(service.family);

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
          <p className="font-mono text-xs text-[var(--mark)]">{service.family.toUpperCase()}</p>
          <h1 className="mt-3 max-w-[16ch] text-4xl tracking-tight">{service.name}</h1>
          <p className="mt-5 max-w-[42ch] text-lg text-[var(--muted)]">{hub.lede}</p>
          <Link href="/contact" className="mt-8 inline-flex bg-[var(--accent)] px-5 py-3 text-sm text-[var(--paper)]">
            {site.cta.label}
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--paper-2)] md:col-span-6">
          <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </header>

      <div className="mt-14 max-w-[68ch]">
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

      <section className="mt-14">
        <h2 className="text-2xl">Choose a city</h2>
        <p className="mt-3 max-w-[62ch] text-[var(--muted)]">
          Each city page is written for that market. Open one below or see the full list of 200 cities.
        </p>
        <div className="mt-5 columns-2 gap-6 md:columns-4">
          {locations.slice(0, 40).map((location) => (
            <p key={location.slug} className="mb-2 text-sm">
              <Link href={`/geo/${service.slug}/${location.slug}`}>{location.name}</Link>
            </p>
          ))}
        </div>
        <Link href="/locations" className="mt-4 inline-block text-sm text-[var(--mark)]">
          All 200 cities
        </Link>
      </section>

      <section className="mt-14 max-w-[68ch]">
        <h2 className="text-2xl">Questions</h2>
        <div className="mt-4">
          <FaqList items={hub.faqs} />
        </div>
      </section>

      <section className="mt-16 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl">Start with this service</h2>
          <p className="mt-3 text-[var(--muted)]">{service.whoFor}</p>
        </div>
        <ContactForm defaultService={service.slug} />
      </section>
    </div>
  );
}
