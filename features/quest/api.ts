import { staticJsonGet } from "@/lib/api/static-json-client";
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
  return staticJsonGet<QuestFeedEntry[]>("quest", "/static/quest/v3/feed.json", {
    revalidate: 60 * 60 * 24,
  });
}

export function getQuestCompletionGraph() {
  return staticJsonGet<QuestCompletionGraphNode[]>("quest", "/static/quest/v3/completion-graph.json", {
    revalidate: 60 * 60 * 24,
  });
}

export function getQuestListWithTrader(traderNormalizedName: string) {
  return staticJsonGet<QuestListWithTraderResponse>("quest", `/static/quest/v3/list-with-trader/${traderNormalizedName}.json`, {
    revalidate: 60 * 60 * 24,
  });
}

export function getQuestDetail(normalizedName: string) {
  return staticJsonGet<QuestDetailResponse>("quest", `/static/quest/v3/details/${normalizedName}.json`, {
    revalidate: 60 * 60 * 24,
  });
}
