# SEO-MAP — enable.advisory

Fonte: ricerca di mercato enable.advisory 2025 (cluster a intent commerciale, difficoltà gestibile). Regole: UNA keyword primaria per pagina + varianti secondarie; title ≤60 char pattern `{Keyword} | enable.advisory`; H1 unico keyword-oriented; **mai** ottimizzare per "agenzia web / agenzia digitale" (saturo, posizionamento sbagliato). Volumi = stime da verificare con SEOZoom/Keyword Planner; intent e priorità sono la guida.

Dominio di produzione: `https://enableadvisory.com` (configurato in `astro.config.mjs` → `site`; aggiornare lì se diverso).

## Cluster prioritari

1. **Compliance normativa** (budget obbligato, priorità massima): consulenza GDPR, NIS2, European Accessibility Act / accessibilità sito web, AI Act
2. **AI per PMI** (mercato +50%): consulenza AI, AI per aziende, intelligenza artificiale PMI
3. **CRM/martech** (nicchia alto valore, bassa competizione): consulenza CRM
4. **Intent diretto**: consulente digitalizzazione PMI, consulenza digitale, digitalizzazione PMI

## Mappa keyword → pagina (IT)

| Pagina | Keyword primaria | Secondarie | Title (≤60) |
|---|---|---|---|
| `/it/` | consulenza digitale PMI | partner digitale, digitalizzazione PMI | Consulenza digitale per PMI \| enable.advisory |
| `/it/come-lavoriamo/` | consulente digitalizzazione PMI | consulente digitale, fractional | Consulente digitalizzazione PMI \| enable.advisory |
| `/it/servizi/` | consulenza digitale | servizi digitalizzazione PMI | Servizi di consulenza digitale \| enable.advisory |
| `/it/servizi/compliance-governance-digitale/` | consulenza GDPR | NIS2, AI Act, compliance digitale PMI | Consulenza GDPR, NIS2 e AI Act \| enable.advisory |
| `/it/servizi/dati-intelligenza-artificiale/` | consulenza AI | AI per aziende, intelligenza artificiale PMI | Consulenza AI per aziende e PMI \| enable.advisory |
| `/it/servizi/crm-martech/` | consulenza CRM | martech, marketing automation PMI | Consulenza CRM e martech per PMI \| enable.advisory |
| `/it/servizi/web-ecommerce/` | accessibilità sito web | European Accessibility Act, siti conformi EAA, e-commerce PMI | Siti web accessibili (EAA) ed e-commerce \| enable.advisory |
| `/it/prodotti/` | audit digitale PMI | AI readiness assessment, audit GDPR prezzo | Audit e assessment a prezzo fisso \| enable.advisory |
| `/it/casi-studio/` | — (trust) | casi studio digitalizzazione | Casi studio \| enable.advisory |
| `/it/chi-siamo/` | — (trust/E-E-A-T) | consulenti senior digitale | Chi siamo: i senior \| enable.advisory |
| `/it/risorse/` | — (hub) | guide digitalizzazione PMI | Risorse e guide \| enable.advisory |
| `/it/risorse/nis2-guida-pmi/` | NIS2 | D.Lgs. 138/2024, NIS2 fornitori PMI, obblighi NIS2 | NIS2 per PMI: guida completa 2026 \| enable.advisory |
| `/it/risorse/ai-per-pmi-guida/` | AI per aziende | intelligenza artificiale PMI, AI readiness | AI per aziende: guida per PMI \| enable.advisory |
| `/it/contatti/` | — (conversione) | — | Contatti: prenota l'audit \| enable.advisory |
| `/it/accessibilita/` | — (dichiarazione + segnale commerciale) | — | Dichiarazione di accessibilità \| enable.advisory |

## Mappa keyword → pagina (EN)

Mirror con keyword EN equivalenti (mercato secondario: aziende estere con operations in Italia):

| Pagina | Keyword primaria | Title |
|---|---|---|
| `/en/` | digital consulting for SMEs | Digital consulting for SMEs \| enable.advisory |
| `/en/how-we-work/` | fractional digital consultant | How we work: senior model \| enable.advisory |
| `/en/services/` | digital consulting services | Digital consulting services \| enable.advisory |
| `/en/services/compliance-digital-governance/` | GDPR consulting Italy | GDPR, NIS2 & AI Act consulting \| enable.advisory |
| `/en/services/data-artificial-intelligence/` | AI consulting for SMEs | AI consulting for SMEs \| enable.advisory |
| `/en/services/crm-martech/` | CRM consulting | CRM & martech consulting \| enable.advisory |
| `/en/services/web-ecommerce/` | European Accessibility Act compliance | Accessible websites (EAA) & e-commerce \| enable.advisory |
| `/en/products/` | digital audit fixed price | Fixed-price audits & sprints \| enable.advisory |
| `/en/case-studies/` | — | Case studies \| enable.advisory |
| `/en/about/` | — | About: the seniors \| enable.advisory |
| `/en/resources/` | — | Resources & guides \| enable.advisory |
| `/en/resources/nis2-sme-guide/` | NIS2 compliance SME | NIS2 for SMEs: complete guide \| enable.advisory |
| `/en/resources/ai-for-smes-guide/` | AI for business | AI for SMEs: practical guide \| enable.advisory |
| `/en/contact/` | — | Contact: book your audit \| enable.advisory |
| `/en/accessibility/` | — | Accessibility statement \| enable.advisory |

Pagine di servizio non indicizzanti keyword: `/it/privacy/`, `/it/cookie-policy/` (+EN) — noindex non necessario, ma fuori dalla mappa.

## SEO tecnica (checklist implementata nel layout)

- [x] Output statico, contenuto completo senza JS
- [x] Title/description unici; canonical assoluto per pagina
- [x] `hreflang` it/en + `x-default` (→ IT) su ogni pagina, coppie definite in `src/lib/routes.ts`
- [x] Open Graph + Twitter card, immagini OG dedicate 1200×630 generate (`scripts/generate-og.mjs` → `public/og/`)
- [x] JSON-LD: `Organization` + `ProfessionalService` sitewide; `Service` su pagine servizio; `FAQPage` dove ci sono FAQ; `Article` su risorse; `BreadcrumbList` su pagine interne
- [ ] `Person` su chi-siamo — **rimandato finché le bio sono placeholder**; riattivare al lancio con l'helper `personSchema` già pronto in `src/lib/seo.ts` (voce 7 della checklist di lancio nel README)
- [x] Un solo H1 per pagina; gerarchia heading pulita
- [x] Internal linking deliberato: verticali ↔ prodotti ↔ risorse ("il sistema, non i silos")
- [x] sitemap.xml con alternates hreflang su tutte le 34 URL (coppie esplicite da src/lib/routes.ts in astro.config.mjs — l'opzione i18n del plugin copriva solo gli slug identici); robots.txt con Sitemap
- [x] Font self-hosted `font-display: swap` + preload; immagini AVIF/WebP; CLS 0; GSAP non render-blocking

## Ricognizione SERP — cosa manca ancora (agosto 2026)

Ricognizione fatta sugli **snippet** dei risultati di ricerca: in questo ambiente il proxy blocca l'accesso diretto ai siti concorrenti (403 per policy) e non è collegato nessun tool di keyword research, quindi **non ci sono volumi né posizioni reali su google.it**. Quello sotto è panorama competitivo, non ranking.

**Già applicato:** riscritto l'attacco della pagina compliance, che archiviava il GDPR ("quella stagione è finita") mentre la sua keyword primaria è "consulenza GDPR"; aggiunta la filiera lato GDPR (nomina dei responsabili esterni); aggiunta la gestione delle richieste degli interessati; sulla pagina web/EAA aggiunti il metodo di verifica e la posizione sugli overlay di accessibilità.

**Richiede una decisione del committente:**

| Gap | Pagina | Perché serve una decisione |
|---|---|---|
| Servizio **DPO esterno** | compliance | È un intent con domini interamente dedicati e oggi non lo presidiamo. Ma offrire il ruolo va validato con lo studio legale partner: indipendenza, conflitto di interessi, e coerenza con la nota "non siamo uno studio legale" già in pagina |
| **Piattaforme CRM nominate** | crm-martech | La pagina non nomina nessuna piattaforma: perde tutte le query "consulenza + [piattaforma]". Servono i nomi di quelle su cui lavorate davvero — non inventabili |
| **Struttura di costo** CRM e AI | crm-martech, guida AI | "Quanto costa" è una SERP intera. Il brief dice prezzi pubblici solo per i prodotti d'ingresso: serve decidere se pubblicare almeno le fasce o la logica di costo |
| **Incentivi e agevolazioni** | guida AI | Argomento assente da tutto il sito. La ricerca di mercato avverte che le risorse 2025 sono esaurite: va verificato cosa è ancora attivo prima di scriverne |

**Richiede fonti verificate** (non aggiungibili finora: l'ambiente non raggiunge ACN, Garante, EUR-Lex):

- Guida NIS2: tempi di notifica degli incidenti, definizione di "incidente significativo", timeline delle scadenze future, esempio di clausola contrattuale di filiera
- Guida AI: costi tipici di progetto, tassonomia dei fornitori
- Pagina compliance: FAQ sul registro dei trattamenti (chi è obbligato, modello semplificato del Garante)
- Pagina web/EAA: vigilanza, reclami e finestre temporali; contenuto formale della dichiarazione di accessibilità

**Contenuto nuovo suggerito:** una guida pillar GDPR nelle risorse, a specchio di quella NIS2 — oggi il cluster compliance ha una sola guida e punta tutta su NIS2, mentre la keyword primaria della pagina servizio è "consulenza GDPR".

## Interlinking previsto

- Ogni pagina servizio → prodotto d'ingresso collegato (`/it/prodotti/`) + 2 verticali affini + 1 risorsa del cluster + CTA contatti
- Risorse pillar → pagina servizio del cluster + prodotto d'ingresso
- Home → 4 verticali, prodotti, come-lavoriamo, contatti
