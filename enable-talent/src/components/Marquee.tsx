interface Props {
  items: string[];
  label?: string;
}

/** Continuous logo/skill marquee. Pure CSS animation, paused on hover, static under reduced motion. */
export default function Marquee({ items, label }: Props) {
  const doubled = [...items, ...items];
  return (
    <div className="border-y border-ink-line/60 bg-ink-soft/40 py-6">
      {label ? (
        <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-mist">{label}</p>
      ) : null}
      <div
        className="marquee-track relative overflow-hidden"
        aria-label={label}
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="marquee-inner flex w-max animate-marquee items-center gap-10 pr-10">
          {doubled.map((item, i) => (
            <span
              key={`${item}-${i}`}
              // Only the second pass is decorative duplication.
              aria-hidden={i >= items.length || undefined}
              className="whitespace-nowrap font-mono text-sm uppercase tracking-[0.14em] text-paper/55 transition-colors hover:text-paper"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
