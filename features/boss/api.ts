import { staticJsonGetWithFallback } from "@/lib/api/static-json-client";
import { getBossDetailEndpoint } from "@/lib/config/api-endpoints";
import type { BossDetailResponse } from "@/types/api/boss";

export function getBossDetail(normalizedName: string) {
  return staticJsonGetWithFallback<BossDetailResponse>("boss", `/static/boss/v3/details/${normalizedName}.json`, {
    apiPath: getBossDetailEndpoint(normalizedName),
    revalidate: 60 * 60 * 24,
  });
}
