/**
 * Sistema motion unico del sito.
 * Regole (DESIGN-DIRECTION.md): durate 0.6–1s, ease power3.out, once,
 * solo transform/opacity, tutto disattivato con prefers-reduced-motion.
 * Lifecycle compatibile con le View Transitions di Astro (astro:page-load).
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';
const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let lenis: Lenis | null = null;

/* ------------------------------ Smooth scroll ------------------------------ */
function initLenis() {
  if (reducedQuery.matches || lenis) return;
  lenis = new Lenis({ lerp: 0.11 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(rafLenis);
  gsap.ticker.lagSmoothing(0);
}
function rafLenis(time: number) {
  lenis?.raf(time * 1000);
}
function destroyLenis() {
  if (!lenis) return;
  gsap.ticker.remove(rafLenis);
  lenis.destroy();
  lenis = null;
}

/* -------------------------------- Reveals --------------------------------- */
function initHero() {
  const heroes = document.querySelectorAll<HTMLElement>('[data-hero]');
  heroes.forEach((hero) => {
    const lines = hero.querySelectorAll<HTMLElement>('.hero-line-inner');
    if (!lines.length) return;
    gsap.to(lines, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: EASE,
      stagger: 0.09,
      delay: 0.15,
    });
  });
}

function initReveals() {
  const groups = document.querySelectorAll<HTMLElement>('[data-reveal-group]');
  const grouped = new Set<Element>();

  groups.forEach((group) => {
    const children = group.querySelectorAll<HTMLElement>('[data-reveal]');
    children.forEach((c) => grouped.add(c));
    if (!children.length) return;
    gsap.to(children, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: EASE,
      stagger: 0.08,
      scrollTrigger: { trigger: group, start: 'top 82%', once: true },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (grouped.has(el)) return;
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: EASE,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

/* --------------------- Steps: progress line + attivazione ------------------ */
function initSteps() {
  document.querySelectorAll<HTMLElement>('[data-steps]').forEach((list) => {
    const fill = list.querySelector<HTMLElement>('[data-progress-line]');
    if (fill) {
      gsap.to(fill, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: list,
          start: 'top 70%',
          end: 'bottom 45%',
          scrub: 0.6,
        },
      });
    }
    list.querySelectorAll<HTMLElement>('[data-step]').forEach((step) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 60%',
        once: true,
        onEnter: () => step.classList.add('is-active'),
      });
    });
  });
}

/* -------------------------------- Counters -------------------------------- */
function initCounters() {
  document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
    const to = parseFloat(el.dataset.counterTo ?? '0');
    const decimals = parseInt(el.dataset.counterDecimals ?? '0', 10);
    const locale = el.dataset.counterLang === 'en' ? 'en-US' : 'it-IT';
    const state = { value: 0 };
    const format = (v: number) =>
      v.toLocaleString(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(state, {
          value: to,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = format(state.value);
          },
          onComplete: () => {
            el.textContent = format(to);
          },
        });
      },
    });
  });
}

/* ------------------------------- Magnetic CTA ------------------------------ */
function initMagnetic() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const strength = 8;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      xTo(relX * strength * 2);
      yTo(relY * strength * 2);
    });
    el.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* --------------------------------- Tilt ------------------------------------ */
function initTilt() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const rxTo = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const ryTo = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' });
    gsap.set(el, { transformPerspective: 900 });
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      rxTo(relY * -2);
      ryTo(relX * 2);
    });
    el.addEventListener('mouseleave', () => {
      rxTo(0);
      ryTo(0);
    });
  });
}

/* ----------------------- Nav: stato compresso + menu ----------------------- */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 80);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;

  const bars = toggle.querySelectorAll<HTMLElement>('.menu-bar');
  const focusables = () =>
    menu.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-locked', open);
    if (bars.length === 2) {
      bars[0].style.transform = open ? 'translateY(3.5px) rotate(45deg)' : '';
      bars[1].style.transform = open ? 'translateY(-3.5px) rotate(-45deg)' : '';
    }
    if (open) {
      lenis?.stop();
      focusables()[0]?.focus();
    } else {
      lenis?.start();
      toggle.focus();
    }
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (e) => {
    if (!menu.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key === 'Tab') {
      // Focus trap: il menu è un overlay full-screen
      const items = [toggle, ...Array.from(focusables())];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });
}

/* ------------------------------- Accordions -------------------------------- */
function initAccordions() {
  document
    .querySelectorAll<HTMLButtonElement>('[data-accordion-trigger]')
    .forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('[data-accordion-item]');
        if (!item) return;
        const open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        item.classList.toggle('is-open', !open);
        // ScrollTrigger deve ricalcolare le posizioni dopo il resize del pannello
        window.setTimeout(() => ScrollTrigger.refresh(), 600);
      });
    });
}

/* -------------------------------- Lifecycle -------------------------------- */
function initMotion() {
  document.documentElement.classList.add('motion-ok');
  if (reducedQuery.matches) {
    // Contenuto visibile e statico: nessuna animazione.
    gsap.set('[data-reveal], .hero-line-inner', { clearProps: 'all', opacity: 1, y: 0 });
    return;
  }
  initLenis();
  initHero();
  initReveals();
  initSteps();
  initCounters();
  initMagnetic();
  initTilt();
}

function initPage() {
  initHeader();
  initMenu();
  initAccordions();
  initMotion();
}

document.addEventListener('astro:page-load', initPage);
// Lo swap delle View Transitions sostituisce gli attributi di <html>:
// ripristina le classi runtime prima del paint della nuova pagina.
document.addEventListener('astro:after-swap', () => {
  document.documentElement.classList.add('js', 'motion-ok');
});
document.addEventListener('astro:before-swap', () => {
  ScrollTrigger.getAll().forEach((st) => st.kill());
  destroyLenis();
  document.body.classList.remove('menu-locked');
});

reducedQuery.addEventListener('change', () => {
  if (reducedQuery.matches) {
    ScrollTrigger.getAll().forEach((st) => st.kill());
    destroyLenis();
    gsap.set('[data-reveal], .hero-line-inner', { clearProps: 'all', opacity: 1, y: 0 });
  }
});
