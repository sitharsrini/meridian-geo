import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/contact-form";
import { clipMeta } from "@/lib/seo/meta";
import { site } from "@/lib/site";
import { STOCK } from "@/lib/stock";

export const metadata: Metadata = {
  title: "Book a search audit",
  description: clipMeta(
    "Book a Meridian search audit. SEO, AEO, and GEO. We reply in two working days.",
  ),
};

export default function ContactPage() {
  return (
    <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-12 md:grid-cols-2 md:px-8">
      <div>
        <h1 className="text-4xl tracking-tight">Book a search audit</h1>
        <p className="mt-4 max-w-[46ch] text-[var(--muted)]">
          Send the queries and prompts that already start deals. We come back with a crawl check, an answer map, and the first pages that should rank and get cited.
        </p>
        <div className="relative mt-8 aspect-[16/10] overflow-hidden bg-[var(--paper-2)]">
          <Image src={STOCK.handshake.src} alt={STOCK.handshake.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <dl className="mt-8 space-y-3 text-sm">
          <div>
            <dt className="text-[var(--muted)]">Email</dt>
            <dd>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </dd>
          </div>
          <div>
            <dt className="text-[var(--muted)]">Phone</dt>
            <dd>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            </dd>
          </div>
          {site.offices.map((office) => (
            <div key={office.city}>
              <dt className="text-[var(--muted)]">{office.city}</dt>
              <dd>
                {office.address}, {office.postal}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <ContactForm />
    </div>
  );
}
