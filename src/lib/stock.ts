import type { CommercialCluster } from "@/lib/data/commercial";

export const STOCK = {
  seo: { src: "/images/seo.jpg", alt: "Laptop showing a search analytics dashboard" },
  geo: { src: "/images/geo.jpg", alt: "Two colleagues reviewing work on laptops" },
  aeo: { src: "/images/workshop.jpg", alt: "Team workshop mapping questions on a wall" },
  website: { src: "/images/website.jpg", alt: "Developer writing code for a website" },
  local: { src: "/images/street.jpg", alt: "Retail street with storefronts" },
  audit: { src: "/images/library.jpg", alt: "Person working through documents on a laptop" },
  pricing: { src: "/images/documents.jpg", alt: "Laptop with charts and a notebook on a desk" },
  integrated: { src: "/images/collaboration.jpg", alt: "Team working together around laptops" },
  collaboration: { src: "/images/collaboration.jpg", alt: "Team working together around laptops" },
  team: { src: "/images/team.jpg", alt: "Team talking through a plan" },
  city: { src: "/images/city-dusk.jpg", alt: "City office towers" },
  office: { src: "/images/office-glass.jpg", alt: "Bright glass office interior" },
  plan: { src: "/images/workshop.jpg", alt: "Team planning around a table" },
  typing: { src: "/images/typing.jpg", alt: "Person typing on a laptop" },
  handshake: { src: "/images/handshake.jpg", alt: "Business handshake after a meeting" },
  meeting: { src: "/images/meeting.jpg", alt: "Team meeting around a table" },
} as const;

export type StockKey = keyof typeof STOCK;

export function stockForCluster(cluster: CommercialCluster) {
  return STOCK[cluster] ?? STOCK.seo;
}

export function stockForFamily(family: string) {
  if (family === "geo") return STOCK.geo;
  if (family === "aeo") return STOCK.aeo;
  if (family === "local") return STOCK.local;
  if (family === "field") return STOCK.integrated;
  return STOCK.seo;
}

export function stockForGuide(slug: string) {
  if (slug.includes("website") || slug.includes("redesign") || slug.includes("architecture")) return STOCK.website;
  if (slug.includes("chatgpt") || slug.includes("geo") || slug.includes("ai-search") || slug.includes("ai-visibility")) {
    return STOCK.geo;
  }
  if (slug.includes("cost") || slug.includes("pricing")) return STOCK.pricing;
  if (slug.includes("seo-vs")) return STOCK.aeo;
  return STOCK.typing;
}

export function sideStock(cluster: CommercialCluster) {
  if (cluster === "website") return STOCK.typing;
  if (cluster === "geo" || cluster === "aeo") return STOCK.aeo;
  if (cluster === "local") return STOCK.city;
  if (cluster === "pricing") return STOCK.handshake;
  return STOCK.collaboration;
}
