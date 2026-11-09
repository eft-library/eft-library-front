import { cacheLife } from "next/cache";

import { apiGet } from "@/lib/api/api-client";
import { getBossDetailEndpoint } from "@/lib/config/api-endpoints";
import type { BossDetailResponse } from "@/types/api/boss";

export async function getBossDetail(normalizedName: string) {
  "use cache";
  cacheLife("days");

  return apiGet<BossDetailResponse>(getBossDetailEndpoint(normalizedName), {
    revalidate: 60 * 60 * 24,
  });
}
