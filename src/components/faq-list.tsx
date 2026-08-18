import type { FaqItem } from "@/lib/types";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-[var(--line)] border-y border-[var(--line)]">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="cursor-pointer list-none text-lg leading-snug text-[var(--ink)] [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-6">
              {item.question}
              <span className="mt-1 font-mono text-xs text-[var(--muted)] transition group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 max-w-[62ch] text-[var(--muted)] leading-relaxed">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
