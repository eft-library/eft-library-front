import { staticJsonGetWithFallback } from "@/lib/api/static-json-client";
import { getItemListEndpoint } from "@/lib/config/api-endpoints";

import type { ItemListEntry } from "@/features/item/types";

export function getItemList(itemType: string) {
  return staticJsonGetWithFallback<ItemListEntry[]>("item", `/static/item/v3/lists/${itemType}.json`, {
    apiPath: getItemListEndpoint(itemType),
    revalidate: 60 * 60 * 24,
  });
}
