"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { ContactFormLabels } from "@/content/contact";

type Status = "idle" | "sending" | "success" | "error";

interface ContactFormProps {
  labels: ContactFormLabels;
  locale: string;
  /** Compact variant used in the footer */
  compact?: boolean;
  onDark?: boolean;
}

/**
 * Qualified lead form: company, function (buyer persona), therapeutic
 * area, message. Includes a honeypot field; posts to /api/contact.
 */
export default function ContactForm({
  labels,
  locale,
  compact = false,
  onDark = false,
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const successRef = useRef<HTMLParagraphElement | null>(null);
  const errorRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  // Placeholders are dimmed only on the dark variant; on paper,
  // ink-soft at full opacity is already 6.6:1, while at 50% it drops
  // to 2.3:1 — below the AA minimum.
  const inputClass = `w-full border-b bg-transparent px-0 py-3 text-base outline-none transition-colors focus:border-accent ${
    onDark
      ? "border-line-dark text-paper placeholder:text-paper placeholder:opacity-60"
      : "border-line text-ink placeholder:text-ink-soft"
  }`;

  const labelClass = `eyebrow block ${onDark ? "text-paper/60" : "text-ink-soft"}`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      // Focused on mount: submitting unmounts the form, so without this
      // the user's focus falls back to <body> and keyboard and screen
      // reader users lose their place entirely.
      <p
        ref={successRef}
        tabIndex={-1}
        role="status"
        className={`prose-copy border-l-2 border-accent pl-5 outline-none ${
          onDark ? "text-paper" : "text-ink"
        }`}
      >
        {labels.success}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      {/* Honeypot — hidden from real users, tempting for bots */}
      <div className="sr-only" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div
        className={
          compact
            ? "grid gap-5"
            : "grid gap-6 md:grid-cols-2 md:gap-x-10 md:gap-y-7"
        }
      >
        <div>
          <label htmlFor={`name-${compact}`} className={labelClass}>
            {labels.name}
          </label>
          <input
            id={`name-${compact}`}
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`email-${compact}`} className={labelClass}>
            {labels.email}
          </label>
          <input
            id={`email-${compact}`}
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            placeholder={labels.emailPlaceholder}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`company-${compact}`} className={labelClass}>
            {labels.company}
          </label>
          <input
            id={`company-${compact}`}
            name="company"
            type="text"
            required
            autoComplete="organization"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor={`role-${compact}`} className={labelClass}>
            {labels.role}
          </label>
          <select
            id={`role-${compact}`}
            name="role"
            required
            defaultValue=""
            className={`${inputClass} cursor-pointer appearance-none`}
          >
            <option value="" disabled>
              {labels.rolePlaceholder}
            </option>
            {labels.roles.map((r) => (
              <option key={r} value={r} className="text-ink">
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`area-${compact}`} className={labelClass}>
            {labels.area}
          </label>
          <input
            id={`area-${compact}`}
            name="area"
            type="text"
            placeholder={labels.areaPlaceholder}
            className={inputClass}
          />
        </div>
        <div className={compact ? "" : "md:col-span-2"}>
          <label htmlFor={`message-${compact}`} className={labelClass}>
            {labels.message}
          </label>
          <textarea
            id={`message-${compact}`}
            name="message"
            required
            rows={compact ? 3 : 5}
            placeholder={labels.messagePlaceholder}
            className={`${inputClass} resize-y`}
          />
        </div>
        <div className={compact ? "" : "md:col-span-2"}>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
            <input
              type="checkbox"
              name="privacy"
              required
              className="mt-1 h-4 w-4 shrink-0 accent-(--color-accent)"
            />
            <span className={onDark ? "text-paper/70" : "text-ink-soft"}>
              {labels.privacy}
            </span>
          </label>
        </div>
        <div className={compact ? "" : "md:col-span-2"}>
          <button
            type="submit"
            disabled={status === "sending"}
            className={`inline-flex cursor-pointer items-center gap-3 rounded-full px-7 py-4 text-[0.95rem] font-medium transition-colors disabled:opacity-60 ${
              onDark
                ? "bg-accent-ondark text-ink hover:bg-accent hover:text-paper"
                : "bg-accent text-paper hover:bg-accent-deep"
            }`}
          >
            {status === "sending" ? labels.sending : labels.submit}
            <span aria-hidden="true">→</span>
          </button>
          {status === "error" ? (
            <p
              ref={errorRef}
              tabIndex={-1}
              role="alert"
              className={`mt-4 text-sm outline-none ${
                onDark ? "text-accent-ondark" : "text-accent-deep"
              }`}
            >
              {labels.error}
            </p>
          ) : null}
          {!compact ? (
            <p
              className={`mt-4 text-xs ${onDark ? "text-paper/50" : "text-ink-soft"}`}
            >
              {labels.requiredNote}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
