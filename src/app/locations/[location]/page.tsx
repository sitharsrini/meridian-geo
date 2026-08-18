import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Coords } from "@/components/coords";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { locationBySlug, locations, services } from "@/lib/catalog";
import { composeLocationHub } from "@/lib/compose/hubs";
import { imageFor } from "@/lib/hash";
import { faqNode, organizationNode } from "@/lib/seo/schema";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map((location) => ({ location: location.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location: slug } = await params;
  const location = locationBySlug(slug);
  if (!location) return {};
  const hub = composeLocationHub(location);
  return {
    title: `SEO, AEO, and GEO in ${location.name}`,
    description: hub.description,
  };
}

export default async function LocationPage({ params }: { params: Promise<{ location: string }> }) {
  const { location: slug } = await params;
  const location = locationBySlug(slug);
  if (!location) notFound();
  const image = imageFor(location.slug);
  const hub = composeLocationHub(location);

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [organizationNode(), faqNode(hub.faqs)],
        }}
      />
      <p className="font-mono text-xs text-[var(--mark)]">{location.continent.toUpperCase()}</p>
      <h1 className="mt-3 text-4xl tracking-tight">Search help in {location.name}</h1>
      <p className="mt-4 max-w-[42ch] text-lg text-[var(--muted)]">{hub.lede}</p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--paper-2)]">
          <Image src={image} alt={`${location.name} market`} fill sizes="50vw" className="object-cover" />
        </div>
        <dl className="grid grid-cols-2 content-start gap-4 text-sm">
          <div>
            <dt className="text-[var(--muted)]">Country</dt>
            <dd>{location.country}</dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">Currency</dt>
            <dd>{location.currency}</dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">Languages</dt>
            <dd>{location.languages.join(", ")}</dd>
          </div>
          <div>
            <Coords lat={location.lat} lng={location.lng} label="Coordinates" />
          </div>
        </dl>
      </div>
      <Link href="/contact" className="mt-8 inline-flex bg-[var(--accent)] px-5 py-3 text-sm text-[var(--paper)]">
        {site.cta.label}
      </Link>

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

      <section className="mt-14 max-w-[68ch]">
        <h2 className="text-2xl">Questions</h2>
        <div className="mt-4">
          <FaqList items={hub.faqs} />
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-2xl">Services in {location.name}</h2>
        <div className="mt-5 columns-1 gap-6 md:columns-2">
          {services.map((service) => (
            <p key={service.slug} className="mb-2 text-sm">
              <Link href={`/geo/${service.slug}/${location.slug}`}>
                {service.name} in {location.name}
              </Link>
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
