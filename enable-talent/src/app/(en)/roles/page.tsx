import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { rolesIndex } from "@/content/roles";
import { RolesIndexPage } from "@/components/pages/RolePage";

export const metadata: Metadata = pageMetadata({
  locale: "en",
  path: "/roles",
  title: rolesIndex.en.seoTitle,
  description: rolesIndex.en.seoDescription,
});

export default function Page() {
  return <RolesIndexPage locale="en" />;
}
