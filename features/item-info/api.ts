import "server-only";

import { cacheLife } from "next/cache";

import { apiGet } from "@/lib/api/api-client";
import { getItemInfoEndpoint } from "@/lib/config/api-endpoints";
import type { ItemInfoResponse } from "@/types/api/item-info";

export async function getItemInfo(normalizedName: string) {
  "use cache";
  cacheLife("days");

  return apiGet<ItemInfoResponse>(getItemInfoEndpoint(normalizedName), {
    revalidate: 60 * 60 * 24,
  });
}
