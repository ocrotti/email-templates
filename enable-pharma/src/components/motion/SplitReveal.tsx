import type { ElementType } from "react";

interface SplitRevealProps {
  lines: string[];
  as?: ElementType;
  className?: string;
  /** Base delay in ms before the first line */
  delay?: number;
  /** Stagger between lines in ms */
  stagger?: number;
}

/**
 * Typographic reveal on load: each line is masked and slides up with a
 * stagger. Pure CSS (server component) so the text paints without
 * waiting for hydration — critical for LCP. Lines are provided
 * explicitly (no runtime measuring), keeping CLS at zero. Screen
 * readers get the whole text via aria-label; under reduced motion the
 * animation is disabled in globals.css.
 */
export default function SplitReveal({
  lines,
  as: Tag = "h1",
  className,
  delay = 40,
  stagger = 70,
}: SplitRevealProps) {
  return (
    <Tag className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={line} aria-hidden="true" className="block overflow-clip">
          <span
            className="split-line block will-change-transform"
            style={{ animationDelay: `${delay + i * stagger}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
