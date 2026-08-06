"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

interface Props {
  items: { q: string; a: string }[];
  theme?: "dark" | "light";
}

/** Accessible FAQ accordion with height animation. */
export default function Faq({ items, theme = "dark" }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();
  const dark = theme === "dark";

  return (
    <div className={`divide-y rounded-2xl border ${dark ? "divide-ink-line border-ink-line" : "divide-paper-line border-paper-line"}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className={`flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors md:px-8 ${
                dark ? "hover:bg-ink-soft/60" : "hover:bg-paper-soft"
              }`}
            >
              <span className={`font-display text-base font-semibold md:text-lg ${dark ? "text-paper" : "text-ink"}`}>
                {item.q}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: reduced ? 0 : 0.3 }}
                className={`shrink-0 text-xl ${dark ? "text-blue-bright" : "text-blue"}`}
                aria-hidden
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className={`px-6 pb-6 text-sm leading-relaxed md:px-8 md:text-base ${dark ? "text-mist" : "text-ink/65"}`}>
                    {item.a}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
