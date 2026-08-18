"use client";

import { cookies as copy } from "@/content/cookies";
import type { Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/site-config";
import { REOPEN_EVENT } from "./CookieConsent";

/**
 * Withdrawing consent has to be as easy as giving it, so the banner
 * stays reachable from the footer for as long as there is anything to
 * consent to. With no analytics configured there is nothing to reopen
 * and the entry does not appear.
 */
export default function CookiePreferencesLink({ locale }: { locale: Locale }) {
  if (!siteConfig.analytics.gaId) return null;

  return (
    <li>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(REOPEN_EVENT))}
        className="inline-block cursor-pointer py-1 text-left text-paper/80 transition-colors hover:text-accent-ondark"
      >
        {copy[locale].preferences}
      </button>
    </li>
  );
}
