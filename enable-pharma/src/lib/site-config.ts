// Central site configuration. Values marked TODO are placeholders to
// confirm before go-live (see README).

export const siteConfig = {
  name: "Enable Pharma",
  // TODO: confirm production domain before launch
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.enablepharma.it",
  // TODO: confirm contact address
  email: "info@enablepharma.it",
  linkedin: "https://www.linkedin.com/company/enable-pharma",
  locales: ["it", "en"] as const,
  defaultLocale: "it" as const,
};

// Pricing placeholders — confirmed as "visible pricing" by the client,
// exact figures to validate. Change here, they propagate everywhere.
export const pricing = {
  auditPrice: "7.500",
  auditPriceEn: "7,500",
  platformFrom: "8.000",
  platformFromEn: "8,000",
  platformContractMonths: 24,
};
