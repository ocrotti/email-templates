import type { Locale } from "@/lib/site";

interface GuaranteeContent {
  seoTitle: string;
  seoDescription: string;
  title: string;
  intro: string;
  pillars: { title: string; body: string; detail: string }[];
  sla: {
    number: string;
    title: string;
    intro: string;
    items: { label: string; value: string }[];
    note: string;
  };
  gdpr: {
    number: string;
    title: string;
    body: string[];
    items: { title: string; body: string }[];
  };
  process: {
    number: string;
    title: string;
    intro: string;
    steps: { title: string; body: string }[];
  };
  faq: { q: string; a: string }[];
}

export const guarantee: Record<Locale, GuaranteeContent> = {
  en: {
    seoTitle: "Guarantee & How We Work Together | enable.talent",
    seoDescription:
      "2-week trial, pay only after, free replacement in 60–90 days, contractual SLAs and full GDPR paperwork (DPA + SCC). Built to beat the market standard.",
    title: "A new brand has to out-guarantee the incumbents. Fine.",
    intro:
      "Somewhere offers a 6-month hire guarantee. MarketerHire runs 2-week trials. The market standard for replacement is 30–120 days. We don't have a decade of logos yet — so the terms below are deliberately more generous than the standard, and they live in the contract, not just on this page.",
    pillars: [
      {
        title: "2-week trial, reduced risk",
        body: "The pod ships real deliverables for two weeks before you owe anything meaningful.",
        detail: "Trial scope, deliverables and evaluation criteria are written into the proposal, so 'convinced' isn't a vibe — it's a checklist you defined.",
      },
      {
        title: "Pay only after the trial",
        body: "Your first invoice lands after the trial period, monthly in arrears.",
        detail: "No setup fees, no recruiting fees, no deposits. If the trial fails, the cost to you is the time you spent finding out.",
      },
      {
        title: "Free replacement, 60–90 days",
        body: "Underperformance triggers a free replacement, and the pod keeps running while we switch.",
        detail: "The QA lead usually flags issues before you do. Replacement windows and the continuity commitment are contractual terms.",
      },
      {
        title: "SLA in the contract",
        body: "Response times, throughput and quality gates with defined remedies — not aspirations.",
        detail: "SLA misses generate credits automatically. You should never have to negotiate for a remedy you already signed.",
      },
    ],
    sla: {
      number: "02",
      title: "The SLA, in plain terms",
      intro: "Exact values are set per pod in the proposal. These are the standard baselines we start from:",
      items: [
        { label: "First response, business hours", value: "≤ 4 hours" },
        { label: "QA review before client delivery", value: "100% of deliverables" },
        { label: "Weekly quality report", value: "Every Friday" },
        { label: "Replacement window", value: "60–90 days, free" },
        { label: "Scale up / down notice", value: "30 days" },
        { label: "Exit: assets & documentation handover", value: "≤ 30 days, complete" },
      ],
      note: "Timezone helps: Nairobi is UTC+3, 1–2 hours ahead of CET. SLAs run on your business day, not overnight batches.",
    },
    gdpr: {
      number: "03",
      title: "GDPR, data security and the boring paperwork",
      body: [
        "If a pod touches your clients' end-customer data, you remain the data controller — and liable, up to €20M or 4% of global turnover. We built the compliance stack so that risk is contained by design, not by hope.",
        "Kenya has no EU adequacy decision. That's exactly why every engagement ships with the transfer paperwork already done:",
      ],
      items: [
        { title: "DPA, three-way", body: "Data processing agreements across you → enable.talent → each specialist, defining scope, purpose and instructions." },
        { title: "Standard Contractual Clauses", body: "EU Commission SCCs govern every EU–Kenya data transfer, with transfer impact assessment on request." },
        { title: "Technical measures", body: "Least-privilege access, encrypted devices, password managers, access logs and revocation within hours at offboarding." },
        { title: "Data minimisation", body: "Pods work with the minimum client data the task needs. Most delivery work needs assets and accounts, not databases of personal data." },
      ],
    },
    process: {
      number: "04",
      title: "How we work together, week by week",
      intro: "Trust is a process, not a badge. This is the operating rhythm every pod runs on:",
      steps: [
        { title: "Daily", body: "The pod works your business hours in your tools. Blockers surface in your channels the moment they exist, not in a Friday report." },
        { title: "Weekly", body: "Quality report from the QA lead: shipped, rejected, why, and what we need from you. Fifteen honest lines beat a dashboard of green lights." },
        { title: "Monthly", body: "Capacity and SLA review: pod load vs pipeline, quality metrics, retention status, and pricing implications if your needs are shifting." },
        { title: "Quarterly", body: "The uncomfortable meeting: what should we stop, start, change? Including 'do you still need us at this size' — asked by us, first." },
      ],
    },
    faq: [
      { q: "What does 'reduced risk' mean for the trial, precisely?", a: "The trial terms are fixed in your proposal before you sign anything. The structure: two weeks of defined deliverables, evaluated against criteria you set, with payment due only if you continue. No deposits, no setup fees." },
      { q: "What if I want to hire a pod member directly?", a: "It happens, and we'd rather regulate it than pretend it won't: conversion terms are in the contract, priced fairly, after 12 months on the pod. We won't hold your delivery hostage over it." },
      { q: "Who owns the work product?", a: "You do, fully, from the moment it's delivered — and at exit, everything in progress plus documentation transfers within 30 days. IP assignment is in every specialist's contract." },
      { q: "What about confidentiality with my clients?", a: "White-label is contractual: NDAs cover your client list, your positioning and your pricing. Specialists sign confidentiality terms that survive their engagement." },
      { q: "Can my clients audit this?", a: "Yes. We'll join a call with your client, under your brand or ours, and walk through the compliance stack. Some agencies sell the transparency; others keep us invisible. Both work." },
    ],
  },
  it: {
    seoTitle: "Garanzia e Come Lavoriamo Insieme | enable.talent",
    seoDescription:
      "Trial di 2 settimane, paghi solo dopo, replacement gratuito in 60–90 giorni, SLA contrattuali e GDPR completo (DPA + SCC), per battere lo standard.",
    title: "Un brand nuovo deve garantire più degli incumbent. Va bene.",
    intro:
      "Somewhere offre una garanzia di 6 mesi sull'hire. MarketerHire fa trial di 2 settimane. Lo standard di mercato per il replacement è 30–120 giorni. Noi non abbiamo ancora dieci anni di loghi — quindi i termini qui sotto sono deliberatamente più generosi dello standard, e vivono nel contratto, non solo in questa pagina.",
    pillars: [
      {
        title: "Trial di 2 settimane, rischio ridotto",
        body: "Il pod consegna deliverable veri per due settimane prima che tu debba qualcosa di significativo.",
        detail: "Scope, deliverable e criteri di valutazione del trial sono scritti nella proposta: 'convinto' non è una sensazione — è una checklist che hai definito tu.",
      },
      {
        title: "Paghi solo dopo il trial",
        body: "La prima fattura arriva dopo il periodo di trial, mensile posticipata.",
        detail: "Niente setup fee, niente fee di recruiting, niente depositi. Se il trial fallisce, il costo per te è il tempo che hai speso per scoprirlo.",
      },
      {
        title: "Replacement gratuito, 60–90 giorni",
        body: "L'underperformance attiva un replacement gratuito, e il pod continua a girare durante il cambio.",
        detail: "Il QA lead di solito segnala i problemi prima di te. Finestre di replacement e impegno di continuità sono termini contrattuali.",
      },
      {
        title: "SLA nel contratto",
        body: "Tempi di risposta, throughput e quality gate con rimedi definiti — non aspirazioni.",
        detail: "Gli sforamenti SLA generano crediti automaticamente. Non dovresti mai negoziare per un rimedio che hai già firmato.",
      },
    ],
    sla: {
      number: "02",
      title: "Lo SLA, in parole povere",
      intro: "I valori esatti si fissano per pod nella proposta. Queste sono le baseline standard da cui partiamo:",
      items: [
        { label: "Prima risposta, orario di ufficio", value: "≤ 4 ore" },
        { label: "Review QA prima della consegna al cliente", value: "100% dei deliverable" },
        { label: "Report qualità settimanale", value: "Ogni venerdì" },
        { label: "Finestra di replacement", value: "60–90 giorni, gratuito" },
        { label: "Preavviso per scalare su / giù", value: "30 giorni" },
        { label: "Uscita: handover di asset e documentazione", value: "≤ 30 giorni, completo" },
      ],
      note: "Il fuso aiuta: Nairobi è UTC+3, 1–2 ore avanti sul CET. Gli SLA girano nel tuo orario di ufficio, non su batch notturni.",
    },
    gdpr: {
      number: "03",
      title: "GDPR, sicurezza dei dati e la burocrazia noiosa",
      body: [
        "Se un pod tocca i dati dei clienti finali dei tuoi clienti, il data controller resti tu — e la responsabilità arriva fino a €20M o al 4% del fatturato globale. Abbiamo costruito lo stack di compliance perché quel rischio sia contenuto by design, non per speranza.",
        "Il Kenya non ha una decisione di adeguatezza UE. Ed è esattamente per questo che ogni ingaggio parte con la burocrazia del trasferimento già fatta:",
      ],
      items: [
        { title: "DPA a tre vie", body: "Accordi di trattamento dati tra te → enable.talent → ogni specialist, con scope, finalità e istruzioni definiti." },
        { title: "Standard Contractual Clauses", body: "Le SCC della Commissione UE governano ogni trasferimento EU–Kenya, con transfer impact assessment su richiesta." },
        { title: "Misure tecniche", body: "Accessi least-privilege, device cifrati, password manager, log di accesso e revoca in poche ore all'offboarding." },
        { title: "Minimizzazione dei dati", body: "I pod lavorano con il minimo di dati cliente necessario al task. La maggior parte della delivery richiede asset e account, non database di dati personali." },
      ],
    },
    process: {
      number: "04",
      title: "Come lavoriamo insieme, settimana per settimana",
      intro: "La fiducia è un processo, non un badge. Questo è il ritmo operativo di ogni pod:",
      steps: [
        { title: "Ogni giorno", body: "Il pod lavora nel tuo orario, nei tuoi tool. I blocchi emergono nei tuoi canali nel momento in cui esistono, non in un report del venerdì." },
        { title: "Ogni settimana", body: "Report qualità dal QA lead: consegnato, respinto, perché, e cosa ci serve da te. Quindici righe oneste battono una dashboard di semafori verdi." },
        { title: "Ogni mese", body: "Review di capacità e SLA: carico del pod vs pipeline, metriche di qualità, stato della retention, e implicazioni di prezzo se i tuoi bisogni stanno cambiando." },
        { title: "Ogni trimestre", body: "La riunione scomoda: cosa dovremmo fermare, iniziare, cambiare? Incluso 'vi serviamo ancora a questa dimensione' — chiesto da noi, per primi." },
      ],
    },
    faq: [
      { q: "Cosa significa esattamente 'rischio ridotto' per il trial?", a: "I termini del trial sono fissati nella proposta prima che tu firmi qualsiasi cosa. La struttura: due settimane di deliverable definiti, valutati su criteri che fissi tu, con pagamento dovuto solo se continui. Niente depositi, niente setup fee." },
      { q: "E se voglio assumere direttamente un membro del pod?", a: "Succede, e preferiamo regolarlo piuttosto che fingere che non succederà: i termini di conversione sono nel contratto, prezzati equamente, dopo 12 mesi nel pod. Non terremo in ostaggio la tua delivery per questo." },
      { q: "Di chi è la proprietà del lavoro?", a: "Tua, piena, dal momento della consegna — e all'uscita, tutto il work in progress più la documentazione passano entro 30 giorni. La cessione IP è nel contratto di ogni specialist." },
      { q: "E la riservatezza verso i miei clienti?", a: "Il white-label è contrattuale: NDA su lista clienti, posizionamento e prezzi. Gli specialist firmano termini di riservatezza che sopravvivono all'ingaggio." },
      { q: "I miei clienti possono fare audit?", a: "Sì. Entriamo in call con il tuo cliente, sotto il tuo brand o il nostro, e presentiamo lo stack di compliance. Alcune agenzie vendono la trasparenza; altre ci tengono invisibili. Funzionano entrambe." },
    ],
  },
};
