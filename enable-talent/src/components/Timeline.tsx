"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

interface Step {
  day?: string;
  duration?: string;
  title: string;
  body: string;
}

interface Props {
  steps: Step[];
  theme?: "dark" | "light";
}

/**
 * Scroll-driven timeline (GSAP ScrollTrigger): the progress line draws itself
 * as you scroll and each step activates in turn. GSAP is lazy-loaded; the
 * effect is skipped under reduced motion and simplified below 768px.
 *
 * The markup renders in its finished state — full rail, every step readable —
 * and the scroll choreography is layered on top only once GSAP has actually
 * arrived, so a failed dynamic import degrades to a plain static timeline.
 */
export default function Timeline({ steps, theme = "dark" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    // Both cases want exactly what the server already rendered.
    if (reduced || isMobile) return;

    const root = rootRef.current;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !root) return;
        gsap.registerPlugin(ScrollTrigger);
        // Hand the de-emphasis over to CSS only now that something can undo it.
        root.classList.add("timeline-dimmed");

        ctx = gsap.context(() => {
          gsap.fromTo(
            lineRef.current,
            { height: "0%" },
            {
              height: "100%",
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top 70%",
                end: "bottom 55%",
                scrub: 0.6,
              },
            }
          );

          root.querySelectorAll("[data-step]").forEach((el) => {
            ScrollTrigger.create({
              trigger: el as Element,
              start: "top 62%",
              onEnter: () => el.classList.add("timeline-active"),
              onLeaveBack: () => el.classList.remove("timeline-active"),
            });
          });
        }, rootRef);
      })
      // A chunk that never arrives simply leaves the static timeline in place.
      .catch(() => {});

    return () => {
      cancelled = true;
      ctx?.revert();
      root?.classList.remove("timeline-dimmed");
    };
  }, []);

  const dark = theme === "dark";

  return (
    <div
      ref={rootRef}
      className="relative"
      // Inactive copy sits lower on paper than on ink for the same perceived
      // recession; both stay above 4.5:1.
      style={{ "--timeline-dim": dark ? "0.8" : "0.75" } as CSSProperties}
    >
      {/* rail */}
      <div className={`absolute bottom-0 left-[7px] top-0 w-px md:left-1/2 ${dark ? "bg-ink-line" : "bg-paper-line"}`} />
      {/* progress line — drawn full, GSAP rewinds it to 0% before scrubbing it back */}
      <div
        ref={lineRef}
        className="absolute left-[7px] top-0 w-px bg-gradient-to-b from-blue-bright to-amber md:left-1/2"
        style={{ height: "100%" }}
      />
      <ol className="space-y-12 md:space-y-20">
        {steps.map((step, i) => (
          <li
            key={step.title}
            data-step
            className={`timeline-step relative pl-10 md:grid md:grid-cols-2 md:gap-16 md:pl-0 ${
              i % 2 ? "md:text-left" : "md:text-right"
            }`}
          >
            {/* node */}
            <span
              className={`absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border-2 transition-all duration-500 md:left-1/2 md:-translate-x-1/2 ${
                dark ? "border-ink-line bg-ink" : "border-paper-line bg-paper"
              }`}
              data-node
            >
              <span className="node-dot h-[5px] w-[5px] rounded-full bg-blue-bright transition-transform duration-500" />
            </span>
            <div className={i % 2 ? "md:col-start-2" : "md:col-start-1"}>
              {/* The day label is never dimmed: at 12px it has no contrast headroom to spend. */}
              <p className={`step-day mb-1 font-mono text-xs uppercase tracking-[0.2em] ${dark ? "text-blue-bright" : "text-blue"}`}>
                {step.day ?? step.duration}
              </p>
              <h3 className={`step-title font-display text-xl font-semibold transition-opacity duration-500 md:text-2xl ${dark ? "text-paper" : "text-ink"}`}>
                {step.title}
              </h3>
              <p className={`step-body mt-2 max-w-md text-sm leading-relaxed transition-opacity duration-500 md:text-base ${dark ? "text-mist" : "text-ink/80"} ${i % 2 ? "" : "md:ml-auto"}`}>
                {step.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
