export type GuideRecord = {
  slug: string;
  title: string;
  h1: string;
  summary: string;
};

export const guides: GuideRecord[] = [
  { slug: "optimize-website-for-ai-search", title: "How to optimize your website for AI search", h1: "How to optimize your website for AI search", summary: "What to change on the site so Google, snippets, and ChatGPT can use the same pages." },
  { slug: "ai-search-ready-website", title: "What is an AI-search-ready website", h1: "What is an AI-search-ready website", summary: "A site search engines and AI tools can crawl, quote, and send buyers to." },
  { slug: "seo-vs-geo-vs-aeo", title: "SEO vs GEO vs AEO", h1: "SEO vs GEO vs AEO: what a business actually needs", summary: "Rankings, short answers, and AI citations. What to buy first." },
  { slug: "get-recommended-by-chatgpt", title: "How to get recommended by ChatGPT", h1: "How to get your business recommended by ChatGPT", summary: "Crawlers, citeable pages, and third-party mentions ChatGPT already trusts." },
  { slug: "does-seo-still-matter", title: "Does SEO still matter for AI search", h1: "Does SEO still matter for AI search", summary: "Yes. AI Overviews and most AI tools still start from crawlable pages." },
  { slug: "website-architecture-ai-search", title: "How website architecture affects AI search", h1: "How website architecture affects AI search visibility", summary: "Folders, internal links, and HTML that retrieval systems can use." },
  { slug: "ai-visibility-audit-explained", title: "AI visibility audit: what it measures", h1: "AI visibility audit: what it measures", summary: "Prompts, citations, competitors, and what you can actually control." },
  { slug: "seo-geo-aeo-cost", title: "How much does SEO + GEO/AEO cost", h1: "How much does SEO + GEO/AEO cost", summary: "Published ranges for audit, program, and website work." },
  { slug: "redesign-for-search-and-ai", title: "How to redesign a website for search and AI", h1: "How to redesign a website for search and AI", summary: "Redirects, IA, schema, and conversion paths in one rebuild." },
  { slug: "measure-ai-search-visibility", title: "How to measure AI search visibility", h1: "How to measure AI search visibility", summary: "A prompt sheet, engines to test, and what Search Console will not show." },
];

export function guideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
