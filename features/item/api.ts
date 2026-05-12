import { apiGet } from "@/lib/api/api-client";
import { getItemListEndpoint } from "@/lib/config/api-endpoints";

import type { ItemListEntry } from "@/features/item/types";

export function getItemList(itemType: string) {
  return apiGet<ItemListEntry[]>(getItemListEndpoint(itemType), {
    revalidate: 60 * 30,
  });
}
