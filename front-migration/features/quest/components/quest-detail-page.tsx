import Link from "next/link";

import { cn } from "@/lib/utils/class-name";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { Locale } from "@/i18n/config";
import type { QuestDetailResponse, QuestDetailItem, QuestRelatedEntry } from "@/types/api/quest";

const copyByLocale = {
  ko: {
    overview: "개요",
    objectives: "목표",
    requirements: "선행 퀘스트",
    nextQuests: "후속 퀘스트",
    rewards: "완료 보상",
    trader: "트레이더",
    minLevel: "최소 레벨",
    experience: "경험치",
    guide: "가이드",
    items: "아이템",
    keys: "필요 열쇠",
    maps: "맵",
    standing: "호감도",
    offers: "해금 오퍼",
    crafts: "제작 해금",
    skill: "스킬",
    wiki: "위키",
  },
  en: {
    overview: "Overview",
    objectives: "Objectives",
    requirements: "Required quests",
    nextQuests: "Next quests",
    rewards: "Rewards",
    trader: "Trader",
    minLevel: "Min level",
    experience: "Experience",
    guide: "Guide",
    items: "Items",
    keys: "Required keys",
    maps: "Maps",
    standing: "Standing",
    offers: "Unlocked offers",
    crafts: "Craft unlocks",
    skill: "Skill",
    wiki: "Wiki",
  },
  ja: {
    overview: "概要",
    objectives: "目標",
    requirements: "前提クエスト",
    nextQuests: "後続クエスト",
    rewards: "報酬",
    trader: "トレーダー",
    minLevel: "最低レベル",
    experience: "経験値",
    guide: "ガイド",
    items: "アイテム",
    keys: "必要キー",
    maps: "マップ",
    standing: "好感度",
    offers: "解放オファー",
    crafts: "クラフト解放",
    skill: "スキル",
    wiki: "Wiki",
  },
} as const;

export function QuestDetailPage({
  data,
  locale,
}: {
  data: QuestDetailResponse;
  locale: Locale;
}) {
  const copy = copyByLocale[locale];
  const questName = String(
    pickLocalizedField(data.quest as unknown as Record<string, unknown>, locale, "name") ??
      data.quest.name_en,
  );
  const guideHtml = String(
    pickLocalizedField(data.quest as unknown as Record<string, unknown>, locale, "guide") ?? "",
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">Quest</p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{questName}</h1>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <InfoBox label={copy.trader} value={data.trader ? data.trader.name_en : "-"} />
            <InfoBox label={copy.minLevel} value={String(data.quest.min_player_level ?? "-")} />
            <InfoBox label={copy.experience} value={String(data.quest.experience ?? "-")} />
            <InfoBox label="Kappa" value={data.quest.kappa_required ? "Required" : "Optional"} />
          </div>
          {data.quest.wiki_url ? (
            <a
              href={data.quest.wiki_url}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex text-sm font-medium text-orange-500"
            >
              {copy.wiki}
            </a>
          ) : null}
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
            <h2 className="text-lg font-semibold">{copy.objectives}</h2>
            <div className="mt-5 grid gap-4">
              {data.objectives.map((objective) => {
                const description = String(
                  pickLocalizedField(
                    objective as unknown as Record<string, unknown>,
                    locale,
                    "description",
                  ) ?? "",
                );

                return (
                  <article key={objective.objective_id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                        {objective.type}
                      </span>
                      {objective.count ? (
                        <span className="text-sm text-gray-500 dark:text-gray-400">x{objective.count}</span>
                      ) : null}
                      {objective.found_in_raid !== null ? (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          FIR: {objective.found_in_raid ? "Yes" : "No"}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm leading-6">{description}</p>

                    {objective.items.length > 0 ? (
                      <QuestItemSection
                        title={copy.items}
                        items={objective.items.map((item) => item.item)}
                        locale={locale}
                      />
                    ) : null}
                    {objective.required_keys.length > 0 ? (
                      <QuestItemSection title={copy.keys} items={objective.required_keys} locale={locale} />
                    ) : null}
                    {objective.maps.length > 0 ? (
                      <div className="mt-4">
                        <h3 className="text-sm font-semibold">{copy.maps}</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {objective.maps.map((map) => (
                            <Link
                              key={map.id}
                              href={`/map-of-tarkov/${map.normalized_name}`}
                              className="rounded-full border border-gray-200 px-3 py-2 text-sm dark:border-gray-700"
                            >
                              {String(
                                pickLocalizedField(
                                  map as unknown as Record<string, unknown>,
                                  locale,
                                  "name",
                                ) ?? map.name_en,
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>

          <div className="space-y-6">
            <QuestRelationSection title={copy.requirements} items={data.require_quests} locale={locale} />
            <QuestRelationSection title={copy.nextQuests} items={data.next_quests} locale={locale} />

            <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
              <h2 className="text-lg font-semibold">{copy.rewards}</h2>
              <div className="mt-5 grid gap-4">
                {data.finish_rewards.items.length > 0 ? (
                  <QuestItemSection
                    title={copy.items}
                    items={data.finish_rewards.items.map((item) => item.item)}
                    locale={locale}
                  />
                ) : null}
                {data.finish_rewards.trader_standing.length > 0 ? (
                  <div>
                    <h3 className="text-sm font-semibold">{copy.standing}</h3>
                    <div className="mt-2 grid gap-2">
                      {data.finish_rewards.trader_standing.map((entry) => (
                        <div key={`${entry.trader.id}-${entry.standing}`} className="rounded-lg border border-gray-200 px-4 py-3 text-sm dark:border-gray-700">
                          {entry.trader.name_en}: {entry.standing}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                {data.finish_rewards.offer_unlock.length > 0 ? (
                  <div>
                    <h3 className="text-sm font-semibold">{copy.offers}</h3>
                    <div className="mt-2 grid gap-2">
                      {data.finish_rewards.offer_unlock.map((entry) => (
                        <div key={entry.offer_id} className="rounded-lg border border-gray-200 px-4 py-3 text-sm dark:border-gray-700">
                          {entry.item?.name_en ?? entry.offer_id} · Lv {entry.level}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                {data.finish_rewards.craft_unlock.length > 0 ? (
                  <div>
                    <h3 className="text-sm font-semibold">{copy.crafts}</h3>
                    <div className="mt-2 grid gap-2">
                      {data.finish_rewards.craft_unlock.map((entry) => (
                        <div key={entry.craft_id} className="rounded-lg border border-gray-200 px-4 py-3 text-sm dark:border-gray-700">
                          {entry.reward_item?.name_en ?? entry.craft_id} · Station {entry.station_level}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                {data.finish_rewards.skill_level_reward.length > 0 ? (
                  <div>
                    <h3 className="text-sm font-semibold">{copy.skill}</h3>
                    <div className="mt-2 grid gap-2">
                      {data.finish_rewards.skill_level_reward.map((entry) => (
                        <div key={`${entry.name_en}-${entry.skill_level}`} className="rounded-lg border border-gray-200 px-4 py-3 text-sm dark:border-gray-700">
                          {entry.name_en}: +{entry.skill_level}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <h2 className="text-lg font-semibold">{copy.guide}</h2>
          <div
            className={cn(
              "prose prose-sm mt-5 max-w-none dark:prose-invert",
              "[&_img]:rounded-lg [&_img]:border [&_img]:border-gray-200 dark:[&_img]:border-gray-700",
            )}
            dangerouslySetInnerHTML={{ __html: guideHtml }}
          />
        </section>
      </div>
    </main>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-[#252830]">
      <div className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">{label}</div>
      <div className="mt-2 text-sm font-semibold">{value}</div>
    </div>
  );
}

function QuestRelationSection({
  title,
  items,
  locale,
}: {
  title: string;
  items: QuestRelatedEntry[];
  locale: Locale;
}) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-4 grid gap-2">
        {items.length > 0 ? (
          items.map((item) => (
            <Link
              key={item.id}
              href={`/quest/detail/${item.normalized_name}`}
              className="rounded-lg border border-gray-200 px-4 py-3 text-sm dark:border-gray-700"
            >
              {String(
                pickLocalizedField(item as unknown as Record<string, unknown>, locale, "name") ??
                  item.name_en,
              )}
            </Link>
          ))
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-400">-</p>
        )}
      </div>
    </section>
  );
}

function QuestItemSection({
  title,
  items,
  locale,
}: {
  title: string;
  items: QuestDetailItem[];
  locale: Locale;
}) {
  return (
    <div className="mt-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/item/info/${item.normalized_name}`}
            className="rounded-lg border border-gray-200 px-4 py-3 text-sm dark:border-gray-700"
          >
            {String(
              pickLocalizedField(item as unknown as Record<string, unknown>, locale, "name") ??
                item.name_en,
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
