import type { Locale } from "@/lib/site";

interface PricingContent {
  seoTitle: string;
  seoDescription: string;
  title: string;
  intro: string;
  tiers: {
    name: string;
    price: string;
    priceNote: string;
    description: string;
    features: string[];
    cta: string;
    highlighted: boolean;
  }[];
  included: {
    title: string;
    intro: string;
    rows: { label: string; starter: string; full: string }[];
  };
  why: {
    title: string;
    body: string[];
  };
  faq: { q: string; a: string }[];
}

export const pricing: Record<Locale, PricingContent> = {
  en: {
    seoTitle: "Pricing: Managed Marketing Pods from €2,000/month | enable.talent",
    seoDescription:
      "Starter pods from €2,000/month, full pods from €6,000 on quote. Management, senior European QA, replacement guarantee and GDPR paperwork included. Pay only after the 2-week trial.",
    title: "Honest bands, not a rigid price list.",
    intro:
      "Two formats. Both include management, senior European QA, the replacement guarantee and the GDPR paperwork. Exact pricing depends on roles and seniority — we quote after the scoping call, and the first invoice comes only after the trial.",
    tiers: [
      {
        name: "Starter pod",
        price: "from €2,000",
        priceNote: "/month · introductory pricing",
        description: "One dedicated specialist plus the full management and QA layer. The lowest-risk way to test the model on real deliverables.",
        features: [
          "1 dedicated specialist (any role)",
          "Senior European QA on every deliverable",
          "Pod management & capacity planning",
          "2-week trial · pay only after",
          "Free replacement, 60–90 days",
          "SLA + DPA/SCC included",
          "Scale up or down, 30 days' notice",
        ],
        cta: "Start with a scoping call",
        highlighted: true,
      },
      {
        name: "Full pod",
        price: "from €6,000",
        priceNote: "/month · on quote",
        description: "A multi-role delivery unit — typically 3–5 specialists — built around your service lines, with a dedicated QA lead.",
        features: [
          "3–5 dedicated specialists, mixed roles",
          "Dedicated senior European QA lead",
          "Weekly quality report & monthly reviews",
          "White-label workflow integration",
          "Priority bench access for peaks",
          "Everything in Starter, at pod scale",
        ],
        cta: "Request a quote",
        highlighted: false,
      },
    ],
    included: {
      title: "What's included — and what the price actually buys",
      intro:
        "The number on the invoice covers a delivery system, not a salary. Here's the split, because you'd ask anyway:",
      rows: [
        { label: "Dedicated specialist(s), fair-paid at 2–4x local market", starter: "1 specialist", full: "3–5 specialists" },
        { label: "Senior European QA review before every delivery", starter: "Included", full: "Dedicated QA lead" },
        { label: "Pod management, retention and replacements", starter: "Included", full: "Included" },
        { label: "SLA with contractual remedies", starter: "Included", full: "Custom SLA" },
        { label: "GDPR: DPA + Standard Contractual Clauses", starter: "Included", full: "Included" },
        { label: "Recruiting, vetting and onboarding costs", starter: "Zero", full: "Zero" },
        { label: "Commitment", starter: "Monthly, 30-day notice", full: "Quarterly, 30-day notice" },
      ],
    },
    why: {
      title: "Why not just hire two LatAm freelancers for the same money?",
      body: [
        "You can — Hire With Near sells mid-level LatAm marketers at $2,000–4,500/month, and for a US agency on US hours that's often the right call. We'd rather tell you that than pretend the alternative doesn't exist.",
        "What that money doesn't buy is the part that fails in practice: someone accountable for quality before your client sees the work, someone replacing an underperformer while delivery keeps running, and someone holding the GDPR paperwork for an EU data controller. That layer is the product. The specialists are excellent — the system around them is what you're paying for.",
      ],
    },
    faq: [
      { q: "Why is the starter pod 'introductory' pricing?", a: "Because we're new and we price for proof. Early clients get the €2,000 entry point locked for their first year; the list price will move toward €2,800 as case studies accumulate. We say this openly rather than inventing urgency." },
      { q: "Are there setup fees?", a: "No setup fees, no recruiting fees, no conversion fees. Scoping, matching and onboarding are part of the price. Your first invoice lands after the trial." },
      { q: "What does the trial cost?", a: "The trial runs at reduced risk: real deliverables for two weeks, and you pay only if you continue. The exact trial terms are fixed in the proposal before you commit to anything." },
      { q: "Can I mix roles in a starter pod?", a: "A starter pod is one specialist. If you need a paid media + design combination, that's a two-seat pod — we'll quote it precisely, usually well under two local salaries." },
      { q: "What currency and billing?", a: "EUR invoices, monthly in arrears after the trial, standard EU B2B terms. UK clients can be billed in GBP if preferred." },
    ],
  },
  it: {
    seoTitle: "Prezzi: Pod Marketing Gestiti da €2.000/mese | enable.talent",
    seoDescription:
      "Pod starter da €2.000/mese, pod full da €6.000 su preventivo. Gestione, QA senior europeo, garanzia di replacement e burocrazia GDPR inclusi. Paghi solo dopo il trial di 2 settimane.",
    title: "Fasce oneste, non un listino rigido.",
    intro:
      "Due formati. Entrambi includono gestione, QA senior europeo, garanzia di replacement e la parte GDPR. Il prezzo esatto dipende da ruoli e seniority — quotiamo dopo la call di scoping, e la prima fattura arriva solo dopo il trial.",
    tiers: [
      {
        name: "Pod starter",
        price: "da €2.000",
        priceNote: "/mese · prezzo introduttivo",
        description: "Uno specialist dedicato più l'intero layer di gestione e QA. Il modo a rischio più basso per testare il modello su deliverable veri.",
        features: [
          "1 specialist dedicato (qualsiasi ruolo)",
          "QA senior europeo su ogni deliverable",
          "Gestione del pod e capacity planning",
          "Trial di 2 settimane · paghi solo dopo",
          "Replacement gratuito, 60–90 giorni",
          "SLA + DPA/SCC inclusi",
          "Scali su o giù con 30 giorni di preavviso",
        ],
        cta: "Parti dalla call di scoping",
        highlighted: true,
      },
      {
        name: "Pod full",
        price: "da €6.000",
        priceNote: "/mese · su preventivo",
        description: "Un'unità di delivery multi-ruolo — tipicamente 3–5 specialist — costruita sulle tue linee di servizio, con QA lead dedicato.",
        features: [
          "3–5 specialist dedicati, ruoli misti",
          "QA lead senior europeo dedicato",
          "Report qualità settimanale e review mensili",
          "Integrazione white-label nel tuo workflow",
          "Accesso prioritario alla bench nei picchi",
          "Tutto quello dello Starter, a scala di pod",
        ],
        cta: "Richiedi un preventivo",
        highlighted: false,
      },
    ],
    included: {
      title: "Cosa è incluso — e cosa compra davvero il prezzo",
      intro: "Il numero in fattura copre un sistema di delivery, non uno stipendio. Ecco lo spacchettamento, tanto l'avresti chiesto:",
      rows: [
        { label: "Specialist dedicati, pagati 2–4x il mercato locale", starter: "1 specialist", full: "3–5 specialist" },
        { label: "Review QA senior europea prima di ogni consegna", starter: "Inclusa", full: "QA lead dedicato" },
        { label: "Gestione pod, retention e replacement", starter: "Inclusa", full: "Inclusa" },
        { label: "SLA con rimedi contrattuali", starter: "Incluso", full: "SLA custom" },
        { label: "GDPR: DPA + Standard Contractual Clauses", starter: "Inclusi", full: "Inclusi" },
        { label: "Costi di recruiting, vetting e onboarding", starter: "Zero", full: "Zero" },
        { label: "Impegno", starter: "Mensile, preavviso 30 giorni", full: "Trimestrale, preavviso 30 giorni" },
      ],
    },
    why: {
      title: "Perché non assumere due freelance LatAm con gli stessi soldi?",
      body: [
        "Puoi — Hire With Near vende marketer LatAm mid-level a $2.000–4.500/mese, e per un'agenzia USA su orari USA spesso è la scelta giusta. Preferiamo dirtelo, invece di fingere che l'alternativa non esista.",
        "Quello che quei soldi non comprano è la parte che in pratica si rompe: qualcuno responsabile della qualità prima che il tuo cliente veda il lavoro, qualcuno che sostituisce chi non performa mentre la delivery continua, e qualcuno che tiene la burocrazia GDPR per un data controller UE. Quel layer è il prodotto. Gli specialist sono eccellenti — il sistema intorno è ciò che paghi.",
      ],
    },
    faq: [
      { q: "Perché il pod starter è a prezzo 'introduttivo'?", a: "Perché siamo nuovi e prezziamo per costruire proof. I primi clienti bloccano l'ingresso a €2.000 per il primo anno; il prezzo di listino salirà verso €2.800 man mano che i casi studio si accumulano. Lo diciamo apertamente invece di inventare urgenza." },
      { q: "Ci sono costi di setup?", a: "Nessun setup fee, nessuna fee di recruiting, nessuna conversion fee. Scoping, matching e onboarding sono nel prezzo. La prima fattura arriva dopo il trial." },
      { q: "Quanto costa il trial?", a: "Il trial gira a rischio ridotto: deliverable veri per due settimane, e paghi solo se continui. I termini esatti del trial sono fissati nella proposta prima di qualsiasi impegno." },
      { q: "Posso mischiare ruoli in un pod starter?", a: "Il pod starter è un solo specialist. Se ti serve una combinazione paid media + design, è un pod da due posti — lo quotiamo con precisione, di solito ben sotto due stipendi locali." },
      { q: "Valuta e fatturazione?", a: "Fatture in EUR, mensili posticipate dopo il trial, termini B2B standard UE. I clienti UK possono essere fatturati in GBP se preferiscono." },
    ],
  },
};
