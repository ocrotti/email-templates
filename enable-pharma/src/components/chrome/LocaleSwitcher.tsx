"use client";

import { useParams } from "next/navigation";
import { useRouter as useNextRouter } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/**
 * Locale toggle that preserves the current page.
 *
 * The generic route swap (usePathname + params) cannot handle routes
 * whose dynamic segment differs per locale — article slugs are
 * translated, so reusing the current slug under the other locale
 * lands on a 404. Every page already publishes the correct per-locale
 * URL as an hreflang alternate, so the switcher reads that first and
 * only falls back to the generic swap if no alternate is present.
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
  const router = useRouter();
  const nextRouter = useNextRouter();
  const pathname = usePathname();
  const params = useParams();
  const [, startTransition] = useTransition();

  const onClick = () => {
    const alternate = document.querySelector<HTMLLinkElement>(
      `link[rel="alternate"][hreflang="${target}"]`,
    )?.href;

    startTransition(() => {
      if (alternate) {
        // Same site, possibly a different configured origin — navigate
        // by path so this works on any deployment domain.
        nextRouter.push(new URL(alternate).pathname);
        return;
      }
      router.replace(
        // Typed as never because pathname+params can't be statically
        // narrowed here; values come from the live route so they match.
        { pathname, params } as never,
        { locale: target },
      );
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      // lang marks both the label ("EN"/"IT") and the accessible name as
      // being in the target language, so a screen reader announces them
      // with the right pronunciation rules rather than the page locale's.
      lang={target}
      className={`eyebrow cursor-pointer rounded-full border border-line px-3 py-2 transition-colors hover:border-accent-deep hover:text-accent-deep ${className}`}
      aria-label={
        target === "en" ? "Switch to English" : "Passa all'italiano"
      }
    >
      {label}
    </button>
  );
}
