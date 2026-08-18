import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[760px] px-4 py-12">
      <h1 className="text-4xl tracking-tight">Terms</h1>
      <div className="mt-6 space-y-4 text-[var(--muted)] leading-relaxed">
        <p>This website is an information and lead-generation property of {site.legalName}.</p>
        <p>Journal notes and market pages are educational. They are not legal, medical, or financial advice.</p>
        <p>Paid work starts only after a written statement of work. Published price ranges are starting points, not quotes.</p>
        <p>Governing law: England and Wales.</p>
      </div>
    </div>
  );
}
