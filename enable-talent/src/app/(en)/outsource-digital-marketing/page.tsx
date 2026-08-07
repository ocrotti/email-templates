import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { outsourcingGuide } from "@/content/outsourcing-guide";
import OutsourcingGuidePage from "@/components/pages/OutsourcingGuidePage";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/outsource-digital-marketing",
  title: outsourcingGuide.en.seoTitle,
  description: outsourcingGuide.en.seoDescription,
  ogTitle: outsourcingGuide.en.title,
  ogType: "article",
});

export default function Page() {
  return <OutsourcingGuidePage locale="en" />;
}
