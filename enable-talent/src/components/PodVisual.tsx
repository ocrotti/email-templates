"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  tiles: string[];
  qaLabel: string;
}

/**
 * The pod concept, visualised: role modules assemble into one team grid,
 * then the QA layer snaps on top and connects to every module.
 */
export default function PodVisual({ tiles, qaLabel }: Props) {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden>
      {/* QA bar */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: -24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mb-3 flex items-center justify-between rounded-xl border border-amber/50 bg-ink-soft px-5 py-3.5 shadow-card-dark"
      >
        <span className="font-display text-sm font-semibold text-amber">{qaLabel}</span>
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-paper/50">review gate</span>
        </span>
      </motion.div>

      {/* connector lines */}
      <motion.div
        initial={reduced ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay: 1.6 }}
        className="mx-auto mb-3 h-4 w-px origin-top bg-gradient-to-b from-amber/70 to-blue/60"
      />

      {/* role tiles */}
      <div className="grid grid-cols-3 gap-3">
        {tiles.map((tile, i) => (
          <motion.div
            key={tile}
            initial={
              reduced
                ? false
                : {
                    opacity: 0,
                    x: (i % 3 - 1) * 60,
                    y: 40 + (i % 2) * 30,
                    rotate: (i % 2 === 0 ? 1 : -1) * 6,
                  }
            }
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            transition={{ duration: 0.75, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group flex aspect-[4/3] flex-col justify-between rounded-xl border border-ink-line bg-ink-soft/90 p-3 transition-colors duration-300 hover:border-blue/60"
          >
            <span className="h-1.5 w-6 rounded-full bg-blue/70 transition-all duration-300 group-hover:w-9 group-hover:bg-blue-bright" />
            <span className="font-display text-[13px] font-medium leading-tight text-paper/85">{tile}</span>
          </motion.div>
        ))}
      </div>

      {/* base glow */}
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-[3rem] bg-blue/10 blur-3xl" />
    </div>
  );
}
