import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { whiteLabel } from "@/content/white-label";
import WhiteLabelPage from "@/components/pages/WhiteLabelPage";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: "/white-label-marketing",
  title: whiteLabel.it.seoTitle,
  description: whiteLabel.it.seoDescription,
});

export default function Page() {
  return <WhiteLabelPage locale="it" />;
}
