import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { salaries, SALARIES_PATH } from "@/content/salaries";
import SalariesPage from "@/components/pages/SalariesPage";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: SALARIES_PATH,
  title: salaries.en.seoTitle,
  description: salaries.en.seoDescription,
  ogTitle: salaries.en.h1,
});

export default function Page() {
  return <SalariesPage locale="en" />;
}
