import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { pricing } from "@/content/pricing";
import PricingPage from "@/components/pages/PricingPage";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: "/pricing",
  title: pricing.it.seoTitle,
  description: pricing.it.seoDescription,
});

export default function Page() {
  return <PricingPage locale="it" />;
}
