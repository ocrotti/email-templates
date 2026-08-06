"use client";

import { useEffect, useRef } from "react";

/**
 * Generative hero texture: a slow constellation of nodes and links
 * evoking cells / networks / community. Canvas 2D, capped node count,
 * paused when off-screen, static single frame under reduced motion.
 * Purely decorative (aria-hidden), sits behind the hero typography.
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
    }

    let nodes: Node[] = [];

    const seed = (count: number) => {
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: 1 + Math.random() * 1.8,
        accent: i % 9 === 0,
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

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.16;
            ctx.strokeStyle = ink;
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
      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -10) n.x = width + 10;
        if (n.x > width + 10) n.x = -10;
        if (n.y < -10) n.y = height + 10;
        if (n.y > height + 10) n.y = -10;
      }
      draw();
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
      };
    }

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
