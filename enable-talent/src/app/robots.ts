import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /api is the lead intake and accepts POST only, so keep crawlers out of it.
    // /og must stay allowed: it renders every social card and Article image, and
    // blocking it would stop Google, LinkedIn and Slack fetching them.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
