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
    () => items.filter((entry) => matchesFilterText(getEntryLabel(entry, locale), searchQuery)),
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
                const completed = kind === "quest" && completedQuestIds.includes(entry.id);
                const isKappaQuest =
                  "quest_info" in entry.point && !!entry.point.quest_info?.quest.kappa_required;

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
                          "min-w-0 truncate font-medium text-gray-700 dark:text-gray-100",
                          isSelected ? "font-black text-orange-500" : "",
                        )}
                      >
                        {label}
                      </span>
                      {isKappaQuest ? <KappaBadge /> : null}
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
        <button
          type="button"
          onClick={onToggleAll}
          className="h-6 rounded px-2 text-xs font-bold text-orange-500 hover:bg-white dark:hover:bg-[#3a3d41]"
        >
          {allLabel}
        </button>
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
            const isOpen = hasQuery || expandedCategories.has(group.category);
            const enabledCount = ids.filter((id) => enabledIds.has(id)).length;
            const isCategoryEnabled = enabledCount === ids.length;

            return (
              <div
                key={group.category}
                className="rounded-md border border-gray-200 bg-gray-50/80 dark:border-[#3a3d41] dark:bg-[#15171a]"
              >
                <div className="grid h-8 grid-cols-[1fr_42px] items-center">
                  <button
                    type="button"
                    onClick={() => onToggleCategoryOpen(group.category)}
                    className="flex h-8 min-w-0 items-center gap-2 rounded-l px-2 text-left hover:bg-gray-100 dark:hover:bg-[#2a2d31]"
                  >
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 shrink-0 text-orange-500 transition-transform",
                        isOpen ? "rotate-180" : "-rotate-90",
                      )}
                    />
                    <StaticPanelMarkerIcon category={group.category} />
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

  if (category === "stationary_weapon") {
    return "#94a3b8";
  }

  if (category === "btr_stop") {
    return "#fde047";
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
          __html: getStaticPanelIconSvg(category, getStaticIconColor(category, faction), iconSize),
        }}
      />
    </span>
  );
}

function getStaticPanelIconSvg(category: string, color: string, size: number) {
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

  if (category === "stationary_weapon") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="6.8" stroke="${color}" stroke-width="2.4" />
        <path d="M12 3.8v4M12 16.2v4M3.8 12h4M16.2 12h4" stroke="${color}" stroke-width="2.4" stroke-linecap="round" />
        <circle cx="12" cy="12" r="1.8" fill="${color}" />
      </svg>
    `;
  }

  if (category === "btr_stop") {
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4.2 14.2 6 9.2h11.2l2.6 5v3.2H4.2z" fill="${color}" />
        <path d="M7.2 9.2 8.6 6.6h7.1l2 2.6" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="7.4" cy="18" r="2" fill="#111827" stroke="${color}" stroke-width="1.5" />
        <circle cx="16.8" cy="18" r="2" fill="#111827" stroke="${color}" stroke-width="1.5" />
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
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17.7 3.6 7.4 13.9l3.1 3.1L20.8 6.7c.8-.8.8-2.1 0-2.9s-2.1-.8-2.9 0Z" fill="${color}" />
        <path d="m6.5 14.7 3.8 3.8-2.1 2.1a1.8 1.8 0 0 1-2.6 0l-1.2-1.2a1.8 1.8 0 0 1 0-2.6z" fill="${color}" opacity=".82" />
        <path d="M14.4 6.8 18 10.4" stroke="#111827" stroke-width="1.3" stroke-linecap="round" opacity=".55" />
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
