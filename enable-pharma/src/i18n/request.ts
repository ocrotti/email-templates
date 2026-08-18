import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// All page copy lives in typed content dictionaries (src/content/*),
// so the message catalog stays empty — next-intl handles routing,
// locale negotiation and alternate links.
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return { locale, messages: {} };
});
