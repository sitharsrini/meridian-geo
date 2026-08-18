import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { authorBySlug, authors, topics } from "@/lib/catalog";
import { clipMeta } from "@/lib/seo/meta";

export const dynamicParams = false;

export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = authorBySlug(slug);
  return { title: author.name, description: clipMeta(`${author.name}, ${author.role}. ${author.credentials}`) };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = authors.find((item) => item.slug === slug);
  if (!author) notFound();

  return (
    <div className="mx-auto max-w-[760px] px-4 py-12">
      <h1 className="text-4xl tracking-tight">{author.name}</h1>
      <p className="mt-2 text-[var(--muted)]">{author.role}</p>
      <p className="mt-6 leading-relaxed">{author.credentials}</p>
      <p className="mt-4 text-[var(--muted)] leading-relaxed">{author.bio}</p>
      <h2 className="mt-10 text-2xl">Notes from this desk</h2>
      <ul className="mt-4 space-y-2">
        {topics.slice(0, 6).map((topic) => (
          <li key={topic.slug}>
            <Link href={`/blog/${topic.slug}`}>{topic.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
