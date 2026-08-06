"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ComparisonRow } from "@/content/home";

interface Props {
  columns: [string, string, string, string];
  rows: ComparisonRow[];
  note: string;
}

/**
 * Comparison table with rows revealing in sequence on scroll and the
 * enable.talent column highlighted with a soft blue glow.
 */
export default function ComparisonTable({ columns, rows, note }: Props) {
  const reduced = useReducedMotion();

  return (
    <div>
      <div className="overflow-x-auto pb-2">
        <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left text-sm">
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th
                  key={`${col}-${i}`}
                  className={`border-b border-ink-line pb-4 pr-6 align-bottom font-display text-base font-semibold ${
                    i === 3 ? "rounded-t-xl bg-blue/10 px-4 text-blue-bright shadow-glow-blue" : "text-paper/80"
                  } ${i === 0 ? "w-[22%]" : "w-[26%]"}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <motion.tr
                key={row.label}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: ri * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <th scope="row" className="border-b border-ink-line/60 py-4 pr-6 text-left font-medium text-paper">
                  {row.label}
                </th>
                <td className="border-b border-ink-line/60 py-4 pr-6 text-mist">{row.inHouse}</td>
                <td className="border-b border-ink-line/60 py-4 pr-6 text-mist">{row.freelance}</td>
                <td
                  className={`border-b border-blue/20 bg-blue/10 px-4 py-4 font-medium text-paper ${
                    ri === rows.length - 1 ? "rounded-b-xl" : ""
                  }`}
                >
                  {row.pod}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-5 max-w-2xl text-sm text-mist">{note}</p>
    </div>
  );
}
