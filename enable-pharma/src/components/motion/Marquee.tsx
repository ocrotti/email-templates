interface MarqueeProps {
  items: string[];
  className?: string;
  /** Seconds for one full loop */
  duration?: number;
}

/**
 * Sober compliance marquee: normative references as a graphic pattern.
 * Pure CSS animation (no JS cost); under prefers-reduced-motion the
 * track unrolls into a static wrapped list (globals.css).
 */
export default function Marquee({
  items,
  className = "",
  duration = 42,
}: MarqueeProps) {
  const row = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item) => (
        <li
          key={item}
          className="eyebrow flex shrink-0 items-center gap-6 pr-6 whitespace-nowrap"
        >
          {item}
          <span aria-hidden="true" className="text-accent">
            ·
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div
      className={`marquee overflow-hidden border-y border-line py-4 ${className}`}
    >
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
