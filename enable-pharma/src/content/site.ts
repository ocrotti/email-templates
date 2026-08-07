import type { AppPathname } from "@/i18n/routing";
import type { Dict, SeoMeta } from "./types";

type StaticPathname = Exclude<AppPathname, `${string}[${string}`>;

interface NavItem {
  href: StaticPathname;
  label: string;
}

interface SiteChrome {
  nav: NavItem[];
  cta: string;
  ctaShort: string;
  menuLabel: string;
  closeLabel: string;
  localeSwitch: { label: string; target: "it" | "en" };
  skipToContent: string;
  footer: {
    claim: string;
    formTitle: string;
    formIntro: string;
    responseNote: string;
    navTitle: string;
    contactTitle: string;
    legalNote: string;
    accessibilityNote: string;
    privacyLabel: string;
    rights: string;
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
  meta: SeoMeta;
}

export const site: Dict<SiteChrome> = {
  it: {
    nav: [
      { href: "/compliance", label: "Compliance" },
      { href: "/progetto-esempio", label: "Progetto tipo" },
      { href: "/insight", label: "Insight" },
      { href: "/contatti", label: "Contatti" },
    ],
    cta: "Richiedi l'audit",
    ctaShort: "Audit",
    menuLabel: "Apri il menu",
    closeLabel: "Chiudi il menu",
    localeSwitch: { label: "EN", target: "en" },
    skipToContent: "Vai al contenuto",
    footer: {
      claim: "Disease awareness as-a-service, compliant by design.",
      formTitle: "Parliamone",
      formIntro:
        "Due righe sul contesto: patologia, funzione, obiettivo. Rispondiamo entro 24 ore lavorative.",
      responseNote: "Risposta entro 24 ore lavorative",
      navTitle: "Sito",
      contactTitle: "Contatti",
      legalNote:
        "Enable Pharma progetta e gestisce comunicazione istituzionale non promozionale. Nessun contenuto di questo sito costituisce pubblicità di medicinali né consulenza medica.",
      accessibilityNote:
        "Progettato secondo WCAG 2.2 AA e European Accessibility Act.",
      privacyLabel: "Privacy & cookie",
      rights: "Tutti i diritti riservati.",
    },
    notFound: {
      title: "Pagina non trovata",
      body: "La pagina che cerchi non esiste o è stata spostata.",
      cta: "Torna alla home",
    },
    meta: {
      title: "Enable Pharma — Community di disease awareness compliant",
      description:
        "Costruiamo e gestiamo piattaforme di disease awareness unbranded per le aziende della salute. Compliance by design: D.Lgs. 219/2006, GVP VI, GDPR art. 9.",
    },
  },
  en: {
    nav: [
      { href: "/compliance", label: "Compliance" },
      { href: "/progetto-esempio", label: "Example project" },
      { href: "/insight", label: "Insights" },
      { href: "/contatti", label: "Contact" },
    ],
    cta: "Request the audit",
    ctaShort: "Audit",
    menuLabel: "Open menu",
    closeLabel: "Close menu",
    localeSwitch: { label: "IT", target: "it" },
    skipToContent: "Skip to content",
    footer: {
      claim: "Disease awareness as a service, compliant by design.",
      formTitle: "Let's talk",
      formIntro:
        "Two lines of context: condition, function, goal. We reply within one business day.",
      responseNote: "Reply within one business day",
      navTitle: "Site",
      contactTitle: "Contact",
      legalNote:
        "Enable Pharma designs and runs non-promotional institutional communication. Nothing on this site constitutes medicinal product advertising or medical advice.",
      accessibilityNote:
        "Designed to WCAG 2.2 AA and the European Accessibility Act.",
      privacyLabel: "Privacy & cookies",
      rights: "All rights reserved.",
    },
    notFound: {
      title: "Page not found",
      body: "The page you are looking for does not exist or has moved.",
      cta: "Back to home",
    },
    meta: {
      title: "Enable Pharma — Compliant disease awareness communities",
      description:
        "We build and run unbranded disease awareness platforms for healthcare companies in Italy. Compliance by design: unbranded rules, GVP VI, GDPR art. 9.",
    },
  },
};
