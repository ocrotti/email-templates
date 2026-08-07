import type { Locale } from "@/lib/site";

interface WhiteLabelContent {
  seoTitle: string;
  seoDescription: string;
  serviceName: string;
  breadcrumbLabel: string;
  /** Short punch line above the H1 — keeps the headline itself keyword-focused. */
  kicker: string;
  title: string;
  intro: string;
  heroPrimary: string;
  heroSecondary: string;
  requirements: {
    number: string;
    title: string;
    intro: string;
    items: { title: string; body: string }[];
    note: string;
  };
  models: {
    number: string;
    title: string;
    intro: string;
    columns: { name: string; tagline: string; points: string[] }[];
    verdict: string;
  };
  invisibility: {
    number: string;
    title: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  cost: {
    number: string;
    title: string;
    intro: string;
    points: string[];
    note: string;
    cta: string;
  };
  faqNumber: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
  closing: { title: string; body: string; primary: string; secondary: string };
}

export const whiteLabel: Record<Locale, WhiteLabelContent> = {
  en: {
    seoTitle: "White-Label Marketing Partner for Agencies | enable.talent",
    seoDescription:
      "A dedicated white-label pod for your agency: named specialists, senior European QA, GDPR paperwork, live in 10–14 days. Pay only after the 2-week trial.",
    serviceName: "White-label marketing delivery for agencies",
    breadcrumbLabel: "White-label marketing",
    kicker: "Not an order form — a pod.",
    title: "White-label marketing delivery for agencies.",
    intro:
      "You sell the strategy and you own the client. Someone still has to produce the work. A white-label pod is a named team inside your workflow — your tools, your brand, your quality bar — with senior European QA between them and your client. Live in 10–14 days, from €2,000 a month, invoiced after a two-week trial.",
    heroPrimary: "Book a call",
    heroSecondary: "See pricing",
    requirements: {
      number: "01",
      title: "What white-label actually requires of a partner",
      intro:
        "Four conditions have to hold at once. Break one and your client is usually the person who discovers it — the expensive way to find out.",
      items: [
        {
          title: "Output that clears your bar unaided",
          body: "If every deliverable needs a senior of yours to repair it, you bought a second review queue, not capacity. Our QA lead rejects work before it reaches you.",
        },
        {
          title: "Invisibility that is written down",
          body: "Being discreet is a habit; being invisible is a clause. NDAs cover your client list, your positioning and your pricing, and they outlive the engagement.",
        },
        {
          title: "Continuity that outlasts any one person",
          body: "A lone freelancer holding your client's ad account is a single point of failure. A pod has a manager, documentation and a free replacement inside 60–90 days.",
        },
        {
          title: "Economics that still leave margin",
          body: "Coordination costs your team hours. If briefing a partner eats the gap between their price and your rate, the arbitrage is theatre. Budget it, then decide.",
        },
      ],
      note: "The long-form argument is in [our guide to white-label delivery](/blog/white-label-delivery). This page is the commercial version of it.",
    },
    models: {
      number: "02",
      title: "Dedicated pod or per-service white label",
      intro:
        "Two models compete for the same budget line. They are not the same product, and one of them is not us.",
      columns: [
        {
          name: "Per-service white label",
          tagline: "You buy a defined output.",
          points: [
            "You order an SEO or PPC package, delivered to their spec.",
            "Standardised, mature, reliable — RankPay, White Shark Media and the rest have run this for years.",
            "You adapt to their process, reporting and turnaround.",
            "Their margin is incorporated in the price you quote your client.",
            "No commitment between orders: you pay per job.",
          ],
        },
        {
          name: "Dedicated pod",
          tagline: "You buy named capacity.",
          points: [
            "One to five specialists working only on your accounts, inside your process.",
            "Your project tool, your Slack, your templates, your conventions.",
            "A senior European QA lead reviews everything before it leaves the pod.",
            "A monthly seat, 30 days' notice to scale up or down.",
            "Continuity, replacement and GDPR paperwork sit inside the price.",
          ],
        },
      ],
      verdict:
        "Take the per-service shop for one-off overflow, a single service you don't want to learn, or volume you cannot predict month to month: for a spike, an order form beats a retainer. Take a pod when the same work returns every month and your process is what clients pay for. [How it works](/how-it-works) covers the pod side, and on the call we say plainly when the answer is the other one.",
    },
    invisibility: {
      number: "03",
      title: "How invisibility is actually enforced",
      intro: "White-label by default, not on request. The operational list, not the reassurance.",
      items: [
        {
          title: "No branding on what you hand over",
          body: "Deliverables, decks, audits and reports carry your identity or none at all. Nothing leaves the pod with our name on it.",
        },
        {
          title: "We live in your tools",
          body: "The pod works in your project tool, your Slack and your drive. You never log into a portal of ours to raise tickets.",
        },
        {
          title: "Contract, not goodwill",
          body: "NDA on client list, positioning and pricing; subcontracting terms binding each specialist; IP assigned to you on delivery. Full set on [the guarantee page](/guarantee).",
        },
        {
          title: "Your delivery voice, if you want one",
          body: "The QA lead can join a client call as part of your delivery team, under your brand. Other agencies keep us off every call.",
        },
        {
          title: "The people have names",
          body: "You know who works on your accounts and on which hours. Nairobi is UTC+3: the pod produces during your client's business day. Bands per role on [the roles page](/roles).",
        },
      ],
    },
    cost: {
      number: "04",
      title: "What it costs",
      intro: "One monthly number, with the delivery system inside it rather than billed around it.",
      points: [
        "Starter pod from €2,000/month: one dedicated specialist plus the management and QA layer.",
        "Full pods from €6,000/month, custom quote after a scoping call — usually three to five specialists.",
        "Included: pod management, senior European QA on every deliverable, free replacement inside 60–90 days, DPA and Standard Contractual Clauses.",
        "No setup or recruiting fees. First invoice after the two-week trial — pay only if you continue.",
        "Scale up or down with 30 days' notice.",
      ],
      note: "The full breakdown, including what the price does not buy, is on [pricing](/pricing).",
      cta: "See pricing",
    },
    faqNumber: "05",
    faqTitle: "White-label questions agencies actually ask",
    faq: [
      {
        q: "Will my client ever find out?",
        a: "Not from us. Deliverables carry no enable.talent branding, and every specialist signs an NDA covering your client list, positioning and pricing. If your client does ask — some procurement processes require it — we join the call under your brand.",
      },
      {
        q: "Who owns the accounts and the work?",
        a: "You do, or your client does. Accounts, analytics and files stay in your ownership, access is revoked within hours at offboarding, and IP is assigned to you on delivery. At exit, everything transfers within 30 days.",
      },
      {
        q: "What happens if a specialist leaves?",
        a: "The pod keeps running: a manager who knows the accounts, documentation outside one person's head, and a free replacement inside 60–90 days when performance is the reason. Continuity is a contract term, not a promise.",
      },
      {
        q: "Is GDPR covered for an EU agency?",
        a: "Yes, before work starts: a three-way DPA across you, enable.talent and each specialist, plus EU Standard Contractual Clauses for the EU–Kenya transfer. Kenya has no adequacy decision, which is why the paperwork ships with the engagement.",
      },
      {
        q: "Can the pod work inside my project management tool?",
        a: "That's the default. We adopt your tool, your board structure and your conventions rather than exporting you into ours — imposing our own process is what would make coordination expensive.",
      },
      {
        q: "What if the pod underperforms?",
        a: "You see two weeks of real deliverables before anything meaningful is owed. After that, underperformance triggers a free replacement inside 60–90 days while delivery keeps running, plus SLA remedies written into the contract.",
      },
    ],
    closing: {
      title: "Fifteen minutes, and an honest answer.",
      body: "Tell us what your delivery looks like today and which clients are straining it. If a pod is the wrong shape for your volume, we'll point you at a per-service shop instead.",
      primary: "Book a call",
      secondary: "See pricing",
    },
  },
  it: {
    seoTitle: "Servizi White Label per Agenzie Marketing | enable.talent",
    seoDescription:
      "Un pod white label per la tua agenzia: specialist con nome e cognome, QA senior europeo, GDPR incluso, operativo in 10–14 giorni. Paghi dopo il trial.",
    serviceName: "Delivery marketing in white label per agenzie",
    breadcrumbLabel: "White label per agenzie",
    kicker: "Un pod, non un modulo d'ordine.",
    title: "Delivery marketing in white label per agenzie.",
    intro:
      "La strategia la vendi tu, il cliente è tuo. Ma qualcuno il lavoro deve produrlo. Un pod in white label è un team con nome e cognome dentro il tuo workflow — i tuoi tool, il tuo brand, la tua qualità — con il QA senior europeo tra loro e il cliente. Operativo in 10–14 giorni, da €2.000 al mese, fatturato dopo il trial di due settimane.",
    heroPrimary: "Prenota una call",
    heroSecondary: "Vedi i prezzi",
    requirements: {
      number: "01",
      title: "Cosa chiede il white label a chi lo eroga",
      intro:
        "Quattro condizioni devono reggere insieme. Se ne salta una se ne accorge il cliente: il modo costoso di scoprirlo.",
      items: [
        {
          title: "Output che passa la tua asticella da solo",
          body: "Se ogni consegna ha bisogno di un tuo senior che la sistemi, hai aperto una seconda coda di review, non comprato capacità. Il QA lead lo respinge prima che arrivi a te.",
        },
        {
          title: "Invisibilità messa per iscritto",
          body: "Essere discreti è un'abitudine; essere invisibili è una clausola. Gli NDA coprono lista clienti, posizionamento e prezzi, e restano validi quando l'ingaggio finisce.",
        },
        {
          title: "Continuità che sopravvive alle persone",
          body: "Un freelance da solo con l'account pubblicitario del tuo cliente è un punto di rottura unico. Un pod ha un manager, documentazione e replacement gratuito entro 60–90 giorni.",
        },
        {
          title: "Conti che ti lasciano ancora margine",
          body: "Il coordinamento costa ore al tuo team. Se briffare un partner si mangia la differenza tra il suo prezzo e la tua tariffa, l'arbitraggio è apparenza. Mettilo a budget.",
        },
      ],
      note: "Il ragionamento in versione lunga è nella [guida alla delivery white-label](/it/blog/white-label-delivery). Questa pagina ne è la versione commerciale.",
    },
    models: {
      number: "02",
      title: "Pod dedicato o white label a servizio",
      intro:
        "Due modelli si contendono la stessa voce di budget. Non sono lo stesso prodotto, e uno dei due non siamo noi.",
      columns: [
        {
          name: "White label a servizio",
          tagline: "Compri un output definito.",
          points: [
            "Ordini un pacchetto SEO o PPC, consegnato secondo le loro specifiche.",
            "Standardizzato, maturo, affidabile: RankPay, White Shark Media e gli altri lo fanno da anni.",
            "Ti adatti al loro processo, ai loro report e ai loro tempi.",
            "Il loro margine è incorporato nel prezzo che fai al tuo cliente.",
            "Nessun impegno tra un ordine e l'altro: paghi a lavoro.",
          ],
        },
        {
          name: "Pod dedicato",
          tagline: "Compri capacità con nome e cognome.",
          points: [
            "Da uno a cinque specialist solo sui tuoi account, dentro il tuo processo.",
            "Il tuo project tool, il tuo Slack, i tuoi template, le tue convenzioni.",
            "Un QA lead senior europeo rivede tutto prima che esca dal pod.",
            "Posti mensili, con 30 giorni di preavviso per aumentare o ridurre.",
            "Continuità, replacement e pratiche GDPR stanno dentro il prezzo.",
          ],
        },
      ],
      verdict:
        "Scegli lo shop a servizio per un picco isolato, un servizio che non ti interessa imparare, o volumi che non riesci a prevedere: per un picco un modulo d'ordine batte un retainer. Scegli il pod quando lo stesso lavoro torna ogni mese ed è il tuo processo la cosa che i clienti pagano. [Come funziona](/it/how-it-works) racconta il lato pod, e in call ti diciamo quando la risposta è l'altra.",
    },
    invisibility: {
      number: "03",
      title: "Come si fa rispettare l'invisibilità",
      intro: "White label di default, non su richiesta. La lista operativa, non la rassicurazione.",
      items: [
        {
          title: "Nessun marchio su quello che consegni",
          body: "Deliverable, presentazioni, audit e report portano la tua identità o nessuna. Dal pod non esce niente con il nostro nome sopra.",
        },
        {
          title: "Viviamo nei tuoi strumenti",
          body: "Il pod lavora nel tuo project tool, nel tuo Slack e nel tuo drive. Non entri in un portale nostro per aprire ticket.",
        },
        {
          title: "Contratto, non buone intenzioni",
          body: "NDA su lista clienti, posizionamento e prezzi; termini di subappalto che vincolano ogni specialist; IP ceduta a te alla consegna. Il set completo è nella [pagina garanzia](/it/guarantee).",
        },
        {
          title: "La tua voce in delivery, se la vuoi",
          body: "Il QA lead può entrare in call con il cliente come parte del tuo team, sotto il tuo brand. Altre agenzie ci tengono fuori.",
        },
        {
          title: "Le persone hanno un nome",
          body: "Sai chi lavora sui tuoi account e in che orari. Nairobi è su UTC+3: il pod produce mentre scorre la giornata del tuo cliente. I livelli per ruolo stanno nella [pagina ruoli](/it/roles).",
        },
      ],
    },
    cost: {
      number: "04",
      title: "Quanto costa",
      intro: "Un numero solo, mensile, con dentro il sistema di delivery.",
      points: [
        "Pod starter da €2.000/mese: uno specialist dedicato più il layer di gestione e QA.",
        "Pod full da €6.000/mese, preventivo su misura dopo la call di scoping — di solito tre-cinque specialist.",
        "Inclusi: gestione del pod, QA senior europeo su ogni deliverable, replacement gratuito entro 60–90 giorni, DPA e Standard Contractual Clauses.",
        "Niente setup fee né fee di recruiting. Prima fattura dopo il trial di due settimane: paghi solo se continui.",
        "Aumenti o riduci i posti con 30 giorni di preavviso.",
      ],
      note: "Il dettaglio completo, compreso quello che il prezzo non compra, è nella pagina [prezzi](/it/pricing).",
      cta: "Vedi i prezzi",
    },
    faqNumber: "05",
    faqTitle: "Le domande che le agenzie fanno davvero sul white label",
    faq: [
      {
        q: "Il mio cliente lo scoprirà mai?",
        a: "Da noi no. I deliverable non hanno branding enable.talent e ogni specialist firma un NDA su lista clienti, posizionamento e prezzi. Se è il cliente a chiederlo, entriamo in call sotto il tuo brand.",
      },
      {
        q: "Di chi sono gli account e il lavoro?",
        a: "Tuoi, o del tuo cliente. Account, analytics e file restano di tua proprietà, gli accessi si revocano in poche ore all'offboarding, l'IP è ceduta a te alla consegna. All'uscita passa tutto entro 30 giorni.",
      },
      {
        q: "Cosa succede se uno specialist se ne va?",
        a: "Il pod continua a girare: un manager che conosce gli account, documentazione fuori dalla testa di una sola persona, e replacement gratuito entro 60–90 giorni quando il motivo è la performance.",
      },
      {
        q: "Il GDPR è coperto per un'agenzia europea?",
        a: "Sì, e prima che il lavoro inizi: DPA a tre vie tra te, enable.talent e ogni specialist, più le Standard Contractual Clauses UE per il trasferimento EU–Kenya. Il Kenya non ha una decisione di adeguatezza: è per questo che la burocrazia parte con l'ingaggio.",
      },
      {
        q: "Il pod può lavorare dentro il mio project management?",
        a: "È l'impostazione predefinita. Adottiamo il tuo tool, la tua struttura di board e le tue convenzioni invece di esportarti nelle nostre: imporre il nostro processo renderebbe costoso il coordinamento.",
      },
      {
        q: "E se il pod non rende?",
        a: "Vedi due settimane di deliverable veri prima di dover qualcosa. Poi l'underperformance attiva un replacement gratuito entro 60–90 giorni mentre la delivery continua, più i rimedi SLA scritti nel contratto.",
      },
    ],
    closing: {
      title: "Quindici minuti e una risposta onesta.",
      body: "Raccontaci com'è fatta la tua delivery oggi e quali clienti la mettono sotto pressione. Se il pod non è la forma giusta per i tuoi volumi, ti indichiamo uno shop a servizio.",
      primary: "Prenota una call",
      secondary: "Vedi i prezzi",
    },
  },
};
