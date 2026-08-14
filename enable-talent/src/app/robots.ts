import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /api is the lead intake (POST only) and /og renders social cards on demand —
    // neither is a page, so keep crawlers out of both.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/og"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
