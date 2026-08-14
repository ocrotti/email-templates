import type { Locale } from "@/lib/site";

// ============================================================================
// TODO (BEFORE LAUNCH — BLOCKING): Replace every bracketed "[…]" placeholder
// below, in BOTH locales:
//   - [Legal entity name — to be completed before launch]
//   - [Registered address — to be completed before launch]
//   - [VAT number — to be completed before launch]
//   - [Privacy contact email — to be completed before launch]
//   - [Form delivery provider — to be completed before the form goes live]
// Search this file for "to be completed" / "da completare" to find them all.
// The page must not ship with these markers visible.
// ============================================================================

interface PrivacySection {
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

interface PrivacyContent {
  seoTitle: string;
  seoDescription: string;
  title: string;
  updated: string;
  intro: string;
  sections: PrivacySection[];
}

export const privacy: Record<Locale, PrivacyContent> = {
  en: {
    seoTitle: "Privacy Policy | enable.talent",
    seoDescription:
      "How enable.talent processes personal data from the contact form: purposes, legal basis, retention, processors, EEA transfers and your GDPR rights.",
    title: "Privacy Policy",
    updated: "Last updated: 7 August 2026",
    intro:
      "We sell GDPR seriousness for a living, so this page holds us to the same standard: what this site collects, why, on what legal basis, and what you can do about it — in plain language, without a consent banner you have to fight through.",
    sections: [
      {
        number: "01",
        title: "Who we are (the data controller)",
        paragraphs: [
          "enable.talent is operated by [Legal entity name — to be completed before launch], registered at [Registered address — to be completed before launch], VAT [VAT number — to be completed before launch] (\"we\", \"us\"). For the personal data described in this policy, we are the data controller under Regulation (EU) 2016/679 (GDPR).",
          "For anything in this policy, you can reach us at [Privacy contact email — to be completed before launch].",
        ],
      },
      {
        number: "02",
        title: "What data we collect",
        paragraphs: [
          "The only personal data this website collects is what you type into the contact form:",
        ],
        bullets: [
          "Your name",
          "Your work email address",
          "Your agency's name",
          "Your agency's team size",
          "The roles you are interested in",
          "Your message about your delivery needs",
        ],
      },
      {
        number: "03",
        title: "Why we process it",
        paragraphs: [
          "We use contact form data for one purpose: responding to your enquiry — assessing whether a pod fits your agency, scheduling a call, and following up on that conversation.",
          "We do not add you to a newsletter, a drip sequence or any marketing list. We send marketing communications only if you separately and explicitly ask for them, based on your consent (Art. 6(1)(a) GDPR), which you can withdraw at any time.",
        ],
      },
      {
        number: "04",
        title: "Legal basis",
        paragraphs: [
          "Handling your enquiry rests on Art. 6(1)(b) GDPR: taking steps at your request prior to entering into a contract. Where an enquiry does not move towards a contract, we rely on our legitimate interest in answering messages addressed to us (Art. 6(1)(f) GDPR) — an interest aligned with yours, since you contacted us.",
        ],
      },
      {
        number: "05",
        title: "How long we keep it",
        paragraphs: [
          "We keep enquiry data only as long as the conversation needs. If no engagement follows, we delete it no later than 12 months after our last exchange. If we do sign a contract, your data becomes part of the client relationship and follows the contractual and statutory retention periods that apply to it (for example, accounting law).",
        ],
      },
      {
        number: "06",
        title: "Processors — and no sale of data",
        paragraphs: [
          "We never sell personal data, and we never share it for advertising. A small number of service providers process data on our documented instructions, under data processing agreements per Art. 28 GDPR:",
        ],
        bullets: [
          "Hosting: Vercel Inc. — hosts this website and serves its pages.",
          "Form delivery: [Form delivery provider — to be completed before the form goes live] — will transport form submissions to our inbox.",
        ],
      },
      {
        number: "07",
        title: "Transfers outside the EEA",
        paragraphs: [
          "Some providers (such as Vercel) may process data outside the European Economic Area, including in the United States. Where that happens, transfers are safeguarded by the EU Commission's Standard Contractual Clauses (Art. 46(2)(c) GDPR) and, where applicable, by an adequacy decision such as the EU–US Data Privacy Framework.",
          "Separately: if a delivery pod in Nairobi ever processes personal data on your behalf as part of an engagement, that transfer is governed by the DPA and SCCs in your contract — not by this website policy.",
        ],
      },
      {
        number: "08",
        title: "Your rights",
        paragraphs: ["Under the GDPR you can, at any time:"],
        bullets: [
          "Access the personal data we hold about you (Art. 15)",
          "Have inaccurate data rectified (Art. 16)",
          "Have your data erased (Art. 17)",
          "Restrict processing (Art. 18)",
          "Receive your data in a portable format (Art. 20)",
          "Object to processing based on legitimate interest (Art. 21)",
          "Withdraw any consent you have given, with effect for the future (Art. 7(3))",
        ],
      },
      {
        number: "09",
        title: "Exercising your rights & complaints",
        paragraphs: [
          "To exercise any of these rights, email [Privacy contact email — to be completed before launch]. We respond within one month.",
          "You also have the right to lodge a complaint with a data protection supervisory authority — in the EU member state where you live, where you work, or where you believe an infringement occurred (Art. 77 GDPR).",
        ],
      },
      {
        number: "10",
        title: "Cookies and analytics",
        paragraphs: [
          "This site currently sets no tracking cookies and runs no analytics, advertising or social media scripts. That is why there is no cookie banner: there is nothing to consent to. If this ever changes, we will update this policy and ask for consent where the law requires it.",
        ],
      },
      {
        number: "11",
        title: "Changes to this policy",
        paragraphs: [
          "We may update this policy as the service evolves. The date at the top of this page always reflects the latest revision, and material changes will be flagged here.",
        ],
      },
    ],
  },
  it: {
    // Italian title and H1 differ from the English page on purpose: they were
    // byte-identical, which is the one duplicate title on the site.
    seoTitle: "Informativa privacy | enable.talent",
    seoDescription:
      "Come enable.talent tratta i dati del modulo di contatto: finalità, base giuridica, conservazione, responsabili, trasferimenti extra-SEE e diritti GDPR.",
    title: "Informativa privacy",
    updated: "Ultimo aggiornamento: 7 agosto 2026",
    intro:
      "Vendiamo serietà GDPR di mestiere, quindi questa pagina ci tiene allo stesso standard: cosa raccoglie questo sito, perché, su quale base giuridica, e cosa puoi farci — in linguaggio chiaro, senza banner di consenso da combattere.",
    sections: [
      {
        number: "01",
        title: "Chi siamo (il titolare del trattamento)",
        paragraphs: [
          "enable.talent è gestito da [Ragione sociale — da completare prima del lancio], con sede legale in [Sede legale — da completare prima del lancio], P. IVA [Partita IVA — da completare prima del lancio] («noi»). Per i dati personali descritti in questa policy, siamo il titolare del trattamento ai sensi del Regolamento (UE) 2016/679 (GDPR).",
          "Per qualsiasi cosa riguardi questa policy, puoi scriverci a [Email privacy — da completare prima del lancio].",
        ],
      },
      {
        number: "02",
        title: "Quali dati raccogliamo",
        paragraphs: [
          "Gli unici dati personali che questo sito raccoglie sono quelli che inserisci nel modulo di contatto:",
        ],
        bullets: [
          "Il tuo nome",
          "La tua email di lavoro",
          "Il nome della tua agenzia",
          "La dimensione del team della tua agenzia",
          "I ruoli a cui sei interessato",
          "Il tuo messaggio sui bisogni di delivery",
        ],
      },
      {
        number: "03",
        title: "Perché li trattiamo",
        paragraphs: [
          "Usiamo i dati del modulo di contatto per una sola finalità: rispondere alla tua richiesta — valutare se un pod ha senso per la tua agenzia, fissare una call e dare seguito a quella conversazione.",
          "Non ti aggiungiamo a newsletter, sequenze automatiche o liste marketing. Inviamo comunicazioni di marketing solo se le chiedi separatamente ed esplicitamente, sulla base del tuo consenso (art. 6(1)(a) GDPR), revocabile in qualsiasi momento.",
        ],
      },
      {
        number: "04",
        title: "Base giuridica",
        paragraphs: [
          "La gestione della tua richiesta si fonda sull'art. 6(1)(b) GDPR: misure precontrattuali adottate su tua richiesta. Quando una richiesta non evolve verso un contratto, ci basiamo sul nostro legittimo interesse a rispondere ai messaggi che ci vengono inviati (art. 6(1)(f) GDPR) — un interesse allineato al tuo, visto che ci hai contattato tu.",
        ],
      },
      {
        number: "05",
        title: "Per quanto li conserviamo",
        paragraphs: [
          "Conserviamo i dati delle richieste solo per il tempo necessario alla conversazione. Se non segue alcun ingaggio, li cancelliamo entro 12 mesi dall'ultimo scambio. Se firmiamo un contratto, i tuoi dati entrano nella relazione cliente e seguono i periodi di conservazione contrattuali e di legge applicabili (ad esempio la normativa contabile).",
        ],
      },
      {
        number: "06",
        title: "Responsabili del trattamento — e nessuna vendita di dati",
        paragraphs: [
          "Non vendiamo mai dati personali e non li condividiamo mai a fini pubblicitari. Un numero ristretto di fornitori tratta i dati su nostre istruzioni documentate, con accordi di trattamento ai sensi dell'art. 28 GDPR:",
        ],
        bullets: [
          "Hosting: Vercel Inc. — ospita questo sito e ne serve le pagine.",
          "Consegna del form: [Provider di consegna del form — da completare prima dell'attivazione del form] — trasporterà gli invii del modulo alla nostra casella.",
        ],
      },
      {
        number: "07",
        title: "Trasferimenti fuori dal SEE",
        paragraphs: [
          "Alcuni fornitori (come Vercel) possono trattare dati fuori dallo Spazio Economico Europeo, inclusi gli Stati Uniti. Dove accade, i trasferimenti sono protetti dalle Standard Contractual Clauses della Commissione UE (art. 46(2)(c) GDPR) e, dove applicabile, da una decisione di adeguatezza come l'EU–US Data Privacy Framework.",
          "A parte: se un pod di delivery a Nairobi dovesse mai trattare dati personali per tuo conto nell'ambito di un ingaggio, quel trasferimento è regolato dal DPA e dalle SCC nel tuo contratto — non da questa policy del sito.",
        ],
      },
      {
        number: "08",
        title: "I tuoi diritti",
        paragraphs: ["Ai sensi del GDPR puoi, in qualsiasi momento:"],
        bullets: [
          "Accedere ai dati personali che deteniamo su di te (art. 15)",
          "Far rettificare dati inesatti (art. 16)",
          "Ottenere la cancellazione dei tuoi dati (art. 17)",
          "Limitare il trattamento (art. 18)",
          "Ricevere i tuoi dati in formato portabile (art. 20)",
          "Opporti al trattamento basato sul legittimo interesse (art. 21)",
          "Revocare qualsiasi consenso prestato, con effetto per il futuro (art. 7(3))",
        ],
      },
      {
        number: "09",
        title: "Esercitare i diritti & reclami",
        paragraphs: [
          "Per esercitare uno di questi diritti, scrivi a [Email privacy — da completare prima del lancio]. Rispondiamo entro un mese.",
          "Hai inoltre il diritto di presentare reclamo a un'autorità di controllo per la protezione dei dati — nello Stato membro UE in cui vivi, in cui lavori o in cui ritieni sia avvenuta una violazione (art. 77 GDPR). In Italia è il Garante per la protezione dei dati personali.",
        ],
      },
      {
        number: "10",
        title: "Cookie e analytics",
        paragraphs: [
          "Questo sito attualmente non imposta cookie di tracciamento e non esegue script di analytics, pubblicità o social media. Per questo non c'è un cookie banner: non c'è nulla a cui acconsentire. Se un giorno dovesse cambiare, aggiorneremo questa policy e chiederemo il consenso dove la legge lo richiede.",
        ],
      },
      {
        number: "11",
        title: "Modifiche a questa policy",
        paragraphs: [
          "Potremmo aggiornare questa policy con l'evolvere del servizio. La data in cima alla pagina riflette sempre l'ultima revisione, e le modifiche sostanziali saranno segnalate qui.",
        ],
      },
    ],
  },
};
