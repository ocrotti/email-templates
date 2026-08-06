import type { Locale } from "@/lib/site";

export interface ComparisonRow {
  label: string;
  inHouse: string;
  freelance: string;
  pod: string;
}

export interface CalculatorRole {
  key: string;
  label: string;
  /** Typical monthly employer cost, midpoints from the 2025 market analysis (EUR). */
  markets: { it: number; de: number; uk: number };
  /** Monthly pod price used for the comparison (EUR). */
  pod: number;
}

interface HomeContent {
  hero: {
    eyebrow: string;
    // Each array item is one line of the display title; words animate in sequence.
    titleLines: string[];
    sub: string;
    diff: string[];
    ctaPrimary: string;
    ctaSecondary: string;
    podTiles: string[];
    podQa: string;
  };
  problem: {
    number: string;
    title: string;
    intro: string;
    points: { title: string; body: string }[];
  };
  solution: {
    number: string;
    title: string;
    intro: string;
    inside: { title: string; body: string }[];
    notTitle: string;
    not: { title: string; body: string }[];
  };
  comparison: {
    number: string;
    title: string;
    intro: string;
    columns: [string, string, string, string];
    rows: ComparisonRow[];
    note: string;
  };
  calculator: {
    number: string;
    title: string;
    intro: string;
    roleLabel: string;
    marketLabel: string;
    markets: { key: "it" | "de" | "uk"; label: string }[];
    roles: CalculatorRole[];
    localLabel: string;
    podLabel: string;
    savingsLabel: string;
    perMonth: string;
    disclaimer: string;
  };
  how: {
    number: string;
    title: string;
    intro: string;
    steps: { title: string; body: string; duration: string }[];
    cta: string;
  };
  proof: {
    number: string;
    title: string;
    body: string;
    quote: string;
    quoteAuthor: string;
    stats: { value: number; suffix: string; prefix?: string; label: string }[];
    cta: string;
  };
  guarantee: {
    number: string;
    title: string;
    intro: string;
    items: { title: string; body: string }[];
    cta: string;
  };
  faq: {
    number: string;
    title: string;
    items: { q: string; a: string }[];
    cta: string;
  };
  finalCta: {
    number: string;
    title: string;
    sub: string;
  };
  marqueeLabel: string;
}

const calculatorRoles: CalculatorRole[] = [
  // Midpoints of the salary bands in the market analysis (employer cost, monthly).
  { key: "digital", label: "Digital marketing specialist", markets: { it: 2550, de: 4300, uk: 6700 }, pod: 2000 },
  { key: "paid", label: "Paid media / media buyer", markets: { it: 2250, de: 4400, uk: 5550 }, pod: 2000 },
  { key: "seo", label: "SEO specialist", markets: { it: 2400, de: 4000, uk: 4950 }, pod: 2000 },
  { key: "content", label: "Content & social", markets: { it: 1750, de: 3300, uk: 4400 }, pod: 2000 },
  { key: "dev", label: "Developer (mid-level)", markets: { it: 3500, de: 5750, uk: 7000 }, pod: 2400 },
];

export const home: Record<Locale, HomeContent> = {
  en: {
    hero: {
      eyebrow: "Managed marketing pods · Nairobi → Europe",
      titleLines: ["Scale your agency", "with dedicated,", "managed marketing pods."],
      sub: "Quality under European control. Sustainable costs. Zero hiring risk. Your invisible delivery department, live in 10–14 days.",
      diff: ["Senior European QA on every deliverable", "White-label by default", "2-week trial — pay only after"],
      ctaPrimary: "Book a call",
      ctaSecondary: "Start a 2-week trial",
      podTiles: ["Paid media", "SEO", "Content", "Design", "Automation", "Dev"],
      podQa: "Senior EU QA",
    },
    problem: {
      number: "01",
      title: "Agency margins are getting squeezed from both ends.",
      intro: "You know this already. We'll say it anyway, because the whole site is built to answer it.",
      points: [
        {
          title: "Clients want more output for the same retainer.",
          body: "Scope grows, budgets don't. Every new deliverable eats margin unless delivery gets structurally cheaper — without getting worse.",
        },
        {
          title: "Mid-level specialists in Europe are scarce and expensive.",
          body: "A digital marketing specialist costs €2,400–2,700/month in Italy, around €4,300 in Germany for paid media. When you find one, ramp-up takes months and they can leave in one.",
        },
        {
          title: "Agencies already offshore — quietly and badly.",
          body: "Freelance marketplaces, opaque subcontractors, no QA, no continuity. The work happens offshore anyway. It's just not managed, and you carry the risk.",
        },
      ],
    },
    solution: {
      number: "02",
      title: "The managed pod: a delivery unit, not a hire.",
      intro: "A pod is a dedicated team in Nairobi that works only for you, with a senior European marketer reviewing everything before it reaches your clients.",
      inside: [
        {
          title: "Dedicated specialists",
          body: "Vetted marketing specialists in the roles you need — paid media, SEO, content, design, automation, development. Dedicated to your agency, not shared.",
        },
        {
          title: "Senior European QA",
          body: "A senior marketer from Enable Digital, our Italian sister agency, reviews output, sets standards and owns quality. Your clients never see a first draft.",
        },
        {
          title: "Management included",
          body: "Briefing discipline, capacity planning, replacements, retention. We run the pod. You run your clients.",
        },
      ],
      notTitle: "What a pod is not",
      not: [
        {
          title: "Not a marketplace",
          body: "We don't send you CVs and wish you luck. You buy delivery capacity with quality control, not a list of candidates to manage yourself.",
        },
        {
          title: "Not a freelancer",
          body: "No disappearing acts, no queueing behind another client's deadline. The pod is dedicated, managed and covered by replacement guarantees.",
        },
      ],
    },
    comparison: {
      number: "03",
      title: "In-house vs freelance vs pod.",
      intro: "The honest comparison — including where a pod is not the best answer.",
      columns: ["", "In-house hire (EU)", "Freelancers", "enable.talent pod"],
      rows: [
        {
          label: "Monthly cost per specialist",
          inHouse: "€2,400–4,300+ salary, plus taxes and overhead",
          freelance: "Variable; senior EU freelancers €400–700/day",
          pod: "From €2,000 all-in, QA and management included",
        },
        {
          label: "Time to productive",
          inHouse: "3–6 months to hire, then onboarding",
          freelance: "Fast to start, slow to make consistent",
          pod: "Live in 10–14 days, onboarded by us",
        },
        {
          label: "Quality control",
          inHouse: "Yours to build and staff",
          freelance: "You review everything yourself",
          pod: "Senior European QA on every deliverable",
        },
        {
          label: "Continuity",
          inHouse: "One resignation = one crisis",
          freelance: "No obligation to stay",
          pod: "Free replacement in 60–90 days, pod keeps running",
        },
        {
          label: "Hiring risk",
          inHouse: "Full employment liability",
          freelance: "Misclassification risk is yours",
          pod: "Zero — we hold the contracts, trial before you pay",
        },
        {
          label: "White-label",
          inHouse: "N/A",
          freelance: "Depends on the person",
          pod: "By default. Your brand, our engine.",
        },
      ],
      note: "If you need one senior strategist to face your clients, hire locally — or talk to Enable Digital. Pods are for delivery capacity.",
    },
    calculator: {
      number: "04",
      title: "What does a specialist actually cost you?",
      intro: "Employer-cost bands from our 2025 market analysis (Glassdoor, PayScale, ERI samples — directional, not gospel). Compare your market with a pod specialist, management and QA included.",
      roleLabel: "Role",
      marketLabel: "Your market",
      markets: [
        { key: "it", label: "Italy" },
        { key: "de", label: "Germany" },
        { key: "uk", label: "United Kingdom" },
      ],
      roles: calculatorRoles,
      localLabel: "Typical local employer cost",
      podLabel: "Pod specialist, managed + QA",
      savingsLabel: "Typical saving",
      perMonth: "/month",
      disclaimer: "UK figures converted to EUR at ~1.17. Salary data is directional: samples are small and markets move. We'll price your exact case on the call — and the specialist behind these numbers earns 2–4x the local Nairobi market rate. Fair pay is part of the product.",
    },
    how: {
      number: "05",
      title: "Pod live in 10–14 days.",
      intro: "No months-long recruiting theatre. Four steps, then you're shipping.",
      steps: [
        { title: "Scoping call", body: "We map your delivery gap: roles, volumes, tools, tone. You get a pod proposal, not a CV pile.", duration: "Day 0" },
        { title: "Pod assembly", body: "We match vetted specialists from our Nairobi bench and assign your senior European QA lead.", duration: "Days 1–7" },
        { title: "Onboarding", body: "Your processes, your tools, your templates. The QA lead translates your standards into working checklists.", duration: "Days 7–14" },
        { title: "Trial sprint", body: "Two weeks of real deliverables at reduced risk. You pay only after the trial convinces you.", duration: "Weeks 2–4" },
      ],
      cta: "See the full process",
    },
    proof: {
      number: "06",
      title: "We run this model on ourselves first.",
      body: "Enable Digital, our Italian sister agency, is client zero: its delivery runs on the same Nairobi pod model, with the same QA layer, SLAs and reporting we sell. That's also where your senior European QA comes from — people who run agency delivery for a living, not account managers reading checklists.",
      quote: "We're judged on one thing only: whether the work ships, on time, at the quality the client signed for. The pod model exists because that's harder every year with EU-only hiring.",
      quoteAuthor: "Enable Digital — founding team, client zero",
      stats: [
        { value: 14, suffix: " days", label: "from scoping call to live pod (typical)" },
        { value: 70, suffix: "%", label: "max typical saving vs Western employer cost" },
        { value: 4, suffix: "x", prefix: "2–", label: "local market rate paid to our Nairobi specialists" },
        { value: 90, suffix: " days", label: "free replacement window" },
      ],
      cta: "Read the case study",
    },
    guarantee: {
      number: "07",
      title: "The risk is ours. In writing.",
      intro: "A new brand asking for your trust has to put more on the table than the incumbents. So we do.",
      items: [
        { title: "2-week trial", body: "Real deliverables, reduced risk. If the pod doesn't convince you, you walk away." },
        { title: "Pay after the trial", body: "First invoice only after the trial period. No upfront commitment to find out." },
        { title: "Free replacement, 60–90 days", body: "A specialist underperforms? We replace them free, and the pod keeps delivering while we do." },
        { title: "SLA + GDPR, black on white", body: "Response times, quality gates, DPA and Standard Contractual Clauses. Contract language, not landing-page language." },
      ],
      cta: "Read the full guarantee",
    },
    faq: {
      number: "08",
      title: "The questions you're actually asking.",
      items: [
        {
          q: "Is the quality really there, or am I buying cheap labour with extra steps?",
          a: "Nairobi has strong English, a deep digital ecosystem (Google, Microsoft and Safaricom all operate there) and serious training pipelines like Moringa and AkiraChix. We vet hard, pay 2–4x the local market rate to keep the best people, and put a senior European marketer between the pod and your clients. Nothing ships without QA sign-off.",
        },
        {
          q: "Will pod members join client calls? What about language and accent?",
          a: "Kenyan professionals typically speak excellent English — it's an official language and the working language of business. That said, the default model is white-label: your team faces the client, the pod delivers, and the European QA lead can join calls when you want a delivery voice in the room.",
        },
        {
          q: "What about the time zone?",
          a: "Nairobi is UTC+3 — just 1–2 hours ahead of Central Europe. Your pod works your business day, not a night shift. Standups at 9:00 CET are 10:00 or 11:00 in Nairobi.",
        },
        {
          q: "What happens if someone leaves the pod?",
          a: "Retention is our job, and fair pay makes it realistic — our specialists earn 2–4x local market rates with a career path. If someone does leave or underperforms, replacement is free within 60–90 days and the rest of the pod plus the QA lead keep delivery running during the switch.",
        },
        {
          q: "Is this GDPR-safe? My clients' data is on the line.",
          a: "Yes, by design: DPA between you, us and each specialist, Standard Contractual Clauses for the EU–Kenya transfer, access controls and encryption. Kenya has no EU adequacy decision, which is exactly why the paperwork is standard in every contract — you stay compliant as data controller.",
        },
        {
          q: "Why should a low-cost pod not embarrass my agency?",
          a: "Because it isn't low-cost labour — it's fair-paid talent with European quality control. We publish our fair-pay policy, our vetting process and our QA model. The price works because Nairobi's cost of living differs from Milan's, not because anyone is squeezed.",
        },
      ],
      cta: "More objections handled on the Guarantee page",
    },
    finalCta: {
      number: "09",
      title: "Your delivery, unblocked.",
      sub: "Tell us which roles are choking your margin. We'll come back with a pod proposal and an honest opinion.",
    },
    marqueeLabel: "Tools our pods work in every day",
  },
  it: {
    hero: {
      eyebrow: "Pod marketing gestiti · Nairobi → Europa",
      titleLines: ["Scala la tua agenzia", "con pod marketing", "dedicati e gestiti."],
      sub: "Qualità sotto controllo europeo. Costi sostenibili. Zero rischio di assunzione. Il tuo reparto delivery invisibile, operativo in 10–14 giorni.",
      diff: ["QA senior europeo su ogni deliverable", "White-label di default", "Trial di 2 settimane — paghi solo dopo"],
      ctaPrimary: "Prenota una call",
      ctaSecondary: "Inizia il trial di 2 settimane",
      podTiles: ["Paid media", "SEO", "Content", "Design", "Automation", "Dev"],
      podQa: "QA senior EU",
    },
    problem: {
      number: "01",
      title: "I margini delle agenzie sono compressi da entrambi i lati.",
      intro: "Lo sai già. Lo diciamo comunque, perché tutto il sito è costruito per rispondere a questo.",
      points: [
        {
          title: "I clienti vogliono più output allo stesso retainer.",
          body: "Lo scope cresce, i budget no. Ogni nuovo deliverable mangia margine, a meno che la delivery non diventi strutturalmente più economica — senza peggiorare.",
        },
        {
          title: "Gli specialist mid-level in Europa sono scarsi e costosi.",
          body: "Un digital marketing specialist costa €2.400–2.700/mese in Italia, circa €4.300 in Germania per il paid media. Quando lo trovi, il ramp-up richiede mesi e può dimettersi in uno.",
        },
        {
          title: "Le agenzie già offshorano — in silenzio e male.",
          body: "Marketplace di freelance, subappalti opachi, niente QA, niente continuità. Il lavoro va comunque offshore. Solo che non è gestito, e il rischio resta a te.",
        },
      ],
    },
    solution: {
      number: "02",
      title: "Il pod gestito: un'unità di delivery, non un'assunzione.",
      intro: "Un pod è un team dedicato a Nairobi che lavora solo per te, con un marketer senior europeo che rivede tutto prima che arrivi ai tuoi clienti.",
      inside: [
        {
          title: "Specialist dedicati",
          body: "Specialist di marketing selezionati nei ruoli che ti servono — paid media, SEO, content, design, automation, sviluppo. Dedicati alla tua agenzia, non condivisi.",
        },
        {
          title: "QA senior europeo",
          body: "Un marketer senior di Enable Digital, la nostra agenzia sorella italiana, rivede l'output, fissa gli standard e risponde della qualità. I tuoi clienti non vedono mai una prima bozza.",
        },
        {
          title: "Gestione inclusa",
          body: "Disciplina nei brief, capacity planning, sostituzioni, retention. Il pod lo gestiamo noi. Tu gestisci i tuoi clienti.",
        },
      ],
      notTitle: "Cosa un pod non è",
      not: [
        {
          title: "Non è un marketplace",
          body: "Non ti mandiamo CV augurandoti buona fortuna. Compri capacità di delivery con controllo qualità, non una lista di candidati da gestire da solo.",
        },
        {
          title: "Non è un freelance",
          body: "Niente sparizioni, niente code dietro la deadline di un altro cliente. Il pod è dedicato, gestito e coperto da garanzia di replacement.",
        },
      ],
    },
    comparison: {
      number: "03",
      title: "In-house vs freelance vs pod.",
      intro: "Il confronto onesto — incluso dove il pod non è la risposta migliore.",
      columns: ["", "Assunzione in-house (EU)", "Freelance", "Pod enable.talent"],
      rows: [
        {
          label: "Costo mensile per specialist",
          inHouse: "€2.400–4.300+ di stipendio, più tasse e overhead",
          freelance: "Variabile; freelance senior EU €400–700/giorno",
          pod: "Da €2.000 tutto incluso, con QA e gestione",
        },
        {
          label: "Tempo per essere produttivi",
          inHouse: "3–6 mesi per assumere, poi onboarding",
          freelance: "Veloce a partire, lento a diventare costante",
          pod: "Operativo in 10–14 giorni, onboarding a carico nostro",
        },
        {
          label: "Controllo qualità",
          inHouse: "Da costruire e presidiare in casa",
          freelance: "Rivedi tutto tu",
          pod: "QA senior europeo su ogni deliverable",
        },
        {
          label: "Continuità",
          inHouse: "Una dimissione = una crisi",
          freelance: "Nessun obbligo di restare",
          pod: "Replacement gratuito in 60–90 giorni, il pod continua a girare",
        },
        {
          label: "Rischio di assunzione",
          inHouse: "Piena responsabilità datoriale",
          freelance: "Il rischio di riqualificazione è tuo",
          pod: "Zero — i contratti li teniamo noi, trial prima di pagare",
        },
        {
          label: "White-label",
          inHouse: "N/A",
          freelance: "Dipende dalla persona",
          pod: "Di default. Il tuo brand, il nostro motore.",
        },
      ],
      note: "Se ti serve un senior strategist che parli con i tuoi clienti, assumi in locale — o parla con Enable Digital. I pod servono per la capacità di delivery.",
    },
    calculator: {
      number: "04",
      title: "Quanto ti costa davvero uno specialist?",
      intro: "Fasce di costo datoriale dalla nostra analisi di mercato 2025 (campioni Glassdoor, PayScale, ERI — direzionali, non vangelo). Confronta il tuo mercato con uno specialist in pod, gestione e QA inclusi.",
      roleLabel: "Ruolo",
      marketLabel: "Il tuo mercato",
      markets: [
        { key: "it", label: "Italia" },
        { key: "de", label: "Germania" },
        { key: "uk", label: "Regno Unito" },
      ],
      roles: calculatorRoles,
      localLabel: "Costo datoriale locale tipico",
      podLabel: "Specialist in pod, gestito + QA",
      savingsLabel: "Risparmio tipico",
      perMonth: "/mese",
      disclaimer: "Cifre UK convertite in EUR a ~1,17. I dati salariali sono direzionali: i campioni sono piccoli e i mercati si muovono. Il tuo caso esatto lo prezziamo in call — e lo specialist dietro questi numeri guadagna 2–4x il mercato locale di Nairobi. Il fair pay è parte del prodotto.",
    },
    how: {
      number: "05",
      title: "Pod operativo in 10–14 giorni.",
      intro: "Niente teatrino del recruiting lungo mesi. Quattro step, poi si consegna.",
      steps: [
        { title: "Call di scoping", body: "Mappiamo il tuo gap di delivery: ruoli, volumi, tool, tono. Ricevi una proposta di pod, non una pila di CV.", duration: "Giorno 0" },
        { title: "Composizione del pod", body: "Selezioniamo specialist già vettati dalla nostra bench di Nairobi e assegniamo il tuo QA lead senior europeo.", duration: "Giorni 1–7" },
        { title: "Onboarding", body: "I tuoi processi, i tuoi tool, i tuoi template. Il QA lead traduce i tuoi standard in checklist operative.", duration: "Giorni 7–14" },
        { title: "Sprint di trial", body: "Due settimane di deliverable veri a rischio ridotto. Paghi solo dopo che il trial ti ha convinto.", duration: "Settimane 2–4" },
      ],
      cta: "Vedi il processo completo",
    },
    proof: {
      number: "06",
      title: "Questo modello lo usiamo prima su noi stessi.",
      body: "Enable Digital, la nostra agenzia sorella italiana, è il cliente zero: la sua delivery gira sullo stesso modello di pod di Nairobi, con lo stesso layer di QA, SLA e reporting che vendiamo. Ed è da lì che arriva il tuo QA senior europeo — gente che fa delivery d'agenzia di mestiere, non account che leggono checklist.",
      quote: "Veniamo valutati su una cosa sola: se il lavoro esce, in tempo, alla qualità che il cliente ha firmato. Il modello pod esiste perché con le sole assunzioni EU questo è più difficile ogni anno.",
      quoteAuthor: "Enable Digital — team fondatore, cliente zero",
      stats: [
        { value: 14, suffix: " giorni", label: "dalla call di scoping al pod operativo (tipico)" },
        { value: 70, suffix: "%", label: "risparmio tipico massimo vs costo datoriale occidentale" },
        { value: 4, suffix: "x", prefix: "2–", label: "del mercato locale pagato ai nostri specialist di Nairobi" },
        { value: 90, suffix: " giorni", label: "finestra di replacement gratuito" },
      ],
      cta: "Leggi il caso studio",
    },
    guarantee: {
      number: "07",
      title: "Il rischio è nostro. Per iscritto.",
      intro: "Un brand nuovo che chiede fiducia deve mettere sul tavolo più degli incumbent. Quindi lo facciamo.",
      items: [
        { title: "Trial di 2 settimane", body: "Deliverable veri, rischio ridotto. Se il pod non ti convince, te ne vai." },
        { title: "Paghi dopo il trial", body: "Prima fattura solo dopo il periodo di trial. Nessun impegno anticipato per scoprirlo." },
        { title: "Replacement gratuito, 60–90 giorni", body: "Uno specialist non performa? Lo sostituiamo gratis, e il pod continua a consegnare nel frattempo." },
        { title: "SLA + GDPR, nero su bianco", body: "Tempi di risposta, quality gate, DPA e Standard Contractual Clauses. Linguaggio da contratto, non da landing page." },
      ],
      cta: "Leggi la garanzia completa",
    },
    faq: {
      number: "08",
      title: "Le domande che ti stai facendo davvero.",
      items: [
        {
          q: "La qualità c'è davvero, o sto comprando manodopera economica con passaggi in più?",
          a: "Nairobi ha un inglese forte, un ecosistema digitale profondo (Google, Microsoft e Safaricom operano lì) e pipeline di formazione serie come Moringa e AkiraChix. Selezioniamo duramente, paghiamo 2–4x il mercato locale per tenere i migliori, e mettiamo un marketer senior europeo tra il pod e i tuoi clienti. Non esce nulla senza sign-off del QA.",
        },
        {
          q: "I membri del pod partecipano alle call con i clienti? E lingua e accento?",
          a: "I professionisti keniani parlano tipicamente un inglese eccellente — è lingua ufficiale e lingua di lavoro del business. Detto questo, il modello di default è white-label: il tuo team parla col cliente, il pod consegna, e il QA lead europeo può entrare in call quando vuoi una voce di delivery nella stanza.",
        },
        {
          q: "E il fuso orario?",
          a: "Nairobi è UTC+3 — solo 1–2 ore avanti rispetto all'Europa centrale. Il pod lavora nel tuo orario di ufficio, non su un turno di notte. Lo standup delle 9:00 CET è alle 10:00 o 11:00 a Nairobi.",
        },
        {
          q: "Cosa succede se qualcuno lascia il pod?",
          a: "La retention è il nostro lavoro, e il fair pay la rende realistica — i nostri specialist guadagnano 2–4x il mercato locale, con un percorso di carriera. Se qualcuno se ne va o non performa, il replacement è gratuito entro 60–90 giorni e il resto del pod più il QA lead tengono in piedi la delivery durante il cambio.",
        },
        {
          q: "È sicuro lato GDPR? C'è in ballo il dato dei miei clienti.",
          a: "Sì, by design: DPA tra te, noi e ogni specialist, Standard Contractual Clauses per il trasferimento EU–Kenya, controlli di accesso e cifratura. Il Kenya non ha una decisione di adeguatezza UE, ed è esattamente per questo che la parte contrattuale è standard in ogni contratto — tu resti compliant come data controller.",
        },
        {
          q: "Perché un pod low-cost non dovrebbe mettere in imbarazzo la mia agenzia?",
          a: "Perché non è manodopera low-cost — è talento pagato equamente con controllo qualità europeo. Pubblichiamo la nostra policy di fair pay, il processo di vetting e il modello di QA. Il prezzo funziona perché il costo della vita di Nairobi è diverso da quello di Milano, non perché qualcuno viene spremuto.",
        },
      ],
      cta: "Altre obiezioni gestite nella pagina Garanzia",
    },
    finalCta: {
      number: "09",
      title: "La tua delivery, sbloccata.",
      sub: "Dicci quali ruoli ti stanno strozzando il margine. Torniamo con una proposta di pod e un'opinione onesta.",
    },
    marqueeLabel: "I tool in cui i nostri pod lavorano ogni giorno",
  },
};

export const marqueeItems = [
  "Google Ads",
  "Meta Ads",
  "GA4",
  "Search Console",
  "Semrush",
  "Ahrefs",
  "Figma",
  "Webflow",
  "WordPress",
  "HubSpot",
  "Klaviyo",
  "Mailchimp",
  "Looker Studio",
  "Notion",
  "Asana",
  "Slack",
  "Next.js",
  "Shopify",
];
