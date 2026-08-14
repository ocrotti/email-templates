import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { guarantee } from "@/content/guarantee";
import GuaranteePage from "@/components/pages/GuaranteePage";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/guarantee",
  title: guarantee.en.seoTitle,
  description: guarantee.en.seoDescription,
});

export default function Page() {
  return <GuaranteePage locale="en" />;
}
