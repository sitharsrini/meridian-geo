import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { Coords } from "@/components/coords";
import { Crumb } from "@/components/crumb";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import {
  getLanding,
  nearbyLocations,
  priorityLandings,
  relatedServices,
} from "@/lib/catalog";
import { composeLanding } from "@/lib/compose/landing";
import { landingGraph } from "@/lib/seo/schema";
import { site } from "@/lib/site";

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  return priorityLandings(process.env.NODE_ENV === "development" ? 8 : 80);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; location: string }>;
}): Promise<Metadata> {
  const { service, location } = await params;
  const pair = getLanding(service, location);
  if (!pair) return {};
  const page = composeLanding(pair.service, pair.location);
  const path = `/geo/${pair.service.slug}/${pair.location.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: path },
    openGraph: {
      title: page.title,
      description: page.description,
      url: path,
      images: [page.image],
    },
  };
}

export default async function GeoPage({
  params,
}: {
  params: Promise<{ service: string; location: string }>;
}) {
  const { service: serviceSlug, location: locationSlug } = await params;
  const pair = getLanding(serviceSlug, locationSlug);
  if (!pair) notFound();
  const page = composeLanding(pair.service, pair.location);
  const related = relatedServices(page.service);
  const nearby = nearbyLocations(page.location);

  return (
    <article className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
      <JsonLd data={landingGraph(page)} />
      <Crumb
        items={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { href: `/services/${page.service.slug}`, label: page.service.name },
          { label: page.location.name },
        ]}
      />

      <header className="mt-8 grid items-end gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="font-mono text-xs tracking-[0.16em] text-[var(--mark)]">
            {page.location.country.toUpperCase()}
          </p>
          <h1 className="mt-3 max-w-[18ch] text-4xl leading-[1.08] tracking-tight md:text-5xl">{page.h1}</h1>
          <p className="mt-5 max-w-[42ch] text-lg text-[var(--muted)]">{page.lede}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex bg-[var(--accent)] px-5 py-3 text-sm text-[var(--paper)]"
          >
            {site.cta.label}
          </Link>
        </div>
        <div className="md:col-span-5">
          <div className="relative aspect-[16/10] overflow-hidden bg-[var(--paper-2)]">
            <Image
              src={page.image}
              alt={`${page.service.name} in ${page.location.name}`}
              fill
              priority
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <Coords lat={page.location.lat} lng={page.location.lng} label={page.location.name} />
        </div>
      </header>

      <div className="mt-16 max-w-[68ch]">
        {page.sections.map((section) => (
          <Reveal key={section.heading}>
            <section className="mt-12 first:mt-0">
              <h2 className="text-2xl tracking-tight">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="mt-4 text-[var(--muted)] leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </section>
          </Reveal>
        ))}

        <Reveal>
          <section className="mt-12">
            <h2 className="text-2xl tracking-tight">What comes in the pack</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
              {page.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
              <li>Visible FAQ, matching schema, sitemap entry, and llms.txt update</li>
            </ul>
          </section>
        </Reveal>
      </div>

      <Reveal>
        <section className="mt-16">
          <h2 className="text-2xl tracking-tight">Questions people ask</h2>
          <div className="mt-6 max-w-[68ch]">
            <FaqList items={page.faqs} />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-16 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl tracking-tight">Related services</h2>
            <ul className="mt-4 space-y-2">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={`/geo/${item.slug}/${page.location.slug}`}>
                    {item.name} in {page.location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl tracking-tight">Nearby cities</h2>
            <ul className="mt-4 space-y-2">
              {nearby.map((item) => (
                <li key={item.slug}>
                  <Link href={`/geo/${page.service.slug}/${item.slug}`}>
                    {page.service.name} in {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-16 grid gap-10 border-t border-[var(--line)] pt-16 md:grid-cols-2">
          <div>
            <h2 className="text-2xl tracking-tight">Book a {page.location.name} audit</h2>
            <p className="mt-3 text-[var(--muted)]">
              Written by {page.author.name}, {page.author.role}. Reviewed by {page.reviewer.name}. Updated {page.updated}.
            </p>
          </div>
          <ContactForm defaultService={page.service.slug} defaultCity={page.location.name} />
        </section>
      </Reveal>
    </article>
  );
}
