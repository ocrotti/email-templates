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
  const role = roles.en[slug];
  if (!role) return {};
  return pageMetadata({
    locale: "en",
    path: `/roles/${slug}`,
    title: role.seoTitle,
    description: role.seoDescription,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!roles.en[slug]) notFound();
  return <RolePage locale="en" slug={slug} />;
}
