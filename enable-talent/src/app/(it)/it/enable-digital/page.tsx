import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { enableDigital } from "@/content/enable-digital";
import EnableDigitalPage from "@/components/pages/EnableDigitalPage";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: "/enable-digital",
  title: enableDigital.it.seoTitle,
  description: enableDigital.it.seoDescription,
});

export default function Page() {
  return <EnableDigitalPage locale="it" />;
}
