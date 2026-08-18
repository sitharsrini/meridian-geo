import Image from "next/image";

export function Frame({
  src,
  alt,
  caption,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--paper-2)]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      {caption ? <figcaption className="mt-2 text-sm text-[var(--muted)]">{caption}</figcaption> : null}
    </figure>
  );
}
