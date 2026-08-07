import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { outsourcingGuide } from "@/content/outsourcing-guide";
import OutsourcingGuidePage from "@/components/pages/OutsourcingGuidePage";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: "/outsource-digital-marketing",
  title: outsourcingGuide.it.seoTitle,
  description: outsourcingGuide.it.seoDescription,
  ogTitle: outsourcingGuide.it.title,
  ogType: "article",
});

export default function Page() {
  return <OutsourcingGuidePage locale="it" />;
}
