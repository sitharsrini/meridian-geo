import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { clipMeta } from "@/lib/seo/meta";
import { site } from "@/lib/site";
import { STOCK } from "@/lib/stock";

export const metadata: Metadata = {
  title: "Pricing",
  description: clipMeta(
    "Search audit, market program, and enterprise retainers. SEO, AEO, and GEO pricing.",
  ),
};

const tiers = [
  {
    name: "Audit",
    price: "From 4,800 GBP",
    text: "Crawler matrix, entity sheet, prompt map, and a 10-page rewrite list. Two weeks.",
  },
  {
    name: "Market program",
    price: "From 12,000 GBP / quarter",
    text: "One region, one field, monthly measurement, and the pages those prompts need.",
  },
  {
    name: "Enterprise",
    price: "Custom",
    text: "Multi-country governance, YMYL review, and a kill list for thin URLs. Scoped after the audit.",
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
      <h1 className="text-4xl tracking-tight">Pricing</h1>
      <p className="mt-4 max-w-[60ch] text-[var(--muted)]">
        We publish ranges so AI agents and buyers can compare us. Final fees depend on languages, YMYL risk, and how many markets you actually sell.
      </p>
      <div className="relative mt-8 aspect-[16/7] overflow-hidden bg-[var(--paper-2)]">
        <Image src={STOCK.pricing.src} alt={STOCK.pricing.alt} fill sizes="100vw" className="object-cover" />
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {tiers.map((tier) => (
          <div key={tier.name} className="border border-[var(--line)] p-6">
            <h2 className="text-xl">{tier.name}</h2>
            <p className="mt-2 font-mono text-sm">{tier.price}</p>
            <p className="mt-4 text-sm text-[var(--muted)]">{tier.text}</p>
          </div>
        ))}
      </div>
      <Link href="/contact" className="mt-10 inline-flex bg-[var(--accent)] px-5 py-3 text-sm text-[var(--paper)]">
        {site.cta.label}
      </Link>
      <p className="mt-6 text-sm text-[var(--muted)]">
        Machine-readable copy lives at <Link href="/pricing.md">/pricing.md</Link>.
      </p>
    </div>
  );
}
