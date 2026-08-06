import type { Locale } from "@/lib/site";

interface CaseStudyContent {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  context: {
    number: string;
    title: string;
    body: string[];
  };
  setup: {
    number: string;
    title: string;
    body: string;
    items: { label: string; value: string }[];
  };
  operations: {
    number: string;
    title: string;
    body: string[];
  };
  results: {
    number: string;
    title: string;
    intro: string;
    note: string;
    metrics: { label: string; value: string }[];
  };
  next: {
    title: string;
    body: string;
  };
}

export const caseStudy: Record<Locale, CaseStudyContent> = {
  en: {
    seoTitle: "Case Study: Enable Digital, Client Zero | enable.talent",
    seoDescription:
      "How Enable Digital, our Italian sister agency, runs its delivery on a Nairobi pod with senior European QA — the internal proof behind the model we sell, documented honestly.",
    eyebrow: "Case study · Client zero",
    title: "Enable Digital: the pod we run on ourselves.",
    intro:
      "Before selling this model to anyone, we made it carry a real agency's delivery. Enable Digital is our Italian sister agency, our first client and the source of our senior European QA. This page documents the internal case — honestly, including what we're still measuring.",
    context: {
      number: "01",
      title: "The starting point",
      body: [
        "Enable Digital runs project management and digital delivery for Italian clients. Same margin pressure every agency in this market knows: clients expecting more output per retainer, mid-level specialists in Italy at €2,400–2,700/month employer cost when you can find them, and delivery capacity that never matches the sales pipeline's rhythm.",
        "Instead of hiring locally into that squeeze, we built the first Nairobi pod and pointed it at Enable Digital's own client work — with a senior Italian marketer as the QA gate. If the model couldn't survive our own delivery standards, it had no business being sold to yours.",
      ],
    },
    setup: {
      number: "02",
      title: "The pod, as configured",
      body: "The exact configuration we now sell as a starter-to-full progression:",
      items: [
        { label: "Pod composition", value: "Marketing specialists across content, design and web — scaled with the pipeline" },
        { label: "QA layer", value: "Senior Italian marketer, veto power on every deliverable" },
        { label: "Working hours", value: "CET business day (Nairobi UTC+3, +1/+2h)" },
        { label: "Workflow", value: "Enable Digital's own PM stack — the pod joined it, not the reverse" },
        { label: "Pay policy", value: "2–4x local Nairobi market rate, career path defined" },
        { label: "Compliance", value: "Contractor infrastructure with DPA; SCC template in every client engagement" },
      ],
    },
    operations: {
      number: "03",
      title: "What the first months taught us",
      body: [
        "The QA layer is not optional. Early deliverables were technically correct and contextually off — tone, client expectations, the unwritten rules of Italian B2B. The QA gate caught them, and the rejection loops became training material. Within weeks, first-pass acceptance climbed. This is why QA is in every pod we sell, non-negotiable: the model without it is just remote freelancing with extra logistics.",
        "Briefing discipline beats talent density. The pod's output quality tracked the quality of our briefs almost one-to-one. So we templated the briefs — and that template now ships with every client onboarding.",
        "Timezone alignment is a genuine operational asset, not a marketing line. Same-day briefing, same-day drafts, standups inside CET business hours. The '24-hour turnaround' offshore cliché exists because of misaligned timezones; at +1/+2h it simply doesn't apply.",
      ],
    },
    results: {
      number: "04",
      title: "Results, as documented so far",
      intro: "We publish what we can stand behind. The case is live and the dataset grows monthly:",
      note: "Detailed SLA logs, output volumes and savings calculations are shared in scoping calls — with client-specific numbers under NDA where needed. We'd rather show you a spreadsheet on a call than print a suspicious hero metric here.",
      metrics: [
        { label: "Delivery cost vs equivalent Italian hires", value: "40–70% below, in line with the market analysis bands" },
        { label: "Pod ramp-up to productive delivery", value: "Within the 10–14 day window we now sell" },
        { label: "QA gate", value: "100% of client-facing deliverables reviewed before delivery" },
        { label: "Specialist pay", value: "2–4x local market rate, documented" },
      ],
    },
    next: {
      title: "Be the case study we publish next",
      body: "Early clients get introductory pricing, disproportionate attention, and a documented case with real numbers — theirs. That trade is the honest deal behind our launch phase.",
    },
  },
  it: {
    seoTitle: "Caso Studio: Enable Digital, Cliente Zero | enable.talent",
    seoDescription:
      "Come Enable Digital, la nostra agenzia sorella italiana, fa girare la sua delivery su un pod di Nairobi con QA senior europeo — la prova interna dietro il modello che vendiamo, documentata onestamente.",
    eyebrow: "Caso studio · Cliente zero",
    title: "Enable Digital: il pod che usiamo su noi stessi.",
    intro:
      "Prima di vendere questo modello a chiunque, gli abbiamo fatto reggere la delivery di un'agenzia vera. Enable Digital è la nostra agenzia sorella italiana, il nostro primo cliente e la fonte del nostro QA senior europeo. Questa pagina documenta il caso interno — onestamente, incluso ciò che stiamo ancora misurando.",
    context: {
      number: "01",
      title: "Il punto di partenza",
      body: [
        "Enable Digital fa project management e delivery digitale per clienti italiani. La stessa pressione sui margini che ogni agenzia di questo mercato conosce: clienti che si aspettano più output per retainer, specialist mid-level in Italia a €2.400–2.700/mese di costo datoriale quando li trovi, e capacità di delivery che non va mai a tempo con la pipeline commerciale.",
        "Invece di assumere localmente dentro quella morsa, abbiamo costruito il primo pod di Nairobi e l'abbiamo puntato sul lavoro clienti di Enable Digital — con un marketer senior italiano come gate di QA. Se il modello non reggeva i nostri standard di delivery, non aveva diritto di essere venduto ai tuoi.",
      ],
    },
    setup: {
      number: "02",
      title: "Il pod, come configurato",
      body: "L'esatta configurazione che oggi vendiamo come progressione starter-to-full:",
      items: [
        { label: "Composizione del pod", value: "Specialist marketing tra content, design e web — scalati con la pipeline" },
        { label: "Layer di QA", value: "Marketer senior italiano, potere di veto su ogni deliverable" },
        { label: "Orario di lavoro", value: "Giornata CET (Nairobi UTC+3, +1/+2h)" },
        { label: "Workflow", value: "Lo stack PM di Enable Digital — il pod è entrato lì, non il contrario" },
        { label: "Policy retributiva", value: "2–4x il mercato locale di Nairobi, percorso di carriera definito" },
        { label: "Compliance", value: "Infrastruttura contractor con DPA; template SCC in ogni ingaggio cliente" },
      ],
    },
    operations: {
      number: "03",
      title: "Cosa ci hanno insegnato i primi mesi",
      body: [
        "Il layer di QA non è opzionale. I primi deliverable erano tecnicamente corretti e contestualmente fuori — tono, aspettative dei clienti, le regole non scritte del B2B italiano. Il gate di QA li ha intercettati, e i loop di rifiuto sono diventati materiale di formazione. In poche settimane l'accettazione al primo passaggio è salita. È per questo che il QA è in ogni pod che vendiamo, non negoziabile: il modello senza è solo freelancing remoto con più logistica.",
        "La disciplina dei brief batte la densità di talento. La qualità dell'output del pod seguiva quasi uno-a-uno la qualità dei nostri brief. Così abbiamo messo i brief a template — e quel template oggi fa parte di ogni onboarding cliente.",
        "L'allineamento di fuso è un asset operativo vero, non una riga di marketing. Brief in giornata, bozze in giornata, standup dentro l'orario CET. Il cliché offshore delle '24 ore di turnaround' esiste per colpa dei fusi disallineati; a +1/+2h semplicemente non si applica.",
      ],
    },
    results: {
      number: "04",
      title: "Risultati, come documentati finora",
      intro: "Pubblichiamo ciò che possiamo difendere. Il caso è vivo e il dataset cresce ogni mese:",
      note: "Log SLA dettagliati, volumi di output e calcoli di risparmio vengono condivisi nelle call di scoping — con i numeri specifici dei clienti sotto NDA dove serve. Preferiamo mostrarti uno spreadsheet in call che stampare qui una hero metric sospetta.",
      metrics: [
        { label: "Costo di delivery vs assunzioni italiane equivalenti", value: "40–70% sotto, in linea con le fasce dell'analisi di mercato" },
        { label: "Ramp-up del pod alla delivery produttiva", value: "Dentro la finestra di 10–14 giorni che oggi vendiamo" },
        { label: "Gate di QA", value: "100% dei deliverable client-facing rivisti prima della consegna" },
        { label: "Retribuzione specialist", value: "2–4x il mercato locale, documentata" },
      ],
    },
    next: {
      title: "Sii il prossimo caso studio che pubblichiamo",
      body: "I primi clienti ottengono prezzo introduttivo, attenzione sproporzionata e un caso documentato con numeri veri — i loro. Questo scambio è il patto onesto della nostra fase di lancio.",
    },
  },
};
