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
};

export default withNextIntl(nextConfig);
