import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { industries } from "@/lib/catalog";
import { clipMeta } from "@/lib/seo/meta";
import { STOCK } from "@/lib/stock";

export const metadata: Metadata = {
  title: "Fields",
  description: clipMeta(
    "Search help by field. Healthcare, law, SaaS, retail, and more. SEO, AEO, and GEO on the same pages.",
  ),
};

export default function IndustriesPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
      <h1 className="text-4xl tracking-tight">Fields</h1>
      <p className="mt-4 max-w-[60ch] text-[var(--muted)]">
        Search changes by risk. A clinic page is not a SaaS page. SEO, AEO, and GEO still share the same rules of proof.
      </p>
      <div className="relative mt-8 aspect-[16/7] overflow-hidden bg-[var(--paper-2)]">
        <Image src={STOCK.city.src} alt={STOCK.city.alt} fill sizes="100vw" className="object-cover" />
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <Link key={industry.slug} href={`/industries/${industry.slug}`} className="border border-[var(--line)] p-5">
            <h2 className="text-lg">{industry.name}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{industry.proof}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
