import "server-only";

import { cacheLife } from "next/cache";

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

export async function getAllQuests() {
  "use cache";
  cacheLife("days");

  return apiGet<QuestListEntry[]>(questEndpoints.all, {
    revalidate: 60 * 60 * 24,
  });
}

export async function getQuestFeed() {
  "use cache";
  cacheLife("days");

  return apiGet<QuestFeedEntry[]>(questEndpoints.feed, {
    revalidate: 60 * 60 * 24,
  });
}

export async function getQuestCompletionGraph() {
  "use cache";
  cacheLife("days");

  return apiGet<QuestCompletionGraphNode[]>(questEndpoints.completionGraph, {
    revalidate: 60 * 60 * 24,
  });
}

export async function getQuestListWithTrader(traderNormalizedName: string) {
  "use cache";
  cacheLife({ stale: 300, revalidate: 60 * 30, expire: 60 * 60 * 24 });

  return apiGet<QuestListWithTraderResponse>(getQuestListWithTraderEndpoint(traderNormalizedName), {
    revalidate: 60 * 30,
  });
}

export async function getQuestDetail(normalizedName: string) {
  "use cache";
  cacheLife({ stale: 300, revalidate: 60 * 30, expire: 60 * 60 * 24 });

  return apiGet<QuestDetailResponse>(getQuestDetailEndpoint(normalizedName), {
    revalidate: 60 * 30,
  });
}
