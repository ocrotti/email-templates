import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { caseStudy } from "@/content/case-study";
import CaseStudyPage from "@/components/pages/CaseStudyPage";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/case-study",
  title: caseStudy.en.seoTitle,
  description: caseStudy.en.seoDescription,
});

export default function Page() {
  return <CaseStudyPage locale="en" />;
}
