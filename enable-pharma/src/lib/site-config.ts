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
  // Legal identity — showing the VAT number on the site is a legal
  // requirement for Italian businesses (art. 35 DPR 633/72). The footer
  // renders these automatically once filled in. TODO: complete before
  // go-live (blocker — see README checklist).
  legal: {
    companyName: "", // e.g. "Enable Pharma S.r.l."
    vatId: "", // e.g. "P.IVA IT01234567890"
    address: "", // registered office, e.g. "Via — 20100 Milano"
  },
  // Measurement. Leave NEXT_PUBLIC_GA_ID unset and the site loads no
  // analytics at all, sets no consent cookie and shows no banner — the
  // privacy notice then describes exactly that. Set it (G-XXXXXXXXXX)
  // and the consent banner appears; nothing is loaded before an explicit
  // "accept", and the choice can be withdrawn from the footer.
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  },
};

// Visible pricing, by the client's choice. The monthly floor is the
// figure the client works to: €5.000/month is the threshold below which
// a project is not taken on. Change here and it propagates everywhere.
// TODO: the audit price is still the benchmark placeholder — confirm.
export const pricing = {
  auditPrice: "7.500",
  auditPriceEn: "7,500",
  platformFrom: "5.000",
  platformFromEn: "5,000",
  platformContractMonths: 24,
};
