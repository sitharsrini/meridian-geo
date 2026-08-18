const points = [
  { label: "Start", vis: 18, leads: 8 },
  { label: "Q1", vis: 32, leads: 16 },
  { label: "Q2", vis: 52, leads: 30 },
  { label: "Q3", vis: 72, leads: 48 },
  { label: "Q4", vis: 92, leads: 74 },
];

const stages = [
  {
    label: "Audit",
    title: "See the gaps",
    text: "We check crawl, pages, snippets, and AI mentions. You get a written list, not a slide deck.",
  },
  {
    label: "Build",
    title: "Fix the website",
    text: "We repair the site or rebuild it so Google and AI tools can read it, and a buyer can convert.",
  },
  {
    label: "Show up",
    title: "Rank and get cited",
    text: "SEO for Google. AEO for the short answer. GEO so ChatGPT and Perplexity can name you.",
  },
  {
    label: "Grow",
    title: "Turn visits into leads",
    text: "Forms, proof, and a monthly report. The point is customers, not vanity traffic.",
  },
];

const W = 640;
const H = 260;
const PAD = { l: 44, r: 16, t: 24, b: 36 };

function xAt(i: number) {
  return PAD.l + (i * (W - PAD.l - PAD.r)) / (points.length - 1);
}

function yAt(value: number) {
  return PAD.t + ((100 - value) * (H - PAD.t - PAD.b)) / 100;
}

function linePath(key: "vis" | "leads") {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${xAt(index)} ${yAt(point[key])}`).join(" ");
}

function areaPath(key: "vis" | "leads") {
  const top = linePath(key);
  const last = xAt(points.length - 1);
  const first = xAt(0);
  const base = H - PAD.b;
  return `${top} L ${last} ${base} L ${first} ${base} Z`;
}

export function GrowthChart() {
  return (
    <section className="mt-16">
      <h2 className="text-2xl tracking-tight">How we help you grow</h2>
      <p className="mt-3 max-w-[58ch] text-[var(--muted)]">
        Visibility first, then leads. Same website. Search, answers, and AI citations feed one path.
      </p>
      <div className="mt-8 border border-[var(--line)] bg-white p-4 md:p-6">
        <div className="flex flex-wrap items-center gap-5 text-sm">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-6 bg-[#165fba]" />
            Search + AI visibility
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-6 bg-[#0f7a4d]" />
            Qualified leads
          </span>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 h-auto w-full" role="img" aria-labelledby="growth-title">
          <title id="growth-title">Typical growth path from audit to leads over four quarters</title>
          {[20, 40, 60, 80].map((tick) => (
            <g key={tick}>
              <line x1={PAD.l} x2={W - PAD.r} y1={yAt(tick)} y2={yAt(tick)} stroke="#e5e7eb" />
              <text x={PAD.l - 8} y={yAt(tick) + 4} textAnchor="end" fill="#64748b" fontSize="11">
                {tick}
              </text>
            </g>
          ))}
          <path d={areaPath("vis")} fill="#165fba" opacity="0.12" />
          <path d={areaPath("leads")} fill="#0f7a4d" opacity="0.16" />
          <path d={linePath("vis")} fill="none" stroke="#165fba" strokeWidth="3" />
          <path d={linePath("leads")} fill="none" stroke="#0f7a4d" strokeWidth="3" />
          {points.map((point, index) => (
            <g key={point.label}>
              <circle cx={xAt(index)} cy={yAt(point.vis)} r="4.5" fill="#165fba" />
              <circle cx={xAt(index)} cy={yAt(point.leads)} r="4.5" fill="#0f7a4d" />
              <text x={xAt(index)} y={H - 12} textAnchor="middle" fill="#334155" fontSize="12">
                {point.label}
              </text>
            </g>
          ))}
        </svg>
        <p className="mt-2 text-xs text-[var(--muted)]">
          Illustrative path after we fix the site and the search program. Not a guarantee.
        </p>
      </div>
      <ol className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stages.map((stage, index) => (
          <li key={stage.label} className="border border-[var(--line)] bg-white p-5">
            <p className="font-mono text-xs text-[var(--mark)]">
              {String(index + 1).padStart(2, "0")} {stage.label}
            </p>
            <h3 className="mt-3 text-lg">{stage.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{stage.text}</p>
            <div className="mt-4 h-2 bg-[var(--paper-2)]">
              <div className="h-2 bg-[var(--accent)]" style={{ width: `${(index + 1) * 25}%` }} />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
