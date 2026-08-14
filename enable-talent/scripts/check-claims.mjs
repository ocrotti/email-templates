#!/usr/bin/env node
/**
 * Fails the build when a published claim stops matching the benchmark data.
 *
 * This exists because the salary figures used to live in four hand-maintained
 * copies and drifted: the homepage calculator printed a NEGATIVE number under the
 * word "saving", and the SEO row contradicted the annual figure printed beside it.
 * Numbers on a page that sells honesty have to be checked by something other than
 * good intentions.
 *
 *   node scripts/check-claims.mjs
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");

const failures = [];
const fail = (msg) => failures.push(msg);

// --- Parse the benchmark data out of the TS source without a build step. ------
const src = read("src/content/benchmarks.ts");

const roles = [...src.matchAll(/key:\s*"([a-z]+)",[\s\S]*?markets:\s*\{\s*it:\s*(\d+),\s*de:\s*(\d+),\s*uk:\s*(\d+)\s*\}[\s\S]*?pod:\s*(\d+),/g)].map(
  (m) => ({ key: m[1], it: +m[2], de: +m[3], uk: +m[4], pod: +m[5] })
);

if (roles.length !== 5) {
  fail(`expected 5 benchmark roles, parsed ${roles.length} — has the shape of benchmarks.ts changed?`);
}

const bandMatch = src.match(/PUBLISHED_SAVINGS_BAND\s*=\s*\{\s*min:\s*(\d+),\s*max:\s*(\d+)/);
if (!bandMatch) fail("could not read PUBLISHED_SAVINGS_BAND");
const band = bandMatch ? { min: +bandMatch[1], max: +bandMatch[2] } : { min: 40, max: 70 };

const saving = (local, pod) => Math.round(((local - pod) / local) * 100);

// --- 1. Sub-floor combinations must all be declared in BELOW_BAND. -----------
// The copy leans on the calculator to tell the per-market truth, but a pair that
// silently drops under the published floor is exactly how a claim rots.
const declared = new Set(
  [...src.matchAll(/\{\s*role:\s*"([a-z]+)",\s*market:\s*"([a-z]{2})"\s*\}/g)].map((m) => `${m[1]}/${m[2]}`)
);
const actual = new Set();
for (const r of roles) {
  for (const market of ["it", "de", "uk"]) {
    if (saving(r[market], r.pod) < band.min) actual.add(`${r.key}/${market}`);
  }
}
for (const pair of actual) {
  if (!declared.has(pair)) {
    fail(`${pair}: saving is below the ${band.min}% floor but is not declared in BELOW_BAND.`);
  }
}
for (const pair of declared) {
  if (!actual.has(pair)) {
    fail(`${pair}: declared in BELOW_BAND but now clears the floor — remove the exception.`);
  }
}

// --- 2. No claim may exceed the published ceiling. ---------------------------
for (const r of roles) {
  for (const market of ["it", "de", "uk"]) {
    const s = saving(r[market], r.pod);
    if (s > band.max) {
      fail(`${r.key}/${market}: saving is ${s}%, above the published ceiling of ${band.max}%.`);
    }
  }
}

// --- 3. Role pages must not restate a hard savings percentage. ---------------
// They point at the calculator instead, so a data change cannot leave a stale
// number stranded on six pages.
const rolesSrc = read("src/content/roles.ts");
const hardPercent = [...rolesSrc.matchAll(/band:\s*"[^"]*?(\d+)[–-](\d+)%/g)];
if (hardPercent.length > 0) {
  fail(
    `roles.ts still hard-codes ${hardPercent.length} savings percentage band(s). ` +
      `Role pages must defer to the calculator and /marketing-salaries.`
  );
}

const contentFiles = ["home", "roles", "salaries", "talent", "case-study", "pricing", "blog", "outsourcing-guide", "white-label", "guarantee", "how-it-works"];

// --- 4. Every published band must say what it is measured against. -----------
// The band is against fully-loaded employer cost. Against the bare gross salaries
// on /marketing-salaries it is 11–70%, so an unqualified "40–70% lower" is a claim
// the site's own table contradicts. Each mention has to carry its basis.
const BASIS = [/employer cost/i, /costo datoriale/i];
const bandText = new RegExp(`${band.min}[–-]${band.max}\\s*%`, "g");
for (const f of contentFiles) {
  let text;
  try {
    text = read(`src/content/${f}.ts`);
  } catch {
    continue;
  }
  for (const m of text.matchAll(bandText)) {
    // The enclosing string literal: content is one double-quoted string per line-ish.
    const from = text.lastIndexOf('"', m.index);
    const to = text.indexOf('",', m.index);
    const literal = text.slice(from === -1 ? 0 : from, to === -1 ? text.length : to);
    if (!BASIS.some((re) => re.test(literal))) {
      const line = text.slice(0, m.index).split("\n").length;
      fail(
        `src/content/${f}.ts:${line} quotes the ${band.min}–${band.max}% band without naming its basis ` +
          `("employer cost" / "costo datoriale").`
      );
    }
  }
}

// --- 5. The forbidden figures must never reappear. ---------------------------
// Publishing Kenyan local pay or our own cost per specialist lets a reader compute
// the margin and turns the fair-pay policy into arithmetic.
const forbidden = [/14[.,]7\s*k/i, /\$?1[.,]225/, /KES\s*\d/, /\$8\d{2}\b/, /\$9\d{2}\b/];
for (const f of contentFiles) {
  let text;
  try {
    text = read(`src/content/${f}.ts`);
  } catch {
    continue;
  }
  for (const re of forbidden) {
    const hit = text.match(re);
    if (hit) fail(`src/content/${f}.ts contains a forbidden figure: ${JSON.stringify(hit[0])}`);
  }
}

// --- Report -----------------------------------------------------------------
if (failures.length > 0) {
  console.error("\nClaim check FAILED:\n");
  for (const f of failures) console.error(`  ✗ ${f}`);
  console.error("");
  process.exit(1);
}

console.log(`Claim check passed: ${roles.length} roles, band ${band.min}–${band.max}%.`);
for (const r of roles) {
  const parts = ["it", "de", "uk"].map((m) => `${m} ${saving(r[m], r.pod)}%`).join("  ");
  console.log(`  ${r.key.padEnd(8)} ${parts}`);
}
