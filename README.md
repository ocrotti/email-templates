# enable.advisory — sito web

Sito multi-pagina (IT + EN) di **enable.advisory**, consulenza digitale senior per PMI italiane. Parte del gruppo Enable Digital (con [enable.luxury](https://enableluxury.com)).

Documenti di progetto: [`DESIGN-DIRECTION.md`](./DESIGN-DIRECTION.md) (direzione visiva e motion) · [`SEO-MAP.md`](./SEO-MAP.md) (mappa keyword→pagina e checklist SEO).

> Nota: le cartelle numerate `1/`–`20/` nella root sono i template email Colorlib preesistenti in questo repository e non fanno parte del sito.

## Stack

- [Astro 5](https://astro.build) — output statico, i18n nativo (`/it/` default + `/en/`), View Transitions
- [Tailwind CSS 4](https://tailwindcss.com) — design tokens in `src/styles/global.css` (`@theme`)
- [GSAP + ScrollTrigger](https://gsap.com) + [Lenis](https://lenis.darkroom.engineering) — motion system in `src/scripts/motion.ts`
- Font self-hosted (Parkinsans Variable + Inter Variable, `public/fonts/`, OFL)

## Comandi

```bash
npm install       # dipendenze
npm run dev       # dev server su localhost:4321
npm run build     # build statica in dist/
npm run preview   # anteprima della build
npm run og        # rigenera le immagini Open Graph in public/og/ (vedi sotto)
npm run portable  # dopo build: copia apribile senza server in dist-portable/
```

### Aprire il sito in locale

**Con Node (esperienza completa, consigliato)**

```bash
npm install
npm run dev       # poi apri http://localhost:4321/it/
```

`npm run dev` è l'unico modo di vedere anche le transizioni fra pagine, che richiedono un server.

**Senza Node (copia offline)**

`npm run portable` produce `dist-portable/`: si apre `START.html` con un doppio clic, senza installare nulla. Animazioni, smooth scroll, contatori, menu e accordion funzionano; le transizioni fra pagine no, perché il browser blocca le richieste tra file locali e i link navigano in modo normale.

### Controlli di qualità

Da eseguire dopo `npm run build`. I primi due richiedono `npx astro preview --port 4321` attivo in un altro terminale.

```bash
npm run check:build    # su dist/: title/description unici, un solo H1, ordine
                       # degli heading, canonical, hreflang che risolve, JSON-LD
                       # parsabile, link interni, immagini OG, alt, sitemap
npm run check:a11y     # in Chromium, su tutte le rotte: contenuto visibile senza
                       # JS, prefers-reduced-motion, skip link, focus ring su ogni
                       # stop di tastiera, aria di menu e accordion, landmark
npm run check:layout   # tutte le rotte × 4 viewport: overflow orizzontale,
                       # elementi fuori dal viewport, sezioni vuote, immagini
                       # non caricate, H1 coperto dalla nav fissa
npm run check:vitals   # Core Web Vitals con emulazione Pixel 5 e CPU 4×.
                       # Budget: CLS ≤ 0.01 (target 0), LCP ≤ 2500 ms
```

### Stato verificato

Lighthouse mobile (Pixel 5 emulato) su home IT, home EN, una pagina servizio, prodotti e una guida:

| | Performance | Accessibility | Best practices | SEO | CLS |
|---|---|---|---|---|---|
| tutte le pagine testate | 99 | 100 | 100 | 100 | 0 |

I tre script di controllo passano su tutte e 36 le pagine. I dati citati nel copy sono solo questi, tutti con fonte in pagina: perimetro NIS2 e sanzioni (ACN, D.Lgs. 138/2024), soglie ed esclusioni EAA (D.Lgs. 82/2022), adozione AI nelle PMI (ISTAT 2025), mercato AI italiano (Osservatorio Politecnico di Milano). Nessun logo cliente, testimonianza, metrica di progetto o nome di persona è inventato.

## Struttura

```
src/
  layouts/Base.astro      head SEO completo: canonical, hreflang, OG, JSON-LD, skip link
  lib/routes.ts           mappa route IT↔EN (fonte di verità per link interni e hreflang)
  lib/i18n.ts             stringhe UI condivise
  lib/seo.ts              helper schema.org (Organization, Service, FAQ, Article, …)
  components/             design system (Nav, Footer, Steps, Accordion, Counter, …)
  scripts/motion.ts       Lenis + GSAP; rispetta prefers-reduced-motion
  styles/global.css       design tokens + primitive CSS
  pages/it/  pages/en/    pagine (mirror completo)
  data/case-studies.ts    dati casi studio (vuoto finché non ci sono casi reali autorizzati)
public/
  og/                     immagini OG generate (committate)
  fonts/                  woff2 self-hosted
  _redirects              redirect / → /it/ (Cloudflare Pages)
scripts/generate-og.mjs   generatore immagini OG (sharp)
```

## Deploy (Cloudflare Pages)

- Build command: `npm run build` — Output: `dist` — Node ≥ 20.
- Il dominio di produzione è configurato in `astro.config.mjs` (`site`) e in `src/lib/seo.ts` (`SITE.url`); aggiornarlo in entrambi i punti (e in `public/robots.txt` + `public/_redirects` se serve) se cambia, poi rigenerare `npm run og`.
- Il redirect `/` → `/it/` è server-side via `public/_redirects`; per altri host statici c'è il fallback meta-refresh in `src/pages/index.astro`.

## Cosa serve per il lancio

**Decisioni e materiali che solo il committente può fornire** (critical path — senza questi il sito non può andare live):

1. **Prezzi dei 4 prodotti d'ingresso** → sostituire i `[PREZZO]` (home, prodotti, verticali, guide).
2. **Nomi, ruoli, foto e bio dei senior** → `[PLACEHOLDER: NOME]`, `[BIO SENIOR]` in home, chi-siamo e verticali. Il posizionamento "named partner" non regge senza.
3. **Dati societari e contatti**: ragione sociale/P.IVA (footer), email, link calendario (Cal.com/Calendly), numero WhatsApp → pagina contatti. I due CTA calendario/WhatsApp sono volutamente disattivati finché non esistono gli URL.
4. **Endpoint del form** (Formspree o webhook n8n) → `FORM_ENDPOINT` in `src/components/ContactForm.astro`. Con l'endpoint, configurare anche il **redirect post-invio** a una pagina di ringraziamento: oggi l'invio non ha uno stato di successo progettato.
5. **Validazione legale** di privacy e cookie policy.

**Lavoro meccanico, dopo i punti sopra:**

6. Rimuovere il residuo `[PLACEHOLDER:` con `grep -r` per verifica finale; `npm run check:build` fallisce se un placeholder finisce in un href.
7. Riattivare lo schema `Person` in chi-siamo quando le bio sono reali (helper `personSchema` già pronto in `src/lib/seo.ts`).
8. Se cambiano claim o dominio: rigenerare le immagini OG con `npm run og` (richiede i font `ParkinsansOG`/`InterOG` installati a sistema, generabili con fonttools da `public/fonts/*.woff2`; le PNG sono committate, il deploy non dipende dallo script).
9. Casi studio reali autorizzati → `src/data/case-studies.ts` (le pagine dettaglio si generano da sole).
10. Verifica SEO post-lancio: volumi keyword con SEOZoom/Keyword Planner (quelli in SEO-MAP.md sono stime), invio sitemap in Search Console.
