import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { privacy } from "@/content/privacy";
import PrivacyPage from "@/components/pages/PrivacyPage";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: "/privacy",
  title: privacy.it.seoTitle,
  description: privacy.it.seoDescription,
});

export default function Page() {
  return <PrivacyPage locale="it" />;
}
