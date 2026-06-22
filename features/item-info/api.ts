import { staticJsonGet } from "@/lib/api/static-json-client";
import type { ItemInfoResponse } from "@/types/api/item-info";

export function getItemInfo(normalizedName: string) {
  return staticJsonGet<ItemInfoResponse>("item", `/static/item/v3/details/${normalizedName}.json`, {
    revalidate: 60 * 60 * 24,
  });
}
