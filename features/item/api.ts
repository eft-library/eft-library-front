import { staticJsonGet } from "@/lib/api/static-json-client";

import type { ItemListEntry } from "@/features/item/types";

export function getItemList(itemType: string) {
  return staticJsonGet<ItemListEntry[]>("item", `/static/item/v3/lists/${itemType}.json`, {
    revalidate: 60 * 60 * 24,
  });
}
