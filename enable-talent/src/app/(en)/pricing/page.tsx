import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { pricing } from "@/content/pricing";
import PricingPage from "@/components/pages/PricingPage";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/pricing",
  title: pricing.en.seoTitle,
  description: pricing.en.seoDescription,
});

export default function Page() {
  return <PricingPage locale="en" />;
}
