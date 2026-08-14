"use client";

import { useReducedMotion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { formatNumber } from "@/lib/format";
import type { Locale } from "@/lib/site";

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
  /** Formats digits for the page's language, not the visitor's browser. */
  locale?: Locale;
}

/** Count-up number that animates once when scrolled into view. */
export default function Counter({ value, prefix = "", suffix = "", className, duration = 1.4, locale = "en" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let rafId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(display, locale)}
      {suffix}
    </span>
  );
}
