"use client";

import { useEffect, useRef } from "react";

/**
 * Sober custom cursor: a small dot with a trailing ring that expands over
 * interactive elements. Desktop fine-pointers only; disabled for reduced motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let rafId = 0;
    let hovering = false;
    let seen = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      // Keep the cursor hidden until the pointer actually moves, so the ring
      // doesn't sit ghosted at (0,0) on load.
      if (!seen) {
        seen = true;
        rx = x;
        ry = y;
        dot.style.visibility = "visible";
        ring.style.visibility = "visible";
      }
      const target = e.target as HTMLElement;
      hovering = !!target.closest("a, button, [role=button], input, select, textarea, label");
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      const scale = hovering ? 1.9 : 1;
      ring.style.transform = `translate(${rx - 16}px, ${ry - 16}px) scale(${scale})`;
      ring.style.opacity = hovering ? "0.9" : "0.45";
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div ref={dotRef} className="invisible fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-blue-bright" />
      <div
        ref={ringRef}
        className="invisible fixed left-0 top-0 h-8 w-8 rounded-full border border-blue-bright/70 transition-opacity duration-200"
      />
    </div>
  );
}
