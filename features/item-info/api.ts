import { staticJsonGetWithFallback } from "@/lib/api/static-json-client";
import { getItemInfoEndpoint } from "@/lib/config/api-endpoints";
import type { ItemInfoResponse } from "@/types/api/item-info";

export function getItemInfo(normalizedName: string) {
  return staticJsonGetWithFallback<ItemInfoResponse>("item", `/static/item/v3/details/${normalizedName}.json`, {
    apiPath: getItemInfoEndpoint(normalizedName),
    revalidate: 60 * 60 * 24,
  });
}
