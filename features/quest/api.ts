import { apiGet } from "@/lib/api/api-client";
import { staticJsonGet } from "@/lib/api/static-json-client";
import {
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
  return staticJsonGet<QuestListEntry[]>("quest", "/static/quest/v3/all.json", {
    revalidate: 60 * 60 * 24,
  });
}

export function getQuestFeed() {
  return apiGet<QuestFeedEntry[]>(questEndpoints.feed, { revalidate: 60 * 10 });
}

export function getQuestCompletionGraph() {
  return staticJsonGet<QuestCompletionGraphNode[]>("quest", "/static/quest/v3/completion-graph.json", {
    revalidate: 60 * 60 * 24,
  });
}

export function getQuestListWithTrader(traderNormalizedName: string) {
  return apiGet<QuestListWithTraderResponse>(getQuestListWithTraderEndpoint(traderNormalizedName), {
    revalidate: 0,
  });
}

export function getQuestDetail(normalizedName: string) {
  return staticJsonGet<QuestDetailResponse>("quest", `/static/quest/v3/details/${normalizedName}.json`, {
    revalidate: 60 * 60 * 24,
  });
}
