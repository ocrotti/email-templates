import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import HomePage from "@/components/pages/HomePage";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/",
  title: "enable.talent — Managed Marketing Pods for European Agencies",
  description: "Scale your agency with dedicated, managed marketing pods from Nairobi — senior European QA, white-label workflow, 2-week trial and pods from €2,000/month. Live in 10–14 days.",
});

export default function Page() {
  return <HomePage locale="en" />;
}
