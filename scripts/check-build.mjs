/**
 * Controlli di qualità sulla build statica in dist/.
 * Verifica: title/description unici e di lunghezza corretta, un solo H1,
 * canonical/hreflang presenti e coerenti, JSON-LD parsabile, link interni
 * non rotti, immagini OG esistenti, alt text, lingua dichiarata.
 *
 * Uso: node scripts/check-build.mjs   (dopo npm run build)
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const PUBLIC = new URL('../public/', import.meta.url).pathname;
const SITE = 'https://enableadvisory.com';

const errors = [];
const warnings = [];
const err = (f, m) => errors.push(`${f}: ${m}`);
const warn = (f, m) => warnings.push(`${f}: ${m}`);

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (entry.endsWith('.html')) out.push(full);
  }
  return out;
}

const files = walk(DIST);
const titles = new Map();
const descriptions = new Map();
const routes = new Set(
  files.map((f) => {
    const rel = '/' + relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');
    return rel;
  })
);

/** Pagine noindex: escluse dalla sitemap di proposito (vedi astro.config.mjs). */
const noindexPages = new Set();

for (const file of files) {
  const name = relative(DIST, file);
  const html = readFileSync(file, 'utf8');
  const isRedirect = name === 'index.html';
  const is404 = name === '404.html';
  const noindex = /<meta name="robots" content="noindex/.test(html);
  if (noindex) noindexPages.add(name);

  // --- title / description
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!title) err(name, 'manca <title>');
  else if (!isRedirect) {
    if (title.length > 60) err(name, `title ${title.length} char (>60): "${title}"`);
    if (titles.has(title)) err(name, `title duplicato con ${titles.get(title)}`);
    titles.set(title, name);
  }
  if (!isRedirect) {
    if (!desc) err(name, 'manca meta description');
    else {
      if (!noindex && (desc.length < 80 || desc.length > 165))
        warn(name, `description ${desc.length} char (ideale 140–160)`);
      if (descriptions.has(desc)) err(name, `description duplicata con ${descriptions.get(desc)}`);
      descriptions.set(desc, name);
    }
  }

  // --- H1 unico
  const h1s = html.match(/<h1[\s>]/g) ?? [];
  if (!isRedirect && !is404 && h1s.length !== 1) err(name, `${h1s.length} H1 (deve essere 1)`);

  // --- gerarchia heading: nessun salto (h2 → h4)
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((m) => Number(m[1]));
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] > levels[i - 1] + 1)
      warn(name, `salto di heading h${levels[i - 1]} → h${levels[i]}`);
  }

  // --- lang
  const lang = html.match(/<html lang="([^"]*)"/)?.[1];
  if (!lang) err(name, 'manca lang su <html>');

  // --- canonical + hreflang (le pagine noindex non devono averli: sarebbero
  // segnali contraddittori verso URL che non vogliamo far indicizzare)
  if (!isRedirect && !is404 && !noindex) {
    const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
    if (!canonical) err(name, 'manca canonical');
    else {
      const expected = SITE + '/' + relative(DIST, file).replace(/index\.html$/, '');
      if (canonical !== expected) err(name, `canonical "${canonical}" ≠ atteso "${expected}"`);
    }
    const hreflangs = [...html.matchAll(/hreflang="([^"]*)" href="([^"]*)"/g)];
    const codes = hreflangs.map((m) => m[1]);
    for (const req of ['it', 'en', 'x-default']) {
      if (!codes.includes(req)) err(name, `manca hreflang ${req}`);
    }
    // Gli URL hreflang devono esistere nella build
    for (const [, code, href] of hreflangs) {
      const path = href.replace(SITE, '');
      if (!routes.has(path)) err(name, `hreflang ${code} punta a rotta inesistente: ${path}`);
    }
  }

  // --- JSON-LD parsabile
  for (const m of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  )) {
    try {
      const data = JSON.parse(m[1]);
      const types = JSON.stringify(data['@graph'] ?? data);
      if (!types.includes('@type')) err(name, 'blocco JSON-LD senza @type');
    } catch (e) {
      err(name, `JSON-LD non parsabile: ${e.message}`);
    }
  }

  // --- OG image esistente
  const og = html.match(/<meta property="og:image" content="([^"]*)"/)?.[1];
  if (og && !isRedirect) {
    const p = og.replace(SITE, '');
    if (!existsSync(join(PUBLIC, p))) err(name, `og:image mancante in public: ${p}`);
  }

  // --- link interni
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1];
    if (href.startsWith('/_astro/') || href.startsWith('/fonts/') || href.startsWith('/og/'))
      continue;
    if (/\.(xml|txt|svg|png|ico|webmanifest)$/.test(href)) continue;
    if (!routes.has(href)) err(name, `link interno rotto: ${href}`);
  }

  // --- immagini con alt
  for (const m of html.matchAll(/<img\b([^>]*)>/g)) {
    if (!/\balt=/.test(m[1])) err(name, 'tag <img> senza attributo alt');
  }

  // --- href non navigabili: un segnaposto in un href porta a un 404, e uno
  // schermo lettore lo annuncia comunque come link. Finché l'URL non c'è,
  // l'elemento non deve essere un link.
  for (const m of html.matchAll(/href="([^"]*)"/g)) {
    const href = m[1];
    if (/PLACEHOLDER|\[PREZZO\]|TODO/i.test(href))
      err(name, `href segnaposto (link rotto): ${href.slice(0, 60)}`);
    else if (
      href &&
      !/^(https?:|mailto:|tel:|#|\/)/.test(href) &&
      !href.startsWith('data:')
    )
      err(name, `href relativo sospetto: ${href.slice(0, 60)}`);
  }

  // --- placeholder non marcati / testo segnaposto sfuggito
  if (/\bLorem ipsum\b/i.test(html)) err(name, 'contiene testo Lorem ipsum');
  if (/\bTODO\b/.test(html.replace(/<!--[\s\S]*?-->/g, '')))
    warn(name, 'TODO visibile nel contenuto (fuori dai commenti)');
}

// --- sitemap
const sitemapIndex = join(DIST, 'sitemap-index.xml');
if (!existsSync(sitemapIndex)) err('dist', 'manca sitemap-index.xml');
else {
  const sm = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf8');
  const urls = [...sm.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1]);
  const pages = files
    .filter((f) => {
      const rel = relative(DIST, f);
      return !['index.html', '404.html'].includes(rel) && !noindexPages.has(rel);
    })
    .map((f) => SITE + '/' + relative(DIST, f).replace(/index\.html$/, ''));
  for (const p of pages) {
    if (!urls.includes(p)) err('sitemap', `pagina assente dalla sitemap: ${p}`);
  }
  // Una pagina noindex nella sitemap è un segnale contraddittorio
  for (const rel of noindexPages) {
    const url = SITE + '/' + rel.replace(/index\.html$/, '');
    if (urls.includes(url)) err('sitemap', `pagina noindex presente in sitemap: ${url}`);
  }
  // Ogni URL deve portare i suoi alternates, non solo qualcuno
  const withAlt = (sm.match(/<url>/g) ?? []).length;
  const altBlocks = (sm.match(/hreflang="x-default"/g) ?? []).length;
  if (altBlocks < withAlt)
    err('sitemap', `alternates hreflang su ${altBlocks}/${withAlt} URL (attesi tutti)`);
}
if (!existsSync(join(DIST, 'robots.txt'))) err('dist', 'manca robots.txt');

// --- report
console.log(`\nControllate ${files.length} pagine HTML.`);
if (warnings.length) {
  console.log(`\n⚠  ${warnings.length} warning:`);
  warnings.forEach((w) => console.log('   ' + w));
}
if (errors.length) {
  console.log(`\n✗ ${errors.length} errori:`);
  errors.forEach((e) => console.log('   ' + e));
  process.exit(1);
}
console.log('\n✓ Nessun errore.\n');
