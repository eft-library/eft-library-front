"use client";

import { useEffect, useMemo, useState } from "react";

import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import {
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  Hammer,
  Minus,
  Package,
  Plus,
  RotateCcw,
  Save,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

import {
  getUserHideoutStations,
  saveHideoutStationItems,
  saveHideoutStations,
} from "@/features/hideout/api";
import type { Locale } from "@/i18n/config";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type {
  HideoutBonus,
  HideoutCraft,
  HideoutDetailResponse,
  HideoutLevelDetail,
  HideoutRequirementItem,
  HideoutRequirementSkill,
  HideoutRequirementStation,
  HideoutRequirementTrader,
  HideoutStationSummary,
  HideoutUserItem,
  HideoutUserState,
} from "@/types/api/hideout";

const MAX_ITEM_COUNT = 999;
const STATION_ICON_COLOR = "#94a3b8";
const LEVEL_COLORS = [
  "#D4A076",
  "#E06A32",
  "#70A568",
  "#4B91A3",
  "#5A5FAA",
  "#914FA3",
];
const LEVEL_GRADIENTS = [
  "from-[#D4A076] to-[#E06A32]",
  "from-[#E06A32] to-[#70A568]",
  "from-[#70A568] to-[#4B91A3]",
  "from-[#4B91A3] to-[#5A5FAA]",
  "from-[#5A5FAA] to-[#914FA3]",
  "from-[#914FA3] to-[#D4A076]",
];

function getLocalizedName(
  value: { name_en: string; name_ko: string; name_ja: string },
  locale: Locale,
) {
  const localized = pickLocalizedField(
    value as unknown as Record<string, unknown>,
    locale,
    "name",
  );

  return typeof localized === "string" && localized ? localized : value.name_en;
}

function formatSecondsToDuration(totalSeconds: number) {
  if (totalSeconds <= 0) {
    return "Instant";
  }

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return [days > 0 ? `${days}d` : null, hours > 0 ? `${hours}h` : null, `${minutes}m`]
    .filter(Boolean)
    .join(" ");
}

function getItemKey(id: string, foundInRaid: boolean) {
  return `${id}:${foundInRaid ? "raid" : "normal"}`;
}

function getNextLevelId(levels: HideoutLevelDetail[], completeList: string[]) {
  const incomplete = levels.find((level) => !completeList.includes(level.id));
  return incomplete?.id ?? levels.at(-1)?.id ?? "";
}

function getLevelColor(level: number) {
  return LEVEL_COLORS[Math.max(0, level - 1) % LEVEL_COLORS.length];
}

function getStationCompleteLevel(stationId: string, completeList: string[]) {
  return completeList
    .filter((levelId) => levelId.startsWith(`${stationId}-`))
    .map((levelId) => Number(levelId.split("-").at(-1) ?? 0))
    .filter((level) => Number.isFinite(level))
    .reduce((max, level) => Math.max(max, level), 0);
}

function StationIcon({
  stationId,
  color,
  size = 44,
}: {
  stationId: string;
  color: string;
  size?: number;
}) {
  const icon = getStationSVG(stationId, size, size, color);

  if (icon) {
    return icon;
  }

  return <Hammer className="h-8 w-8" style={{ color }} />;
}

function StationSelector({
  selectedStation,
  stations,
  completeList,
  tabState,
  onTabChange,
  itemRequirements,
  userItemMap,
  locale,
  onIncreaseItem,
  onDecreaseItem,
  onChangeItem,
}: {
  selectedStation: string;
  stations: HideoutStationSummary[];
  completeList: string[];
  tabState: "station" | "items";
  onTabChange: (tab: "station" | "items") => void;
  itemRequirements: HideoutRequirementItem[];
  userItemMap: Map<string, number>;
  locale: Locale;
  onIncreaseItem: (item: HideoutRequirementItem) => void;
  onDecreaseItem: (item: HideoutRequirementItem) => void;
  onChangeItem: (item: HideoutRequirementItem, count: number) => void;
}) {
  return (
    <section className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-700/40 dark:bg-[#20252d]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-slate-700/50 dark:bg-[#171b21]">
          <button
            type="button"
            onClick={() => onTabChange("station")}
            className={`h-9 rounded-md px-4 text-sm font-semibold transition ${
              tabState === "station"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-white dark:text-gray-300 dark:hover:bg-slate-700/50"
            }`}
          >
            Station
          </button>
          <button
            type="button"
            onClick={() => onTabChange("items")}
            className={`h-9 rounded-md px-4 text-sm font-semibold transition ${
              tabState === "items"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-white dark:text-gray-300 dark:hover:bg-slate-700/50"
            }`}
          >
            Items
          </button>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {tabState === "station"
            ? `${stations.length} stations`
            : `${itemRequirements.length} items`}
        </span>
      </div>
      <div className="max-h-[560px] overflow-y-auto pr-1">
        {tabState === "station" ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {stations.map((station) => {
              const isSelected = station.normalized_name === selectedStation;
              const completeLevel = getStationCompleteLevel(station.id, completeList);
              const iconColor = completeLevel > 0 ? getLevelColor(completeLevel) : STATION_ICON_COLOR;

              return (
                <Link
                  key={station.id}
                  href={`/hideout/${station.normalized_name}`}
                  className={`group relative flex min-h-[116px] flex-col items-center justify-center rounded-lg border px-2 py-3 text-center transition ${
                    isSelected
                      ? "border-blue-300 bg-blue-50 text-blue-900 shadow-sm hover:bg-blue-100 dark:border-[#3498DB] dark:bg-[#1A2533] dark:text-white"
                      : "border-gray-100 bg-gray-50 text-gray-600 hover:bg-white dark:border-slate-700/40 dark:bg-[#171b21] dark:text-slate-300 dark:hover:bg-[#222936]"
                  }`}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center transition-transform group-hover:scale-105">
                    <StationIcon
                      stationId={station.id}
                      color={iconColor}
                      size={42}
                    />
                  </span>
                  <span className="mt-2 min-h-9 min-w-0">
                    <span className="line-clamp-2 text-sm font-semibold leading-tight">
                      {getLocalizedName(station, locale)}
                    </span>
                  </span>
                  <span
                    className={`mt-1 text-sm font-semibold ${
                      isSelected
                        ? "text-blue-700 dark:text-white"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    Lv.{completeLevel}
                  </span>
                  {completeLevel > 0 ? (
                    <span className="absolute right-2 top-2 flex h-5 min-w-5 items-center justify-center rounded-full border border-green-300 bg-green-100 text-green-700 dark:border-green-700 dark:bg-green-950 dark:text-green-200">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {itemRequirements.map((item) => (
              <ItemCounterCard
                key={`${item.id}-${item.in_raid}`}
                item={item}
                locale={locale}
                ownedCount={userItemMap.get(getItemKey(item.item_id, item.in_raid)) ?? 0}
                onIncrease={() => onIncreaseItem(item)}
                onDecrease={() => onDecreaseItem(item)}
                onChange={(count) => onChangeItem(item, count)}
              />
            ))}
            {itemRequirements.length === 0 ? (
              <div className="col-span-full rounded-lg bg-gray-50 p-6 text-center text-sm text-gray-500 dark:bg-[#171b21] dark:text-gray-400">
                필요한 재료가 없습니다.
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

function ItemCounterCard({
  item,
  locale,
  ownedCount,
  onIncrease,
  onDecrease,
  onChange,
}: {
  item: HideoutRequirementItem;
  locale: Locale;
  ownedCount: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChange: (count: number) => void;
}) {
  const isEnough = ownedCount >= item.quantity;

  return (
    <div
      className={`relative rounded-lg border p-3 text-center transition ${
        isEnough
          ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/35"
          : "border-gray-100 bg-gray-50 dark:border-slate-700/40 dark:bg-[#171b21]"
      }`}
    >
      {isEnough ? (
        <span className="absolute right-2 top-2 z-10 flex h-5 min-w-5 items-center justify-center rounded-full border border-green-300 bg-green-100 text-green-700 dark:border-green-700 dark:bg-green-900 dark:text-green-200">
          <Check className="h-3.5 w-3.5" />
        </span>
      ) : null}
      <Link
        href={`/item/info/${item.normalized_name}`}
        target="_blank"
        rel="noreferrer"
        className="relative mx-auto flex h-16 w-16 items-center justify-center"
      >
        <Image
          src={item.image}
          alt={getLocalizedName(item, locale)}
          fill
          sizes="64px"
          className="object-contain"
        />
        {item.in_raid ? (
          <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white shadow">
            <Check className="h-3.5 w-3.5" />
          </span>
        ) : null}
      </Link>
      <Link
        href={`/item/info/${item.normalized_name}`}
        target="_blank"
        rel="noreferrer"
        className="mt-2 line-clamp-2 min-h-9 text-xs font-semibold text-gray-900 hover:text-orange-600 dark:text-white dark:hover:text-orange-300"
      >
        {getLocalizedName(item, locale)}
      </Link>
      <div className="mt-2 flex items-center justify-between gap-1">
        <button
          type="button"
          onClick={onDecrease}
          disabled={ownedCount === 0}
          className="flex h-6 w-6 items-center justify-center rounded-md text-gray-600 hover:bg-white disabled:opacity-40 dark:text-gray-300 dark:hover:bg-slate-700/60"
          aria-label="Decrease item count"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <div className="flex items-baseline gap-1">
          <input
            type="number"
            min={0}
            max={MAX_ITEM_COUNT}
            value={ownedCount}
            onChange={(event) => onChange(Number(event.target.value))}
            className="h-7 w-16 rounded-sm border border-gray-200 bg-white text-center text-xs font-semibold text-gray-900 outline-none focus:border-blue-400 dark:border-slate-700 dark:bg-[#20252d] dark:text-white"
          />
          <span className="text-xs font-semibold text-gray-900 dark:text-white">
            / {item.quantity}
          </span>
        </div>
        <button
          type="button"
          onClick={onIncrease}
          className="flex h-6 w-6 items-center justify-center rounded-md text-gray-600 hover:bg-white dark:text-gray-300 dark:hover:bg-slate-700/60"
          aria-label="Increase item count"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
function LevelTabs({
  levels,
  selectedLevelId,
  completeList,
  onSelect,
}: {
  levels: HideoutLevelDetail[];
  selectedLevelId: string;
  completeList: string[];
  onSelect: (levelId: string) => void;
}) {
  return (
    <div className="grid w-full grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-muted p-2 shadow-lg dark:border-slate-700 dark:shadow-slate-900/40 sm:grid-cols-3 lg:grid-cols-6">
      {levels.map((level, index) => {
        const isSelected = level.id === selectedLevelId;
        const isComplete = completeList.includes(level.id);
        const activeGradient = LEVEL_GRADIENTS[index % LEVEL_GRADIENTS.length];

        return (
          <button
            key={level.id}
            type="button"
            onClick={() => onSelect(level.id)}
            className={`relative flex items-center justify-center gap-2 overflow-hidden rounded-lg px-4 py-3 text-sm font-semibold transition ${
              isSelected
                ? `bg-linear-to-r ${activeGradient} text-white shadow-lg`
                : "text-slate-600 hover:bg-white/70 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-700/50 dark:hover:text-slate-200"
            }`}
          >
            {isComplete ? (
              <CheckCircle2 className="relative z-10 h-4 w-4" />
            ) : (
              <Circle className="relative z-10 h-4 w-4" />
            )}
            <span className="relative z-10">LV {level.hideout_level}</span>
          </button>
        );
      })}
    </div>
  );
}

function RequirementItemCard({
  item,
  locale,
}: {
  item: HideoutRequirementItem;
  locale: Locale;
}) {
  return (
    <div className="relative rounded-lg border border-gray-100 bg-gray-50 p-3 text-center shadow-sm dark:border-slate-700/40 dark:bg-[#171b21]">
      <div className="flex flex-col items-center gap-2">
        <Link
          href={`/item/info/${item.normalized_name}`}
          target="_blank"
          rel="noreferrer"
          className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md"
        >
          <Image
            src={item.image}
            alt={getLocalizedName(item, locale)}
            fill
            sizes="64px"
            className="object-contain p-1"
          />
          {item.in_raid ? (
            <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white shadow">
              <Check className="h-3.5 w-3.5" />
            </span>
          ) : null}
        </Link>
        <div className="min-w-0">
          <Link
            href={`/item/info/${item.normalized_name}`}
            target="_blank"
            rel="noreferrer"
            className="line-clamp-2 text-sm font-semibold text-gray-900 hover:text-orange-600 dark:text-white dark:hover:text-orange-300"
          >
            {getLocalizedName(item, locale)}
          </Link>
          <div className="mt-1 flex flex-col items-center gap-0.5 text-xs font-semibold text-gray-700 dark:text-gray-100">
            <span>x {item.quantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SimpleRequirementList({
  title,
  entries,
  renderEntry,
}: {
  title: string;
  entries: Array<
    HideoutRequirementTrader | HideoutRequirementStation | HideoutRequirementSkill | HideoutBonus
  >;
  renderEntry: (
    entry: HideoutRequirementTrader | HideoutRequirementStation | HideoutRequirementSkill | HideoutBonus,
    index: number,
  ) => React.ReactNode;
}) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <section>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
        {title}
      </h3>
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">{entries.map(renderEntry)}</div>
    </section>
  );
}

function CraftCard({ craft, locale }: { craft: HideoutCraft; locale: Locale }) {
  return (
    <details className="group rounded-lg border border-gray-100 bg-gray-50 dark:border-slate-700/40 dark:bg-[#171b21]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-foreground">
        <span className="text-left font-semibold">{getLocalizedName(craft, locale)} 제작</span>
        <span className="shrink-0 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600 dark:border-slate-700/50 dark:bg-[#20252d] dark:text-gray-300">
          {formatSecondsToDuration(craft.duration)}
        </span>
      </summary>
      <div className="grid gap-4 border-t border-gray-100 px-4 pb-4 pt-3 dark:border-slate-700/40 md:grid-cols-2">
        <div>
          <h4 className="mb-2 text-sm font-semibold text-foreground">재료</h4>
          <div className="space-y-1">
            {craft.require_items.map((item) => (
              <Link
                key={item.id}
                href={`/item/info/${item.normalized_name}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-md px-2 py-2 text-sm hover:bg-white/70 dark:hover:bg-slate-700/50"
              >
                <span className="relative h-12 w-12 shrink-0">
                  <Image
                    src={item.image}
                    alt={getLocalizedName(item, locale)}
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </span>
                <span className="min-w-0 flex-1 truncate">{getLocalizedName(item, locale)}</span>
                <span className="shrink-0 text-muted-foreground">x{item.quantity}</span>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold text-foreground">결과</h4>
          <Link
            href={`/item/info/${craft.normalized_name}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-md bg-white/70 p-3 hover:bg-white dark:bg-slate-900/30 dark:hover:bg-slate-800"
          >
            <span className="relative h-14 w-14 shrink-0">
              <Image
                src={craft.image}
                alt={getLocalizedName(craft, locale)}
                fill
                sizes="56px"
                className="object-contain"
              />
            </span>
            <span className="min-w-0">
              <span className="line-clamp-2 text-sm font-semibold">
                {getLocalizedName(craft, locale)}
              </span>
              <span className="text-xs text-muted-foreground">x{craft.reward_quantity}</span>
            </span>
          </Link>
        </div>
      </div>
    </details>
  );
}

function LevelPanel({
  master,
  level,
  locale,
  completeList,
  onBuild,
  onDestroy,
}: {
  master: HideoutStationSummary;
  level: HideoutLevelDetail;
  locale: Locale;
  completeList: string[];
  onBuild: () => void;
  onDestroy: () => void;
}) {
  const isComplete = completeList.includes(level.id);
  const levelColor = getLevelColor(level.hideout_level);

  return (
    <section className="rounded-lg border border-gray-100 bg-white shadow-sm dark:border-slate-700/40 dark:bg-gray-800/30">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-5 py-4 dark:border-slate-700/40">
        <div className="flex items-center gap-3">
          <div className="text-3xl">
            <StationIcon stationId={master.id} color={levelColor} size={60} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-yellow-500">
              {getLocalizedName(master, locale)}
            </h2>
            <p className="text-foreground">LV {level.hideout_level}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onBuild}
            disabled={isComplete}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-green-600 px-3 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-[#313946] dark:disabled:text-gray-400"
          >
            <Check className="h-4 w-4" />
            건설
          </button>
          <button
            type="button"
            onClick={onDestroy}
            disabled={!isComplete}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-red-600 px-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 dark:disabled:bg-[#313946] dark:disabled:text-gray-400"
          >
            <RotateCcw className="h-4 w-4" />
            파괴
          </button>
        </div>
      </div>

      <div className="space-y-6 p-5">
        <section>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
            <Clock3 className="h-5 w-5 text-yellow-500" />
            건설시간
          </h3>
          <span className="font-semibold text-foreground">
            {formatSecondsToDuration(level.construction_time)}
          </span>
        </section>

        <section>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
            <Package className="h-5 w-5 text-yellow-500" />
            요구사항
          </h3>
          <div className="space-y-5">
            <SimpleRequirementList
              title="Trader"
              entries={level.trader_require}
              renderEntry={(entry, index) => {
                const trader = entry as HideoutRequirementTrader;
                return (
                  <div
                    key={`${trader.id}-${index}`}
                    className="rounded-lg bg-muted p-3 text-center"
                  >
                    {trader.image ? (
                      <div className="relative mx-auto mb-2 h-14 w-14">
                        <Image
                          src={trader.image}
                          alt={getLocalizedName(trader, locale)}
                          fill
                          sizes="56px"
                          className="rounded object-contain"
                        />
                      </div>
                    ) : null}
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {getLocalizedName(trader, locale)}
                    </p>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">
                      LV {trader.trader_level}
                    </p>
                  </div>
                );
              }}
            />
            <SimpleRequirementList
              title="Station"
              entries={level.station_require}
              renderEntry={(entry, index) => {
                const station = entry as HideoutRequirementStation;
                return (
                  <div
                    key={`${station.id}-${index}`}
                    className="rounded-lg bg-muted p-3 text-center"
                  >
                    <div className="mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded">
                      <StationIcon
                        stationId={station.require_master_id}
                        color={getLevelColor(station.station_level)}
                        size={58}
                      />
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {getLocalizedName(station, locale)}
                    </p>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">
                      LV {station.station_level}
                    </p>
                  </div>
                );
              }}
            />
            <SimpleRequirementList
              title="Skill"
              entries={level.skill_require}
              renderEntry={(entry, index) => {
                const skill = entry as HideoutRequirementSkill;
                return (
                  <div
                    key={`${skill.id}-${index}`}
                    className="rounded-lg bg-muted p-3 text-center"
                  >
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {getLocalizedName(skill, locale)}
                    </p>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white">
                      LV {skill.skill_level}
                    </p>
                  </div>
                );
              }}
            />
            {level.item_require.length > 0 ? (
              <section>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Item
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
                {level.item_require.map((item) => (
                  <RequirementItemCard
                    key={item.id}
                    item={item}
                    locale={locale}
                  />
                ))}
                </div>
              </section>
            ) : null}
          </div>
        </section>

        {level.bonus.length > 0 ? (
          <section>
            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">
              보너스
            </h3>
            <div className="flex flex-wrap gap-2">
              {level.bonus.map((bonus) => (
                <span
                  key={bonus.id}
                  className="inline-flex min-h-9 items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm text-amber-900 shadow-sm dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-100"
                >
                  <span className="font-semibold">{getLocalizedName(bonus, locale)}</span>
                  <span className="text-xs text-amber-700 dark:text-amber-200/80">
                    {bonus.bonus_type}
                    {bonus.bonus_value !== null ? ` ${bonus.bonus_value}` : ""}
                  </span>
                </span>
              ))}
            </div>
          </section>
        ) : null}

        {level.crafts.length > 0 ? (
          <section>
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
              <Wrench className="h-5 w-5 text-yellow-500" />
              제작
            </h3>
            <div className="space-y-2">
              {level.crafts.map((craft) => (
                <CraftCard key={craft.id} craft={craft} locale={locale} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </section>
  );
}

export function HideoutPage({
  selectedStation,
  stations,
  userHideout,
  hideout,
  locale,
}: {
  selectedStation: string;
  stations: HideoutStationSummary[];
  userHideout: HideoutUserState | null;
  hideout: HideoutDetailResponse;
  locale: Locale;
}) {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;
  const masterName = getLocalizedName(hideout.master, locale);
  const [completeList, setCompleteList] = useState<string[]>(
    userHideout?.complete_list ?? [],
  );
  const [userItemList, setUserItemList] = useState<HideoutUserItem[]>(
    userHideout?.item_list ?? [],
  );
  const [selectedLevelId, setSelectedLevelId] = useState(() =>
    getNextLevelId(hideout.levels, userHideout?.complete_list ?? []),
  );
  const [stationTab, setStationTab] = useState<"station" | "items">("station");
  const [notice, setNotice] = useState("");
  const [isSavingStation, setIsSavingStation] = useState(false);
  const [isSavingItems, setIsSavingItems] = useState(false);
  const [isLoadingUserState, setIsLoadingUserState] = useState(false);

  useEffect(() => {
    const nextLevelId = getNextLevelId(hideout.levels, completeList);
    setSelectedLevelId(nextLevelId);
    setStationTab("station");
  }, [hideout.master.id]);

  useEffect(() => {
    let isMounted = true;

    if (!accessToken) {
      return () => {
        isMounted = false;
      };
    }

    setIsLoadingUserState(true);
    getUserHideoutStations(accessToken)
      .then((response) => {
        if (!isMounted) return;
        const nextUserHideout = response.user_hideout;
        setCompleteList(nextUserHideout?.complete_list ?? []);
        setUserItemList(nextUserHideout?.item_list ?? []);
        setSelectedLevelId(getNextLevelId(hideout.levels, nextUserHideout?.complete_list ?? []));
      })
      .catch(() => {
        if (isMounted) {
          setNotice("은신처 진행 정보를 불러오지 못했습니다.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingUserState(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [accessToken, hideout.levels]);

  const selectedLevel = useMemo(
    () => hideout.levels.find((level) => level.id === selectedLevelId) ?? hideout.levels[0],
    [hideout.levels, selectedLevelId],
  );

  const stationCompleteCount = hideout.levels.filter((level) =>
    completeList.includes(level.id),
  ).length;

  const userItemMap = useMemo(() => {
    const map = new Map<string, number>();

    for (const item of userItemList) {
      map.set(getItemKey(item.id, item.found_in_raid), item.count);
    }

    return map;
  }, [userItemList]);

  const itemRequirements = useMemo(() => {
    const itemMap = new Map<string, HideoutRequirementItem>();

    for (const level of hideout.levels) {
      for (const item of level.item_require) {
        const key = getItemKey(item.item_id, item.in_raid);
        const existing = itemMap.get(key);

        if (existing) {
          itemMap.set(key, {
            ...existing,
            quantity: existing.quantity + item.quantity,
          });
          continue;
        }

        itemMap.set(key, item);
      }
    }

    return [...itemMap.values()];
  }, [hideout.levels]);

  const persistCompleteList = async (nextCompleteList: string[]) => {
    if (!accessToken) {
      setNotice("로그인 후 은신처 진행 상태를 저장할 수 있습니다.");
      return false;
    }

    setIsSavingStation(true);
    setNotice("");

    try {
      const response = await saveHideoutStations(nextCompleteList, accessToken);
      const nextUserHideout = response.user_hideout;
      setCompleteList(nextUserHideout?.complete_list ?? nextCompleteList);
      setUserItemList(nextUserHideout?.item_list ?? userItemList);
      setNotice("은신처 진행 상태를 저장했습니다.");
      return true;
    } catch {
      setNotice("저장에 실패했습니다. 다시 로그인한 뒤 시도해 주세요.");
      return false;
    } finally {
      setIsSavingStation(false);
    }
  };

  const handleBuild = async () => {
    if (!selectedLevel) return;

    const levelIds = hideout.levels.map((level) => level.id);
    const selectedIndex = levelIds.indexOf(selectedLevel.id);
    const nextSet = new Set(completeList);

    levelIds.slice(0, selectedIndex + 1).forEach((levelId) => nextSet.add(levelId));
    const didSave = await persistCompleteList([...nextSet]);

    const nextLevel = hideout.levels[selectedIndex + 1];
    if (didSave && nextLevel) {
      setSelectedLevelId(nextLevel.id);
    }
  };

  const handleDestroy = async () => {
    if (!selectedLevel) return;

    const levelIds = hideout.levels.map((level) => level.id);
    const selectedIndex = levelIds.indexOf(selectedLevel.id);
    const removeSet = new Set(levelIds.slice(selectedIndex));
    const nextCompleteList = completeList.filter((levelId) => !removeSet.has(levelId));

    const didSave = await persistCompleteList(nextCompleteList);

    const prevLevel = hideout.levels[Math.max(0, selectedIndex - 1)];
    if (didSave && prevLevel) {
      setSelectedLevelId(prevLevel.id);
    }
  };

  const updateUserItem = (
    item: HideoutRequirementItem,
    updater: (current: number) => number,
  ) => {
    setUserItemList((prev) => {
      const current = prev.find(
        (entry) => entry.id === item.item_id && entry.found_in_raid === item.in_raid,
      );
      const nextCount = Math.min(
        MAX_ITEM_COUNT,
        Math.max(0, updater(current?.count ?? 0)),
      );

      if (nextCount === 0) {
        return prev.filter(
          (entry) => !(entry.id === item.item_id && entry.found_in_raid === item.in_raid),
        );
      }

      if (current) {
        return prev.map((entry) =>
          entry.id === item.item_id && entry.found_in_raid === item.in_raid
            ? { ...entry, count: nextCount }
            : entry,
        );
      }

      return [
        { id: item.item_id, count: nextCount, found_in_raid: item.in_raid },
        ...prev,
      ];
    });
  };

  const handleSaveItems = async () => {
    if (!accessToken) {
      setNotice("로그인 후 보유 재료를 저장할 수 있습니다.");
      return;
    }

    setIsSavingItems(true);
    setNotice("");

    try {
      const response = await saveHideoutStationItems(userItemList, accessToken);
      const nextUserHideout = response.user_hideout;
      setCompleteList(nextUserHideout?.complete_list ?? completeList);
      setUserItemList(nextUserHideout?.item_list ?? userItemList);
      setNotice("보유 재료를 저장했습니다.");
    } catch {
      setNotice("재료 저장에 실패했습니다. 다시 로그인한 뒤 시도해 주세요.");
    } finally {
      setIsSavingItems(false);
    }
  };

  const handleResetItems = () => {
    setUserItemList([]);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-gray-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">은신처</h1>
        </div>

        <section className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-700/40 dark:bg-gray-800/30">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted">
                <StationIcon
                  stationId={hideout.master.id}
                  color={
                    stationCompleteCount > 0
                      ? getLevelColor(stationCompleteCount)
                      : STATION_ICON_COLOR
                  }
                  size={58}
                />
              </span>
              <div>
                <p className="text-left text-xs font-semibold uppercase tracking-[0.22em] text-yellow-500">
                  Hideout
                </p>
                <h2 className="mt-1 text-left text-2xl font-bold text-yellow-500 sm:text-3xl">
                  {masterName}
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <span>
                    Lv.{stationCompleteCount} / {hideout.levels.length}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                  <span>
                    {status === "authenticated" ? "계정 동기화 중" : "저장은 로그인 필요"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleSaveItems}
                disabled={isSavingItems}
                className="inline-flex h-10 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition hover:border-orange-300 hover:text-orange-600 disabled:opacity-60 dark:border-[#313946] dark:bg-[#171b21] dark:text-gray-200 dark:hover:border-orange-500"
              >
                <Save className="h-4 w-4" />
                {isSavingItems ? "저장 중" : "재료 저장"}
              </button>
              <button
                type="button"
                onClick={handleResetItems}
                className="inline-flex h-10 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 transition hover:border-red-300 hover:text-red-600 dark:border-[#313946] dark:bg-[#171b21] dark:text-gray-200 dark:hover:border-red-400"
              >
                <RotateCcw className="h-4 w-4" />
                재료 초기화
              </button>
            </div>
          </div>

          {(notice || isLoadingUserState || isSavingStation) ? (
            <div className="mt-4 rounded-md border border-orange-200 bg-orange-50 px-3 py-2 text-sm text-orange-800 dark:border-orange-500/30 dark:bg-orange-500/15 dark:text-orange-100">
              {isLoadingUserState
                ? "은신처 진행 정보를 불러오는 중입니다."
                : isSavingStation
                  ? "은신처 진행 상태를 저장하는 중입니다."
                  : notice}
            </div>
          ) : null}
        </section>

        <section>
            <StationSelector
              selectedStation={selectedStation}
              stations={stations}
              completeList={completeList}
              tabState={stationTab}
              onTabChange={setStationTab}
              itemRequirements={itemRequirements}
              userItemMap={userItemMap}
              locale={locale}
              onIncreaseItem={(item) => updateUserItem(item, (current) => current + 1)}
              onDecreaseItem={(item) => updateUserItem(item, (current) => current - 1)}
              onChangeItem={(item, count) => updateUserItem(item, () => count)}
            />
        </section>

        <section className="space-y-4 rounded-lg border border-gray-100 bg-white p-5 shadow-sm dark:border-slate-700/40 dark:bg-gray-800/30">
            <LevelTabs
              levels={hideout.levels}
              selectedLevelId={selectedLevel?.id ?? ""}
              completeList={completeList}
              onSelect={setSelectedLevelId}
            />

            {selectedLevel ? (
              <LevelPanel
                master={hideout.master}
                level={selectedLevel}
                locale={locale}
                completeList={completeList}
                onBuild={handleBuild}
                onDestroy={handleDestroy}
              />
            ) : null}
        </section>
      </div>
    </main>
  );
}
