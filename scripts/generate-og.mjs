/**
 * Genera le immagini Open Graph (1200×630) in public/og/.
 *
 * Requisiti locali: font "ParkinsansOG" e "InterOG" installati a livello di
 * sistema (istanze statiche dei font variabili in public/fonts — vedi README).
 * Le immagini generate vengono committate: il deploy non dipende da questo script.
 *
 * Uso: npm run og
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = new URL('../public/og/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const INK = '#0e0d0b';
const PAPER = '#f4f1ea';
const MIST = '#a8a29a';
const ACCENT = '#2b5cff';
const ACCENT_SOFT = '#8fa8ff';

/** slug file (senza -lang) → titolo per lingua. Tenere allineato alle pagine. */
const pages = {
  default: { it: 'Consulenza digitale senior per PMI', en: 'Senior digital consulting for SMEs' },
  home: { it: 'Il tuo partner digitale senior,\naccountable sul risultato.', en: 'Your senior digital partner,\naccountable for the outcome.' },
  howWeWork: { it: 'Come lavoriamo:\nil modello senior.', en: 'How we work:\nthe senior model.' },
  services: { it: 'Quattro verticali.\nUn sistema.', en: 'Four verticals.\nOne system.' },
  serviceCompliance: { it: 'Compliance & governance:\nGDPR, NIS2, EAA, AI Act.', en: 'Compliance & governance:\nGDPR, NIS2, EAA, AI Act.' },
  serviceData: { it: 'Dati & AI:\nl’AI dove rende davvero.', en: 'Data & AI:\nAI where it pays back.' },
  serviceCrm: { it: 'CRM & martech:\nmetti a valore i clienti.', en: 'CRM & martech:\nturn customers into value.' },
  serviceWeb: { it: 'Web & e-commerce:\nconverte ed è conforme.', en: 'Web & e-commerce:\nconverts and complies.' },
  products: { it: 'Inizia con un passo\na prezzo fisso.', en: 'Start with a\nfixed-price step.' },
  caseStudies: { it: 'Casi studio:\nrisultati con numeri.', en: 'Case studies:\nresults with numbers.' },
  about: { it: 'Le persone che rispondono,\ncon nome e cognome.', en: 'The people who answer,\nby name.' },
  resources: { it: 'Guide operative,\nnon content marketing.', en: 'Practical guides,\nnot content marketing.' },
  resourceNis2: { it: 'NIS2 per PMI:\nguida completa.', en: 'NIS2 for SMEs:\nthe complete guide.' },
  resourceAi: { it: 'AI per le PMI:\nguida pratica.', en: 'AI for SMEs:\na practical guide.' },
  contact: { it: 'Parla con un senior,\nnon con un commerciale.', en: 'Talk to a senior,\nnot a salesperson.' },
  accessibility: { it: 'Dichiarazione\ndi accessibilità.', en: 'Accessibility\nstatement.' },
  privacy: { it: 'Privacy policy', en: 'Privacy policy' },
  cookies: { it: 'Cookie policy', en: 'Cookie policy' },
};

const esc = (s) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

function svgFor(title, lang) {
  const lines = title.split('\n');
  const fontSize = lines.some((l) => l.length > 30) ? 54 : 62;
  const lineHeight = fontSize * 1.18;
  const baseY = 630 - 150 - (lines.length - 1) * lineHeight;
  const tspans = lines
    .map((l, i) => `<tspan x="80" y="${baseY + i * lineHeight}">${esc(l)}</tspan>`)
    .join('');
  const label = lang === 'it' ? 'Consulenza digitale per PMI' : 'Digital consulting for SMEs';
  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${INK}"/>
  <radialGradient id="g" cx="88%" cy="-8%" r="75%">
    <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.22"/>
    <stop offset="60%" stop-color="${ACCENT}" stop-opacity="0"/>
  </radialGradient>
  <rect width="1200" height="630" fill="url(#g)"/>
  <text x="80" y="112" font-family="ParkinsansOG" font-size="40" fill="${PAPER}">enable<tspan fill="${ACCENT_SOFT}">.advisory</tspan></text>
  <text x="80" y="158" font-family="InterOG" font-size="21" letter-spacing="3" fill="${MIST}">${esc(label.toUpperCase())}</text>
  <text font-family="ParkinsansOG" font-size="${fontSize}" letter-spacing="-1" fill="${PAPER}">${tspans}</text>
  <rect x="80" y="${630 - 96}" width="72" height="6" fill="${ACCENT}"/>
  <text x="80" y="${630 - 52}" font-family="InterOG" font-size="22" fill="${MIST}">enableadvisory.com</text>
</svg>`;
}

for (const [key, titles] of Object.entries(pages)) {
  for (const lang of ['it', 'en']) {
    const file = `${OUT}${key}-${lang}.png`;
    await sharp(Buffer.from(svgFor(titles[lang], lang)))
      .png({ compressionLevel: 9, palette: true })
      .toFile(file);
    console.log('og:', `${key}-${lang}.png`);
  }
}
console.log('done');

/* Logo quadrato per Organization.logo (schema.org raccomanda un logo,
   non una card OG 1200×630). */
{
  const svg = `<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="96" fill="${INK}"/>
  <text x="92" y="316" font-family="ParkinsansOG" font-size="200" fill="${PAPER}">e</text>
  <circle cx="368" cy="296" r="44" fill="${ACCENT}"/>
</svg>`;
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(
    new URL('../public/logo.png', import.meta.url).pathname
  );
  console.log('og: logo.png (512×512)');
}
