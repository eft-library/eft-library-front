"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CircleHelp, LockOpen, LockKeyhole } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { getKordBreachRewards, getKordBreachSeasons, KordRewardsUnavailableError } from "../api";
import { SeasonSelect } from "@/features/price/components/season-select";
import { rewardStage } from "../rewards";
import type { Locale } from "@/i18n/config";
import type { KordReward, KordRewardCondition } from "@/types/api/kord-breach";

const copy = {
  ko: { traits: "특성", rewards: "보상", loading: "보상을 불러오는 중입니다.", error: "보상 정보를 불러오지 못했습니다. 목록이 아직 준비되지 않았거나 일시적인 조회 오류일 수 있습니다.", retry: "다시 시도", empty: "등록된 보상이 없습니다.", unknown: "해금 조건 미확인", none: "조건 없음", quests: "레벨 조건 없음 · 퀘스트 조건 확인", complex: "복합 해금 조건", level: "캐릭터 레벨", complete: "완수", and: "그리고", or: "또는", noImage: "이미지 없음", questMissing: "퀘스트 정보 확인 중", description: "해금 조건에 따라 획득할 수 있는 보상입니다.", partial: "일부 조건만 확인되었을 수 있습니다." },
  en: { traits: "Modifiers", rewards: "Rewards", loading: "Loading rewards…", error: "Rewards could not be loaded. The list may not be ready or temporarily unavailable.", retry: "Retry", empty: "No rewards registered.", unknown: "Unlock conditions unconfirmed", none: "No conditions", quests: "No separate level requirement · Check quests", complex: "Combined unlock conditions", level: "Player level", complete: "Complete", and: "AND", or: "OR", noImage: "No image", questMissing: "Quest information pending", description: "Rewards available by meeting their unlock conditions.", partial: "Additional conditions may be unconfirmed." },
  ja: { traits: "特性", rewards: "報酬", loading: "報酬を読み込み中…", error: "報酬を取得できませんでした。未公開または一時的なエラーの可能性があります。", retry: "再試行", empty: "登録された報酬はありません。", unknown: "解放条件未確認", none: "条件なし", quests: "個別レベル条件なし · クエスト条件を確認", complex: "複合解放条件", level: "キャラクターレベル", complete: "完了", and: "かつ", or: "または", noImage: "画像なし", questMissing: "クエスト情報確認中", description: "解放条件を満たすことで獲得できる報酬です。", partial: "未確認の条件がある可能性があります。" },
};
const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500";


function localized(value: { name_ko: string | null; name_en: string | null; name_ja: string | null; id: string }, locale: Locale) {
  return value[`name_${locale}`] || value.name_en || value.name_ko || value.name_ja || value.id;
}

export function RewardsTab({ locale, children }: { locale: Locale; children: ReactNode }) {
  const t = copy[locale];
  const [tab, setTab] = useState("traits");
  const [selection, setSelection] = useState<string>();
  const seasons = useQuery({
    queryKey: ["kord-reward-seasons"],
    queryFn: ({ signal }) => getKordBreachSeasons(signal),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const seasonId = selection ?? seasons.data?.find((season) => season.is_current)?.id;
  const rewards = useQuery({
    queryKey: ["kord-rewards", seasonId],
    queryFn: ({ signal }) => {
      if (!seasonId) throw new Error("No season selected");
      return getKordBreachRewards(seasonId, signal);
    },
    enabled: Boolean(seasonId) && !seasons.isError,
    retry: false,
  });
  const data = rewards.data;
  const failed = rewards.isError;
  const seasonText = {
    ko: { select: "현재 시즌이 없습니다. 조회할 시즌을 선택해주세요.", empty: "등록된 시즌이 없습니다.", error: "시즌 목록을 불러오지 못했습니다.", unavailable: "선택한 시즌의 보상 목록이 아직 준비되지 않았습니다." },
    en: { select: "No current season. Select a season to view rewards.", empty: "No seasons registered.", error: "Could not load seasons.", unavailable: "Rewards for this season are not available yet." },
    ja: { select: "現在のシーズンがありません。シーズンを選択してください。", empty: "登録されたシーズンはありません。", error: "シーズン一覧を取得できませんでした。", unavailable: "選択したシーズンの報酬はまだ公開されていません。" },
  }[locale];
  useEffect(() => {
    const sync = () => setTab(new URLSearchParams(window.location.search).get("tab") === "rewards" ? "rewards" : "traits");
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  function select(value: string) {
    setTab(value);
    const url = new URL(window.location.href);
    if (value === "rewards") url.searchParams.set("tab", value); else url.searchParams.delete("tab");
    window.history.pushState(null, "", url);
  }
  const groups = new Map<string, KordReward[]>();
  for (const reward of [...(data?.rewards ?? [])].sort((a, b) => a.sort_order - b.sort_order)) {
    const key = rewardStage(reward);
    groups.set(key, [...(groups.get(key) ?? []), reward]);
  }
  const rank = (key: string) => key.startsWith("level:") ? Number(key.slice(6)) : ({ none: -2, quests: -1, complex: Infinity, unknown: Infinity }[key] ?? Infinity);
  const stages = [...groups].sort(([a], [b]) => rank(a) - rank(b));
  const label = (key: string) => key.startsWith("level:") ? `${t.level} ${key.slice(6)}` : t[key as "none" | "quests" | "complex" | "unknown"];
  return <>
    <div role="tablist" aria-label="KORD · BREACH" className="flex gap-6 border-b border-line">
      {(["traits", "rewards"] as const).map((value, index) => <button key={value} id={`kord-tab-${value}`} type="button" role="tab" aria-selected={tab === value} aria-controls={`kord-panel-${value}`} tabIndex={tab === value ? 0 : -1} onClick={() => select(value)} onKeyDown={(event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "Home" ? "traits" : event.key === "End" ? "rewards" : index === 0 ? "rewards" : "traits";
        select(next); document.getElementById(`kord-tab-${next}`)?.focus();
      }} className={`relative px-1 py-3 text-sm font-bold ${focus} ${tab === value ? "text-orange-700 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-orange-500 dark:text-orange-400" : "text-gray-600 hover:text-orange-700 dark:text-gray-400 dark:hover:text-orange-300"}`}>
        {t[value]}{value === "rewards" && data && <span className="ml-2 rounded bg-surface-elevated px-1.5 py-0.5 text-xs tabular-nums">{data.total}</span>}
      </button>)}
    </div>
    <div id="kord-panel-traits" role="tabpanel" aria-labelledby="kord-tab-traits" hidden={tab !== "traits"} className="space-y-5">{children}</div>
    <div id="kord-panel-rewards" role="tabpanel" aria-labelledby="kord-tab-rewards" hidden={tab !== "rewards"}>
      <section className="rounded-xl border border-line bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div><h2 className="font-bold text-orange-700 dark:text-orange-400">{t.rewards} <span className="ml-2 text-[10px] tracking-wider text-gray-600 dark:text-gray-400">REWARDS</span></h2><p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{t.description}</p></div>
          <SeasonSelect locale={locale} seasons={seasons.data ?? []} value={seasonId} onChange={setSelection} isLoading={seasons.isPending} isError={seasons.isError} onRetry={() => { void seasons.refetch(); }} />
          <div className="flex flex-wrap items-center gap-2">{stages.map(([key]) => <span key={key} className="rounded-md border border-line bg-surface-elevated px-2.5 py-1 text-xs">{label(key)}</span>)}</div>
        </div>
        {seasons.isError && <p role="alert" className="mt-5 text-sm">{seasonText.error}</p>}
        {seasons.isSuccess && !seasonId && <p role="status" className="mt-5 text-sm text-gray-600 dark:text-gray-400">{seasons.data.length ? seasonText.select : seasonText.empty}</p>}
        {(seasons.isPending || (seasonId && rewards.isPending && !seasons.isError)) && <p role="status" className="mt-5 text-sm text-gray-600 dark:text-gray-400">{t.loading}</p>}
        {failed && <div role="alert" className="mt-5 text-sm"><p>{rewards.error instanceof KordRewardsUnavailableError ? seasonText.unavailable : t.error}</p><button type="button" onClick={() => { void rewards.refetch(); }} className={`mt-3 rounded-md border border-line bg-surface-elevated px-3 py-2 hover:border-orange-400 ${focus}`}>{t.retry}</button></div>}
        {data && data.rewards.length === 0 && <p className="mt-5 text-sm text-gray-600 dark:text-gray-400">{t.empty}</p>}
        <div className="mt-6 space-y-6">{stages.map(([key, rewards], index) => <div key={key} className="relative pl-10 sm:pl-12">
          {index < stages.length - 1 && <div aria-hidden="true" className="absolute bottom-[-24px] left-3.5 top-7 border-l border-line" />}
          <span aria-hidden="true" className="absolute left-0 top-0 flex size-7 items-center justify-center rounded-full border border-orange-300 bg-orange-100 text-xs font-bold text-orange-800 dark:border-orange-500/30 dark:bg-orange-500/15 dark:text-orange-300">{key.startsWith("level:") ? key.slice(6) : key === "unknown" ? <CircleHelp className="size-3.5" /> : key === "none" ? <LockOpen className="size-3.5" /> : <LockKeyhole className="size-3.5" />}</span>
          <h3 className="mb-3 pt-1 text-sm font-bold">{label(key)}</h3>
          <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2">{rewards.map((reward) => <RewardCard key={reward.id} reward={reward} locale={locale} />)}</div>
        </div>)}</div>
      </section>
    </div>
  </>;
}

function RewardCard({ reward, locale }: { reward: KordReward; locale: Locale }) {
  const t = copy[locale];
  const [imageFailed, setImageFailed] = useState(false);
  const item = reward.item;
  const name = localized(item, locale);
  const groups = new Map<number, KordRewardCondition[]>();
  for (const condition of [...reward.unlock_conditions].sort((a, b) => a.group_no - b.group_no || a.sort_order - b.sort_order)) groups.set(condition.group_no, [...(groups.get(condition.group_no) ?? []), condition]);
  const slot = <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-line bg-background bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-size-[16px_16px] sm:size-28">
    {item.image && !imageFailed ? <Image src={item.image} alt={name} fill sizes="(min-width: 640px) 112px, 80px" className="object-contain p-1" onError={() => setImageFailed(true)} /> : <span className="p-2 text-center text-[10px] text-gray-600 dark:text-gray-400">{t.noImage}</span>}
    {reward.required_level !== null && reward.unlock_conditions_known && <span className="absolute left-0 top-0 rounded-br bg-orange-500 px-1.5 py-0.5 text-[10px] font-bold text-white dark:bg-orange-400 dark:text-gray-950">Lv.{reward.required_level}</span>}
  </div>;
  return <article className="flex min-w-0 items-start gap-3 rounded-lg border border-line bg-surface-elevated p-3 transition hover:-translate-y-0.5 hover:border-gray-400">
    {item.normalized_name ? <Link href={`/item/info/${encodeURIComponent(item.normalized_name)}`} className={`shrink-0 rounded-md ${focus}`}>{slot}</Link> : slot}
    <div className="min-w-0 flex-1">{item.category && <p className="mb-1 text-[10px] font-bold tracking-wider text-gray-600 dark:text-gray-400">{item.category}</p>}
      <h4 className="break-words text-sm font-bold">{item.normalized_name ? <Link href={`/item/info/${encodeURIComponent(item.normalized_name)}`} className={`rounded hover:text-orange-700 dark:hover:text-orange-300 ${focus}`}>{name}</Link> : name}</h4>
      <div className="mt-2 space-y-2">
        {!reward.unlock_conditions_known && <p className="text-xs font-semibold text-amber-800 dark:text-amber-300">{t.unknown}{groups.size > 0 && <span className="mt-1 block font-normal">{t.partial}</span>}</p>}
        {reward.unlock_conditions_known && groups.size === 0 && <p className="text-xs text-gray-600 dark:text-gray-400">{t.none}</p>}
        {[...groups].map(([group, conditions], groupIndex) => <div key={group} className="space-y-1.5">
          {groupIndex > 0 && <p className="text-xs font-bold text-orange-700 dark:text-orange-300">{t.or}</p>}
          {conditions.map((condition, index) => <div key={`${condition.sort_order}-${index}`}>
            {index > 0 && <p className="my-1 text-[10px] text-gray-600 dark:text-gray-400">{t.and}</p>}
            {condition.condition_type === "player_level" ? <p className="rounded-md border border-line bg-surface px-2 py-2 text-xs">{t.level} {condition.required_level ?? "—"}</p> : <QuestCondition condition={condition} locale={locale} />}
          </div>)}
        </div>)}
      </div>
    </div>
  </article>;
}

function QuestCondition({ condition, locale }: { condition: KordRewardCondition; locale: Locale }) {
  const t = copy[locale];
  const quest = condition.quest;
  const name = quest ? localized(quest, locale).replace(/^\[KORD[\s·-]*BREACH\]\s*/i, "") : t.questMissing;
  const content = <><span className="min-w-0 flex-1"><span className="block text-[10px] text-gray-600 dark:text-gray-400 sm:inline">[KORD BREACH] </span><strong className="break-words text-xs">{name}</strong></span><span className="hidden shrink-0 text-[10px] text-gray-600 dark:text-gray-400 sm:inline">{t.complete}</span></>;
  const className = `flex min-w-0 items-center gap-1 rounded-md border border-line bg-surface px-2 py-2 ${focus}`;
  return quest?.is_registered && quest.normalized_name ? <Link href={`/quest/detail/${encodeURIComponent(quest.normalized_name)}`} className={`${className} hover:border-orange-400`}>{content}<ChevronRight className="size-3.5 shrink-0" /></Link> : <div className={className}>{content}</div>;
}
