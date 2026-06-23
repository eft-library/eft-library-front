import { staticJsonGetWithFallback } from "@/lib/api/static-json-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { WipeSeasonResponse } from "@/types/api/news";

export function getWipeSeasons() {
  return staticJsonGetWithFallback<WipeSeasonResponse[]>("news", "/static/news/v3/wipe.json", {
    apiPath: apiEndpoints.newsWipe,
    revalidate: 60 * 60 * 24,
  });
}
