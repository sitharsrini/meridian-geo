import { authorFor, reviewer } from "@/lib/catalog";
import { imageFor, pick, pickN, seededInt } from "@/lib/hash";
import { clipMeta } from "@/lib/seo/meta";
import type { BlogArticle, ContentSection, FaqItem, Industry, Location, Topic } from "@/lib/types";

const SOURCES = [
  {
    label: "Google Search, creating helpful content",
    href: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content",
  },
  {
    label: "Google guidance on AI features in Search",
    href: "https://developers.google.com/search/docs/fundamentals/ai-optimization-guide",
  },
  {
    label: "Princeton GEO study (KDD 2024 summary via ACM)",
    href: "https://kdd.org/",
  },
  {
    label: "llms.txt proposal",
    href: "https://llmstxt.org/",
  },
  {
    label: "Schema.org documentation",
    href: "https://schema.org/",
  },
];

function seedOf(topic: Topic, industry: Industry, location: Location) {
  return `${topic.slug}:${industry.slug}:${location.slug}`;
}

function dateFromSeed(seed: string) {
  const day = seededInt(`${seed}:d`, 1, 28);
  const month = seededInt(`${seed}:m`, 1, 8);
  const published = new Date(Date.UTC(2025, month - 1, day));
  const updated = new Date(Date.UTC(2026, 6, seededInt(`${seed}:u`, 1, 28)));
  return {
    published: published.toISOString().slice(0, 10),
    updated: updated.toISOString().slice(0, 10),
  };
}

function titleFor(topic: Topic, industry: Industry, location: Location) {
  return `${topic.title} for ${industry.name} teams in ${location.name}`;
}

function sections(
  topic: Topic,
  industry: Industry,
  location: Location,
  seed: string,
): ContentSection[] {
  const example = `${industry.queryExamples[0]} ${location.name}`;
  const ymyl = industry.ymyl
    ? `This field can affect money or health. In ${location.country} we do not promise results, and a named reviewer must sign the page.`
    : `This field is not high-risk medical or legal advice, but we still name the writer and date the page.`;

  return [
    {
      heading: "What this article is about",
      paragraphs: [
        `This note is for ${industry.buyer} in ${location.name}. It explains ${topic.title.toLowerCase()} in everyday language. You should finish the page knowing what to do on your website this month, not only what the acronyms mean.`,
        `${topic.summary} In ${location.name}, people search in ${location.searchLanguage}. Local work includes ${location.industries.slice(0, 3).join(", ")}. About ${location.population} people live here. A guide that never names those facts is not useful to you.`,
        `Meridian is a search agency. We help companies rank on Google (SEO), win the short answer at the top of the results (AEO), and get named when someone asks ChatGPT or Perplexity (GEO). This article is one piece of that work for ${industry.name.toLowerCase()} teams.`,
      ],
    },
    {
      heading: `What ${industry.name.toLowerCase()} buyers in ${location.name} actually type`,
      paragraphs: [
        `They do not ask abstract questions. They type things like "${example}". If your page does not answer that in the first screen, Google and AI tools will use someone else.`,
        `The usual failure here is simple: ${industry.risk} Proof that works in this field is ${industry.proof}`,
        pick(
          [
            `${location.name} pages must match ${location.currency} prices and ${location.country} rules. A US fee table on a ${location.name} page makes people leave.`,
            `If the site is English-only and the city searches in ${location.searchLanguage}, you have already lost the first visit.`,
            `Office names, phone numbers, and licenses must match across the site and Maps. AI tools copy the mess if you have three versions.`,
          ],
          seed,
          3,
        ),
      ],
    },
    {
      heading: topic.questions[0] ?? "What to fix first",
      paragraphs: [
        `Start with a technical check. Can Google open the page on a phone? Is the page in the sitemap? Does robots.txt block the important bots? If the answer is no, more blog posts will not help.`,
        `Then write one page that answers "${example}" in ${location.searchLanguage}. Put the answer in the first paragraph. Add a short FAQ under it. Mark the FAQ up with schema that matches the text on the screen.`,
        `${topic.summary} For AEO, keep the answer between forty and sixty words so Google can lift it. For GEO, add a source, a date, and a named author so ChatGPT has something it can defend.`,
      ],
    },
    {
      heading: `A simple plan for ${industry.name.toLowerCase()} teams`,
      paragraphs: [
        `Week one: list the ten searches and ten AI prompts that already come up on sales calls in ${location.name}. Open the URLs that should answer them. Write down what is missing.`,
        `Week two: fix crawl issues and put hours, fees, and limits in normal text. ${industry.proof} Do not hide that information in a PDF or behind a form.`,
        `Week three: add the FAQ, schema, and an author line. Submit the sitemap. Update llms.txt if your offer or city list changed. Then measure. Check rankings, snippets, and whether AI tools name you. Search Console will not show an AI tab. Keep a simple sheet.`,
      ],
    },
    {
      heading: topic.questions[1] ?? "How this ties to SEO, AEO, and GEO",
      paragraphs: [
        `SEO is the ranking. AEO is the short answer. GEO is the AI mention. One page should do all three. We do not write a second website only for AI.`,
        ymyl,
        `If you only publish this article and leave the service page empty, people will read and leave. Pair this note with the ${location.name} service page and an author page. Update the dates when fees or licenses change. A new date on old copy is worse than an old date.`,
      ],
    },
  ];
}

function faqsFor(
  topic: Topic,
  industry: Industry,
  location: Location,
  seed: string,
): FaqItem[] {
  const items: FaqItem[] = [
    {
      question: `Does this advice work for ${industry.name.toLowerCase()} companies in ${location.name}?`,
      answer: `Yes, if the page is written for ${location.country} and the ${industry.name.toLowerCase()} buyer. ${topic.summary} Copied global text rarely ranks or gets cited here.`,
    },
    {
      question: `What is the biggest ${industry.name.toLowerCase()} search risk in ${location.country}?`,
      answer: industry.risk,
    },
    {
      question: "Do we need an office in this city?",
      answer: `No. You do need honest copy, ${location.searchLanguage} answers, and prices in ${location.currency}. A fake local address is worse than saying you serve ${location.name} remotely.`,
    },
    {
      question: "How should we prove what we say?",
      answer: industry.proof,
    },
    {
      question: "How often should we update this page?",
      answer: `Every quarter for competitive ${industry.name.toLowerCase()} searches in ${location.name}, and the same day if fees, hours, or licenses change.`,
    },
    {
      question: "What should we send for a first audit?",
      answer: `Your website, Search Console, the searches that already bring sales, the cities you sell in, and any claims legal will not allow. We start there.`,
    },
  ];
  return pickN(items, 5, `${seed}:faq`);
}

export function composeBlog(
  topic: Topic,
  industry: Industry,
  location: Location,
): BlogArticle {
  const seed = seedOf(topic, industry, location);
  const dates = dateFromSeed(seed);
  const body = sections(topic, industry, location, seed);
  const title = titleFor(topic, industry, location);
  const words = body.reduce(
    (sum, section) =>
      sum + section.heading.split(/\s+/).length + section.paragraphs.join(" ").split(/\s+/).length,
    0,
  );
  return {
    slug: `${topic.slug}/${industry.slug}/${location.slug}`,
    topic,
    industry,
    location,
    title,
    description: clipMeta(
      `${topic.title} for ${industry.name} in ${location.name}. Clear steps for SEO, AEO, and GEO.`,
    ),
    h1: title,
    lede: `A plain-language guide to ${topic.title.toLowerCase()} for ${industry.name.toLowerCase()} teams selling in ${location.name}.`,
    sections: body,
    faqs: faqsFor(topic, industry, location, seed),
    author: authorFor(seed),
    reviewer,
    published: dates.published,
    updated: dates.updated,
    readingMinutes: Math.max(4, Math.round(words / 180)),
    image: imageFor(seed),
    sources: pickN(SOURCES, 3, `${seed}:src`),
  };
}
