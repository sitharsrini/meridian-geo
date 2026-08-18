/** Search snippets work best at 120-130 characters. Only whole sentences or whole words. */
export function clipMeta(input: string, min = 120, max = 130): string {
  const base = input.replace(/\s+/g, " ").trim();
  const pads = [
    "",
    " Act now.",
    " Start this week.",
    " Book an audit.",
    " Written in plain English.",
    " FAQ and sitemap included.",
    " Book a search audit today.",
    " Request your written plan.",
  ];

  const combos: string[] = [];
  for (const first of pads) {
    for (const second of pads) {
      if (first && first === second) continue;
      const text = `${base.replace(/[.!?]$/, "")}.${first}${second}`
        .replace(/\.\./g, ".")
        .replace(/\s+/g, " ")
        .trim();
      combos.push(text);
    }
  }

  const exact = combos.find((item) => item.length >= min && item.length <= max);
  if (exact) return exact;

  const under = combos
    .filter((item) => item.length <= max)
    .sort((a, b) => b.length - a.length)[0];
  if (under && under.length >= min) return under;

  if (base.length > max) {
    for (let end = max; end >= min; end -= 1) {
      const slice = base.slice(0, end);
      const space = slice.lastIndexOf(" ");
      const candidate = `${(space > 80 ? slice.slice(0, space) : slice).replace(/[,;:.-]+$/, "")}.`;
      if (candidate.length >= min && candidate.length <= max) return candidate;
    }
    const forced = `${base.slice(0, max).replace(/\s+\S*$/, "").replace(/[,;:.-]+$/, "")}.`;
    if (forced.length >= min && forced.length <= max) return forced;
    return `${base.slice(0, max - 1).trimEnd()}.`;
  }

  return base;
}

export function wordCount(...parts: string[]): number {
  return parts
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}
