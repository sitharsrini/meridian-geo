import { authorFor, nearbyLocations, relatedServices, reviewer } from "@/lib/catalog";
import { imageFor, pick, pickN } from "@/lib/hash";
import { clipMeta } from "@/lib/seo/meta";
import type { ContentSection, FaqItem, LandingPage, Location, Service } from "@/lib/types";

function seedOf(service: Service, location: Location) {
  return `${service.slug}:${location.slug}`;
}

function monthStamp(seed: string) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${pick(months, seed, 21)} 2026`;
}

function familyPlain(family: Service["family"]): string {
  if (family === "aeo") return "answer engine optimization (AEO)";
  if (family === "geo") return "generative engine optimization (GEO)";
  if (family === "local") return "local SEO";
  if (family === "field") return "industry SEO";
  return "search engine optimization (SEO)";
}

function sections(service: Service, location: Location, seed: string): ContentSection[] {
  const trades = location.industries.join(", ");
  const langs = location.languages.join(" and ");
  const nearby = nearbyLocations(location, 3)
    .map((item) => item.name)
    .join(", ");
  const related = relatedServices(service, 2)
    .map((item) => item.name.toLowerCase())
    .join(" and ");

  return [
    {
      heading: "What we provide",
      paragraphs: [
        `Meridian is a search agency. On this page we offer ${service.name.toLowerCase()} for businesses that sell in ${location.name}, ${location.country}. In plain words, we help people find you when they search, we help Google show a short answer from your site, and we help AI tools such as ChatGPT name your company.`,
        `You do not need to learn the jargon. SEO means showing up on Google. AEO means winning the short answer box at the top. GEO means being mentioned when someone asks an AI tool who to hire. We do all three on the same web pages. We do not build a second website only for machines.`,
        `${service.summary} In ${location.name} that work is written in ${location.searchLanguage}, priced in ${location.currency}, and aimed at local trades such as ${trades}. About ${location.population} people live here. If your current pages could describe any other city, they will not help you here.`,
      ],
    },
    {
      heading: "What is going wrong today",
      paragraphs: [
        service.problem,
        `A typical ${location.name} site has three problems at once. Google cannot crawl parts of it. The page that should rank does not answer the question in the first screen. And ChatGPT has nothing clean to quote, so it names a competitor. ${service.name} is the part of the plan that fixes this for ${familyPlain(service.family)}.`,
        `Buyers in this city search in ${langs}. They ask things about ${location.industries[0]} and ${location.industries[1] ?? location.industries[0]}. If your titles are in the wrong language, or your prices are in the wrong currency, you lose the click even if you rank.`,
      ],
    },
    {
      heading: "How SEO, AEO, and GEO work on this page",
      paragraphs: [
        `SEO on this page means we check whether Google can read your site (a technical audit), we pick the words people in ${location.name} actually type, we write the page, we add internal links to nearby cities${nearby ? ` such as ${nearby}` : ""}, and we put the page in the sitemap.`,
        `AEO on this page means we add a clear definition, a short FAQ people ask out loud, and schema markup that matches the text you can see. That is how featured snippets and People Also Ask boxes get a clean answer they can lift.`,
        `GEO on this page means we keep AI crawlers allowed in robots.txt, we publish an llms.txt file that explains the company, we name a writer and a reviewer, and we add sources. That is how ChatGPT, Perplexity, and Google AI Overviews can cite you without inventing your fees.`,
      ],
    },
    {
      heading: `How we run ${service.name.toLowerCase()} in ${location.name}`,
      paragraphs: [
        `First we map the ${location.searchLanguage} searches and the AI prompts that already start sales calls in ${location.name}. Then we look at your current pages, sitemap, and robots.txt. Then we rewrite or build the pages this service needs.`,
        `${service.method.join(". ")}.`,
        `Every claim stays inside ${location.country} rules and ${location.currency} pricing. We date the page when a human rereads it. We will not invent a ${location.name} office if you do not have one. Nearby work we often pair with this service includes ${related}.`,
      ],
    },
    {
      heading: "What you receive",
      paragraphs: [
        `You receive a written plan you can read without a specialist. It lists what is broken, what we will write, and what we will measure. ${service.promise}`,
        `Standard files come with the work: a sitemap so Google can find the pages, schema so machines know the page type, an FAQ on the page, and an update to llms.txt when the offer changes. If the work is medical, legal, or financial, a named reviewer signs the page.`,
        `${service.whoFor} In ${location.name} that usually means teams in ${location.industries.slice(0, 2).join(" and ")}.`,
      ],
    },
    {
      heading: "What we will not do",
      paragraphs: [
        `We will not paste the word ${location.name} into a paragraph that still describes another city. We will not buy fake links or fake reviews. We will not hide FAQ schema that is not on the page. We will not promise overnight rankings.`,
        `Technical fixes can show in a few weeks. Competitive terms in ${location.industries[0]} in ${location.name} usually take a quarter of steady pages, links, and reporting. If that timeline does not fit, this is not the right agency.`,
      ],
    },
  ];
}

function faqs(service: Service, location: Location, seed: string): FaqItem[] {
  const related = relatedServices(service, 1)[0];
  const items: FaqItem[] = [
    {
      question: `What do we get if we buy ${service.name.toLowerCase()} in ${location.name}?`,
      answer: `A technical check of your site, a list of searches people type in ${location.name}, pages written for this city, an on-page FAQ, schema, sitemap updates, and a simple monthly report. ${service.summary}`,
    },
    {
      question: "What do SEO, AEO, and GEO mean here?",
      answer: `SEO is ranking on Google. AEO is winning the short answer at the top of the results. GEO is being named when someone asks ChatGPT or Perplexity. We do all three on the same ${location.name} pages.`,
    },
    {
      question: `How long before we see results in ${location.name}?`,
      answer: `Crawl fixes can show in weeks. Competitive ${location.industries[0]} searches in ${location.name} usually take about three months of steady work. We do not sell overnight rankings.`,
    },
    {
      question: `What should we send for a ${location.name} audit?`,
      answer: `Access to Google Search Console, your website, the current sitemap, robots.txt, the twenty searches that already bring sales, and any ${location.country} licenses we must respect.`,
    },
    {
      question: `Can you help if we have no office in ${location.name}?`,
      answer: `Yes, if you sell there. We will say you serve ${location.name} remotely or through partners. We will not invent a local address.`,
    },
    {
      question: `How is this different from ${related.name.toLowerCase()}?`,
      answer: `${service.name} focuses on ${service.summary.charAt(0).toLowerCase()}${service.summary.slice(1)} ${related.name} is the sibling service. We link the two ${location.name} pages so neither stands alone.`,
    },
    {
      question: "Do you write in our language?",
      answer: `Yes. Search in ${location.name} happens in ${location.searchLanguage}. We write the ranking page in that language first. Other languages are a separate page, not a machine dump.`,
    },
    {
      question: "Is the FAQ and sitemap included?",
      answer: `Yes. Every service page includes a visible FAQ, matching schema, a sitemap entry, and a pointer in llms.txt. That is standard, not an add-on.`,
    },
  ];
  return pickN(items, 6, seed);
}

export function composeLanding(service: Service, location: Location): LandingPage {
  const seed = seedOf(service, location);
  const description = clipMeta(
    `${service.name} in ${location.name}. We help you rank on Google, win short answers, and get named in AI search.`,
  );
  return {
    service,
    location,
    title: `${service.name} in ${location.name}, ${location.country}`,
    description,
    h1: `${service.name} in ${location.name}`,
    lede: `We help ${location.name} businesses get found on Google, win the short answer, and get named when buyers ask AI who to hire.`,
    sections: sections(service, location, seed),
    deliverables: service.deliverables,
    faqs: faqs(service, location, seed),
    author: authorFor(seed),
    reviewer,
    updated: monthStamp(seed),
    image: imageFor(seed),
  };
}
