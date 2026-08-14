# enable.talent — website

Marketing site for **enable.talent**: managed Kenyan marketing pods for European digital agencies. Built with Next.js (App Router), Tailwind CSS, Framer Motion and GSAP ScrollTrigger, per the project brief.

## Stack

- **Next.js 15** (App Router, static generation for every page)
- **Tailwind CSS 3.4** — design tokens in `tailwind.config.ts` (ink/paper/electric blue + Nairobi amber accent)
- **Framer Motion** for UI animation, **GSAP ScrollTrigger** (lazy-loaded) for scroll-driven timelines, **Lenis** for smooth scroll
- Self-hosted fonts via `next/font/local` (Parkinsans display + Inter text, `public/fonts/`)
- Every animation respects `prefers-reduced-motion`; heavy scroll effects are disabled below 768px

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages SSG)
```

Set the canonical site URL for production (used in metadata, sitemap, JSON-LD):

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.tld
```

## Deploying to Vercel

This app lives in the `enable-talent/` subdirectory of the repository. In the Vercel project settings set **Root Directory = `enable-talent`**, add `NEXT_PUBLIC_SITE_URL`, and deploy. No other configuration is required.

## Structure

```
src/
  app/
    (en)/            EN routes at the root (/, /pricing, /roles/[slug], ...)
    (it)/it/         IT routes under /it (mirrored 1:1)
    og/              dynamic branded OG image (/og?title=...&locale=en)
    sitemap.ts       sitemap with hreflang alternates
    robots.ts
  components/        UI + the 10 animated components from the brief
    pages/           full page compositions shared by both locales
  content/           ALL copy, EN + IT, typed per page
docs/verification.md Lighthouse, a11y, structured-data and responsive evidence
  lib/               site config, SEO helper (canonical + hreflang), fonts
public/fonts/        self-hosted woff2 (Parkinsans, Inter)
```

Languages use **two root layouts** via route groups: `(en)` serves English at the root with `<html lang="en">`, `(it)` serves Italian under `/it`. `pageMetadata()` in `src/lib/seo.ts` emits canonical + `hreflang` EN/IT/x-default (x-default → EN) for every page.

## Editing content

All copy lives in `src/content/*.ts`, typed and split per page, with `en` and `it` keys. No copy is hardcoded in components.

### Add a role page

1. Add the slug to `roleSlugs` in `src/content/roles.ts`.
2. Add the role object under both `roles.en` and `roles.it` (the `RoleContent` type enforces the required sections: intro, what-they-do, stack, anonymised profile, savings band, mini-FAQ).
3. Done — routes, sitemap entries, metadata and JSON-LD are generated from the content.

### Add a blog article

1. Add a `BlogPost` object to `blogPosts.en` and `blogPosts.it` in `src/content/blog.ts` (same slug in both).
2. Sections are `{ heading?, paragraphs[], list? }`; headings become the TOC automatically. `Article` + `BreadcrumbList` JSON-LD are emitted by the template.

## The Enable Digital bridge

`/enable-digital` (and `/it/enable-digital`) is the routing page for visitors who need Italian
project management or senior in-market specialists rather than delivery capacity. It sorts four
common situations to the right company instead of redirecting blindly, and it's reachable from
the main nav footer column, a dedicated home-page section, and the footer bridge card. Copy
lives in `src/content/enable-digital.ts`; the outbound URL is `ENABLE_DIGITAL_URL` in
`src/lib/site.ts`.

## Contact form

`src/components/LeadForm.tsx` collects the qualifying fields (name, email, agency, team size, roles
needed, message) and posts them to `src/app/api/lead/route.ts`, which validates them server-side and
forwards the lead as JSON to whatever you put in `LEAD_WEBHOOK_URL`.

```bash
LEAD_WEBHOOK_URL=https://…    # any endpoint that accepts a JSON POST
LEAD_WEBHOOK_TOKEN=…          # optional; sent as `Authorization: Bearer …`
```

Deliberately provider-agnostic: a Formspree or Basin endpoint, a Zapier/Make/n8n webhook, a Slack
incoming webhook, or your own CRM all work without touching the code.

**If `LEAD_WEBHOOK_URL` is not set, production returns 503 and the form shows the fallback email
address.** That is intentional. The alternative — telling a visitor "we'll be in touch" while the
lead goes nowhere — is the worst possible failure for a brand whose whole pitch is reliability.
In development the lead is logged to the server console and the form succeeds, so it stays testable.

The endpoint also carries a honeypot field, a 10-second delivery timeout, per-field length caps and a
best-effort in-memory rate limit (5 requests per minute per IP). That limit lives in instance memory,
so on serverless it throttles a naive flood, not a determined attacker — put the form provider's own
spam filter or a WAF in front for the rest.

## Verification

`docs/verification.md` holds the Lighthouse scores, the accessibility fixes, the structured-data
validation and the responsive sweep, plus the one open caveat on LCP measurement.

## SEO checklist (brief §5)

- SSG for all pages; `sitemap.xml` + `robots.txt` generated
- Canonical + hreflang EN/IT/x-default on every page (`pageMetadata`)
- Unique title/description per page from the content layer; dynamic branded OG images via `/og`
- JSON-LD: `Organization`, `Service`, `FAQPage`, `Article`, `BreadcrumbList` (`src/components/JsonLd.tsx`)
- Clean URLs: `/roles/paid-media`, `/pricing`, `/it/...`
- Animations reserve their space (no CLS); GSAP lazy-loads only where used

## Claims policy

Every number in the copy (pricing bands, salary benchmarks, savings ranges, guarantee windows, fair-pay multiplier) comes from the 2025 market analysis or the internal Enable Digital case. No invented testimonials, logos or metrics — keep it that way when editing.
