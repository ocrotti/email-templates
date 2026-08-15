# Enable Pharma — sito corporate

Sito B2B di Enable Pharma: piattaforme di **disease awareness istituzionali (unbranded)
gestite come servizio ricorrente** per le aziende farmaceutiche.

Posizionamento portante: _"la community di awareness compliant-by-design"_. Il sito
vende sicurezza a un buyer avverso al rischio, quindi la pagina `/compliance` è il
principale asset di conversione e ogni affermazione normativa è puntuale e verificabile.

---

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Stili | Tailwind CSS v4 (token in `src/app/globals.css`) |
| Motion | GSAP + ScrollTrigger, Lenis — caricati in dynamic import su idle |
| i18n | `next-intl` con routing localizzato (IT alla root, EN sotto `/en`) |
| Font | self-hosted via `next/font/local`, subsettati |
| Deploy | Vercel (SSG: tutte le pagine sono prerenderizzate) |

## Guardare il sito in locale

Serve **Node.js 20 o superiore** (testato su 22). Dalla cartella `enable-pharma/`:

```bash
npm install
npm run dev
```

Poi apri **http://localhost:3000**. La versione inglese è su
**http://localhost:3000/en**.

Non serve nessun file `.env` per vedere il sito: senza chiave email il form di
contatto stampa la richiesta nel terminale invece di inviarla.

Se preferisci pnpm (il lockfile committato è quello di pnpm, quindi le versioni
sono esatte al bit):

```bash
corepack enable      # una volta sola, se pnpm non è installato
pnpm install
pnpm dev
```

Per vedere il sito come sarà in produzione — statico, minificato, con i punteggi
Lighthouse riportati più sotto:

```bash
npm run build && npm start
```

### Variabili d'ambiente

| Variabile | Obbligatoria | Cosa fa |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | in produzione | Base per canonical, hreflang, sitemap e OG. Senza slash finale. |
| `RESEND_API_KEY` | **sì in produzione** | Senza chiave, in sviluppo la richiesta viene loggata; **in produzione l'API risponde 500** invece di far sparire silenziosamente un lead. |
| `CONTACT_TO_EMAIL` | no | Destinatario delle richieste (default: `info@enablepharma.it`). |
| `CONTACT_FROM_EMAIL` | no | Mittente. Il dominio va verificato su Resend. |

---

## Struttura

```
src/
├── app/[locale]/            pagine (una per rotta, IT+EN dallo stesso file)
│   ├── page.tsx             home: hero + sezioni numerate 01→08
│   ├── compliance/          impianto compliance norma per norma
│   ├── progetto-esempio/    case study anonimizzato (EN: /example-project)
│   ├── insight/             indice + [slug] articolo (EN: /insights)
│   ├── contatti/            form qualificato (EN: /contact)
│   └── privacy/             informativa (noindex)
├── app/api/contact/         API route del form
├── app/global-not-found.tsx 404 globale: rende il documento intero
├── app/apple-icon.tsx       apple-touch-icon generata (180×180)
├── content/                 TUTTO il copy, tipizzato, IT+EN affiancati
├── components/
│   ├── motion/              MotionRoot + wrapper dichiarativi
│   ├── sections/            SectionShell, ProcessTimeline, FAQAccordion
│   ├── chrome/              Header, Footer, LocaleSwitcher
│   └── forms/               ContactForm
├── lib/                     seo.ts, schema.tsx, fonts.ts, site-config.ts
└── i18n/                    routing (slug localizzati), navigation, request
```

### Cookie e misurazione

Di default il sito **non carica nessuno strumento di analisi**: l'unico cookie è
quello tecnico della lingua, non c'è banner e l'informativa dice esattamente
questo.

Impostando `NEXT_PUBLIC_GA_ID` (formato `G-XXXXXXXXXX`) si accende la catena
completa:

- il banner di consenso compare alla prima visita, con «Accetta» e «Rifiuta»
  della stessa identica dimensione e peso — rifiutare deve costare quanto
  accettare, e un consenso ottenuto con un dark pattern non è consenso;
- **prima della scelta non viene caricato niente**: lo script di misurazione non
  è nel documento finché il consenso non è dato, quindi chi ignora il banner sta
  come chi lo rifiuta;
- la scelta vive in `localStorage`, non in un cookie: rifiutare non scrive nulla;
- la voce «Preferenze cookie» nel footer riapre il banner, e revocare spegne la
  raccolta nella sessione in corso (`ga-disable-<ID>`), non solo alla visita dopo;
- la CSP in `next.config.ts` apre agli host Google **solo** se la variabile è
  impostata, e la sezione «Cookie» dell'informativa cambia testo di conseguenza.

Se si preferisce uno strumento cookieless (Vercel Web Analytics, Plausible,
Umami) il banner non serve: basta lasciare `NEXT_PUBLIC_GA_ID` vuoto e montare
lo script nel layout.

### La 404

Il guscio del documento (`<html>`/`<body>`) vive in `app/[locale]/layout.tsx`,
quindi un `notFound()` non ha un root layout in cui renderizzarsi e Next ripiega
sul suo shell di errore: pagina bianca, senza `lang`, con il title e il canonical
della home. `app/global-not-found.tsx` (abilitata da `experimental.globalNotFound`
in `next.config.ts`) rende il documento per intero e conserva lo status 404.

Perché ci arrivi davvero, `app/[locale]/layout.tsx` esporta
`dynamicParams = false`: qualunque `[locale]` fuori da `generateStaticParams` è
un routing miss, non una pagina da rendere. È anche il motivo per cui
`/favicon.ico` non finisce più in un 500 — il matcher del middleware non salta
più tutti i path con un punto, quindi vanno elencati lì i file serviti dalla root.

**Il copy non sta mai nei componenti.** Vive in `src/content/*.ts` come dizionari
tipizzati `Dict<T> = Record<"it" | "en", T>`: TypeScript fallisce la build se una
lingua manca un campo, quindi IT ed EN non possono divergere per dimenticanza.

---

## Attività ricorrenti

### Cambiare i prezzi (placeholder da confermare)

I prezzi sono **visibili** in home (sezione 06) per scelta di posizionamento. I valori
stanno in un solo posto:

```ts
// src/lib/site-config.ts
export const pricing = {
  auditPrice: "7.500",        // IT, formato italiano
  auditPriceEn: "7,500",      // EN
  platformFrom: "8.000",
  platformFromEn: "8,000",
  platformContractMonths: 24,
};
```

Sono **placeholder allineati ai benchmark di mercato**, non prezzi confermati:
vanno validati prima del go-live. Le stringhe descrittive ("una tantum · 4–6
settimane", "contratto 24 mesi") sono in `src/content/home.ts` → `investment.tiers`.

### Aggiungere un articolo in /insight

Gli articoli sono un array JSON in `src/content/insights/articles.json`. Aggiungi un
oggetto con questa forma (entrambe le lingue obbligatorie):

```jsonc
{
  "slug": { "it": "slug-italiano", "en": "english-slug" },
  "date": "2026-09-15",                    // ISO, guida l'ordinamento
  "keywords": {                            // per lingua: l'Article EN non
    "it": ["parola chiave", "..."],        // deve uscire con keyword IT
    "en": ["keyword", "..."]
  },
  "readingMinutes": 6,
  "content": {
    "it": {
      "title": "Titolo dell'articolo",
      "metaTitle": "Titolo SEO (max 60 caratteri)",
      "metaDescription": "Descrizione SEO (max 155 caratteri)",
      "excerpt": "Sommario mostrato nell'indice.",
      "sections": [
        {
          "heading": "Titolo di sezione",
          "paragraphs": ["Con [link inline](/compliance) in stile markdown."],
          "list": ["voce opzionale", "altra voce"]
        }
      ],
      "sources": [
        {
          "label": "D.Lgs. 219/2006",
          "note": "art. 113",
          "url": "https://www.normattiva.it/…"   // opzionale: solo permalink
        }                                        // istituzionali stabili
      ]
    },
    "en": { /* stessa forma */ }
  }
}
```

Nessun altro passaggio: rotte statiche, sitemap, hreflang e JSON-LD `Article` si
generano da qui. Quando una sezione ha sia `paragraphs` sia `list`, il rendering è
_primo paragrafo → lista → paragrafi restanti_ (il primo paragrafo introduce la lista).
Nei `paragraphs` e nelle `list` è supportato un markup minimo `[testo](url)` per i
link contestuali: percorsi interni completi di locale (`/compliance`,
`/en/insights/slug`) o URL `https:` esterni (che aprono in nuova scheda). Il blocco
«Articoli correlati» in fondo a ogni articolo si genera da solo.

**Vincoli editoriali** — valgono per ogni contenuto del sito, non solo per gli articoli:
nessun nome di azienda farmaceutica, farmaco, principio attivo, campagna, agenzia o
piattaforma reale; nessun claim terapeutico o consiglio medico; nessuna promessa di
risultati. Citare leggi, autorità e codici (AIFA, AGCOM, EMA, EFPIA, Farmindustria) è
invece corretto e richiesto.

### Cambiare il tema colore

Il tema attivo è **`lacca`**: carta avorio calda, inchiostro near-black caldo, accento
rosso lacca. È definito nel blocco `@theme` di `src/app/globals.css`.

Due direzioni alternative sono già scritte e documentate in fondo allo stesso file:

| Tema | Carattere |
|---|---|
| `lacca` (attivo) | avorio caldo + rosso lacca — editoriale, caldo, memorabile |
| `cobalto` | porcellana fredda + blu elettrico profondo — più product/engineering |
| `clinico` | verde clinico scuro + accento verde vivo — più istituzionale |

Per attivarne un'altra, aggiungi `data-theme` all'elemento `<html>`:

```tsx
// src/app/[locale]/layout.tsx
<html lang={locale} data-theme="cobalto" className={...}>
```

Aggiorna anche `themeColor` nell'export `viewport` dello stesso file, e **riverifica
il contrasto WCAG AA** se modifichi i valori.

### Rigenerare i font

I font sono subsettati a mano: `Archivo-Variable.woff2` passa da 88KB a 47KB
limitando gli assi variabili agli intervalli realmente usati (`wght` 300–800,
`wdth` 100–125) e i glifi al latino più la punteggiatura del sito. Serve solo se
aggiungi caratteri fuori dal set (per esempio un'altra lingua):

```bash
pip install fonttools brotli

# 1. restringe gli assi variabili
python -c "
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
f = TTFont('Archivo-Variable-full.woff2')
instancer.instantiateVariableFont(f, {'wght': (300, 800), 'wdth': (100, 125)}, inplace=True)
f.flavor = None
f.save('archivo-axes.ttf')"

# 2. sottoinsieme di glifi
pyftsubset archivo-axes.ttf --output-file=src/fonts/Archivo-Variable.woff2 \
  --flavor=woff2 --layout-features='kern,liga,ss01' \
  --unicodes='U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2212,U+2215,U+FEFF,U+FFFD'
```

Solo il taglio dritto è incluso: il design non usa mai il corsivo.

---

## Come funziona il motion

Tutte le animazioni scroll-driven passano da **un solo componente client**,
`src/components/motion/MotionRoot.tsx`. GSAP, ScrollTrigger e Lenis (~100KB) sono in
dynamic import eseguito su `requestIdleCallback`, quindi restano fuori dal percorso
critico: il first-load JS della home è ~111KB e il TBT misurato è 0–100ms.

I componenti di animazione sono **server component** che emettono solo data attribute;
MotionRoot li aggancia dopo l'idle:

| Attributo | Componente | Effetto |
|---|---|---|
| `data-reveal` | `<Reveal>` | fade + rise all'ingresso in viewport |
| `data-section-number` | `<SectionNumber>` | drift scrubbato dei numeri 01–08 |
| `data-counter` | `<Counter>` | conteggio dei KPI all'ingresso in viewport |
| `data-progress-line` | `<ProcessTimeline>` | linea di progresso disegnata allo scroll |

Le animazioni d'ingresso above-the-fold (hero) sono invece **CSS puro**
(`.split-line`, `.fade-up`, `.page-enter`): dipingono senza attendere l'hydration.

Tre invarianti da non rompere:

1. **Niente contenuto nascosto dal CSS.** MotionRoot nasconde solo gli elementi
   `[data-reveal]` che al momento dell'init sono *interamente* sotto la fold. Se un
   elemento è anche solo parzialmente visibile resta dipinto: nasconderlo causerebbe
   un flash, peggiorerebbe l'LCP e lascerebbe contenuto invisibile sul bordo inferiore
   della finestra finché l'utente non scrolla.
2. **`prefers-reduced-motion` salta il download.** Con reduced motion MotionRoot esce
   subito: GSAP e Lenis non vengono nemmeno scaricati, e le animazioni CSS sono
   annullate nel blocco `@media (prefers-reduced-motion: reduce)`.
3. **Le animazioni si riarmano a ogni cambio rotta.** L'effetto dipende da `pathname`,
   perché MotionRoot vive nel layout e non viene rimontato durante la navigazione
   client-side.

## Note su performance e accessibilità

- `--text-display` è limitato **sia in larghezza sia in altezza**:
  `clamp(2.45rem, min(8.2vw, 10.5svh), 8rem)`. Il minimo è dettato dalla parola più
  lunga e non spezzabile dell'hero (`communities,` in inglese) a 320px; il termine
  `svh` tiene headline, sottotitolo e CTA primaria sopra la fold su un portatile
  basso. Se cambi il copy dell'hero, **rimisura**.
- Sotto i 480px l'asse di larghezza scende a 100%: il taglio espanso costa più
  larghezza di quanta ne abbia il layout, e a corpo piccolo il taglio stretto si legge
  meglio.
- Nei KPI le unità testuali usano il campo `unit` (non `suffix`): `suffix` è per i
  simboli (`%`) e viene reso a corpo display, `unit` a corpo ridotto — altrimenti
  "14 mesi" va a capo e si sovrappone alla colonna accanto.
- Il selettore di lingua legge l'URL alternato `hreflang` dal `<head>` invece di
  ricostruire la rotta: gli slug degli articoli sono tradotti, quindi riusare lo
  slug corrente sull'altra lingua porterebbe a un 404.
- I pannelli chiusi (FAQ, timeline di processo) e il menu mobile chiuso usano
  `inert` / `visibility: hidden`: il collasso con `grid-template-rows: 0fr` e
  l'`opacity: 0` sono solo visivi e lascerebbero i link raggiungibili da tastiera.

---

## Verifiche

Lighthouse mobile, build di produzione (`pnpm build && pnpm start`):

| Pagina | Perf | A11y | Best Practices | SEO |
|---|---|---|---|---|
| Home IT | 93 | 100 | 100 | 100 |
| Home EN | 96 | 100 | 100 | 100 |
| /compliance | 92 | 100 | 100 | 100 |
| /progetto-esempio | 99 | 100 | 100 | 100 |
| /insight | 99 | 100 | 100 | 100 |
| Articolo | 98 | 100 | 100 | 100 |
| /contatti | 98 | 100 | 100 | 100 |

CLS 0 su tutte le pagine. La Performance oscilla di qualche punto tra un run e
l'altro (il TBT su localhost è rumoroso): i valori sopra sono un run completo, non
il migliore di molti.

L'LCP simulato da Lighthouse è 1.9–3.2s. È la stima del modello Lantern sotto
throttling 4G; l'LCP **osservato** in laboratorio è 180–300ms. Va rimisurato sul
dominio reale con dati di campo prima di dichiarare l'obiettivo `< 2.0s` raggiunto.

Verificato inoltre con script ripetibili (in `scratchpad`, non committati):

- routing: `/favicon.ico`, `/apple-touch-icon.png`, `/ads.txt` e i file di
  verifica di Search Console rispondono **404** (prima erano 500); ogni URL
  sconosciuta rende una 404 reale — documento completo, `<html lang>`, header,
  vie d'uscita — con status 404 e `noindex`;
- header di sicurezza presenti su ogni risposta (CSP con `frame-ancestors
  'none'`, HSTS, `Referrer-Policy`, `X-Content-Type-Options`);
- layout nella fascia 1024–1440px: nessun KPI e nessun prezzo che esce dalla
  propria cella o card, in italiano e in inglese;
- form: uno solo per pagina in entrambe le lingue, consenso che linka
  l'informativa senza commutare la checkbox, fallback `<noscript>`, stato di
  successo con due vie di uscita, stato di errore con mailto;

- responsive 320→1920px: nessun overflow orizzontale, nessun elemento animato
  bloccato invisibile, CTA dell'hero sempre sopra la fold;
- SEO: lunghezze e unicità di title/description, un solo H1, canonical
  self-referential, hreflang `it`/`en`/`x-default`, OG image che risponde 200 su
  ogni pagina, JSON-LD parsabile e senza `@id` pendenti, presenza in copy di tutte
  le keyword target, assenza di nomi reali vietati.

---

## Da confermare prima del go-live

- [ ] Prezzo dell'audit in `src/lib/site-config.ts` (€7.500 è ancora il
      placeholder di benchmark; la soglia mensile di €5.000 è confermata)
- [ ] Dominio di produzione in `NEXT_PUBLIC_SITE_URL`
- [ ] Indirizzo email e URL LinkedIn in `src/lib/site-config.ts`
- [ ] **Blocker legale** — `siteConfig.legal` (ragione sociale, P.IVA, sede) in
      `src/lib/site-config.ts`: l'indicazione della P.IVA sul sito è un obbligo
      ex art. 35 DPR 633/72. Il footer li renderizza da solo appena compilati.
- [ ] `src/content/privacy.ts`: informativa da far validare dal legale (il testo
      pubblicato non lo dichiara più — il TODO vive solo qui e nei commenti)
- [ ] Nomi e ruoli del comitato medico-scientifico del primo progetto (il claim
      pubblico ora promette il comitato *per ogni progetto*, quindi è vero per
      costruzione — ma il primo progetto dovrà mantenerlo)
- [ ] Verifica del dominio mittente su Resend
- [ ] Spot-check dei link esterni alle fonti normative negli articoli
      (Normattiva/EUR-Lex: permalink stabili, ma la rete di build non
      permette di verificarli — un `curl` per URL prima del lancio)
- [ ] `RESEND_API_KEY` in produzione + test end-to-end del form (senza chiave
      l'API risponde 500 e il lead vede l'errore con mailto di fallback)
- [ ] Smoke test post-deploy: `curl` su sitemap.xml (nessun localhost), form → 200
- [ ] `NEXT_PUBLIC_GA_ID` in produzione se si vuole GA4: il banner di consenso e
      la sezione «Cookie» dell'informativa si attivano da soli (vedi sopra).
      Lasciandola vuota il sito resta senza analytics e senza banner.
- [ ] `src/content/privacy.ts`, sezione «A chi comunichiamo i dati»: confermare
      con il legale se il provider email comporta un trasferimento extra-UE (in
      quel caso va aggiunta una frase sulle garanzie adottate)
- [ ] Aggiornare `SITE_LAST_UPDATED` in `src/app/sitemap.ts` a ogni revisione
      dei contenuti delle pagine statiche
