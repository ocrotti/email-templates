import type { Dict, Kpi, SeoMeta } from "./types";

interface CaseBlock {
  index: string;
  title: string;
  body: string;
  items: string[];
}

interface CaseStudyContent {
  meta: SeoMeta;
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
    disclaimer: string;
  };
  scenario: {
    title: string;
    body: string[];
    constraints: string[];
    constraintsTitle: string;
  };
  blocksTitle: string;
  blocks: CaseBlock[];
  scoring: {
    title: string;
    intro: string;
    axes: { name: string; body: string }[];
    tiers: { name: string; body: string }[];
    tiersTitle: string;
  };
  results: {
    title: string;
    intro: string;
    kpis: Kpi[];
    note: string;
  };
  closing: {
    title: string;
    body: string;
    cta: string;
  };
}

export const caseStudy: Dict<CaseStudyContent> = {
  it: {
    meta: {
      title: "Progetto tipo: awareness malattie rare | Enable Pharma",
      description:
        "Case study anonimizzato: piattaforma di disease awareness unbranded per le malattie rare della coagulazione, con programma DOL, podcast e farmacovigilanza.",
    },
    hero: {
      kicker: "Progetto tipo",
      title: "Una community per una malattia rara della coagulazione.",
      subtitle:
        "Come si costruisce un presidio di awareness continuativo, compliant e misurabile: le attività reali, nell'ordine reale.",
      disclaimer:
        "Progetto anonimizzato, basato su attività reali del settore e presentato come esempio. Nessun riferimento ad aziende, farmaci o piattaforme esistenti. KPI dichiarati come illustrativi.",
    },
    scenario: {
      title: "Lo scenario",
      body: [
        "Un'azienda farmaceutica attiva nelle malattie rare della coagulazione vuole presidiare l'awareness in modo continuativo. La patologia ha un ritardo diagnostico significativo, una community di pazienti piccola e dispersa, e associazioni attive ma con risorse limitate.",
        "Il vincolo di partenza è duplice: nessun rischio normativo — la comunicazione deve restare rigorosamente istituzionale e unbranded — e nessuna campagna spot: l'obiettivo è un asset che duri, non un picco di reach.",
      ],
      constraintsTitle: "Il perimetro",
      constraints: [
        "Comunicazione unbranded: mai il farmaco, mai il principio attivo",
        "Farmacovigilanza attiva su tutti i canali dal primo giorno",
        "Dati della community trattati con consenso esplicito GDPR art. 9",
        "Trasparenza dei rapporti con le associazioni pazienti",
        "Ogni contenuto in review MLR prima della pubblicazione",
      ],
    },
    blocksTitle: "Cosa è stato costruito",
    blocks: [
      {
        index: "A",
        title: "Piattaforma di awareness unbranded",
        body: "L'hub della patologia: un luogo istituzionale dove chi cerca risposte trova informazione revisionata, storie e orientamento — senza mai un riferimento a terapie specifiche.",
        items: [
          "Sezioni: cos'è la patologia, sintomi, convivere con, storie reali",
          "Contenuti con revisione medica, fonti citate e data di revisione",
          "«Trova aiuto»: centri di riferimento e associazioni sul territorio",
          "Layer compliance: disclaimer, trasparenza sponsor, canale segnalazione eventi avversi",
          "Accessibilità WCAG AA: contrasti, tastiera, trascrizioni",
        ],
      },
      {
        index: "B",
        title: "Programma Digital Opinion Leader",
        body: "Medici-creator selezionati con una matrice di scoring proprietaria a tre assi e organizzati in un panel a tre fasce, per portare rigore scientifico dove il pubblico già si informa.",
        items: [
          "Scouting e scoring documentato di ogni profilo",
          "Verifica dei conflitti di interesse pre-ingaggio",
          "Contrattualizzazione con obblighi di trasparenza",
          "Co-publishing sui canali della piattaforma e dei DOL",
        ],
      },
      {
        index: "C",
        title: "Serie podcast / vodcast",
        body: "Una stagione di episodi unbranded distribuiti sulle principali piattaforme audio e video: voci di clinici, pazienti e caregiver, ogni episodio con revisione medico-scientifica.",
        items: [
          "6–10 episodi a stagione, formato audio + video",
          "Distribuzione multipiattaforma",
          "Revisione medico-scientifica di ogni episodio",
          "Trascrizioni complete per accessibilità e SEO",
        ],
      },
      {
        index: "D",
        title: "Community e social con farmacovigilanza integrata",
        body: "Il presidio quotidiano: piano editoriale continuativo, moderazione documentata e un workflow di farmacovigilanza che intercetta e gestisce le segnalazioni dentro le finestre di reporting.",
        items: [
          "Piano editoriale mensile con review medica",
          "Moderazione documentata con template approvati",
          "Social listening con escalation a personale PV qualificato",
          "SLA di gestione segnalazioni monitorati e rendicontati",
        ],
      },
      {
        index: "E",
        title: "Governance e compliance operativa",
        body: "L'infrastruttura invisibile che rende tutto difendibile: ogni contenuto tracciato, ogni rapporto trasparente, ogni consenso documentato.",
        items: [
          "Review MLR pre-pubblicazione con audit trail",
          "Registro trasferimenti di valore (Codice Farmindustria / EFPIA)",
          "Consenso esplicito e granulare per i dati della community",
          "Reporting trimestrale con comitato di indirizzo",
        ],
      },
    ],
    scoring: {
      title: "La matrice di scoring DOL",
      intro:
        "Ogni medico-creator è valutato su tre assi, con punteggio numerico e scheda: la selezione è difendibile davanti a legal, non una lista di nomi simpatici.",
      axes: [
        {
          name: "Standard scientifici",
          body: "Pubblicazioni verificabili, ruoli in società scientifiche, coerenza tra specializzazione e patologia.",
        },
        {
          name: "Standard comunicativi",
          body: "Qualità dell'engagement, capacità divulgativa, storico dei contenuti pubblicati.",
        },
        {
          name: "Affinità valoriale",
          body: "Trasparenza delle fonti, linguaggio non stigmatizzante, assenza di conflitti commerciali rilevanti.",
        },
      ],
      tiersTitle: "Panel a tre fasce",
      tiers: [
        {
          name: "Core panel",
          body: "Medici-creator con audience consolidata, indicativamente tra 100 e 500 mila follower: producono i contenuti pilastro della piattaforma.",
        },
        {
          name: "Amplificatori",
          body: "Profili top-of-funnel che estendono la reach dei contenuti verso pubblici nuovi.",
        },
        {
          name: "KOL istituzionali",
          body: "Endorsement scientifico e autorevolezza: garantiscono il rigore percepito del progetto.",
        },
      ],
    },
    results: {
      title: "Cosa si misura",
      intro:
        "KPI non promozionali, letti trimestre su trimestre. I numeri qui sotto sono illustrativi di un progetto tipo, dichiarati come tali.",
      kpis: [
        { value: 40, prefix: "+", suffix: "%", label: "crescita trimestrale media della community" },
        { value: 8, label: "episodi pubblicati nella prima stagione" },
        { value: 65, suffix: "%", label: "tasso medio di completamento degli episodi" },
        { value: 100, suffix: "%", label: "segnalazioni PV gestite entro le finestre" },
        { value: 3, label: "associazioni pazienti coinvolte con disclosure" },
        { value: 14, unit: "mesi", label: "di presidio continuativo al primo rinnovo" },
      ],
      note: "Ascolti e download della serie, reach segmentata per pubblico (pazienti/caregiver vs operatori sanitari), sentiment e SLA completano il quadro nel reporting trimestrale.",
    },
    closing: {
      title: "Ogni progetto parte dallo stesso punto",
      body: "L'Awareness & Compliance Audit: 4–6 settimane per definire perimetro normativo, stakeholder e roadmap della vostra patologia.",
      cta: "Richiedi l'audit",
    },
  },
  en: {
    meta: {
      title: "Example project: rare disease awareness | Enable Pharma",
      description:
        "Anonymised case study: an unbranded disease awareness platform for rare coagulation disorders, with a DOL programme, podcast and pharmacovigilance.",
    },
    hero: {
      kicker: "Example project",
      title: "A community for a rare coagulation disorder.",
      subtitle:
        "How a continuous, compliant, measurable awareness presence gets built: the real activities, in the real order.",
      disclaimer:
        "Anonymised project, based on real industry activities and presented as an example. No reference to existing companies, drugs or platforms. KPIs declared as illustrative.",
    },
    scenario: {
      title: "The scenario",
      body: [
        "A pharmaceutical company active in rare coagulation disorders wants a continuous awareness presence. The condition has a significant diagnostic delay, a small and dispersed patient community, and active associations with limited resources.",
        "The starting constraint is twofold: zero regulatory risk — communication must remain strictly institutional and unbranded — and no one-off campaign: the goal is an asset that lasts, not a reach spike.",
      ],
      constraintsTitle: "The perimeter",
      constraints: [
        "Unbranded communication: never the drug, never the active ingredient",
        "Pharmacovigilance active on all channels from day one",
        "Community data processed with explicit GDPR art. 9 consent",
        "Transparent relationships with patient associations",
        "Every piece of content through MLR review before publication",
      ],
    },
    blocksTitle: "What was built",
    blocks: [
      {
        index: "A",
        title: "Unbranded awareness platform",
        body: "The condition hub: an institutional place where people searching for answers find reviewed information, stories and orientation — without ever a reference to specific therapies.",
        items: [
          "Sections: what the condition is, symptoms, living with it, real stories",
          "Content under medical review, with cited sources and review dates",
          "\"Find help\": reference centres and local patient associations",
          "Compliance layer: disclaimers, sponsor transparency, adverse event reporting channel",
          "WCAG AA accessibility: contrast, keyboard, transcripts",
        ],
      },
      {
        index: "B",
        title: "Digital Opinion Leader programme",
        body: "Physician-creators selected with a proprietary three-axis scoring matrix and organised into a three-tier panel, bringing scientific rigour where the public already looks for information.",
        items: [
          "Documented scouting and scoring of every profile",
          "Conflict-of-interest checks before engagement",
          "Contracts with explicit transparency obligations",
          "Co-publishing across platform and DOL channels",
        ],
      },
      {
        index: "C",
        title: "Podcast / vodcast series",
        body: "A season of unbranded episodes distributed on the main audio and video platforms: voices of clinicians, patients and caregivers, every episode under medical-scientific review.",
        items: [
          "6–10 episodes per season, audio + video format",
          "Multi-platform distribution",
          "Medical-scientific review of every episode",
          "Full transcripts for accessibility and SEO",
        ],
      },
      {
        index: "D",
        title: "Community and social with integrated pharmacovigilance",
        body: "The daily presence: a continuous editorial plan, documented moderation and a pharmacovigilance workflow that intercepts and manages reports within reporting windows.",
        items: [
          "Monthly editorial plan under medical review",
          "Documented moderation with approved templates",
          "Social listening with escalation to qualified PV personnel",
          "Report-handling SLAs monitored and reported quarterly",
        ],
      },
      {
        index: "E",
        title: "Governance and operational compliance",
        body: "The invisible infrastructure that makes everything defensible: every piece of content tracked, every relationship transparent, every consent documented.",
        items: [
          "Pre-publication MLR review with audit trail",
          "Transfer-of-value register (Farmindustria / EFPIA Code)",
          "Explicit, granular consent for community data",
          "Quarterly reporting with steering committee",
        ],
      },
    ],
    scoring: {
      title: "The DOL scoring matrix",
      intro:
        "Every physician-creator is scored on three axes, with a numeric score and profile card: selection you can defend in front of legal, not a list of likeable names.",
      axes: [
        {
          name: "Scientific standards",
          body: "Verifiable publications, roles in scientific societies, coherence between specialisation and condition.",
        },
        {
          name: "Communication standards",
          body: "Engagement quality, ability to explain, track record of published content.",
        },
        {
          name: "Value alignment",
          body: "Source transparency, non-stigmatising language, absence of relevant commercial conflicts.",
        },
      ],
      tiersTitle: "Three-tier panel",
      tiers: [
        {
          name: "Core panel",
          body: "Physician-creators with an established audience, indicatively between 100k and 500k followers: they produce the platform's pillar content.",
        },
        {
          name: "Amplifiers",
          body: "Top-of-funnel profiles extending content reach to new audiences.",
        },
        {
          name: "Institutional KOLs",
          body: "Scientific endorsement and authority: they guarantee the project's perceived rigour.",
        },
      ],
    },
    results: {
      title: "What gets measured",
      intro:
        "Non-promotional KPIs, read quarter over quarter. The figures below are illustrative of an example project, declared as such.",
      kpis: [
        { value: 40, prefix: "+", suffix: "%", label: "average quarterly community growth" },
        { value: 8, label: "episodes published in the first season" },
        { value: 65, suffix: "%", label: "average episode completion rate" },
        { value: 100, suffix: "%", label: "PV reports handled within windows" },
        { value: 3, label: "patient associations engaged with disclosure" },
        { value: 14, unit: "months", label: "of continuous presence at first renewal" },
      ],
      note: "Series listens and downloads, reach segmented by audience (patients/caregivers vs healthcare professionals), sentiment and SLAs complete the picture in quarterly reporting.",
    },
    closing: {
      title: "Every project starts from the same point",
      body: "The Awareness & Compliance Audit: 4–6 weeks to define the regulatory perimeter, stakeholders and roadmap for your condition.",
      cta: "Request the audit",
    },
  },
};
