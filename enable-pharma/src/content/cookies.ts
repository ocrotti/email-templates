import type { Dict } from "./types";

interface ConsentContent {
  title: string;
  body: string;
  accept: string;
  reject: string;
  policyLabel: string;
  /** Footer entry that reopens the banner to change or withdraw consent */
  preferences: string;
  /** Announced when a choice is saved */
  saved: string;
}

/**
 * Consent copy. No pre-ticked anything, no "we care about your privacy"
 * padding, and reject is worded and weighted exactly like accept — the
 * brief rules out dark patterns, and a consent obtained through one is
 * not consent.
 */
export const cookies: Dict<ConsentContent> = {
  it: {
    title: "Cookie e misurazione",
    body: "Un cookie tecnico ricorda la lingua scelta: serve al sito e non richiede consenso. Con il vostro consenso raccogliamo anche statistiche di navigazione anonime, per capire quali contenuti servono davvero. Nessuna profilazione pubblicitaria, nessun dato di salute, nessuna condivisione con terzi per finalità commerciali.",
    accept: "Accetta",
    reject: "Rifiuta",
    policyLabel: "Informativa privacy e cookie",
    preferences: "Preferenze cookie",
    saved: "Preferenza salvata.",
  },
  en: {
    title: "Cookies and measurement",
    body: "A technical cookie remembers the language you chose: the site needs it and it requires no consent. With your consent we also collect anonymous usage statistics, to understand which content is actually useful. No advertising profiling, no health data, nothing shared with third parties for commercial purposes.",
    accept: "Accept",
    reject: "Reject",
    policyLabel: "Privacy and cookie notice",
    preferences: "Cookie preferences",
    saved: "Preference saved.",
  },
};
