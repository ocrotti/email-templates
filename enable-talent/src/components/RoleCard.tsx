"use client";

import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { useRef } from "react";

interface Props {
  href: string;
  name: string;
  tagline: string;
  band: string;
  index: number;
}

/** Role card with a light 3D tilt on hover, linking to the role page. */
export default function RoleCard({ href, name, tagline, band, index }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateY(${px * 7}deg) rotateX(${py * -7}deg) translateY(-4px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateY(0) rotateX(0) translateY(0)";
  };

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group flex h-full flex-col justify-between rounded-2xl border border-ink-line bg-ink-soft/70 p-7 transition-[border-color,box-shadow] duration-300 hover:border-blue/50 hover:shadow-glow-blue"
      style={{ transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s, box-shadow 0.3s" }}
    >
      <div>
        <span className="font-mono text-xs text-mist">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="mt-3 font-display text-2xl font-semibold text-paper transition-colors group-hover:text-blue-bright">
          {name}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-mist">{tagline}</p>
      </div>
      <div className="mt-8 flex items-center justify-between gap-3">
        <span className="rounded-full border border-amber/40 px-3 py-1 text-xs text-amber">{band}</span>
        <span className="text-lg text-paper/50 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-bright">
          →
        </span>
      </div>
    </Link>
  );
}
