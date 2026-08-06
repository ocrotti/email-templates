# DESIGN-DIRECTION — enable.advisory

Direzione: **editoriale svizzero + motion di precisione**. Un sito sobrio, tipograficamente fortissimo, dove ogni animazione ha uno scopo narrativo (rivelare, ordinare, gerarchizzare). La qualità percepita deve dire "senior" da sola. Fratello maggiore di enableluxury.com: stessa spina dorsale narrativa a sezioni numerate, esecuzione visiva superiore.

---

## 1. Benchmark — cosa prendiamo da ciascuno

| Reference | Cosa prendiamo | Come lo applichiamo |
|---|---|---|
| **epic.net** | Tipografia hero come protagonista assoluto, righe che si rivelano con maschera | Hero: reveal per riga con maschera (`overflow: hidden` + translateY), tracking stretto, corpo enorme |
| **unseen.co** | Nav ridotta all'osso, hover con anticipazione | Nav sticky compressa allo scroll; card servizio con freccia animata e layer colore che sale on-hover |
| **lusion.co** | "Il sito reagisce a te", senza pesantezza WebGL | Magnetic buttons (pointer fine), tilt leggerissimo sulle card, cursore che "sente" i CTA. Niente canvas |
| **activetheory.net** | Transizioni coreografate tra pagine | Astro ClientRouter: crossfade rapido + re-init motion su `astro:page-load`. Mai bloccare la navigazione |
| **uncommonstudio.com.au** | Stagger a griglia | Griglie card (verticali, prodotti, casi): reveal a stagger 60–90ms per item, once |
| **locomotive.ca / basement.studio / exoape.com** | Standard smooth scroll + reveal sobri e coerenti | Lenis (lerp ~0.1) + ScrollTrigger; reveal = fade + translateY 24px, `power3.out`, 0.8s, once |
| **rive.app** | Micro-interazioni con personalità | Freccia dei link che scatta in diagonale, underline che scorre, numeri di sezione che contano |
| **apple.com** (prodotto) | Disciplina: UNA cosa si muove alla volta | Ogni viewport ha un solo protagonista motion. Il resto è fermo o entra dopo |

## 2. Moodboard testuale

Carta da lettere di uno studio legale del 2030. Inchiostro caldo su carta d'archivio, un solo blu elettrico usato come un timbro. Numeri di sezione grandi come su un contratto ben impaginato. Righe sottili che ordinano, mai decorano. Il movimento è quello di un documento che si apre: preciso, senza rimbalzi, una volta sola. Silenzio visivo tra le sezioni. Se enable.luxury è la boutique, enable.advisory è lo studio del partner senior: stessa famiglia, più istituzionale.

## 3. Palette — 2 varianti

### Variante A — "Inchiostro & Elettrico" (SCELTA, implementata)
Coerente con il mondo Enable Digital (accento blu elettrico), personalità advisory più istituzionale.

| Token | Hex | Uso |
|---|---|---|
| `ink` | `#0E0D0B` | Fondo primario (quasi-nero caldo) |
| `ink-raise` | `#171512` | Card/superfici rialzate su dark |
| `paper` | `#F4F1EA` | Off-white caldo: testo su dark, sezioni light |
| `stone` | `#A8A29A` | Testo secondario su dark (AA su ink) |
| `slate` | `#57534B` | Testo secondario su paper (AA su paper) |
| `accent` | `#2B5CFF` | Blu elettrico: superfici, bottoni (testo bianco AA), elementi grafici grandi |
| `accent-deep` | `#1B44CC` | Testo accent su fondi chiari (AA) |
| `accent-soft` | `#8FA8FF` | Testo accent/link su fondi scuri (AA) |
| `line` | `white/12%` · `ink/12%` | Hairline separatori |

Regola contrasto: `accent` pieno mai usato per testo piccolo — solo `accent-deep` (su chiaro) e `accent-soft` (su scuro). Verifica WCAG in fase finale.

### Variante B — "Archivio & Ottone" (documentata, non implementata)
Più istituzionale/notarile, si stacca dal blu del gruppo: `#0B0E14` (inchiostro freddo), `#F2EFE7` (ecru), accento `#C9A227` (ottone) con `#8A6D14` per testo su chiaro. Da considerare se il brand vorrà distinguersi di più dal mondo luxury. Cambio = solo token in `src/styles/global.css`.

## 4. Tipografia

| Ruolo | Font | Note |
|---|---|---|
| Display / titoli | **Parkinsans Variable** (self-hosted, latin) | Font della famiglia Enable Digital. Weight 500–600, tracking `-0.03em` sui corpi grandi |
| Testo / UI | **Inter Variable** (self-hosted, latin) | Weight 400/500, leggibilissima |

Scala (fluid, definita nei token):
- `display`: `clamp(3rem, 8vw, 7rem)` — hero, leading 0.95
- `h2`: `clamp(2rem, 5vw, 3.5rem)` — titoli sezione, leading 1.05
- `h3`: `clamp(1.5rem, 2.6vw, 2.125rem)`
- `lead`: `clamp(1.125rem, 1.6vw, 1.375rem)` — sottotitoli
- body `1.0625rem/1.7`, small `0.875rem`
- Numeri di sezione: elemento grafico forte — Parkinsans 600, `clamp(3.5rem, 6vw, 5.5rem)`, colore `accent` su dark / `accent-deep` su light, tabular. Formato `01`, `02`…

## 5. Layout

- Griglia 12 colonne, container `max-w-[80rem]`, gutter `px-6 md:px-10`.
- White space generoso: sezioni `py-24 md:py-36`.
- Separatori: hairline 1px (`line`), mai box con ombre.
- Allineamenti editoriali: label piccola in alto (mono-spaced feel via tracking largo + uppercase), titolo largo, testo su 6–8 colonne max (`max-w-prose`-ish 65ch).

## 6. Inventario componenti animati

| Componente | Comportamento | Implementazione |
|---|---|---|
| Hero tipografico | Righe entrano con maschera + stagger 90ms, once, on load | `[data-hero]` → GSAP, righe pre-splittate in markup (no FOUC, no CLS) |
| Smooth scroll | Lerp fluido, sincronizzato con ScrollTrigger | Lenis; disattivato con `prefers-reduced-motion` |
| Reveal on scroll | Fade + translateY 24px, 0.8s `power3.out`, once | `[data-reveal]`, gruppi con `[data-reveal-group]` stagger 80ms |
| "Come lavoriamo" | Colonna sinistra sticky (CSS, zero CLS), progress line verticale che si disegna con lo scroll (scrub), step che si attivano | `[data-progress-line]` scaleY 0→1 scrub; step `.is-active` |
| Card verticali/servizi | Hover: layer accent che sale, freccia che scatta in diagonale, tilt ≤2° solo pointer fine | CSS transforms + `[data-tilt]` JS leggero |
| Counter | Count-up quando entra in viewport, once, formato locale | `[data-counter]` con `data-counter-to`, `data-counter-suffix` |
| Nav sticky | Compressa dopo 80px di scroll (altezza e sfondo), blur backdrop | `.is-scrolled` su `<header>` |
| Menu mobile | Overlay full-screen, voci a stagger, focus trap, Esc chiude | `[data-menu]`, aria-expanded corretto |
| FAQ accordion | Altezza animata fluida via `grid-template-rows 0fr→1fr` (CSS, niente scatti) | `<button aria-expanded>` + region; niente `<details>` |
| CTA | **Stile unico**: bottoni magnetici (≤8px, solo pointer fine) + freccia; link testuali con underline animato che scorre | `[data-magnetic]`; `.link-underline` |
| Page transitions | Crossfade breve tra pagine, motion re-init | Astro `<ClientRouter />` + `astro:page-load` |
| Marquee loghi | **OMESSO**: nessun logo cliente reale disponibile. Niente loghi finti | — |

## 7. Regole d'oro motion

- Durate 0.6–1s. Ease: `power3.out` / `cubic-bezier(0.22, 1, 0.36, 1)`. Mai bounce, mai elastic.
- Un solo protagonista per viewport. Reveal `once: true` — il sito non ri-anima all'indietro.
- `prefers-reduced-motion: reduce` → Lenis off, GSAP off, tutto visibile e statico via CSS. Gli stati iniziali nascosti esistono SOLO sotto `@media (prefers-reduced-motion: no-preference)` e SOLO con `html.js` — no-JS e reduced-motion vedono sempre tutto (SEO + a11y + CLS 0).
- Solo `transform` e `opacity`. Niente animazioni su proprietà di layout. CLS = 0 by design.
