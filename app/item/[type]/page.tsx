import { notFound } from "next/navigation";

import { getItemSectionConfig, isItemTypeSlug } from "@/features/item/config";
import { ItemListRoute } from "@/features/item/route";
import { getUserLocale } from "@/i18n/locale";
import { createPageMetadata, fallbackMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!isItemTypeSlug(type)) {
    return fallbackMetadata();
  }

  const locale = await getUserLocale();
  const copy = getItemSectionConfig(type, locale);

  return createPageMetadata({
    title: `타르코프 ${copy.title}`,
    description: copy.description,
    path: `/item/${type}`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  if (!isItemTypeSlug(type)) {
    notFound();
  }

  return <ItemListRoute itemType={type} />;
}
