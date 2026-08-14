import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { rolesIndex } from "@/content/roles";
import { RolesIndexPage } from "@/components/pages/RolePage";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: "/roles",
  title: rolesIndex.it.seoTitle,
  description: rolesIndex.it.seoDescription,
});

export default function Page() {
  return <RolesIndexPage locale="it" />;
}
