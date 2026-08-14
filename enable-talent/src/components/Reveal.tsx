"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

const variants = (y: number) => ({
  // Arming is instant — it happens off-screen, and a slow fade-out could still
  // be running when a fast scroller reaches the element.
  hidden: { opacity: 0, y, transition: { duration: 0 } },
  shown: { opacity: 1, y: 0 },
});

/**
 * Fade-and-rise on scroll into view. Degrades to static for reduced motion.
 *
 * The server render is the *shown* state: hiding it there would keep the hero
 * h1 — the LCP element on nearly every route — from painting until hydration,
 * and would blank the page entirely without JS. The hidden start state is armed
 * after mount, and only for content still below the fold, so nothing that is
 * already on screen flickers back out.
 */
export default function Reveal({ children, delay = 0, y = 28, className }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (el && el.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, [reduced]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={armed ? "hidden" : "shown"}
      // The positive bottom margin fires the reveal ~200px before the element
      // enters the viewport, so fast scrollers never see missing sections.
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px 200px 0px" }}
      variants={variants(y)}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
