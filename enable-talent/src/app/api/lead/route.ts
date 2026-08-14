import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/site";

/**
 * Lead intake.
 *
 * Delivery is deliberately provider-agnostic: set LEAD_WEBHOOK_URL to any endpoint
 * that accepts a JSON POST (Formspree, Basin, Zapier, Make, n8n, a Slack incoming
 * webhook, or your own CRM) and the lead is forwarded there as-is.
 *
 * If that variable is missing we do NOT pretend the lead was delivered. In
 * development we log it and succeed so the form is testable; in production we
 * return 503 and the form shows the fallback email address. Silently swallowing
 * a lead while telling the visitor "we'll be in touch" is the one outcome this
 * endpoint exists to prevent.
 */

export const runtime = "nodejs";
/** Never cache a mutation. */
export const dynamic = "force-dynamic";

const MAX_LEN = { name: 120, email: 200, agency: 160, teamSize: 40, message: 4000, role: 80 } as const;
const RATE_LIMIT = { windowMs: 60_000, max: 5 };

/**
 * Best-effort throttle. This is per-instance memory, so it does not hold across
 * serverless instances — it stops a naive flood, not a determined attacker.
 * Put a WAF or the form provider's own spam filter in front for the rest.
 */
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude ceiling so the map cannot grow unbounded
  return recent.length > RATE_LIMIT.max;
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: a field hidden from humans. Bots fill it in. Answer 200 so they
  // learn nothing, but drop the submission.
  if (clean(body.companyWebsite, 200)) {
    return NextResponse.json({ ok: true });
  }

  const lead = {
    name: clean(body.name, MAX_LEN.name),
    email: clean(body.email, MAX_LEN.email),
    agency: clean(body.agency, MAX_LEN.agency),
    teamSize: clean(body.teamSize, MAX_LEN.teamSize),
    roles: Array.isArray(body.roles) ? body.roles.slice(0, 12).map((r) => clean(r, MAX_LEN.role)).filter(Boolean) : [],
    message: clean(body.message, MAX_LEN.message),
    locale: clean(body.locale, 8) === "it" ? "it" : "en",
    page: clean(body.page, 200),
  };

  const invalid: string[] = [];
  if (!lead.name) invalid.push("name");
  if (!EMAIL_RE.test(lead.email)) invalid.push("email");
  if (!lead.agency) invalid.push("agency");
  if (invalid.length > 0) {
    return NextResponse.json({ ok: false, error: "invalid_fields", fields: invalid }, { status: 422 });
  }

  const endpoint = process.env.LEAD_WEBHOOK_URL;

  if (!endpoint) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead] LEAD_WEBHOOK_URL is not set — lead logged only:", lead);
      return NextResponse.json({ ok: true, delivered: false });
    }
    console.error("[lead] LEAD_WEBHOOK_URL is not configured; refusing to accept a lead we cannot deliver.");
    return NextResponse.json({ ok: false, error: "not_configured", fallbackEmail: CONTACT_EMAIL }, { status: 503 });
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(process.env.LEAD_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` } : {}),
      },
      body: JSON.stringify({
        ...lead,
        source: "enable.talent website",
        receivedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error(`[lead] delivery failed: ${res.status} ${res.statusText}`);
      return NextResponse.json({ ok: false, error: "delivery_failed", fallbackEmail: CONTACT_EMAIL }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[lead] delivery threw:", err);
    return NextResponse.json({ ok: false, error: "delivery_failed", fallbackEmail: CONTACT_EMAIL }, { status: 502 });
  }
}
