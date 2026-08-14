import type { Metadata } from "next";
import { archivo, plexMono } from "@/lib/fonts";
import { site } from "@/content/site";
import "./globals.css";

/**
 * Global 404.
 *
 * The document shell (`<html>`/`<body>`) lives in `[locale]/layout.tsx`,
 * so a `notFound()` raised anywhere renders outside that layout and Next
 * falls back to its bare error shell — a blank page with no `lang`. This
 * file replaces that shell with a real page, which means it has to emit
 * the document itself.
 *
 * It cannot know the locale (there is no locale segment to read), so it
 * leads in Italian — the default locale — and offers the English way out
 * on the same screen.
 */
// Next emits `noindex` on this route by itself; only the title is ours.
export const metadata: Metadata = {
  title: `${site.it.notFound.title} — Enable Pharma`,
};

export default function GlobalNotFound() {
  const it = site.it.notFound;
  const en = site.en.notFound;

  return (
    <html lang="it" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <main className="flex min-h-svh flex-col items-center justify-center px-gutter py-24 text-center">
          <p className="section-number">404</p>
          <h1 className="font-display mt-6 text-[length:var(--text-title)]">
            {it.title}
          </h1>
          <p className="prose-copy mt-4 text-ink-soft">{it.body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-medium text-paper transition-colors hover:bg-accent-deep"
            >
              {it.cta} <span aria-hidden="true">→</span>
            </a>
            <a
              href="/insight"
              className="inline-flex items-center gap-2 rounded-full border border-control px-7 py-4 font-medium transition-colors hover:border-accent hover:text-accent-deep"
            >
              Insight
            </a>
            <a
              href="/contatti"
              className="inline-flex items-center gap-2 rounded-full border border-control px-7 py-4 font-medium transition-colors hover:border-accent hover:text-accent-deep"
            >
              Contatti
            </a>
          </div>
          <p className="mt-12 text-sm text-ink-soft" lang="en">
            {en.body}{" "}
            <a
              href="/en"
              className="underline decoration-accent underline-offset-4 hover:text-accent-deep"
            >
              {en.cta}
            </a>
            .
          </p>
        </main>
      </body>
    </html>
  );
}
