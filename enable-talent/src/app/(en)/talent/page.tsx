import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { talent } from "@/content/talent";
import TalentPage from "@/components/pages/TalentPage";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/talent",
  title: talent.en.seoTitle,
  description: talent.en.seoDescription,
});

export default function Page() {
  return <TalentPage locale="en" />;
}
