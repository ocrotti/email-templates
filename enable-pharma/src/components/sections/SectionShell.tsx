import type { ReactNode } from "react";
import SectionNumber from "@/components/motion/SectionNumber";
import Reveal from "@/components/motion/Reveal";

interface SectionShellProps {
  number: string;
  label: string;
  title: string;
  id?: string;
  children: ReactNode;
  dark?: boolean;
  intro?: string;
}

/**
 * Shared numbered-section layout: giant scrubbed number in the left
 * rail, mono eyebrow, display title, content below.
 */
export default function SectionShell({
  number,
  label,
  title,
  id,
  children,
  dark = false,
  intro,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={`relative px-gutter py-24 md:py-36 ${
        dark ? "on-dark bg-ink text-paper" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-16">
          <div className="relative">
            <SectionNumber value={number} className="lg:sticky lg:top-28" />
          </div>
          <div className="min-w-0">
            <Reveal>
              <p className={`eyebrow ${dark ? "text-accent-ondark" : "text-accent-deep"}`}>
                {label}
              </p>
              <h2 className="font-display mt-4 max-w-3xl text-[length:var(--text-title)]">
                {title}
              </h2>
              {intro ? (
                <p className={`prose-copy mt-6 ${dark ? "text-paper/80" : "text-ink-soft"}`}>
                  {intro}
                </p>
              ) : null}
            </Reveal>
            <div className="mt-12 md:mt-16">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
