"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";

/**
 * Single motion controller for the whole site.
 *
 * Why one component instead of per-element client components: GSAP,
 * ScrollTrigger and Lenis are ~100KB of JS whose parse+execute cost
 * lands squarely on the critical path if imported at module scope.
 * Here they are dynamically imported during browser idle time, after
 * hydration, and wired to elements declaratively via data attributes:
 *
 *   [data-reveal]          fade + rise on scroll enter
 *   [data-section-number]  scroll-scrubbed drift of the 01–08 numerals
 *   [data-counter]         count-up on viewport enter
 *   [data-progress-line]   line that draws itself along its container
 *
 * Everything degrades safely: the markup is server-rendered in its
 * final visible state, nothing is hidden by CSS, and
 * prefers-reduced-motion skips the download entirely.
 */

type MotionBundle = {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  Lenis: typeof import("lenis").default;
};

// Module-level so a client-side navigation reuses the already-loaded
// bundle instead of re-entering the dynamic import path.
let bundlePromise: Promise<MotionBundle> | null = null;

function loadMotion(): Promise<MotionBundle> {
  bundlePromise ??= Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("lenis"),
  ]).then(([{ gsap }, { ScrollTrigger }, { default: Lenis }]) => {
    gsap.registerPlugin(ScrollTrigger);
    return { gsap, ScrollTrigger, Lenis };
  });
  return bundlePromise;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Defer work to idle, with a hard timeout so it always runs soon. */
function onIdle(fn: () => void): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(fn, { timeout: 700 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(fn, 300);
  return () => window.clearTimeout(id);
}

export default function MotionRoot({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisReady = useRef(false);

  // ------------------------------------------------- smooth scroll (once)
  useEffect(() => {
    if (prefersReducedMotion() || lenisReady.current) return;
    lenisReady.current = true;

    let dispose: (() => void) | undefined;
    let cancelled = false;

    const cancelIdle = onIdle(() => {
      void loadMotion().then(({ gsap, ScrollTrigger, Lenis }) => {
        if (cancelled) return;
        const lenis = new Lenis({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        dispose = () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
      });
    });

    return () => {
      cancelled = true;
      cancelIdle();
      dispose?.();
      lenisReady.current = false;
    };
  }, []);

  // ------------------------------- scroll animations (re-armed per route)
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let revert: (() => void) | undefined;
    let cancelled = false;

    const cancelIdle = onIdle(() => {
      void loadMotion()
        .then(({ gsap, ScrollTrigger }) => {
          if (cancelled) return;

          const ctx = gsap.context(() => {
            // ----------------------------------------------- reveals
            // Only elements fully below the fold are hidden and
            // animated. Anything even partly on screen has already
            // painted and stays painted: hiding it would flash, delay
            // LCP, and strand content at the viewport's bottom edge
            // until the user happens to scroll.
            const fold = window.innerHeight;
            gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
              if (el.getBoundingClientRect().top < fold) return;
              const y = Number(el.dataset.revealY ?? 28);
              const delay = Number(el.dataset.revealDelay ?? 0);
              gsap.fromTo(
                el,
                { opacity: 0, y },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.9,
                  delay,
                  ease: "expo.out",
                  scrollTrigger: {
                    trigger: el,
                    start: "top 92%",
                    once: true,
                  },
                },
              );
            });

            // ------------------------- scrubbed section numerals
            gsap.utils
              .toArray<HTMLElement>("[data-section-number]")
              .forEach((el) => {
                gsap.fromTo(
                  el,
                  { y: 80 },
                  {
                    y: -40,
                    ease: "none",
                    scrollTrigger: {
                      trigger: el,
                      start: "top bottom",
                      end: "bottom top",
                      scrub: 0.6,
                    },
                  },
                );
              });

            // ---------------------------------------- KPI counters
            gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
              const value = Number(el.dataset.counter);
              if (!Number.isFinite(value)) return;
              const prefix = el.dataset.counterPrefix ?? "";
              const suffix = el.dataset.counterSuffix ?? "";
              const state = { n: 0 };
              gsap.to(state, {
                n: value,
                duration: 1.6,
                ease: "expo.out",
                scrollTrigger: { trigger: el, start: "top 92%", once: true },
                onUpdate() {
                  el.textContent = `${prefix}${Math.round(state.n)}${suffix}`;
                },
                onComplete() {
                  el.textContent = `${prefix}${value}${suffix}`;
                },
              });
            });

            // -------------------------------------- progress lines
            gsap.utils
              .toArray<HTMLElement>("[data-progress-line]")
              .forEach((el) => {
                gsap.fromTo(
                  el,
                  { scaleY: 0 },
                  {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                      trigger: el.parentElement ?? el,
                      start: "top 75%",
                      end: "bottom 60%",
                      scrub: 0.5,
                    },
                  },
                );
              });
          });

          // Web fonts and late-loading decoration can shift layout
          // after triggers are measured; re-measure once settled.
          const refresh = () => ScrollTrigger.refresh();
          const refreshId = window.setTimeout(refresh, 600);
          document.fonts?.ready.then(refresh).catch(() => {});
          window.addEventListener("orientationchange", refresh);

          revert = () => {
            window.clearTimeout(refreshId);
            window.removeEventListener("orientationchange", refresh);
            ctx.revert();
          };
        })
        .catch(() => {
          // Motion is progressive enhancement: if the bundle fails to
          // load the page stays fully readable, so swallow and move on.
        });
    });

    return () => {
      cancelled = true;
      cancelIdle();
      revert?.();
    };
  }, [pathname]);

  return <>{children}</>;
}
