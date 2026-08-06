interface Props {
  lines: string[];
  className?: string;
}

/**
 * Typographic hero reveal: each word rises out of an overflow mask in sequence.
 *
 * Deliberately CSS-only and server-rendered — this H1 is the page's LCP element,
 * so it must paint on first frame instead of waiting for JS to hydrate. The
 * reduced-motion fallback lives in globals.css alongside the keyframes.
 */
export default function HeroReveal({ lines, className = "" }: Props) {
  let wordIndex = 0;

  return (
    <h1 className={className}>
      {lines.map((line) => (
        <span key={line} className="block">
          {line.split(" ").map((word) => {
            const delay = 0.03 + wordIndex++ * 0.03;
            return (
              <span
                key={`${word}-${delay}`}
                className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom"
              >
                <span className="hero-word" style={{ animationDelay: `${delay}s` }}>
                  {word}
                </span>
                <span className="inline-block">&nbsp;</span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
