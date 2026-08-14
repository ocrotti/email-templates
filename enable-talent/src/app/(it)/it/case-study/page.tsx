import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { caseStudy } from "@/content/case-study";
import CaseStudyPage from "@/components/pages/CaseStudyPage";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: "/case-study",
  title: caseStudy.it.seoTitle,
  description: caseStudy.it.seoDescription,
});

export default function Page() {
  return <CaseStudyPage locale="it" />;
}
