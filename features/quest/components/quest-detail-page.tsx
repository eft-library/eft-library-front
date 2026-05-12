"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, ExternalLink, Skull, Star, X, ZoomIn, ZoomOut } from "lucide-react";

import { HorizontalAdBanner } from "@/components/shared/ad-banner";
import { cn } from "@/lib/utils/class-name";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { Locale } from "@/i18n/config";
import type {
  QuestDetailItem,
  QuestDetailResponse,
  QuestObjective,
  QuestRelatedEntry,
  QuestRewardCraftUnlock,
  QuestRewardItem,
  QuestRewardOfferUnlock,
  QuestRewardSkill,
  QuestRewardStanding,
} from "@/types/api/quest";

const copyByLocale = {
  ko: {
    objectives: "목표",
    requirements: "이전",
    nextQuests: "다음",
    noRequirements: "이전 퀘스트 없음",
    noNextQuests: "다음 퀘스트 없음",
    rewards: "보상",
    trader: "트레이더",
    minLevel: "LV.",
    experience: "경험치",
    guide: "가이드",
    items: "아이템",
    keys: "필요 열쇠",
    maps: "맵",
    standing: "호감도",
    offers: "구매 잠금 해제",
    crafts: "제작 해금",
    skill: "스킬",
    wiki: "위키",
    kappa: "Kappa",
    foundInRaid: "인레이드",
    empty: "-",
  },
  en: {
    objectives: "Objectives",
    requirements: "Previous",
    nextQuests: "Next",
    noRequirements: "No previous quests",
    noNextQuests: "No next quests",
    rewards: "Rewards",
    trader: "Trader",
    minLevel: "LV.",
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
    kappa: "Kappa",
    foundInRaid: "Found in raid",
    empty: "-",
  },
  ja: {
    objectives: "目標",
    requirements: "前",
    nextQuests: "次",
    noRequirements: "前提クエストなし",
    noNextQuests: "後続クエストなし",
    rewards: "報酬",
    trader: "トレーダー",
    minLevel: "LV.",
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
    kappa: "Kappa",
    foundInRaid: "レイド内発見",
    empty: "-",
  },
} as const;

function getLocalizedValue(
  value: Record<string, unknown>,
  locale: Locale,
  prefix: string,
  fallback: string,
) {
  return String(pickLocalizedField(value, locale, prefix) ?? fallback);
}

function formatSignedNumber(value: number) {
  return `${value > 0 ? "+" : ""}${value}`;
}

interface ImagePopupState {
  src: string;
  alt: string;
}

export function QuestDetailPage({
  data,
  locale,
}: {
  data: QuestDetailResponse;
  locale: Locale;
}) {
  const copy = copyByLocale[locale];
  const [imagePopup, setImagePopup] = useState<ImagePopupState | null>(null);
  const questName = getLocalizedValue(
    data.quest as unknown as Record<string, unknown>,
    locale,
    "name",
    data.quest.name_en,
  );
  const traderName = data.trader
    ? getLocalizedValue(
        data.trader as unknown as Record<string, unknown>,
        locale,
        "name",
        data.trader.name_en,
      )
    : copy.empty;
  const guideHtml = getLocalizedValue(
    data.quest as unknown as Record<string, unknown>,
    locale,
    "guide",
    "",
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#111418] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="flex flex-col items-center gap-5 pt-4 text-center">
          {data.trader?.image ? (
            <div className="relative h-28 w-28 overflow-hidden rounded-2xl border border-orange-300 bg-gray-100 shadow-sm shadow-orange-200/40 dark:border-lime-500/50 dark:bg-[#181c21] dark:shadow-lime-500/20">
              <Image
                src={data.trader.image}
                alt={traderName}
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            </div>
          ) : null}
          <div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              {traderName}
            </p>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl">{questName}</h1>
            <HorizontalAdBanner />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="rounded-lg border border-orange-300 bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600 dark:border-yellow-400/60 dark:bg-yellow-400/10 dark:text-yellow-300">
              {copy.minLevel} {data.quest.min_player_level ?? copy.empty}
            </span>
            {data.quest.kappa_required ? (
              <span className="inline-flex items-center gap-2 rounded-lg bg-lime-500 px-3 py-1.5 text-xs font-black text-gray-950">
                {copy.kappa}
                <Check className="h-3.5 w-3.5" />
              </span>
            ) : null}
            {data.quest.wiki_url ? (
              <a
                href={data.quest.wiki_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-500 dark:border-[#2a3038] dark:bg-[#181c21] dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-300"
              >
                {copy.wiki}
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </section>

        <section className="grid gap-2 md:grid-cols-2 md:items-start">
          <QuestRelationSection
            title={copy.requirements}
            emptyLabel={copy.noRequirements}
            items={data.require_quests}
            locale={locale}
          />
          <QuestRelationSection
            title={copy.nextQuests}
            emptyLabel={copy.noNextQuests}
            items={data.next_quests}
            locale={locale}
          />
        </section>

        <HorizontalAdBanner />

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
          <SectionTitle>{copy.objectives}</SectionTitle>
          <div className="mt-5 space-y-4">
            {data.objectives.map((objective) => (
              <ObjectiveCard
                key={objective.objective_id}
                objective={objective}
                locale={locale}
                copy={copy}
              />
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
          <SectionTitle>{copy.rewards}</SectionTitle>
          <div className="mt-5 grid min-w-0 gap-6 lg:grid-cols-2">
            {data.quest.experience !== null && data.quest.experience !== undefined ? (
              <ExperienceReward title={copy.experience} value={data.quest.experience} />
            ) : null}
            {data.finish_rewards.items.length > 0 ? (
              <RewardItemSection
                title={copy.items}
                rewards={data.finish_rewards.items}
                locale={locale}
              />
            ) : null}
            {data.finish_rewards.trader_standing.length > 0 ? (
              <StandingSection
                title={copy.standing}
                items={data.finish_rewards.trader_standing}
                locale={locale}
              />
            ) : null}
            {data.finish_rewards.offer_unlock.length > 0 ? (
              <OfferSection
                title={copy.offers}
                items={data.finish_rewards.offer_unlock}
                locale={locale}
              />
            ) : null}
            {data.finish_rewards.craft_unlock.length > 0 ? (
              <CraftSection
                title={copy.crafts}
                items={data.finish_rewards.craft_unlock}
                locale={locale}
              />
            ) : null}
            {data.finish_rewards.skill_level_reward.length > 0 ? (
              <SkillSection title={copy.skill} items={data.finish_rewards.skill_level_reward} />
            ) : null}
          </div>
        </section>

        <HorizontalAdBanner />

        {guideHtml ? (
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
            <SectionTitle>{copy.guide}</SectionTitle>
            <div
              className={cn(
                "rich-html-content mt-5",
                "[&_img]:cursor-zoom-in",
              )}
              onClick={(event) => {
                const target = event.target;

                if (!(target instanceof HTMLImageElement)) {
                  return;
                }

                event.preventDefault();
                setImagePopup({
                  src: target.currentSrc || target.src,
                  alt: target.alt || questName,
                });
              }}
              dangerouslySetInnerHTML={{ __html: guideHtml }}
            />
          </section>
        ) : null}
      </div>

      <ImagePopup image={imagePopup} onClose={() => setImagePopup(null)} />
    </main>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="border-b border-gray-200 pb-4 text-xl font-black dark:border-[#2a3038]">
      {children}
    </h2>
  );
}

function ObjectiveCard({
  objective,
  locale,
  copy,
}: {
  objective: QuestObjective;
  locale: Locale;
  copy: (typeof copyByLocale)[Locale];
}) {
  const description = getLocalizedValue(
    objective as unknown as Record<string, unknown>,
    locale,
    "description",
    objective.description_en,
  );

  return (
    <article className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-[#2a3038] dark:bg-[#20242b]">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center text-yellow-400">
          <Star className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
            {description}
            {objective.count ? (
              <span className="ml-1 font-bold text-gray-900 dark:text-white">
                x{objective.count.toLocaleString()}
              </span>
            ) : null}
            {objective.type === "shoot" ? (
              <Skull className="ml-2 inline h-4 w-4 text-red-500 dark:text-red-400" />
            ) : null}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
              {objective.type}
            </span>
            {objective.found_in_raid !== null ? (
              <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-bold text-gray-600 dark:bg-[#181c21] dark:text-gray-300">
                {copy.foundInRaid}: {objective.found_in_raid ? "Yes" : "No"}
              </span>
            ) : null}
          </div>
          {objective.items.length > 0 ? (
            <QuestItemSection
              title={copy.items}
              items={objective.items.map((item) => item.item)}
              locale={locale}
            />
          ) : null}
          {objective.required_keys.length > 0 ? (
            <QuestItemSection
              title={copy.keys}
              items={objective.required_keys}
              locale={locale}
            />
          ) : null}
          {objective.maps.length > 0 ? (
            <div className="mt-4">
              <h3 className="text-sm font-bold">{copy.maps}</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {objective.maps.map((map) => (
                  <Link
                    key={map.id}
                    href={`/map-of-tarkov/${map.normalized_name}`}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 transition hover:border-orange-300 hover:text-orange-500 dark:border-[#2a3038] dark:bg-[#181c21] dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-300"
                  >
                    {getLocalizedValue(
                      map as unknown as Record<string, unknown>,
                      locale,
                      "name",
                      map.name_en,
                    )}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function QuestRelationSection({
  title,
  emptyLabel,
  items,
  locale,
}: {
  title: string;
  emptyLabel: string;
  items: QuestRelatedEntry[];
  locale: Locale;
}) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
      <h2 className="text-xs font-black text-gray-700 dark:text-gray-200">{title}</h2>
      <div className="mt-2 grid gap-1.5">
        {items.length > 0 ? (
          items.map((item) => (
            <Link
              key={item.id}
              href={`/quest/detail/${item.normalized_name}`}
              className="rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-500 dark:border-[#2a3038] dark:bg-[#20242b] dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-300"
            >
              {getLocalizedValue(
                item as unknown as Record<string, unknown>,
                locale,
                "name",
                item.name_en,
              )}
            </Link>
          ))
        ) : (
          <p className="rounded-md border border-dashed border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-500 dark:border-[#2a3038] dark:bg-[#20242b]/60 dark:text-gray-400">
            {emptyLabel}
          </p>
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
      <h3 className="text-sm font-bold">{title}</h3>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} locale={locale} />
        ))}
      </div>
    </div>
  );
}

function ExperienceReward({ title, value }: { title: string; value: number }) {
  return (
    <RewardGroup title={title}>
      <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm dark:border-[#2a3038] dark:bg-[#20242b]">
        <span className="font-black text-orange-600 dark:text-orange-300">
          {value.toLocaleString()}
        </span>
        <span className="ml-1 font-semibold text-gray-600 dark:text-gray-300">
          EXP
        </span>
      </div>
    </RewardGroup>
  );
}

function RewardItemSection({
  title,
  rewards,
  locale,
}: {
  title: string;
  rewards: QuestRewardItem[];
  locale: Locale;
}) {
  return (
    <RewardGroup title={title}>
      {rewards.map((reward) => (
        <ItemCard
          key={`${reward.item.id}-${reward.quantity}`}
          item={reward.item}
          locale={locale}
          meta={`x${reward.quantity.toLocaleString()}`}
        />
      ))}
    </RewardGroup>
  );
}

function StandingSection({
  title,
  items,
  locale,
}: {
  title: string;
  items: QuestRewardStanding[];
  locale: Locale;
}) {
  return (
    <RewardGroup title={title}>
      {items.map((item) => {
        const traderName = getLocalizedValue(
          item.trader as unknown as Record<string, unknown>,
          locale,
          "name",
          item.trader.name_en,
        );

        return (
          <div
            key={`${item.trader.id}-${item.standing}`}
            className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm dark:border-[#2a3038] dark:bg-[#20242b]"
          >
            <span className="font-semibold">{traderName}</span>{" "}
            <span className="text-lime-600 dark:text-lime-300">
              {formatSignedNumber(item.standing)}
            </span>
          </div>
        );
      })}
    </RewardGroup>
  );
}

function OfferSection({
  title,
  items,
  locale,
}: {
  title: string;
  items: QuestRewardOfferUnlock[];
  locale: Locale;
}) {
  return (
    <RewardGroup title={title}>
      {items.map((item) => (
        <div key={item.offer_id} className="min-w-0">
          {item.item ? (
            <ItemCard item={item.item} locale={locale} meta={`LL${item.level}`} />
          ) : (
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm dark:border-[#2a3038] dark:bg-[#20242b]">
              {item.offer_id} · LL{item.level}
            </div>
          )}
        </div>
      ))}
    </RewardGroup>
  );
}

function CraftSection({
  title,
  items,
  locale,
}: {
  title: string;
  items: QuestRewardCraftUnlock[];
  locale: Locale;
}) {
  return (
    <RewardGroup title={title}>
      {items.map((item) => (
        <div key={item.craft_id} className="min-w-0">
          {item.reward_item ? (
            <ItemCard
              item={item.reward_item}
              locale={locale}
              meta={`Lv.${item.station_level}`}
            />
          ) : (
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm dark:border-[#2a3038] dark:bg-[#20242b]">
              {item.craft_id} · Lv.{item.station_level}
            </div>
          )}
        </div>
      ))}
    </RewardGroup>
  );
}

function SkillSection({
  title,
  items,
}: {
  title: string;
  items: QuestRewardSkill[];
}) {
  return (
    <RewardGroup title={title}>
      {items.map((item) => (
        <div
          key={`${item.name_en}-${item.skill_level}`}
          className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm dark:border-[#2a3038] dark:bg-[#20242b]"
        >
          <span className="font-semibold">{item.name_en}</span>{" "}
          <span className="text-lime-600 dark:text-lime-300">
            +{item.skill_level}
          </span>
        </div>
      ))}
    </RewardGroup>
  );
}

function RewardGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <h3 className="text-sm font-black text-gray-900 dark:text-gray-100">{title}</h3>
      <div className="mt-3 grid min-w-0 gap-2">{children}</div>
    </div>
  );
}

function ItemCard({
  item,
  locale,
  meta,
}: {
  item: QuestDetailItem;
  locale: Locale;
  meta?: string;
}) {
  const itemName = getLocalizedValue(
    item as unknown as Record<string, unknown>,
    locale,
    "name",
    item.name_en,
  );

  return (
    <Link
      href={`/item/info/${item.normalized_name}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-w-0 w-full items-center gap-3 overflow-hidden rounded-lg border border-gray-200 bg-white p-3 text-sm transition hover:border-orange-300 hover:text-orange-500 dark:border-[#2a3038] dark:bg-[#181c21] dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-300"
    >
      {item.image ? (
        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-[#20242b]">
          <Image src={item.image} alt={itemName} fill sizes="40px" className="object-contain" />
        </span>
      ) : null}
      <span className="min-w-0 flex-1 truncate">{itemName}</span>
      {meta ? (
        <span className="shrink-0 rounded-full bg-orange-50 px-2 py-1 text-[11px] font-bold text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
          {meta}
        </span>
      ) : null}
    </Link>
  );
}

function ImagePopup({
  image,
  onClose,
}: {
  image: ImagePopupState | null;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(0.75);

  useEffect(() => {
    if (!image) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose]);

  useEffect(() => {
    setZoom(0.75);
  }, [image?.src]);

  if (!image) {
    return null;
  }

  const zoomOut = () =>
    setZoom((value) => Math.max(0.5, Number((value - 0.25).toFixed(2))));
  const zoomIn = () =>
    setZoom((value) => Math.min(3, Number((value + 0.25).toFixed(2))));

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-x-0 bottom-0 top-14 z-20 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full max-w-[88vw] flex-col overflow-hidden rounded-lg bg-black/50 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full bg-black/70 p-1 text-white">
          <button
            type="button"
            aria-label="Zoom out"
            onClick={zoomOut}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/15 disabled:opacity-40"
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <span className="min-w-12 text-center text-xs font-bold">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            aria-label="Zoom in"
            onClick={zoomIn}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/15 disabled:opacity-40"
            disabled={zoom >= 3}
          >
            <ZoomIn className="h-5 w-5" />
          </button>
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-orange-500"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="h-full w-full overflow-auto p-12">
          <div className="flex min-h-full min-w-full items-center justify-center">
            <img
              src={image.src}
              alt={image.alt}
              className="h-auto max-w-none object-contain"
              style={{ width: `${zoom * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
