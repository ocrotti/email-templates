import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { whiteLabel } from "@/content/white-label";
import WhiteLabelPage from "@/components/pages/WhiteLabelPage";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/white-label-marketing",
  title: whiteLabel.en.seoTitle,
  description: whiteLabel.en.seoDescription,
});

export default function Page() {
  return <WhiteLabelPage locale="en" />;
}
