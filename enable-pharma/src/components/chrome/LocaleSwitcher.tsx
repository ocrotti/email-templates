"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getPathname, usePathname } from "@/i18n/navigation";
import { articles } from "@/content/insights";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Locale toggle that preserves the current page.
 *
 * It is a real anchor, not a button with a click handler: that makes the
 * IT and EN trees reachable from each other by a crawler, and lets a
 * reader open the other language in a new tab.
 *
 * The generic route swap (pathname + params) cannot handle routes whose
 * dynamic segment differs per locale — article slugs are translated, so
 * reusing the current slug under the other locale lands on a 404. The
 * article is looked up by its current slug and the target slug is used
 * instead.
 */
export default function LocaleSwitcher({
  target,
  label,
  className = "",
}: {
  target: Locale;
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const params = useParams();

  const current = routing.locales.find((l) => l !== target) as Locale;
  const slugParam = typeof params?.slug === "string" ? params.slug : undefined;
  const article = slugParam
    ? articles.find((a) => a.slug[current] === slugParam)
    : undefined;

  // Resolved to a plain path and handed to next/link rather than the
  // i18n Link with a `locale` prop: that one force-prefixes the default
  // locale (/it/...), so every switch back to Italian would land on a
  // 308 instead of the canonical URL.
  const href = getPathname({
    locale: target,
    href: (article
      ? { pathname: "/insight/[slug]", params: { slug: article.slug[target] } }
      : pathname) as never,
  });

  return (
    <Link
      href={href}
      // lang marks both the label ("EN"/"IT") and the accessible name as
      // being in the target language, so a screen reader announces them
      // with the right pronunciation rules rather than the page locale's.
      lang={target}
      hrefLang={target}
      className={`eyebrow inline-flex h-11 items-center justify-center rounded-full border border-control px-3 transition-colors hover:border-accent-deep hover:text-accent-deep ${className}`}
      aria-label={target === "en" ? "Switch to English" : "Passa all'italiano"}
    >
      {label}
    </Link>
  );
}
