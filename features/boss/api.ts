import { apiGet } from "@/lib/api/api-client";
import { getBossDetailEndpoint } from "@/lib/config/api-endpoints";
import type { BossDetailResponse } from "@/types/api/boss";

export function getBossDetail(normalizedName: string) {
  return apiGet<BossDetailResponse>(getBossDetailEndpoint(normalizedName), {
    revalidate: 60 * 10,
  });
}
