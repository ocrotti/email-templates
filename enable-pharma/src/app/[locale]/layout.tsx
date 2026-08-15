import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import { archivo, plexMono } from "@/lib/fonts";
import { siteConfig } from "@/lib/site-config";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import {
  JsonLd,
  organizationSchema,
  professionalServiceSchema,
} from "@/lib/schema";
import Header from "@/components/chrome/Header";
import Footer from "@/components/chrome/Footer";
import CookieConsent from "@/components/chrome/CookieConsent";
import MotionRoot from "@/components/motion/MotionRoot";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * Any `[locale]` outside generateStaticParams is a routing miss, not a
 * page to render. Without this, `/favicon.ico` (which the middleware
 * skips, so it keeps its dotted path) reached this layout with
 * locale="favicon.ico" and blew up with a 500 instead of a 404. Turning
 * unknown segments into routing misses also hands them to
 * `global-not-found.tsx`, the only 404 that renders a real document.
 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const meta = site[locale as Locale].meta;
  return {
    metadataBase: new URL(siteConfig.url),
    ...pageMetadata({
      locale: locale as Locale,
      pathname: "/",
      title: meta.title,
      description: meta.description,
    }),
  };
}

export const viewport: Viewport = {
  themeColor: "#f4f0e6",
  width: "device-width",
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const t = site[locale as Locale];

  return (
    <html lang={locale} className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-100 rounded-full bg-ink px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          {t.skipToContent}
        </a>
        <JsonLd
          data={[
            organizationSchema(locale as Locale),
            professionalServiceSchema(locale as Locale),
          ]}
        />
        <NextIntlClientProvider>
          <MotionRoot>
            <Header locale={locale as Locale} />
            {/* tabIndex -1 so the skip link actually moves focus: a
                fragment link does not focus a non-focusable target. */}
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer locale={locale as Locale} />
          </MotionRoot>
          {/* Outside MotionRoot: the banner must never be affected by
              scroll-driven animation, and it renders nothing at all
              unless measurement is configured. */}
          <CookieConsent locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
