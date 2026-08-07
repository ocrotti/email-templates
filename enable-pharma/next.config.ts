import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
    ];
  },
};

export default withNextIntl(nextConfig);
