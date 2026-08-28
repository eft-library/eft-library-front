import { apiGet } from "@/lib/api/api-client";
import { staticJsonGetWithFallback } from "@/lib/api/static-json-client";
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
  return staticJsonGetWithFallback<QuestListEntry[]>("quest", "/static/quest/v3/all.json", {
    apiPath: questEndpoints.all,
    revalidate: 60 * 60 * 24,
  });
}

export function getQuestFeed() {
  return staticJsonGetWithFallback<QuestFeedEntry[]>("quest", "/static/quest/v3/feed.json", {
    apiPath: questEndpoints.feed,
    revalidate: 60 * 60 * 24,
  });
}

export function getQuestCompletionGraph() {
  return staticJsonGetWithFallback<QuestCompletionGraphNode[]>("quest", "/static/quest/v3/completion-graph.json", {
    apiPath: questEndpoints.completionGraph,
    revalidate: 60 * 60 * 24,
  });
}

export function getQuestListWithTrader(traderNormalizedName: string) {
  return apiGet<QuestListWithTraderResponse>(getQuestListWithTraderEndpoint(traderNormalizedName), {
    revalidate: 60 * 30,
  });
}

export function getQuestDetail(normalizedName: string) {
  return apiGet<QuestDetailResponse>(getQuestDetailEndpoint(normalizedName), {
    revalidate: 60 * 30,
  });
}
