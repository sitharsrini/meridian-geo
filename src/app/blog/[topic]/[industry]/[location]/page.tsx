import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Crumb } from "@/components/crumb";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/reveal";
import { getBlog, nearbyLocations, priorityBlogs } from "@/lib/catalog";
import { composeBlog } from "@/lib/compose/blog";
import { articleGraph } from "@/lib/seo/schema";
import { site } from "@/lib/site";

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  return priorityBlogs(process.env.NODE_ENV === "development" ? 6 : 24);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string; industry: string; location: string }>;
}): Promise<Metadata> {
  const { topic, industry, location } = await params;
  const triple = getBlog(topic, industry, location);
  if (!triple) return {};
  const article = composeBlog(triple.topic, triple.industry, triple.location);
  const path = `/blog/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    authors: [{ name: article.author.name }],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: article.published,
      modifiedTime: article.updated,
      images: [article.image],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ topic: string; industry: string; location: string }>;
}) {
  const { topic, industry, location } = await params;
  const triple = getBlog(topic, industry, location);
  if (!triple) notFound();
  const article = composeBlog(triple.topic, triple.industry, triple.location);
  const nearbyBlog = nearbyLocations(article.location, 3);

  return (
    <article className="mx-auto max-w-[820px] px-4 py-10 md:px-0">
      <JsonLd data={articleGraph(article)} />
      <div className="px-4 md:px-0">
        <Crumb
          items={[
            { href: "/", label: "Home" },
            { href: "/blog", label: "Journal" },
            { href: `/blog/${article.topic.slug}`, label: article.topic.title },
            { href: `/blog/${article.topic.slug}/${article.industry.slug}`, label: article.industry.name },
            { label: article.location.name },
          ]}
        />
      </div>
      <header className="mt-8 px-4 md:px-0">
        <p className="font-mono text-xs text-[var(--mark)]">
          {article.industry.name.toUpperCase()} · {article.location.name.toUpperCase()}
        </p>
        <h1 className="mt-3 text-4xl leading-[1.12] tracking-tight md:text-5xl">{article.h1}</h1>
        <p className="mt-5 text-lg text-[var(--muted)]">{article.lede}</p>
        <p className="mt-6 text-sm text-[var(--muted)]">
          {article.author.name}, {article.author.role}. Reviewed by {article.reviewer.name}. {article.readingMinutes} min read. Updated {article.updated}.
        </p>
      </header>
      <div className="relative mt-8 aspect-[16/9] overflow-hidden bg-[var(--paper-2)]">
        <Image
          src={article.image}
          alt=""
          fill
          priority
          sizes="820px"
          className="object-cover"
        />
      </div>

      {article.sections.map((section) => (
        <Reveal key={section.heading}>
          <section className="mt-12 px-4 md:px-0">
            <h2 className="text-2xl tracking-tight">{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-4 text-[var(--muted)] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </section>
        </Reveal>
      ))}

      <Reveal>
        <section className="mt-12 px-4 md:px-0">
          <h2 className="text-2xl tracking-tight">Questions</h2>
          <div className="mt-4">
            <FaqList items={article.faqs} />
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-12 px-4 md:px-0">
          <h2 className="text-2xl tracking-tight">Sources</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {article.sources.map((source) => (
              <li key={source.href}>
                <a href={source.href} rel="noopener noreferrer">
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <section className="mt-12 px-4 md:px-0">
          <h2 className="text-2xl tracking-tight">Keep reading</h2>
          <ul className="mt-4 space-y-2">
            {nearbyBlog.map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${article.topic.slug}/${article.industry.slug}/${item.slug}`}>
                  {article.topic.title} for {article.industry.name.toLowerCase()} in {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/geo/search-engine-optimization/${article.location.slug}`}>
                SEO services in {article.location.name}
              </Link>
            </li>
          </ul>
          <Link
            href="/contact"
            className="mt-8 inline-flex bg-[var(--accent)] px-5 py-3 text-sm text-[var(--paper)]"
          >
            {site.cta.label}
          </Link>
        </section>
      </Reveal>
    </article>
  );
}
