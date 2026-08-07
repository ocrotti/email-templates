import type { Dict, SeoMeta } from "./types";

interface CompliancePillar {
  ref: string;
  title: string;
  body: string;
  practices: string[];
}

interface ComplianceContent {
  meta: SeoMeta;
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  intro: {
    title: string;
    body: string[];
  };
  pillars: CompliancePillar[];
  forBuyer: {
    title: string;
    intro: string;
    items: { role: string; body: string }[];
  };
  closing: {
    title: string;
    body: string;
    cta: string;
  };
}

export const compliance: Dict<ComplianceContent> = {
  it: {
    meta: {
      title: "Compliance-first: come lavoriamo | Enable Pharma",
      description:
        "Unbranded, farmacovigilanza GVP VI, GDPR art. 9, Codice Farmindustria, AGCOM: come progettiamo piattaforme di disease awareness a prova di legal.",
    },
    hero: {
      kicker: "Come lavoriamo",
      title: "La compliance non si dichiara. Si progetta.",
      subtitle:
        "Ogni piattaforma Enable Pharma nasce dentro il perimetro normativo italiano ed europeo: non lo aggiriamo, lo usiamo come specifica di progetto. Questa pagina mostra l'impianto, norma per norma.",
    },
    intro: {
      title: "Perché ve lo mostriamo",
      body: [
        "Chi compra comunicazione in pharma non compra creatività: compra la certezza di non finire in una contestazione. Per questo il nostro impianto compliance è documentato, ispezionabile e discusso con legal, medical e farmacovigilanza del cliente prima della firma, non dopo il primo incidente.",
        "Quello che segue non è un elenco di sigle: è il modo in cui ogni requisito normativo diventa una funzione concreta della piattaforma — un workflow, un ruolo, un registro.",
      ],
    },
    pillars: [
      {
        ref: "D.Lgs. 219/2006 · Art. 113 · Art. 124",
        title: "Unbranded per progettazione",
        body: "La pubblicità al pubblico dei farmaci con obbligo di prescrizione è vietata. Le informazioni su salute e malattie restano lecite quando non contengono riferimenti, neppure indiretti, a medicinali: è il perimetro dell'art. 113, dentro cui progettiamo ogni piattaforma. Il nome e il logo dell'azienda compaiono in chiave istituzionale; il farmaco e il principio attivo, mai.",
        practices: [
          "Checklist redazionale unbranded su ogni contenuto, prima della review",
          "Naming proprietario della piattaforma, separato dal brand di prodotto",
          "Divieto assoluto di menzione di farmaci e principi attivi, anche nei commenti moderati",
          "Sistema pull: nessuna informazione non sollecitata su terapie",
          "Trasparenza dello sponsor istituzionale su ogni pagina",
        ],
      },
      {
        ref: "Review MLR · Comitato scientifico",
        title: "Rigore medico-scientifico tracciabile",
        body: "Ogni contenuto nasce con fonti citate, revisione medica e data di revisione visibile, sotto il comitato scientifico nominato per il progetto. Arriva al processo MLR del cliente già predisposto: claim tracciabili, referenze agganciate, versioni archiviate. L'approvazione finale resta al cliente; noi rendiamo il processo veloce e difendibile.",
        practices: [
          "Comitato medico-scientifico nominato per ogni progetto, con ruoli e CV resi pubblici sulla piattaforma",
          "Ogni claim collegato a una fonte primaria verificabile",
          "Data di revisione e firma visibili su ogni contenuto",
          "Fascicolo MLR-ready per ogni lotto di contenuti",
          "Audit trail completo delle versioni e delle approvazioni",
        ],
      },
      {
        ref: "EU GVP Modulo VI",
        title: "Farmacovigilanza integrata, non subita",
        body: "Gestire canali digitali per un'azienda farmaceutica attiva l'obbligo di monitorare le menzioni di sospette reazioni avverse. Il nostro workflow lo trasforma in un processo ordinario: intercettazione, escalation a personale PV qualificato entro le finestre di reporting, template approvati, registro completo. Definito con il vostro dipartimento PV prima del lancio.",
        practices: [
          "Monitoraggio continuativo di tutti i canali owned",
          "Escalation a personale PV qualificato con SLA documentati",
          "Moderazione documentata con template approvati",
          "Registro delle segnalazioni e reconciliation periodica",
          "Formazione PV per tutto il team editoriale e community",
        ],
      },
      {
        ref: "GDPR Art. 9 · Art. 32 · DPIA",
        title: "Dati sanitari trattati come tali",
        body: "I dati sulla salute sono categorie particolari: per una community che non eroga cure, la base giuridica è il consenso esplicito (art. 9.2.a). Progettiamo informative chiare, consenso granulare, minimizzazione e sicurezza, con DPIA e ruoli definiti: l'azienda titolare, Enable Pharma responsabile del trattamento.",
        practices: [
          "Consenso esplicito e granulare per ogni finalità",
          "DPIA prima del lancio, aggiornata a ogni evoluzione",
          "Minimizzazione: si raccoglie solo ciò che serve alla community",
          "Nomina a responsabile ex art. 28 con istruzioni documentate",
          "Procedure di revoca ed esercizio diritti già operative al lancio",
        ],
      },
      {
        ref: "Codice Farmindustria · EFPIA",
        title: "Associazioni pazienti: partner, con trasparenza",
        body: "Il coinvolgimento delle associazioni pazienti è regolato dal Codice Farmindustria, che recepisce il Codice EFPIA: contratti scritti, indipendenza rispettata, disclosure annuale dei trasferimenti di valore. Il tracking della trasparenza è progettato nella piattaforma dal primo giorno, così la disclosure di giugno non diventa un'emergenza di maggio.",
        practices: [
          "Contratti scritti per ogni collaborazione con associazioni",
          "Registro dei trasferimenti di valore pronto per la disclosure annuale",
          "Rispetto dell'indipendenza editoriale delle associazioni",
          "Coinvolgimento del paziente esperto secondo le regole del Codice",
        ],
      },
      {
        ref: "AGCOM 197/25/CONS",
        title: "Influencer e creator dentro le regole",
        body: "La delibera AGCOM 197/25/CONS ha portato gli influencer nel perimetro regolato: elenco pubblico per i profili rilevanti, obblighi di trasparenza, responsabilità rafforzata sui contenuti che toccano la salute, sanzioni fino a 600.000 euro. I nostri programmi creator nascono già conformi: selezione documentata, contratti, disclosure, review scientifica dei contenuti.",
        practices: [
          "Matrice di scoring documentata per la selezione dei creator",
          "Verifica dei conflitti di interesse prima dell'ingaggio",
          "Contrattualizzazione con obblighi di trasparenza espliciti",
          "Review medico-scientifica dei contenuti prima della pubblicazione",
        ],
      },
      {
        ref: "WCAG 2.2 AA · European Accessibility Act",
        title: "Accessibilità come requisito, non come opzione",
        body: "L'European Accessibility Act rende l'accessibilità un obbligo per i servizi digitali. Per una piattaforma di patologia è prima di tutto una questione di rispetto: chi convive con una malattia non deve combattere anche con l'interfaccia. Progettiamo secondo WCAG 2.2 AA, con verifiche in ogni release.",
        practices: [
          "Contrasti, focus e navigazione da tastiera verificati",
          "Sottotitoli sui contenuti video, trascrizioni per i podcast",
          "Linguaggio chiaro, struttura semantica, screen-reader friendly",
          "Test di accessibilità a ogni rilascio significativo",
        ],
      },
    ],
    forBuyer: {
      title: "Cosa significa per ogni funzione",
      intro:
        "Un progetto di awareness attraversa cinque scrivanie. A ciascuna rispondiamo con processi, non con rassicurazioni.",
      items: [
        {
          role: "Medical Affairs",
          body: "Contenuti a prova di review: fonti primarie, claim tracciabili, comitato scientifico nominato, fascicoli MLR-ready. Il rigore non rallenta la produzione: è la struttura ad accelerarla.",
        },
        {
          role: "Legal & Compliance",
          body: "Perimetro normativo documentato norma per norma, processi ispezionabili prima della firma, audit trail su contenuti, moderazione e farmacovigilanza.",
        },
        {
          role: "Corporate & Public Affairs",
          body: "Comunicazione istituzionale che costruisce reputazione nel tempo: presidio continuativo, storytelling di patologia, trasparenza verso gli stakeholder.",
        },
        {
          role: "Patient Advocacy",
          body: "Rapporti con le associazioni gestiti secondo Codice: contratti scritti, indipendenza editoriale rispettata, disclosure annuale pronta senza rincorse.",
        },
        {
          role: "Market Access / Brand",
          body: "KPI non promozionali che dimostrano l'impatto del presidio trimestre dopo trimestre: engagement qualificato, copertura territoriale, reputazione misurata.",
        },
      ],
    },
    closing: {
      title: "Il modo più rapido per verificare tutto questo",
      body: "L'Awareness & Compliance Audit applica questo impianto alla vostra patologia: perimetro normativo, stakeholder, benchmark e una roadmap approvabile dal vostro legal. Prezzo fisso, 4–6 settimane.",
      cta: "Richiedi l'audit",
    },
  },
  en: {
    meta: {
      title: "Compliance-first: how we work | Enable Pharma",
      description:
        "Unbranded rules, GVP VI pharmacovigilance, GDPR art. 9, Farmindustria Code, AGCOM: how we design disease awareness platforms that pass legal review.",
    },
    hero: {
      kicker: "How we work",
      title: "Compliance is not declared. It is designed.",
      subtitle:
        "Every Enable Pharma platform starts inside the Italian and European regulatory perimeter: we don't work around it, we use it as the design specification. This page shows the framework, regulation by regulation.",
    },
    intro: {
      title: "Why we show you this",
      body: [
        "Pharma buyers don't buy creativity: they buy the certainty of not ending up in a dispute. That is why our compliance framework is documented, inspectable and discussed with the client's legal, medical and pharmacovigilance teams before signing — not after the first incident.",
        "What follows is not a list of acronyms: it is how each regulatory requirement becomes a concrete feature of the platform — a workflow, a role, a register.",
      ],
    },
    pillars: [
      {
        ref: "Legislative Decree 219/2006 · Art. 113 · Art. 124",
        title: "Unbranded by design",
        body: "Advertising prescription-only medicines to the public is prohibited in Italy. Information on health and diseases remains lawful when it contains no reference, even indirect, to medicinal products: that is the perimeter of art. 113, and we design every platform inside it. The company's name and logo appear institutionally; the drug and its active ingredient, never.",
        practices: [
          "Unbranded editorial checklist on every piece of content, before review",
          "Proprietary platform naming, separate from any product brand",
          "Absolute ban on drug and active-ingredient mentions, including moderated comments",
          "Pull system: no unsolicited information about therapies",
          "Institutional sponsor transparency on every page",
        ],
      },
      {
        ref: "MLR review · Scientific committee",
        title: "Traceable medical-scientific rigour",
        body: "Every piece of content is created with cited sources, medical review and a visible review date, overseen by the scientific committee named for the project. It reaches the client's MLR process already prepared: traceable claims, attached references, archived versions. Final approval stays with the client; we make the process fast and defensible.",
        practices: [
          "A medical-scientific committee named for each project, roles and CVs published on the platform",
          "Every claim linked to a verifiable primary source",
          "Review date and sign-off visible on every piece of content",
          "MLR-ready dossier for every content batch",
          "Complete audit trail of versions and approvals",
        ],
      },
      {
        ref: "EU GVP Module VI",
        title: "Pharmacovigilance integrated, not endured",
        body: "Running digital channels for a pharmaceutical company triggers the obligation to monitor mentions of suspected adverse reactions. Our workflow turns this into an ordinary process: interception, escalation to qualified PV personnel within reporting windows, approved templates, a complete register. Defined with your PV department before launch.",
        practices: [
          "Continuous monitoring of all owned channels",
          "Escalation to qualified PV personnel with documented SLAs",
          "Documented moderation with approved templates",
          "Report register and periodic reconciliation",
          "PV training for the whole editorial and community team",
        ],
      },
      {
        ref: "GDPR Art. 9 · Art. 32 · DPIA",
        title: "Health data treated as health data",
        body: "Health data are special categories: for a community that does not provide care, the legal basis is explicit consent (art. 9.2.a). We design clear notices, granular consent, minimisation and security, with a DPIA and defined roles: the company as controller, Enable Pharma as processor.",
        practices: [
          "Explicit, granular consent for each purpose",
          "DPIA before launch, updated at every evolution",
          "Minimisation: we collect only what the community needs",
          "Processor appointment under art. 28 with documented instructions",
          "Withdrawal and rights procedures operational at launch",
        ],
      },
      {
        ref: "Farmindustria Code · EFPIA",
        title: "Patient associations: partners, with transparency",
        body: "Engagement with patient associations is regulated by the Farmindustria Code, which implements the EFPIA Code: written contracts, respected independence, annual disclosure of transfers of value. Transparency tracking is designed into the platform from day one, so the June disclosure never becomes a May emergency.",
        practices: [
          "Written contracts for every association collaboration",
          "Transfer-of-value register ready for annual disclosure",
          "Respect for the associations' editorial independence",
          "Expert patient involvement under the Code's rules",
        ],
      },
      {
        ref: "AGCOM 197/25/CONS",
        title: "Influencers and creators inside the rules",
        body: "AGCOM resolution 197/25/CONS brought influencers into the regulated perimeter: a public register for relevant profiles, transparency obligations, reinforced responsibility for health-related content, sanctions up to €600,000. Our creator programmes are compliant from day one: documented selection, contracts, disclosure, scientific review of content.",
        practices: [
          "Documented scoring matrix for creator selection",
          "Conflict-of-interest checks before engagement",
          "Contracts with explicit transparency obligations",
          "Medical-scientific review of content before publication",
        ],
      },
      {
        ref: "WCAG 2.2 AA · European Accessibility Act",
        title: "Accessibility as a requirement, not an option",
        body: "The European Accessibility Act makes accessibility an obligation for digital services. For a condition platform it is above all a matter of respect: people living with a disease should not have to fight the interface too. We design to WCAG 2.2 AA, with checks in every release.",
        practices: [
          "Contrast, focus and keyboard navigation verified",
          "Subtitles on video content, transcripts for podcasts",
          "Plain language, semantic structure, screen-reader friendly",
          "Accessibility testing at every significant release",
        ],
      },
    ],
    forBuyer: {
      title: "What it means for each function",
      intro:
        "An awareness project crosses five desks. We answer each one with processes, not reassurances.",
      items: [
        {
          role: "Medical Affairs",
          body: "Review-proof content: primary sources, traceable claims, a named scientific committee, MLR-ready dossiers. Rigour doesn't slow production — structure speeds it up.",
        },
        {
          role: "Legal & Compliance",
          body: "A regulatory perimeter documented regulation by regulation, processes inspectable before signing, audit trails on content, moderation and pharmacovigilance.",
        },
        {
          role: "Corporate & Public Affairs",
          body: "Institutional communication that builds reputation over time: continuous presence, condition storytelling, transparency towards stakeholders.",
        },
        {
          role: "Patient Advocacy",
          body: "Association relationships managed under the Code: written contracts, editorial independence respected, annual disclosure ready without a scramble.",
        },
        {
          role: "Market Access / Brand",
          body: "Non-promotional KPIs proving the value of the presence quarter after quarter: qualified engagement, territorial coverage, measured reputation.",
        },
      ],
    },
    closing: {
      title: "The fastest way to verify all of this",
      body: "The Awareness & Compliance Audit applies this framework to your condition: regulatory perimeter, stakeholders, benchmarks and a roadmap your legal team can approve. Fixed price, 4–6 weeks.",
      cta: "Request the audit",
    },
  },
};
