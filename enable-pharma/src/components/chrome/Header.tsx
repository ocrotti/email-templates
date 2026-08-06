"use client";

import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { site } from "@/content/site";
import MagneticButton from "@/components/motion/MagneticButton";
import LocaleSwitcher from "@/components/chrome/LocaleSwitcher";

/**
 * Fixed header: transparent over the hero, frosted paper once scrolled.
 * Mobile: full-screen overlay menu. Locale toggle preserves the route.
 */
export default function Header({ locale }: { locale: Locale }) {
  const t = site[locale];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const otherLocale = t.localeSwitch.target;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled && !open
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-gutter py-4">
        <Link
          href="/"
          className="font-display -my-2 inline-block py-2 text-lg tracking-tight"
          aria-label="Enable Pharma — home"
        >
          Enable&nbsp;Pharma<span className="text-accent">.</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {t.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-block py-3 text-sm font-medium transition-colors hover:text-accent-deep ${
                pathname === item.href ? "text-accent-deep" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <LocaleSwitcher
            target={otherLocale}
            label={t.localeSwitch.label}
          />
          <MagneticButton>
            <Link
              href="/contatti"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-accent-deep"
            >
              {t.cta}
            </Link>
          </MagneticButton>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <LocaleSwitcher
            target={otherLocale}
            label={t.localeSwitch.label}
          />
          <button
            type="button"
            className="relative z-50 grid h-11 w-11 place-items-center rounded-full border border-line"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.closeLabel : t.menuLabel}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-5 bg-ink transition-transform duration-300 ${
                  open ? "top-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* `invisible` (visibility: hidden), not just opacity — otherwise
          the links stay in the tab order while the menu is closed and
          keyboard focus disappears into an invisible overlay. */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-paper transition-[opacity,visibility] duration-300 lg:hidden ${
          open
            ? "visible opacity-100"
            : "invisible opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="flex h-full flex-col justify-center gap-2 px-gutter"
        >
          {t.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display border-b border-line py-4 text-3xl"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contatti"
            className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-7 py-4 font-medium text-paper"
          >
            {t.cta} <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
