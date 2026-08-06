"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  lines: string[];
  className?: string;
}

/**
 * Typographic hero reveal: each word rises out of an overflow mask in sequence
 * (clip reveal, not a generic fade). Reduced motion renders static text.
 */
export default function HeroReveal({ lines, className = "" }: Props) {
  const reduced = useReducedMotion();
  let wordIndex = 0;

  if (reduced) {
    return (
      <h1 className={className}>
        {lines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <h1 className={className} aria-label={lines.join(" ")}>
      {lines.map((line) => (
        <span key={line} className="block" aria-hidden>
          {line.split(" ").map((word) => {
            const delay = 0.12 + wordIndex++ * 0.075;
            return (
              <span key={`${word}-${delay}`} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block will-change-transform"
                  initial={{ y: "110%", rotate: 4 }}
                  animate={{ y: "0%", rotate: 0 }}
                  transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
                <span className="inline-block">&nbsp;</span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
