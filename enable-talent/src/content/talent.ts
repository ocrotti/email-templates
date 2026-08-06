import type { Locale } from "@/lib/site";

interface TalentContent {
  seoTitle: string;
  seoDescription: string;
  title: string;
  intro: string;
  nairobi: {
    number: string;
    title: string;
    body: string[];
    facts: { value: string; label: string }[];
  };
  vetting: {
    number: string;
    title: string;
    intro: string;
    steps: { title: string; body: string }[];
  };
  fairPay: {
    number: string;
    title: string;
    body: string[];
    points: { title: string; body: string }[];
  };
  reputation: {
    number: string;
    title: string;
    body: string[];
  };
  faq: { q: string; a: string }[];
}

export const talent: Record<Locale, TalentContent> = {
  en: {
    seoTitle: "Nairobi Talent, Fair Pay, Real Vetting | enable.talent",
    seoDescription:
      "Why Nairobi: strong English, UTC+3 timezone, the Silicon Savannah tech ecosystem — and our explicit fair-pay policy: specialists earn 2–4x the local market rate, with career paths.",
    title: "Great talent is everywhere. Opportunity isn't.",
    intro:
      "This page exists for two reasons: to answer the quality objection with facts, and to put our fair-pay policy in writing where clients and specialists can both hold us to it.",
    nairobi: {
      number: "01",
      title: "Why Nairobi",
      body: [
        "Nairobi is called the Silicon Savannah for boring, verifiable reasons: English is an official language and the working language of business and education. The timezone is UTC+3 — one to two hours ahead of Central Europe, so pods work your day, not your night. And the tech ecosystem is real: Google, Microsoft and Safaricom operate there; iHub and Nairobi Garage anchor the startup scene; Moringa School and AkiraChix produce serious digital talent; the University of Nairobi, Strathmore and JKUAT feed the pipeline.",
        "The honest caveat from our own market analysis: Kenya's youth unemployment is severe — around 67% for ages 15–34, with over a million young people entering the labour market every year — and skill depth varies enormously. A big pool is not the same as a deep one. That's precisely why vetting and fair pay aren't nice-to-haves in this model: the best people already work remotely for international clients, and you don't get them by paying local minimums.",
      ],
      facts: [
        { value: "UTC+3", label: "Nairobi timezone — 1–2h ahead of CET" },
        { value: "EN", label: "English: official language, business default" },
        { value: "1M+", label: "young people entering Kenya's labour market yearly" },
        { value: "2–4x", label: "local market rate paid to our specialists" },
      ],
    },
    vetting: {
      number: "02",
      title: "Vetting we can defend on a client call",
      intro:
        "The top of the market moves fast — the best specialists already have international clients. Our funnel is built to find people who are excellent and looking for stability with growth, not just a gig:",
      steps: [
        { title: "Role-specific work samples", body: "Portfolio review plus a paid, realistic work-sample test per role — a campaign audit, a content brief, a build task. No trick puzzles." },
        { title: "English, written and spoken", body: "Assessed separately: report-writing quality and live conversation. Client-facing polish differs from operational fluency, and we grade both." },
        { title: "Tooling verification", body: "Certifications checked (Google, Meta, HubSpot where relevant) and hands-on tool tests in real accounts." },
        { title: "References & track record", body: "Prior remote work for international clients weighted heavily — it predicts the discipline pods need." },
        { title: "Paid trial inside the bench", body: "New specialists work on internal Enable Digital delivery first, under QA, before ever joining a client pod." },
      ],
    },
    fairPay: {
      number: "03",
      title: "Fair pay, in numbers, on purpose",
      body: [
        "The offshore industry's dirty pitch is '80% less'. It works commercially and it deserves its reputation problem: at the bottom of that discount is usually someone paid the local minimum with no path anywhere.",
        "We run the model differently, and we publish it: our specialists earn 2–4x the local Kenyan market rate, with training budgets and a defined career path toward senior and QA-adjacent roles. This is not charity — it's the mechanism that makes the whole product work:",
      ],
      points: [
        { title: "Retention is the product", body: "Pod continuity is what you're buying. People paid well above market, with a path up, stay. Turnover is where offshore delivery quietly dies." },
        { title: "Selection power", body: "Paying 2–4x local lets us hire from the top of the pool — the people who otherwise pick Upwork clients in dollars." },
        { title: "An honest answer for your clients", body: "When an end-client asks how the economics work, you have an answer that survives scrutiny: cost-of-living difference, not squeezed labour." },
        { title: "Still 40–70% below EU cost", body: "The arbitrage is real because the cost-of-living gap is real. Fair pay and major savings aren't in conflict — that's the whole point of the model." },
      ],
    },
    reputation: {
      number: "04",
      title: "On the 'low-cost outsourcing' reputation",
      body: [
        "We know what agencies picture when they hear 'offshore': briefs lost in translation, quality roulette, a partner who vanishes at the first escalation. That reputation was earned — by a model that treats people as interchangeable and quality as the client's problem.",
        "Our answer isn't a manifesto, it's structure: fair pay published on this page, vetting we'll walk any client through, senior European marketers signing off every deliverable, and guarantees that put the risk on us. If a section of this site ever reads like an excuse instead of a mechanism, hold us to it.",
      ],
    },
    faq: [
      { q: "Why Kenya and not Egypt, Nigeria or South Africa?", a: "Kenya is our hub: the combination of English, EU-aligned timezone and cost structure is the strongest. Egypt and Nigeria are on our expansion map; South Africa has a mature ecosystem and native English but materially higher salaries — we'd use it for senior premium roles, and we'll say so when we do." },
      { q: "Do specialists work from an office?", a: "Hybrid: many work from coworking hubs in Nairobi (reliable power and fibre matter), some remotely. Equipment, connectivity standards and backup power are part of our operating requirements — delivery can't depend on luck." },
      { q: "Can I meet the team before committing?", a: "Always. You meet every specialist and the QA lead before the trial starts. Real names, real faces, real portfolios — anonymised on the website, never on a call." },
      { q: "Is 2–4x local pay verifiable?", a: "We share our pay bands against local market data (Glassdoor and partner benchmarks) in the proposal. It's a contractual representation, not marketing." },
    ],
  },
  it: {
    seoTitle: "Talento di Nairobi, Fair Pay, Vetting Vero | enable.talent",
    seoDescription:
      "Perché Nairobi: inglese forte, fuso UTC+3, l'ecosistema tech della Silicon Savannah — e la nostra policy di fair pay esplicita: gli specialist guadagnano 2–4x il mercato locale, con percorsi di carriera.",
    title: "Il talento è ovunque. Le opportunità no.",
    intro:
      "Questa pagina esiste per due motivi: rispondere all'obiezione qualità con i fatti, e mettere per iscritto la nostra policy di fair pay, dove clienti e specialist possono entrambi chiedercene conto.",
    nairobi: {
      number: "01",
      title: "Perché Nairobi",
      body: [
        "Nairobi è chiamata Silicon Savannah per ragioni noiose e verificabili: l'inglese è lingua ufficiale e lingua di lavoro di business e istruzione. Il fuso è UTC+3 — una o due ore avanti sull'Europa centrale, quindi i pod lavorano nel tuo giorno, non nella tua notte. E l'ecosistema tech è reale: Google, Microsoft e Safaricom operano lì; iHub e Nairobi Garage ancorano la scena startup; Moringa School e AkiraChix producono talento digitale serio; University of Nairobi, Strathmore e JKUAT alimentano la pipeline.",
        "Il caveat onesto dalla nostra stessa analisi di mercato: la disoccupazione giovanile in Kenya è severa — circa 67% nella fascia 15–34 anni, con oltre un milione di giovani che entrano nel mercato del lavoro ogni anno — e la profondità delle skill varia enormemente. Un pool grande non è un pool profondo. Ed è esattamente per questo che vetting e fair pay non sono nice-to-have in questo modello: i migliori lavorano già da remoto per clienti internazionali, e non li prendi pagando i minimi locali.",
      ],
      facts: [
        { value: "UTC+3", label: "fuso di Nairobi — 1–2h avanti sul CET" },
        { value: "EN", label: "inglese: lingua ufficiale, default del business" },
        { value: "1M+", label: "giovani che entrano nel mercato del lavoro keniano ogni anno" },
        { value: "2–4x", label: "il mercato locale pagato ai nostri specialist" },
      ],
    },
    vetting: {
      number: "02",
      title: "Un vetting difendibile in call col cliente",
      intro:
        "Il top del mercato si muove veloce — i migliori specialist hanno già clienti internazionali. Il nostro funnel è costruito per trovare persone eccellenti che cercano stabilità con crescita, non solo un gig:",
      steps: [
        { title: "Campioni di lavoro per ruolo", body: "Review del portfolio più un test realistico e pagato per ruolo — un audit di campagna, un brief, un task di build. Niente indovinelli." },
        { title: "Inglese, scritto e parlato", body: "Valutati separatamente: qualità della scrittura di report e conversazione live. La brillantezza client-facing è diversa dalla fluenza operativa, e le misuriamo entrambe." },
        { title: "Verifica dei tool", body: "Certificazioni controllate (Google, Meta, HubSpot dove rilevanti) e test pratici in account reali." },
        { title: "Referenze e track record", body: "Il lavoro remoto precedente per clienti internazionali pesa molto — predice la disciplina che i pod richiedono." },
        { title: "Trial pagato nella bench", body: "I nuovi specialist lavorano prima sulla delivery interna di Enable Digital, sotto QA, prima di entrare in un pod cliente." },
      ],
    },
    fairPay: {
      number: "03",
      title: "Fair pay, in numeri, di proposito",
      body: [
        "Il pitch sporco dell'industria offshore è '80% in meno'. Commercialmente funziona, e si merita il suo problema di reputazione: in fondo a quello sconto di solito c'è qualcuno pagato il minimo locale senza un percorso da nessuna parte.",
        "Noi il modello lo gestiamo diversamente, e lo pubblichiamo: i nostri specialist guadagnano 2–4x il mercato keniano, con budget di formazione e un percorso di carriera definito verso ruoli senior e vicini al QA. Non è beneficenza — è il meccanismo che fa funzionare tutto il prodotto:",
      ],
      points: [
        { title: "La retention è il prodotto", body: "La continuità del pod è ciò che compri. Le persone pagate ben sopra il mercato, con un percorso di crescita, restano. Il turnover è dove la delivery offshore muore in silenzio." },
        { title: "Potere di selezione", body: "Pagare 2–4x il locale ci permette di assumere dal top del pool — le persone che altrimenti scelgono clienti Upwork in dollari." },
        { title: "Una risposta onesta per i tuoi clienti", body: "Quando un cliente finale chiede come funzionano i conti, hai una risposta che regge: differenza di costo della vita, non manodopera spremuta." },
        { title: "Comunque 40–70% sotto il costo EU", body: "L'arbitraggio è reale perché il gap di costo della vita è reale. Fair pay e grande risparmio non sono in conflitto — è esattamente il punto del modello." },
      ],
    },
    reputation: {
      number: "04",
      title: "Sulla reputazione dell''outsourcing low-cost'",
      body: [
        "Sappiamo cosa immaginano le agenzie quando sentono 'offshore': brief persi in traduzione, roulette della qualità, un partner che sparisce alla prima escalation. Quella reputazione è stata guadagnata — da un modello che tratta le persone come intercambiabili e la qualità come un problema del cliente.",
        "La nostra risposta non è un manifesto, è struttura: fair pay pubblicato in questa pagina, un vetting che presentiamo a qualsiasi cliente, marketer senior europei che firmano ogni deliverable, e garanzie che mettono il rischio su di noi. Se una sezione di questo sito dovesse mai suonare come una scusa invece che come un meccanismo, chiedicene conto.",
      ],
    },
    faq: [
      { q: "Perché il Kenya e non Egitto, Nigeria o Sudafrica?", a: "Il Kenya è il nostro hub: la combinazione di inglese, fuso allineato all'UE e struttura dei costi è la più forte. Egitto e Nigeria sono nella mappa di espansione; il Sudafrica ha un ecosistema maturo e inglese nativo ma salari materialmente più alti — lo useremmo per ruoli senior premium, e quando lo faremo lo diremo." },
      { q: "Gli specialist lavorano da un ufficio?", a: "Ibrido: molti da hub di coworking a Nairobi (corrente stabile e fibra contano), alcuni da remoto. Attrezzatura, standard di connettività e alimentazione di backup fanno parte dei nostri requisiti operativi — la delivery non può dipendere dalla fortuna." },
      { q: "Posso conoscere il team prima di impegnarmi?", a: "Sempre. Conosci ogni specialist e il QA lead prima che il trial parta. Nomi veri, facce vere, portfolio veri — anonimi sul sito, mai in call." },
      { q: "Il 2–4x sul mercato locale è verificabile?", a: "Condividiamo le nostre fasce retributive contro i dati di mercato locali (Glassdoor e benchmark di partner) nella proposta. È una dichiarazione contrattuale, non marketing." },
    ],
  },
};
