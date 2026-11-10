import "server-only";

import { cacheLife } from "next/cache";

import { apiGet } from "@/lib/api/api-client";
import { getItemListEndpoint } from "@/lib/config/api-endpoints";

import type { ItemListEntry } from "@/features/item/types";

export async function getItemList(itemType: string) {
  "use cache";
  cacheLife("days");

  return apiGet<ItemListEntry[]>(getItemListEndpoint(itemType), {
    revalidate: 60 * 60 * 24,
  });
}
