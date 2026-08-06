# Verification report

Evidence for the acceptance criteria in the project brief (§9). Re-run everything with
`npm run build && npx next start -p 3100` and the commands noted below.

## 1. Build

`npm run build` — 46/46 routes prerendered as static HTML. Shared first-load JS 103 kB;
heaviest route 151 kB. No build warnings or type errors (`npx tsc --noEmit` clean).

## 2. Lighthouse

Lighthouse 13.4.1, headless Chromium, default **mobile** preset (simulated slow-4G + 4x CPU
throttling), against a local `next start` server.

| Page | Performance | Accessibility | Best practices | SEO | CLS | TBT |
|---|---|---|---|---|---|---|
| `/` | 94 | 100 | 100 | 100 | 0 | 110 ms |
| `/pricing` | 96 | 100 | 100 | 100 | 0 | 100 ms |
| `/roles/paid-media` | 97 | 100 | 100 | 100 | 0 | 80 ms |
| `/it/` | 94 | 100 | 100 | 100 | 0 | 100 ms |

Desktop preset on `/`: **performance 100**, LCP 0.6 s, TBT 0 ms.

All four categories clear the ≥90 budget on every page tested. CLS is 0 against a 0.1 budget.

### On the LCP number

The brief sets LCP < 2.5 s. Lighthouse's *simulated* mobile LCP for these pages lands at
**2.6–3.0 s**, while the *observed* LCP in the same traces is **0.1–1.4 s**.

The gap is the simulation, not the page: Lantern models a 462 ms TTFB where the actual server
response is 10 ms, and that modelled latency sits directly on the LCP path. Disabling every
animation on the page (via `--force-prefers-reduced-motion`) moves simulated LCP by only
0.1 s (2.9 s → 2.8 s), which confirms the remaining time is network simulation rather than
render work.

**This must be re-measured against the real Vercel deployment before the number is trusted
either way** — a static page on a CDN has a far lower TTFB than this test setup, and that is
the single largest term in the simulated figure.

What was done on the render side to keep the heading fast:

- The hero H1 is the LCP element, so its mask reveal is **pure CSS and server-rendered** —
  it paints on the first frame instead of waiting for Framer Motion to hydrate. This cut
  observed LCP from ~1.4 s to ~0.13 s in the best measured run.
- The full word sequence completes in ~0.68 s (0.03 s stagger, 0.45 s per word).
- GSAP is lazy-loaded and only on pages with a scroll timeline; no render-blocking resources.

## 3. Accessibility

100/100 on every page tested. Issues found and fixed during the audit:

- **Contrast**: the on-dark accent blue was 4.4:1 (below AA for body text) and reused on light
  sections at 3.4:1. `blue.bright` is now `#6178FF` (5.3:1 on ink) and the scroll timeline
  picks its accent from its own light/dark theme.
- **Contrast**: marquee items were `text-paper/40`; raised to `/55`.
- **Table semantics**: the comparison table's row labels are now `<th scope="row">`, so every
  `<td>` has an associated header.
- **Touch targets**: header and footer text links were 17 px tall; vertical padding brings them
  past the 24 px minimum.

## 4. Structured data

Validated by parsing every `application/ld+json` block on 15 representative pages across both
locales — **32 blocks, 0 parse errors**.

| Page type | Emitted types |
|---|---|
| Home (EN + IT) | `Organization`, `Service`, `FAQPage` |
| How it works / role / pricing / guarantee | `Service`, `FAQPage`, `BreadcrumbList` |
| Talent | `FAQPage`, `BreadcrumbList` |
| Blog article | `Article`, `BreadcrumbList` |
| Index & contact pages | `BreadcrumbList` |

Same sweep confirmed: canonical on every page, hreflang `en`/`it`/`x-default` on every page,
exactly one `<h1>` per page, zero duplicate `<title>`s.

## 5. Responsive

16 pages × 5 viewports (320, 375, 768, 1440, 1920 px) checked for horizontal overflow by
comparing `document.documentElement.scrollWidth` against `window.innerWidth`.
**No overflow at any width.** Wide content (comparison and pricing tables) scrolls inside its
own container rather than the page body.

## 6. Known follow-ups

- Re-run Lighthouse against the Vercel deployment and confirm LCP on real CDN latency.
- Wire the lead form to a real provider endpoint (`src/components/LeadForm.tsx`, marked TODO).
- Replace the anonymised bench profiles with real photos and names once the team consents —
  the brief calls out real faces as a trust asset.
