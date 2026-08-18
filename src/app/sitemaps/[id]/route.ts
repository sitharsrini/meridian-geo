import {
  BLOG_COUNT,
  LANDING_COUNT,
  authors,
  blogAt,
  industries,
  landingAt,
  locations,
  services,
  topics,
} from "@/lib/catalog";
import { commercialPages } from "@/lib/data/commercial";
import { guides } from "@/lib/data/guides";
import { site } from "@/lib/site";

const GEO_CHUNK = 1000;
const BLOG_CHUNK = 5000;
const GEO_SITEMAPS = Math.ceil(LANDING_COUNT / GEO_CHUNK);
const BLOG_SITEMAPS = Math.ceil(BLOG_COUNT / BLOG_CHUNK);

function loc(path: string, changefreq: string, priority: string) {
  return `  <url>
    <loc>${site.url}${path}</loc>
    <lastmod>2026-08-01</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export function generateStaticParams() {
  return [{ id: "0" }];
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const sitemapId = Number(id);
  if (!Number.isInteger(sitemapId) || sitemapId < 0) {
    return new Response("Not found", { status: 404 });
  }

  const urls: string[] = [];

  if (sitemapId === 0) {
    const core = [
      "/",
      "/about",
      "/contact",
      "/faq",
      "/methodology",
      "/editorial-policy",
      "/pricing",
      "/privacy",
      "/terms",
      "/services",
      "/locations",
      "/industries",
      "/blog",
      "/authors",
      "/guides",
    ];
    urls.push(...core.map((path) => loc(path, "weekly", path === "/" ? "1.0" : "0.7")));
    urls.push(...commercialPages.map((item) => loc(`/${item.slug}`, "weekly", "0.9")));
    urls.push(...guides.map((item) => loc(`/guides/${item.slug}`, "weekly", "0.7")));
    urls.push(...services.map((item) => loc(`/services/${item.slug}`, "weekly", "0.6")));
    urls.push(...locations.map((item) => loc(`/locations/${item.slug}`, "weekly", "0.6")));
    urls.push(...industries.map((item) => loc(`/industries/${item.slug}`, "weekly", "0.6")));
    urls.push(...topics.map((item) => loc(`/blog/${item.slug}`, "weekly", "0.6")));
    urls.push(...authors.map((item) => loc(`/authors/${item.slug}`, "weekly", "0.5")));
  } else if (sitemapId >= 1 && sitemapId <= GEO_SITEMAPS) {
    const start = (sitemapId - 1) * GEO_CHUNK;
    const end = Math.min(start + GEO_CHUNK, LANDING_COUNT);
    for (let index = start; index < end; index += 1) {
      const { service, location } = landingAt(index);
      urls.push(loc(`/geo/${service.slug}/${location.slug}`, "monthly", "0.5"));
    }
  } else {
    const blogChunk = sitemapId - 1 - GEO_SITEMAPS;
    if (blogChunk < 0 || blogChunk >= BLOG_SITEMAPS) {
      return new Response("Not found", { status: 404 });
    }
    const start = blogChunk * BLOG_CHUNK;
    const end = Math.min(start + BLOG_CHUNK, BLOG_COUNT);
    for (let index = start; index < end; index += 1) {
      const { topic, industry, location } = blogAt(index);
      urls.push(loc(`/blog/${topic.slug}/${industry.slug}/${location.slug}`, "monthly", "0.4"));
    }
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
