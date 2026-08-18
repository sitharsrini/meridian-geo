import { clipMeta } from "@/lib/seo/meta";

export const site = {
  name: "Meridian",
  legalName: "Meridian Fieldworks Ltd",
  shortName: "Meridian Search",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  tagline: "SEO, AEO, and GEO for every market",
  description: clipMeta(
    "Meridian helps you rank on Google, win short answers, and get named in ChatGPT. SEO, AEO, and GEO in 200 cities.",
  ),
  email: "hello@meridianfieldworks.com",
  phone: "+44 20 4526 1904",
  foundingDate: "2022",
  locale: "en",
  twitter: "@meridianfield",
  cta: {
    label: "Book a search audit",
    href: "/contact",
  },
  offices: [
    {
      city: "London",
      region: "England",
      country: "United Kingdom",
      countryCode: "GB",
      address: "14 Hatton Garden",
      postal: "EC1N 8AT",
      lat: 51.5205,
      lng: -0.1084,
    },
    {
      city: "Dubai",
      region: "Dubai",
      country: "United Arab Emirates",
      countryCode: "AE",
      address: "Office 2408, Saba Tower 1, Jumeirah Lakes Towers",
      postal: "00000",
      lat: 25.0693,
      lng: 55.1416,
    },
    {
      city: "Singapore",
      region: "Singapore",
      country: "Singapore",
      countryCode: "SG",
      address: "71 Robinson Road, #14-01",
      postal: "068895",
      lat: 1.2789,
      lng: 103.8485,
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/meridian-fieldworks",
  ],
} as const;

export const IMAGES = [
  "/images/hero.jpg",
  "/images/studio.jpg",
  "/images/map-hands.jpg",
  "/images/city-dusk.jpg",
  "/images/library.jpg",
  "/images/documents.jpg",
  "/images/street.jpg",
  "/images/harbor.jpg",
  "/images/seo.jpg",
  "/images/geo.jpg",
  "/images/website.jpg",
  "/images/workshop.jpg",
  "/images/typing.jpg",
  "/images/team.jpg",
  "/images/collaboration.jpg",
  "/images/meeting.jpg",
  "/images/office-glass.jpg",
] as const;

export function absUrl(path = "/") {
  const base = site.url.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
