import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { howItWorks } from "@/content/how-it-works";
import HowItWorksPage from "@/components/pages/HowItWorksPage";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/how-it-works",
  title: howItWorks.en.seoTitle,
  description: howItWorks.en.seoDescription,
});

export default function Page() {
  return <HowItWorksPage locale="en" />;
}
