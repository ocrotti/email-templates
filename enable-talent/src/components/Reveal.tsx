"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Fade-and-rise on scroll into view. Degrades to static for reduced motion. */
export default function Reveal({ children, delay = 0, y = 28, className }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      // The positive bottom margin fires the reveal ~200px before the element
      // enters the viewport, so fast scrollers never see missing sections.
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px 200px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
