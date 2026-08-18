import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { locations } from "@/lib/catalog";
import { clipMeta } from "@/lib/seo/meta";
import { STOCK } from "@/lib/stock";

export const metadata: Metadata = {
  title: "Markets",
  description: clipMeta(
    "200 cities for SEO, AEO, and GEO. Local pages that rank, answer, and get named in AI search.",
  ),
};

export default function LocationsPage() {
  const continents = [...new Set(locations.map((item) => item.continent))];
  return (
    <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-8">
      <h1 className="text-4xl tracking-tight">Markets</h1>
      <p className="mt-4 max-w-[60ch] text-[var(--muted)]">
        Two hundred cities. Each one has fifty service pages and a stack of field notes. We cover the markets where buyers already ask AI for help.
      </p>
      <div className="relative mt-8 aspect-[16/7] overflow-hidden bg-[var(--paper-2)]">
        <Image src={STOCK.city.src} alt={STOCK.city.alt} fill sizes="100vw" className="object-cover" />
      </div>
      {continents.map((continent) => (
        <section key={continent} className="mt-12">
          <h2 className="text-2xl tracking-tight">{continent}</h2>
          <div className="mt-5 columns-2 gap-6 md:columns-4">
            {locations
              .filter((item) => item.continent === continent)
              .map((location) => (
                <p key={location.slug} className="mb-2 text-sm">
                  <Link href={`/locations/${location.slug}`}>
                    {location.name}, {location.country}
                  </Link>
                </p>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
