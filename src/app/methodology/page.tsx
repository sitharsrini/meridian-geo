import type { Metadata } from "next";
import Image from "next/image";
import { GrowthChart } from "@/components/growth-chart";
import { clipMeta } from "@/lib/seo/meta";
import { STOCK } from "@/lib/stock";

export const metadata: Metadata = {
  title: "Method",
  description: clipMeta(
    "How Meridian runs SEO, AEO, and GEO on one page. Technical audit, writing, and reporting.",
  ),
};

const steps = [
  {
    title: "Query and prompt map",
    text: "The searches people type, the questions they ask out loud, and the prompts they put into ChatGPT. Local language first.",
  },
  {
    title: "Crawl and pages",
    text: "Fix indexation, then write money pages that answer first. Titles for SEO. 40 to 60 word blocks for AEO. Sources and bylines for GEO.",
  },
  {
    title: "Authority",
    text: "Earn relevant links, keep listings honest, and show up on the third-party pages models already trust.",
  },
  {
    title: "Measurement",
    text: "Rankings, snippets, and AI citations in one monthly sheet. Search Console plus a fixed prompt set.",
  },
];

export default function MethodPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
      <h1 className="text-4xl tracking-tight">Method</h1>
      <p className="mt-4 max-w-[62ch] text-[var(--muted)]">
        One page should rank, answer, and get cited. SEO, AEO, and GEO share the same URL. We do not write a second internet for machines.
      </p>
      <div className="relative mt-10 aspect-[16/7] overflow-hidden bg-[var(--paper-2)]">
        <Image src={STOCK.audit.src} alt={STOCK.audit.alt} fill sizes="100vw" className="object-cover" />
      </div>
      <GrowthChart />
      <ol className="mt-12 grid gap-6 md:grid-cols-2">
        {steps.map((step) => (
          <li key={step.title} className="border border-[var(--line)] p-6">
            <h2 className="text-xl">{step.title}</h2>
            <p className="mt-3 text-[var(--muted)]">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
