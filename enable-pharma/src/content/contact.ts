import type { Dict, SeoMeta } from "./types";

export interface ContactFormLabels {
  name: string;
  email: string;
  emailPlaceholder: string;
  company: string;
  role: string;
  rolePlaceholder: string;
  roles: string[];
  area: string;
  areaPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  privacy: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  requiredNote: string;
}

interface ContactContent {
  meta: SeoMeta;
  hero: {
    kicker: string;
    title: string;
    subtitle: string;
  };
  aside: {
    title: string;
    body: string;
    steps: string[];
    responseNote: string;
    emailLabel: string;
  };
  form: ContactFormLabels;
}

export const contact: Dict<ContactContent> = {
  it: {
    meta: {
      title: "Contatti — Richiedi l'audit | Enable Pharma",
      description:
        "Richiedi l'Awareness & Compliance Audit: 4–6 settimane per definire perimetro normativo, stakeholder e roadmap sulla vostra patologia.",
    },
    hero: {
      kicker: "Contatti",
      title: "Iniziamo dal perimetro.",
      subtitle:
        "Raccontateci patologia, funzione e obiettivo. Vi rispondiamo entro 24 ore lavorative con una proposta di primo confronto — senza pitch da 60 slide.",
    },
    aside: {
      title: "Come funziona il primo contatto",
      body: "Nessun automatismo commerciale: il messaggio arriva a chi progetta i presidi, non a un CRM.",
      steps: [
        "Call di 30 minuti per capire contesto e vincoli",
        "Proposta di audit con perimetro e prezzo fisso",
        "Audit di 4–6 settimane con roadmap approvabile",
      ],
      responseNote: "Risposta entro 24 ore lavorative.",
      emailLabel: "Oppure scriveteci direttamente:",
    },
    form: {
      name: "Nome e cognome",
      email: "Email di lavoro",
      emailPlaceholder: "nome.cognome@azienda.it",
      company: "Azienda",
      role: "Funzione",
      rolePlaceholder: "Seleziona una funzione",
      roles: [
        "Medical Affairs",
        "Corporate / Public Affairs",
        "Patient Advocacy",
        "Market Access / Brand",
        "Altro",
      ],
      area: "Area terapeutica",
      areaPlaceholder: "Es. malattie rare, ematologia, IBD…",
      message: "Messaggio",
      messagePlaceholder:
        "Due righe sul contesto: patologia, obiettivo, tempi.",
      privacy:
        "Ho letto l'informativa privacy e acconsento al trattamento dei dati per rispondere alla mia richiesta.",
      submit: "Invia la richiesta",
      sending: "Invio in corso…",
      success:
        "Richiesta ricevuta. Vi rispondiamo entro 24 ore lavorative.",
      error: "Qualcosa non ha funzionato. Riprovate, o scrivete a",
      requiredNote: "Tutti i campi sono obbligatori, tranne l'area terapeutica.",
    },
  },
  en: {
    meta: {
      title: "Contact — Request the audit | Enable Pharma",
      description:
        "Request the Awareness & Compliance Audit: 4–6 weeks to define the regulatory perimeter, stakeholders and awareness roadmap for your condition.",
    },
    hero: {
      kicker: "Contact",
      title: "Let's start from the perimeter.",
      subtitle:
        "Tell us about the condition, your function and your goal. We reply within one business day with a proposal for a first conversation — no 60-slide pitch.",
    },
    aside: {
      title: "How the first contact works",
      body: "No sales automation: your message reaches the people who design the platforms, not a CRM.",
      steps: [
        "A 30-minute call to understand context and constraints",
        "An audit proposal with scope and fixed price",
        "A 4–6 week audit with an approvable roadmap",
      ],
      responseNote: "Reply within one business day.",
      emailLabel: "Or write to us directly:",
    },
    form: {
      name: "Full name",
      email: "Work email",
      emailPlaceholder: "name.surname@company.com",
      company: "Company",
      role: "Function",
      rolePlaceholder: "Select your function",
      roles: [
        "Medical Affairs",
        "Corporate / Public Affairs",
        "Patient Advocacy",
        "Market Access / Brand",
        "Other",
      ],
      area: "Therapeutic area",
      areaPlaceholder: "E.g. rare diseases, haematology, IBD…",
      message: "Message",
      messagePlaceholder:
        "Two lines of context: condition, goal, timing.",
      privacy:
        "I have read the privacy notice and consent to the processing of my data to answer this request.",
      submit: "Send the request",
      sending: "Sending…",
      success: "Request received. We reply within one business day.",
      error: "Something went wrong. Please try again, or write to",
      requiredNote: "All fields are required except the therapeutic area.",
    },
  },
};
