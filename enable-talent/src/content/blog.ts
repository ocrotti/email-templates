import type { Locale } from "@/lib/site";

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  date: string;
  author: string;
  readingTime: string;
  tag: string;
  sections: { heading?: string; paragraphs: string[]; list?: string[] }[];
}

interface BlogIndexContent {
  seoTitle: string;
  seoDescription: string;
  title: string;
  intro: string;
  readMore: string;
  backToBlog: string;
  tocTitle: string;
  ctaTitle: string;
  ctaBody: string;
}

export const blogIndex: Record<Locale, BlogIndexContent> = {
  en: {
    seoTitle: "Blog: Offshore Marketing Delivery for Agencies | enable.talent",
    seoDescription:
      "Guides and honest comparisons on offshore marketing teams, white-label delivery and scaling agency margins — written by the team running Nairobi pods for European agencies.",
    title: "Notes from the delivery engine.",
    intro:
      "Guides and comparisons for agency founders weighing offshore delivery. We name competitors, publish numbers and say when we're not the right answer — the same register as the rest of the site.",
    readMore: "Read the article",
    backToBlog: "← All articles",
    tocTitle: "In this article",
    ctaTitle: "Weighing a pod for your agency?",
    ctaBody: "A 15-minute scoping call answers more than another comparison table. Honest opinion included.",
  },
  it: {
    seoTitle: "Blog: Delivery Marketing Offshore per Agenzie | enable.talent",
    seoDescription:
      "Guide e confronti onesti su team marketing offshore, delivery white-label e margini d'agenzia — scritti dal team che gestisce pod di Nairobi per agenzie europee.",
    title: "Appunti dal motore di delivery.",
    intro:
      "Guide e confronti per founder di agenzie che valutano la delivery offshore. Nominiamo i competitor, pubblichiamo numeri e diciamo quando non siamo la risposta giusta — lo stesso registro del resto del sito.",
    readMore: "Leggi l'articolo",
    backToBlog: "← Tutti gli articoli",
    tocTitle: "In questo articolo",
    ctaTitle: "Stai valutando un pod per la tua agenzia?",
    ctaBody: "Una call di scoping da 15 minuti risponde più di un'altra tabella comparativa. Opinione onesta inclusa.",
  },
};

export const blogPosts: Record<Locale, BlogPost[]> = {
  en: [
    {
      slug: "somewhere-alternatives",
      title: "Somewhere.com alternatives for European agencies (2026)",
      seoTitle: "Somewhere.com Alternatives for European Agencies (2026) | enable.talent",
      description:
        "Somewhere is built for US SMBs hiring single offshore employees. If you're a European agency that needs managed delivery capacity, here are the real alternatives — including when Somewhere is still the right pick.",
      date: "2026-07-14",
      author: "enable.talent team",
      readingTime: "7 min",
      tag: "Alternatives",
      sections: [
        {
          paragraphs: [
            "Somewhere (formerly Support Shepherd) is one of the biggest names in offshore recruiting: 5,000+ companies served, 11,000+ hires, a candidate pool past a million, SOC 2 badges and a '6-month Perfect Hire Guarantee'. If your conclusion after reading their site was 'impressive, but this doesn't quite fit how my agency works' — this article is for you.",
            "We're a competitor with an obvious interest, so we'll argue with facts you can verify, and we'll tell you when Somewhere is genuinely the better choice.",
          ],
        },
        {
          heading: "What Somewhere actually sells",
          paragraphs: [
            "Somewhere is a recruiting service: they source and vet an offshore employee (Philippines, Latin America, South Africa, Egypt), you hire that person and manage them. The pitch is '80% less' than a US salary, and the fee is a one-time percentage of it. Their guarantee — free replacement within six months — is the strongest in the category and they've earned the scale that backs it.",
            "Note what's not in the package: management, quality assurance, continuity beyond the individual hire, or a European legal setup. You get a person, not a system. For a US SMB hiring an executive assistant or a customer-support rep, that's exactly right.",
          ],
        },
        {
          heading: "Where the model strains for European agencies",
          paragraphs: [
            "Agencies don't buy people; they buy dependable delivery. The gap shows up in four places.",
          ],
          list: [
            "Management stays with you. Every Somewhere hire is yours to brief, review, retain and — when it goes wrong — replace mid-retainer. Multiply by three hires and you've built a hidden management job.",
            "No QA layer. Nothing stands between the hire's output and your client. Your senior people become the review bottleneck, which is usually the problem you were trying to solve.",
            "US-centric setup. Contracts, compliance framing and time zones are built around American buyers. GDPR — DPA, Standard Contractual Clauses, controller liability — is your homework, and for an EU agency handling client data it's not optional homework.",
            "Single hires, not teams. Agency workload is spiky and multi-role. One great hire doesn't absorb a campaign launch that needs paid media, design and automation in the same fortnight.",
          ],
        },
        {
          heading: "The alternatives, honestly compared",
          paragraphs: [
            "Hire With Near sells nearshore LatAm talent at $2,000–4,500/month for a mid-level marketer, replacement guarantee included — strong for US agencies on US hours, less aligned with CET and with EU compliance needs.",
            "MarketerHire is a freelance marketplace for premium Western marketers at $5,000–20,000+/month — excellent for a fractional expert, expensive as permanent delivery capacity (we compare it in depth in a separate article).",
            "JobRack recruits from Eastern Europe and South Africa (EAs from $2,000/month, senior devs from $5,500) — same model as Somewhere, closer time zones, still recruiting rather than managed delivery.",
            "Toptal and Turing sell global tech talent at $100–200/hour — built for engineering, not marketing delivery.",
            "enable.talent (us) sells managed marketing pods from Nairobi: dedicated specialists plus senior European QA plus management, from €2,000/month, 2-week trial, pay after, replacement in 60–90 days, DPA and SCCs standard. We're the newest entrant in this list and the only one built specifically for European agencies.",
          ],
        },
        {
          heading: "When Somewhere is still the right call",
          paragraphs: [
            "If you're hiring one back-office role you're happy to manage yourself — an assistant, a support rep, a bookkeeper — Somewhere's scale, pool and six-month guarantee are hard to argue with. Their model is proven at a volume we can't claim.",
            "If what's actually squeezing you is delivery capacity across marketing roles, with your client's brand on every deliverable and EU data protection in scope, then a recruited individual isn't the unit you need — a managed team is. That's the gap the pod model exists to fill.",
          ],
        },
      ],
    },
    {
      slug: "marketerhire-alternatives",
      title: "MarketerHire alternatives: managed pods vs freelance marketplaces",
      seoTitle: "MarketerHire Alternatives: Pods vs Freelance Marketplaces | enable.talent",
      description:
        "MarketerHire matches you with top Western freelance marketers at $5,000–20,000+/month. Great for fractional expertise — expensive as delivery capacity. The honest comparison, with numbers.",
      date: "2026-07-02",
      author: "enable.talent team",
      readingTime: "6 min",
      tag: "Alternatives",
      sections: [
        {
          paragraphs: [
            "MarketerHire earned its reputation: a curated marketplace claiming to accept under 5% of applicants, a 2-week risk-free trial, a 95% match success rate by their own published numbers, and logos like Netflix on the homepage. For fractional senior expertise, it's arguably the category leader.",
            "The question for an agency isn't whether MarketerHire is good. It's whether a freelance marketplace is the right instrument for the job you're hiring it to do.",
          ],
        },
        {
          heading: "What you're actually buying",
          paragraphs: [
            "MarketerHire sells individual Western freelancers, typically $5,000–20,000+ per month, month-to-month. The trial and rematch mechanics de-risk the matching. What remains yours: integrating the freelancer into your workflow, reviewing their output, and absorbing the risk that a great freelancer's attention is a shared resource — you are one of their clients, not their employer.",
            "For a brand that needs a fractional CMO or a senior growth lead three days a week, this is the right shape. The marketplace's economics were designed around exactly that buyer.",
          ],
        },
        {
          heading: "Why the math breaks for agency delivery",
          paragraphs: [
            "Agencies buy delivery capacity in bulk: recurring content, always-on paid media management, a stream of landing pages and reports. Buy that through a premium freelance marketplace and three things happen.",
          ],
          list: [
            "Cost stacks linearly. Three specialist-equivalents at marketplace rates is $15,000–45,000/month — often more than the retainers they'd serve.",
            "Coordination isn't included. Freelancers don't manage each other. Your project managers inherit the glue work, and PM hours are usually your scarcest resource.",
            "White-label is fragile. A freelancer's availability, branding and client-facing behaviour are theirs, not yours. Delivery continuity across a portfolio of clients is not what the model promises.",
          ],

        },
        {
          heading: "The managed-pod alternative",
          paragraphs: [
            "A managed pod inverts the shape: instead of renting senior individuals, you get a dedicated delivery unit — specialists in Nairobi working only for your agency, a senior European marketer QA-ing every deliverable, and management (briefing discipline, capacity, replacement, retention) included in the price.",
            "The economics work because the cost-of-living gap between Nairobi and Western Europe is real: a starter pod runs from €2,000/month all-in, 40–70% below Western employer cost, while the specialists earn 2–4x their local market rate — a fair-pay policy we publish because it's the mechanism that keeps retention high.",
            "The trade-off to be honest about: a pod is delivery capacity, not fractional strategic leadership. If you need someone to own strategy in front of your client, hire that person — through MarketerHire, locally, or via our sister agency Enable Digital for the Italian market. Pods make your delivery scale; they don't replace your senior brain.",
          ],
        },
        {
          heading: "A decision rule that holds up",
          paragraphs: [
            "Buy fractional experts when the bottleneck is judgment. Buy managed pods when the bottleneck is throughput. Most growing agencies eventually need both — the mistake that burns margin is using premium-marketplace pricing to solve a throughput problem.",
          ],
        },
      ],
    },
    {
      slug: "hire-offshore-marketing-team",
      title: "How to hire an offshore marketing team without wrecking quality",
      seoTitle: "How to Hire an Offshore Marketing Team (Agency Guide 2026) | enable.talent",
      description:
        "A practical guide for agency founders: models compared (recruiting, marketplaces, managed pods), real cost bands, the GDPR checklist, and the five failure modes that kill offshore delivery.",
      date: "2026-06-18",
      author: "enable.talent team",
      readingTime: "9 min",
      tag: "Guide",
      sections: [
        {
          paragraphs: [
            "Most agencies that offshore don't announce it — a Hire With Near interviewee put it plainly: most agencies they'd worked with in recent years were offshoring talent while raising their prices. The work already moves offshore. The difference between the agencies it helps and the agencies it embarrasses is structure.",
            "This guide is the checklist we wish existed when we built our own offshore delivery — models, costs, compliance and the failure modes nobody puts on their landing page.",
          ],
        },
        {
          heading: "Step 1: Pick the model, not the country",
          paragraphs: [
            "Three models dominate, and they fail differently.",
          ],
          list: [
            "Recruiting services (Somewhere, JobRack): they find, you manage. Cheapest per head, all delivery risk stays with you. Right when you have management capacity to spare.",
            "Freelance marketplaces (MarketerHire, Toptal, Growth Collective): fast access to senior individuals, premium rates, shared attention. Right for fractional expertise, wrong for bulk throughput.",
            "Managed pods (us, and the model this guide argues for): dedicated team + QA + management as one service. Higher floor price than a single cheap hire, dramatically lower total cost of quality.",
          ],
        },
        {
          heading: "Step 2: Use real cost bands, not vibes",
          paragraphs: [
            "Employer-cost benchmarks from our 2025 market analysis (directional — samples are small): a digital marketing specialist runs €2,400–2,700/month in Italy, ~€4,300 in Germany for paid media, ~£5,740 in the UK for social. LatAm nearshore providers sell mid-level marketers to US buyers at $2,000–4,500/month. A managed Nairobi pod starts at €2,000/month including QA and management, with specialists paid 2–4x their local market.",
            "The comparison that matters isn't offshore-vs-local salary — it's offshore-with-structure vs offshore-without. The salary delta is easy; the quality delta is where the money actually is.",
          ],
        },
        {
          heading: "Step 3: The GDPR checklist you can't skip",
          paragraphs: [
            "If offshore specialists touch EU end-customer data, you remain the data controller — liable up to €20M or 4% of global turnover. Non-negotiables before the first login:",
          ],
          list: [
            "A DPA chain covering every party that processes data — agency → provider → each individual specialist.",
            "Standard Contractual Clauses for transfers to countries without an EU adequacy decision (Kenya, the Philippines and most offshore hubs included).",
            "Technical measures: least-privilege access, encrypted devices, revocation procedures measured in hours.",
            "Data minimisation: most marketing delivery needs accounts and assets, not databases of personal data. Scope access accordingly.",
          ],
        },
        {
          heading: "Step 4: Know the five failure modes",
          paragraphs: [
            "Offshore delivery rarely fails loudly. It decays through predictable mechanisms:",
          ],
          list: [
            "No QA gate — the first sub-par deliverable reaches your client with your logo on it, and trust never fully recovers.",
            "Brief entropy — quality tracks briefing discipline almost one-to-one; without templates, output drifts.",
            "Turnover — underpaid specialists leave for the next dollar gig, taking three months of context. Fair pay is retention infrastructure, not ethics theatre.",
            "Timezone drag — a 6–10 hour offset turns every revision into a 24-hour cycle. Nairobi at CET+1/2 removes this variable entirely for European buyers.",
            "Invisible management debt — 'we saved 60% on salaries' quietly becomes 'our PM spends half her week coordinating offshore work'. Count that cost before, not after.",
          ],
        },
        {
          heading: "Step 5: Run a real trial",
          paragraphs: [
            "Whatever model you pick, demand a paid-only-if-satisfied trial with defined deliverables and evaluation criteria you write down in advance. The market standard exists: 2-week trials, replacement guarantees of 30–120 days, pay-after mechanics. A provider that won't structure a trial this way is telling you something — listen.",
          ],
        },
      ],
    },
    {
      slug: "white-label-delivery",
      title: "White-label delivery: how agencies scale without hiring",
      seoTitle: "White-Label Marketing Delivery for Agencies | enable.talent",
      description:
        "White-label delivery lets agencies sell more than they can staff — if the invisible partner is actually reliable. How the model works, where it breaks, and the contractual details that keep it invisible.",
      date: "2026-06-05",
      author: "enable.talent team",
      readingTime: "6 min",
      tag: "Guide",
      sections: [
        {
          paragraphs: [
            "Every agency hits the same wall: the pipeline grows faster than the team can. Hiring is slow and risky; declining work kills momentum; burning out the existing team kills quality. White-label delivery — an external team producing under your brand — is the standard escape hatch, and it has a standard set of ways to go wrong.",
          ],
        },
        {
          heading: "What white-label actually requires",
          paragraphs: [
            "The promise is simple: your client sees your brand, your account team and your quality bar — the production happens elsewhere. For that to hold, four things must be true simultaneously: the output must match your standards without your review becoming the bottleneck; the partner must be invisible contractually and operationally; continuity must survive any individual leaving; and the economics must leave margin after the coordination cost.",
            "Most white-label failures are a violation of exactly one of these — usually discovered by a client, which is the expensive way.",
          ],
        },
        {
          heading: "The three flavours on the market",
          paragraphs: [],
          list: [
            "White-label agencies (established category: white-label SEO and PPC shops): productised, reliable, but you adapt to their process and their margins are baked into your price.",
            "Freelancer benches: flexible and cheap to start, but invisible-partner discipline (NDAs, branding, availability) depends on each individual — fragile at portfolio scale.",
            "Managed pods: a dedicated offshore team under your workflow with a QA layer on top. Newer as a category; the one built to make 'your invisible delivery department' literal.",
          ],
        },
        {
          heading: "The contractual fine print that keeps you invisible",
          paragraphs: [
            "White-label lives or dies in the contract, not the pitch deck. The clauses that matter: NDAs covering your client list, positioning and pricing, surviving the engagement; IP assignment from every individual who touches the work; defined SLAs with remedies (a missed deadline you absorb in front of your client needs to cost your partner something); replacement guarantees with continuity commitments; and a clean-exit clause — assets and documentation handed over within a defined window.",
            "Our version of these terms is on the guarantee page, in plain language. Whoever you pick as an invisible partner, hold them to that standard in writing.",
          ],
        },
        {
          heading: "When not to white-label",
          paragraphs: [
            "Strategy, senior client relationships and anything where your differentiation actually lives should stay in-house — outsourcing your core is how agencies commoditise themselves. White-label works for the production layer: the campaigns, assets, pages and reports where quality is definable and volume is the problem. Scale the engine, keep the brain.",
          ],
        },
      ],
    },
  ],
  it: [
    {
      slug: "somewhere-alternatives",
      title: "Alternative a Somewhere.com per agenzie europee (2026)",
      seoTitle: "Alternative a Somewhere.com per Agenzie Europee (2026) | enable.talent",
      description:
        "Somewhere è costruito per PMI USA che assumono singoli dipendenti offshore. Se sei un'agenzia europea che cerca capacità di delivery gestita, ecco le alternative vere — incluso quando Somewhere resta la scelta giusta.",
      date: "2026-07-14",
      author: "team enable.talent",
      readingTime: "7 min",
      tag: "Alternative",
      sections: [
        {
          paragraphs: [
            "Somewhere (ex Support Shepherd) è uno dei nomi più grandi del recruiting offshore: 5.000+ aziende servite, 11.000+ assunzioni, un pool candidati oltre il milione, badge SOC 2 e una '6-month Perfect Hire Guarantee'. Se dopo aver letto il loro sito la tua conclusione è stata 'impressionante, ma non è esattamente come lavora la mia agenzia' — questo articolo è per te.",
            "Siamo un competitor con un interesse evidente, quindi argomentiamo con fatti verificabili — e ti diciamo quando Somewhere è davvero la scelta migliore.",
          ],
        },
        {
          heading: "Cosa vende davvero Somewhere",
          paragraphs: [
            "Somewhere è un servizio di recruiting: trovano e vettano un dipendente offshore (Filippine, America Latina, Sudafrica, Egitto), tu lo assumi e lo gestisci. Il pitch è '80% in meno' di uno stipendio USA, e la fee è una percentuale una tantum. La loro garanzia — replacement gratuito entro sei mesi — è la più forte della categoria, e la scala che la sostiene se la sono guadagnata.",
            "Nota cosa non c'è nel pacchetto: gestione, quality assurance, continuità oltre il singolo hire, o un setup legale europeo. Ricevi una persona, non un sistema. Per una PMI USA che assume un'executive assistant o un customer support, è esattamente la cosa giusta.",
          ],
        },
        {
          heading: "Dove il modello scricchiola per le agenzie europee",
          paragraphs: ["Le agenzie non comprano persone; comprano delivery affidabile. Il gap emerge in quattro punti."],
          list: [
            "La gestione resta a te. Ogni hire Somewhere è tuo da briffare, rivedere, trattenere e — quando va male — sostituire a metà retainer. Moltiplica per tre hire e hai costruito un lavoro di management nascosto.",
            "Nessun layer di QA. Niente si frappone tra l'output dell'hire e il tuo cliente. I tuoi senior diventano il collo di bottiglia delle review — che di solito era il problema che volevi risolvere.",
            "Setup USA-centrico. Contratti, compliance e fusi orari costruiti intorno al buyer americano. Il GDPR — DPA, Standard Contractual Clauses, responsabilità del controller — è compito tuo, e per un'agenzia UE che tratta dati clienti non è un compito opzionale.",
            "Hire singoli, non team. Il carico d'agenzia è a picchi e multi-ruolo. Un ottimo hire non assorbe un lancio che richiede paid media, design e automation nella stessa quindicina.",
          ],
        },
        {
          heading: "Le alternative, confrontate onestamente",
          paragraphs: [
            "Hire With Near vende talento nearshore LatAm a $2.000–4.500/mese per un marketer mid-level, garanzia di replacement inclusa — forte per agenzie USA su orari USA, meno allineato al CET e ai bisogni di compliance UE.",
            "MarketerHire è un marketplace freelance di marketer occidentali premium a $5.000–20.000+/mese — eccellente per un esperto fractional, costoso come capacità di delivery permanente (lo confrontiamo in dettaglio in un articolo dedicato).",
            "JobRack recluta da Est Europa e Sudafrica (EA da $2.000/mese, dev senior da $5.500) — stesso modello di Somewhere, fusi più vicini, ma sempre recruiting, non delivery gestita.",
            "Toptal e Turing vendono talento tech globale a $100–200/ora — costruiti per l'engineering, non per la delivery marketing.",
            "enable.talent (noi) vende pod marketing gestiti da Nairobi: specialist dedicati più QA senior europeo più gestione, da €2.000/mese, trial di 2 settimane, pagamento dopo, replacement in 60–90 giorni, DPA e SCC standard. Siamo l'entrante più nuovo di questa lista e l'unico costruito specificamente per le agenzie europee.",
          ],
        },
        {
          heading: "Quando Somewhere resta la scelta giusta",
          paragraphs: [
            "Se stai assumendo un singolo ruolo di back-office che sei felice di gestire in autonomia — un'assistant, un support, un bookkeeper — la scala di Somewhere, il pool e la garanzia di sei mesi sono difficili da battere. Il loro modello è provato a un volume che noi non possiamo rivendicare.",
            "Se ciò che ti stringe davvero è la capacità di delivery su ruoli marketing, con il brand del tuo cliente su ogni deliverable e la protezione dei dati UE in scope, allora l'unità che ti serve non è un individuo reclutato — è un team gestito. È il gap che il modello pod esiste per riempire.",
          ],
        },
      ],
    },
    {
      slug: "marketerhire-alternatives",
      title: "Alternative a MarketerHire: pod gestiti vs marketplace freelance",
      seoTitle: "Alternative a MarketerHire: Pod vs Marketplace Freelance | enable.talent",
      description:
        "MarketerHire ti abbina a marketer freelance occidentali di alto livello a $5.000–20.000+/mese. Ottimo per expertise fractional — costoso come capacità di delivery. Il confronto onesto, con i numeri.",
      date: "2026-07-02",
      author: "team enable.talent",
      readingTime: "6 min",
      tag: "Alternative",
      sections: [
        {
          paragraphs: [
            "MarketerHire si è guadagnato la reputazione: un marketplace curato che dichiara di accettare meno del 5% dei candidati, un trial risk-free di 2 settimane, un 95% di match riusciti secondo i loro numeri pubblicati, e loghi come Netflix in homepage. Per expertise senior fractional è probabilmente il leader di categoria.",
            "La domanda per un'agenzia non è se MarketerHire sia bravo. È se un marketplace freelance sia lo strumento giusto per il lavoro per cui lo stai ingaggiando.",
          ],
        },
        {
          heading: "Cosa stai comprando davvero",
          paragraphs: [
            "MarketerHire vende singoli freelance occidentali, tipicamente $5.000–20.000+ al mese, month-to-month. Trial e rematch riducono il rischio del matching. Quello che resta a te: integrare il freelance nel tuo workflow, rivedere il suo output, e assorbire il rischio che l'attenzione di un grande freelance sia una risorsa condivisa — sei uno dei suoi clienti, non il suo datore di lavoro.",
            "Per un brand che ha bisogno di un CMO fractional o di un senior growth lead tre giorni a settimana, è la forma giusta. L'economia del marketplace è disegnata esattamente su quel buyer.",
          ],
        },
        {
          heading: "Perché i conti non tornano per la delivery d'agenzia",
          paragraphs: ["Le agenzie comprano capacità di delivery all'ingrosso: content ricorrente, gestione paid media always-on, un flusso di landing e report. Compra tutto questo a tariffe da marketplace premium e succedono tre cose."],
          list: [
            "Il costo si somma linearmente. Tre specialist-equivalenti a tariffe marketplace sono $15.000–45.000/mese — spesso più dei retainer che dovrebbero servire.",
            "Il coordinamento non è incluso. I freelance non si gestiscono a vicenda. I tuoi PM ereditano il lavoro di collante, e le ore PM sono di solito la tua risorsa più scarsa.",
            "Il white-label è fragile. Disponibilità, branding e comportamento client-facing di un freelance sono suoi, non tuoi. La continuità su un portafoglio di clienti non è ciò che il modello promette.",
          ],
        },
        {
          heading: "L'alternativa del pod gestito",
          paragraphs: [
            "Un pod gestito inverte la forma: invece di affittare individui senior, hai un'unità di delivery dedicata — specialist a Nairobi che lavorano solo per la tua agenzia, un marketer senior europeo che fa QA su ogni deliverable, e la gestione (disciplina dei brief, capacità, replacement, retention) inclusa nel prezzo.",
            "L'economia funziona perché il gap di costo della vita tra Nairobi e l'Europa occidentale è reale: un pod starter parte da €2.000/mese tutto incluso, 40–70% sotto il costo datoriale occidentale, mentre gli specialist guadagnano 2–4x il loro mercato locale — una policy di fair pay che pubblichiamo perché è il meccanismo che tiene alta la retention.",
            "Il trade-off da dichiarare: un pod è capacità di delivery, non leadership strategica fractional. Se ti serve qualcuno che possieda la strategia davanti al tuo cliente, assumi quella persona — via MarketerHire, in locale, o tramite la nostra agenzia sorella Enable Digital per il mercato italiano. I pod scalano la tua delivery; non sostituiscono il tuo cervello senior.",
          ],
        },
        {
          heading: "Una regola di decisione che regge",
          paragraphs: [
            "Compra esperti fractional quando il collo di bottiglia è il giudizio. Compra pod gestiti quando il collo di bottiglia è il throughput. La maggior parte delle agenzie in crescita prima o poi ha bisogno di entrambi — l'errore che brucia margine è usare prezzi da marketplace premium per risolvere un problema di throughput.",
          ],
        },
      ],
    },
    {
      slug: "hire-offshore-marketing-team",
      title: "Come assumere un team marketing offshore senza distruggere la qualità",
      seoTitle: "Come Assumere un Team Marketing Offshore (Guida 2026) | enable.talent",
      description:
        "Guida pratica per founder di agenzie: modelli a confronto (recruiting, marketplace, pod gestiti), fasce di costo reali, la checklist GDPR e le cinque modalità di fallimento che uccidono la delivery offshore.",
      date: "2026-06-18",
      author: "team enable.talent",
      readingTime: "9 min",
      tag: "Guida",
      sections: [
        {
          paragraphs: [
            "La maggior parte delle agenzie che offshora non lo annuncia — un intervistato di Hire With Near l'ha detto chiaramente: quasi tutte le agenzie con cui aveva lavorato negli ultimi anni stavano offshorando il talento alzando al contempo i prezzi. Il lavoro va già offshore. La differenza tra le agenzie che ne beneficiano e quelle che ne vengono imbarazzate è la struttura.",
            "Questa guida è la checklist che avremmo voluto quando abbiamo costruito la nostra delivery offshore — modelli, costi, compliance e le modalità di fallimento che nessuno mette in landing page.",
          ],
        },
        {
          heading: "Step 1: Scegli il modello, non il paese",
          paragraphs: ["Tre modelli dominano, e falliscono in modo diverso."],
          list: [
            "Servizi di recruiting (Somewhere, JobRack): loro trovano, tu gestisci. Il più economico per testa, tutto il rischio di delivery resta a te. Giusto quando hai capacità di management in eccesso.",
            "Marketplace freelance (MarketerHire, Toptal, Growth Collective): accesso rapido a individui senior, tariffe premium, attenzione condivisa. Giusto per expertise fractional, sbagliato per il throughput di massa.",
            "Pod gestiti (noi, e il modello per cui questa guida argomenta): team dedicato + QA + gestione come unico servizio. Prezzo d'ingresso più alto di un singolo hire economico, costo totale della qualità drammaticamente più basso.",
          ],
        },
        {
          heading: "Step 2: Usa fasce di costo reali, non sensazioni",
          paragraphs: [
            "Benchmark di costo datoriale dalla nostra analisi 2025 (direzionali — i campioni sono piccoli): un digital marketing specialist costa €2.400–2.700/mese in Italia, ~€4.300 in Germania per il paid media, ~£5.740 nel Regno Unito per il social. I provider nearshore LatAm vendono marketer mid-level ai buyer USA a $2.000–4.500/mese. Un pod gestito di Nairobi parte da €2.000/mese inclusi QA e gestione, con specialist pagati 2–4x il loro mercato locale.",
            "Il confronto che conta non è offshore-vs-stipendio-locale — è offshore-con-struttura vs offshore-senza. Il delta salariale è facile; il delta di qualità è dove stanno davvero i soldi.",
          ],
        },
        {
          heading: "Step 3: La checklist GDPR che non puoi saltare",
          paragraphs: [
            "Se specialist offshore toccano dati di clienti finali UE, il data controller resti tu — con responsabilità fino a €20M o al 4% del fatturato globale. I non-negoziabili prima del primo login:",
          ],
          list: [
            "Una catena di DPA che copra ogni parte che tratta dati — agenzia → provider → ogni singolo specialist.",
            "Standard Contractual Clauses per i trasferimenti verso paesi senza decisione di adeguatezza UE (Kenya, Filippine e quasi tutti gli hub offshore inclusi).",
            "Misure tecniche: accessi least-privilege, device cifrati, procedure di revoca misurate in ore.",
            "Minimizzazione: la maggior parte della delivery marketing richiede account e asset, non database di dati personali. Dimensiona gli accessi di conseguenza.",
          ],
        },
        {
          heading: "Step 4: Conosci le cinque modalità di fallimento",
          paragraphs: ["La delivery offshore raramente fallisce in modo rumoroso. Decade attraverso meccanismi prevedibili:"],
          list: [
            "Nessun gate di QA — il primo deliverable sotto standard arriva al tuo cliente con il tuo logo sopra, e la fiducia non recupera mai del tutto.",
            "Entropia dei brief — la qualità segue la disciplina dei brief quasi uno-a-uno; senza template, l'output deriva.",
            "Turnover — gli specialist sottopagati se ne vanno al prossimo gig in dollari, portandosi via tre mesi di contesto. Il fair pay è infrastruttura di retention, non teatro etico.",
            "Attrito di fuso — un offset di 6–10 ore trasforma ogni revisione in un ciclo di 24 ore. Nairobi a CET+1/2 elimina questa variabile per i buyer europei.",
            "Debito di gestione invisibile — 'abbiamo risparmiato il 60% sugli stipendi' diventa in silenzio 'la nostra PM passa metà settimana a coordinare il lavoro offshore'. Conta quel costo prima, non dopo.",
          ],
        },
        {
          heading: "Step 5: Fai un trial vero",
          paragraphs: [
            "Qualunque modello tu scelga, pretendi un trial paghi-solo-se-soddisfatto con deliverable definiti e criteri di valutazione scritti in anticipo. Lo standard di mercato esiste: trial di 2 settimane, garanzie di replacement di 30–120 giorni, meccaniche pay-after. Un provider che non struttura il trial così ti sta dicendo qualcosa — ascoltalo.",
          ],
        },
      ],
    },
    {
      slug: "white-label-delivery",
      title: "Delivery white-label: come le agenzie scalano senza assumere",
      seoTitle: "Delivery Marketing White-Label per Agenzie | enable.talent",
      description:
        "La delivery white-label permette alle agenzie di vendere più di quanto possano staffare — se il partner invisibile è davvero affidabile. Come funziona il modello, dove si rompe, e i dettagli contrattuali che lo tengono invisibile.",
      date: "2026-06-05",
      author: "team enable.talent",
      readingTime: "6 min",
      tag: "Guida",
      sections: [
        {
          paragraphs: [
            "Ogni agenzia sbatte contro lo stesso muro: la pipeline cresce più in fretta del team. Assumere è lento e rischioso; rifiutare lavoro uccide lo slancio; bruciare il team esistente uccide la qualità. La delivery white-label — un team esterno che produce sotto il tuo brand — è la via d'uscita standard, e ha un set standard di modi per andare male.",
          ],
        },
        {
          heading: "Cosa richiede davvero il white-label",
          paragraphs: [
            "La promessa è semplice: il tuo cliente vede il tuo brand, il tuo account team e la tua asticella di qualità — la produzione avviene altrove. Perché regga, quattro cose devono essere vere insieme: l'output deve rispettare i tuoi standard senza che la tua review diventi il collo di bottiglia; il partner deve essere invisibile contrattualmente e operativamente; la continuità deve sopravvivere all'uscita di qualsiasi individuo; e l'economia deve lasciare margine dopo il costo di coordinamento.",
            "La maggior parte dei fallimenti white-label è la violazione di esattamente una di queste — di solito scoperta da un cliente, che è il modo costoso.",
          ],
        },
        {
          heading: "I tre formati sul mercato",
          paragraphs: [],
          list: [
            "Agenzie white-label (categoria matura: shop white-label SEO e PPC): prodotto standardizzato, affidabile, ma ti adatti al loro processo e i loro margini sono cotti dentro il tuo prezzo.",
            "Bench di freelance: flessibile ed economica all'inizio, ma la disciplina da partner invisibile (NDA, branding, disponibilità) dipende da ogni individuo — fragile a scala di portafoglio.",
            "Pod gestiti: un team offshore dedicato dentro il tuo workflow con un layer di QA sopra. Categoria più giovane; quella costruita per rendere letterale 'il tuo reparto delivery invisibile'.",
          ],
        },
        {
          heading: "Le clausole che ti tengono invisibile",
          paragraphs: [
            "Il white-label vive o muore nel contratto, non nel pitch deck. Le clausole che contano: NDA su lista clienti, posizionamento e prezzi, che sopravvivono all'ingaggio; cessione IP da ogni individuo che tocca il lavoro; SLA definiti con rimedi (una deadline mancata che assorbi tu davanti al cliente deve costare qualcosa al partner); garanzie di replacement con impegni di continuità; e una clausola di uscita pulita — asset e documentazione consegnati entro una finestra definita.",
            "La nostra versione di questi termini è nella pagina garanzia, in linguaggio semplice. Chiunque tu scelga come partner invisibile, tienilo a quello standard per iscritto.",
          ],
        },
        {
          heading: "Quando non fare white-label",
          paragraphs: [
            "Strategia, relazioni senior con i clienti e tutto ciò in cui vive davvero la tua differenziazione devono restare in casa — esternalizzare il proprio core è il modo in cui le agenzie si commoditizzano. Il white-label funziona per il layer di produzione: campagne, asset, pagine e report dove la qualità è definibile e il volume è il problema. Scala il motore, tieni il cervello.",
          ],
        },
      ],
    },
  ],
};
