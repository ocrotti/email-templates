import type { Dict, SeoMeta } from "./types";

interface PrivacyContent {
  meta: SeoMeta;
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}

// NOTE: placeholder legal text — have counsel review and complete before
// go-live (controller identity, DPO if any, retention terms).
export const privacy: Dict<PrivacyContent> = {
  it: {
    meta: {
      title: "Privacy & cookie | Enable Pharma",
      description:
        "Informativa sul trattamento dei dati personali e sull'uso dei cookie del sito Enable Pharma.",
    },
    title: "Privacy & cookie",
    updated: "Ultimo aggiornamento: agosto 2026 — bozza da validare con il legale.",
    sections: [
      {
        heading: "Titolare del trattamento",
        body: [
          "Enable Pharma (dati societari completi in corso di definizione) è il titolare del trattamento dei dati personali raccolti tramite questo sito. Per ogni richiesta: info@enablepharma.it.",
        ],
      },
      {
        heading: "Quali dati trattiamo e perché",
        body: [
          "Dati del form di contatto (nome, azienda, funzione, area terapeutica, messaggio): li usiamo esclusivamente per rispondere alla richiesta. Base giuridica: consenso esplicito espresso al momento dell'invio. Conservazione: il tempo necessario a gestire la richiesta e le interlocuzioni che ne derivano.",
          "Questo sito non raccoglie dati relativi alla salute e non è destinato ai pazienti: è un sito B2B rivolto ad aziende.",
        ],
      },
      {
        heading: "Cookie",
        body: [
          "Il sito non utilizza cookie di profilazione né strumenti di tracciamento pubblicitario. L'unico cookie tecnico utilizzato memorizza la preferenza di lingua (it/en). Non è richiesto un banner di consenso per i soli cookie tecnici.",
        ],
      },
      {
        heading: "I tuoi diritti",
        body: [
          "Puoi esercitare in qualsiasi momento i diritti previsti dagli artt. 15–22 del GDPR (accesso, rettifica, cancellazione, limitazione, opposizione, portabilità) scrivendo a info@enablepharma.it. Hai inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali.",
        ],
      },
    ],
  },
  en: {
    meta: {
      title: "Privacy & cookies | Enable Pharma",
      description:
        "Privacy notice on the processing of personal data and the use of cookies on the Enable Pharma website.",
    },
    title: "Privacy & cookies",
    updated: "Last updated: August 2026 — draft pending legal validation.",
    sections: [
      {
        heading: "Data controller",
        body: [
          "Enable Pharma (full company details being finalised) is the controller of personal data collected through this site. For any request: info@enablepharma.it.",
        ],
      },
      {
        heading: "What data we process and why",
        body: [
          "Contact form data (name, company, function, therapeutic area, message): used exclusively to answer your request. Legal basis: explicit consent given at submission. Retention: as long as needed to handle the request and the conversations arising from it.",
          "This site does not collect health data and is not intended for patients: it is a B2B site addressed to companies.",
        ],
      },
      {
        heading: "Cookies",
        body: [
          "This site uses no profiling cookies and no advertising trackers. The only technical cookie stores the language preference (it/en). Technical cookies alone do not require a consent banner.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          "You may exercise your rights under articles 15–22 GDPR (access, rectification, erasure, restriction, objection, portability) at any time by writing to info@enablepharma.it. You also have the right to lodge a complaint with the Italian data protection authority.",
        ],
      },
    ],
  },
};
