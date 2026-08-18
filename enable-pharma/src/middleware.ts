import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Everything except API routes, Next internals and the files the app
  // really serves at the root. The previous matcher skipped *any* path
  // containing a dot, so /favicon.ico kept its dotted path, arrived at
  // `[locale]` as locale="favicon.ico" and 500'd — browsers, iOS, link
  // preview bots and Search Console verification files all hit that.
  // Add an entry here for every new file dropped into public/.
  matcher: [
    "/((?!api|_next|_vercel|icon\\.svg|apple-icon|robots\\.txt|sitemap\\.xml).*)",
  ],
};
