import { staticJsonGet } from "@/lib/api/static-json-client";
import type { BossDetailResponse } from "@/types/api/boss";

export function getBossDetail(normalizedName: string) {
  return staticJsonGet<BossDetailResponse>("boss", `/static/boss/v3/details/${normalizedName}.json`, {
    revalidate: 60 * 60 * 24,
  });
}
