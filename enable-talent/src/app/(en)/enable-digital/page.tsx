import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { enableDigital } from "@/content/enable-digital";
import EnableDigitalPage from "@/components/pages/EnableDigitalPage";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/enable-digital",
  title: enableDigital.en.seoTitle,
  description: enableDigital.en.seoDescription,
});

export default function Page() {
  return <EnableDigitalPage locale="en" />;
}
