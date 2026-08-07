/**
 * Crea una copia del sito apribile con doppio clic, senza server né Node.
 *
 * Astro genera percorsi assoluti (/_astro/…, /it/servizi/) che con il
 * protocollo file:// puntano alla radice del disco. Qui vengono riscritti in
 * percorsi relativi alla profondità di ogni pagina, e le rotte con slash
 * finale diventano il rispettivo index.html.
 *
 * Uso: npm run build && npm run portable   → dist-portable/ (+ apri START.html)
 *
 * Il browser blocca i moduli ES caricati da file://, quindi il sistema di
 * animazione viene ribundlato come script classico (IIFE) e le transizioni di
 * pagina — che richiedono un fetch fra documenti, anch'esso bloccato — sono
 * rimosse: i link tornano a una navigazione normale. Tutto il resto (smooth
 * scroll, reveal, contatori, menu, accordion) funziona.
 */
import {
  readFileSync,
  writeFileSync,
  cpSync,
  rmSync,
  existsSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { build as esbuild } from 'esbuild';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const OUT = join(ROOT, 'dist-portable');

if (!existsSync(DIST)) {
  console.error('dist/ non esiste: eseguire prima `npm run build`.');
  process.exit(1);
}

rmSync(OUT, { recursive: true, force: true });
cpSync(DIST, OUT, { recursive: true });

function walk(dir, filter, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, filter, out);
    else if (filter(entry)) out.push(full);
  }
  return out;
}

/** Percorso relativo (con ./ iniziale) da un file alla radice del sito. */
function toRoot(file) {
  const rel = relative(dirname(file), OUT).replace(/\\/g, '/');
  return rel === '' ? '.' : rel;
}

const routes = new Set(
  walk(OUT, (f) => f.endsWith('.html')).map(
    (f) => '/' + relative(OUT, f).replace(/\\/g, '/').replace(/index\.html$/, '')
  )
);

// Il sistema di animazione, ribundlato come script classico caricabile da file://
await esbuild({
  entryPoints: [join(ROOT, 'src/scripts/motion.ts')],
  bundle: true,
  format: 'iife',
  minify: true,
  target: 'es2020',
  outfile: join(OUT, 'portable-motion.js'),
  // Senza il router di Astro l'evento di pagina pronta non viene mai emesso:
  // lo si emette a mano una volta caricato il DOM.
  footer: {
    js: `document.addEventListener("DOMContentLoaded",function(){document.dispatchEvent(new Event("astro:page-load"))});if(document.readyState!=="loading"){document.dispatchEvent(new Event("astro:page-load"))}`,
  },
  logLevel: 'silent',
});

let htmlCount = 0;
for (const file of walk(OUT, (f) => f.endsWith('.html'))) {
  const base = toRoot(file);
  let html = readFileSync(file, 'utf8');

  // Via i moduli ES (bloccati da file://), dentro il bundle classico.
  // Via anche i preload dei font: `crossorigin` fallisce il controllo CORS su
  // file:// e i font arrivano comunque dal CSS, il preload qui non serve.
  html = html
    .replace(/<link rel="preload"[^>]*>/g, '')
    .replace(/<script type="module" src="[^"]*"><\/script>/g, '')
    .replace(
      '</body>',
      `<script src="${base}/portable-motion.js"></script></body>`
    );

  html = html.replace(/(href|src|content)="(\/[^"]*)"/g, (match, attr, url) => {
    // Gli URL assoluti nei meta OG/canonical devono restare tali
    if (attr === 'content') return match;
    let target = url;
    // Una rotta con slash finale corrisponde al suo index.html
    if (target.endsWith('/') && routes.has(target)) target = target + 'index.html';
    return `${attr}="${base}${target}"`;
  });

  writeFileSync(file, html);
  htmlCount++;
}

// Il CSS referenzia i font dalla radice: da dist-portable/_astro/ servono ../
let cssCount = 0;
for (const file of walk(OUT, (f) => f.endsWith('.css'))) {
  const base = toRoot(file);
  const css = readFileSync(file, 'utf8').replace(
    /url\((\/[^)]*)\)/g,
    (_, url) => `url(${base}${url})`
  );
  writeFileSync(file, css);
  cssCount++;
}

// Pagina d'ingresso: da aprire con doppio clic
writeFileSync(
  join(OUT, 'START.html'),
  `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>enable.advisory — anteprima offline</title>
<style>
  :root { color-scheme: dark }
  body { margin:0; min-height:100vh; display:grid; place-items:center;
         background:#0e0d0b; color:#f4f1ea; font:16px/1.6 ui-sans-serif,system-ui,sans-serif }
  .card { max-width:34rem; padding:2.5rem }
  h1 { font-size:1.9rem; margin:0 0 .4rem; letter-spacing:-.02em }
  .accent { color:#8fa8ff }
  p { color:#a8a29a; margin:.9rem 0 }
  .row { display:flex; gap:.75rem; flex-wrap:wrap; margin-top:1.8rem }
  a.btn { display:inline-block; padding:.85rem 1.5rem; border-radius:2px;
          text-decoration:none; font-weight:500 }
  .primary { background:#2b5cff; color:#fff }
  .ghost { border:1px solid rgba(255,255,255,.25); color:#f4f1ea }
  small { display:block; margin-top:2rem; color:#57534b; font-size:.8125rem }
</style>
</head>
<body>
  <div class="card">
    <h1>enable<span class="accent">.advisory</span></h1>
    <p>Anteprima offline del sito. Scegli la lingua.</p>
    <div class="row">
      <a class="btn primary" href="./it/index.html">Apri in italiano</a>
      <a class="btn ghost" href="./en/index.html">Open in English</a>
    </div>
    <small>
      Copia statica apribile senza server. Animazioni, smooth scroll, contatori,
      menu e accordion funzionano; le transizioni fra pagine no, perché il
      browser blocca le richieste tra file locali — i link navigano in modo
      normale. Per l’esperienza completa: <code>npm run dev</code>.
    </small>
  </div>
</body>
</html>
`
);

console.log(`dist-portable/ pronta — ${htmlCount} pagine, ${cssCount} fogli di stile.`);
console.log('Apri dist-portable/START.html con un doppio clic.');
