import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { talent } from "@/content/talent";
import TalentPage from "@/components/pages/TalentPage";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: "/talent",
  title: talent.it.seoTitle,
  description: talent.it.seoDescription,
});

export default function Page() {
  return <TalentPage locale="it" />;
}
