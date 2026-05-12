import { apiGet } from "@/lib/api/api-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { WipeSeasonResponse } from "@/types/api/news";

export function getWipeSeasons() {
  return apiGet<WipeSeasonResponse[]>(apiEndpoints.newsWipe, {
    revalidate: 60 * 30,
  });
}
