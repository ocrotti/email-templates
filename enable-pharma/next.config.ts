import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Google's hosts are allowed only when analytics is actually configured:
// with NEXT_PUBLIC_GA_ID unset the policy stays first-party only, which
// is also what the privacy notice claims in that configuration.
const gaEnabled = Boolean(process.env.NEXT_PUBLIC_GA_ID);
const gaScript = gaEnabled ? " https://www.googletagmanager.com" : "";
const gaConnect = gaEnabled
  ? " https://www.google-analytics.com https://region1.google-analytics.com"
  : "";
const gaImg = gaEnabled
  ? " https://www.google-analytics.com https://www.googletagmanager.com"
  : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The document shell lives in `[locale]/layout.tsx`, so a `notFound()`
  // has no root layout to render into and Next falls back to a blank
  // error shell — a 404 with no `lang`, no content and no way out.
  // `global-not-found.tsx` renders the whole document itself and keeps
  // the 404 status. See src/app/global-not-found.tsx.
  experimental: { globalNotFound: true },
  // Ensure the OG-image fonts are bundled with the serverless function
  outputFileTracingIncludes: {
    "/[locale]/opengraph-image": ["./src/fonts/og/*"],
  },
  // Cross-locale courtesy paths: the next-intl middleware answers these
  // with a temporary 307, which never consolidates link signals onto the
  // canonical URL. The predictable static variants get a permanent 308
  // here; the middleware stays as the fallback for everything else.
  async redirects() {
    return [
      { source: "/it", destination: "/", permanent: true },
      { source: "/it/:path*", destination: "/:path*", permanent: true },
      { source: "/contact", destination: "/contatti", permanent: true },
      {
        source: "/example-project",
        destination: "/progetto-esempio",
        permanent: true,
      },
      { source: "/insights", destination: "/insight", permanent: true },
      {
        source: "/en/contatti",
        destination: "/en/contact",
        permanent: true,
      },
      {
        source: "/en/progetto-esempio",
        destination: "/en/example-project",
        permanent: true,
      },
      { source: "/en/insight", destination: "/en/insights", permanent: true },
      {
        source: "/en/insight/:path*",
        destination: "/en/insights/:path*",
        permanent: true,
      },
    ];
  },
  // The buyer here is a pharma company's IT security team, and a vendor
  // assessment starts with an automated header scan. Nothing is loaded
  // from a third-party origin, so the policy can stay tight —
  // 'unsafe-inline' on scripts is what Next's hydration payload and the
  // JSON-LD blocks need.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              `script-src 'self' 'unsafe-inline'${gaScript}`,
              "style-src 'self' 'unsafe-inline'",
              `img-src 'self' data:${gaImg}`,
              "font-src 'self'",
              `connect-src 'self'${gaConnect}`,
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
