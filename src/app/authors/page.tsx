import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { authors } from "@/lib/catalog";
import { clipMeta } from "@/lib/seo/meta";
import { STOCK } from "@/lib/stock";

export const metadata: Metadata = {
  title: "Authors",
  description: clipMeta(
    "Meridian writers and reviewers. Named authors for SEO, AEO, and GEO pages.",
  ),
};

export default function AuthorsPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
      <h1 className="text-4xl tracking-tight">Authors</h1>
      <div className="relative mt-8 aspect-[16/7] overflow-hidden bg-[var(--paper-2)]">
        <Image src={STOCK.team.src} alt={STOCK.team.alt} fill sizes="100vw" className="object-cover" />
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {authors.map((author) => (
          <Link key={author.slug} href={`/authors/${author.slug}`} className="border border-[var(--line)] p-5">
            <h2 className="text-xl">{author.name}</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">{author.role}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
