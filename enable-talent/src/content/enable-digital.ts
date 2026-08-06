import type { Locale } from "@/lib/site";

interface EnableDigitalContent {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** Short teaser used for the bridge section on the home page. */
  teaser: { title: string; body: string; cta: string };
  rightDoor: {
    number: string;
    title: string;
    intro: string;
    cases: { title: string; body: string; verdict: string; href: "enable-digital" | "talent" }[];
  };
  relation: {
    number: string;
    title: string;
    body: string[];
  };
  cta: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
  };
}

export const enableDigital: Record<Locale, EnableDigitalContent> = {
  en: {
    seoTitle: "Looking for Italian Senior PMs? Talk to Enable Digital | enable.talent",
    seoDescription:
      "enable.talent sells managed offshore delivery pods. If you need Italian project management or senior in-market specialists, our sister agency Enable Digital is the right door — here's how to tell which one you need.",
    eyebrow: "Sister company",
    title: "Sometimes we're the wrong door. Here's the right one.",
    intro:
      "enable.talent sells one thing: managed marketing delivery capacity, produced in Nairobi under senior European QA. If what you actually need is Italian project management or a senior specialist in your market, sending you to a pod would waste your money and our reputation. Enable Digital handles that side.",
    teaser: {
      title: "Need Italian project management instead?",
      body: "Pods give you delivery throughput. If your gap is senior judgment, client-facing project management or in-market Italian specialists, our sister agency Enable Digital is the right door — and we'll say so before you buy the wrong thing.",
      cta: "See which one you need",
    },
    rightDoor: {
      number: "01",
      title: "Which door is yours?",
      intro:
        "Four situations we see constantly. The verdict column is what we'd tell you on a call, unprompted:",
      cases: [
        {
          title: "\"We're turning down work because delivery is full.\"",
          body: "Campaigns, content, pages and reports are queuing behind the same overloaded people. The work is definable and repeatable; the constraint is throughput.",
          verdict: "A pod. That's exactly the problem it solves.",
          href: "talent",
        },
        {
          title: "\"We need someone to run the project and face the client.\"",
          body: "Scope, planning, stakeholder management, escalations — in Italian, in your timezone, with authority to make calls in front of the client.",
          verdict: "Enable Digital. A pod is capacity, not client-facing seniority.",
          href: "enable-digital",
        },
        {
          title: "\"We need a senior strategist who owns the outcome.\"",
          body: "Someone accountable for the plan itself — positioning, channel strategy, the argument you make to the client's board.",
          verdict: "Enable Digital, or hire locally. Don't buy a pod for judgment.",
          href: "enable-digital",
        },
        {
          title: "\"Both — we need a strategist and the hands to execute.\"",
          body: "The most common shape in growing agencies: senior direction in Italy, production volume that Italian salaries can't sustain.",
          verdict: "Both doors. Enable Digital sets direction, the pod executes under its QA.",
          href: "talent",
        },
      ],
    },
    relation: {
      number: "02",
      title: "How the two companies relate",
      body: [
        "Enable Digital is our Italian sister agency: project management and digital delivery for Italian clients. It is also client zero for the pod model — its own delivery runs on a Nairobi pod, which is how we know the model survives real agency standards.",
        "The senior European QA layer inside every enable.talent pod comes from there. When your pod's QA lead vetoes a deliverable, that's an Enable Digital marketer applying the standards they use on their own clients — not an account manager reading a checklist.",
        "Practically: two companies, one quality bar. You can buy from either without buying from both, and neither of us gets paid for sending you to the wrong one.",
      ],
    },
    cta: {
      title: "Still not sure which you need?",
      body: "Book the scoping call anyway. If the answer is Enable Digital, we'll introduce you and close our own file — that costs us one call and saves you a quarter.",
      primary: "Book a call with us",
      secondary: "Go to enabledigital.it",
    },
  },
  it: {
    seoTitle: "Cerchi PM Senior Italiani? Parla con Enable Digital | enable.talent",
    seoDescription:
      "enable.talent vende pod di delivery offshore gestiti. Se ti serve project management italiano o personale senior in-market, la porta giusta è la nostra agenzia sorella Enable Digital — ecco come capire quale ti serve.",
    eyebrow: "Società sorella",
    title: "A volte siamo la porta sbagliata. Questa è quella giusta.",
    intro:
      "enable.talent vende una cosa sola: capacità di delivery marketing gestita, prodotta a Nairobi sotto QA senior europeo. Se quello che ti serve davvero è project management italiano o uno specialist senior nel tuo mercato, mandarti su un pod sprecherebbe i tuoi soldi e la nostra reputazione. Quel lato lo copre Enable Digital.",
    teaser: {
      title: "Ti serve invece project management italiano?",
      body: "I pod ti danno throughput di delivery. Se il tuo buco è giudizio senior, project management che parla col cliente o specialist italiani in-market, la porta giusta è la nostra agenzia sorella Enable Digital — e te lo diciamo prima che tu compri la cosa sbagliata.",
      cta: "Scopri quale ti serve",
    },
    rightDoor: {
      number: "01",
      title: "Qual è la tua porta?",
      intro: "Quattro situazioni che vediamo di continuo. Il verdetto è quello che ti diremmo in call, senza che tu lo chieda:",
      cases: [
        {
          title: "«Rifiutiamo lavoro perché la delivery è piena.»",
          body: "Campagne, contenuti, pagine e report in coda dietro le stesse persone sovraccariche. Il lavoro è definibile e ripetibile; il vincolo è il throughput.",
          verdict: "Un pod. È esattamente il problema che risolve.",
          href: "talent",
        },
        {
          title: "«Ci serve qualcuno che gestisca il progetto e parli col cliente.»",
          body: "Scope, pianificazione, gestione degli stakeholder, escalation — in italiano, nel tuo fuso, con l'autorità di decidere davanti al cliente.",
          verdict: "Enable Digital. Un pod è capacità, non seniority client-facing.",
          href: "enable-digital",
        },
        {
          title: "«Ci serve uno strategist senior che risponda del risultato.»",
          body: "Qualcuno responsabile del piano in sé — posizionamento, strategia di canale, l'argomentazione che porti al board del cliente.",
          verdict: "Enable Digital, o assumi in locale. Non comprare un pod per il giudizio.",
          href: "enable-digital",
        },
        {
          title: "«Entrambi — ci serve uno strategist e le mani per eseguire.»",
          body: "La forma più comune nelle agenzie in crescita: direzione senior in Italia, volume di produzione che gli stipendi italiani non reggono.",
          verdict: "Entrambe le porte. Enable Digital dà la direzione, il pod esegue sotto il suo QA.",
          href: "talent",
        },
      ],
    },
    relation: {
      number: "02",
      title: "Come sono legate le due società",
      body: [
        "Enable Digital è la nostra agenzia sorella italiana: project management e delivery digitale per clienti italiani. È anche il cliente zero del modello pod — la sua delivery gira su un pod di Nairobi, ed è così che sappiamo che il modello regge gli standard di un'agenzia vera.",
        "Il layer di QA senior europeo dentro ogni pod enable.talent viene da lì. Quando il QA lead del tuo pod boccia un deliverable, è un marketer di Enable Digital che applica gli standard che usa sui propri clienti — non un account che legge una checklist.",
        "In pratica: due società, un'unica asticella di qualità. Puoi comprare da una senza comprare dall'altra, e nessuno dei due viene pagato per mandarti dalla parte sbagliata.",
      ],
    },
    cta: {
      title: "Ancora non sai quale ti serve?",
      body: "Prenota comunque la call di scoping. Se la risposta è Enable Digital, ti presentiamo e chiudiamo la nostra pratica: a noi costa una call, a te fa risparmiare un trimestre.",
      primary: "Prenota una call con noi",
      secondary: "Vai su enabledigital.it",
    },
  },
};
