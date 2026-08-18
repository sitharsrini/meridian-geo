import type { Metadata } from "next";
import Image from "next/image";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { clipMeta } from "@/lib/seo/meta";
import { faqNode, organizationNode } from "@/lib/seo/schema";
import { STOCK } from "@/lib/stock";

export const metadata: Metadata = {
  title: "FAQ",
  description: clipMeta(
    "Plain answers about what Meridian provides: SEO, AEO, GEO, timelines, and city pages.",
  ),
};

const faqs = [
  {
    question: "What does Meridian do?",
    answer:
      "We are a search agency for SEO, AEO, and GEO. Rankings, featured snippets and answer boxes, and citations in ChatGPT, Perplexity, and AI Overviews. Same pages. Every major field. 200 cities.",
  },
  {
    question: "What is the difference between SEO, AEO, and GEO?",
    answer:
      "SEO is ranking in search results. AEO is winning the extracted answer: snippets, People Also Ask, voice, and FAQ. GEO is being named in AI-generated answers. We run all three on one URL. We do not build a second site for machines.",
  },
  {
    question: "Do you cover every type of SEO?",
    answer:
      "Yes. Technical, on-page, content, links, Core Web Vitals, migrations, programmatic, local, international, multilingual, franchise, ecommerce, SaaS, and YMYL fields such as health, law, and finance.",
  },
  {
    question: "Which AI tools do you work on?",
    answer:
      "Google AI Overviews and AI Mode, ChatGPT, Perplexity, Claude, Gemini, and Microsoft Copilot. Plus the files those systems read: robots.txt, llms.txt, schema, and pricing.md.",
  },
  {
    question: "Do you really cover 200 cities?",
    answer:
      "Yes. Each city page is built from local language, currency, industries, and nearby markets. We do not publish a paragraph that would still work if you swapped the city name.",
  },
  {
    question: "How long until we see results?",
    answer:
      "Technical and crawler fixes can show in weeks. Competitive rankings and AI citations usually take a quarter of consistent pages, links, and measurement. We do not sell overnight rankings.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-[820px] px-4 py-12">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [organizationNode(), faqNode(faqs)] }} />
      <h1 className="text-4xl tracking-tight">FAQ</h1>
      <div className="relative mt-8 aspect-[16/8] overflow-hidden bg-[var(--paper-2)]">
        <Image src={STOCK.meeting.src} alt={STOCK.meeting.alt} fill sizes="(min-width: 820px) 820px, 100vw" className="object-cover" />
      </div>
      <div className="mt-8">
        <FaqList items={faqs} />
      </div>
    </div>
  );
}
