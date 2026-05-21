import { apiGet } from "@/lib/api/api-client";
import {
  getQuestDetailEndpoint,
  getQuestListWithTraderEndpoint,
  questEndpoints,
} from "@/lib/config/api-endpoints";
import type {
  QuestCompletionGraphNode,
  QuestDetailResponse,
  QuestFeedEntry,
  QuestListEntry,
  QuestListWithTraderResponse,
} from "@/types/api/quest";

export function getAllQuests() {
  return apiGet<QuestListEntry[]>(questEndpoints.all, { revalidate: 60 * 10 });
}

export function getQuestFeed() {
  return apiGet<QuestFeedEntry[]>(questEndpoints.feed, { revalidate: 60 * 10 });
}

export function getQuestCompletionGraph() {
  return apiGet<QuestCompletionGraphNode[]>(questEndpoints.completionGraph, {
    revalidate: 60 * 30,
  });
}

export function getQuestListWithTrader(traderNormalizedName: string) {
  return apiGet<QuestListWithTraderResponse>(getQuestListWithTraderEndpoint(traderNormalizedName), {
    revalidate: 0,
  });
}

export function getQuestDetail(normalizedName: string) {
  return apiGet<QuestDetailResponse>(getQuestDetailEndpoint(normalizedName), {
    revalidate: 60 * 10,
  });
}
