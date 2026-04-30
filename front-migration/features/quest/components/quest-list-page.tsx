"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Skull } from "lucide-react";

import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { Locale } from "@/i18n/config";
import type {
  QuestBase,
  QuestListEntry,
  QuestListWithTraderEntry,
  QuestListWithTraderResponse,
  QuestObjective,
  QuestRewardGroup,
} from "@/types/api/quest";

const copyByLocale = {
  ko: {
    title: "퀘스트",
    description: "트레이더별 퀘스트 목록을 V3 기준으로 확인할 수 있습니다.",
    objective: "목표",
    reward: "보상",
    minLevel: "최소 레벨",
    kappa: "Kappa",
    searchPlaceholder: "이름을 최소 2글자 입력하세요",
    noResults: "검색 결과가 없습니다.",
    traderLabel: "트레이더",
  },
  en: {
    title: "Quest",
    description: "Browse trader quest lists based on the V3 quest data.",
    objective: "Objective",
    reward: "Reward",
    minLevel: "Min level",
    kappa: "Kappa",
    searchPlaceholder: "Enter at least 2 characters",
    noResults: "No matching quests found.",
    traderLabel: "Trader",
  },
  ja: {
    title: "クエスト",
    description: "トレーダー別のクエスト一覧を V3 データ基準で確認できます。",
    objective: "目標",
    reward: "報酬",
    minLevel: "最低レベル",
    kappa: "Kappa",
    searchPlaceholder: "2文字以上入力してください",
    noResults: "一致するクエストがありません。",
    traderLabel: "トレーダー",
  },
} as const;

const fallbackDash = "-";

interface ObjectiveRow {
  text: string;
  type: string | null;
}

type QuestListRow = QuestListWithTraderEntry | QuestListEntry;

const emptyRewards: QuestRewardGroup = {
  skill_level_reward: [],
  trader_standing: [],
  offer_unlock: [],
  items: [],
  craft_unlock: [],
};

function getLocalizedValue(
  value: Record<string, unknown>,
  locale: Locale,
  prefix: string,
  fallback: string,
) {
  return String(pickLocalizedField(value, locale, prefix) ?? fallback);
}

function hasHydratedQuest(entry: QuestListRow): entry is QuestListWithTraderEntry {
  return "quest" in entry;
}

function getQuestFromEntry(entry: QuestListRow): QuestBase | QuestListEntry {
  if (hasHydratedQuest(entry)) {
    return entry.quest;
  }

  return entry;
}

function getObjectivesFromEntry(entry: QuestListRow) {
  if (hasHydratedQuest(entry)) {
    return entry.objectives;
  }

  return [];
}

function getRewardsFromEntry(entry: QuestListRow) {
  if (hasHydratedQuest(entry)) {
    return entry.finish_rewards;
  }

  return emptyRewards;
}

function getObjectiveRows(objectives: QuestObjective[], locale: Locale) {
  if (objectives.length === 0) {
    return [{ text: fallbackDash, type: null }];
  }

  return objectives.map((objective) => {
    const description = getLocalizedValue(
      objective as unknown as Record<string, unknown>,
      locale,
      "description",
      objective.description_en,
    );

    if (!objective.count || objective.count <= 1) {
      return {
        text: description,
        type: objective.type,
      };
    }

    return {
      text: `${description} x${objective.count.toLocaleString()}`,
      type: objective.type,
    };
  });
}

function getRewardRows(rewards: QuestRewardGroup, locale: Locale) {
  const itemRewards = rewards.items.map((reward) => {
    const name = getLocalizedValue(
      reward.item as unknown as Record<string, unknown>,
      locale,
      "name",
      reward.item.name_en,
    );

    return `${name} x${reward.quantity.toLocaleString()}`;
  });
  const standingRewards = rewards.trader_standing.map((reward) => {
    const traderName = getLocalizedValue(
      reward.trader as unknown as Record<string, unknown>,
      locale,
      "name",
      reward.trader.name_en,
    );

    return `${traderName} ${reward.standing > 0 ? "+" : ""}${reward.standing}`;
  });
  const offerRewards = rewards.offer_unlock.map((reward) => {
    const itemName = reward.item
      ? getLocalizedValue(
          reward.item as unknown as Record<string, unknown>,
          locale,
          "name",
          reward.item.name_en,
        )
      : reward.offer_id;

    return `${itemName} LL${reward.level}`;
  });
  const craftRewards = rewards.craft_unlock.map((reward) => {
    const itemName = reward.reward_item
      ? getLocalizedValue(
          reward.reward_item as unknown as Record<string, unknown>,
          locale,
          "name",
          reward.reward_item.name_en,
        )
      : reward.craft_id;

    return `${itemName} Lv.${reward.station_level}`;
  });
  const skillRewards = rewards.skill_level_reward.map((reward) => {
    const skillName = getLocalizedValue(
      reward as unknown as Record<string, unknown>,
      locale,
      "name",
      reward.name_en,
    );

    return `${skillName} +${reward.skill_level}`;
  });
  const rows = [
    ...itemRewards,
    ...standingRewards,
    ...offerRewards,
    ...craftRewards,
    ...skillRewards,
  ];

  return rows.length > 0 ? rows : [fallbackDash];
}

function matchesQuest(
  entry: QuestListRow,
  keyword: string,
  locale: Locale,
) {
  const quest = getQuestFromEntry(entry);
  const questName = getLocalizedValue(
    quest as unknown as Record<string, unknown>,
    locale,
    "name",
    quest.name_en,
  ).toLowerCase();
  const objectiveText = getObjectivesFromEntry(entry)
    .map((objective) =>
      getLocalizedValue(
        objective as unknown as Record<string, unknown>,
        locale,
        "description",
        objective.description_en,
      ),
    )
    .join(" ")
    .toLowerCase();

  return (
    questName.includes(keyword) ||
    quest.name_en.toLowerCase().includes(keyword) ||
    quest.normalized_name.toLowerCase().includes(keyword) ||
    objectiveText.includes(keyword)
  );
}

export function QuestListPage({
  traderId,
  data,
  locale,
}: {
  traderId: string;
  data: QuestListWithTraderResponse;
  locale: Locale;
}) {
  const copy = copyByLocale[locale];
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filteredQuests = useMemo(() => {
    const keyword = deferredQuery.trim().toLowerCase();

    if (keyword.length < 2) {
      return data.quest_list;
    }

    return (data.quest_list as QuestListRow[]).filter((entry) =>
      matchesQuest(entry, keyword, locale),
    );
  }, [data.quest_list, deferredQuery, locale]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#111418] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="flex flex-col items-center gap-3 pt-4 text-center">
          <h1 className="text-3xl font-black sm:text-4xl">{copy.title}</h1>
          <p className="max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400">
            {copy.description}
          </p>
        </section>

        <section aria-label={copy.traderLabel}>
          <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:grid-cols-5 xl:grid-cols-6">
            {data.trader_list.map((trader) => {
              const traderName = getLocalizedValue(
                trader as unknown as Record<string, unknown>,
                locale,
                "name",
                trader.name_en,
              );

              return (
                <Link
                  key={trader.id}
                  href={`/quest/${trader.normalized_name}`}
                  className={`group flex min-h-32 flex-col items-center justify-center gap-3 rounded-lg border p-3 text-center shadow-sm transition sm:min-h-40 sm:gap-4 sm:p-4 ${
                    trader.normalized_name === traderId
                      ? "border-orange-300 bg-orange-50 text-orange-600 dark:border-orange-400/50 dark:bg-orange-400/10 dark:text-orange-300"
                      : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-[#2a3038] dark:bg-[#181c21] dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-300"
                  }`}
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100 dark:bg-[#20242b] sm:h-20 sm:w-20">
                    <Image
                      src={trader.image}
                      alt={traderName}
                      fill
                      sizes="80px"
                      className="object-cover transition group-hover:scale-105"
                    />
                  </div>
                  <span className="text-xs font-bold sm:text-sm">{traderName}</span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mx-auto w-full max-w-xl">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={copy.searchPlaceholder}
              className="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-300 dark:border-[#2f3742] dark:bg-[#181c21] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-orange-500"
            />
          </label>
        </section>

        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
          <div className="hidden grid-cols-[minmax(180px,0.7fr)_minmax(300px,1.45fr)_minmax(300px,1.45fr)_80px] gap-5 border-b border-gray-100 bg-gray-50 px-5 py-4 text-sm font-black text-orange-500 dark:border-[#2a3038] dark:bg-[#20242b] dark:text-orange-300 md:grid">
            <div>{copy.title}</div>
            <div>{copy.objective}</div>
            <div>{copy.reward}</div>
            <div className="text-right">{copy.kappa}</div>
          </div>

          {filteredQuests.length > 0 ? (
            filteredQuests.map((entry) => {
              const quest = getQuestFromEntry(entry);
              const questName = getLocalizedValue(
                quest as unknown as Record<string, unknown>,
                locale,
                "name",
                quest.name_en,
              );
              const objectiveRows = getObjectiveRows(
                getObjectivesFromEntry(entry),
                locale,
              );
              const rewardRows = getRewardRows(
                getRewardsFromEntry(entry),
                locale,
              );

              return (
                <Link
                  key={quest.id}
                  href={`/quest/detail/${quest.normalized_name}`}
                  className="group grid gap-3 border-b border-gray-100 px-5 py-4 transition last:border-b-0 hover:bg-orange-50/40 dark:border-[#2a3038] dark:hover:bg-[#20242b] md:grid-cols-[minmax(180px,0.7fr)_minmax(300px,1.45fr)_minmax(300px,1.45fr)_80px] md:items-center md:gap-5"
                >
                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-gray-900 transition group-hover:text-orange-500 dark:text-gray-100 dark:group-hover:text-orange-300">
                      {questName}
                    </h2>
                    <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                      {copy.minLevel}: {quest.min_player_level ?? "-"}
                    </p>
                  </div>
                  <div className="min-w-0 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-800 dark:text-gray-200 md:hidden">
                      {copy.objective}:{" "}
                    </span>
                    <ul className="space-y-1">
                      {objectiveRows.map((objective, index) => (
                        <li
                          key={`${quest.id}-objective-${index}`}
                          className="flex items-start gap-2 break-words"
                        >
                          {objective.type === "shoot" ? (
                            <Skull
                              aria-hidden="true"
                              className="mt-1 h-3.5 w-3.5 shrink-0 text-red-500 dark:text-red-400"
                            />
                          ) : null}
                          <span>{objective.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="min-w-0 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    <span className="font-semibold text-gray-800 dark:text-gray-200 md:hidden">
                      {copy.reward}:{" "}
                    </span>
                    <ul className="space-y-1">
                      {rewardRows.map((reward, index) => (
                        <li key={`${quest.id}-reward-${index}`} className="break-words">
                          {reward}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:text-right">
                    {quest.kappa_required ? (
                      <span className="inline-flex rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                        {copy.kappa}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400 dark:text-gray-600">
                        -
                      </span>
                    )}
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="px-6 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
              {copy.noResults}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
