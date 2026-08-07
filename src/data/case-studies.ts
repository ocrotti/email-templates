import type { RouteKey } from '../lib/routes';

/**
 * Un risultato misurato di un caso studio.
 *
 * `value` è il valore già formattato per la lingua (es. "38", "2,4", "12").
 * `to` e `suffix` servono solo se il numero va animato con <Counter />:
 * senza `to` il risultato viene reso come dato statico.
 * Ogni risultato qui dentro deve essere verificabile e autorizzato dal cliente.
 */
export interface CaseStudyResult {
  label: { it: string; en: string };
  value: string;
  to?: number;
  suffix?: string;
}

/**
 * Un caso studio.
 *
 * Regola redazionale (vale più della struttura dati): niente numeri stimati,
 * niente nomi o loghi senza autorizzazione scritta. Se un dato non è
 * verificabile, non entra qui. Finché il cliente non approva, `draft: true`.
 */
export interface CaseStudy {
  /** Slug per lingua, senza slash. Deve restare stabile: è l'URL. */
  slug: { it: string; en: string };
  title: { it: string; en: string };
  /** Settore e dimensione, es. "Manifattura · 80 dipendenti". */
  sector: { it: string; en: string };
  /** Verticale collegato: chiave di routes.ts (serviceCompliance | serviceData | serviceCrm | serviceWeb). */
  vertical: RouteKey;
  /** Da dove si partiva: problema, vincoli, scadenze. */
  context: { it: string; en: string };
  /** Cosa abbiamo fatto: perimetro, durata, chi ha lavorato. */
  intervention: { it: string; en: string };
  /** Numeri misurati e autorizzati dal cliente. Mai stime. */
  results: CaseStudyResult[];
  /** true = non pubblicato: escluso da indice e generazione pagine. */
  draft?: boolean;
}

/**
 * Casi studio pubblicati.
 *
 * Volutamente vuoto: i primi casi sono in pubblicazione e usciranno solo
 * con l'autorizzazione scritta dei clienti. Con l'array vuoto le pagine
 * di dettaglio non vengono generate — è il comportamento previsto.
 */
export const caseStudies: CaseStudy[] = [];

/*
 * Esempio di struttura (da copiare, sostituendo i [PLACEHOLDER] con dati reali
 * e autorizzati dal cliente). Tenere l'oggetto commentato finché non è pronto:
 *
 * {
 *   slug: {
 *     it: '[PLACEHOLDER: slug-it-del-caso]',
 *     en: '[PLACEHOLDER: slug-en-del-caso]',
 *   },
 *   title: {
 *     it: '[PLACEHOLDER: titolo IT — il risultato, non il nome del progetto]',
 *     en: '[PLACEHOLDER: EN title — the outcome, not the project name]',
 *   },
 *   sector: {
 *     it: '[PLACEHOLDER: settore] · [PLACEHOLDER: n. dipendenti]',
 *     en: '[PLACEHOLDER: sector] · [PLACEHOLDER: headcount]',
 *   },
 *   vertical: 'serviceCompliance',
 *   context: {
 *     it: '[PLACEHOLDER: da dove si partiva — problema, vincoli, scadenza normativa o commerciale]',
 *     en: '[PLACEHOLDER: the starting point — problem, constraints, regulatory or commercial deadline]',
 *   },
 *   intervention: {
 *     it: '[PLACEHOLDER: cosa abbiamo fatto — perimetro, durata, senior coinvolti, cosa resta al cliente]',
 *     en: '[PLACEHOLDER: what we did — scope, duration, seniors involved, what stays with the client]',
 *   },
 *   results: [
 *     {
 *       label: {
 *         it: '[PLACEHOLDER: cosa misura questo numero]',
 *         en: '[PLACEHOLDER: what this number measures]',
 *       },
 *       value: '[PLACEHOLDER]',
 *       to: 0,
 *       suffix: '%',
 *     },
 *   ],
 *   draft: true,
 * }
 */
