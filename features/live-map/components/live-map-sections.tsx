import type React from "react";
import { useEffect, useMemo, useRef } from "react";
import {
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  Flag,
  Search,
} from "lucide-react";

import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/class-name";

import { copyByLocale, KAPPA_IMAGE, type LiveMapCopy } from "./live-map-copy";
import {
  getEntryLabel,
  getStaticCategoryLabel,
  getStaticFaction,
  getStaticFactionLabel,
  matchesFilterText,
  type RightEntry,
  type StaticCategoryGroup,
  type StaticEntry,
} from "./live-map-data-utils";

function getEntryMapLabel(entry: RightEntry, locale: Locale) {
  if (!("event_info" in entry.point) || !entry.point.map) {
    return "";
  }

  switch (locale) {
    case "en":
      return entry.point.map.name_en ?? entry.point.map.name_ko ?? "";
    case "ja":
      return entry.point.map.name_ja ?? entry.point.map.name_en ?? "";
    case "ko":
    default:
      return entry.point.map.name_ko ?? entry.point.map.name_en ?? "";
  }
}

const compactStaticCategories = new Set([
  "black_div_spawn",
  "bloodhounds_spawn",
  "cultist_spawn",
  "goons_spawn",
  "pmc_spawn",
  "raider_spawn",
  "rogue_spawn",
  "scav_spawn",
  "sniper_spawn",
]);

export function RightSection<TEntry extends RightEntry>({
  allLabel,
  completedQuestIds,
  emptyLabel,
  enabledIds,
  items,
  isOpen,
  kind,
  locale,
  onOpen,
  onSearchQueryChange,
  onToggle,
  onToggleAll,
  onToggleComplete,
  onToggleOpen,
  searchQuery,
  selectedId,
  title,
}: {
  allLabel: string;
  completedQuestIds: string[];
  emptyLabel: string;
  enabledIds: Set<string>;
  items: TEntry[];
  isOpen: boolean;
  kind: "quest" | "story" | "event" | "static";
  locale: Locale;
  onOpen: (entry: TEntry) => void;
  onSearchQueryChange: (query: string) => void;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onToggleComplete?: (id: string) => void;
  onToggleOpen: () => void;
  searchQuery: string;
  selectedId: string | null;
  title: string;
}) {
  const filteredItems = useMemo(
    () => items.filter((entry) => matchesFilterText(
      [getEntryLabel(entry, locale), getEntryMapLabel(entry, locale)].join(" "),
      searchQuery,
    )),
    [items, locale, searchQuery],
  );
  const enabledCount = items.filter((entry) => enabledIds.has(entry.id)).length;

  return (
    <section className="border-b border-gray-200 p-3 last:border-b-0 dark:border-[#3a3d41]">
      <div className="mb-2 grid h-9 grid-cols-[1fr_auto] items-center rounded-md bg-gray-100 dark:bg-[#2a2d31]">
        <button
          type="button"
          onClick={onToggleOpen}
          className="flex h-9 min-w-0 items-center gap-2 rounded-l px-2 text-left hover:bg-gray-200 dark:hover:bg-[#3a3d41]"
        >
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 shrink-0 text-orange-500 transition-transform",
              isOpen ? "rotate-180" : "-rotate-90",
            )}
          />
          <h2 className="min-w-0 flex-1 truncate text-sm font-black text-gray-900 dark:text-white">
            {title}
          </h2>
          <span className="text-[11px] font-bold text-gray-500 dark:text-gray-300">
            {enabledCount}/{items.length}
          </span>
        </button>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onToggleAll}
            className="mr-1 h-6 rounded px-2 text-xs font-bold text-orange-500 hover:bg-white dark:hover:bg-[#3a3d41]"
          >
            {allLabel}
          </button>
        </div>
      </div>
      {isOpen ? (
        <>
          {items.length > 0 ? (
            <div className="relative mb-2">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(event) => onSearchQueryChange(event.currentTarget.value)}
                placeholder={`${title} ${copyByLocale[locale].searchFilter}`}
                className="h-8 w-full rounded-md border border-gray-200 bg-gray-50 pl-8 pr-2 text-xs font-medium text-gray-700 outline-none transition placeholder:text-gray-400 hover:bg-white focus:border-orange-400 dark:border-[#3a3d41] dark:bg-[#15171a] dark:text-gray-100 dark:hover:bg-[#20242b]"
              />
            </div>
          ) : null}
          {filteredItems.length > 0 ? (
            <div className="space-y-0.5">
              {filteredItems.map((entry) => {
                const isSelected = selectedId === entry.id;
                const enabled = enabledIds.has(entry.id);
                const label = getEntryLabel(entry, locale);
                const mapLabel = kind === "event" ? getEntryMapLabel(entry, locale) : "";
                const completed = kind === "quest" && completedQuestIds.includes(entry.id);
                const isKappaQuest =
                  "quest_info" in entry.point && !!entry.point.quest_info?.quest?.kappa_required;

                return (
                  <div
                    key={entry.id}
                    className={cn(
                      "grid h-8 grid-cols-[32px_1fr_48px] items-center rounded-md text-xs",
                      isSelected ? "bg-gray-100 dark:bg-[#2a2d31]" : "",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (kind === "quest") {
                          onToggleComplete?.(entry.id);
                        } else {
                          onOpen(entry);
                        }
                      }}
                      className="flex h-8 items-center justify-center rounded-l hover:bg-gray-200 dark:hover:bg-[#3a3d41]"
                      aria-label={label}
                    >
                      {kind === "quest" ? (
                        <span
                          className={cn(
                            "flex h-4 w-4 items-center justify-center rounded-full",
                            completed ? "bg-emerald-500 text-white" : "bg-orange-500",
                          )}
                        >
                          {completed ? <Check className="h-3 w-3" /> : null}
                        </span>
                      ) : (
                        <EntryIcon kind={kind} />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpen(entry)}
                      className="flex h-8 min-w-0 items-center gap-1 rounded px-1 text-left hover:bg-gray-100 dark:hover:bg-[#2a2d31]"
                    >
                      <span
                        className={cn(
                          "min-w-0 flex-1 truncate font-medium text-gray-700 dark:text-gray-100",
                          isSelected ? "font-black text-orange-500" : "",
                        )}
                      >
                        {label}
                      </span>
                      {isKappaQuest ? <KappaBadge /> : null}
                      {mapLabel ? (
                        <span className="max-w-20 shrink-0 truncate rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-bold text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
                          {mapLabel}
                        </span>
                      ) : null}
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggle(entry.id)}
                      className="flex h-8 items-center justify-center rounded-r hover:bg-gray-200 dark:hover:bg-[#3a3d41]"
                      aria-label={label}
                    >
                      <TogglePill enabled={enabled} />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="px-2 py-3 text-xs text-gray-500 dark:text-gray-400">{emptyLabel}</p>
          )}
        </>
      ) : null}
    </section>
  );
}

export function StaticPointSection({
  allLabel,
  copy,
  emptyLabel,
  enabledIds,
  expandedCategories,
  groups,
  locale,
  onOpen,
  onSearchQueryChange,
  onToggle,
  onToggleAll,
  onToggleCategory,
  onToggleCategoryOpen,
  onSetCategoriesOpen,
  searchQuery,
  selectedId,
  title,
}: {
  allLabel: string;
  copy: LiveMapCopy;
  emptyLabel: string;
  enabledIds: Set<string>;
  expandedCategories: Set<string>;
  groups: StaticCategoryGroup[];
  locale: Locale;
  onOpen: (entry: StaticEntry) => void;
  onSearchQueryChange: (query: string) => void;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onToggleCategory: (category: string, ids: string[]) => void;
  onToggleCategoryOpen: (category: string) => void;
  onSetCategoriesOpen: (categories: string[], open: boolean) => void;
  searchQuery: string;
  selectedId: string | null;
  title: string;
}) {
  const totalCount = groups.reduce((sum, group) => sum + group.entries.length, 0);
  const filteredGroups = useMemo(
    () => groups
      .map((group) => {
        const categoryLabel = getStaticCategoryLabel(group.category, copy);
        const isCategoryMatch = matchesFilterText(categoryLabel, searchQuery);
        const entries = isCategoryMatch
          ? group.entries
          : group.entries.filter((entry) => matchesFilterText(getEntryLabel(entry, locale), searchQuery));

        return { ...group, entries };
      })
      .filter((group) => group.entries.length > 0),
    [copy, groups, locale, searchQuery],
  );
  const hasQuery = searchQuery.trim().length > 0;
  const expandableCategories = groups
    .filter((group) => !compactStaticCategories.has(group.category))
    .map((group) => group.category);
  const areAllCategoriesOpen =
    expandableCategories.length > 0 &&
    expandableCategories.every((category) => expandedCategories.has(category));
  const selectedItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    selectedItemRef.current?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
    });
  }, [selectedId]);

  return (
    <section className="border-b border-gray-200 p-3 last:border-b-0 dark:border-[#3a3d41]">
      <div className="mb-2 flex h-9 items-center justify-between gap-2 rounded-md bg-gray-100 px-2 dark:bg-[#2a2d31]">
        <h2 className="text-sm font-black text-gray-900 dark:text-white">
          {title}
          <span className="ml-1 text-xs font-bold text-gray-500 dark:text-gray-300">
            {totalCount}
          </span>
        </h2>
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            disabled={expandableCategories.length === 0}
            aria-label={areAllCategoriesOpen ? copy.collapseAllCategories : copy.expandAllCategories}
            title={areAllCategoriesOpen ? copy.collapseAllCategories : copy.expandAllCategories}
            onClick={() => onSetCategoriesOpen(expandableCategories, !areAllCategoriesOpen)}
            className="inline-flex h-6 items-center justify-center rounded px-2 text-xs font-bold text-orange-500 transition hover:bg-white hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40 dark:text-orange-400 dark:hover:bg-[#3a3d41] dark:hover:text-orange-300"
          >
            {areAllCategoriesOpen ? copy.collapseAllCategories : copy.expandAllCategories}
          </button>
          <button
            type="button"
            onClick={onToggleAll}
            className="h-6 rounded px-2 text-xs font-bold text-orange-500 hover:bg-white dark:hover:bg-[#3a3d41]"
          >
            {allLabel}
          </button>
        </div>
      </div>
      {groups.length > 0 ? (
        <div className="relative mb-2">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          <input
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.currentTarget.value)}
            placeholder={`${title} ${copy.searchFilter}`}
            className="h-8 w-full rounded-md border border-gray-200 bg-gray-50 pl-8 pr-2 text-xs font-medium text-gray-700 outline-none transition placeholder:text-gray-400 hover:bg-white focus:border-orange-400 dark:border-[#3a3d41] dark:bg-[#15171a] dark:text-gray-100 dark:hover:bg-[#20242b]"
          />
        </div>
      ) : null}
      {filteredGroups.length > 0 ? (
        <div className="space-y-1.5">
          {filteredGroups.map((group) => {
            const ids = group.entries.map((entry) => entry.id);
            const isCompactCategory = compactStaticCategories.has(group.category);
            const isOpen = !isCompactCategory && (hasQuery || expandedCategories.has(group.category));
            const enabledCount = ids.filter((id) => enabledIds.has(id)).length;
            const isCategoryEnabled = enabledCount === ids.length;
            const hasSelectedEntry = group.entries.some((entry) => entry.id === selectedId);

            return (
              <div
                key={group.category}
                className={cn(
                  "rounded-md border border-gray-200 bg-gray-50/80 dark:border-[#3a3d41] dark:bg-[#15171a]",
                  isCompactCategory && hasSelectedEntry
                    ? "border-orange-300 bg-orange-50 dark:border-orange-500/40 dark:bg-orange-500/10"
                    : "",
                )}
              >
                <div className="grid h-8 grid-cols-[1fr_42px] items-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (!isCompactCategory) {
                        onToggleCategoryOpen(group.category);
                      }
                    }}
                    className={cn(
                      "flex h-8 min-w-0 items-center gap-2 rounded-l px-2 text-left",
                      isCompactCategory
                        ? "cursor-default"
                        : "hover:bg-gray-100 dark:hover:bg-[#2a2d31]",
                    )}
                  >
                    {isCompactCategory ? (
                      <span className="h-3.5 w-3.5 shrink-0" />
                    ) : (
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 text-orange-500 transition-transform",
                          isOpen ? "rotate-180" : "-rotate-90",
                        )}
                      />
                    )}
                    {group.category !== "extract" ? (
                      <StaticPanelMarkerIcon category={group.category} />
                    ) : null}
                    <span className="min-w-0 flex-1 truncate text-xs font-black text-gray-800 dark:text-gray-100">
                      {getStaticCategoryLabel(group.category, copy)}
                    </span>
                    <span className="text-[11px] font-bold text-gray-500 dark:text-gray-300">
                      {enabledCount}/{ids.length}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleCategory(group.category, ids)}
                    className="flex h-8 items-center justify-center rounded-r hover:bg-gray-100 dark:hover:bg-[#2a2d31]"
                    aria-label={`${getStaticCategoryLabel(group.category, copy)} ${copy.staticCategoryAll}`}
                  >
                    <TogglePill enabled={isCategoryEnabled} />
                  </button>
                </div>
                {isOpen ? (
                  <div className="border-t border-gray-200 p-1 dark:border-[#3a3d41]">
                    {group.category === "extract" ? (
                      <ExtractFactionGroups
                        copy={copy}
                        enabledIds={enabledIds}
                        entries={group.entries}
                        locale={locale}
                        onOpen={onOpen}
                        onToggle={onToggle}
                        onToggleFaction={(faction, factionIds) =>
                          onToggleCategory(`${group.category}:${faction}`, factionIds)
                        }
                        selectedId={selectedId}
                        selectedItemRef={selectedItemRef}
                      />
                    ) : (
                      group.entries.map((entry) => (
                        <StaticEntryRow
                          enabled={enabledIds.has(entry.id)}
                          entry={entry}
                          isSelected={selectedId === entry.id}
                          key={entry.id}
                          locale={locale}
                          onOpen={onOpen}
                          onToggle={onToggle}
                          selectedItemRef={selectedItemRef}
                        />
                      ))
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="px-2 py-3 text-xs text-gray-500 dark:text-gray-400">{emptyLabel}</p>
      )}
    </section>
  );
}

function ExtractFactionGroups({
  copy,
  enabledIds,
  entries,
  locale,
  onOpen,
  onToggle,
  onToggleFaction,
  selectedId,
  selectedItemRef,
}: {
  copy: LiveMapCopy;
  enabledIds: Set<string>;
  entries: StaticEntry[];
  locale: Locale;
  onOpen: (entry: StaticEntry) => void;
  onToggle: (id: string) => void;
  onToggleFaction: (faction: string, ids: string[]) => void;
  selectedId: string | null;
  selectedItemRef: React.RefObject<HTMLDivElement | null>;
}) {
  const groups = useMemo(() => {
    const groupMap = new Map<string, StaticEntry[]>();

    entries.forEach((entry) => {
      const faction = getStaticFaction(entry.point);
      groupMap.set(faction, [...(groupMap.get(faction) ?? []), entry]);
    });

    const order = ["pmc", "scav", "shared", "unknown"];

    return Array.from(groupMap.entries())
      .map(([faction, factionEntries]) => ({
        entries: factionEntries,
        faction,
      }))
      .sort((left, right) => {
        const leftIndex = order.indexOf(left.faction);
        const rightIndex = order.indexOf(right.faction);

        if (leftIndex !== -1 || rightIndex !== -1) {
          return (leftIndex === -1 ? order.length : leftIndex) -
            (rightIndex === -1 ? order.length : rightIndex);
        }

        return left.faction.localeCompare(right.faction);
      });
  }, [entries]);

  return (
    <div className="space-y-1">
      {groups.map((group) => {
        const ids = group.entries.map((entry) => entry.id);
        const enabledCount = ids.filter((id) => enabledIds.has(id)).length;
        const isEnabled = enabledCount === ids.length;

        return (
          <div
            key={group.faction}
            className="rounded border border-gray-200 bg-white/70 dark:border-[#2f343a] dark:bg-[#1b1e22]"
          >
            <div className="grid h-7 grid-cols-[1fr_42px] items-center">
              <div className="flex min-w-0 items-center gap-1.5 px-2">
                <StaticPanelMarkerIcon category="extract" faction={group.faction} size="sm" />
                <span className="min-w-0 flex-1 truncate text-[11px] font-black text-gray-700 dark:text-gray-100">
                  {getStaticFactionLabel(group.faction, copy)}
                </span>
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-300">
                  {enabledCount}/{ids.length}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onToggleFaction(group.faction, ids)}
                className="flex h-7 items-center justify-center rounded-r hover:bg-gray-100 dark:hover:bg-[#2a2d31]"
                aria-label={getStaticFactionLabel(group.faction, copy)}
              >
                <TogglePill enabled={isEnabled} />
              </button>
            </div>
            <div className="border-t border-gray-200 p-1 dark:border-[#2f343a]">
              {group.entries.map((entry) => (
                <StaticEntryRow
                  enabled={enabledIds.has(entry.id)}
                  entry={entry}
                  isSelected={selectedId === entry.id}
                  key={entry.id}
                  locale={locale}
                  onOpen={onOpen}
                  onToggle={onToggle}
                  selectedItemRef={selectedItemRef}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StaticEntryRow({
  enabled,
  entry,
  isSelected,
  locale,
  onOpen,
  onToggle,
  selectedItemRef,
}: {
  enabled: boolean;
  entry: StaticEntry;
  isSelected: boolean;
  locale: Locale;
  onOpen: (entry: StaticEntry) => void;
  onToggle: (id: string) => void;
  selectedItemRef: React.RefObject<HTMLDivElement | null>;
}) {
  const label = getEntryLabel(entry, locale);

  return (
    <div
      ref={isSelected ? selectedItemRef : null}
      className={cn(
        "grid h-8 grid-cols-[1fr_42px] items-center overflow-hidden rounded border border-transparent text-xs",
        isSelected
          ? "border-orange-300 bg-orange-50 hover:bg-orange-50 dark:border-orange-500/40 dark:bg-orange-500/10 dark:hover:bg-orange-500/10"
          : "",
      )}
    >
      <button
        type="button"
        onClick={() => onOpen(entry)}
        className={cn(
          "flex h-full min-w-0 items-center gap-1.5 rounded-l px-2 text-left",
          isSelected
            ? "hover:bg-transparent"
            : "hover:bg-white dark:hover:bg-[#2a2d31]",
        )}
      >
        <span
          className={cn(
            "min-w-0 truncate font-medium text-gray-700 dark:text-gray-100",
            isSelected ? "font-black text-orange-500" : "",
          )}
        >
          {label}
        </span>
      </button>
      <button
        type="button"
        onClick={() => onToggle(entry.id)}
        className={cn(
          "flex h-full items-center justify-center rounded-r",
          isSelected
            ? "hover:bg-transparent"
            : "hover:bg-white dark:hover:bg-[#2a2d31]",
        )}
        aria-label={label}
      >
        <TogglePill enabled={enabled} />
      </button>
    </div>
  );
}

function TogglePill({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-4 w-8 shrink-0 items-center rounded-full border align-middle",
        enabled
          ? "border-orange-500 bg-orange-500"
          : "border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-[#15171a]",
      )}
    >
      <span
        className={cn(
          "absolute left-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition-transform",
          enabled ? "translate-x-4" : "translate-x-0",
        )}
      />
    </span>
  );
}

function EntryIcon({ kind }: { kind: "story" | "event" | "static" }) {
  const className = "h-4 w-4";

  if (kind === "story") {
    return <BookOpen className={cn(className, "text-violet-500")} />;
  }

  if (kind === "event") {
    return <CalendarDays className={cn(className, "text-blue-500")} />;
  }

  return <Flag className={cn(className, "text-emerald-500")} />;
}

function getStaticIconColor(category: string, faction?: string) {
  if (category === "extract") {
    if (faction === "pmc") {
      return "#38bdf8";
    }

    if (faction === "scav") {
      return "#fb923c";
    }

    if (faction === "shared") {
      return "#c084fc";
    }
  }

  if (category === "transit") {
    return "#f87171";
  }

  if (category === "transit_switch") {
    return "#facc15";
  }

  if (category === "key_spawn") {
    return "#fbbf24";
  }

  if (category === "keycard_spawn") {
    return "#818cf8";
  }

  if (category === "locked_door") {
    return "#fb7185";
  }

  if (category === "locked_container") {
    return "#2dd4bf";
  }

  if (category === "stationary_weapon") {
    return "#94a3b8";
  }

  if (category === "sniper_spawn") {
    return "#22d3ee";
  }

  if (category === "btr_stop") {
    return "#fde047";
  }

  if (category === "black_div_spawn" || category === "bloodhounds_spawn") {
    return "#4ade80";
  }

  if (category === "boss_spawn") {
    return "#f43f5e";
  }

  if (category === "pmc_spawn") {
    return "#60a5fa";
  }

  if (category === "scav_spawn") {
    return "#fb923c";
  }

  if (category === "cultist_spawn") {
    return "#a3e635";
  }

  if (category === "goons_spawn") {
    return "#ef4444";
  }

  if (category === "raider_spawn") {
    return "#22d3ee";
  }

  if (category === "rogue_spawn") {
    return "#64748b";
  }

  return "#34d399";
}

function StaticPanelMarkerIcon({
  category,
  faction,
  size = "md",
}: {
  category: string;
  faction?: string;
  size?: "sm" | "md";
}) {
  const color = getStaticIconColor(category);
  const markerSize = size === "sm" ? 18 : 20;
  const iconSize = size === "sm" ? 13 : 14;

  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full"
      style={{
        background: "linear-gradient(180deg, rgba(30,33,38,0.98), rgba(8,10,13,0.98))",
        boxShadow: `inset 0 0 0 1.5px ${getStaticIconColor(category, faction)}, inset 0 0 0 3px rgba(255,255,255,0.16)`,
        height: markerSize,
        width: markerSize,
      }}
    >
      <span
        aria-hidden="true"
        className="block"
        dangerouslySetInnerHTML={{
          __html: getStaticPanelIconSvg(category, getStaticIconColor(category, faction), iconSize, faction),
        }}
      />
    </span>
  );
}

function getStaticPanelIconSvg(category: string, color: string, size: number, faction?: string) {
  if (category === "transit") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h12" stroke="${color}" stroke-width="3" stroke-linecap="round" />
        <path d="m13 7 5 5-5 5" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    `;
  }

  if (category === "transit_switch") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m13.2 2.8-7 10.4h5.3l-1.2 8 7-10.5h-5.2z" fill="${color}" stroke="${color}" stroke-width="1.1" stroke-linejoin="round" />
      </svg>
    `;
  }

  if (category === "key_spawn") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="7.5" cy="8" r="4" stroke="${color}" stroke-width="2.5" />
        <path d="m10.4 10.9 8.7 8.7M15.1 15.6l2.4-2.4M17.3 17.8l2.2-2.2" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="7.5" cy="8" r="1.2" fill="${color}" />
      </svg>
    `;
  }

  if (category === "keycard_spawn") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="2.8" y="5" width="18.4" height="14" rx="2.4" stroke="${color}" stroke-width="2.2" />
        <path d="M3.8 9h16.4" stroke="${color}" stroke-width="2.2" />
        <rect x="6" y="12" width="5.2" height="3.5" rx=".7" fill="${color}" />
        <path d="M14.2 13h3.8M14.2 15h2.5" stroke="${color}" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    `;
  }

  if (category === "locked_door") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7.2 10V7.7a4.8 4.8 0 0 1 9.6 0V10" stroke="${color}" stroke-width="2.8" stroke-linecap="round" />
        <rect x="4.2" y="9.2" width="15.6" height="11.6" rx="2.3" fill="${color}" />
        <circle cx="12" cy="14.2" r="1.5" fill="#111827" />
        <path d="M12 15.5v2" stroke="#111827" stroke-width="1.8" stroke-linecap="round" />
      </svg>
    `;
  }

  if (category === "locked_container") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 8h18v12H3z" stroke="${color}" stroke-width="2.1" stroke-linejoin="round" />
        <path d="M3 12h18M7 8v12M17 8v12" stroke="${color}" stroke-width="1.5" opacity=".72" />
        <rect x="9" y="11.5" width="6" height="5.5" rx="1.1" fill="${color}" />
        <path d="M10.6 11.5v-1.1a1.4 1.4 0 0 1 2.8 0v1.1" stroke="${color}" stroke-width="1.7" stroke-linecap="round" />
        <circle cx="12" cy="14.2" r=".75" fill="#111827" />
      </svg>
    `;
  }

  if (category === "stationary_weapon") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 40 32" fill="none" aria-hidden="true">
        <rect x="12" y="9" width="26" height="4" rx="1" fill="${color}" />
        <rect x="35" y="8" width="3" height="6" rx=".8" fill="${color}" opacity=".7" />
        <rect x="7" y="8" width="10" height="7" rx="1.5" fill="${color}" opacity=".9" stroke="${color}" stroke-width=".6" />
        <rect x="8" y="7" width="7" height="3" rx="1" fill="${color}" opacity=".6" />
        <path d="m7 9-4-1-1 4 5 1Z" fill="${color}" opacity=".75" />
        <line x1="11" y1="15" x2="5" y2="28" stroke="${color}" stroke-width="2" stroke-linecap="round" />
        <line x1="13" y1="15" x2="20" y2="28" stroke="${color}" stroke-width="2" stroke-linecap="round" />
        <line x1="10" y1="15" x2="10" y2="27" stroke="${color}" stroke-width="1.5" stroke-linecap="round" opacity=".7" />
      </svg>
    `;
  }

  if (category === "sniper_spawn") {
    const reticleColor = "#22d3ee";

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="6.8" stroke="${reticleColor}" stroke-width="2.4" />
        <path d="M12 3.8v4M12 16.2v4M3.8 12h4M16.2 12h4" stroke="${reticleColor}" stroke-width="2.4" stroke-linecap="round" />
        <circle cx="12" cy="12" r="1.8" fill="${reticleColor}" />
      </svg>
    `;
  }

  if (category === "btr_stop") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 64 42" fill="none" aria-hidden="true">
        <path d="M3 30 8 18h48l4 5v7Z" fill="${color}" />
        <path d="M22 18 24 9h18l3 9Z" fill="${color}" />
        <rect x="43" y="12.8" width="19" height="1.8" rx=".6" fill="${color}" />
        <circle cx="12" cy="35" r="5" fill="#111827" stroke="${color}" stroke-width="1" />
        <circle cx="26" cy="35" r="5" fill="#111827" stroke="${color}" stroke-width="1" />
        <circle cx="40" cy="35" r="5" fill="#111827" stroke="${color}" stroke-width="1" />
        <circle cx="54" cy="35" r="5" fill="#111827" stroke="${color}" stroke-width="1" />
      </svg>
    `;
  }

  if (category === "boss_spawn") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3.2c-4.2 0-7.2 2.8-7.2 6.9 0 2.5 1.2 4.6 3.2 5.8v2.3c0 .6.4 1 1 1h6c.6 0 1-.4 1-1v-2.3c2-1.2 3.2-3.3 3.2-5.8 0-4.1-3-6.9-7.2-6.9Z" fill="${color}" />
        <circle cx="9.3" cy="10.7" r="1.7" fill="#111827" />
        <circle cx="14.7" cy="10.7" r="1.7" fill="#111827" />
        <path d="M10 16.2h4M9.7 19.2v1.7M12 19.2v1.7M14.3 19.2v1.7" stroke="${color}" stroke-width="1.7" stroke-linecap="round" />
      </svg>
    `;
  }

  if (category === "pmc_spawn") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6 3.5v18" stroke="${color}" stroke-width="2.6" stroke-linecap="round" />
        <path d="M7 4.5 19 8.7 7 13.4Z" fill="${color}" />
      </svg>
    `;
  }

  if (category === "scav_spawn") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3.1c-4.2 0-6.7 3.2-6.7 7.3 0 2.8 1.1 5.1 2.8 6.5v2.2c0 .6.4 1 1 1h5.8c.6 0 1-.4 1-1v-2.2c1.7-1.4 2.8-3.7 2.8-6.5 0-4.1-2.5-7.3-6.7-7.3Z" fill="${color}" />
        <ellipse cx="9.5" cy="11" rx="1.8" ry="1.35" fill="#111827" />
        <ellipse cx="14.5" cy="11" rx="1.8" ry="1.35" fill="#111827" />
        <path d="M10 15.4q2 1.1 4 0" stroke="#111827" stroke-width="1.4" stroke-linecap="round" />
      </svg>
    `;
  }

  if (category === "cultist_spawn") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 275.411 259.024" aria-hidden="true" style="color:${color};transform:rotate(-90deg) scaleX(-1)">
        <path d="m0 259.024c9.779-1.009 21.603-3.007 34.657-6.928 13.775-4.138 25.257-9.318 34.262-14.121 11.356-7.548 23.254-16.038 35.472-25.572 10.89-8.498 20.905-16.943 30.076-25.163 14.112-13.9 28.224-27.799 42.336-41.699l10.037 10.19c.753.764 1.798 1.19 2.867 1.107.471-.037.977-.101 1.509-.203.88-.169 1.66-.41 2.329-.668.836-.323 1.585-.823 2.223-1.452l5.612-5.527c.738-.727 1.31-1.609 1.632-2.594.222-.678.424-1.446.573-2.294.206-1.178.26-2.241.244-3.133-.007-.395-.176-.77-.454-1.052l-.825-.837c-.453-.46-1.141-.598-1.737-.348l-8.481 3.559-15.832-16.074-.878-2.703 84.445-83.174 3.345 3.396 11.999-11.818-4.07-26.321-26.473-5.594-11.999 11.818 2.453 2.49-83.992 82.728-5.605-1.615-18.132-18.409c-1.077-1.093-2.613-1.603-4.129-1.37l-1.712.263c-1.851.284-3.565 1.144-4.899 2.458l-3.976 3.916c-1.094 1.078-1.891 2.42-2.313 3.897l-1.314 4.596c-.216.756-.012 1.571.536 2.135l.462.476c.59.607 1.473.823 2.275.552 2.35-.794 7.3-2.465 10.095-3.409l3.791 3.849-54.335 53.517c-4.095 4.984-8.405 10.738-12.67 17.289-4.296 6.599-7.834 12.913-10.747 18.711-1.372 3.296-2.721 6.898-3.974 10.794-1.954 6.078-4.253 16.775-4.253 16.775l.942 5.435s9.025-12.905 12.335-17.461c4.61-6.346 9.332-11.514 13.601-15.626 10.788-10.18 21.576-20.359 32.364-30.539l44.166-33.207 2.427 2.464s-12.498 14.572-16.169 19.065c-5.337 6.532-11.182 13.93-18.825 23.002-4.612 5.475-9.519 11.068-14.733 16.741-4.517 4.915-10.025 10.907-16.534 17.177-10.341 9.961-19.229 16.785-26.421 22.274-5.705 4.353-9.498 6.995-16.306 11.782-8.704 6.12-21.372 15.07-37.277 26.457Z" fill="currentColor" />
      </svg>
    `;
  }

  if (category === "rogue_spawn") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 14c0-7 4-11 8-11s8 4 8 11v4H4Z" fill="${color}" />
        <ellipse cx="12" cy="13" rx="4.5" ry="5" fill="#111827" />
        <ellipse cx="10" cy="12.5" rx="1.1" ry=".7" fill="${color}" opacity=".9" />
        <ellipse cx="14" cy="12.5" rx="1.1" ry=".7" fill="${color}" opacity=".9" />
        <path d="M7 18 6 23h12l-1-5Z" fill="${color}" opacity=".82" />
      </svg>
    `;
  }

  if (category === "raider_spawn") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 11c0-4.5 3-7 7-7s7 2.5 7 7Z" fill="${color}" />
        <rect x="4" y="10.5" width="16" height="1.5" rx=".5" fill="${color}" opacity=".62" />
        <rect x="6.5" y="11.5" width="11" height="3.5" rx="1.5" fill="#111827" stroke="${color}" stroke-width=".8" />
        <ellipse cx="9" cy="13.2" rx="1.8" ry="1.1" fill="${color}" opacity=".22" />
        <ellipse cx="15" cy="13.2" rx="1.8" ry="1.1" fill="${color}" opacity=".22" />
        <path d="m8 19-1 5h10l-1-5Z" fill="${color}" opacity=".75" />
      </svg>
    `;
  }

  if (category === "black_div_spawn" || category === "bloodhounds_spawn") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 12c0-5.5 3.5-9 8-9s8 3.5 8 9Z" fill="#475569" />
        <rect x="3.5" y="11.2" width="17" height="1.8" rx=".6" fill="#64748b" />
        <path d="M7 13c0 4.5 2.2 7.5 5 7.5s5-3 5-7.5Z" fill="#d6b884" />
        <path d="M6 13.5v2c0 .7.3 1 1 1h3.5c.7 0 1-.3 1-1v-2c0-.7-.3-1-1-1H7c-.7 0-1 .3-1 1ZM12.5 13.5v2c0 .7.3 1 1 1H17c.7 0 1-.3 1-1v-2c0-.7-.3-1-1-1h-3.5c-.7 0-1 .3-1 1Z" fill="#111827" />
        <circle cx="19" cy="6" r="2" fill="${color}" />
      </svg>
    `;
  }

  if (category === "goons_spawn") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 8V4l4 2.5L12 3l4 3.5L20 4v4Z" fill="${color}" />
        <rect x="4" y="8" width="16" height="1.5" rx=".4" fill="${color}" opacity=".82" />
        <path d="M6 10c0-1.5 2.5-2 6-2s6 .5 6 2v7c0 2.5-2.5 4-6 4s-6-1.5-6-4Z" fill="${color}" opacity=".88" />
        <ellipse cx="9.5" cy="13.5" rx="2" ry="1.5" fill="#111827" />
        <ellipse cx="14.5" cy="13.5" rx="2" ry="1.5" fill="#111827" />
      </svg>
    `;
  }

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="5.2" r="2.45" fill="${color}" />
      <path d="M9 10.4c0-1.7 6-1.7 6 0v5.4H9z" fill="${color}" />
      <path d="M9.8 11.1 7.1 14.5M14.2 11.1l2.7 3.4M10.2 15.8 8.9 21M13.8 15.8l1.3 5.2" stroke="${color}" stroke-width="2.35" stroke-linecap="round" />
    </svg>
  `;
}

export function KappaBadge() {
  return (
    <img
      alt="Kappa"
      className="h-4 w-4 shrink-0 rounded object-contain"
      src={KAPPA_IMAGE}
      title="Kappa"
    />
  );
}

export function PanelBlock({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <section className="border-b border-gray-200 p-3 dark:border-[#3a3d41]">
      {title ? (
        <h2 className="mb-2 text-xs font-black uppercase tracking-wide text-gray-500 dark:text-gray-400">
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
