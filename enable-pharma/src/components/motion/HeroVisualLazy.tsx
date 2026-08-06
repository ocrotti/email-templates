"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const HeroVisual = dynamic(() => import("./HeroVisual"), { ssr: false });

/**
 * Defers the generative canvas to browser idle time so it never
 * competes with LCP/hydration. Decorative only — nothing is lost if
 * it loads late.
 */
export default function HeroVisualLazy({
  className,
}: {
  className?: string;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(start, 1200);
    return () => window.clearTimeout(id);
  }, []);

  return ready ? <HeroVisual className={className} /> : null;
}
