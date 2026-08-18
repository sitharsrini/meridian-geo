export function Coords({ lat, lng, label }: { lat: number; lng: number; label: string }) {
  return (
    <p className="font-mono text-xs tracking-wide text-[var(--muted)]">
      {label} {lat.toFixed(2)} / {lng.toFixed(2)}
    </p>
  );
}
