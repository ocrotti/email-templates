import { pricing } from "@/lib/site-config";
import type { Dict, FaqItem, Kpi, ProcessPhase, SeoMeta } from "./types";

interface HomeContent {
  meta: SeoMeta;
  hero: {
    kicker: string;
    titleLines: string[];
    subtitle: string;
    proofPoints: { title: string; detail: string }[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  marquee: string[];
  problem: {
    number: string;
    label: string;
    title: string;
    points: { title: string; body: string }[];
    outcome: string;
  };
  solution: {
    number: string;
    label: string;
    title: string;
    intro: string;
    pillars: { title: string; body: string }[];
    modulesTitle: string;
    modules: {
      tag: string;
      title: string;
      body: string;
      items: string[];
    }[];
  };
  process: {
    number: string;
    label: string;
    title: string;
    intro: string;
    phases: ProcessPhase[];
    complianceLink: string;
  };
  caseTeaser: {
    number: string;
    label: string;
    title: string;
    body: string;
    kpis: Kpi[];
    kpiNote: string;
    cta: string;
  };
  areas: {
    number: string;
    label: string;
    title: string;
    intro: string;
    list: { title: string; body: string }[];
    rationale: string;
  };
  investment: {
    number: string;
    label: string;
    title: string;
    intro: string;
    timeline: { phase: string; weeks: string; body: string }[];
    pricingTitle: string;
    tiers: {
      name: string;
      price: string;
      priceNote: string;
      body: string;
      features: string[];
      highlighted: boolean;
      /** Per-card conversion CTA — links to the contact page */
      cta: string;
    }[];
    transparencyNote: string;
  };
  why: {
    number: string;
    label: string;
    title: string;
    differentiators: { title: string; body: string }[];
    trustTitle: string;
    trustSignals: string[];
    /** Light closing CTA — links to the contact page */
    cta: string;
  };
  faq: {
    number: string;
    label: string;
    title: string;
    items: FaqItem[];
    /** Contextual link from the home body to the insight index */
    insightLink: string;
  };
}

export const home: Dict<HomeContent> = {
  it: {
    meta: {
      title: "Disease awareness as-a-service per il pharma | Enable Pharma",
      description:
        "Più di un'agenzia di comunicazione pharma: piattaforme di disease awareness unbranded, community e farmacovigilanza in un servizio ricorrente.",
    },
    hero: {
      kicker: "Disease awareness as-a-service — Italia · EU",
      titleLines: ["Community di", "disease awareness,", "compliant by design."],
      subtitle:
        "Costruiamo e gestiamo piattaforme di sensibilizzazione istituzionali e unbranded per le aziende della salute. Un servizio ricorrente, non una campagna: la compliance entra nel progetto come specifica, con workflow, owner e audit trail.",
      proofPoints: [
        {
          title: "Compliance-by-design",
          detail: "Unbranded (D.Lgs. 219/2006), GVP Modulo VI, GDPR art. 9, Codice Farmindustria, AGCOM",
        },
        {
          title: "Verticale dove serve",
          detail: "Malattie rare, ematologia e plasma, patologie croniche ad alto ritardo diagnostico",
        },
        {
          title: "Un solo partner",
          detail: "Strategia, contenuti con revisione medica, community, farmacovigilanza, reporting",
        },
      ],
      ctaPrimary: "Richiedi l'audit",
      ctaSecondary: "Guarda un progetto tipo",
    },
    marquee: [
      "D.Lgs. 219/2006",
      "Art. 113",
      "GVP Modulo VI",
      "GDPR Art. 9",
      "Codice Farmindustria",
      "EFPIA",
      "AGCOM 197/25/CONS",
      "WCAG 2.2 AA",
      "European Accessibility Act",
    ],
    problem: {
      number: "01",
      label: "Il problema",
      title: "In Italia l'awareness si fa a campagne. Poi si spegne.",
      points: [
        {
          title: "Progetti spot, non presidi",
          body: "La sensibilizzazione vive di giornate mondiali e campagne trimestrali. A budget esaurito, il presidio sparisce: sito fermo, canali muti, community mai nata. Il giorno dopo l'evento, silenzio.",
        },
        {
          title: "Il rischio percepito blocca i progetti",
          body: "Pubblicità dei farmaci con obbligo di prescrizione vietata. Canali social che attivano obblighi di farmacovigilanza. Influencer regolati da AGCOM. Il risultato: i progetti digitali muoiono in revisione legale prima ancora di partire.",
        },
        {
          title: "Il modello che funziona qui non c'è",
          body: "All'estero le community di patologia continuative sono un'industria matura, con modelli di sponsorship consolidati. In Italia quel modello non esiste in versione EU-compliant: chi lo traduce per primo occupa lo spazio.",
        },
      ],
      outcome:
        "Intanto le persone restano sole: nella spondilite anchilosante il ritardo diagnostico medio è di 7–8 anni (survey EMAS) e in Italia il 60% dei pazienti reumatologici attende più di 3 anni (ANMAR / Osservatorio CAPIRE). Su orizzonti così lunghi, l'informazione continuativa è l'unica che può incontrare una persona nel momento in cui cerca.",
    },
    solution: {
      number: "02",
      label: "La soluzione",
      title: "Una piattaforma che si accende. E non si vuole più spegnere.",
      intro:
        "La piattaforma di awareness as-a-service è un asset continuativo: hub di patologia, contenuti con revisione medica, serie podcast, community moderata. L'azienda la accende una volta; noi la facciamo funzionare, crescere e restare conforme, mese dopo mese.",
      pillars: [
        {
          title: "Compliance dentro il prodotto",
          body: "Unbranded per progettazione, workflow di farmacovigilanza integrato, consenso GDPR esplicito, trasparenza dei rapporti con le associazioni. Ogni requisito normativo diventa una funzione della piattaforma, non un allegato.",
        },
        {
          title: "Rigore medico-scientifico",
          body: "Contenuti sviluppati con revisione medica, fonti citate, data di revisione visibile, comitato scientifico nominato per il progetto. I contenuti di comunicazione medico-scientifica arrivano alla review MLR del cliente già predisposti, con audit trail completo.",
        },
        {
          title: "Gestione end-to-end",
          body: "Dalla strategia al social listening: un unico partner con un unico contratto. Niente filiera di fornitori da coordinare, nessuna zona grigia di responsabilità.",
        },
      ],
      modulesTitle: "Tre moduli, un percorso",
      modules: [
        {
          tag: "Ingresso",
          title: "Awareness & Compliance Audit",
          body: "Il punto di partenza a basso rischio: fotografia completa di patologia, stakeholder e spazio normativo. Prezzo fisso, 4–6 settimane.",
          items: [
            "Paesaggio della patologia e dei bisogni informativi",
            "Mappa di associazioni e stakeholder",
            "Benchmark nazionali e internazionali",
            "Gap normativo e perimetro del possibile",
            "Roadmap operativa con stima di investimento",
          ],
        },
        {
          tag: "Core · ricorrente",
          title: "Piattaforma di Awareness as-a-service",
          body: "L'asset continuativo: costruito, gestito e misurato da noi, di proprietà del cliente. Retainer mensile, contratto pluriennale.",
          items: [
            "Hub di patologia con contenuti a revisione medica",
            "Serie podcast / vodcast con review scientifica",
            "Social & community management moderato",
            "Farmacovigilanza integrata (GVP Modulo VI)",
            "Reporting trimestrale su KPI non promozionali",
          ],
        },
        {
          tag: "Add-on",
          title: "Estensioni del presidio",
          body: "Moduli aggiuntivi quando la piattaforma è matura e la governance lo consente.",
          items: [
            "Programma patient & HCP influencer compliant AGCOM",
            "Coinvolgimento associazioni pazienti con disclosure",
            "Eventi e giornate di patologia",
            "AI content ops con supervisione umana",
            "Social listening non promozionale",
          ],
        },
      ],
    },
    process: {
      number: "03",
      label: "Come lavoriamo",
      title: "Cinque fasi, in un ordine che non cambia.",
      intro:
        "Prima si definisce il perimetro normativo, poi si progetta, poi si pubblica. Ogni fase ha un owner, deliverable espliciti e un passaggio di revisione documentato.",
      phases: [
        {
          index: "F1",
          title: "Discovery & Compliance Audit",
          weeks: "Settimane 1–6",
          owner: "Strategy + Regulatory",
          body: "Analizziamo patologia, pubblici, stakeholder e vincoli normativi. Il risultato è il perimetro del possibile: cosa si può dire, dove, con quali presidi.",
          deliverables: [
            "Audit di patologia e stakeholder",
            "Gap analysis normativa",
            "Benchmark e casi comparabili",
            "Roadmap con perimetro approvabile",
          ],
        },
        {
          index: "F2",
          title: "Insight & Strategy",
          weeks: "Settimane 5–8",
          owner: "Strategy",
          body: "Definiamo posizionamento della piattaforma, architettura dei contenuti, tono di voce e framework di misurazione. Ogni scelta è motivata e documentata per la review interna del cliente.",
          deliverables: [
            "Posizionamento e naming proprietario",
            "Architettura contenuti e canali",
            "KPI framework non promozionale",
          ],
        },
        {
          index: "F3",
          title: "Design & Build",
          weeks: "Settimane 7–12",
          owner: "Design + Engineering + Medical",
          body: "Costruiamo piattaforma e contenuti fondativi: hub, serie editoriali, formati podcast. Ogni contenuto nasce con fonti, data di revisione e passaggio MLR predisposto.",
          deliverables: [
            "Piattaforma accessibile (WCAG 2.2 AA)",
            "Contenuti fondativi con revisione medica",
            "Layer compliance: disclaimer, trasparenza, canale segnalazioni",
          ],
        },
        {
          index: "F4",
          title: "Launch",
          weeks: "Settimane 12–14",
          owner: "Tutto il team",
          body: "Lancio coordinato con i canali del cliente e degli stakeholder coinvolti. Moderazione attiva dal primo giorno, con workflow di farmacovigilanza già operativo.",
          deliverables: [
            "Piano di lancio multicanale",
            "Onboarding stakeholder e associazioni",
            "Presidio moderazione + PV attivo",
          ],
        },
        {
          index: "F5",
          title: "Manage & Measure",
          weeks: "Continuativo",
          owner: "Community + Medical + PV",
          body: "La fase che non finisce: piano editoriale, moderazione documentata, social listening con escalation di farmacovigilanza, reporting trimestrale con lettura strategica.",
          deliverables: [
            "Piano editoriale continuativo",
            "Workflow PV con SLA documentati",
            "Reporting trimestrale e comitato di indirizzo",
          ],
        },
      ],
      complianceLink: "Come funziona il nostro impianto compliance",
    },
    caseTeaser: {
      number: "04",
      label: "Un progetto tipo",
      title: "In pratica, cosa costruiamo?",
      body: "Un progetto anonimizzato nelle malattie rare della coagulazione: piattaforma unbranded, programma di medici-creator selezionati con matrice di scoring proprietaria, serie podcast con revisione scientifica, community con farmacovigilanza integrata.",
      kpis: [
        { value: 14, unit: "mesi", label: "di presidio continuativo al primo rinnovo" },
        { value: 40, prefix: "+", suffix: "%", label: "crescita trimestrale media della community" },
        { value: 8, unit: "episodi", label: "di serie podcast con review medica" },
        { value: 100, suffix: "%", label: "segnalazioni PV gestite entro le finestre di reporting" },
      ],
      kpiNote: "Dati illustrativi di un progetto tipo, dichiarati come tali.",
      cta: "Vedi il progetto completo",
    },
    areas: {
      number: "05",
      label: "Aree terapeutiche",
      title: "Dove un presidio continuativo pesa di più.",
      intro:
        "Non lavoriamo ovunque. Scegliamo aree dove il ritardo diagnostico è misurabile in anni e dove l'informazione manca proprio nel punto del percorso in cui servirebbe: prima del sospetto clinico, prima della scelta del centro.",
      list: [
        {
          title: "Malattie rare e ultra-rare",
          body: "Percorsi diagnostici lunghi anche più di 5 anni, pazienti dispersi, centri di riferimento poco conosciuti. Il contesto dove una piattaforma continuativa produce il valore più alto.",
        },
        {
          title: "Ematologia e plasma",
          body: "Patologie della coagulazione e malattie del sangue: community piccole, bisogni informativi altissimi, forte ruolo delle associazioni. La nostra verticale di partenza.",
        },
        {
          title: "Croniche e infiammatorie",
          body: "IBD, psoriasi, diabete, patologie reumatologiche: milioni di persone, percorsi frammentati, convivenza quotidiana con la malattia. La awareness qui è educazione continua, non un lancio.",
        },
        {
          title: "Oncologia",
          body: "Informazione istituzionale su prevenzione, diagnosi precoce e qualità della vita, con il massimo rigore di fonti e revisione. Dove la sensibilità è più alta, la compliance vale doppio.",
        },
      ],
      rationale:
        "Il criterio è sempre lo stesso: ritardo diagnostico elevato + bisogno informativo non presidiato = razionale forte per un asset di awareness continuativo. È il motivo per cui la comunicazione sulle malattie rare è il nostro punto di partenza.",
    },
    investment: {
      number: "06",
      label: "Roadmap e investimento",
      title: "Trasparenti anche sui numeri.",
      intro:
        "Il settore vive di preventivi opachi. Preferiamo dare subito un ordine di grandezza: l'audit ha un prezzo fisso, la piattaforma un retainer mensile definito dopo l'audit.",
      timeline: [
        {
          phase: "Audit",
          weeks: "Settimane 1–6",
          body: "Awareness & Compliance Audit: perimetro, benchmark, roadmap.",
        },
        {
          phase: "Build",
          weeks: "Settimane 7–12",
          body: "Piattaforma, contenuti fondativi, impianto compliance.",
        },
        {
          phase: "Live",
          weeks: "Dalla settimana 13",
          body: "Lancio e gestione continuativa: contenuti, community, PV, reporting.",
        },
      ],
      pricingTitle: "Investimento",
      tiers: [
        {
          name: "Awareness & Compliance Audit",
          price: `€${pricing.auditPrice}`,
          priceNote: "una tantum · 4–6 settimane",
          body: "Il prodotto d'ingresso: rischio limitato, valore immediato. L'audit è utilizzabile anche se il progetto non prosegue con noi.",
          features: [
            "Paesaggio patologia e stakeholder",
            "Gap normativo e perimetro approvabile",
            "Benchmark nazionali e internazionali",
            "Roadmap con stima del retainer",
          ],
          highlighted: false,
          cta: "Richiedi l'audit",
        },
        {
          name: "Piattaforma as-a-service",
          price: `da €${pricing.platformFrom}/mese`,
          priceNote: `contratto ${pricing.platformContractMonths} mesi`,
          body: "Il servizio core: piattaforma, contenuti, community e farmacovigilanza in un unico retainer. Il perimetro esatto esce dall'audit.",
          features: [
            "Hub + piano editoriale con revisione medica",
            "Serie podcast / vodcast",
            "Community management + PV integrata",
            "Reporting trimestrale con comitato di indirizzo",
          ],
          highlighted: true,
          cta: "Parti dall'audit",
        },
      ],
      transparencyNote:
        "Range coerenti con i benchmark di mercato per servizi healthcare continuativi. Il perimetro esatto — canali, volumi, lingue, governance — si definisce con l'audit: per questo esiste.",
    },
    why: {
      number: "07",
      label: "Perché Enable Pharma",
      title: "Dieci agenzie vi diranno «siamo compliant». Noi ve lo mostriamo.",
      differentiators: [
        {
          title: "La compliance è il prodotto",
          body: "Workflow MLR, farmacovigilanza e GDPR sono processi documentati, con owner, SLA e audit trail: il vostro legal può ispezionarli prima della firma.",
        },
        {
          title: "Esperienza vera sulle rare",
          body: "Il team viene da progetti di awareness continuativa in malattie rare ed ematologia: mappa delle associazioni, centri di riferimento, calendari di disclosure. In audit portiamo i deliverable, non i loghi dei clienti.",
        },
        {
          title: "Modello ricorrente, KPI nel tempo",
          body: "Non siamo un'agenzia di comunicazione pharma che fattura campagna per campagna: costruiamo asset misurati su engagement, qualità delle conversazioni e continuità del presidio, trimestre dopo trimestre.",
        },
      ],
      trustTitle: "Segnali che contano per chi firma",
      trustSignals: [
        "Comitato medico-scientifico nominato per ogni progetto, con ruoli e CV resi pubblici sulla piattaforma",
        "Ogni contenuto con fonti citate e data di revisione",
        "Processi predisposti per la review MLR del cliente",
        "Riferimenti normativi puntuali, mai generici",
        "Accessibilità WCAG 2.2 AA / European Accessibility Act",
      ],
      cta: "Verificatelo con un audit",
    },
    faq: {
      number: "08",
      label: "FAQ",
      title: "Le domande che ci fate davvero.",
      items: [
        {
          question: "State facendo pubblicità di farmaci?",
          answer:
            "No. La pubblicità al pubblico dei farmaci con obbligo di prescrizione è vietata dal D.Lgs. 219/2006. Le nostre piattaforme sono comunicazione istituzionale sulla patologia: l'art. 113 esclude dalla nozione di pubblicità le informazioni su salute e malattie prive di riferimenti, anche indiretti, a medicinali. Nessun nome di farmaco, nessun principio attivo, mai. Il nome e il logo dell'azienda possono comparire in chiave istituzionale. Il perimetro completo è mappato in [Disease awareness in Italia: cosa si può fare](/insight/campagne-unbranded-pharma-cosa-si-puo-fare).",
        },
        {
          question: "Chi firma la revisione medico-scientifica?",
          answer:
            "Ogni contenuto è sviluppato con revisione medica, fonti citate e data di revisione visibile, sotto il comitato scientifico nominato per il progetto. Al vostro processo MLR non arrivano bozze: arrivano fascicoli, con ogni claim agganciato alla sua fonte e ogni versione archiviata. La responsabilità approvativa finale resta dove deve stare: nel vostro processo interno. Come progettiamo il percorso di revisione è spiegato in [Comunicazione medico-scientifica e review MLR](/insight/comunicazione-medico-scientifica-revisione-mlr).",
        },
        {
          question: "Come gestite un evento avverso segnalato nei commenti?",
          answer:
            "Con un workflow di farmacovigilanza conforme alle GVP, Modulo VI: monitoraggio dei canali owned, intercettazione delle menzioni rilevanti, escalation a personale di farmacovigilanza qualificato entro le finestre di reporting, template di risposta approvati e registro completo. Il workflow si definisce insieme al vostro dipartimento PV prima del lancio, non dopo il primo caso. Il workflow completo è descritto in [Farmacovigilanza sui social media](/insight/farmacovigilanza-social-media-gvp-modulo-vi).",
        },
        {
          question: "Che ruolo hanno le associazioni pazienti?",
          answer:
            "Sono partner, non canali. Il coinvolgimento avviene con contratti scritti e con la disclosure dei trasferimenti di valore prevista dal Codice Farmindustria, che recepisce il Codice EFPIA. La trasparenza tutela l'associazione, l'azienda e la credibilità della piattaforma. Le regole operative, associazione per associazione, sono in [Patient engagement compliant](/insight/patient-engagement-associazioni-influencer-agcom).",
        },
        {
          question: "A fine contratto la piattaforma è nostra?",
          answer:
            "Sì. Dominio, contenuti, asset creativi e community policy sono di proprietà del cliente. La reversibilità è pianificata da subito: documentazione, credenziali e procedure di handover fanno parte del servizio, non di una trattativa d'uscita.",
        },
        {
          question: "Come misurate i risultati senza fare promozione?",
          answer:
            "Con KPI non promozionali: crescita e retention della community, engagement qualificato, ascolti e completamento delle serie, reach segmentata per pubblico, sentiment, SLA di moderazione e farmacovigilanza. Nessuna metrica legata al prodotto: la misurazione è progettata per restare dentro il perimetro istituzionale.",
        },
        {
          question: "Quanto serve per partire?",
          answer:
            "L'audit dura 4–6 settimane. Se si prosegue, la piattaforma va live indicativamente entro 90 giorni dal kickoff, con la fase di gestione continuativa attiva dal primo giorno di pubblicazione.",
        },
        {
          question: "Lavorate solo in Italia?",
          answer:
            "Il presidio principale è l'Italia, con progettazione pronta per estensioni EU: il principio unbranded è comune ai mercati europei e la piattaforma nasce multilingua, con governance locale dove serve.",
        },
      ],
      insightLink: "Il quadro normativo, in dettaglio, negli Insight",
    },
  },
  en: {
    meta: {
      title: "Enable Pharma — Compliant disease awareness as a service",
      description:
        "Unbranded disease awareness platforms and compliant patient engagement for pharma: strategy, content, community and pharmacovigilance in one service.",
    },
    hero: {
      kicker: "Disease awareness as a service — Italy · EU",
      titleLines: ["Disease awareness", "communities,", "compliant by design."],
      subtitle:
        "We build and run institutional, unbranded awareness platforms for healthcare companies. A recurring service, not a campaign: compliance enters the project as a specification, with workflows, owners and an audit trail.",
      proofPoints: [
        {
          title: "Compliance by design",
          detail: "Unbranded (Italian Medicines Code), GVP Module VI, GDPR art. 9, Farmindustria Code, AGCOM",
        },
        {
          title: "Vertical focus",
          detail: "Rare diseases, haematology and plasma, chronic conditions with long diagnostic delays",
        },
        {
          title: "One partner",
          detail: "Strategy, medically reviewed content, community, pharmacovigilance, reporting",
        },
      ],
      ctaPrimary: "Request the audit",
      ctaSecondary: "See an example project",
    },
    marquee: [
      "D.Lgs. 219/2006",
      "Art. 113",
      "GVP Module VI",
      "GDPR Art. 9",
      "Farmindustria Code",
      "EFPIA",
      "AGCOM 197/25/CONS",
      "WCAG 2.2 AA",
      "European Accessibility Act",
    ],
    problem: {
      number: "01",
      label: "The problem",
      title: "In Italy, awareness is done in campaigns. Then it goes dark.",
      points: [
        {
          title: "One-off projects, no continuity",
          body: "Awareness lives on world days and quarterly campaigns. When the budget ends, the presence disappears: a dormant site, silent channels, a community that never formed. The day after the event — nothing.",
        },
        {
          title: "Perceived risk kills projects",
          body: "Advertising prescription medicines to the public is prohibited. Social channels trigger pharmacovigilance obligations. Influencers are regulated by AGCOM. The result: digital projects die in legal review before they start.",
        },
        {
          title: "The working model never arrived",
          body: "Abroad, continuous condition communities are a mature industry with established sponsorship models. In Italy that model does not exist in an EU-compliant version — whoever translates it first owns the space.",
        },
      ],
      outcome:
        "Meanwhile people wait alone: in ankylosing spondylitis the average diagnostic delay is 7–8 years (EMAS survey), and in Italy 60% of rheumatology patients wait more than 3 years (ANMAR / CAPIRE Observatory). Over horizons that long, only continuous information can meet someone at the moment they start looking.",
    },
    solution: {
      number: "02",
      label: "The solution",
      title: "A platform you switch on. And never want to switch off.",
      intro:
        "The awareness platform as a service is a continuous asset: a condition hub, medically reviewed content, a podcast series, a moderated community. The company switches it on once; we keep it running, growing and compliant, month after month.",
      pillars: [
        {
          title: "Compliance inside the product",
          body: "Unbranded by design, integrated pharmacovigilance workflow, explicit GDPR consent, transparent relationships with patient associations. Every regulatory requirement becomes a product feature, not an attachment.",
        },
        {
          title: "Medical-scientific rigour",
          body: "Content developed under medical review, with cited sources, visible review dates and a scientific committee named for the project. Everything is prepared for the client's MLR review, with a full audit trail.",
        },
        {
          title: "End-to-end management",
          body: "From strategy to social listening: one partner, one contract. No supplier chain to coordinate, no grey areas of responsibility.",
        },
      ],
      modulesTitle: "Three modules, one path",
      modules: [
        {
          tag: "Entry",
          title: "Awareness & Compliance Audit",
          body: "The low-risk starting point: a complete picture of the condition, stakeholders and regulatory space. Fixed price, 4–6 weeks.",
          items: [
            "Condition landscape and information needs",
            "Patient association and stakeholder map",
            "National and international benchmarks",
            "Regulatory gap analysis and feasible scope",
            "Operational roadmap with investment estimate",
          ],
        },
        {
          tag: "Core · recurring",
          title: "Awareness Platform as a service",
          body: "The continuous asset: built, run and measured by us, owned by the client. Monthly retainer, multi-year contract.",
          items: [
            "Condition hub with medically reviewed content",
            "Podcast / vodcast series with scientific review",
            "Moderated social & community management",
            "Integrated pharmacovigilance (GVP Module VI)",
            "Quarterly reporting on non-promotional KPIs",
          ],
        },
        {
          tag: "Add-ons",
          title: "Extending the presence",
          body: "Additional modules once the platform is mature and governance allows.",
          items: [
            "AGCOM-compliant patient & HCP influencer programme",
            "Patient association engagement with disclosure",
            "Condition days and events",
            "AI content ops with human oversight",
            "Non-promotional social listening",
          ],
        },
      ],
    },
    process: {
      number: "03",
      label: "How we work",
      title: "Five phases, in an order that never changes.",
      intro:
        "First the regulatory scope, then the design, then the publishing. Every phase has an owner, explicit deliverables and a documented review step.",
      phases: [
        {
          index: "F1",
          title: "Discovery & Compliance Audit",
          weeks: "Weeks 1–6",
          owner: "Strategy + Regulatory",
          body: "We analyse the condition, audiences, stakeholders and regulatory constraints. The result is the feasible scope: what can be said, where, and with which safeguards.",
          deliverables: [
            "Condition and stakeholder audit",
            "Regulatory gap analysis",
            "Benchmarks and comparable cases",
            "Roadmap with approvable scope",
          ],
        },
        {
          index: "F2",
          title: "Insight & Strategy",
          weeks: "Weeks 5–8",
          owner: "Strategy",
          body: "We define the platform's positioning, content architecture, tone of voice and measurement framework. Every choice is documented for the client's internal review.",
          deliverables: [
            "Positioning and proprietary naming",
            "Content and channel architecture",
            "Non-promotional KPI framework",
          ],
        },
        {
          index: "F3",
          title: "Design & Build",
          weeks: "Weeks 7–12",
          owner: "Design + Engineering + Medical",
          body: "We build the platform and its foundational content: hub, editorial series, podcast formats. Every piece is created with sources, a review date and an MLR-ready workflow.",
          deliverables: [
            "Accessible platform (WCAG 2.2 AA)",
            "Foundational content under medical review",
            "Compliance layer: disclaimers, transparency, reporting channel",
          ],
        },
        {
          index: "F4",
          title: "Launch",
          weeks: "Weeks 12–14",
          owner: "Whole team",
          body: "A coordinated launch with the client's channels and the stakeholders involved. Moderation is active from day one, with the pharmacovigilance workflow already running.",
          deliverables: [
            "Multichannel launch plan",
            "Stakeholder and association onboarding",
            "Moderation + PV coverage live",
          ],
        },
        {
          index: "F5",
          title: "Manage & Measure",
          weeks: "Ongoing",
          owner: "Community + Medical + PV",
          body: "The phase that never ends: editorial planning, documented moderation, social listening with pharmacovigilance escalation, quarterly reporting with strategic reading.",
          deliverables: [
            "Continuous editorial plan",
            "PV workflow with documented SLAs",
            "Quarterly reporting and steering committee",
          ],
        },
      ],
      complianceLink: "How our compliance framework works",
    },
    caseTeaser: {
      number: "04",
      label: "An example project",
      title: "What do we actually build?",
      body: "An anonymised project in rare coagulation disorders: an unbranded platform, a physician-creator programme selected with a proprietary scoring matrix, a podcast series under scientific review, and a community with integrated pharmacovigilance.",
      kpis: [
        { value: 14, unit: "months", label: "of continuous presence at first renewal" },
        { value: 40, prefix: "+", suffix: "%", label: "average quarterly community growth" },
        { value: 8, unit: "episodes", label: "of podcast series under medical review" },
        { value: 100, suffix: "%", label: "PV reports handled within reporting windows" },
      ],
      kpiNote: "Illustrative figures from an example project, declared as such.",
      cta: "See the full project",
    },
    areas: {
      number: "05",
      label: "Therapeutic areas",
      title: "Where a continuous presence counts most.",
      intro:
        "We don't work everywhere. We choose areas where diagnostic delay is measured in years and where information is missing at exactly the point in the journey where it would count: before clinical suspicion, before the choice of centre.",
      list: [
        {
          title: "Rare and ultra-rare diseases",
          body: "Diagnostic journeys of five years or more, dispersed patients, little-known reference centres. The context where a continuous platform produces the most value.",
        },
        {
          title: "Haematology and plasma",
          body: "Coagulation disorders and blood diseases: small communities, very high information needs, a strong role for patient associations. Our starting vertical.",
        },
        {
          title: "Chronic and inflammatory conditions",
          body: "IBD, psoriasis, diabetes, rheumatological conditions: millions of people, fragmented journeys, daily life with the disease. Awareness here is continuous education, not a launch.",
        },
        {
          title: "Oncology",
          body: "Institutional information on prevention, early diagnosis and quality of life, with maximum rigour of sources and review. Where sensitivity is highest, compliance counts double.",
        },
      ],
      rationale:
        "The criterion never changes: high diagnostic delay + unserved information need = a strong rationale for a continuous awareness asset.",
    },
    investment: {
      number: "06",
      label: "Roadmap & investment",
      title: "Transparent about the numbers, too.",
      intro:
        "This industry runs on opaque quotes. We prefer to give an order of magnitude upfront: the audit has a fixed price, the platform a monthly retainer defined after the audit.",
      timeline: [
        {
          phase: "Audit",
          weeks: "Weeks 1–6",
          body: "Awareness & Compliance Audit: scope, benchmarks, roadmap.",
        },
        {
          phase: "Build",
          weeks: "Weeks 7–12",
          body: "Platform, foundational content, compliance framework.",
        },
        {
          phase: "Live",
          weeks: "From week 13",
          body: "Launch and continuous management: content, community, PV, reporting.",
        },
      ],
      pricingTitle: "Investment",
      tiers: [
        {
          name: "Awareness & Compliance Audit",
          price: `€${pricing.auditPriceEn}`,
          priceNote: "one-off · 4–6 weeks",
          body: "The entry product: limited risk, immediate value. The audit is usable even if the project doesn't continue with us.",
          features: [
            "Condition and stakeholder landscape",
            "Regulatory gap analysis and feasible scope",
            "National and international benchmarks",
            "Roadmap with retainer estimate",
          ],
          highlighted: false,
          cta: "Request the audit",
        },
        {
          name: "Platform as a service",
          price: `from €${pricing.platformFromEn}/month`,
          priceNote: `${pricing.platformContractMonths}-month contract`,
          body: "The core service: platform, content, community and pharmacovigilance in a single retainer. The exact scope comes out of the audit.",
          features: [
            "Hub + editorial plan under medical review",
            "Podcast / vodcast series",
            "Community management + integrated PV",
            "Quarterly reporting with steering committee",
          ],
          highlighted: true,
          cta: "Start with the audit",
        },
      ],
      transparencyNote:
        "Ranges consistent with market benchmarks for continuous healthcare services. The exact scope — channels, volumes, languages, governance — is defined by the audit: that is what it is for.",
    },
    why: {
      number: "07",
      label: "Why Enable Pharma",
      title: "Ten agencies will tell you they're compliant. We show you.",
      differentiators: [
        {
          title: "Compliance is the product",
          body: "MLR workflows, pharmacovigilance and GDPR are documented processes with owners, SLAs and audit trails: your legal team can inspect them before signing.",
        },
        {
          title: "Real experience in rare diseases",
          body: "The team comes from continuous awareness projects in rare diseases and haematology: association maps, reference centres, disclosure calendars. In the audit we show the deliverables, not client logos.",
        },
        {
          title: "Recurring model, KPIs over time",
          body: "We are not a pharma communications agency billing campaign by campaign: we build assets measured on engagement, conversation quality and continuity of presence, quarter after quarter.",
        },
      ],
      trustTitle: "Signals that matter to whoever signs",
      trustSignals: [
        "A medical-scientific committee named for each project, roles and CVs published on the platform",
        "Every piece of content with cited sources and review date",
        "Processes prepared for the client's MLR review",
        "Precise regulatory references, never generic",
        "WCAG 2.2 AA / European Accessibility Act accessibility",
      ],
      cta: "Put it to the test with an audit",
    },
    faq: {
      number: "08",
      label: "FAQ",
      title: "The questions you actually ask us.",
      items: [
        {
          question: "Is this medicinal product advertising?",
          answer:
            "No. Advertising prescription-only medicines to the public is prohibited in Italy by Legislative Decree 219/2006. Our platforms are institutional communication about the condition: art. 113 excludes from the notion of advertising any information on health and diseases with no reference, even indirect, to medicinal products. No drug names, no active ingredients, ever. The company's name and logo may appear in an institutional capacity. We map the full perimeter in [Disease awareness in Italy: what you can do](/en/insights/unbranded-disease-awareness-campaigns-italy).",
        },
        {
          question: "Who signs off the medical-scientific review?",
          answer:
            "Every piece of content is developed under medical review, with cited sources and a visible review date, overseen by the scientific committee named for the project. Your MLR process never receives drafts: it receives dossiers, each claim attached to its source, each version archived. Final approval authority stays where it belongs: in your internal process. How we design the review route is explained in [The MLR review is a process you can design](/en/insights/medical-scientific-communication-mlr-review).",
        },
        {
          question: "How do you handle an adverse event mentioned in the comments?",
          answer:
            "With a pharmacovigilance workflow aligned to GVP Module VI: monitoring of owned channels, interception of relevant mentions, escalation to qualified pharmacovigilance personnel within reporting windows, approved response templates and a complete register. The workflow is defined with your PV department before launch, not after the first case. We describe the full workflow in [Social media pharmacovigilance](/en/insights/social-media-pharmacovigilance-gvp-module-vi).",
        },
        {
          question: "What role do patient associations play?",
          answer:
            "They are partners, not channels. Engagement happens through written contracts and with the disclosure of transfers of value required by the Farmindustria Code, which implements the EFPIA Code. Transparency protects the association, the company and the credibility of the platform. The operating rules are set out in [Compliant patient engagement in Italy](/en/insights/compliant-patient-engagement-agcom-italy).",
        },
        {
          question: "Do we own the platform at the end of the contract?",
          answer:
            "Yes. Domain, content, creative assets and community policies belong to the client. Reversibility is planned from day one: documentation, credentials and handover procedures are part of the service, not an exit negotiation.",
        },
        {
          question: "How do you measure results without promotion?",
          answer:
            "With non-promotional KPIs: community growth and retention, qualified engagement, series listens and completion, reach segmented by audience, sentiment, moderation and pharmacovigilance SLAs. No product-linked metrics: measurement is designed to stay within the institutional perimeter.",
        },
        {
          question: "How long does it take to start?",
          answer:
            "The audit takes 4–6 weeks. If the project continues, the platform typically goes live within 90 days of kickoff, with continuous management active from the first day of publication.",
        },
        {
          question: "Do you only work in Italy?",
          answer:
            "Italy is the main base, with design ready for EU extensions: the unbranded principle is common across European markets and the platform is built multilingual from the start, with local governance where needed.",
        },
      ],
      insightLink: "The regulatory picture, in depth, in our Insights",
    },
  },
};
