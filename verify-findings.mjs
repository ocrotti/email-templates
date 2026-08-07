import { chromium } from 'playwright';

const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

// ---------- Finding 0: mobile menu toggle under overlay ----------
const p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.emulateMedia({ reducedMotion: 'reduce' });
await p.goto('http://localhost:4321/it/', { waitUntil: 'networkidle' });
await p.waitForTimeout(1500);

const toggle = p.locator('[data-menu-toggle]');
const boxBefore = await toggle.boundingBox();
await toggle.click();
await p.waitForTimeout(800);

const res = await p.evaluate(() => {
  const t = document.querySelector('[data-menu-toggle]');
  const r = t.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const topEl = document.elementFromPoint(cx, cy);
  const menu = document.querySelector('[data-menu]');
  const menuZ = getComputedStyle(menu).zIndex;
  const menuPos = getComputedStyle(menu).position;
  const toggleZ = getComputedStyle(t).zIndex;
  const togglePos = getComputedStyle(t).position;
  const headerZ = getComputedStyle(document.querySelector('[data-header]')).zIndex;
  return {
    cx, cy,
    topElTag: topEl?.tagName,
    topElClass: topEl?.className?.toString().slice(0, 80),
    topElIsToggleOrChild: t.contains(topEl),
    menuZ, menuPos, toggleZ, togglePos, headerZ,
    expanded: t.getAttribute('aria-expanded'),
    menuOpen: menu.classList.contains('is-open'),
  };
});
console.log('MENU-OPEN-STATE:', JSON.stringify(res, null, 1));

// try clicking at the toggle's position while menu open
await p.mouse.click(res.cx, res.cy);
await p.waitForTimeout(800);
const after = await p.evaluate(() => ({
  expanded: document.querySelector('[data-menu-toggle]').getAttribute('aria-expanded'),
  menuOpen: document.querySelector('[data-menu]').classList.contains('is-open'),
}));
console.log('AFTER-CLICK-AT-TOGGLE:', JSON.stringify(after));

// is there any visible close control? screenshot top of open menu
await p.screenshot({ path: '/tmp/claude-0/-home-user-email-templates/0a53abee-e18e-5048-b563-7fd700279d41/scratchpad/vf-menu-open.png', fullPage: false });

// Esc check (desktop only anyway)
await p.keyboard.press('Escape');
await p.waitForTimeout(600);
const afterEsc = await p.evaluate(() => ({
  expanded: document.querySelector('[data-menu-toggle]').getAttribute('aria-expanded'),
  menuOpen: document.querySelector('[data-menu]').classList.contains('is-open'),
}));
console.log('AFTER-ESC:', JSON.stringify(afterEsc));
await p.close();

// ---------- Finding 2: product card heights on /it/prodotti/ ----------
const p2 = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p2.emulateMedia({ reducedMotion: 'reduce' });
await p2.goto('http://localhost:4321/it/prodotti/', { waitUntil: 'networkidle' });
await p2.waitForTimeout(1500);
const cards = await p2.evaluate(() => {
  const grid = document.querySelector('[data-reveal-group].grid');
  const articles = Array.from(grid.querySelectorAll('article'));
  return articles.map((a) => {
    const r = a.getBoundingClientRect();
    const w = a.parentElement.getBoundingClientRect();
    return {
      artTop: Math.round(r.top + window.scrollY),
      artBottom: Math.round(r.bottom + window.scrollY),
      artH: Math.round(r.height),
      wrapH: Math.round(w.height),
    };
  });
});
console.log('PRODOTTI-CARDS:', JSON.stringify(cards, null, 1));

// home product cards for comparison
const p3 = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p3.emulateMedia({ reducedMotion: 'reduce' });
await p3.goto('http://localhost:4321/it/', { waitUntil: 'networkidle' });
await p3.waitForTimeout(1500);
const homeCards = await p3.evaluate(() => {
  const arts = Array.from(document.querySelectorAll('section .grid article'));
  return arts.slice(0, 6).map((a) => Math.round(a.getBoundingClientRect().height));
});
console.log('HOME-CARD-HEIGHTS:', JSON.stringify(homeCards));

await b.close();
