import { clipMeta } from "@/lib/seo/meta";
import type { ContentSection, FaqItem, Industry, Location, Service } from "@/lib/types";

export function composeServiceHub(service: Service): {
  description: string;
  lede: string;
  sections: ContentSection[];
  faqs: FaqItem[];
} {
  return {
    description: clipMeta(
      `${service.name} from Meridian. We help you rank, win short answers, and get named in AI search.`,
    ),
    lede: `In plain words: we help people find you, we help Google show your short answer, and we help AI tools name your company.`,
    sections: [
      {
        heading: "What you are buying",
        paragraphs: [
          `${service.summary} You do not need to speak in acronyms. SEO is showing up on Google. AEO is winning the short answer at the top of the page. GEO is being named when someone asks ChatGPT or Perplexity. This service is the ${service.family.toUpperCase()} part of that stack.`,
          service.problem,
          service.promise,
        ],
      },
      {
        heading: "How the work runs",
        paragraphs: [
          `${service.method.join(". ")}.`,
          `Every engagement includes a technical look at crawl and index, a visible FAQ, matching schema, a sitemap entry, and an update to llms.txt when the offer changes. We write one set of pages for people. Machines read the same pages.`,
          `${service.whoFor}`,
        ],
      },
      {
        heading: "What you receive",
        paragraphs: [
          `You receive ${service.deliverables.join(", ").toLowerCase()}. You also receive a short report you can read without a specialist: what we fixed, what we wrote, and what moved.`,
          `We will not buy fake links, invent offices, or mark up FAQs that are not on the page. Competitive terms usually take a quarter. Technical fixes can show sooner.`,
        ],
      },
      {
        heading: "A technical check is always first",
        paragraphs: [
          `Before we write, we look at crawl errors, mobile pages, the sitemap, and robots.txt. If Google or AI tools cannot open the page, new copy will not help. We fix that first, then we write the ${service.name.toLowerCase()} pages, then we measure rankings, snippets, and AI mentions.`,
          `A normal first month looks like this. Week one is the check and the search list. Week two is the first pages and the FAQ. Week three is schema, sitemap, and llms.txt. Week four is the first report. You will know what we did without a slide deck.`,
          `You can book a search audit if you only want that check. Many teams start there, then pick the city pages they need. Competitive terms usually take a quarter. That is normal. Anyone who promises page one in a week is selling something else.`,
        ],
      },
    ],
    faqs: [
      {
        question: `What is ${service.name.toLowerCase()}?`,
        answer: service.summary,
      },
      {
        question: "Who is it for?",
        answer: service.whoFor,
      },
      {
        question: "What problem does it solve?",
        answer: service.problem,
      },
      {
        question: "Is SEO, AEO, and GEO included?",
        answer:
          "Yes. Rankings, short answers, and AI citations sit on the same pages. This service is one slice. The files (sitemap, schema, FAQ, llms.txt) come with it.",
      },
      {
        question: "What should we send to start?",
        answer:
          "Your website, Search Console, the searches that already bring sales, and any legal limits. We reply with a written plan.",
      },
    ],
  };
}

export function composeLocationHub(location: Location): {
  description: string;
  lede: string;
  sections: ContentSection[];
  faqs: FaqItem[];
} {
  return {
    description: clipMeta(
      `SEO, AEO, and GEO in ${location.name}. Rank on Google, win short answers, and get named in AI search.`,
    ),
    lede: `We help businesses in ${location.name} get found on Google, win the short answer, and get named when buyers ask AI who to hire.`,
    sections: [
      {
        heading: "What we provide in this city",
        paragraphs: [
          `${location.name} is in ${location.region}, ${location.country}. About ${location.population} people live here. Daily search happens in ${location.searchLanguage}. Prices and invoices use ${location.currency}. Local work includes ${location.industries.join(", ")}.`,
          `Meridian runs SEO, AEO, and GEO for this market. SEO means we help you rank. AEO means we help Google show a short answer from your site. GEO means we help ChatGPT and other AI tools name you. We write those pages in ${location.searchLanguage} first.`,
          `If your current site could describe any other city, it will not help you in ${location.name}. We will not invent a local office. We will not swap this city name into a global paragraph.`,
        ],
      },
      {
        heading: "How a city program works",
        paragraphs: [
          `We start with a technical audit: can Google open your pages on a phone, is the sitemap complete, and does robots.txt block the bots you need. Then we list the searches and AI prompts people in ${location.name} already use.`,
          `Then we write or repair the pages. Each one has a clear first answer, a visible FAQ, schema that matches the text, and links to nearby cities. We add the URLs to the sitemap and mention the city in llms.txt when the offer is live.`,
          `Languages here include ${location.languages.join(" and ")}. If we need a second language, it is a real page, not a machine dump. Competitive terms usually take a quarter. Crawl fixes can show in weeks.`,
        ],
      },
      {
        heading: "What you receive",
        paragraphs: [
          `A written plan, the page set for the services you chose, FAQ and schema, sitemap updates, and a monthly note on rankings, snippets, and AI mentions. You can read the note without a specialist.`,
          `The plan names the searches to target, the pages to write, and the files to update (sitemap, robots.txt, llms.txt). You will know what we are doing each month. A first month is usually the technical check, the first city pages, the FAQ, and the first report.`,
          `If you already have a site, we start by listing what Google can already see. If you do not, we say what the first five pages should be. Either way you get a list you can share with your team.`,
          `Pick a service below to open the ${location.name} page for that work, or book a search audit and we will tell you where to start.`,
        ],
      },
    ],
    faqs: [
      {
        question: `Do you work with companies that only serve ${location.name} remotely?`,
        answer: `Yes. We say so on the page. We will not publish a fake ${location.name} address.`,
      },
      {
        question: "What language do you write in?",
        answer: `${location.searchLanguage} first. Other languages are extra pages.`,
      },
      {
        question: "Is a technical audit included?",
        answer: "Yes. Crawl, sitemap, robots.txt, and mobile checks come before we write new pages.",
      },
      {
        question: "What do SEO, AEO, and GEO mean here?",
        answer: `SEO is ranking on Google in ${location.name}. AEO is winning the short answer at the top. GEO is being named when someone asks ChatGPT or Perplexity. We do all three on the same pages.`,
      },
      {
        question: "How long does a first month take?",
        answer: `Week one is the check. Weeks two and three are pages, FAQ, schema, and sitemap. Week four is the first report. Competitive ${location.industries[0]} terms usually take a quarter.`,
      },
    ],
  };
}

export function composeIndustryHub(industry: Industry): {
  description: string;
  lede: string;
  sections: ContentSection[];
  faqs: FaqItem[];
} {
  return {
    description: clipMeta(
      `${industry.name} SEO, AEO, and GEO. Rank, win short answers, and get named in AI search.`,
    ),
    lede: `Search work for ${industry.buyer}. We help you rank, win the short answer, and get named in AI tools.`,
    sections: [
      {
        heading: "What we provide in this field",
        paragraphs: [
          `Meridian runs SEO, AEO, and GEO for ${industry.name.toLowerCase()} teams. SEO is ranking on Google. AEO is the short answer at the top. GEO is being named in ChatGPT, Perplexity, or AI Overviews. One page should do all three.`,
          `The usual failure in this field is simple: ${industry.risk} What works as proof is ${industry.proof}`,
          `Buyers type things like "${industry.queryExamples[0]}" and "${industry.queryExamples[1] ?? industry.queryExamples[0]}". If your page does not answer that in the first screen, you lose the visit.`,
          `SEO in this field means the right titles and crawlable pages. AEO means a short answer Google can show at the top. GEO means ChatGPT can name you without inventing your offer. We do those three jobs on the same URL.`,
        ],
      },
      {
        heading: "How we keep the work honest",
        paragraphs: [
          industry.ymyl
            ? "This field can affect money or health. We name a reviewer, we cite public rules, and we do not promise outcomes."
            : "We still name the writer, date the page, and refuse fake statistics.",
          `Every industry program includes a technical audit, a visible FAQ, matching schema, sitemap entries, and an llms.txt update when the offer changes. We do not build a second site only for AI.`,
          `We also refuse copied city pages. A ${industry.name.toLowerCase()} page for London cannot be reused in Dubai with one word changed. If a paragraph still works after you swap the city, we do not publish it.`,
        ],
      },
      {
        heading: "What you receive",
        paragraphs: [
          `You receive a written plan, the pages for the services you choose, FAQ and schema on those pages, sitemap updates, and a monthly note on rankings, snippets, and AI mentions. You can read the note without a specialist.`,
          `We also check the technical basics: can Google open the pages, is the sitemap complete, and are AI crawlers allowed if you want citations. That check happens before we write. Then we write the pages, add the FAQ, and send a report you can read in five minutes.`,
          `Open a guide below for a longer walkthrough, or book a search audit if you want us to look at your own URLs first. Competitive terms usually take a quarter. Crawl fixes can show in weeks. If you sell in more than one city, we start with the city that already brings calls, then copy the method, not the paragraph.`,
        ],
      },
    ],
    faqs: [
      {
        question: `Who is ${industry.name.toLowerCase()} search for?`,
        answer: industry.buyer,
      },
      {
        question: "What is the main risk?",
        answer: industry.risk,
      },
      {
        question: "How do we prove claims?",
        answer: industry.proof,
      },
      {
        question: "What do SEO, AEO, and GEO mean here?",
        answer:
          "SEO is ranking on Google. AEO is the short answer at the top of the results. GEO is being named in ChatGPT or Perplexity. One page should do all three.",
      },
      {
        question: "Is a technical audit included?",
        answer:
          "Yes. We check crawl, mobile, sitemap, and robots.txt before we write. If Google cannot open the page, new copy will not help.",
      },
      {
        question: "How long until we see movement?",
        answer:
          "Crawl fixes can show in weeks. Competitive terms usually take a quarter. We do not sell overnight rankings.",
      },
    ],
  };
}
