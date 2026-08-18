import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const allowAll = [
  "*",
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...allowAll.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
      {
        userAgent: "CCBot",
        disallow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
