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
```

### Controlli di qualità

Da eseguire dopo `npm run build`. I primi due richiedono `npx astro preview --port 4321` attivo in un altro terminale.

```bash
npm run check:build    # su dist/: title/description unici, un solo H1, ordine
                       # degli heading, canonical, hreflang che risolve, JSON-LD
                       # parsabile, link interni, immagini OG, alt, sitemap
npm run check:a11y     # in Chromium, su tutte le rotte: contenuto visibile senza
                       # JS, prefers-reduced-motion, skip link, focus ring su ogni
                       # stop di tastiera, aria di menu e accordion, landmark
npm run check:vitals   # Core Web Vitals con emulazione Pixel 5 e CPU 4×.
                       # Budget: CLS ≤ 0.01 (target 0), LCP ≤ 2500 ms
```

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

## Cose da completare prima del lancio

1. **Placeholder nel copy**: cercare `[PREZZO]`, `[BIO SENIOR]`, `[PLACEHOLDER:` e sostituire (prezzi prodotti, bio senior, contatti, P.IVA, endpoint form, link calendario/WhatsApp).
2. **Endpoint form**: `src/components/ContactForm.astro` → `FORM_ENDPOINT` (Formspree o webhook n8n).
3. **Immagini OG**: dopo aver cambiato claim o dominio, rigenerare con `npm run og`. Lo script richiede i font installati a livello di sistema come istanze statiche (`ParkinsansOG`/`InterOG`, generabili con fonttools da `public/fonts/*.woff2`); le PNG generate sono committate, quindi il deploy non ne dipende.
4. **Casi studio**: aggiungere i casi reali autorizzati in `src/data/case-studies.ts` (le pagine dettaglio si generano da sole).
5. **Verifica SEO**: volumi keyword con SEOZoom/Keyword Planner (i volumi in SEO-MAP.md sono stime), test schema con validator.schema.org, invio sitemap in Search Console.
