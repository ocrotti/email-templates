import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["it", "en"],
  defaultLocale: "it",
  // Italian lives at the root (/), English under /en
  localePrefix: "as-needed",
  // No Accept-Language redirects: / is always Italian, /en explicit.
  // Better for SEO (no 30x on the root) and for a primarily IT audience.
  localeDetection: false,
  // The middleware would otherwise put hreflang in a `Link:` header on
  // every response — including /privacy, which deliberately publishes
  // neither canonical nor hreflang. Every indexable page renders its own
  // alternates in <head>.
  alternateLinks: false,
  pathnames: {
    "/": "/",
    "/compliance": "/compliance",
    "/progetto-esempio": {
      it: "/progetto-esempio",
      en: "/example-project",
    },
    "/insight": {
      it: "/insight",
      en: "/insights",
    },
    "/insight/[slug]": {
      it: "/insight/[slug]",
      en: "/insights/[slug]",
    },
    // Not a page: the generated share card for an article. It is listed
    // here so the middleware rewrites /en/insights/<slug>/opengraph-image
    // onto the internal /insight/... segment, the way it does for the
    // article itself.
    "/insight/[slug]/opengraph-image": {
      it: "/insight/[slug]/opengraph-image",
      en: "/insights/[slug]/opengraph-image",
    },
    "/contatti": {
      it: "/contatti",
      en: "/contact",
    },
    "/privacy": "/privacy",
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
