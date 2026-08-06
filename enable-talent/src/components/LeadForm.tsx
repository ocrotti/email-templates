"use client";

import { useState } from "react";
import type { Locale } from "@/lib/site";
import { shared } from "@/content/shared";

/**
 * Qualifying lead form. The action is a placeholder ready to be wired to a
 * form provider (Formspree, Basin, own API route) — see README.
 */
export default function LeadForm({ locale }: { locale: Locale }) {
  const t = shared[locale].form;
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire to your form provider endpoint (see README → "Contact form").
    setSent(true);
  };

  const inputClass =
    "w-full rounded-xl border border-ink-line bg-ink px-4 py-3.5 text-sm text-paper outline-none transition-colors placeholder:text-mist/60 focus:border-blue-bright";

  if (sent) {
    return (
      <div className="rounded-3xl border border-blue/40 bg-blue/10 p-10 text-center">
        <p className="font-display text-2xl font-semibold text-paper">{t.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-ink-line bg-ink-soft/50 p-6 md:p-10">
      <h3 className="font-display text-2xl font-semibold text-paper md:text-3xl">{t.title}</h3>
      <p className="mt-3 text-sm text-mist md:text-base">{t.sub}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mist">{t.name}</span>
          <input required name="name" type="text" autoComplete="name" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mist">{t.email}</span>
          <input required name="email" type="email" autoComplete="email" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mist">{t.agency}</span>
          <input required name="agency" type="text" autoComplete="organization" className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mist">{t.teamSize}</span>
          <select name="teamSize" className={inputClass} defaultValue={t.teamSizeOptions[0]}>
            {t.teamSizeOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-3 block text-xs uppercase tracking-[0.18em] text-mist">{t.roles}</legend>
        <div className="flex flex-wrap gap-2">
          {t.rolesOptions.map((role) => (
            <label key={role} className="cursor-pointer">
              <input type="checkbox" name="roles" value={role} className="peer sr-only" />
              <span className="inline-block rounded-full border border-ink-line px-4 py-2 text-sm text-mist transition-colors peer-checked:border-blue-bright peer-checked:bg-blue/15 peer-checked:text-paper">
                {role}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-6 block">
        <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mist">{t.message}</span>
        <textarea name="message" rows={4} className={inputClass} />
      </label>

      <div className="mt-8 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-full bg-blue px-8 py-4 text-sm font-semibold text-white shadow-glow-blue transition-colors hover:bg-blue-bright"
        >
          {t.submit} →
        </button>
        <p className="text-xs text-mist">{t.privacy}</p>
      </div>
    </form>
  );
}
