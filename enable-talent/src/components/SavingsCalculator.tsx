"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import Counter from "./Counter";
import { benchmarkByKey, podBarPercent, savingsPercent, type MarketKey } from "@/content/benchmarks";
import type { Locale } from "@/lib/site";

interface Props {
  roleLabel: string;
  marketLabel: string;
  markets: { key: MarketKey; label: string }[];
  roles: { key: string; label: string }[];
  localLabel: string;
  podLabel: string;
  savingsLabel: string;
  /** Shown instead of a percentage when a pod seat is not the cheaper option. */
  noSavingLabel: string;
  noSavingBody: string;
  perMonth: string;
  disclaimer: string;
  locale: Locale;
}

/**
 * Role x market cost comparison. Every figure derives from src/content/benchmarks.ts.
 *
 * The widget is allowed to lose the argument: where a pod seat costs more than the
 * local gross salary — content & social in Italy does — it says so plainly instead
 * of printing a negative number under the word "saving".
 */
export default function SavingsCalculator(props: Props) {
  const [roleKey, setRoleKey] = useState(props.roles[0].key);
  // Open on the visitor's own market: an Italian-language page defaulting to
  // Germany makes the primary audience do work to see their own number.
  const [market, setMarket] = useState<MarketKey>(props.locale === "it" ? "it" : "de");
  const reduced = useReducedMotion();

  const role = useMemo(() => benchmarkByKey(roleKey), [roleKey]);
  const local = role.markets[market];
  const pod = role.pod;
  const savings = savingsPercent(role, market);
  const podBar = podBarPercent(role, market);
  const podIsCheaper = savings > 0;

  const selectClass =
    "w-full appearance-none rounded-xl border border-ink-line bg-ink-soft px-4 py-3.5 text-sm text-paper outline-none transition-colors focus:border-blue-bright";

  return (
    <div className="rounded-3xl border border-ink-line bg-ink-soft/50 p-6 md:p-10">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mist">{props.roleLabel}</span>
          <select className={selectClass} value={roleKey} onChange={(e) => setRoleKey(e.target.value)}>
            {props.roles.map((r) => (
              <option key={r.key} value={r.key}>
                {r.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mist">{props.marketLabel}</span>
          <select className={selectClass} value={market} onChange={(e) => setMarket(e.target.value as MarketKey)}>
            {props.markets.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-10 space-y-8">
        {/* Local cost bar */}
        <div>
          <div className="mb-2 flex items-end justify-between gap-4">
            <span className="text-sm text-mist">{props.localLabel}</span>
            <span className="font-display text-2xl font-semibold text-paper md:text-3xl">
              <Counter key={`local-${roleKey}-${market}`} value={local} prefix="€" duration={0.8} locale={props.locale} />
              <span className="text-sm font-normal text-mist">{props.perMonth}</span>
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-ink-line/50">
            <motion.div
              key={`localbar-${roleKey}-${market}`}
              initial={reduced ? { width: "100%" } : { width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-mist/60"
            />
          </div>
        </div>

        {/* Pod cost bar */}
        <div>
          <div className="mb-2 flex items-end justify-between gap-4">
            <span className="text-sm text-paper">{props.podLabel}</span>
            <span className="font-display text-2xl font-semibold text-blue-bright md:text-3xl">
              <Counter key={`pod-${roleKey}-${market}`} value={pod} prefix="€" duration={0.8} locale={props.locale} />
              <span className="text-sm font-normal text-mist">{props.perMonth}</span>
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-ink-line/50">
            <motion.div
              key={`podbar-${roleKey}-${market}`}
              initial={reduced ? { width: `${podBar}%` } : { width: 0 }}
              whileInView={{ width: `${podBar}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-blue shadow-glow-blue"
            />
          </div>
        </div>

        {/* Verdict. Never a negative percentage. */}
        {podIsCheaper ? (
          <div className="flex items-baseline justify-between gap-4 rounded-2xl border border-blue/30 bg-blue/10 px-6 py-5">
            <span className="text-sm font-medium text-paper/90">{props.savingsLabel}</span>
            <span className="font-display text-4xl font-bold text-blue-bright md:text-5xl">
              <Counter key={`sav-${roleKey}-${market}`} value={savings} suffix="%" duration={0.5} locale={props.locale} />
            </span>
          </div>
        ) : (
          <div className="rounded-2xl border border-amber/30 bg-amber/10 px-6 py-5">
            <p className="font-display text-lg font-semibold text-amber">{props.noSavingLabel}</p>
            <p className="mt-2 text-sm leading-relaxed text-paper/80">{props.noSavingBody}</p>
          </div>
        )}
      </div>

      <p className="mt-6 text-xs leading-relaxed text-mist">{props.disclaimer}</p>
    </div>
  );
}
