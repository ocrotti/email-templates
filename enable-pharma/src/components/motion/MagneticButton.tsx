"use client";

import {
  useRef,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";

/**
 * Magnetic hover for primary CTAs: the element leans toward the
 * pointer and springs back on leave. Implemented with a CSS transform
 * plus a transition (no animation library) so it costs nothing on the
 * critical path. Inert on touch devices and under reduced motion.
 */
export default function MagneticButton({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const isActive = () =>
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: ReactPointerEvent) => {
    const el = ref.current;
    if (!el || !isActive()) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transition = "transform 120ms linear";
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`inline-block will-change-transform ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
