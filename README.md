# Meridian

A search agency site for SEO, AEO, and GEO. Fifty services across 200 cities produce 10,000 market pages. Fifty topics, 40 fields, and 100 cities produce 200,000 journal notes.

Pages are composed from local facts (language, currency, industries, coordinates) so they are not doorway copies of each other. Blogs are generated on request and listed in a sitemap index.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Motion
- JSON-LD, robots.txt, llms.txt, pricing.md

## Counts

| Surface | Count |
| --- | --- |
| Services | 50 |
| Cities | 200 |
| Market pages `/geo/[service]/[location]` | 10,000 |
| Journal notes `/blog/[topic]/[industry]/[location]` | 200,000 |

## Develop

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `NEXT_PUBLIC_SITE_URL` to the public domain before deploy so sitemaps, canonicals, and schema use the right host.

## Discovery files

- `/robots.txt` allows major search and AI citation crawlers
- `/sitemap.xml` is an index of 51 files (`/sitemaps/0` through `/sitemaps/50`) covering all 210,000 URLs
- `/llms.txt` is the agent overview
- `/pricing.md` is machine-readable pricing

Leads from the contact form are appended to `data/leads.json`.
