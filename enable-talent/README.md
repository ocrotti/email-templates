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

## Contact form

`src/components/LeadForm.tsx` is wired with qualifying fields (name, email, agency, team size, roles needed, message) and a placeholder submit handler. To go live, point `onSubmit` at your provider (Formspree/Basin endpoint or a Next API route) — the TODO marks the exact line.

## SEO checklist (brief §5)

- SSG for all pages; `sitemap.xml` + `robots.txt` generated
- Canonical + hreflang EN/IT/x-default on every page (`pageMetadata`)
- Unique title/description per page from the content layer; dynamic branded OG images via `/og`
- JSON-LD: `Organization`, `Service`, `FAQPage`, `Article`, `BreadcrumbList` (`src/components/JsonLd.tsx`)
- Clean URLs: `/roles/paid-media`, `/pricing`, `/it/...`
- Animations reserve their space (no CLS); GSAP lazy-loads only where used

## Claims policy

Every number in the copy (pricing bands, salary benchmarks, savings ranges, guarantee windows, fair-pay multiplier) comes from the 2025 market analysis or the internal Enable Digital case. No invented testimonials, logos or metrics — keep it that way when editing.
