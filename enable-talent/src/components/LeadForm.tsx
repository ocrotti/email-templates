"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale } from "@/lib/site";
import { localePath } from "@/lib/site";
import { shared } from "@/content/shared";

/**
 * Qualifying lead form. The action is a placeholder ready to be wired to a
 * form provider (Formspree, Basin, own API route) — see README.
 */
export default function LeadForm({ locale }: { locale: Locale }) {
  const t = shared[locale].form;
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Inline, localized validation instead of the browser's transient bubbles
  // (which also render in the visitor's browser language, not the page's).
  const validate = (form: HTMLFormElement) => {
    const next: Record<string, string> = {};
    const value = (name: string) => (form.elements.namedItem(name) as HTMLInputElement | null)?.value.trim() ?? "";
    for (const field of ["name", "email", "agency"]) {
      if (!value(field)) next[field] = t.errorRequired;
    }
    if (value("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value("email"))) next.email = t.errorEmail;
    return next;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = validate(e.currentTarget);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      (e.currentTarget.elements.namedItem(Object.keys(next)[0]) as HTMLElement | null)?.focus();
      return;
    }
    // TODO: wire to your form provider endpoint (see README → "Contact form").
    setSent(true);
  };

  const inputClass = (field?: string) =>
    `w-full rounded-xl border bg-ink px-4 py-3.5 text-sm text-paper outline-none transition-colors placeholder:text-mist/60 focus:border-blue-bright ${
      field && errors[field] ? "border-amber-deep" : "border-ink-line"
    }`;

  const requiredMark = <span aria-hidden className="text-blue-bright">*</span>;

  const fieldError = (field: string) =>
    errors[field] ? (
      <span role="alert" className="mt-1.5 block text-xs text-amber">
        {errors[field]}
      </span>
    ) : null;

  if (sent) {
    return (
      <div className="rounded-3xl border border-blue/40 bg-blue/10 p-10 text-center">
        <p className="font-display text-2xl font-semibold text-paper">{t.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-ink-line bg-ink-soft/50 p-6 md:p-10">
      <h2 className="font-display text-2xl font-semibold text-paper md:text-3xl">{t.title}</h2>
      <p className="mt-3 text-sm text-mist md:text-base">{t.sub}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mist">{t.name} {requiredMark}</span>
          <input required name="name" type="text" autoComplete="name" aria-invalid={!!errors.name} className={inputClass("name")} />
          {fieldError("name")}
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mist">{t.email} {requiredMark}</span>
          <input required name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} className={inputClass("email")} />
          {fieldError("email")}
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mist">{t.agency} {requiredMark}</span>
          <input required name="agency" type="text" autoComplete="organization" aria-invalid={!!errors.agency} className={inputClass("agency")} />
          {fieldError("agency")}
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-mist">{t.teamSize}</span>
          <span className="relative block">
            <select name="teamSize" className={`${inputClass()} appearance-none pr-10`} defaultValue={t.teamSizeOptions[0]}>
              {t.teamSizeOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
            <svg
              aria-hidden
              viewBox="0 0 12 8"
              className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-mist"
            >
              <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
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
        <textarea name="message" rows={4} className={`${inputClass()} resize-none`} />
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

      <p className="mt-4 text-xs leading-relaxed text-mist">
        {t.consent}{" "}
        <Link href={localePath(locale, "/privacy")} className="link-underline text-paper/80">
          {t.consentLink}
        </Link>
        .
      </p>
    </form>
  );
}
