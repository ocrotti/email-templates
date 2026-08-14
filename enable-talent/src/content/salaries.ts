import type { Locale } from "@/lib/site";

/**
 * European marketing salary benchmarks.
 *
 * Figures are monthly EMPLOYER COST in the currency of the market, compiled
 * 2025–2026 from mixed sources (Glassdoor, PayScale, ERI, TechCompenso and
 * vendor-published ranges). They are the same bands the homepage savings
 * calculator runs on. Nothing here is invented: every cell traces back to the
 * market analysis, and cells without a source are left out rather than guessed.
 */

export interface SalaryRow {
  /** Role label, in the locale's language. */
  role: string;
  /** Optional link to the matching role page (locale-aware path). */
  href?: string;
  italy: string;
  germany: string;
  uk: string;
  /** Short provenance note shown under the row. */
  note?: string;
}

interface SalariesContent {
  seoTitle: string;
  seoDescription: string;
  breadcrumb: string;
  h1: string;
  intro: string[];
  table: {
    title: string;
    intro: string;
    columns: { role: string; italy: string; germany: string; uk: string };
    perMonth: string;
    rows: SalaryRow[];
    note: string;
  };
  notIncluded: {
    title: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  vsPod: {
    title: string;
    body: string[];
  };
  methodology: {
    title: string;
    body: string[];
    sourcesLabel: string;
    sources: string[];
  };
  faqTitle: string;
  faq: { q: string; a: string }[];
  cta: { label: string; pricing: string };
  /** Human-readable coverage window, also used for schema.org temporalCoverage. */
  coverage: string;
}

export const SALARIES_PATH = "/marketing-salaries";

/** schema.org temporalCoverage for the Dataset markup. */
export const SALARIES_TEMPORAL_COVERAGE = "2025/2026";

export const salaries: Record<Locale, SalariesContent> = {
  en: {
    seoTitle: "Marketing Salary Benchmarks: Italy, Germany, UK | 2026",
    seoDescription:
      "Monthly employer-cost benchmarks for five marketing roles in Italy, Germany and the UK. Mixed-source and directional, with the method and caveats stated.",
    breadcrumb: "Marketing salary benchmarks",
    h1: "European marketing salary benchmarks (Italy, Germany, UK)",
    intro: [
      "We sell offshore marketing pods, so yes — we have an interest in what a European specialist costs. That is why we publish the numbers we use ourselves, sources and weak spots attached. Where a figure is thin, we say so.",
      "Read them as gross monthly salary, not take-home pay and not fully-loaded employer cost, and as a starting point for your own market check rather than a quote. Salary data is directional: it moves with city, seniority, sector and how badly the hire is needed.",
    ],
    table: {
      title: "The benchmark: five roles, three markets",
      intro:
        "Gross salary per month. Employer contributions sit on top and vary by country and contract. Where the source published an annual figure instead, the row says so.",
      columns: { role: "Role", italy: "Italy", germany: "Germany", uk: "United Kingdom" },
      perMonth: "per month",
      rows: [
        {
          role: "Digital marketing specialist",
          italy: "€2,400–2,700",
          germany: "~€4,300",
          uk: "~£5,740",
          note: "Italy: €28.5–32k/yr. Germany: €51.9k/yr, paid media. UK figure is a social media specialist.",
        },
        {
          role: "Paid media / media buyer",
          href: "/roles/paid-media",
          italy: "€2,000–2,500",
          germany: "€3,600–5,200",
          uk: "£4,000–5,500",
          note: "Germany: €43.5–62k/yr for media buyers.",
        },
        {
          role: "SEO specialist",
          href: "/roles/seo",
          italy: "€2,500–2,700",
          germany: "€3,500–4,500",
          uk: "£3,500–5,000",
          note: "Italy: median gross annual ~€35,000 (TechCompenso), spread over the 13–14 monthly instalments Italian contracts commonly use — which is where the monthly range comes from.",
        },
        {
          role: "Content & social",
          href: "/roles/content-social",
          italy: "€1,500–2,000",
          germany: "€3,000–3,600",
          uk: "£3,000–4,500",
        },
        {
          role: "Developer (mid-level)",
          href: "/roles/development",
          italy: "€3,000–4,000",
          germany: "€5,000–6,500",
          uk: "£5,000–7,000",
        },
      ],
      note: "Currencies as published: euro for Italy and Germany, pound sterling for the UK. We have not converted GBP into EUR — the exchange rate would add a second layer of noise to already directional data.",
    },
    notIncluded: {
      title: "What the salary doesn't include",
      intro:
        "Every figure above is the smallest part of what a seat actually costs. Budget the rest before you compare anything.",
      items: [
        {
          title: "Employer taxes and contributions",
          body: "On top of gross pay sit social contributions, insurance and statutory provisions. The multiplier differs by country, which is why comparisons made on salary alone go wrong across borders.",
        },
        {
          title: "Recruiting and time-to-hire",
          body: "Agency fees, job ads, screening hours, and the weeks of uncovered capacity while you search. The seat costs money before anyone sits in it.",
        },
        {
          title: "Ramp-up months",
          body: "A mid-level marketer is rarely at full output before month two or three. That ramp is paid at full salary and delivered at partial value.",
        },
        {
          title: "Tooling and workspace",
          body: "Licences, ad platform access, analytics seats, hardware, a desk. Small per head, real across a team.",
        },
        {
          title: "Management overhead",
          body: "Someone senior reviews the work, unblocks it and runs the one-to-ones. That time would be billable elsewhere.",
        },
        {
          title: "The risk they resign",
          body: "If the person leaves in month eight, you pay recruiting and ramp-up a second time and lose the client context they carried.",
        },
      ],
    },
    vsPod: {
      title: "How to read these against a pod",
      body: [
        "A pod seat starts at €2,000 a month, all-in: the specialist, pod management, senior European QA, the replacement guarantee and the GDPR paperwork. Set that against the columns above and you get the 40–70% saving we quote — the spread comes from which market and role you are replacing, not from a rounding in our favour.",
        "The honest comparison is not seat against seat. Against Italy at the low end the saving is modest; against Germany or the UK on a paid media or developer seat you are at the wide end of the band. [Run your own numbers on the homepage calculator](/) or [see what the bands include](/pricing).",
        "Role by role: [paid media](/roles/paid-media), [SEO](/roles/seo), [content and social](/roles/content-social), [development](/roles/development) — or [the full list of roles](/roles).",
      ],
    },
    methodology: {
      title: "Methodology and caveats",
      body: [
        "Compiled during 2025–2026 from mixed sources: Glassdoor and PayScale for self-reported ranges, ERI for modelled employer cost, TechCompenso for the Italian SEO median, plus ranges published by staffing vendors in the same markets.",
        "Reliability is uneven and we will not pretend otherwise. Some cells rest on decent samples; others on a single published range. On self-reported platforms the samples for specialist marketing titles are thin, in Italy especially. Treat every number as a band, not a price.",
        "Figures are gross salary per month unless a row says otherwise, in the currency of the market. If you hire in these markets and our numbers are off, tell us — we would rather correct the page than defend it. [Send us a correction](/contact).",
      ],
      sourcesLabel: "Sources",
      sources: [
        "Glassdoor — self-reported salary ranges",
        "PayScale — self-reported compensation data",
        "ERI — modelled employer cost by market",
        "TechCompenso — Italian tech and marketing salary survey",
        "Staffing vendors — published rate cards and salary guides",
      ],
    },
    faqTitle: "Salary benchmark FAQ",
    faq: [
      {
        q: "Is this gross salary or employer cost?",
        a: "Employer cost per month: what the seat costs your company, not what lands in the person's account. Take-home pay is materially lower in every market listed.",
      },
      {
        q: "Why is Germany so much higher than Italy?",
        a: "Higher base pay for the same job title, plus a heavier employer contribution load. German paid media and SEO roles also skew more senior and more in-house than the Italian equivalents, which sit more often agency-side.",
      },
      {
        q: "Do these figures include employer contributions?",
        a: "Where the source modelled full employer cost, yes. Where it published gross pay, contributions sit on top and vary by country and contract type. That mixed basis is why we call these numbers directional.",
      },
      {
        q: "How often is this updated?",
        a: "We revisit it when we redo the market analysis, roughly once a year, and sooner if a source moves a band. No automatic refresh sits behind this page.",
      },
      {
        q: "Where did the numbers come from?",
        a: "Glassdoor, PayScale, ERI, TechCompenso and vendor-published ranges, compiled across 2025 and 2026. Each is named in the methodology section, with the weaker cells flagged in the row notes.",
      },
    ],
    cta: { label: "Talk to us about a pod", pricing: "See pricing" },
    coverage: "Data compiled 2025–2026",
  },
  it: {
    seoTitle: "Quanto costa un marketing specialist: benchmark salariali",
    seoDescription:
      "Costo aziendale mensile di cinque ruoli marketing in Italia, Germania e UK. Dati da fonti miste, direzionali, con metodo e limiti dichiarati.",
    breadcrumb: "Benchmark salariali marketing",
    h1: "Quanto costa un marketing specialist in Europa: benchmark salariali",
    intro: [
      "Vendiamo pod marketing offshore, quindi sì: abbiamo un interesse in quanto costa uno specialist in Europa. Per questo pubblichiamo i numeri che usiamo noi, con fonti e punti deboli attaccati. Dove il dato è fragile lo scriviamo.",
      "Leggili come retribuzione lorda mensile, non come stipendio netto né come costo aziendale pieno, e come punto di partenza per la tua verifica di mercato, non come un preventivo. I dati salariali sono direzionali: si muovono con la città, la seniority, il settore e l'urgenza di chiudere.",
    ],
    table: {
      title: "Il benchmark: cinque ruoli, tre mercati",
      intro:
        "Retribuzione lorda mensile. I contributi datoriali stanno sopra e variano per paese e contratto. Dove la fonte pubblicava un dato annuo, la riga lo indica.",
      columns: { role: "Ruolo", italy: "Italia", germany: "Germania", uk: "Regno Unito" },
      perMonth: "al mese",
      rows: [
        {
          role: "Digital marketing specialist",
          italy: "€2.400–2.700",
          germany: "~€4.300",
          uk: "~£5.740",
          note: "Italia: €28,5–32k/anno. Germania: €51,9k/anno, paid media. Il dato UK è di un social media specialist.",
        },
        {
          role: "Paid media / media buyer",
          href: "/roles/paid-media",
          italy: "€2.000–2.500",
          germany: "€3.600–5.200",
          uk: "£4.000–5.500",
          note: "Germania: €43,5–62k/anno per i media buyer.",
        },
        {
          role: "SEO specialist",
          href: "/roles/seo",
          italy: "€2.500–2.700",
          germany: "€3.500–4.500",
          uk: "£3.500–5.000",
          note: "Italia: RAL mediana lorda ~€35.000 (TechCompenso), distribuita sulle 13–14 mensilità comuni nei contratti italiani — da lì viene la fascia mensile.",
        },
        {
          role: "Content e social",
          href: "/roles/content-social",
          italy: "€1.500–2.000",
          germany: "€3.000–3.600",
          uk: "£3.000–4.500",
        },
        {
          role: "Sviluppatore (mid)",
          href: "/roles/development",
          italy: "€3.000–4.000",
          germany: "€5.000–6.500",
          uk: "£5.000–7.000",
        },
      ],
      note: "Valute come pubblicate: euro per Italia e Germania, sterline per il Regno Unito. Non abbiamo convertito le sterline: il cambio aggiungerebbe un secondo strato di rumore a dati già direzionali.",
    },
    notIncluded: {
      title: "Cosa non c'è nella riga dello stipendio",
      intro:
        "Ogni cifra qui sopra è la parte più piccola di quanto costa davvero un posto. Metti a budget il resto prima di confrontare.",
      items: [
        {
          title: "Contributi e oneri del datore",
          body: "Sopra il lordo ci sono contributi, assicurazioni e accantonamenti di legge. Il moltiplicatore cambia da Paese a Paese: per questo i confronti fatti solo sullo stipendio saltano da un mercato all'altro.",
        },
        {
          title: "Recruiting e tempo di copertura",
          body: "Fee di agenzia, annunci, ore di screening e le settimane di capacità scoperta mentre cerchi. Il posto costa prima che qualcuno ci si sieda.",
        },
        {
          title: "Mesi di rodaggio",
          body: "Un profilo mid difficilmente rende al massimo prima del secondo o terzo mese. Quel rodaggio lo paghi pieno e lo incassi parziale.",
        },
        {
          title: "Strumenti e postazione",
          body: "Licenze, accessi alle piattaforme pubblicitarie, seat di analytics, hardware, una scrivania. Poco a testa, parecchio su un team.",
        },
        {
          title: "Costo di gestione",
          body: "Qualcuno di senior rivede il lavoro, sblocca e fa i colloqui uno-a-uno. Quel tempo, altrove, sarebbe fatturabile.",
        },
        {
          title: "Il rischio che si dimetta",
          body: "Se la persona se ne va all'ottavo mese, paghi recruiting e rodaggio una seconda volta e perdi il contesto cliente che aveva.",
        },
      ],
    },
    vsPod: {
      title: "Come leggerli rispetto a un pod",
      body: [
        "Un posto in pod parte da €2.000 al mese, tutto incluso: lo specialist, la gestione del pod, il QA senior europeo, la garanzia di replacement e la parte GDPR. Mettilo accanto alle colonne qui sopra ed esce la forbice 40–70% che dichiariamo: dipende da quale mercato e quale ruolo stai sostituendo, non da un arrotondamento a nostro favore.",
        "Il confronto onesto non è posto contro posto. Contro l'Italia nella fascia bassa il risparmio è contenuto; contro Germania o Regno Unito, su paid media o sviluppo, sei all'estremo alto della forbice. [Fai i tuoi conti con il calcolatore in home](/it) oppure [guarda cosa comprendono le fasce](/it/pricing).",
        "Ruolo per ruolo: [paid media](/it/roles/paid-media), [SEO](/it/roles/seo), [content e social](/it/roles/content-social), [sviluppo](/it/roles/development) — oppure [l'elenco completo dei ruoli](/it/roles).",
      ],
    },
    methodology: {
      title: "Metodo e limiti",
      body: [
        "Raccolti tra 2025 e 2026 da fonti miste: Glassdoor e PayScale per le fasce auto-dichiarate, ERI per il costo aziendale modellato, TechCompenso per la mediana SEO italiana, più le fasce pubblicate da vendor di staffing negli stessi mercati.",
        "L'affidabilità è disomogenea e non facciamo finta di niente. Alcune celle poggiano su campioni decenti, altre su una sola fascia pubblicata. Sui portali auto-dichiarati i campioni per i titoli marketing specialistici sono sottili, in Italia soprattutto. Tratta ogni numero come una fascia, non come un prezzo.",
        "Le cifre sono retribuzione lorda mensile salvo diversa indicazione nella riga, nella valuta del mercato. Se assumi in questi mercati e i nostri numeri sono sbagliati, scrivicelo: preferiamo correggere la pagina che difenderla. [Mandaci una correzione](/it/contact).",
      ],
      sourcesLabel: "Fonti",
      sources: [
        "Glassdoor — fasce salariali auto-dichiarate",
        "PayScale — dati retributivi auto-dichiarati",
        "ERI — costo aziendale modellato per mercato",
        "TechCompenso — rilevazione salari tech e marketing in Italia",
        "Vendor di staffing — listini e guide salariali pubblicate",
      ],
    },
    faqTitle: "FAQ sui benchmark salariali",
    faq: [
      {
        q: "È lordo o costo aziendale?",
        a: "Costo aziendale mensile: quanto ti costa il posto, non quanto arriva sul conto della persona. Il netto è sensibilmente più basso in tutti i mercati elencati.",
      },
      {
        q: "Perché la Germania è così più alta dell'Italia?",
        a: "Base retributiva più alta a parità di ruolo e un carico contributivo più pesante. In Germania i profili paid media e SEO sono anche più senior e più spesso interni all'azienda rispetto agli equivalenti italiani.",
      },
      {
        q: "Sono compresi i contributi a carico del datore?",
        a: "Dove la fonte modellava il costo aziendale pieno, sì. Dove pubblicava il lordo, i contributi vanno aggiunti sopra e cambiano per Paese e tipo di contratto. Per questo li chiamiamo numeri direzionali.",
      },
      {
        q: "Ogni quanto aggiornate la pagina?",
        a: "La rivediamo quando rifacciamo l'analisi di mercato, più o meno una volta l'anno, e prima se una fonte sposta una fascia. Dietro non c'è nessun aggiornamento automatico.",
      },
      {
        q: "Da dove arrivano i numeri?",
        a: "Glassdoor, PayScale, ERI, TechCompenso e fasce pubblicate dai vendor, raccolti tra 2025 e 2026. Sono indicati nella sezione sul metodo, con le celle più deboli segnalate nelle note di riga.",
      },
    ],
    cta: { label: "Parliamo di un pod", pricing: "Vedi i prezzi" },
    coverage: "Dati raccolti 2025–2026",
  },
};
