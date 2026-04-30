import { notFound } from "next/navigation";

import { isItemTypeSlug } from "@/features/item/config";
import { ItemListRoute } from "@/features/item/route";

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
