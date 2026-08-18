import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { guides } from "@/lib/data/guides";
import { clipMeta } from "@/lib/seo/meta";
import { stockForGuide } from "@/lib/stock";

export const metadata: Metadata = {
  title: "Guides",
  description: clipMeta(
    "Plain guides on SEO, GEO, AEO, and AI-ready websites. Written for buyers, not jargon.",
  ),
};

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
      <h1 className="text-4xl tracking-tight">Guides</h1>
      <p className="mt-4 max-w-[58ch] text-[var(--muted)]">
        Money questions first. How to hire, what to change on the site, and how SEO, AEO, and GEO fit together.
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`} className="border border-[var(--line)] bg-white">
            <div className="relative aspect-[16/9] overflow-hidden bg-[var(--paper-2)]">
              <Image
                src={stockForGuide(guide.slug).src}
                alt={stockForGuide(guide.slug).alt}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h2 className="text-lg">{guide.title}</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{guide.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
