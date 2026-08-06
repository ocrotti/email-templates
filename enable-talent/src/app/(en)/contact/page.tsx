import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/contact",
  title: "Book a Call | enable.talent",
  description: "Book a 15-minute scoping call: tell us which roles are choking your delivery and get a written pod proposal — or an honest \"a pod isn't your answer\".",
});

export default function Page() {
  return <ContactPage locale="en" />;
}
