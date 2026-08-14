import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { roles, roleSlugs } from "@/content/roles";
import { RolePage } from "@/components/pages/RolePage";

export function generateStaticParams() {
  return roleSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const role = roles.it[slug];
  if (!role) return {};
  return pageMetadata({
    locale: "it",
    path: `/roles/${slug}`,
    title: role.seoTitle,
    description: role.seoDescription,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!roles.it[slug]) notFound();
  return <RolePage locale="it" slug={slug} />;
}
