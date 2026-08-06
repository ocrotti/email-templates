import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["it", "en"],
  defaultLocale: "it",
  // Italian lives at the root (/), English under /en
  localePrefix: "as-needed",
  // No Accept-Language redirects: / is always Italian, /en explicit.
  // Better for SEO (no 30x on the root) and for a primarily IT audience.
  localeDetection: false,
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
    "/contatti": {
      it: "/contatti",
      en: "/contact",
    },
    "/privacy": "/privacy",
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
