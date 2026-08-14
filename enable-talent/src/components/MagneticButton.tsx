"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "paper";
  className?: string;
}

/** CTA button with a subtle magnetic pull toward the cursor (desktop only). */
export default function MagneticButton({ href, children, variant = "primary", className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    ref.current.style.transform = `translate(${dx * 0.18}px, ${dy * 0.3}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 will-change-transform";
  const variants = {
    primary: "bg-blue text-white hover:bg-blue-bright shadow-glow-blue",
    ghost: "border border-paper/25 text-paper hover:border-paper/60",
    paper: "border border-ink/20 text-ink hover:border-ink/60",
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s, border-color 0.3s" }}
    >
      {children}
    </Link>
  );
}
