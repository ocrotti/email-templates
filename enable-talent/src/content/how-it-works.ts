import type { Locale } from "@/lib/site";

interface HowContent {
  seoTitle: string;
  seoDescription: string;
  title: string;
  intro: string;
  timeline: { day: string; title: string; body: string }[];
  qa: {
    number: string;
    title: string;
    body: string[];
    points: { title: string; body: string }[];
  };
  matching: {
    number: string;
    title: string;
    body: string;
    steps: { title: string; body: string }[];
  };
  ongoing: {
    number: string;
    title: string;
    items: { title: string; body: string }[];
  };
  whenItBreaks: {
    number: string;
    title: string;
    body: string;
    scenarios: { title: string; body: string }[];
  };
  faqTitle: string;
  faq: { q: string; a: string }[];
}

export const howItWorks: Record<Locale, HowContent> = {
  en: {
    seoTitle: "How It Works: Pod Live in 10–14 Days | enable.talent",
    seoDescription:
      "From scoping call to a working marketing pod in 10–14 days: matching, onboarding, senior European QA, ongoing management — and exactly what happens when something goes wrong.",
    title: "Sell first, staff after. Pod live in 10–14 days.",
    intro:
      "You don't carry bench cost while waiting for demand, and you don't turn work away while waiting for hires. Here is the full process — including the parts where things go wrong, because that's what you're really pricing.",
    timeline: [
      {
        day: "Day 0",
        title: "Scoping call",
        body: "45 minutes. We map roles, volumes, tools, languages and your QA expectations. If a pod doesn't fit your case, we say so on this call — cheaper for everyone.",
      },
      {
        day: "Days 1–3",
        title: "Pod proposal",
        body: "You receive a written proposal: pod composition, monthly price, SLA draft and the trial plan with concrete deliverables. No CV roulette.",
      },
      {
        day: "Days 3–7",
        title: "Matching from the bench",
        body: "We match vetted specialists from our Nairobi bench to your stack and sector. You meet the pod and the senior European QA lead on one call.",
      },
      {
        day: "Days 7–14",
        title: "Onboarding",
        body: "Access, tools, templates, naming conventions, brand voice. The QA lead converts your standards into the checklists the pod works against.",
      },
      {
        day: "Weeks 2–4",
        title: "Trial sprint",
        body: "Two weeks of real deliverables at reduced risk. Daily output, weekly review with you. You pay only after the trial convinces you.",
      },
      {
        day: "Ongoing",
        title: "Managed delivery",
        body: "The pod runs inside your workflow with monthly QA reports, capacity reviews and a direct escalation line. You scale seats up or down with 30 days' notice.",
      },
    ],
    qa: {
      number: "02",
      title: "The European QA layer — what it actually does",
      body: [
        "QA is the difference between offshore capacity and a delivery department. Our QA leads are senior marketers from Enable Digital, our Italian sister agency — people who run agency delivery for clients today, not checklists administrators.",
        "Nothing ships to your clients without passing the QA gate. That's contractual, not aspirational.",
      ],
      points: [
        { title: "Standards setup", body: "Your brand book, tone and definition-of-done translated into working checklists during onboarding." },
        { title: "Deliverable review", body: "Every campaign change, report, asset and page reviewed before delivery. Rejections loop inside the pod, invisible to you." },
        { title: "Weekly quality report", body: "What shipped, what was rejected and why, where the pod needs your input. One honest page, weekly." },
        { title: "Escalation authority", body: "The QA lead can pause deliverables, trigger replacements and pull in senior specialists. Quality has a budget and a boss." },
      ],
    },
    matching: {
      number: "03",
      title: "How matching works",
      body: "We recruit continuously in Nairobi and vet before you ever see a profile — so matching takes days, not months.",
      steps: [
        { title: "Sourcing", body: "University programmes, bootcamps like Moringa and AkiraChix, and referrals from our own specialists — in an ecosystem where Google, Microsoft and Safaricom recruit." },
        { title: "Vetting", body: "Portfolio and work-sample tests per role, written and spoken English assessment, tool certifications verified, reference checks." },
        { title: "Fair-pay offer", body: "We pay 2–4x the local market rate with a career path. That's why the bench is strong and retention is defensible — and we publish it." },
        { title: "Match & meet", body: "Specialists matched to your stack and sector. You meet them before the trial; a mismatch costs you a call, not a quarter." },
      ],
    },
    ongoing: {
      number: "04",
      title: "Ongoing management, included",
      items: [
        { title: "Capacity planning", body: "Monthly review of pod load vs your pipeline. Scale seats up or down with 30 days' notice — no severance, no lawyers." },
        { title: "Retention & growth", body: "Career paths, training budgets and fair pay keep specialists in your pod. Continuity is a KPI we report on." },
        { title: "SLA monitoring", body: "Response times, throughput and quality gates measured and reported monthly. Misses trigger remedies defined in the contract." },
        { title: "Compliance", body: "Contracts, DPA and Standard Contractual Clauses maintained by us. You stay GDPR-compliant as data controller with paperwork that's already done." },
      ],
    },
    whenItBreaks: {
      number: "05",
      title: "What happens when something goes wrong",
      body: "Something eventually will — a specialist underperforms, a deadline wobbles, a client escalates. The difference is what happens next.",
      scenarios: [
        { title: "A specialist underperforms", body: "The QA lead flags it first, usually before you see it. Free replacement within 60–90 days; the pod and QA lead keep delivery running during the switch." },
        { title: "A deadline is at risk", body: "You hear it from us before the deadline, not after. The QA lead re-routes work across the bench; SLA misses carry contractual remedies." },
        { title: "The pod stalls entirely", body: "The nuclear scenario: QA lead escalates, we surge senior capacity from the bench and Enable Digital, and if we can't fix it, your exit is clean — 30 days, your assets and documentation handed over." },
        { title: "You're just not happy", body: "No lock-in theatre. Tell us. We fix it or we part ways like adults, with everything you paid for delivered and documented." },
      ],
    },
    faqTitle: "Process questions, answered",
    faq: [
      { q: "Can I choose the specialists myself?", a: "You meet every specialist before the trial and can veto any match. What we don't do is send you 40 CVs to grade — that's the recruiting model, and it's the thing pods replace." },
      { q: "Can the pod use our project management tools?", a: "Yes — the pod works inside your stack (Asana, ClickUp, Notion, Jira, whatever runs your delivery). One workflow, not two." },
      { q: "What if I only need one specialist, not a team?", a: "The starter pod is exactly that: one dedicated specialist plus QA and management, from €2,000/month. Pods grow when your pipeline does." },
      { q: "Who employs the specialists?", a: "We hold the contractor relationships through compliant infrastructure and move to employer-of-record setups as pods stabilise. You buy a service; employment risk stays on our side of the contract." },
    ],
  },
  it: {
    seoTitle: "Come Funziona: Pod Operativo in 10–14 Giorni | enable.talent",
    seoDescription:
      "Dalla call di scoping a un pod marketing operativo in 10–14 giorni: matching, onboarding, QA senior europeo, gestione continua — e cosa succede esattamente quando qualcosa va storto.",
    title: "Vendi prima, staffa dopo. Pod operativo in 10–14 giorni.",
    intro:
      "Non ti porti il costo della bench aspettando la domanda, e non rifiuti lavoro aspettando le assunzioni. Ecco il processo completo — incluse le parti in cui le cose vanno storte, perché è quello che stai davvero prezzando.",
    timeline: [
      { day: "Giorno 0", title: "Call di scoping", body: "45 minuti. Mappiamo ruoli, volumi, tool, lingue e le tue aspettative di QA. Se il pod non ha senso per il tuo caso, te lo diciamo in questa call — costa meno a tutti." },
      { day: "Giorni 1–3", title: "Proposta di pod", body: "Ricevi una proposta scritta: composizione del pod, prezzo mensile, bozza di SLA e piano di trial con deliverable concreti. Niente roulette di CV." },
      { day: "Giorni 3–7", title: "Matching dalla bench", body: "Selezioniamo specialist già vettati dalla nostra bench di Nairobi per stack e settore. Conosci il pod e il QA lead senior europeo in un'unica call." },
      { day: "Giorni 7–14", title: "Onboarding", body: "Accessi, tool, template, naming convention, voce del brand. Il QA lead converte i tuoi standard nelle checklist su cui il pod lavora." },
      { day: "Settimane 2–4", title: "Sprint di trial", body: "Due settimane di deliverable veri a rischio ridotto. Output quotidiano, review settimanale con te. Paghi solo dopo che il trial ti ha convinto." },
      { day: "Sempre", title: "Delivery gestita", body: "Il pod gira dentro il tuo workflow con report QA mensili, review di capacità e una linea diretta di escalation. Scali i posti su o giù con 30 giorni di preavviso." },
    ],
    qa: {
      number: "02",
      title: "Il layer di QA europeo — cosa fa davvero",
      body: [
        "Il QA è la differenza tra capacità offshore e un reparto delivery. I nostri QA lead sono marketer senior di Enable Digital, la nostra agenzia sorella italiana — gente che fa delivery per clienti veri oggi, non amministratori di checklist.",
        "Niente arriva ai tuoi clienti senza passare il gate di QA. È contrattuale, non aspirazionale.",
      ],
      points: [
        { title: "Setup degli standard", body: "Il tuo brand book, il tono e la definition-of-done tradotti in checklist operative durante l'onboarding." },
        { title: "Review dei deliverable", body: "Ogni modifica campagna, report, asset e pagina rivisti prima della consegna. I rifiuti girano dentro il pod, invisibili per te." },
        { title: "Report qualità settimanale", body: "Cosa è uscito, cosa è stato respinto e perché, dove il pod ha bisogno del tuo input. Una pagina onesta, ogni settimana." },
        { title: "Autorità di escalation", body: "Il QA lead può fermare deliverable, attivare replacement e coinvolgere specialist senior. La qualità ha un budget e un responsabile." },
      ],
    },
    matching: {
      number: "03",
      title: "Come funziona il matching",
      body: "Reclutiamo in continuo a Nairobi e vettiamo prima che tu veda un profilo — così il matching richiede giorni, non mesi.",
      steps: [
        { title: "Sourcing", body: "Programmi universitari, bootcamp come Moringa e AkiraChix, e referral dai nostri stessi specialist — in un ecosistema dove reclutano Google, Microsoft e Safaricom." },
        { title: "Vetting", body: "Test su portfolio e campioni di lavoro per ruolo, valutazione dell'inglese scritto e parlato, certificazioni verificate, referenze." },
        { title: "Offerta fair-pay", body: "Paghiamo 2–4x il mercato locale con un percorso di carriera. È per questo che la bench è forte e la retention difendibile — e lo pubblichiamo." },
        { title: "Match e incontro", body: "Specialist abbinati a stack e settore. Li conosci prima del trial; un mismatch ti costa una call, non un trimestre." },
      ],
    },
    ongoing: {
      number: "04",
      title: "Gestione continua, inclusa",
      items: [
        { title: "Capacity planning", body: "Review mensile del carico del pod rispetto alla tua pipeline. Scali i posti con 30 giorni di preavviso — niente severance, niente avvocati." },
        { title: "Retention e crescita", body: "Percorsi di carriera, budget formazione e fair pay tengono gli specialist nel tuo pod. La continuità è un KPI su cui riportiamo." },
        { title: "Monitoraggio SLA", body: "Tempi di risposta, throughput e quality gate misurati e riportati ogni mese. Gli sforamenti attivano rimedi definiti nel contratto." },
        { title: "Compliance", body: "Contratti, DPA e Standard Contractual Clauses mantenuti da noi. Resti compliant GDPR come data controller con la burocrazia già fatta." },
      ],
    },
    whenItBreaks: {
      number: "05",
      title: "Cosa succede quando qualcosa va storto",
      body: "Prima o poi succede — uno specialist non performa, una deadline traballa, un cliente escala. La differenza è cosa succede dopo.",
      scenarios: [
        { title: "Uno specialist non performa", body: "Il QA lead lo segnala per primo, di solito prima che tu te ne accorga. Replacement gratuito entro 60–90 giorni; pod e QA lead tengono in piedi la delivery durante il cambio." },
        { title: "Una deadline è a rischio", body: "Lo senti da noi prima della deadline, non dopo. Il QA lead redistribuisce il lavoro sulla bench; gli sforamenti SLA hanno rimedi contrattuali." },
        { title: "Il pod si ferma del tutto", body: "Lo scenario nucleare: il QA lead escala, portiamo capacità senior dalla bench e da Enable Digital, e se non riusciamo a sistemarlo l'uscita è pulita — 30 giorni, asset e documentazione consegnati." },
        { title: "Semplicemente non sei contento", body: "Niente teatrino del lock-in. Diccelo. Sistemiamo o ci separiamo da adulti, con tutto quello che hai pagato consegnato e documentato." },
      ],
    },
    faqTitle: "Domande sul processo, con risposta",
    faq: [
      { q: "Posso scegliere io gli specialist?", a: "Conosci ogni specialist prima del trial e puoi bocciare qualsiasi match. Quello che non facciamo è mandarti 40 CV da valutare — quello è il modello recruiting, ed è la cosa che i pod sostituiscono." },
      { q: "Il pod può usare i nostri tool di project management?", a: "Sì — il pod lavora dentro il tuo stack (Asana, ClickUp, Notion, Jira, quello che fa girare la tua delivery). Un workflow solo, non due." },
      { q: "E se mi serve un solo specialist, non un team?", a: "Il pod starter è esattamente questo: uno specialist dedicato più QA e gestione, da €2.000/mese. I pod crescono quando cresce la tua pipeline." },
      { q: "Chi è il datore di lavoro degli specialist?", a: "Le relazioni contrattuali le teniamo noi tramite infrastruttura compliant, e passiamo a setup employer-of-record quando i pod si stabilizzano. Tu compri un servizio; il rischio datoriale resta dal nostro lato del contratto." },
    ],
  },
};
