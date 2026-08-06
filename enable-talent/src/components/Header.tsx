"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { shared } from "@/content/shared";

export default function Header({ locale }: { locale: Locale }) {
  const t = shared[locale];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Language switch keeps the current page: strip/add the /it prefix.
  const basePath = locale === "it" ? pathname.replace(/^\/it/, "") || "/" : pathname;
  const switchHref = locale === "en" ? localePath("it", basePath) : basePath;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-ink-line/70 bg-ink/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-wrap items-center justify-between px-5 md:h-20 md:px-10">
        <Link href={localePath(locale, "/")} className="py-2 font-display text-lg font-bold tracking-tight text-paper">
          enable<span className="text-blue-bright">.talent</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {t.nav.map((item) => {
            const href = localePath(locale, item.path);
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={item.path}
                href={href}
                className={`link-underline py-2 text-sm transition-colors ${
                  active ? "text-paper" : "text-mist hover:text-paper"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={switchHref}
            hrefLang={locale === "en" ? "it" : "en"}
            className="hidden rounded-full border border-ink-line px-3 py-1.5 text-xs text-mist transition-colors hover:border-paper/40 hover:text-paper md:inline-block"
          >
            {t.footer.langSwitch}
          </Link>
          <Link
            href={localePath(locale, t.bookCallHref)}
            className="hidden rounded-full bg-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-bright lg:inline-flex"
          >
            {t.ctaPrimary}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Menu"
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className={`h-px w-6 bg-paper transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-6 bg-paper transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            aria-label="Mobile"
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-ink-line bg-ink lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {t.nav.map((item) => (
                <Link
                  key={item.path}
                  href={localePath(locale, item.path)}
                  className="rounded-lg px-3 py-3 text-base text-paper/85 transition-colors hover:bg-ink-soft"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center gap-3 px-3 pb-2">
                <Link
                  href={localePath(locale, t.bookCallHref)}
                  className="flex-1 rounded-full bg-blue px-5 py-3 text-center text-sm font-semibold text-white"
                >
                  {t.ctaPrimary}
                </Link>
                <Link
                  href={switchHref}
                  hrefLang={locale === "en" ? "it" : "en"}
                  className="rounded-full border border-ink-line px-4 py-3 text-sm text-mist"
                >
                  {t.footer.langSwitch}
                </Link>
              </div>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
