"use client";

import { useEffect, useRef } from "react";

/**
 * Generative hero texture: nodes drifting into loose clusters
 * (communities consolidating) with a periodic lacquer pulse that lights
 * up the network around one accented node — the escalation path made
 * visible. Canvas 2D, capped node count, paused when off-screen, static
 * single frame under reduced motion. Purely decorative (aria-hidden),
 * sits behind the hero typography.
 */
export default function HeroVisual({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const ink = styles.getPropertyValue("--color-ink-soft").trim() || "#57503f";
    const accent = styles.getPropertyValue("--color-accent").trim() || "#c73b16";

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    let raf = 0;
    let width = 0;
    let height = 0;
    let visible = true;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      accent: boolean;
      cluster: number;
    }

    let nodes: Node[] = [];

    // Cluster centres in relative coordinates: two on the display side,
    // one under the proof-point column, where link density also rises.
    const CLUSTERS = [
      { x: 0.22, y: 0.38 },
      { x: 0.52, y: 0.72 },
      { x: 0.82, y: 0.3 },
    ];

    const seed = (count: number) => {
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 1 + Math.random() * 1.8,
        accent: i % 9 === 0,
        cluster: i % CLUSTERS.length,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed(isMobile ? 34 : 70);
    };

    const LINK_DIST = 130;

    // Periodic pulse from an accent node: an expanding ring that briefly
    // raises the alpha of the links it crosses.
    const PULSE_PERIOD = 4200;
    const PULSE_MAX_R = 170;
    let pulse: { x: number; y: number; t: number } | null = null;
    let lastPulseAt = 0;

    const startPulse = (now: number) => {
      const candidates = nodes.filter((n) => n.accent);
      const origin =
        candidates[Math.floor(Math.random() * candidates.length)];
      if (!origin) return;
      pulse = { x: origin.x, y: origin.y, t: now };
      lastPulseAt = now;
    };

    const draw = (now = 0) => {
      ctx.clearRect(0, 0, width, height);

      const pulseAge = pulse ? (now - pulse.t) / 1600 : 1;
      const pulseR = PULSE_MAX_R * pulseAge;
      if (pulse && pulseAge >= 1) pulse = null;

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const midX = (a.x + b.x) / 2;
            const midY = (a.y + b.y) / 2;
            // Density gradient: links firm up toward the proof-point
            // column on the right instead of a uniform veil.
            const gradient = 0.72 + 0.45 * (midX / Math.max(width, 1));
            let alpha = (1 - dist / LINK_DIST) * 0.26 * gradient;
            let stroke = ink;
            if (pulse) {
              const dp = Math.hypot(midX - pulse.x, midY - pulse.y);
              // A ~48px band around the expanding ring lights up.
              if (Math.abs(dp - pulseR) < 48) {
                alpha = Math.min(0.55, alpha + 0.3 * (1 - pulseAge));
                stroke = accent;
              }
            }
            ctx.strokeStyle = stroke;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      for (const n of nodes) {
        ctx.fillStyle = n.accent ? accent : ink;
        ctx.globalAlpha = n.accent ? 0.85 : 0.35;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (pulse) {
        ctx.globalAlpha = 0.28 * (1 - pulseAge);
        ctx.strokeStyle = accent;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulseR, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };

    const step = (now: number) => {
      for (const n of nodes) {
        // Gentle pull toward the node's cluster centre: the drift stays
        // brownian at close range but the field slowly consolidates.
        const c = CLUSTERS[n.cluster];
        n.vx += (c.x * width - n.x) * 0.0000135;
        n.vy += (c.y * height - n.y) * 0.0000135;
        n.vx = Math.max(-0.22, Math.min(0.22, n.vx));
        n.vy = Math.max(-0.22, Math.min(0.22, n.vy));
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;
      }
      if (!pulse && now - lastPulseAt > PULSE_PERIOD) startPulse(now);
      draw(now);
      if (visible) raf = requestAnimationFrame(step);
    };

    resize();
    draw();

    // Resizing the canvas resets its bitmap, so it must always be
    // followed by a repaint — otherwise the reduced-motion path (which
    // paints exactly once) leaves a blank canvas after any resize.
    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);

    // Light pointer parallax, transform-only and desktop-only. The
    // canvas is oversized slightly so the shift never exposes edges.
    let onPointerMove: ((e: PointerEvent) => void) | undefined;
    if (!reduced && canHover) {
      onPointerMove = (e: PointerEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        canvas.style.transform = `translate3d(${nx * -14}px, ${ny * -10}px, 0) scale(1.03)`;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    if (!reduced) {
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(step);
      });
      io.observe(canvas);

      return () => {
        io.disconnect();
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        if (onPointerMove)
          window.removeEventListener("pointermove", onPointerMove);
      };
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (onPointerMove)
        window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
