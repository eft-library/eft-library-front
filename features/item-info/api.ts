import { apiGet } from "@/lib/api/api-client";
import { getItemInfoEndpoint } from "@/lib/config/api-endpoints";
import type { ItemInfoResponse } from "@/types/api/item-info";

export function getItemInfo(normalizedName: string) {
  return apiGet<ItemInfoResponse>(getItemInfoEndpoint(normalizedName), {
    revalidate: 60 * 30,
  });
}
