import { apiGet, apiPost } from "@/lib/api/api-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type {
  ProgressItemResponse,
  RngMyRankRequest,
  RngScoreSaveRequest,
  RngScoreSaveResponse,
} from "@/types/api/minigame";
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

export function getMinigameMyRank(score: number) {
  return apiPost<RngMyRankRequest, RngRankEntry[]>(
    apiEndpoints.rngItemMyRank,
    { score },
    { cache: "no-store" },
  );
}

export function saveMinigameScore(payload: RngScoreSaveRequest) {
  return apiPost<RngScoreSaveRequest, RngScoreSaveResponse>(
    apiEndpoints.rngItemSaveScore,
    payload,
    { cache: "no-store" },
  );
}

export function getProgressItems() {
  return apiGet<ProgressItemResponse>(apiEndpoints.progressItem, {
    revalidate: 60 * 10,
  });
}
