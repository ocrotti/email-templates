import type { Dict, SeoMeta } from "./types";
import { siteConfig } from "@/lib/site-config";

interface PrivacyContent {
  meta: SeoMeta;
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}

// NOTE: placeholder legal text — have counsel review and complete before
// go-live (controller identity incl. legal name/VAT/address, DPO if any,
// retention terms). Keep every go-live TODO here in comments or in the
// README checklist: never in the published copy.
// The controller has to be identified by legal name, registered office
// and VAT number. Those live in site-config and are filled in at go-live;
// until then the notice names the brand rather than inventing an entity.
const { companyName, address, vatId } = siteConfig.legal;
const controllerIt = companyName
  ? `${companyName}${address ? `, con sede legale in ${address}` : ""}${
      vatId ? `, ${vatId}` : ""
    }, è il titolare del trattamento dei dati personali raccolti tramite questo sito. Per ogni richiesta: ${siteConfig.email}.`
  : `Enable Pharma è il titolare del trattamento dei dati personali raccolti tramite questo sito. Per ogni richiesta: ${siteConfig.email}.`;
const controllerEn = companyName
  ? `${companyName}${address ? `, registered office at ${address}` : ""}${
      vatId ? `, ${vatId}` : ""
    }, is the data controller for the personal data collected through this website. For any request: ${siteConfig.email}.`
  : `Enable Pharma is the controller of personal data collected through this site. For any request: ${siteConfig.email}.`;

export const privacy: Dict<PrivacyContent> = {
  it: {
    meta: {
      title: "Privacy & cookie | Enable Pharma",
      description:
        "Informativa sul trattamento dei dati personali e sull'uso dei cookie del sito Enable Pharma.",
    },
    title: "Privacy & cookie",
    updated: "Ultimo aggiornamento: agosto 2026.",
    sections: [
      {
        heading: "Titolare del trattamento",
        body: [
          controllerIt,
        ],
      },
      {
        heading: "Quali dati trattiamo e perché",
        body: [
          "Dati del form di contatto (nome, email, azienda, funzione, area terapeutica, messaggio): li usiamo esclusivamente per rispondere alla richiesta. Base giuridica: consenso esplicito espresso al momento dell'invio. Conservazione: il tempo necessario a gestire la richiesta e le interlocuzioni che ne derivano.",
          "Questo sito non raccoglie dati relativi alla salute e non è destinato ai pazienti: è un sito B2B rivolto ad aziende.",
        ],
      },
      {
        heading: "A chi comunichiamo i dati",
        body: [
          "I dati inviati con il form non sono ceduti a terzi né usati per finalità commerciali diverse dalla risposta alla richiesta. Sono trattati, per nostro conto e su nostra istruzione, dai fornitori che erogano l'hosting del sito e il servizio di invio delle email, nominati responsabili del trattamento ai sensi dell'art. 28 GDPR. L'elenco aggiornato dei responsabili è disponibile scrivendo a info@enablepharma.it.",
        ],
      },
      {
        heading: "Cookie",
        body: [
          "Il sito non utilizza cookie di profilazione né strumenti di tracciamento pubblicitario. L'unico cookie tecnico utilizzato memorizza la preferenza di lingua (it/en). Non è richiesto un banner di consenso per i soli cookie tecnici.",
        ],
      },
      {
        heading: "I vostri diritti",
        body: [
          "È possibile esercitare in qualsiasi momento i diritti previsti dagli artt. 15–22 del GDPR (accesso, rettifica, cancellazione, limitazione, opposizione, portabilità) scrivendo a info@enablepharma.it. Resta inoltre fermo il diritto di proporre reclamo al Garante per la protezione dei dati personali.",
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
    updated: "Last updated: August 2026.",
    sections: [
      {
        heading: "Data controller",
        body: [
          controllerEn,
        ],
      },
      {
        heading: "What data we process and why",
        body: [
          "Contact form data (name, email, company, function, therapeutic area, message): used exclusively to answer your request. Legal basis: explicit consent given at submission. Retention: as long as needed to handle the request and the conversations arising from it.",
          "This site does not collect health data and is not intended for patients: it is a B2B site addressed to companies.",
        ],
      },
      {
        heading: "Who we share data with",
        body: [
          "Form data is never passed on to third parties, nor used for any commercial purpose other than answering your request. It is processed on our behalf and on our instructions by the providers that supply website hosting and email delivery, appointed as processors under article 28 GDPR. An up-to-date list of processors is available on request at info@enablepharma.it.",
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
