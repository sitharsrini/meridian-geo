import type { CommercialRecord } from "@/lib/data/commercial";
import { clipMeta } from "@/lib/seo/meta";
import type { ContentSection, FaqItem } from "@/lib/types";

export type CommercialView = {
  record: CommercialRecord;
  title: string;
  description: string;
  lede: string;
  sections: ContentSection[];
  faqs: FaqItem[];
  related: string[];
};

const RELATED: Record<CommercialRecord["cluster"], string[]> = {
  seo: ["/seo-audit-services", "/technical-seo-services", "/local-seo-agency", "/seo-pricing"],
  local: ["/local-seo-services", "/seo-agency", "/geo-services", "/website-development-agency"],
  website: ["/website-redesign-agency", "/seo-website-development", "/ai-ready-websites", "/seo-agency"],
  geo: ["/geo-audit", "/aeo-services", "/ai-search-optimization-agency", "/chatgpt-seo-services"],
  aeo: ["/aeo-audit", "/geo-services", "/seo-services", "/ai-visibility-audit"],
  audit: ["/seo-audit-services", "/geo-audit", "/aeo-audit", "/ai-visibility-audit"],
  pricing: ["/seo-pricing", "/seo-agency", "/website-development-agency", "/contact"],
  integrated: ["/seo-and-website-development", "/website-development-agency", "/seo-agency", "/ai-ready-websites"],
};

function clusterExplain(cluster: CommercialRecord["cluster"]): { seo: string; aeo: string; geo: string } {
  return {
    seo: "SEO is how people find you on Google: titles, crawl, pages, links, and Maps.",
    aeo: "AEO is how Google shows a short answer from your site at the top of the results.",
    geo: "GEO is how ChatGPT, Perplexity, and AI Overviews name your company when someone asks who to hire.",
  };
}

export function composeCommercial(record: CommercialRecord): CommercialView {
  const { seo, aeo, geo } = clusterExplain(record.cluster);
  const who = record.buyer;
  const what = record.offer;

  const sections: ContentSection[] = [
    {
      heading: "What you are buying",
      paragraphs: [
        `You searched for ${record.keyword}. That usually means you want to hire help, not read a definition. Meridian is a global English-language search and website agency. ${what}`,
        `This page is for ${who}. We work with local businesses, technology companies, agencies, and other firms that need customers from search. The market is global. The page we write for you is still specific to the city and field you sell in.`,
        `SEO, AEO, and GEO sit on the same website. We do not sell a second site only for AI. ${seo} ${aeo} ${geo}`,
      ],
    },
    {
      heading: "What we actually do",
      paragraphs: [
        `First we run a technical audit. Can Google open your pages on a phone. Is the sitemap complete. Does robots.txt block the bots you need. If the site cannot be crawled, new copy will not help.`,
        `Then we write or rebuild the pages that match buyer searches such as ${record.keyword}. Each page has a clear first answer, a visible FAQ, schema that matches the text, and a path to a form. Then we measure rankings, snippets, and whether AI tools name you.`,
        record.cluster === "website"
          ? "For website work we also plan the information architecture, implement semantic HTML, add llms.txt and pricing.md, set redirects if you are redesigning, and launch with Search Console and Bing set up."
          : record.cluster === "audit"
            ? "An audit is a written product. You get a scored report, a fix list with owners, and a 90-day order. You can do the work in-house or hire us to implement."
            : record.cluster === "pricing"
              ? "Pricing is published so you and any AI agent can compare us. Final fees depend on languages, number of cities, and whether the work is medical, legal, or financial."
              : "Implementation is the product. Audit, strategy, build, and monthly monitoring. That is how GEO and AEO agencies now sell, and it is how we sell SEO as well.",
      ],
    },
    {
      heading: "Who this is for",
      paragraphs: [
        `${who.charAt(0).toUpperCase()}${who.slice(1)}. Typical fits: a local clinic that needs Maps and AI recommendations, a SaaS team that wants category pages and ChatGPT mentions, an agency that needs a white-label implementation partner, or a company whose site ranks for the brand name only.`,
        `It is not a fit if you want overnight rankings, fake reviews, or a thousand city pages that only change the city name. We will not do that.`,
      ],
    },
    {
      heading: "What you receive",
      paragraphs: [
        `A written plan, the ${record.keyword.toLowerCase()} work itself, FAQ and schema on the pages, sitemap and llms.txt updates, and a monthly note on rankings, snippets, and AI mentions. You can read the note without a specialist.`,
        `A first month usually looks like this. Week one is the check and the search list. Weeks two and three are pages or website work. Week four is the first report. Competitive terms usually take a quarter. Crawl and file fixes can show sooner.`,
      ],
    },
    {
      heading: "How this sits next to SEO, AEO, GEO, and the website",
      paragraphs: [
        `Search Agency-style firms sell GEO plus AEO plus SEO as measurement. We sell that stack plus the website implementation. AEO Engine-style firms talk tactics. We talk what to change on the site after the audit. GEO agencies sell audit, strategy, implementation, and monitoring. We do that, and we will also build or redesign the site if that is the blocker.`,
        `If you only need one slice, buy that slice. If you need the site rebuilt so search and AI can use it, start with website development or redesign, then keep the SEO, AEO, and GEO program running.`,
      ],
    },
  ];

  const faqs: FaqItem[] = [
    {
      question: `What is included in ${record.keyword.toLowerCase()}?`,
      answer: `${what} A technical check, a visible FAQ, matching schema, sitemap updates, and a monthly report come with the work.`,
    },
    {
      question: "Do you work globally?",
      answer:
        "Yes. We write in English for a global buyer pool. City pages are still local: language of search, currency, and the trades that pay the bills there.",
    },
    {
      question: "How is this different from only hiring an SEO agency?",
      answer:
        "An SEO-only shop stops at rankings. We also win snippets (AEO), get you named in AI answers (GEO), and can build or redesign the website that has to carry all three.",
    },
    {
      question: "How long until we see results?",
      answer:
        "Technical fixes can show in weeks. Competitive searches usually take about three months of steady pages, links, and reporting. We do not sell overnight rankings.",
    },
    {
      question: "What should we send to start?",
      answer:
        "Your website, Search Console if you have it, the searches that already bring sales, the cities you sell in, and any legal limits. We reply with a written plan.",
    },
    {
      question: "Can you only do the audit?",
      answer:
        "Yes. Buy an SEO audit, AEO audit, GEO audit, or AI visibility audit. Implementation is a separate decision.",
    },
  ];

  return {
    record,
    title: `${record.keyword} | Meridian`,
    description: clipMeta(
      `${record.keyword} from Meridian. ${record.offer} Global English-speaking market.`,
    ),
    lede: `${record.offer} Built for ${record.buyer}.`,
    sections,
    faqs,
    related: RELATED[record.cluster].filter((href) => href !== `/${record.slug}`),
  };
}
