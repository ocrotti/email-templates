"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cookies as copy } from "@/content/cookies";
import { siteConfig } from "@/lib/site-config";

const STORE_KEY = "ep-consent";
/** Fired by the footer entry so a choice can be changed or withdrawn. */
export const REOPEN_EVENT = "ep-consent-reopen";

type Choice = "granted" | "denied";

/**
 * Consent gate for measurement.
 *
 * Nothing loads before an explicit choice: the analytics script is not
 * in the document until consent is granted, so a visitor who ignores
 * the banner is in the same position as one who rejects it. The choice
 * lives in localStorage rather than a cookie — storing it is itself
 * strictly necessary, and this way a refusal does not write a cookie.
 *
 * With `NEXT_PUBLIC_GA_ID` unset the whole component renders nothing,
 * which is what makes the "no profiling cookies" line in the privacy
 * notice true by construction rather than by promise.
 */
export default function CookieConsent({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const gaId = siteConfig.analytics.gaId;

  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);
  const [announce, setAnnounce] = useState("");
  const acceptRef = useRef<HTMLButtonElement | null>(null);

  // Read after mount: the server cannot know the stored choice, and
  // rendering the banner during SSR would flash it at everyone.
  useEffect(() => {
    if (!gaId) return;
    const stored = window.localStorage.getItem(STORE_KEY);
    if (stored === "granted" || stored === "denied") setChoice(stored);
    else setOpen(true);
  }, [gaId]);

  useEffect(() => {
    if (!gaId) return;
    const reopen = () => {
      setOpen(true);
      // Give the panel a frame to mount before moving focus into it.
      requestAnimationFrame(() => acceptRef.current?.focus());
    };
    window.addEventListener(REOPEN_EVENT, reopen);
    return () => window.removeEventListener(REOPEN_EVENT, reopen);
  }, [gaId]);

  if (!gaId) return null;

  const decide = (value: Choice) => {
    window.localStorage.setItem(STORE_KEY, value);
    setChoice(value);
    setOpen(false);
    setAnnounce(t.saved);
    // Unmounting the script tags does not unload a gtag that already
    // ran, so revoking mid-session has to switch it off explicitly —
    // otherwise withdrawal would only take effect on the next visit.
    (window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`] =
      value === "denied";
  };

  return (
    <>
      {choice === "granted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());
gtag('config','${gaId}',{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});`}
          </Script>
        </>
      ) : null}

      <p role="status" aria-live="polite" className="sr-only">
        {announce}
      </p>

      {open ? (
        <div
          role="dialog"
          aria-labelledby="consent-title"
          aria-describedby="consent-body"
          className="fixed inset-x-0 bottom-0 z-100 border-t border-line-dark bg-ink px-gutter py-6 text-paper"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="max-w-3xl">
              <p id="consent-title" className="eyebrow text-accent-ondark">
                {t.title}
              </p>
              <p id="consent-body" className="mt-2 text-sm leading-relaxed text-paper/80">
                {t.body}{" "}
                <Link
                  href="/privacy"
                  className="underline decoration-accent-ondark underline-offset-2 hover:text-accent-ondark"
                >
                  {t.policyLabel}
                </Link>
                .
              </p>
            </div>
            {/* Same size, same weight, same prominence: refusing has to
                be exactly as easy as accepting. */}
            <div className="flex shrink-0 gap-3">
              <button
                ref={acceptRef}
                type="button"
                onClick={() => decide("granted")}
                className="inline-flex h-11 cursor-pointer items-center rounded-full bg-accent-ondark px-6 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-paper"
              >
                {t.accept}
              </button>
              <button
                type="button"
                onClick={() => decide("denied")}
                className="inline-flex h-11 cursor-pointer items-center rounded-full border border-control-dark px-6 text-sm font-medium text-paper transition-colors hover:border-accent-ondark hover:text-accent-ondark"
              >
                {t.reject}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
