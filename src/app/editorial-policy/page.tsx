import type { Metadata } from "next";
import { clipMeta } from "@/lib/seo/meta";

export const metadata: Metadata = {
  title: "Editorial policy",
  description: clipMeta(
    "How Meridian sources claims, names reviewers, and dates pages. No invented results.",
  ),
};

export default function EditorialPage() {
  return (
    <div className="mx-auto max-w-[760px] px-4 py-12">
      <h1 className="text-4xl tracking-tight">Editorial policy</h1>
      <div className="mt-6 space-y-4 text-[var(--muted)] leading-relaxed">
        <p>Every market page and journal note has a named author and a reviewer. James Whitfield signs the desk review.</p>
        <p>We do not invent client results, conversion rates, or city statistics. Population figures are rounded public estimates. Composite scenarios are labeled as composites.</p>
        <p>YMYL pages (health, legal, finance, and adjacent fields) cannot promise outcomes. They must cite a public source or a named practitioner.</p>
        <p>FAQ schema only marks up questions that appear in the HTML. Hidden FAQ markup is not allowed.</p>
        <p>Dates mean a human reread the page. We do not refresh a timestamp to game recency.</p>
        <p>Last reviewed: August 2026.</p>
      </div>
    </div>
  );
}
