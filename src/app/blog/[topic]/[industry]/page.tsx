import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogLocations, industries, topics, getBlog } from "@/lib/catalog";
import { composeBlog } from "@/lib/compose/blog";
import { clipMeta } from "@/lib/seo/meta";

export const dynamicParams = true;
export const revalidate = 86400;

export function generateStaticParams() {
  return topics.slice(0, 6).flatMap((topic) =>
    industries.slice(0, 4).map((industry) => ({ topic: topic.slug, industry: industry.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string; industry: string }>;
}): Promise<Metadata> {
  const { topic, industry } = await params;
  const sample = getBlog(topic, industry, blogLocations[0].slug);
  if (!sample) return {};
  return {
    title: `${sample.topic.title} for ${sample.industry.name}`,
    description: clipMeta(
      `${sample.topic.title} for ${sample.industry.name}. SEO, AEO, and GEO notes for 100 cities.`,
    ),
  };
}

export default async function TopicIndustryPage({
  params,
}: {
  params: Promise<{ topic: string; industry: string }>;
}) {
  const { topic, industry } = await params;
  const sample = getBlog(topic, industry, blogLocations[0].slug);
  if (!sample) notFound();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
      <h1 className="max-w-[20ch] text-4xl tracking-tight">
        {sample.topic.title} for {sample.industry.name.toLowerCase()}
      </h1>
      <p className="mt-4 max-w-[62ch] text-[var(--muted)]">
        {sample.topic.summary} {sample.industry.proof} Risk if you skip it: {sample.industry.risk}
      </p>
      <section className="mt-12">
        <h2 className="text-2xl">Choose a city</h2>
        <div className="mt-5 columns-2 gap-6 md:columns-4">
          {blogLocations.map((location) => {
            const article = composeBlog(sample.topic, sample.industry, location);
            return (
              <p key={location.slug} className="mb-2 text-sm">
                <Link href={`/blog/${article.slug}`}>{location.name}</Link>
              </p>
            );
          })}
        </div>
      </section>
    </div>
  );
}
