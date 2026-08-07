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

## 7. Final seven-expert review round (2026-08-07)

The site was reviewed through seven expert lenses (UI design, UX, copywriting, art direction,
technical SEO, content SEO, product management), each against the live production build.
Everything actionable was fixed in one batch:

**Claim discipline (copywriting)** — removed the local dev pay figure and the youth-unemployment
percentage (kept "1M+ entering the labour market"); tightened the content & social savings band
to 40–60%; rounded the SEO salary median; fixed EN grammar slips and Italian calques
("vettati" → "testati", "festa-o-carestia", "cotti dentro", subject of "può dimettersi").

**Mobile persuasion (UI)** — the comparison and pricing tables restack into per-row cards below
`md`, so the pod column (the argument) is visible on phones; role-card cost pills neutralised
to reserve amber for the Nairobi/talent narrative; hero display size recalibrated so the H1
sets in three deliberate lines in both locales.

**Conversion & robustness (UX)** — hero trial CTA now lands on the contact form; localized
inline form validation with required-field markers (replacing browser bubbles); form success
message now promises proposed call slots; mobile menu closes on Escape and locks body scroll;
skip-to-content link; reveals trigger 200px early so fast scrolling never shows empty sections;
savings counter animates in 0.5s (no lingering "0%").

**Motion & identity (art direction)** — pod visual gained an idle loop (a module lights up and
hands work to the review gate every 2.6s); marquee got gradient edge masks and the mono
eyebrow style; custom cursor no longer ghosts at (0,0); calculator defaults to Germany so the
first number shown (53%) sits inside the advertised 40–70% band.

**Technical SEO** — all titles ≤60 and descriptions ≤155 chars; `Organization.logo`;
`Article` JSON-LD gains `image` + `dateModified`, author as Organization, `og:type=article`;
sitemap `x-default`; FAQ answers stay mounted in the server HTML; heading outlines fixed
(`/how-it-works`, `/contact`, `/roles`).

**Content SEO** — role pages expanded to 600–800 words per locale with keyword H1s
("Hire an offshore …"); commercial home title; 16 contextual in-body internal links per locale
across the four blog articles; the MarketerHire article gained a real per-category alternatives
rundown (names and figures from the market analysis only); locale-formatted article dates.

**Product management (conditional GO)** — added `/privacy` + `/it/privacy` (GDPR privacy
policy with clearly-marked `[… to be completed before launch]` placeholders for the legal
entity), footer legal link and a consent notice on the lead form. Remaining launch blockers
that code cannot close: wire the form to a real endpoint, complete the legal-entity details,
and have the guarantee/SLA wording and the founders' quote signed off before real traffic.

Post-fix Lighthouse (mobile, local prod server): **perf 95 / a11y 100 / bp 100 / seo 100,
CLS 0, TBT 120ms**; simulated LCP 2.8s is Lantern's simulated-TTFB artifact (observed LCP
locally ~0.13s) — re-measure on Vercel as already noted above.

## 8. SEO expansion round (2026-08-07)

Three pages were added to reach query clusters the site did not cover. Targets and SERP
evidence are documented in [`seo-strategy.md`](seo-strategy.md); this section records the
verification only.

**No paid keyword tool was involved.** DataForSEO was not connected to the session and no
credentials were present, so volumes in the strategy doc remain the market analysis's own
estimates and the SERP composition was checked by searching the live web in August 2026.
Re-measure with Search Console or a paid tool before committing budget.

| Route (EN + IT) | Title chars | Description chars | JSON-LD | Body words (EN/IT) |
|---|---|---|---|---|
| `/white-label-marketing` | 58 / 57 | 152 / 150 | Service, FAQPage, BreadcrumbList | 881 / 901 |
| `/outsource-digital-marketing` | 57 / 51 | 136 / 139 | Article, FAQPage, BreadcrumbList | 1,368 / 1,516 |
| `/marketing-salaries` | 54 / 57 | 153 / 141 | Dataset, FAQPage, BreadcrumbList | 800 / 797 |

Checked on the production build (`next start`, 54 static routes):

- All six routes return 200; canonical and hreflang `en`/`it`/`x-default` present on each.
- Every `ld+json` block parses; one `<h1>` per page.
- `/marketing-salaries` publishes European employer cost only. Swept both locales for
  Kenyan salary data and internal specialist cost — **none present**. The same sweep across
  every content file found only the €400–700/day senior EU freelancer rate in the home
  comparison table, which is European and intentional.
- Salary table restacks into per-row cards below `md`; no horizontal overflow at 390px.

Two defects found during verification and fixed:

- **The white-label H1 carried two sentences** and set as four lines of display type ending
  on an orphaned "pod." — the same ragged-rag problem the art-direction review raised about
  the home hero. The punch line moved into a kicker above the headline; the H1 is now two
  clean lines in both locales and contains only the target keyword.
- **The outsourcing guide reintroduced a removed claim.** Its geography section cited a
  mid-level Nairobi developer at roughly $14.7k/year — the same local-cost figure deleted
  from the developer role page in §7. Publishing what a specialist costs locally lets a
  reader compute our margin, which reduces the fair-pay policy to arithmetic. Removed; the
  Johannesburg benchmark stays because it is a market rate, not our cost base.

Sitemap now carries 56 URLs (28 paths × 2 locales) with `x-default` alternates and real
`lastmod` dates — blog posts use their publication date, everything else a content-updated
constant, replacing a build timestamp that claimed every page changed on every deploy.
