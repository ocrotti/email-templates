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

Sitemap carries 48 URLs (24 paths × 2 locales) with `x-default` alternates and real
`lastmod` dates — blog posts use their publication date, everything else a content-updated
constant, replacing a build timestamp that claimed every page changed on every deploy.


## 9. Corrections to this document (2026-08-11)

A six-discipline review re-measured the claims above against the live build. Four did not hold,
and they are corrected here rather than quietly edited away, because a verification document that
overstates its own coverage is worse than none:

- **Sitemap size was wrong.** §8 said 56 URLs across 28 paths. It is 48 URLs across 24 paths
  (14 static + 6 roles + 4 posts, doubled for the locales). Corrected above.
- **"All titles ≤60 and descriptions ≤155" was stale.** Five strings had drifted back over budget
  after later edits. The claim only ever held on the day it was written; treat it as a check to
  re-run, not a property of the site.
- **The `<th scope="row">` claim over-reached.** It covered `ComparisonTable` only. The pricing
  "What's included" table had no row-header semantics at all until this round.
- **The accessibility sweep never ran on `/marketing-salaries`.** It was added after the sweep and
  inherited none of it — four of its text tints were below AA when the review measured them.
- **The "three deliberate lines" hero claim holds at ≥768px only.** At 390px the English hero rags
  to five lines with two orphans.

The lesson worth keeping: every claim in this file is a measurement with a date on it, not a
guarantee. `scripts/check-claims.mjs` now enforces the numeric ones automatically, which is the
only kind of verification that survives contact with later edits.


## 10. Full-site sweep (2026-08-14)

Everything below was measured against a production build (`next build` + `next start`), not the
dev server, on all 48 sitemap URLs unless stated. Scripts live in the session scratchpad; the
commands are reproducible from the descriptions.

### Defects found and fixed

- **React #418 on every Italian page.** `Counter` formatted numbers with
  `toLocaleString("it-IT")`. Node's ICU honours CLDR's Italian `minimumGroupingDigits: 2` and
  renders 2000 as `2000`; Chrome renders `2.000`. Server and client therefore produced different
  text on every figure in the calculator. Replaced with an explicit grouping helper
  (`src/lib/format.ts`). The same call in `roles.ts` had been printing `Da €2000/mese` on six role
  cards instead of the site's `€2.000`.
- **Role pages printed their benchmark link as literal `[text](/path)`.** `RolePage` passed
  `savings.body` into `Section`'s `intro`, which rendered raw. `Section.intro` now takes
  `ReactNode`; the four duplicated `renderInline` helpers were merged into
  `src/components/InlineLinks.tsx`.
- **80 axe `list`/`listitem` violations.** `Reveal` wrapped list items in a `<div>`, so no `<li>`
  was a direct child of its `<ul>`/`<ol>` on `/how-it-works`, `/talent` and
  `/outsource-digital-marketing`. `Reveal` now takes `as="li"`.
- **Ten unqualified savings claims.** The hero, the talent fair-pay card, the guide's model table
  and FAQ, and `/marketing-salaries` all quoted "40–70%" without naming what it is measured
  against. Against the gross salaries the site itself publishes the range is 11–70%; the band is
  against fully-loaded employer cost. Every mention now names its basis, and
  `scripts/check-claims.mjs` check 4 fails the build if a new one does not (14 mentions scanned).
- **`/marketing-salaries` contradicted itself on its own basis.** Its FAQ answered "employer cost
  per month" while the methodology above it said gross salary. The FAQ answers and the ERI source
  lines now say gross salary, with contributions described as sitting on top.
- **Two staffed roles were silently missing from the benchmark table.** Design and marketing
  automation have no benchmark in the 2025 market analysis. The table note now says so instead of
  leaving the omission to be noticed.

### Measurements

| Check | Result |
|---|---|
| `npx tsc --noEmit` | clean |
| `node scripts/check-claims.mjs` | passes, 5 roles, band 40–70%, 6 declared sub-floor pairs |
| `next build` | 54 pages, `/api/lead` and `/og` dynamic |
| Console errors / hydration warnings | 0 across 48 routes, both locales |
| axe-core WCAG 2.0 A+AA and 2.1 A+AA | 0 violations across 48 routes |
| Broken internal links | 0, across 48 distinct link targets |
| Titles / descriptions | all within 25–60 and 70–155; no duplicates of either |
| `<h1>` per page | exactly 1 on all 48 |
| canonical + hreflang(en/it/x-default) + og:image | present on all 48 |
| JSON-LD | 110 blocks, 0 parse or `@context` failures (BreadcrumbList 46, FAQPage 28, Service 22, Article 10, Organization 2, Dataset 2) |
| LCP / CLS (desktop, local) | 128–320ms, CLS 0 on `/`, `/it`, `/pricing`, `/marketing-salaries`, `/outsource-digital-marketing` |
| Horizontal overflow at 390px and 1440px | 0px on the five pages changed this round |
| `/api/lead` | 503 + `fallbackEmail` unconfigured, 422 with field list, 200 on honeypot, 400 on malformed JSON |

### Known exception

The sticky watermark section numerals (`text-paper/15` on ink, `text-ink/10` on paper) sit at
1.2–1.4:1. They are `aria-hidden` decoration — the section's `<h2>` carries the meaning and the
mobile numeral renders at full contrast — so they are excluded from the axe count above rather
than fixed. Raising them to 3:1 would make a background element read as content.
