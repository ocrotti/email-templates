"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// The contact page renders the full form in its hero; repeating the
// identical form in the global footer right below it duplicates the
// consent checkbox and confuses which one to fill. On those routes the
// footer shows a lightweight contact block instead.
// "/it/contatti" covers the internal locale-prefixed form of the same
// route, so server prerender and client hydration always agree.
const CONTACT_PATHS = new Set(["/contatti", "/it/contatti", "/en/contact"]);

export default function FooterFormGate({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) {
  const pathname = usePathname();
  const normalized =
    pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return <>{CONTACT_PATHS.has(normalized) ? fallback : children}</>;
}
