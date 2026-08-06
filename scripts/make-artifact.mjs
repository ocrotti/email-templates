/**
 * Impacchetta tutte le pagine italiane in un unico file HTML autosufficiente,
 * pubblicabile come Artifact: niente server, niente richieste esterne.
 *
 * I font diventano data URI, il CSS e il bundle di animazione vengono inseriti
 * inline, e un piccolo router sostituisce il <main> al clic sui link interni
 * emettendo gli stessi eventi del router di Astro, così il sistema motion si
 * reinizializza esattamente come in produzione.
 *
 * Uso: npm run build && npm run portable && node scripts/make-artifact.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const OUT = join(ROOT, 'artifact-enable-advisory.html');

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const f = join(dir, e);
    if (statSync(f).isDirectory()) walk(f, out);
    else if (e === 'index.html') out.push(f);
  }
  return out;
}

/* --------------------------- CSS + font inline ---------------------------- */
const cssFile = readdirSync(join(DIST, '_astro')).find((f) => f.endsWith('.css'));
let css = readFileSync(join(DIST, '_astro', cssFile), 'utf8');
for (const font of readdirSync(join(DIST, 'fonts'))) {
  const b64 = readFileSync(join(DIST, 'fonts', font)).toString('base64');
  css = css.replaceAll(`/fonts/${font}`, `data:font/woff2;base64,${b64}`);
}

/* ------------------------------ Pagine IT --------------------------------- */
const pages = {};
for (const file of walk(join(DIST, 'it'))) {
  const route = '/' + relative(DIST, file).replace(/\\/g, '/').replace(/index\.html$/, '');
  const html = readFileSync(file, 'utf8');
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/)?.[1];
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? 'enable.advisory';
  if (!main) continue;
  // I blocchi JSON-LD non servono dentro l'anteprima
  pages[route] = { title, main: main.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '') };
}

const home = readFileSync(join(DIST, 'it', 'index.html'), 'utf8');
const header = home.match(/<header[\s\S]*?<\/header>/)[0];
const footer = home.match(/<footer[\s\S]*?<\/footer>/)[0];

// I link fuori dall'anteprima (EN, esterni) restano, ma il router li ignora
const motionJs = readFileSync(join(ROOT, 'dist-portable', 'portable-motion.js'), 'utf8')
  // il footer del bundle portabile emette l'evento al DOMContentLoaded: qui lo
  // gestisce il router, altrimenti si inizializzerebbe due volte
  .replace(/document\.addEventListener\("DOMContentLoaded".*$/, '');

const routerJs = `
(function () {
  var PAGES = ${JSON.stringify(pages)};
  var main = document.getElementById('app-main');
  var current = '/it/';

  function render(route, push) {
    var page = PAGES[route];
    if (!page) return false;
    document.dispatchEvent(new Event('astro:before-swap'));
    main.innerHTML = page.main;
    document.title = page.title;
    current = route;
    document.querySelectorAll('[data-header] a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === route) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    window.scrollTo(0, 0);
    if (push) history.pushState({ route: route }, '', '#' + route);
    document.dispatchEvent(new Event('astro:page-load'));
    return true;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="/it/"]');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    var route = a.getAttribute('href');
    if (PAGES[route]) { e.preventDefault(); render(route, true); }
  });

  window.addEventListener('popstate', function () {
    render((location.hash || '#/it/').slice(1), false);
  });

  var start = (location.hash || '').slice(1);
  if (!render(PAGES[start] ? start : '/it/', false)) render('/it/', false);
})();
`;

const doc = `<style>
${css}
/* L'anteprima è una copia statica: nessuna pagina è servita da un server, quindi
   i link verso l'inglese e i documenti legali fuori mappa restano inerti. */
#app-main:focus { outline: none; }
</style>

<a href="#app-main" class="skip-link">Salta al contenuto</a>
${header}
<main id="app-main" tabindex="-1"></main>
${footer}

<script>document.documentElement.classList.add('js');</script>
<script>${motionJs}</script>
<script>${routerJs}</script>
`;

writeFileSync(OUT, doc);
const kb = Math.round(Buffer.byteLength(doc) / 1024);
console.log(`artifact-enable-advisory.html — ${Object.keys(pages).length} pagine IT, ${kb} KB`);
