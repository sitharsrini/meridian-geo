import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/lib/catalog";
import { clipMeta } from "@/lib/seo/meta";
import { STOCK } from "@/lib/stock";

export const metadata: Metadata = {
  title: "SEO, AEO, and GEO services",
  description: clipMeta(
    "All Meridian services: SEO, AEO, and GEO. Rank, win short answers, and get named in AI search.",
  ),
};

const families = [
  { key: "seo", label: "SEO" },
  { key: "local", label: "Local and international" },
  { key: "aeo", label: "AEO" },
  { key: "geo", label: "GEO" },
  { key: "field", label: "By field" },
] as const;

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
      <h1 className="text-4xl tracking-tight">Services</h1>
      <p className="mt-4 max-w-[62ch] text-[var(--muted)]">
        We help you show up on Google, win the short answer at the top, and get named when people ask AI tools. Fifty services. Each one has a page in 200 cities.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          { href: "/seo-agency", title: "SEO", photo: STOCK.seo },
          { href: "/geo-agency", title: "GEO / AEO", photo: STOCK.geo },
          { href: "/website-development-agency", title: "Website", photo: STOCK.website },
        ].map((item) => (
          <Link key={item.href} href={item.href} className="border border-[var(--line)] bg-white">
            <div className="relative aspect-[16/10] overflow-hidden bg-[var(--paper-2)]">
              <Image src={item.photo.src} alt={item.photo.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
            <p className="p-4 text-lg">{item.title}</p>
          </Link>
        ))}
      </div>
      {families.map((family) => (
        <section key={family.key} className="mt-12">
          <h2 className="text-2xl tracking-tight">{family.label}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((service) => service.family === family.key)
              .map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`} className="border border-[var(--line)] p-5">
                  <h3 className="text-lg">{service.name}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{service.summary}</p>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
