"use client";

import { useParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/content/site";

export default function NotFound() {
  const params = useParams();
  const locale: Locale = hasLocale(routing.locales, params?.locale)
    ? (params.locale as Locale)
    : routing.defaultLocale;
  const t = site[locale].notFound;

  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-gutter text-center">
      <p className="section-number">404</p>
      <h1 className="font-display mt-6 text-[length:var(--text-title)]">
        {t.title}
      </h1>
      <p className="prose-copy mt-4 text-ink-soft">{t.body}</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 font-medium text-paper transition-colors hover:bg-accent-deep"
      >
        {t.cta} <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
