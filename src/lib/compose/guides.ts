import type { GuideRecord } from "@/lib/data/guides";
import { clipMeta } from "@/lib/seo/meta";
import type { ContentSection, FaqItem } from "@/lib/types";

export function composeGuide(guide: GuideRecord) {
  const sections: ContentSection[] = [
    {
      heading: "What this guide is for",
      paragraphs: [
        `${guide.summary} It is written for founders, marketing leads, and agencies who need a decision, not a glossary.`,
        `Meridian is a search and website agency. We sell SEO, AEO (answer engine optimization), GEO (generative engine optimization), and the website build or redesign that has to carry all three. This guide is part of that system.`,
        `The buyer pool is global and English-speaking: local businesses, technology companies, agencies, and other firms. The advice still has to be local when you publish. Currency, language of search, and licenses change by city.`,
      ],
    },
    {
      heading: "The short answer",
      paragraphs: [
        `${guide.h1.replace(/:$/, "")} starts with a crawlable page that answers the question in the first screen. SEO gets that page retrieved. AEO gets a 40 to 60 word block lifted into a snippet. GEO gets a named source an AI tool can cite.`,
        `Do not build a second website for AI. Google treats that as a spam risk. One URL, one claim, files that machines can read: sitemap, robots.txt, schema, llms.txt.`,
      ],
    },
    {
      heading: "What to change on the website",
      paragraphs: [
        `Technical: mobile crawl, status codes, canonicals, Core Web Vitals, and a sitemap that lists the money pages. If Googlebot cannot fetch the HTML, ChatGPT will not find a clean source either.`,
        `Content: one idea per paragraph, headings that match how people ask, a visible FAQ, and a named author. For commercial pages, put the offer and the form on the same URL as the ranking content.`,
        `Authority: honest reviews, consistent name and address, and mentions on sites people already trust. AI tools cite third parties more than they cite your blog.`,
      ],
    },
    {
      heading: "How we run this at Meridian",
      paragraphs: [
        `Week one is an audit: SEO, AEO, and GEO on the same scorecard. Week two and three are implementation: pages, schema, files, or a rebuild. Week four is the first report. Competitive terms take a quarter.`,
        `If the site itself is the blocker, we redesign or develop it. That is the layer most GEO and AEO shops skip. Measurement without a crawlable page is a dashboard with nothing to measure.`,
      ],
    },
    {
      heading: "What to do next",
      paragraphs: [
        `If you need the work done, book a search audit. If you are comparing options, read SEO vs GEO vs AEO and the pricing page. If you are a developer, start with the AI-ready website page.`,
        `We will not invent rankings, fake reviews, or a local office you do not have. The plan you get is something you can hand to a founder without translating it.`,
      ],
    },
  ];

  const faqs: FaqItem[] = [
    {
      question: `Who should read ${guide.title.toLowerCase()}?`,
      answer: `Founders, CMOs, and agencies deciding what to change on a live site. ${guide.summary}`,
    },
    {
      question: "Is this SEO, AEO, or GEO?",
      answer:
        "All three. Rankings, short answers, and AI citations use the same pages. The website has to support all of them.",
    },
    {
      question: "Do we need a new website?",
      answer:
        "Only if crawl, structure, or conversion is broken. Many teams start with an audit, then decide between a page program and a redesign.",
    },
    {
      question: "How do you measure this?",
      answer:
        "Rankings and Search Console for SEO. Snippet presence for AEO. A fixed prompt set across ChatGPT, Perplexity, and AI Overviews for GEO. Search Console has no AI tab.",
    },
    {
      question: "Can we hire you only for the website?",
      answer:
        "Yes. Website development and redesign are standalone. Search retainers are optional after launch.",
    },
  ];

  return {
    guide,
    title: `${guide.title} | Meridian`,
    description: clipMeta(`${guide.title}. ${guide.summary}`),
    lede: guide.summary,
    sections,
    faqs,
  };
}
