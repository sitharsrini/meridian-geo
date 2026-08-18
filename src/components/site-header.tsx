"use client";

import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { href: "/seo-agency", label: "SEO" },
  { href: "/geo-agency", label: "GEO / AEO" },
  { href: "/website-development-agency", label: "Website" },
  { href: "/guides", label: "Guides" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color:var(--paper)]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8">
        <Link href="/" className="font-display text-lg tracking-tight text-[var(--ink)]">
          {site.name}
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-[var(--muted)] lg:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-[var(--ink)]">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={site.cta.href}
            className="hidden bg-[var(--accent)] px-4 py-2 text-sm text-[var(--paper)] transition hover:bg-[var(--accent-2)] sm:inline-flex"
          >
            {site.cta.label}
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-[var(--ink)] lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-[var(--line)] px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3 text-base">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href={site.cta.href} onClick={() => setOpen(false)} className="text-[var(--mark)]">
              {site.cta.label}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
