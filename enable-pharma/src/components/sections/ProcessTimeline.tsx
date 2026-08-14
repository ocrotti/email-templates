"use client";

import { useState } from "react";
import type { ProcessPhase } from "@/content/types";

interface ProcessTimelineProps {
  phases: ProcessPhase[];
  deliverablesLabel: string;
}

/**
 * Process section: expandable phases against a vertical progress line
 * that draws itself as the list scrolls (the scrub is wired centrally
 * by MotionRoot via data-progress-line). Fully keyboard accessible.
 */
export default function ProcessTimeline({
  phases,
  deliverablesLabel,
}: ProcessTimelineProps) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[7px] w-px bg-line"
      />
      <div
        data-progress-line=""
        aria-hidden="true"
        className="process-line absolute top-2 bottom-2 left-[7px] w-px bg-accent"
      />
      <ol className="space-y-2">
        {phases.map((phase, i) => {
          const isOpen = open === i;
          return (
            <li
              key={phase.index}
              className="accordion-item relative pl-10"
              data-open={isOpen}
            >
              <span
                aria-hidden="true"
                className={`absolute top-[1.85rem] left-0 h-[15px] w-[15px] rounded-full border-2 transition-colors duration-300 ${
                  isOpen
                    ? "border-accent bg-accent"
                    : "border-ink-soft bg-paper"
                }`}
              />
              <button
                type="button"
                className="group flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left"
                aria-expanded={isOpen}
                aria-controls={`phase-panel-${i}`}
                id={`phase-trigger-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="eyebrow text-accent-deep">
                    {phase.index}
                  </span>
                  <span className="font-display-soft text-xl transition-colors group-hover:text-accent-deep md:text-2xl">
                    {phase.title}
                  </span>
                </span>
                <span className="eyebrow shrink-0 text-ink-soft">
                  {phase.weeks}
                </span>
                {/* Without a marker the four closed phases read as plain
                    text; this mirrors the FAQ accordion's affordance. */}
                <span
                  aria-hidden="true"
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-control text-lg transition-transform duration-500 ${
                    isOpen ? "rotate-45 text-accent-deep" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {/* See FAQAccordion: the 0fr collapse is visual only, so a
                  closed panel must be made inert to leave the tab order. */}
              <div
                id={`phase-panel-${i}`}
                role="region"
                aria-labelledby={`phase-trigger-${i}`}
                inert={!isOpen}
                className="accordion-panel"
              >
                <div>
                  <div className="grid gap-6 pb-8 md:grid-cols-[1fr_260px] md:gap-12">
                    <div>
                      <p className="eyebrow text-ink-soft">{phase.owner}</p>
                      <p className="prose-copy mt-3 text-ink-soft">
                        {phase.body}
                      </p>
                    </div>
                    <div>
                      <p className="eyebrow text-accent-deep">
                        {deliverablesLabel}
                      </p>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
                        {phase.deliverables.map((d) => (
                          <li key={d} className="flex gap-2">
                            <span aria-hidden="true" className="text-accent">
                              —
                            </span>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
