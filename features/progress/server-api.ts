import "server-only";

import { cacheLife } from "next/cache";

import { apiGet } from "@/lib/api/api-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { ProgressItemResponse } from "@/types/api/progress";

export async function getPublicProgressItems(): Promise<ProgressItemResponse> {
  "use cache";
  cacheLife("days");

  const data = await apiGet<ProgressItemResponse>(apiEndpoints.progressItem, {
    revalidate: 60 * 60 * 24,
  });

  return {
    allKappaItemList: data.allKappaItemList,
    allRebirthList: data.allRebirthList,
    userKappaList: [],
    userRebirthList: [],
  };
}
