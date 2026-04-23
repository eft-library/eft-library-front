import { apiGet } from "@/lib/api/api-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { ProgressItemResponse } from "@/types/api/minigame";
import type { RngItemEntry, RngRankEntry } from "@/types/api/price";

export function getMinigameItems() {
  return apiGet<RngItemEntry[]>(apiEndpoints.rngItemList, {
    revalidate: 60 * 10,
  });
}

export function getMinigameAllRank() {
  return apiGet<RngRankEntry[]>(apiEndpoints.rngItemAllRank, {
    revalidate: 60 * 10,
  });
}

export function getProgressItems() {
  return apiGet<ProgressItemResponse>(apiEndpoints.progressItem, {
    revalidate: 60 * 10,
  });
}
