import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { privacy } from "@/content/privacy";
import PrivacyPage from "@/components/pages/PrivacyPage";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/privacy",
  title: privacy.en.seoTitle,
  description: privacy.en.seoDescription,
});

export default function Page() {
  return <PrivacyPage locale="en" />;
}
