import { cacheLife } from "next/cache";

import { apiGet } from "@/lib/api/api-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { WipeSeasonResponse } from "@/types/api/news";

export async function getWipeSeasons() {
  "use cache";
  cacheLife("days");

  return apiGet<WipeSeasonResponse[]>(apiEndpoints.newsWipe, {
    revalidate: 60 * 60 * 24,
  });
}
