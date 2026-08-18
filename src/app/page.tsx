import Image from "next/image";
import Link from "next/link";
import { GrowthChart } from "@/components/growth-chart";
import { Reveal } from "@/components/reveal";
import { services, locations, LANDING_COUNT, BLOG_COUNT } from "@/lib/catalog";
import { commercialPages } from "@/lib/data/commercial";
import { site } from "@/lib/site";

const pillars = [
  {
    title: "SEO",
    text: "Agency, services, consultant, audit, local, technical, and pricing.",
    href: "/seo-agency",
    image: "/images/seo.jpg",
    alt: "Person reviewing search and analytics on a laptop",
  },
  {
    title: "GEO and AEO",
    text: "AI search, ChatGPT, snippets, visibility audits, and monitoring.",
    href: "/ai-search-optimization-agency",
    image: "/images/geo.jpg",
    alt: "Two colleagues reviewing work on laptops",
  },
  {
    title: "Website",
    text: "Development, redesign, and AI-ready builds that convert.",
    href: "/website-development-agency",
    image: "/images/website.jpg",
    alt: "Developer building a website",
  },
  {
    title: "Local and fields",
    text: "200 cities. Clinics, SaaS, retail, and every other field we rank.",
    href: "/local-seo-agency",
    image: "/images/street.jpg",
    alt: "Street with local storefronts",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 pb-16 pt-10 md:grid-cols-12 md:px-8 md:pt-16">
        <div className="md:col-span-6">
          <p className="font-mono text-xs tracking-[0.18em] text-[var(--mark)]">SEO · GEO · AEO · WEBSITE</p>
          <h1 className="mt-4 max-w-[16ch] text-4xl leading-[1.05] tracking-tight md:text-6xl">
            Found on Google and AI. Built to convert.
          </h1>
          <p className="mt-5 max-w-[40ch] text-lg text-[var(--muted)]">
            Search agency plus website team. Global English-speaking market.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={site.cta.href}
              className="bg-[var(--accent)] px-5 py-3 text-sm text-[var(--paper)] transition hover:bg-[var(--accent-2)]"
            >
              {site.cta.label}
            </Link>
            <Link href="/seo-agency" className="border border-[var(--line)] px-5 py-3 text-sm">
              SEO agency
            </Link>
          </div>
        </div>
        <div className="relative md:col-span-6">
          <div className="relative aspect-[5/4] overflow-hidden bg-[var(--paper-2)]">
            <Image
              src="/images/hero.jpg"
              alt="Analytics charts on a laptop screen"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mt-2 font-mono text-xs text-[var(--muted)]">
            {LANDING_COUNT.toLocaleString()} market pages · {BLOG_COUNT.toLocaleString()} field notes
          </p>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--paper-2)]">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-10 gap-y-3 px-4 py-6 md:px-8">
          {["Google", "Maps", "Snippets", "PAA", "ChatGPT", "Perplexity", "AI Overviews", "Claude"].map((name) => (
            <span key={name} className="font-mono text-xs tracking-wide text-[var(--muted)]">
              {name}
            </span>
          ))}
        </div>
      </section>

      <Reveal>
        <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8">
          <h2 className="max-w-[18ch] text-3xl tracking-tight md:text-4xl">
            Everything in search. Not one slice of it.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {pillars.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="border border-[var(--line)] bg-white transition hover:bg-[var(--paper-2)]"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[var(--paper-2)]">
                  <Image src={item.image} alt={item.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl">{item.title}</h3>
                  <p className="mt-3 max-w-[42ch] text-[var(--muted)]">{item.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-[1400px] px-4 pb-8 md:px-8">
          <GrowthChart />
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto grid max-w-[1400px] items-center gap-10 px-4 py-8 md:grid-cols-2 md:px-8">
          <div className="relative aspect-[16/10] overflow-hidden bg-[var(--paper-2)]">
            <Image
              src="/images/studio.jpg"
              alt="Team collaborating around a table"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl tracking-tight">One page should do all three jobs.</h2>
            <p className="mt-4 max-w-[52ch] text-[var(--muted)] leading-relaxed">
              Rank in Google. Win the snippet. Get named in ChatGPT. We do not build a second website for machines. We write people-first pages that crawl, extract, and cite, then we measure all three.
            </p>
            <Link href="/methodology" className="mt-6 inline-block text-sm text-[var(--mark)]">
              Read the method
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8">
          <h2 className="text-3xl tracking-tight">Buyer pages</h2>
          <p className="mt-3 max-w-[55ch] text-[var(--muted)]">
            Hire, audit, pricing, website, GEO, and AEO. These match how people search when they are ready to buy.
          </p>
          <div className="mt-8 columns-1 gap-6 sm:columns-2 lg:columns-3">
            {commercialPages.map((page) => (
              <p key={page.slug} className="mb-2 text-sm">
                <Link href={`/${page.slug}`}>{page.keyword}</Link>
              </p>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto max-w-[1400px] px-4 py-20 md:px-8">
          <h2 className="text-3xl tracking-tight">Services people search for</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 9).map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="border border-[var(--line)] p-5">
                <h3 className="text-lg">{service.name}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{service.summary}</p>
              </Link>
            ))}
          </div>
          <Link href="/services" className="mt-6 inline-block text-sm text-[var(--mark)]">
            All {services.length} services
          </Link>
        </section>
      </Reveal>

      <Reveal>
        <section className="border-y border-[var(--line)]">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-20 md:grid-cols-12 md:px-8">
            <div className="md:col-span-5">
              <h2 className="text-3xl tracking-tight">Markets we cover</h2>
              <p className="mt-4 max-w-[40ch] text-[var(--muted)]">
                From Lagos to Tokyo, each city page carries language, currency, and local industries. Not a swapped name.
              </p>
            </div>
            <ul className="columns-2 gap-8 text-sm md:col-span-7 md:columns-3">
              {locations.slice(0, 24).map((location) => (
                <li key={location.slug} className="mb-2">
                  <Link href={`/locations/${location.slug}`}>
                    {location.name}, {location.countryCode}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="mx-auto grid max-w-[1400px] gap-10 px-4 py-20 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="text-3xl tracking-tight">A briefing, not a pitch deck.</h2>
            <p className="mt-4 max-w-[50ch] text-[var(--muted)] leading-relaxed">
              Send the queries and prompts that already start deals. We return a crawl audit, an answer map, and the first pages that should rank and get cited.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex bg-[var(--accent)] px-5 py-3 text-sm text-[var(--paper)]"
            >
              {site.cta.label}
            </Link>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-[var(--paper-2)]">
            <Image
              src="/images/documents.jpg"
              alt="Laptop with business charts and a notebook"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </section>
      </Reveal>
    </>
  );
}
