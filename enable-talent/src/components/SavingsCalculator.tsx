"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import Counter from "./Counter";
import type { CalculatorRole } from "@/content/home";
import type { Locale } from "@/lib/site";

interface Props {
  roleLabel: string;
  marketLabel: string;
  markets: { key: "it" | "de" | "uk"; label: string }[];
  roles: CalculatorRole[];
  localLabel: string;
  podLabel: string;
  savingsLabel: string;
  perMonth: string;
  disclaimer: string;
  locale: Locale;
}

/**
 * Interactive savings calculator: pick a role and a market, get animated
 * count-up numbers and comparative bars. All figures from the market analysis.
 */
export default function SavingsCalculator(props: Props) {
  const [roleKey, setRoleKey] = useState(props.roles[0].key);
  const [market, setMarket] = useState<"it" | "de" | "uk">("it");
  const reduced = useReducedMotion();

  const role = useMemo(() => props.roles.find((r) => r.key === roleKey)!, [props.roles, roleKey]);
  const local = role.markets[market];
  const pod = role.pod;
  const savings = Math.round(((local - pod) / local) * 100);
  const podBar = Math.round((pod / local) * 100);

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
          <select
            className={selectClass}
            value={market}
            onChange={(e) => setMarket(e.target.value as "it" | "de" | "uk")}
          >
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
              <Counter key={`local-${roleKey}-${market}`} value={local} prefix="€" locale={props.locale} />
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
              <Counter key={`pod-${roleKey}-${market}`} value={pod} prefix="€" locale={props.locale} />
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

        {/* Savings */}
        <div className="flex items-baseline justify-between gap-4 rounded-2xl border border-blue/30 bg-blue/10 px-6 py-5">
          <span className="text-sm font-medium text-paper/90">{props.savingsLabel}</span>
          <span className="font-display text-4xl font-bold text-blue-bright md:text-5xl">
            <Counter key={`sav-${roleKey}-${market}`} value={savings} suffix="%" locale={props.locale} />
          </span>
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-mist">{props.disclaimer}</p>
    </div>
  );
}
