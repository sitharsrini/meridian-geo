import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { authors } from "@/lib/catalog";
import { clipMeta } from "@/lib/seo/meta";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: clipMeta(
    "Meridian is a search agency for SEO, AEO, and GEO. Offices in London, Dubai, and Singapore.",
  ),
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
      <h1 className="max-w-[16ch] text-4xl tracking-tight">Search that ranks, answers, and cites.</h1>
      <p className="mt-5 max-w-[62ch] text-lg text-[var(--muted)]">
        Meridian is a search agency. We run SEO, answer engine optimization, and generative engine optimization in the city and the field where the buyer actually lives.
      </p>
      <div className="relative mt-10 aspect-[16/8] overflow-hidden bg-[var(--paper-2)]">
        <Image
          src="/images/office-glass.jpg"
          alt="Bright glass office interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <section className="mt-14 divide-y divide-[var(--line)] border-y border-[var(--line)]">
        <div className="grid gap-4 py-6 md:grid-cols-[140px_1fr]">
          <h2 className="text-xl">SEO</h2>
          <p className="text-[var(--muted)]">Crawl, keywords, on-page, content, links, speed, schema, local pack, and reporting.</p>
        </div>
        <div className="grid gap-4 py-6 md:grid-cols-[140px_1fr]">
          <h2 className="text-xl">AEO</h2>
          <p className="text-[var(--muted)]">Featured snippets, People Also Ask, voice, FAQ, and how-to blocks engines can lift.</p>
        </div>
        <div className="grid gap-4 py-6 md:grid-cols-[140px_1fr]">
          <h2 className="text-xl">GEO</h2>
          <p className="text-[var(--muted)]">Citations in ChatGPT, Perplexity, AI Overviews, Claude, Gemini, and Copilot.</p>
        </div>
      </section>
      <section className="mt-14 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-2xl">Why we exist</h2>
          <p className="mt-4 text-[var(--muted)] leading-relaxed">
            Buyers still start in search. They also ask answer boxes and AI tools. A firm that only does classic SEO misses the shortlist. A firm that only does GEO never ranks. We do the whole stack on one set of pages.
          </p>
        </div>
        <div>
          <h2 className="text-2xl">Where we sit</h2>
          <ul className="mt-4 space-y-3 text-[var(--muted)]">
            {site.offices.map((office) => (
              <li key={office.city}>
                {office.city}: {office.address}, {office.postal}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="relative mt-14 aspect-[16/7] overflow-hidden bg-[var(--paper-2)]">
        <Image src="/images/team.jpg" alt="Team talking through a plan" fill sizes="100vw" className="object-cover" />
      </div>
      <section className="mt-14">
        <h2 className="text-2xl">People who sign the work</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {authors.map((author) => (
            <Link key={author.slug} href={`/authors/${author.slug}`} className="border border-[var(--line)] p-5">
              <h3 className="text-lg">{author.name}</h3>
              <p className="mt-1 text-sm">{author.role}</p>
              <p className="mt-3 text-sm text-[var(--muted)]">{author.credentials}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
