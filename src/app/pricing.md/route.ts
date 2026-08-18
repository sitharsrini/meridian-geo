import { site } from "@/lib/site";

export function GET() {
  const body = `# Pricing — ${site.name}

Currency: GBP. Starting ranges. Final fees depend on languages, YMYL review, and number of live markets.

## Audit
- Price: from 4800 GBP, one-time
- Time: about 2 weeks
- Includes: crawl audit, keyword map, 10-page rewrite list
- Limits: one brand, one primary language

## Market program
- Price: from 12000 GBP per quarter
- Includes: one region, one field, monthly AI visibility log, page production
- Limits: agreed prompt set, one reviewer path

## Enterprise
- Price: custom — ${site.email}
- Includes: multi-country governance, YMYL legal review, thin-URL kill list, dedicated editor
- Limits: scoped after the audit

## Contact
- ${site.email}
- ${site.url}/contact
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
