"use client";

import { useState } from "react";
import type { FaqItem } from "@/content/types";

/**
 * FAQ accordion with correctly animated auto-height (CSS grid
 * 0fr → 1fr, see globals.css) and full ARIA wiring. The first item
 * starts open so the section reads even without interaction.
 */
export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <div className="divide-y divide-line-dark border-y border-line-dark">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="accordion-item" data-open={isOpen}>
            <h3>
              <button
                type="button"
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                id={`faq-trigger-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="font-display-soft text-lg transition-colors group-hover:text-accent-ondark md:text-xl">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line-dark text-lg transition-transform duration-500 ${
                    isOpen ? "rotate-45 text-accent-ondark" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            {/* `inert` when collapsed: the grid 0fr technique only clips
                the panel visually, so without it the answer text stays
                in the tab order and the accessibility tree. */}
            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              inert={!isOpen}
              className="accordion-panel"
            >
              <div>
                <p className="prose-copy max-w-3xl pb-7 text-paper/75">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
