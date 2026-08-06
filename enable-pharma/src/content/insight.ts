import type { Dict, SeoMeta } from "./types";

interface InsightIndexContent {
  meta: SeoMeta;
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  readLabel: string;
  readingTime: (min: number) => string;
  backLabel: string;
  sourcesTitle: string;
  articleCtaTitle: string;
  articleCtaBody: string;
  articleCta: string;
}

export const insight: Dict<InsightIndexContent> = {
  it: {
    meta: {
      title: "Insight — Awareness, compliance e patient engagement",
      description:
        "Analisi operative su disease awareness, farmacovigilanza social, patient engagement e norme del pharma marketing in Italia. Senza gergo, con le fonti.",
    },
    hero: {
      kicker: "Insight",
      title: "Il quadro normativo, letto da chi lo usa ogni giorno.",
      subtitle:
        "Analisi operative su awareness, compliance e patient engagement. Scritte per chi i progetti deve approvarli, non solo immaginarli.",
    },
    readLabel: "Leggi l'articolo",
    readingTime: (min) => `${min} min di lettura`,
    backLabel: "Tutti gli insight",
    sourcesTitle: "Riferimenti",
    articleCtaTitle: "Applichiamo questo impianto alla vostra patologia",
    articleCtaBody:
      "L'Awareness & Compliance Audit definisce perimetro normativo, stakeholder e roadmap in 4–6 settimane, a prezzo fisso.",
    articleCta: "Richiedi l'audit",
  },
  en: {
    meta: {
      title: "Insights — Awareness, compliance and patient engagement",
      description:
        "Operational analysis on disease awareness, social media pharmacovigilance, patient engagement and pharma marketing rules in Italy. No jargon, with sources.",
    },
    hero: {
      kicker: "Insights",
      title: "The regulatory picture, read by people who use it daily.",
      subtitle:
        "Operational analysis on awareness, compliance and patient engagement. Written for the people who have to approve projects, not just imagine them.",
    },
    readLabel: "Read the article",
    readingTime: (min) => `${min} min read`,
    backLabel: "All insights",
    sourcesTitle: "References",
    articleCtaTitle: "Let's apply this framework to your condition",
    articleCtaBody:
      "The Awareness & Compliance Audit defines the regulatory perimeter, stakeholders and roadmap in 4–6 weeks, at a fixed price.",
    articleCta: "Request the audit",
  },
};
