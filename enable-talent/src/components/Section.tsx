import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface Props {
  number?: string;
  title?: string;
  intro?: string;
  theme?: "dark" | "light";
  children?: ReactNode;
  id?: string;
  /** Use a smaller title size for denser sections. */
  compact?: boolean;
}

/**
 * Numbered progressive section — the enableluxury 01→10 backbone, evolved:
 * sticky section number on desktop, dark/light alternation, generous rhythm.
 */
export default function Section({ number, title, intro, theme = "dark", children, id, compact }: Props) {
  const dark = theme === "dark";
  return (
    <section
      id={id}
      data-theme={theme}
      className={`relative px-5 py-20 transition-colors duration-700 md:px-10 md:py-32 ${
        dark ? "bg-ink text-paper" : "bg-paper text-ink"
      }`}
    >
      <div className="mx-auto grid w-full max-w-wrap gap-8 md:grid-cols-[80px_1fr] md:gap-12">
        <div className="relative hidden md:block">
          {number ? (
            <span
              className={`sticky top-28 block font-display text-5xl font-bold tabular-nums ${
                dark ? "text-paper/15" : "text-ink/10"
              }`}
            >
              {number}
            </span>
          ) : null}
        </div>
        <div className="min-w-0">
          {number ? (
            <span className={`mb-4 block font-mono text-sm md:hidden ${dark ? "text-blue-bright" : "text-blue"}`}>
              {number}
            </span>
          ) : null}
          {title ? (
            <Reveal>
              <h2
                className={`${compact ? "text-display-sm" : "text-display-md"} max-w-3xl font-display font-bold`}
              >
                {title}
              </h2>
            </Reveal>
          ) : null}
          {intro ? (
            <Reveal delay={0.1}>
              <p className={`mt-6 max-w-2xl text-base leading-relaxed md:text-lg ${dark ? "text-mist" : "text-ink/65"}`}>
                {intro}
              </p>
            </Reveal>
          ) : null}
          {children ? <div className={title || intro ? "mt-12 md:mt-16" : ""}>{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
