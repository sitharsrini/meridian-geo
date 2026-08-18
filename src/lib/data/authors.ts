import type { Author } from "@/lib/types";

export const authors: Author[] = [
  {
    slug: "leila-rahman",
    name: "Leila Rahman",
    role: "Head of search",
    credentials:
      "Former search editor. 12 years across SEO, snippets, and AI citation programs in EMEA and South Asia.",
    bio: "Leila runs Meridian's SEO, AEO, and GEO practice. She reviews every market playbook before it ships.",
    focus: ["search-engine-optimization", "answer-engine-optimization", "generative-engine-optimization"],
  },
  {
    slug: "tomasz-wojcik",
    name: "Tomasz Wojcik",
    role: "Technical SEO and schema lead",
    credentials:
      "Crawl, Core Web Vitals, and JSON-LD specialist for publishers and marketplaces.",
    bio: "Tomasz owns crawl access, sitemaps, schema, llms.txt, and the files search engines and AI agents actually read.",
    focus: ["technical-seo", "schema-markup", "llms-txt-implementation"],
  },
  {
    slug: "amara-okonkwo",
    name: "Amara Okonkwo",
    role: "Local SEO and multilingual search",
    credentials:
      "Search programs in Lagos, Nairobi, London, and Accra. Listings, language, and city pages.",
    bio: "Amara builds city work that does not swap a place name. Language, GBP, and local entities.",
    focus: ["local-seo", "multilingual-seo", "international-seo"],
  },
  {
    slug: "priya-menon",
    name: "Priya Menon",
    role: "YMYL and AEO lead",
    credentials:
      "Former healthcare content director. Snippets and YMYL review for medical, legal, and financial pages.",
    bio: "Priya will not ship a health, legal, or finance page without a reviewer, a source list, and a last-updated date.",
    focus: ["healthcare-seo", "featured-snippets", "eeat-seo"],
  },
  {
    slug: "henrik-solberg",
    name: "Henrik Solberg",
    role: "Measurement lead",
    credentials:
      "Rankings, snippets, and AI visibility. Search Console plus prompt tracking.",
    bio: "Henrik treats SEO, AEO, and GEO as one measurable channel. One monthly sheet sales can read.",
    focus: ["seo-analytics", "citation-engineering", "seo-audit"],
  },
  {
    slug: "sofia-alvarez",
    name: "Sofia Alvarez",
    role: "Ecommerce and SaaS search",
    credentials:
      "Category architecture, PDPs, and comparison pages in Spanish and English markets.",
    bio: "Sofia works on pages that rank, snippet, and get cited in shopping and software answers.",
    focus: ["ecommerce-seo", "saas-seo", "answer-engine-optimization"],
  },
  {
    slug: "james-whitfield",
    name: "James Whitfield",
    role: "Editorial director",
    credentials:
      "Newspaper desk editor for nine years, then content standards lead at a global search agency.",
    bio: "James reviews Meridian pages for voice, sourcing, and thin-content risk. If a paragraph could live on any city page, it does not ship.",
    focus: ["content-seo", "eeat-seo", "definition-blocks"],
  },
  {
    slug: "mei-chen",
    name: "Mei Chen",
    role: "GEO and entity lead",
    credentials:
      "Knowledge-graph and AI citation analyst. English, Mandarin, and Japanese search surfaces.",
    bio: "Mei maps brand entities and tracks citations across ChatGPT, Perplexity, and Gemini.",
    focus: ["generative-engine-optimization", "entity-and-knowledge-graph", "chatgpt-visibility"],
  },
];

export function authorBySlug(slug: string) {
  return authors.find((author) => author.slug === slug) ?? authors[0];
}

export const reviewer = authors.find((a) => a.slug === "james-whitfield")!;
