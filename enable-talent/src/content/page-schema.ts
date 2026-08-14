import type { Locale } from "@/lib/site";

/**
 * Strings that live in page components rather than in a page's own content
 * file: schema.org labels, table headers, in-page navigation and the small
 * connective copy around CTAs.
 *
 * They used to be hardcoded in JSX, which meant /it shipped English structured
 * data and English table headers. Same `Record<Locale, …>` shape as every other
 * content file, so page components read it exactly the same way.
 */
interface PageSchema {
  /**
   * schema.org Service `name` per page. Only the home entry carries a
   * description — the other pages already have a localized `seoDescription`
   * in their own content file.
   */
  service: {
    home: { name: string; description: string };
    pricing: string;
    guarantee: string;
    howItWorks: string;
  };
  /** BreadcrumbList labels. Kept in step with the nav labels in shared.ts. */
  breadcrumb: {
    pricing: string;
    guarantee: string;
    talent: string;
    caseStudy: string;
    howItWorks: string;
  };
  /** Pricing "What's included" table — column headers and its sr-only caption. */
  pricingTable: {
    caption: string;
    starter: string;
    full: string;
  };
  /** Outsourcing guide: the jump-link list and the mid-page CTA. */
  guide: {
    tocTitle: string;
    midCta: { title: string; body: string };
  };
  /** Contact page: the human channels that sit beside the form. */
  contact: {
    emailTitle: string;
    emailNote: string;
    digitalTitle: string;
    digitalBody: string;
    digitalCta: string;
    whereTitle: string;
    whereBody: string;
  };
  /** Closing CTA on the roles index, which otherwise ends without one. */
  rolesCta: {
    title: string;
    body: string;
    pricing: string;
  };
}

export const pageSchema: Record<Locale, PageSchema> = {
  en: {
    service: {
      home: {
        name: "Managed marketing pods for European agencies",
        description:
          "Dedicated Nairobi marketing pods with senior European QA, white-label workflow, 2-week trial and replacement guarantee.",
      },
      pricing: "Managed marketing pods",
      guarantee: "Guarantee & working terms",
      howItWorks: "Managed pod onboarding process",
    },
    breadcrumb: {
      pricing: "Pricing",
      guarantee: "Guarantee",
      talent: "Talent",
      caseStudy: "Case study",
      howItWorks: "How it works",
    },
    pricingTable: {
      caption: "What's included in each pod format: Starter pod compared with Full pod.",
      starter: "Starter pod",
      full: "Full pod",
    },
    guide: {
      tocTitle: "In this guide",
      midCta: {
        title: "Already know which model you want?",
        body: "If the managed-pod row is the one you keep re-reading, a 15-minute scoping call is faster than the rest of this guide.",
      },
    },
    contact: {
      emailTitle: "Prefer to just write?",
      emailNote: "Goes to a person, not a ticket queue. Same one-business-day reply as the form.",
      digitalTitle: "Wrong door?",
      digitalBody:
        "If your gap is senior project management or in-market Italian specialists rather than delivery throughput, our sister agency Enable Digital is the better fit.",
      digitalCta: "See which one you need",
      whereTitle: "Where we work from",
      whereBody:
        "Delivery in Nairobi, QA in Europe. We run on the CET business day — Nairobi is UTC+3, one to two hours ahead of Central Europe.",
    },
    rolesCta: {
      title: "Not sure which role is your bottleneck?",
      body: "That's the first thing we work out on the call — and if a pod isn't the answer, we'll say so.",
      pricing: "See pricing",
    },
  },
  it: {
    service: {
      home: {
        name: "Pod marketing gestiti per agenzie europee",
        description:
          "Pod marketing dedicati a Nairobi con QA senior europea, workflow white label, trial di 2 settimane e garanzia di sostituzione.",
      },
      pricing: "Pod marketing gestiti",
      guarantee: "Garanzia e condizioni di lavoro",
      howItWorks: "Processo di onboarding dei pod gestiti",
    },
    breadcrumb: {
      pricing: "Prezzi",
      guarantee: "Garanzia",
      talent: "Talento",
      caseStudy: "Caso studio",
      howItWorks: "Come funziona",
    },
    pricingTable: {
      caption: "Cosa include ogni formato di pod: Pod starter a confronto con Pod full.",
      starter: "Pod starter",
      full: "Pod full",
    },
    guide: {
      tocTitle: "In questa guida",
      midCta: {
        title: "Sai già quale modello ti serve?",
        body: "Se la riga del pod gestito è quella che continui a rileggere, una call di scoping da 15 minuti è più veloce del resto di questa guida.",
      },
    },
    contact: {
      emailTitle: "Preferisci scrivere?",
      emailNote: "Arriva a una persona, non a una coda di ticket. Stessa risposta entro un giorno lavorativo del modulo.",
      digitalTitle: "Porta sbagliata?",
      digitalBody:
        "Se il tuo buco è project management senior o specialist italiani in-market invece che throughput di delivery, la nostra agenzia sorella Enable Digital è la scelta giusta.",
      digitalCta: "Scopri quale ti serve",
      whereTitle: "Da dove lavoriamo",
      whereBody:
        "Delivery a Nairobi, QA in Europa. Lavoriamo sulla giornata CET — Nairobi è UTC+3, una o due ore avanti sull'Europa centrale.",
    },
    rolesCta: {
      title: "Non sai quale ruolo è il tuo collo di bottiglia?",
      body: "È la prima cosa che capiamo in call — e se un pod non è la risposta, te lo diciamo.",
      pricing: "Vedi i prezzi",
    },
  },
};
