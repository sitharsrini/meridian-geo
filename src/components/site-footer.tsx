import Link from "next/link";
import { site } from "@/lib/site";
import { locations, industries } from "@/lib/catalog";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[var(--line)] bg-[var(--paper-2)]">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-display text-xl text-[var(--ink)]">{site.name}</p>
          <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-[var(--muted)]">
            {site.tagline}. Offices in London, Dubai, and Singapore. Work in 200 markets.
          </p>
        </div>
        <div>
          <p className="text-sm text-[var(--ink)]">Hire us</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="/seo-agency">SEO agency</Link>
            </li>
            <li>
              <Link href="/geo-agency">GEO agency</Link>
            </li>
            <li>
              <Link href="/aeo-agency">AEO agency</Link>
            </li>
            <li>
              <Link href="/website-development-agency">Website development</Link>
            </li>
            <li>
              <Link href="/website-redesign-agency">Website redesign</Link>
            </li>
            <li>
              <Link href="/ai-visibility-audit">AI visibility audit</Link>
            </li>
            <li>
              <Link href="/seo-pricing">SEO pricing</Link>
            </li>
            <li>
              <Link href="/services">All services</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-[var(--ink)]">Markets</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            {locations.slice(0, 6).map((location) => (
              <li key={location.slug}>
                <Link href={`/locations/${location.slug}`}>{location.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/locations">All markets</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm text-[var(--ink)]">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
            <li>
              <Link href="/guides">Guides</Link>
            </li>
            <li>
              <Link href="/industries">Fields</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/methodology">Method</Link>
            </li>
            <li>
              <Link href="/editorial-policy">Editorial policy</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/contact">{site.cta.label}</Link>
            </li>
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-6 text-xs text-[var(--muted)] md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            {site.legalName}. Fields include {industries.slice(0, 4).map((item) => item.name.toLowerCase()).join(", ")} and more.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/llms.txt">llms.txt</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
