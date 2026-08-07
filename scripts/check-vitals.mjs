/**
 * Misura i Core Web Vitals sulle pagine principali con emulazione mobile
 * e CPU throttling 4×. Il vincolo di progetto è CLS = 0: le animazioni
 * usano solo transform/opacity e non devono mai spostare il layout.
 *
 * Uso: npm run build && npx astro preview --port 4321   (in un altro terminale)
 *      node scripts/check-vitals.mjs [url-base]
 */
import { chromium, devices } from 'playwright';

const BASE = process.argv[2] ?? 'http://localhost:4321';
const ROUTES = [
  '/it/',
  '/it/servizi/',
  '/it/servizi/compliance-governance-digitale/',
  '/it/prodotti/',
  '/it/risorse/nis2-guida-pmi/',
  '/it/contatti/',
  '/en/',
];
const CLS_BUDGET = 0.01; // il target è 0; si tollera solo il rumore di misura
const LCP_BUDGET_MS = 2500;

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const rows = [];
let failures = 0;

for (const route of ROUTES) {
  const ctx = await browser.newContext({ ...devices['Pixel 5'] });
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

  await page.addInitScript(() => {
    window.__cls = 0;
    window.__lcp = 0;
    window.__shifts = [];
    new PerformanceObserver((list) => {
      for (const e of list.getEntries()) {
        if (!e.hadRecentInput) {
          window.__cls += e.value;
          if (e.value > 0.0005)
            window.__shifts.push({
              value: +e.value.toFixed(4),
              nodes: e.sources
                ?.map((s) => s.node?.nodeName + '.' + (s.node?.className || '').toString().slice(0, 30))
                .slice(0, 3),
            });
        }
      }
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((list) => {
      const es = list.getEntries();
      window.__lcp = es[es.length - 1].startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });

  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  // scorre tutta la pagina: i reveal on scroll sono il rischio principale di CLS
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        y += 400;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 120);
        else setTimeout(res, 600);
      };
      step();
    });
  });
  await page.waitForTimeout(600);

  const v = await page.evaluate(() => ({
    cls: window.__cls,
    lcp: window.__lcp,
    shifts: window.__shifts,
  }));
  const clsOk = v.cls <= CLS_BUDGET;
  const lcpOk = v.lcp <= LCP_BUDGET_MS;
  if (!clsOk || !lcpOk) failures++;
  rows.push({ route, cls: v.cls, lcp: v.lcp, clsOk, lcpOk, shifts: v.shifts });
  await ctx.close();
}

await browser.close();

console.log('\nCore Web Vitals — Pixel 5, CPU 4× throttling\n');
console.log('  CLS     LCP      rotta');
for (const r of rows) {
  const mark = r.clsOk && r.lcpOk ? '✓' : '✗';
  console.log(
    `${mark} ${r.cls.toFixed(3)}   ${Math.round(r.lcp).toString().padStart(5)}ms  ${r.route}`
  );
  if (r.shifts.length) {
    r.shifts.forEach((s) => console.log(`      shift ${s.value} → ${(s.nodes ?? []).join(', ')}`));
  }
}
const worstCls = Math.max(...rows.map((r) => r.cls));
const worstLcp = Math.max(...rows.map((r) => r.lcp));
console.log(
  `\nPeggior CLS ${worstCls.toFixed(3)} (budget ${CLS_BUDGET}) · peggior LCP ${Math.round(worstLcp)}ms (budget ${LCP_BUDGET_MS}ms)`
);
if (failures) {
  console.log(`\n✗ ${failures} rotte fuori budget\n`);
  process.exit(1);
}
console.log('\n✓ Tutte le rotte nel budget.\n');
