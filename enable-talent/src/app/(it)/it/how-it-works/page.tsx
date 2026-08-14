import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { howItWorks } from "@/content/how-it-works";
import HowItWorksPage from "@/components/pages/HowItWorksPage";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: "/how-it-works",
  title: howItWorks.it.seoTitle,
  description: howItWorks.it.seoDescription,
});

export default function Page() {
  return <HowItWorksPage locale="it" />;
}
