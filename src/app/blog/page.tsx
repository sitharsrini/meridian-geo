import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { topics, industries, blogLocations } from "@/lib/catalog";
import { composeBlog } from "@/lib/compose/blog";

import { clipMeta } from "@/lib/seo/meta";

export const metadata: Metadata = {
  title: "Journal",
  description: clipMeta(
    "Plain-language guides on SEO, AEO, and GEO. Written for one field and one city at a time.",
  ),
};

export default function BlogIndexPage() {
  const featured = topics.slice(0, 8).map((topic, index) =>
    composeBlog(topic, industries[index % industries.length], blogLocations[index % 8]),
  );

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
      <h1 className="text-4xl tracking-tight">Journal</h1>
      <p className="mt-4 max-w-[62ch] text-[var(--muted)]">
        Guides you can actually use. Each one is a topic, a field, and a city. We explain what to do on your website, in plain language.
      </p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {featured.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`} className="group">
            <div className="relative aspect-[16/9] overflow-hidden bg-[var(--paper-2)]">
              <Image src={article.image} alt="" fill sizes="50vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
            </div>
            <p className="mt-3 font-mono text-xs text-[var(--muted)]">
              {article.industry.name} · {article.location.name}
            </p>
            <h2 className="mt-1 text-xl">{article.title}</h2>
          </Link>
        ))}
      </div>
      <section className="mt-16">
        <h2 className="text-2xl">Topics</h2>
        <div className="mt-5 columns-1 gap-6 md:columns-2">
          {topics.map((topic) => (
            <p key={topic.slug} className="mb-2 text-sm">
              <Link href={`/blog/${topic.slug}`}>{topic.title}</Link>
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
