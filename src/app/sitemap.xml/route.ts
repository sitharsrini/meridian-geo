import { BLOG_COUNT, LANDING_COUNT } from "@/lib/catalog";
import { site } from "@/lib/site";

const GEO_CHUNK = 1000;
const BLOG_CHUNK = 5000;
const GEO_SITEMAPS = Math.ceil(LANDING_COUNT / GEO_CHUNK);
const BLOG_SITEMAPS = Math.ceil(BLOG_COUNT / BLOG_CHUNK);

export function GET() {
  const lastmod = "2026-08-01";
  const ids = Array.from({ length: 1 + GEO_SITEMAPS + BLOG_SITEMAPS }, (_, id) => id);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ids
  .map(
    (id) => `  <sitemap>
    <loc>${site.url}/sitemaps/${id}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`,
  )
  .join("\n")}
</sitemapindex>
`;
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
