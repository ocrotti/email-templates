import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { salaries, SALARIES_PATH } from "@/content/salaries";
import SalariesPage from "@/components/pages/SalariesPage";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: SALARIES_PATH,
  title: salaries.it.seoTitle,
  description: salaries.it.seoDescription,
  ogTitle: salaries.it.h1,
});

export default function Page() {
  return <SalariesPage locale="it" />;
}
