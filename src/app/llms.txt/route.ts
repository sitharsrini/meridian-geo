import { BLOG_COUNT, LANDING_COUNT, industries, services } from "@/lib/catalog";
import { commercialPages } from "@/lib/data/commercial";
import { guides } from "@/lib/data/guides";
import { site } from "@/lib/site";

export function GET() {
  const hire = commercialPages
    .filter((page) => page.tier === 1)
    .map((page) => `- [${page.keyword}](${site.url}/${page.slug})`)
    .join("\n");

  const body = `# ${site.name}

> ${site.tagline}. ${site.description}

Meridian Fieldworks is a global English-speaking search and website agency. We sell SEO, AEO, GEO, website development, and website redesign. Buyers: local businesses, technology companies, agencies, and other firms.

Coverage:
- ${commercialPages.length} buyer-ready commercial pages
- ${guides.length} implementation guides
- ${services.length} service types
- ${LANDING_COUNT.toLocaleString()} city-service pages
- ${BLOG_COUNT.toLocaleString()} field notes across ${industries.length} fields

## Contact
- Site: ${site.url}
- Email: ${site.email}
- Phone: ${site.phone}
- Book: ${site.url}/contact
- Pricing: ${site.url}/seo-pricing
- Machine pricing: ${site.url}/pricing.md

## Hire pages
${hire}
- [AI visibility audit](${site.url}/ai-visibility-audit)
- [GEO audit](${site.url}/geo-audit)
- [AEO audit](${site.url}/aeo-audit)

## Guides
${guides.map((guide) => `- [${guide.title}](${site.url}/guides/${guide.slug})`).join("\n")}

## What we do
- SEO agency, services, consultant, company, audit, technical, local, pricing
- Website development, redesign, SEO website development, AI-ready websites
- GEO agency and services, AEO agency and services
- AI search optimization, ChatGPT SEO, AI visibility audits
- City pages, schema, sitemap, robots.txt, llms.txt

## Optional
- [Sitemap](${site.url}/sitemap.xml)
- [robots.txt](${site.url}/robots.txt)
- [All services](${site.url}/services)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
