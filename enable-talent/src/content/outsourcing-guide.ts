import type { Locale } from "@/lib/site";

/**
 * Pillar guide for the informational head cluster
 * ("outsource digital marketing" / "esternalizzare il marketing digitale").
 *
 * Body strings support markdown-style inline links `[label](/path)`; IT strings
 * carry their own `/it/...` hrefs, so the renderer stays locale-agnostic.
 *
 * Every third-party figure quoted here is a price the vendor publishes itself,
 * recorded in our market analysis. Nothing is estimated or invented.
 */
interface GuideContent {
  seoTitle: string;
  seoDescription: string;
  title: string;
  kicker: string;
  intro: string[];
  scope: {
    number: string;
    title: string;
    intro: string;
    outsourceTitle: string;
    outsource: { title: string; body: string }[];
    keepTitle: string;
    keep: { title: string; body: string }[];
    note: string;
  };
  models: {
    number: string;
    title: string;
    intro: string;
    labels: { what: string; cost: string; bestFor: string; breaks: string };
    items: { name: string; what: string; cost: string; bestFor: string; breaks: string }[];
    note: string;
  };
  decide: {
    number: string;
    title: string;
    intro: string;
    items: { title: string; body: string }[];
  };
  europe: {
    number: string;
    title: string;
    body: string[];
    points: { title: string; body: string }[];
  };
  geography: {
    number: string;
    title: string;
    intro: string;
    places: { place: string; clock: string; body: string }[];
  };
  checklist: {
    number: string;
    title: string;
    intro: string;
    steps: { title: string; body: string }[];
  };
  faqTitle: string;
  faq: { q: string; a: string }[];
  closing: { title: string; body: string };
}

export const outsourcingGuide: Record<Locale, GuideContent> = {
  en: {
    seoTitle: "Outsource Digital Marketing: Agency Guide | enable.talent",
    seoDescription:
      "What to outsource and what to keep, five models compared with published prices, the GDPR duties US guides skip, and a 10-step checklist.",
    title: "How to outsource digital marketing (an agency owner's guide)",
    kicker: "Pillar guide",
    intro: [
      "Conflict of interest first: we sell managed marketing pods, so we are not neutral. It is still the guide we would want you to read before talking to anyone here, us included. Every third-party number below is a published vendor price.",
      "It is written for a European agency owner: contracts carrying your name, GDPR exposure you cannot delegate, a day on CET. Most guides on this topic address a US company hiring its first offshore employee.",
    ],
    scope: {
      number: "01",
      title: "What agencies actually outsource — and what they never should",
      intro:
        "Not strategy versus execution. Scale the engine, keep the brain — the engine is repeatable production that eats hours without differentiating you.",
      outsourceTitle: "Safe to move out: the production layer",
      outsource: [
        { title: "Campaign builds", body: "Ad sets, audiences, naming, tracking, QA against your media plan." },
        { title: "On-page and technical SEO", body: "Metadata, internal links, schema, redirects, crawl fixes, content briefs." },
        { title: "Content calendars", body: "Planning, drafting and scheduling against an editorial line a senior set." },
        { title: "Design assets", body: "Ad variants, social kits, decks, resizes. High volume, tight rules." },
        { title: "Landing pages", body: "Building and iterating in your stack, from a wireframe and a copy doc." },
        { title: "Reporting", body: "Dashboards, client decks, data hygiene, the commentary draft you edit." },
      ],
      keepTitle: "Keep inside: where your differentiation lives",
      keep: [
        { title: "Strategy and positioning", body: "Why a client picked you over three cheaper agencies." },
        { title: "Senior client relationships", body: "The quarterly review, the renegotiation, the call after a bad month." },
        { title: "The thing you are known for", body: "Whatever fills your case studies. As a vendor's output, it stops being yours." },
        { title: "Judgement calls", body: "Budget shifts, crisis response, saying no. Delegate work, never accountability." },
      ],
      note:
        "Blunt test: if quality fits a checklist, the task can leave. If it depends on this client's politics, it cannot. Those production tasks map onto the seats we staff — [campaign builds](/roles/paid-media), [on-page and technical SEO](/roles/seo), [content calendars](/roles/content-social), [design assets](/roles/design), [automation flows](/roles/marketing-automation) and [landing pages](/roles/development) — and each of those [role pages](/roles) says what the seat does day to day, and what it does not.",
    },
    models: {
      number: "02",
      title: "The five models, compared honestly",
      intro: "Five ways to buy outside capacity, at published prices. We sell the fifth, and will tell you where it loses.",
      labels: { what: "What it is", cost: "What it costs", bestFor: "Right when", breaks: "Where it breaks" },
      items: [
        {
          name: "Freelance marketplaces and curated networks",
          what: "Open pools like Upwork at one end; vetted networks taking a margin at the other.",
          cost: "Toptal and Turing publish roughly $100–200/hour. In marketing: MarketerHire $5,000–20,000+/month, Right Side Up $100–200/hour, Mayple's starter around $2,565/month.",
          bestFor: "A one-off project, a scarce skill for six weeks, an audit.",
          breaks: "Retainer delivery: you keep briefing, QA and continuity, and the good ones raise rates.",
        },
        {
          name: "Offshore recruiters",
          what: "They source and vet a person — Philippines, LatAm, South Africa — and you hire and manage them. Somewhere is the reference point.",
          cost: "A one-time placement fee plus salary, with a six-month replacement guarantee at Somewhere.",
          bestFor: "You have real management capacity and want a permanent hire at a lower salary.",
          breaks: "Nobody has time to be someone's manager, and whoever leaves takes the undocumented process with them.",
        },
        {
          name: "White-label per-service agencies",
          what: "You resell another agency's SEO, paid or design under your brand — classic [white-label marketing](/white-label-marketing). How that delivery layer behaves once it is running is the subject of our [white-label delivery guide](/blog/white-label-delivery).",
          cost: "Per deliverable, or a fixed monthly package per service line.",
          bestFor: "Adding a service you do not have and will not build.",
          breaks: "Someone else prices your delivery, and you sit two layers from the work.",
        },
        {
          name: "Nearshore staffing",
          what: "Dedicated staff in a timezone near the buyer, payroll handled. Hire With Near and Floowi lead here.",
          cost: "Hire With Near quotes $2,000–4,500/month for a mid-level Latin American marketer, no upfront fee.",
          bestFor: "American agencies. If your day is New York's, the strongest option here.",
          breaks: "For a CET agency, the wrong hemisphere: their morning is your late afternoon.",
        },
        {
          name: "Managed pods",
          what: "A dedicated team sold as capacity, not headcount, with management and QA in the price. Ours runs from Nairobi, white-label by default, with senior European QA from Enable Digital, our Italian sister agency.",
          cost: "From €2,000/month, live in 10–14 days, a two-week trial you pay for only if convinced, free replacement within 60–90 days. Typical saving versus a European hire: 40–70%.",
          bestFor: "Forecastable recurring production, when you would rather buy capacity than manage people.",
          breaks: "One-off projects, a single senior specialist, strategy work, budgets under €2,000/month.",
        },
      ],
      note:
        "Every offshore site opens on a single headline percentage, and that number is the least trustworthy part of the pitch: it compares gross salaries, ignores your management hours, and averages markets that behave nothing alike. We publish 40–70% below Western employer cost and then let the [homepage calculator](/) show you the thin end of it — against a bare Italian salary the gap narrows sharply, and on content and social it disappears entirely. Your real price competition is not a European hire either: it is the LatAm and Philippine providers at $2,000–4,500/month, which is what our [pricing](/pricing) answers. See also [Somewhere](/blog/somewhere-alternatives) and [MarketerHire](/blog/marketerhire-alternatives).",
    },
    decide: {
      number: "03",
      title: "The four things that decide whether it works",
      intro: "These matter more than vendor choice. Get them right and almost any model works; skip them and all five fail.",
      items: [
        { title: "Brief discipline", body: "Output quality tracks brief quality almost one to one. Agencies that decide outsourcing does not work usually briefed verbally." },
        { title: "A QA layer that is not your senior people", body: "If your best strategist reviews pages at 8pm, you moved the cost rather than removing it. Ask who reviews, and who can stop delivery." },
        { title: "Continuity that survives one person leaving", body: "Documented processes, a bench, a named replacement window — ours is [free within 60–90 days](/guarantee)." },
        { title: "Overlap with your actual day", body: "Not \"we cover Europe\" but: which hours is this person online in CET. Mornings are when briefs change." },
      ],
    },
    europe: {
      number: "04",
      title: "What European agencies must handle that US guides skip",
      body: [
        "Your client signed with you. Under the GDPR you remain the data controller, and that liability does not move down the chain when you subcontract: fines reach €20 million or 4% of global annual turnover, whichever is higher. No vendor absorbs it for you. That does not make offshore delivery a bad idea — it makes an undocumented one a bad idea.",
      ],
      points: [
        { title: "A DPA down the whole chain", body: "Client to you, you to the vendor, vendor to whoever does the work." },
        { title: "SCCs outside the EEA", body: "Kenya has no EU adequacy decision, nor do most offshore destinations. Cover the transfer with Standard Contractual Clauses and an assessment." },
        { title: "Least-privilege access and logs", body: "Named users in every client account, no shared logins, permissions scoped to the task, activity logs on demand." },
        { title: "Honest white-label", body: "Delivery can be invisible to the end client; data processing cannot. Subprocessor transparency is not optional." },
      ],
    },
    geography: {
      number: "05",
      title: "Where the work gets done, and why it matters",
      intro:
        "A clock problem first, a language problem second, a cost problem third. Every destination below has agencies delivering good work from it; operational detail sits in our guide to [hiring an offshore marketing team](/blog/hire-offshore-marketing-team).",
      places: [
        {
          place: "Philippines and India",
          clock: "6–7h / 3–5h ahead of CET",
          body: "The category default: enormous pools, a mature outsourcing industry, English at scale. The cost for a European buyer is the clock — overnight production works, a 4pm brief change does not.",
        },
        {
          place: "Latin America",
          clock: "4–6h behind CET",
          body: "The strongest option here if you are American — the buyer nearshore providers built it for. On CET their day starts as yours ends, and your mornings run unstaffed.",
        },
        {
          place: "Eastern Europe and South Africa",
          clock: "0–1h from CET",
          body: "Closest to your calendar, strong English in South Africa, and rates that reflect both: our research puts a mid-level developer in Johannesburg near $42k a year — a mature market priced accordingly, and meaningfully above East African rates.",
        },
        {
          place: "Nairobi",
          clock: "UTC+3, 1–2h ahead of CET",
          body: "English is an official working language, and UTC+3 means the pod's day starts before yours. Google, Microsoft and Safaricom operate there; Moringa School and AkiraChix train digital talent. Honest caveat from our [talent research](/talent): the pool is large but uneven, so vetting carries it.",
        },
      ],
    },
    checklist: {
      number: "06",
      title: "A 10-step checklist for your first outsourced hire",
      intro: "Work through this before a single vendor call — it holds whether you buy from us, a competitor, or nobody.",
      steps: [
        { title: "Name the first process", body: "The one you would hand over tomorrow. A process, not a role." },
        { title: "Time it for two weeks", body: "The hours it consumes are the hours you are buying back." },
        { title: "Write the brief and the definition of done", body: "If you cannot write it, you cannot delegate it." },
        { title: "Name who signs off", body: "A person, not \"the team\", or it falls to whoever is least busy." },
        { title: "Set the budget band first", body: "Decide the monthly ceiling before the calls. Vendors anchor." },
        { title: "Shortlist three different models", body: "One marketplace, one recruiter, one managed provider." },
        { title: "Ask the uncomfortable questions", body: "Who manages daily, who reviews before my client sees it, what happens when they quit." },
        { title: "Check the paperwork before the demo", body: "DPA, SCCs, subprocessor list, access model." },
        { title: "Run a paid trial on real work", body: "Never a synthetic task — see [how our trial runs](/how-it-works)." },
        { title: "Measure at 30 days", body: "Hours recovered, deliverables shipped, revisions needed, against step two." },
      ],
    },
    faqTitle: "Questions agency owners actually ask",
    faq: [
      {
        q: "How much does it cost to outsource digital marketing?",
        a: "Three bands. Curated Western talent: $100–200/hour at Toptal and Turing, or $5,000–20,000+/month at MarketerHire. Nearshore staffing: Hire With Near quotes $2,000–4,500/month for a mid-level LatAm marketer. Managed pods: ours start at €2,000/month, management and QA included. Against a European hire the saving is typically 40–70% — if you do not rebuild it as management time.",
      },
      {
        q: "Is it GDPR-compliant to send client data outside the EU?",
        a: "Yes, with the right contract. You stay the data controller, liable up to €20 million or 4% of global turnover, so you need a DPA down the chain and Standard Contractual Clauses for transfers to a country without an adequacy decision — Kenya is one. Add least-privilege access and logs.",
      },
      {
        q: "How long before an outsourced hire is productive?",
        a: "Hiring a full-time marketer in Europe typically runs three to six months from job post to productivity. Offshore recruiters shorten the search — Somewhere presents candidates in around five days — but onboarding stays yours. A managed pod is live in 10–14 days.",
      },
      {
        q: "Will my clients know I outsource?",
        a: "Delivery is white-label by default: the pod works inside your tools, under your brand, with no direct client contact. Data processing is the exception — the answer to \"who processes our data\" must match your DPA.",
      },
      {
        q: "When is a managed pod the wrong answer?",
        a: "Four cases: a one-off project, a single senior specialist you will manage yourself, strategy work, and budgets under €2,000/month. A freelancer or an offshore recruiter serves you better in all four, and we say so on the first call.",
      },
    ],
    closing: {
      title: "Want a second opinion on your own case?",
      body: "Bring the process from step one and the hours from step two. Fifteen minutes usually settles which of the five models fits — including the ones we do not sell.",
    },
  },
  it: {
    seoTitle: "Esternalizzare il Marketing Digitale: Guida Agenzie",
    seoDescription:
      "Cosa esternalizzare e cosa tenere dentro, cinque modelli con prezzi pubblici, gli obblighi GDPR e una checklist in 10 passi per le agenzie.",
    title: "Come esternalizzare il marketing digitale: guida per agenzie",
    kicker: "Guida pillar",
    intro: [
      "Il conflitto di interessi prima di tutto: vendiamo pod marketing gestiti, quindi non siamo neutrali. Resta la guida che vorremmo leggessi prima di parlare con chiunque qui, noi compresi. Ogni cifra di terzi qui sotto è un prezzo pubblicato dal fornitore.",
      "È scritta per chi guida un'agenzia europea: contratti col tuo nome sopra, un'esposizione GDPR che non puoi delegare, una giornata sul fuso europeo. Quasi tutte le guide sul tema parlano a un'azienda americana alla prima assunzione offshore.",
    ],
    scope: {
      number: "01",
      title: "Cosa esternalizzano davvero le agenzie — e cosa non dovrebbero mai",
      intro:
        "Non è strategia contro esecuzione. Scala il motore, tieni il cervello: il motore è la produzione ripetibile, quella che mangia ore senza differenziarti.",
      outsourceTitle: "Si può spostare fuori: il livello di produzione",
      outsource: [
        { title: "Costruzione delle campagne", body: "Ad set, audience, naming, tracciamento, controlli sul tuo piano media." },
        { title: "SEO on-page e tecnica", body: "Metadati, link interni, dati strutturati, redirect, correzioni di crawling, brief." },
        { title: "Piani editoriali", body: "Pianificazione, stesura e programmazione su una linea già definita da un senior." },
        { title: "Asset creativi", body: "Varianti di annunci, kit social, presentazioni, ridimensionamenti. Volumi alti, regole strette." },
        { title: "Landing page", body: "Costruzione e iterazione nel tuo stack, da wireframe e documento di copy." },
        { title: "Reportistica", body: "Dashboard, presentazioni mensili, igiene del dato, la bozza di commento che rivedi tu." },
      ],
      keepTitle: "Resta dentro: dove vive la tua differenza",
      keep: [
        { title: "Strategia e posizionamento", body: "Il motivo per cui un cliente ha scelto te e non tre agenzie più economiche." },
        { title: "Relazioni senior con i clienti", body: "La review trimestrale, la rinegoziazione, la telefonata dopo un mese storto." },
        { title: "Quello per cui ti conoscono", body: "Ciò che riempie i tuoi case study. Come output di un fornitore smette di essere tuo." },
        { title: "Le decisioni di merito", body: "Spostare budget, gestire una crisi, dire no. Deleghi il lavoro, mai la responsabilità." },
      ],
      note:
        "Test brutale: se la qualità sta in una checklist, l'attività può uscire. Se dipende dalle dinamiche interne di quel cliente, no. Quelle attività di produzione corrispondono ai posti che copriamo — [costruzione delle campagne](/it/roles/paid-media), [SEO on-page e tecnica](/it/roles/seo), [calendari editoriali](/it/roles/content-social), [asset di design](/it/roles/design), [flussi di automation](/it/roles/marketing-automation) e [landing page](/it/roles/development) — e ognuna di quelle [pagine ruolo](/it/roles) racconta cosa fa quel posto ogni giorno, e cosa non fa.",
    },
    models: {
      number: "02",
      title: "I cinque modelli, confrontati con onestà",
      intro: "Cinque modi di comprare capacità esterna, ai prezzi pubblicati. Noi vendiamo il quinto, e ti diciamo dove perde.",
      labels: { what: "Che cos'è", cost: "Quanto costa", bestFor: "Giusto se", breaks: "Dove si rompe" },
      items: [
        {
          name: "Marketplace freelance e network selezionati",
          what: "Da un lato i bacini aperti tipo Upwork, dall'altro i network che testano i profili e trattengono un margine.",
          cost: "Toptal e Turing pubblicano circa $100–200/ora. Sul marketing: MarketerHire da $5.000 a oltre $20.000/mese, Right Side Up $100–200/ora, lo starter di Mayple intorno a $2.565/mese.",
          bestFor: "Un progetto una tantum, una competenza rara per sei settimane, un audit.",
          breaks: "Sulla delivery a retainer: briefing, controllo qualità e continuità restano a te, e i bravi alzano le tariffe.",
        },
        {
          name: "Recruiter offshore",
          what: "Trovano e testano una persona — Filippine, America Latina, Sudafrica — poi la assumi e la gestisci tu. Il riferimento è Somewhere.",
          cost: "Una fee una tantum di piazzamento più lo stipendio, con garanzia di sostituzione di sei mesi da Somewhere.",
          bestFor: "Hai vera capacità di gestione e vuoi una persona stabile a costo più basso.",
          breaks: "Nessuno ha tempo di fare il capo, e chi se ne va porta via i processi non documentati.",
        },
        {
          name: "Agenzie white-label per singolo servizio",
          what: "Rivendi sotto il tuo marchio la SEO, il paid o il design di un'altra agenzia: il classico [marketing white-label](/it/white-label-marketing). Come si comporta quel layer di delivery una volta avviato è il tema della nostra [guida alla delivery white-label](/it/blog/white-label-delivery).",
          cost: "A deliverable, o con un pacchetto mensile fisso per linea di servizio.",
          bestFor: "Aggiungere un servizio che non hai e non costruirai.",
          breaks: "Il prezzo della tua delivery lo fa un altro, e sei a due livelli da chi esegue.",
        },
        {
          name: "Staffing nearshore",
          what: "Persone dedicate in un fuso vicino al compratore, con buste paga gestite. I nomi noti sono Hire With Near e Floowi.",
          cost: "Hire With Near quota $2.000–4.500/mese per un marketer mid-level latinoamericano, senza costi anticipati.",
          bestFor: "Le agenzie americane. Se la tua giornata è quella di New York, è l'opzione più forte.",
          breaks: "Per un'agenzia europea è l'emisfero sbagliato: la loro mattina è il tuo tardo pomeriggio.",
        },
        {
          name: "Pod gestiti",
          what: "Un team dedicato venduto come capacità e non come organico, con gestione e QA incorporati nel prezzo. Il nostro lavora da Nairobi, white-label di default, con QA senior europeo di Enable Digital, la nostra agenzia sorella italiana.",
          cost: "Da €2.000/mese, operativo in 10–14 giorni, due settimane di prova che paghi solo se ti convincono, sostituzione gratuita entro 60–90 giorni. Risparmio tipico su un'assunzione europea: 40–70%.",
          bestFor: "Produzione ricorrente e prevedibile, quando preferisci comprare capacità invece di gestire persone.",
          breaks: "Progetti una tantum, un singolo specialista senior, il lavoro di strategia, budget sotto €2.000/mese.",
        },
      ],
      note:
        "Ogni sito offshore si apre su un'unica percentuale in vetrina, ed è la parte meno affidabile del discorso: confronta stipendi lordi, ignora le tue ore di gestione e fa la media di mercati che si comportano in modo diverso. Noi pubblichiamo 40–70% sotto il costo datoriale occidentale e poi lasciamo che sia il [calcolatore in home](/it) a mostrarti l'estremo più stretto: contro uno stipendio italiano lordo il divario si assottiglia parecchio, e su content e social sparisce del tutto. E il tuo vero concorrente di prezzo non è un'assunzione europea: sono i fornitori latinoamericani e filippini a $2.000–4.500/mese, ed è a loro che rispondono i nostri [prezzi](/it/pricing). Vedi anche [Somewhere](/it/blog/somewhere-alternatives) e [MarketerHire](/it/blog/marketerhire-alternatives).",
    },
    decide: {
      number: "03",
      title: "Le quattro cose che decidono se funziona",
      intro: "Contano più della scelta del fornitore. Se le metti a posto funziona quasi ogni modello; se le salti falliscono tutti e cinque.",
      items: [
        { title: "Disciplina nei brief", body: "La qualità dell'output segue quella del brief quasi uno a uno. Chi dice che l'outsourcing non funziona di solito dava i brief a voce." },
        { title: "Un QA che non siano i tuoi senior", body: "Se il tuo miglior stratega rilegge pagine alle otto di sera, hai spostato il costo, non l'hai tolto. Chiedi chi rivede e chi può fermare la consegna." },
        { title: "Continuità che sopravvive a una persona", body: "Processi documentati, una panchina, una finestra di sostituzione dichiarata — la nostra è [gratuita entro 60–90 giorni](/it/guarantee)." },
        { title: "Sovrapposizione con la tua giornata vera", body: "Non «copriamo l'Europa», ma: in che ore è online sul fuso europeo. È al mattino che i brief cambiano." },
      ],
    },
    europe: {
      number: "04",
      title: "Quello che un'agenzia europea deve gestire e le guide americane saltano",
      body: [
        "Il cliente ha firmato con te. Con il GDPR resti titolare del trattamento, e quella responsabilità non scende lungo la catena quando subappalti: le sanzioni arrivano a 20 milioni di euro o al 4% del fatturato annuo globale, a seconda di quale sia più alto. Nessun fornitore se la prende al posto tuo. Questo non rende sbagliata la delivery offshore: rende sbagliato un accordo non documentato.",
      ],
      points: [
        { title: "Un DPA su tutta la catena", body: "Dal cliente a te, da te al fornitore, dal fornitore a chi esegue." },
        { title: "SCC fuori dallo SEE", body: "Il Kenya non ha una decisione di adeguatezza europea, come quasi tutte le destinazioni offshore. Copri il trasferimento con le Standard Contractual Clauses e una valutazione." },
        { title: "Accessi minimi e log", body: "Utenti nominali su ogni account cliente, nessuna credenziale condivisa, permessi limitati al compito, log esibibili." },
        { title: "White-label onesto", body: "La delivery può essere invisibile al cliente finale, il trattamento dei dati no. La trasparenza sui sub-responsabili non è opzionale." },
      ],
    },
    geography: {
      number: "05",
      title: "Dove si lavora, e perché cambia tutto",
      intro:
        "Prima un problema di orologio, poi di lingua, poi di costo. Da ognuna escono agenzie che lavorano bene; il dettaglio operativo è nella guida per [assumere un team marketing offshore](/it/blog/hire-offshore-marketing-team).",
      places: [
        {
          place: "Filippine e India",
          clock: "6–7h / 3–5h avanti sull'Europa",
          body: "Il default della categoria: bacini enormi, industria dell'outsourcing matura, inglese su larga scala. Il costo per un compratore europeo è l'orologio — la produzione notturna funziona, un brief che cambia alle quattro no.",
        },
        {
          place: "America Latina",
          clock: "4–6h indietro sull'Europa",
          body: "L'opzione più forte se sei americano: è quel compratore che i fornitori nearshore avevano in mente. Sul fuso europeo la loro giornata inizia quando finisce la tua, e le tue mattine restano scoperte.",
        },
        {
          place: "Est Europa e Sudafrica",
          clock: "0–1h dall'Europa centrale",
          body: "I più vicini al tuo calendario, con ottimo inglese in Sudafrica e tariffe che lo riflettono: la nostra ricerca colloca uno sviluppatore mid-level a Johannesburg intorno a $42.000/anno — un mercato maturo, prezzato di conseguenza e sensibilmente sopra i livelli dell'Africa orientale.",
        },
        {
          place: "Nairobi",
          clock: "UTC+3, 1–2h avanti sull'Europa",
          body: "L'inglese è lingua ufficiale di lavoro, e UTC+3 significa che la giornata del pod inizia prima della tua. Google, Microsoft e Safaricom operano lì; Moringa School e AkiraChix formano profili digitali. Avvertenza onesta dalla nostra [ricerca sul talento](/it/talent): il bacino è ampio ma disomogeneo, ed è la selezione a reggerlo.",
        },
      ],
    },
    checklist: {
      number: "06",
      title: "Checklist in 10 passi per la prima risorsa esterna",
      intro: "Passaci sopra prima della prima call: vale che tu compri da noi, da un concorrente o da nessuno.",
      steps: [
        { title: "Dai un nome al primo processo", body: "Quello che affideresti domani. Un processo, non un ruolo." },
        { title: "Cronometralo per due settimane", body: "Le ore che consuma sono le ore che stai ricomprando." },
        { title: "Scrivi il brief e la definizione di finito", body: "Se non riesci a scriverlo, non riesci a delegarlo." },
        { title: "Indica chi approva", body: "Una persona, non «il team», o approva chi è meno occupato." },
        { title: "Fissa la fascia di budget", body: "Decidi il tetto mensile prima delle call. I fornitori ancorano." },
        { title: "Confronta tre modelli diversi", body: "Un marketplace, un recruiter, un fornitore gestito." },
        { title: "Fai le domande scomode", body: "Chi gestisce ogni giorno, chi rivede prima del mio cliente, cosa succede quando si dimette." },
        { title: "Controlla le carte prima della demo", body: "DPA, SCC, elenco dei sub-responsabili, modello di accesso." },
        { title: "Fai una prova a pagamento su lavoro vero", body: "Mai un compito a tavolino — guarda [la nostra prova](/it/how-it-works)." },
        { title: "Misura a 30 giorni", body: "Ore recuperate, deliverable consegnati, revisioni necessarie, contro il passo due." },
      ],
    },
    faqTitle: "Le domande che fanno davvero i titolari di agenzia",
    faq: [
      {
        q: "Quanto costa esternalizzare il marketing digitale?",
        a: "Tre fasce. Talento occidentale selezionato: $100–200/ora su Toptal e Turing, oppure da $5.000 a oltre $20.000/mese con MarketerHire. Staffing nearshore: Hire With Near quota $2.000–4.500/mese per un marketer mid-level latinoamericano. Pod gestiti: i nostri partono da €2.000/mese, gestione e QA inclusi. Su un'assunzione europea il risparmio è tipicamente del 40–70%, se non lo ricostruisci in ore di gestione.",
      },
      {
        q: "È conforme al GDPR mandare dati dei clienti fuori dall'Unione Europea?",
        a: "Sì, con il contratto giusto. Resti titolare del trattamento, responsabile fino a 20 milioni di euro o al 4% del fatturato globale, quindi servono un DPA lungo tutta la catena e le Standard Contractual Clauses per i trasferimenti verso paesi senza decisione di adeguatezza — il Kenya è uno. Aggiungi accessi minimi e log.",
      },
      {
        q: "Quanto serve prima che una risorsa esterna sia produttiva?",
        a: "Assumere un marketer full-time in Europa richiede tipicamente dai tre ai sei mesi tra annuncio e produttività. I recruiter offshore accorciano la ricerca — Somewhere presenta candidati in circa cinque giorni — ma l'onboarding resta tuo. Un pod gestito è operativo in 10–14 giorni.",
      },
      {
        q: "I miei clienti si accorgeranno che esternalizzo?",
        a: "La delivery è white-label per impostazione predefinita: il pod lavora dentro i tuoi strumenti, sotto il tuo marchio, senza contatto diretto con il cliente. L'eccezione è il trattamento dei dati: la risposta a «chi tratta i nostri dati» deve coincidere con il tuo DPA.",
      },
      {
        q: "Quando il pod gestito è la risposta sbagliata?",
        a: "Quattro casi: un progetto una tantum, un singolo specialista senior che gestirai tu, il lavoro di strategia e i budget sotto €2.000/mese. In tutti e quattro ti serve meglio un freelance o un recruiter offshore, e te lo diciamo alla prima call.",
      },
    ],
    closing: {
      title: "Vuoi un secondo parere sul tuo caso?",
      body: "Porta il processo del passo uno e le ore del passo due. Un quarto d'ora basta per capire quale dei cinque modelli ti serve, inclusi quelli che non vendiamo.",
    },
  },
};
