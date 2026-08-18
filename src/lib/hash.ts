export function fnv(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function pick<T>(items: readonly T[], seed: string, salt = 0): T {
  return items[fnv(`${seed}:${salt}`) % items.length];
}

export function pickN<T>(items: readonly T[], count: number, seed: string): T[] {
  const pool = [...items];
  const out: T[] = [];
  let state = fnv(seed);
  while (out.length < count && pool.length > 0) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const index = state % pool.length;
    out.push(pool.splice(index, 1)[0]);
  }
  return out;
}

export function seededInt(seed: string, min: number, max: number): number {
  const span = max - min + 1;
  return min + (fnv(seed) % span);
}

export function imageFor(seed: string): string {
  const images = [
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
  ];
  return pick(images, seed, 11);
}
