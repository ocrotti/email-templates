import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  area?: string;
  message?: string;
  privacy?: string;
  website?: string; // honeypot
  locale?: string;
}

const MAX = {
  name: 200,
  email: 254,
  company: 200,
  role: 80,
  area: 200,
  message: 5000,
} as const;

/** Reject oversized bodies before parsing them. */
const MAX_BODY_BYTES = 16_000;

/**
 * Best-effort in-memory rate limit. Serverless instances are ephemeral
 * and not shared, so this only blunts naive floods against a single
 * instance — put a real limiter at the edge (WAF / Vercel Firewall)
 * before relying on it.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Bound the map so a flood of distinct IPs cannot grow it forever.
  if (hits.size > 5000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
      if (hits.size <= 2500) break;
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(request: Request): string {
  // x-forwarded-for is client-spoofable; prefer the value the platform
  // edge writes itself, and take the last hop of XFF if that is absent.
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  const xff = request.headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",");
    return parts[parts.length - 1].trim();
  }
  return "unknown";
}

function invalid(field: string) {
  return NextResponse.json(
    { ok: false, error: `Invalid field: ${field}` },
    { status: 400 },
  );
}

// Deliberately permissive: the point is to catch typos and obvious
// junk, not to re-derive RFC 5322.
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many requests" },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Payload too large" },
      { status: 413 },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Payload too large" },
      { status: 413 },
    );
  }

  let body: ContactPayload;
  try {
    body = JSON.parse(raw) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  // Honeypot filled → pretend success, drop silently
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const company = body.company?.trim();
  const role = body.role?.trim();
  const area = body.area?.trim() ?? "";
  const message = body.message?.trim();

  if (!name || name.length > MAX.name) return invalid("name");
  if (!email || email.length > MAX.email || !EMAIL_RE.test(email))
    return invalid("email");
  if (!company || company.length > MAX.company) return invalid("company");
  if (!role || role.length > MAX.role) return invalid("role");
  if (area.length > MAX.area) return invalid("area");
  if (!message || message.length > MAX.message) return invalid("message");
  if (body.privacy !== "on" && body.privacy !== "true") {
    return invalid("privacy");
  }

  const lines = [
    `Nuova richiesta dal sito (${body.locale === "en" ? "en" : "it"})`,
    ``,
    `Nome:     ${name}`,
    `Email:    ${email}`,
    `Azienda:  ${company}`,
    `Funzione: ${role}`,
    `Area terapeutica: ${area || "—"}`,
    ``,
    `Messaggio:`,
    message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? "noreply@enablepharma.it";

  if (apiKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Enable Pharma <${from}>`,
          to: [to],
          // Lets the recipient reply straight to the lead.
          reply_to: email,
          subject: `Richiesta audit — ${company} (${role})`,
          text: lines,
        }),
      });
      if (!res.ok) {
        console.error("[contact] Resend responded", res.status);
        return NextResponse.json(
          { ok: false, error: "Email delivery failed" },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("[contact] Resend request failed:", err);
      return NextResponse.json(
        { ok: false, error: "Email delivery failed" },
        { status: 502 },
      );
    }
  } else if (process.env.NODE_ENV === "production") {
    // Never silently swallow a real lead, and never write the
    // submission itself to production logs.
    console.error(
      "[contact] RESEND_API_KEY is not set — submission could not be delivered",
    );
    return NextResponse.json(
      { ok: false, error: "Email delivery not configured" },
      { status: 500 },
    );
  } else {
    console.log("[contact] no RESEND_API_KEY, dev submission:\n", lines);
  }

  return NextResponse.json({ ok: true });
}
