export type CommercialCluster =
  | "seo"
  | "local"
  | "website"
  | "geo"
  | "aeo"
  | "audit"
  | "pricing"
  | "integrated";

export type CommercialRecord = {
  slug: string;
  keyword: string;
  rank: number;
  tier: 1 | 2 | 3;
  intent: string;
  buyer: string;
  cluster: CommercialCluster;
  h1: string;
  offer: string;
};

export const commercialPages: CommercialRecord[] = [
  { slug: "seo-agency", keyword: "SEO agency", rank: 1, tier: 1, intent: "Hire agency", buyer: "businesses that need organic leads", cluster: "seo", h1: "SEO agency for Google, AI answers, and leads", offer: "A full SEO program: audit, pages, links, local, and reporting." },
  { slug: "seo-services", keyword: "SEO services", rank: 2, tier: 1, intent: "Buy service", buyer: "marketing teams with an existing site", cluster: "seo", h1: "SEO services that rank and convert", offer: "Technical, on-page, content, and local SEO you can buy as a package." },
  { slug: "seo-consultant", keyword: "SEO consultant", rank: 3, tier: 1, intent: "Hire expert", buyer: "SMBs and tech teams that want a senior lead", cluster: "seo", h1: "SEO consultant for teams that need a clear plan", offer: "A named consultant, a written plan, and hands-on implementation." },
  { slug: "seo-company", keyword: "SEO company", rank: 4, tier: 1, intent: "Hire provider", buyer: "companies comparing providers", cluster: "seo", h1: "SEO company for search, snippets, and AI visibility", offer: "One company for SEO, AEO, GEO, and the website work underneath." },
  { slug: "website-development-agency", keyword: "website development agency", rank: 5, tier: 1, intent: "Hire agency", buyer: "businesses that need a new site", cluster: "website", h1: "Website development agency for search and AI", offer: "We plan, build, and launch sites Google and ChatGPT can read." },
  { slug: "web-development-company", keyword: "web development company", rank: 6, tier: 2, intent: "Hire company", buyer: "SMBs and growth companies", cluster: "website", h1: "Web development company that builds for search first", offer: "Custom sites with schema, speed, and lead forms built in." },
  { slug: "website-redesign-agency", keyword: "website redesign agency", rank: 7, tier: 1, intent: "Hire redesign partner", buyer: "teams with a site that no longer converts", cluster: "website", h1: "Website redesign agency that protects rankings", offer: "Rebuild the site, keep the traffic, add AI-ready structure." },
  { slug: "website-redesign-services", keyword: "website redesign services", rank: 8, tier: 2, intent: "Buy service", buyer: "businesses planning a rebuild", cluster: "website", h1: "Website redesign services for search and leads", offer: "IA, copy, technical SEO, and a redirect plan in one project." },
  { slug: "seo-audit-services", keyword: "SEO audit services", rank: 9, tier: 2, intent: "Buy audit", buyer: "businesses with an existing site", cluster: "audit", h1: "SEO audit services with a written fix list", offer: "Crawl, content, links, and local checked. Owners named on every fix." },
  { slug: "technical-seo-services", keyword: "technical SEO services", rank: 10, tier: 1, intent: "Buy implementation", buyer: "tech teams and sophisticated SMBs", cluster: "seo", h1: "Technical SEO services that make the site crawlable", offer: "Indexation, speed, schema, sitemaps, and robots.txt done properly." },
  { slug: "local-seo-services", keyword: "local SEO services", rank: 11, tier: 2, intent: "Buy local visibility", buyer: "local businesses", cluster: "local", h1: "Local SEO services for Maps, Google, and AI", offer: "Google Business Profile, city pages, reviews, and local AI mentions." },
  { slug: "local-seo-agency", keyword: "local SEO agency", rank: 12, tier: 1, intent: "Hire agency", buyer: "local businesses", cluster: "local", h1: "Local SEO agency for shops, clinics, and multi-city brands", offer: "Listings, city pages, and a monthly local report." },
  { slug: "seo-pricing", keyword: "SEO pricing", rank: 13, tier: 2, intent: "Commercial evaluation", buyer: "budget-ready buyers", cluster: "pricing", h1: "SEO pricing: what an audit, program, and build cost", offer: "Published ranges for audit, quarterly SEO, GEO/AEO, and website work." },
  { slug: "seo-services-pricing", keyword: "SEO services pricing", rank: 14, tier: 2, intent: "Commercial evaluation", buyer: "SMBs comparing packages", cluster: "pricing", h1: "SEO services pricing for growing teams", offer: "Clear packages: audit, market program, and enterprise." },
  { slug: "seo-consultant-pricing", keyword: "SEO consultant pricing", rank: 15, tier: 2, intent: "Commercial evaluation", buyer: "SMB and startup founders", cluster: "pricing", h1: "SEO consultant pricing without a hidden retainers maze", offer: "Day rates and monthly consultant packages, written up front." },
  { slug: "geo-services", keyword: "GEO services", rank: 16, tier: 3, intent: "Buy AI-search optimization", buyer: "tech and growth brands", cluster: "geo", h1: "GEO services: get named in ChatGPT and AI search", offer: "Prompt map, citeable pages, llms.txt, and monthly AI visibility." },
  { slug: "geo-agency", keyword: "GEO agency", rank: 17, tier: 3, intent: "Hire specialist", buyer: "brands that want AI citations", cluster: "geo", h1: "GEO agency for generative engine optimization", offer: "Audit, implementation, and monitoring across AI engines." },
  { slug: "generative-engine-optimization-agency", keyword: "Generative Engine Optimization agency", rank: 18, tier: 3, intent: "Hire specialist", buyer: "sophisticated brands", cluster: "geo", h1: "Generative Engine Optimization agency", offer: "Full GEO: entities, sources, crawlers, and citation tracking." },
  { slug: "generative-engine-optimization-services", keyword: "Generative Engine Optimization services", rank: 19, tier: 3, intent: "Buy service", buyer: "businesses entering AI search", cluster: "geo", h1: "Generative Engine Optimization services", offer: "Citeable pages, agent files, and a prompt tracker." },
  { slug: "aeo-services", keyword: "AEO services", rank: 20, tier: 3, intent: "Buy AI-answer optimization", buyer: "businesses that want snippets", cluster: "aeo", h1: "AEO services for featured snippets and AI answers", offer: "Question pages, FAQ schema, and short answers engines can lift." },
  { slug: "aeo-agency", keyword: "AEO agency", rank: 21, tier: 3, intent: "Hire specialist", buyer: "businesses hiring for answer engines", cluster: "aeo", h1: "AEO agency for answer engine optimization", offer: "Snippets, People Also Ask, voice, and FAQ implementation." },
  { slug: "answer-engine-optimization-services", keyword: "Answer Engine Optimization services", rank: 22, tier: 3, intent: "Buy service", buyer: "content and marketing teams", cluster: "aeo", h1: "Answer Engine Optimization services", offer: "Definition blocks, how-to markup, and spoken-question FAQs." },
  { slug: "ai-search-optimization-services", keyword: "AI search optimization services", rank: 23, tier: 3, intent: "Buy service", buyer: "tech and marketing teams", cluster: "geo", h1: "AI search optimization services", offer: "SEO plus GEO plus AEO on the same website." },
  { slug: "ai-search-optimization-agency", keyword: "AI search optimization agency", rank: 24, tier: 3, intent: "Hire agency", buyer: "tech companies and brands", cluster: "geo", h1: "AI search optimization agency", offer: "One team for Google, snippets, and ChatGPT visibility." },
  { slug: "chatgpt-seo-services", keyword: "ChatGPT SEO services", rank: 25, tier: 3, intent: "Buy AI visibility", buyer: "businesses whose buyers use ChatGPT", cluster: "geo", h1: "ChatGPT SEO services", offer: "Pages and files ChatGPT can retrieve and name." },
  { slug: "chatgpt-optimization-agency", keyword: "ChatGPT optimization agency", rank: 26, tier: 3, intent: "Hire specialist", buyer: "businesses hiring for ChatGPT", cluster: "geo", h1: "ChatGPT optimization agency", offer: "Crawler access, citeable copy, and prompt monitoring." },
  { slug: "ai-visibility-audit", keyword: "AI visibility audit", rank: 27, tier: 3, intent: "Buy audit", buyer: "marketing teams", cluster: "audit", h1: "AI visibility audit", offer: "We test buyer prompts across ChatGPT, Perplexity, and AI Overviews." },
  { slug: "aeo-audit", keyword: "AEO audit", rank: 28, tier: 3, intent: "Buy audit", buyer: "businesses with content that should snippet", cluster: "audit", h1: "AEO audit for snippets and answer boxes", offer: "Question inventory, extract check, and FAQ schema review." },
  { slug: "geo-audit", keyword: "GEO audit", rank: 29, tier: 3, intent: "Buy audit", buyer: "businesses that want AI citations", cluster: "audit", h1: "GEO audit for generative engine optimization", offer: "Crawlers, entities, sources, and a citation scorecard." },
  { slug: "seo-and-website-development", keyword: "SEO and website development company", rank: 30, tier: 1, intent: "Buy integrated solution", buyer: "SMB and growth companies", cluster: "integrated", h1: "SEO and website development company", offer: "One team builds the site and the search program." },
  { slug: "ai-ready-websites", keyword: "AI-ready websites", rank: 31, tier: 3, intent: "Buy implementation", buyer: "teams rebuilding for AI search", cluster: "website", h1: "AI-ready websites", offer: "Semantic HTML, schema, llms.txt, and conversion paths in the build." },
  { slug: "seo-website-development", keyword: "SEO website development", rank: 32, tier: 1, intent: "Buy integrated solution", buyer: "SMBs launching or rebuilding", cluster: "website", h1: "SEO website development", offer: "Architecture, copy, schema, and speed in one build." },
];

export function commercialBySlug(slug: string) {
  return commercialPages.find((page) => page.slug === slug);
}

export const commercialSlugs = commercialPages.map((page) => page.slug);
