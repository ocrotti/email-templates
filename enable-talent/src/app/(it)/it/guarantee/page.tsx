import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { guarantee } from "@/content/guarantee";
import GuaranteePage from "@/components/pages/GuaranteePage";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: "/guarantee",
  title: guarantee.it.seoTitle,
  description: guarantee.it.seoDescription,
});

export default function Page() {
  return <GuaranteePage locale="it" />;
}
