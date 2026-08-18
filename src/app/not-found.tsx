import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[640px] px-4 py-24">
      <h1 className="text-4xl tracking-tight">That page is not on the map.</h1>
      <p className="mt-4 text-[var(--muted)]">The URL may be mistyped, or the market slug may have changed.</p>
      <Link href="/" className="mt-8 inline-flex bg-[var(--accent)] px-5 py-3 text-sm text-[var(--paper)]">
        Back to Meridian
      </Link>
    </div>
  );
}
