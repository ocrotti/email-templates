/**
 * Controlli di accessibilità e motion su una build servita localmente.
 * Verifica: skip link, navigazione da tastiera, focus visibile, aria su
 * nav/menu/accordion, prefers-reduced-motion, contenuto visibile senza JS.
 *
 * Uso: npm run build && npx astro preview --port 4321   (in un altro terminale)
 *      node scripts/check-a11y.mjs [url-base]
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] ?? 'http://localhost:4321';
const errors = [];
const ok = [];
const check = (cond, msg) => (cond ? ok.push(msg) : errors.push(msg));

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

/* --------- 1. Contenuto visibile senza JS (SEO + no-JS + fallback) -------- */
{
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/it/`, { waitUntil: 'domcontentloaded' });
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll('[data-reveal], .hero-line-inner')].filter(
      (el) => getComputedStyle(el).opacity === '0'
    ).length
  );
  check(hidden === 0, `senza JS: ${hidden} elementi con opacity 0 (devono essere 0)`);
  const h1 = await page.locator('h1').innerText();
  check(h1.length > 10, `senza JS: H1 presente ("${h1.slice(0, 40)}…")`);
  await ctx.close();
}

/* -------------------- 2. prefers-reduced-motion: reduce ------------------- */
{
  const ctx = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/it/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  const hidden = await page.evaluate(() =>
    [...document.querySelectorAll('[data-reveal], .hero-line-inner')].filter(
      (el) => getComputedStyle(el).opacity === '0'
    ).length
  );
  check(hidden === 0, `reduced-motion: ${hidden} elementi invisibili (devono essere 0)`);
  // Lenis non deve prendere il controllo dello scroll
  const lenisOn = await page.evaluate(() =>
    document.documentElement.classList.contains('lenis')
  );
  check(!lenisOn, 'reduced-motion: smooth scroll disattivato');
  await ctx.close();
}

/* ---------------- 3. Tastiera: skip link, focus, tab order --------------- */
{
  const page = await browser.newPage();
  await page.goto(`${BASE}/it/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  await page.keyboard.press('Tab');
  await page.waitForTimeout(500); // la transizione dello skip link dura 0.3s
  const first = await page.evaluate(() => ({
    text: document.activeElement?.textContent?.trim(),
    cls: document.activeElement?.className,
    outline: getComputedStyle(document.activeElement).outlineWidth,
    visible: document.activeElement.getBoundingClientRect().top >= 0,
  }));
  check(first.cls?.includes('skip-link'), `primo Tab = skip link (trovato: "${first.text}")`);
  check(first.visible, 'skip link visibile quando riceve focus');
  check(first.outline !== '0px', `focus ring presente sullo skip link (${first.outline})`);

  // Attiva lo skip link e verifica che il focus atterri sul main
  await page.keyboard.press('Enter');
  await page.waitForTimeout(300);
  const afterSkip = await page.evaluate(() => document.activeElement?.id);
  check(afterSkip === 'main', `skip link porta il focus su #main (attuale: ${afterSkip})`);

  // Percorre la pagina col solo Tab: ogni stop deve avere un focus ring reale
  // (:focus-visible non si attiva con .focus() programmatico, va simulata la tastiera)
  await page.evaluate(() => document.body.focus());
  const seen = new Set();
  let noRing = 0;
  let stops = 0;
  for (let i = 0; i < 60; i++) {
    await page.keyboard.press('Tab');
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const s = getComputedStyle(el);
      return {
        key: el.tagName + '|' + (el.id || el.className) + '|' + el.textContent?.slice(0, 20),
        ring: !(s.outlineStyle === 'none' && s.boxShadow === 'none'),
      };
    });
    if (!info) continue;
    if (seen.has(info.key)) break; // giro completato
    seen.add(info.key);
    stops++;
    if (!info.ring) noRing++;
  }
  check(
    noRing === 0,
    `${stops} stop di tastiera percorsi, ${noRing} senza indicatore di focus`
  );
  await page.close();
}

/* ------------------------ 4. Menu mobile: aria + Esc --------------------- */
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(`${BASE}/it/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const toggle = page.locator('[data-menu-toggle]');
  check(
    (await toggle.getAttribute('aria-expanded')) === 'false',
    'menu: aria-expanded="false" da chiuso'
  );
  check(!!(await toggle.getAttribute('aria-controls')), 'menu: aria-controls presente');
  await toggle.click();
  await page.waitForTimeout(900);
  check(
    (await toggle.getAttribute('aria-expanded')) === 'true',
    'menu: aria-expanded="true" da aperto'
  );
  const focusInMenu = await page.evaluate(() =>
    document.querySelector('[data-menu]')?.contains(document.activeElement)
  );
  check(focusInMenu, 'menu: il focus entra nell’overlay all’apertura');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(600);
  check(
    (await toggle.getAttribute('aria-expanded')) === 'false',
    'menu: Esc chiude l’overlay'
  );
  await page.close();
}

/* ---------------------- 5. Accordion FAQ: aria + stato ------------------- */
{
  const page = await browser.newPage();
  await page.goto(`${BASE}/it/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const trig = page.locator('[data-accordion-trigger]').first();
  const panelId = await trig.getAttribute('aria-controls');
  check(!!panelId, 'accordion: aria-controls presente');
  check(
    (await trig.getAttribute('aria-expanded')) === 'false',
    'accordion: aria-expanded="false" da chiuso'
  );
  const panelHidden = await page.evaluate(
    (id) => getComputedStyle(document.getElementById(id).firstElementChild).visibility,
    panelId
  );
  check(panelHidden === 'hidden', 'accordion: pannello chiuso non focalizzabile (visibility hidden)');
  await trig.click();
  await page.waitForTimeout(800);
  check(
    (await trig.getAttribute('aria-expanded')) === 'true',
    'accordion: aria-expanded="true" da aperto'
  );
  const panelShown = await page.evaluate(
    (id) => getComputedStyle(document.getElementById(id).firstElementChild).visibility,
    panelId
  );
  check(panelShown === 'visible', 'accordion: pannello aperto visibile');
  await page.close();
}

/* ------------- 6. Landmark, lingua, label dei form su più pagine --------- */
{
  const page = await browser.newPage();
  // Percorre ogni rotta della sitemap, non un campione
  const sitemap = await (await fetch(`${BASE}/sitemap-0.xml`)).text();
  const routes = [...sitemap.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) =>
    new URL(m[1]).pathname
  );
  console.log(`Audit landmark/label su ${routes.length} rotte…`);
  const pageIssues = [];
  for (const p of routes) {
    const res = await page.goto(BASE + p, { waitUntil: 'domcontentloaded' });
    if (!res?.ok()) {
      pageIssues.push(`${p}: HTTP ${res?.status()}`);
      continue;
    }
    const audit = await page.evaluate(() => {
      const unlabeled = [...document.querySelectorAll('input, select, textarea')].filter(
        (el) =>
          el.type !== 'hidden' &&
          !el.closest('.hp-field') &&
          !el.getAttribute('aria-label') &&
          !el.labels?.length
      ).length;
      const navsNoLabel = [...document.querySelectorAll('nav')].filter(
        (n) => !n.getAttribute('aria-label') && !n.getAttribute('aria-labelledby')
      ).length;
      // Un aria-labelledby deve puntare a un id che esiste davvero
      const danglingLabelledby = [...document.querySelectorAll('[aria-labelledby]')].filter(
        (el) =>
          !el
            .getAttribute('aria-labelledby')
            .split(/\s+/)
            .every((id) => document.getElementById(id))
      ).length;
      const emptyLinks = [...document.querySelectorAll('a[href]')].filter(
        (a) => !a.textContent.trim() && !a.getAttribute('aria-label') && !a.querySelector('img[alt]')
      ).length;
      return {
        main: document.querySelectorAll('main').length,
        header: document.querySelectorAll('header').length,
        footer: document.querySelectorAll('footer').length,
        lang: document.documentElement.lang,
        unlabeled,
        navsNoLabel,
        danglingLabelledby,
        emptyLinks,
      };
    });
    if (audit.main !== 1) pageIssues.push(`${p}: ${audit.main} <main>`);
    if (audit.header !== 1 || audit.footer !== 1) pageIssues.push(`${p}: header/footer non unici`);
    if (!audit.lang) pageIssues.push(`${p}: manca lang`);
    if (audit.unlabeled) pageIssues.push(`${p}: ${audit.unlabeled} campi senza label`);
    if (audit.navsNoLabel) pageIssues.push(`${p}: ${audit.navsNoLabel} <nav> senza aria-label`);
    if (audit.danglingLabelledby)
      pageIssues.push(`${p}: ${audit.danglingLabelledby} aria-labelledby verso id inesistenti`);
    if (audit.emptyLinks) pageIssues.push(`${p}: ${audit.emptyLinks} link senza nome accessibile`);
  }
  check(
    pageIssues.length === 0,
    `${routes.length} rotte: landmark, lang, label e nomi accessibili corretti`
  );
  pageIssues.forEach((i) => errors.push(i));
  await page.close();
}

await browser.close();

console.log(`\n✓ ${ok.length} controlli superati`);
ok.forEach((o) => console.log('   ' + o));
if (errors.length) {
  console.log(`\n✗ ${errors.length} problemi:`);
  errors.forEach((e) => console.log('   ' + e));
  process.exit(1);
}
console.log('\nNessun problema di accessibilità rilevato.\n');
