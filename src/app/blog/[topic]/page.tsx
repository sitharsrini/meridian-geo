import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industries, topicBySlug, topics, blogLocations } from "@/lib/catalog";
import { clipMeta } from "@/lib/seo/meta";
import { imageFor } from "@/lib/hash";

export const dynamicParams = false;

export function generateStaticParams() {
  return topics.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = topicBySlug(slug);
  if (!topic) return {};
  return { title: topic.title, description: clipMeta(`${topic.title}. ${topic.summary}`) };
}

export default async function TopicHubPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic: slug } = await params;
  const topic = topicBySlug(slug);
  if (!topic) notFound();

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
      <h1 className="max-w-[20ch] text-4xl tracking-tight">{topic.title}</h1>
      <p className="mt-4 max-w-[62ch] text-[var(--muted)]">{topic.summary}</p>
      <div className="relative mt-8 aspect-[16/7] overflow-hidden bg-[var(--paper-2)]">
        <Image src={imageFor(topic.slug)} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <section className="mt-12">
        <h2 className="text-2xl">Read it by field</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <Link
              key={industry.slug}
              href={`/blog/${topic.slug}/${industry.slug}`}
              className="border border-[var(--line)] p-4"
            >
              {industry.name}
            </Link>
          ))}
        </div>
      </section>
      <p className="mt-10 text-sm text-[var(--muted)]">
        Each field then opens in {blogLocations.length} cities, including {blogLocations.slice(0, 3).map((item) => item.name).join(", ")}.
      </p>
    </div>
  );
}
