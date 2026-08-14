import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import HomePage from "@/components/pages/HomePage";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/",
  title: "Offshore Marketing Teams for EU Agencies | enable.talent",
  description: "Managed marketing pods from Nairobi — senior European QA, white-label workflow, 2-week trial, pods from €2,000/month. Live in 10–14 days.",
});

export default function Page() {
  return <HomePage locale="en" />;
}
