"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "@/i18n/navigation";
import type { ContactFormLabels } from "@/content/contact";
import { siteConfig } from "@/lib/site-config";
import { ArrowLink } from "@/components/ui/Button";

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
  // Submitting is JS-only. Until hydration runs, the button would post
  // the form as a plain GET and drop the lead without a word, so it
  // stays disabled and <noscript> hands over the address instead.
  const [hydrated, setHydrated] = useState(false);
  const successRef = useRef<HTMLDivElement | null>(null);
  const errorRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  // Placeholders are dimmed only on the dark variant; on paper,
  // ink-soft at full opacity is already 6.6:1, while at 50% it drops
  // to 2.3:1 — below the AA minimum.
  const inputClass = `w-full border-b bg-transparent px-0 py-3 text-base outline-none transition-colors focus:border-accent ${
    onDark
      ? "border-control-dark text-paper placeholder:text-paper placeholder:opacity-60"
      : "border-control text-ink placeholder:text-ink-soft"
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
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className={`border-l-2 border-accent pl-5 outline-none ${
          onDark ? "text-paper" : "text-ink"
        }`}
      >
        <p className="font-display-soft text-2xl">{labels.successTitle}</p>
        <p className="prose-copy mt-3">{labels.successBody}</p>
        {/* The full-page form leaves half a screen empty once it is
            replaced; give the visit somewhere to go next. */}
        {!compact ? (
          <>
            <p className="eyebrow mt-8 text-accent-deep">
              {labels.successNextLabel}
            </p>
            <div className="mt-4 flex flex-col items-start gap-3">
              <ArrowLink href="/insight">{labels.successNextInsight}</ArrowLink>
              <ArrowLink href="/progetto-esempio">
                {labels.successNextCase}
              </ArrowLink>
            </div>
          </>
        ) : null}
      </div>
    );
  }

  return (
    // color-scheme keeps native controls (checkbox, select popup) legible
    // on the dark footer variant.
    <form
      onSubmit={onSubmit}
      noValidate={false}
      className={onDark ? "[color-scheme:dark]" : undefined}
    >
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
          {/* The wrapper adds the chevron a native select loses with
              appearance-none — without it the field reads as a text input. */}
          <div className="relative">
            <select
              id={`role-${compact}`}
              name="role"
              required
              defaultValue=""
              // Until a function is picked the select is :invalid, so the
              // placeholder drops to the same tone as the sibling text
              // placeholders instead of reading as a filled-in answer.
              className={`${inputClass} cursor-pointer appearance-none pr-8 ${
                onDark ? "invalid:text-paper/60" : "invalid:text-ink-soft"
              }`}
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
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className={`pointer-events-none absolute top-1/2 right-1 h-4 w-4 -translate-y-1/2 ${
                onDark ? "text-paper/60" : "text-ink-soft"
              }`}
            >
              <path
                d="M4 6l4 4 4-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {/* Full width: five single-column fields before a full-width one
            would leave the third grid row half empty. */}
        <div className={compact ? "" : "md:col-span-2"}>
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
              {labels.privacyBefore}
              {/* Attesting you read a notice you cannot reach is not
                  informed consent. stopPropagation keeps the click off
                  the surrounding label, which would toggle the box. */}
              <Link
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`underline decoration-accent underline-offset-2 ${
                  onDark ? "hover:text-accent-ondark" : "hover:text-accent-deep"
                }`}
              >
                {labels.privacyLinkLabel}
              </Link>
              {labels.privacyAfter}
            </span>
          </label>
        </div>
        <div className={compact ? "" : "md:col-span-2"}>
          <button
            type="submit"
            disabled={!hydrated || status === "sending"}
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
              {/* The moment a submission fails is the moment a lead is
                  about to be lost: the fallback address must be one tap
                  away, not somewhere else on the page. */}
              {labels.error}{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium underline underline-offset-2"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          ) : null}
          {!compact ? (
            <p
              className={`mt-4 text-xs ${onDark ? "text-paper/50" : "text-ink-soft"}`}
            >
              {labels.requiredNote}
            </p>
          ) : null}
          <noscript>
            <p
              className={`mt-4 text-sm ${onDark ? "text-paper/80" : "text-ink-soft"}`}
            >
              {labels.noscript}{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium underline underline-offset-2"
              >
                {siteConfig.email}
              </a>
              .
            </p>
          </noscript>
        </div>
      </div>
    </form>
  );
}
