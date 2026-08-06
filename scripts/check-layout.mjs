/**
 * Audit di layout su tutte le rotte, desktop e mobile.
 * Cerca i difetti che non si vedono nel codice: overflow orizzontale,
 * elementi che escono dal viewport, testo che tocca i bordi, sezioni vuote,
 * immagini rotte, CTA sovrapposte alla nav fissa.
 *
 * Uso: npm run build && npx astro preview --port 4321   (in un altro terminale)
 *      node scripts/check-layout.mjs [url-base]
 */
import { chromium, devices } from 'playwright';

const BASE = process.argv[2] ?? 'http://localhost:4321';
const VIEWPORTS = [
  ['desktop', { viewport: { width: 1440, height: 900 } }],
  ['laptop', { viewport: { width: 1280, height: 800 } }],
  ['tablet', { viewport: { width: 834, height: 1112 } }],
  ['mobile', { ...devices['Pixel 5'] }],
];

const problems = [];
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

const sitemap = await (await fetch(`${BASE}/sitemap-0.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

for (const [vpName, vpOpts] of VIEWPORTS) {
  const ctx = await browser.newContext(vpOpts);
  const page = await ctx.newPage();
  for (const route of routes) {
    await page.goto(BASE + route, { waitUntil: 'domcontentloaded' });
    // rivela tutto: senza scroll gli elementi animati restano a opacity 0
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(250);

    const found = await page.evaluate(() => {
      const out = [];
      const vw = document.documentElement.clientWidth;

      // 1. overflow orizzontale della pagina
      if (document.documentElement.scrollWidth > vw + 1)
        out.push(`overflow orizzontale: scrollWidth ${document.documentElement.scrollWidth} > ${vw}`);

      // 2. elementi che sporgono oltre il bordo destro
      const overflowing = [...document.querySelectorAll('body *')].filter((el) => {
        const s = getComputedStyle(el);
        if (s.position === 'fixed' || s.display === 'none' || s.visibility === 'hidden') return false;
        if (el.closest('[aria-hidden="true"]')) return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.right > vw + 2;
      });
      if (overflowing.length)
        out.push(
          `${overflowing.length} elementi oltre il bordo destro, primo: ` +
            overflowing[0].tagName + '.' + String(overflowing[0].className).slice(0, 40)
        );

      // 3. sezioni visibilmente vuote (errore di rendering di un componente)
      const empty = [...document.querySelectorAll('main section')].filter(
        (s) => s.innerText.trim().length < 10
      );
      if (empty.length) out.push(`${empty.length} sezioni senza testo`);

      // 4. immagini rotte
      const broken = [...document.querySelectorAll('img')].filter(
        (i) => i.complete && i.naturalWidth === 0
      );
      if (broken.length) out.push(`${broken.length} immagini non caricate`);

      // 5. il primo H1 non deve finire sotto la nav fissa
      const h1 = document.querySelector('h1');
      const header = document.querySelector('header');
      if (h1 && header) {
        const hr = h1.getBoundingClientRect();
        const headerH = header.getBoundingClientRect().height;
        if (hr.top < headerH && hr.bottom > 0)
          out.push(`H1 sotto la nav fissa (top ${Math.round(hr.top)} < ${Math.round(headerH)})`);
      }

      // 6. testo che tocca il bordo sinistro (padding del container perso).
      // Un left negativo è invece deliberato (honeypot antispam fuori schermo).
      const flush = [...document.querySelectorAll('main p, main h1, main h2, main li')].filter(
        (el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.left >= 0 && r.left < 8;
        }
      );
      if (flush.length) out.push(`${flush.length} elementi di testo a filo del bordo sinistro`);

      return out;
    });

    found.forEach((f) => problems.push(`[${vpName}] ${route}: ${f}`));
  }
  await ctx.close();
}

await browser.close();

console.log(`\nAudit layout: ${routes.length} rotte × ${VIEWPORTS.length} viewport\n`);
if (problems.length) {
  console.log(`✗ ${problems.length} problemi:`);
  problems.forEach((p) => console.log('   ' + p));
  process.exit(1);
}
console.log('✓ Nessun problema di layout.\n');
