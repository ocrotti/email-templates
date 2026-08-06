import type { ReactNode } from "react";

/**
 * CSS-only load-time fade/rise for above-the-fold content (hero copy,
 * CTAs). Unlike <Reveal>, it does not wait for hydration, so LCP
 * content paints as soon as styles are ready. Reduced motion disables
 * it in globals.css.
 */
export default function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** ms */
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`fade-up ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
