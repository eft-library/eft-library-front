import type React from "react";
import { useEffect, useMemo, useRef } from "react";
import { BookOpen, CalendarDays, Check, ChevronDown, Flag, Search } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/class-name";

import { copyByLocale, KAPPA_IMAGE, type LiveMapCopy } from "./live-map-copy";
import {
  getEntryLabel,
  getStaticCategoryLabel,
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
  kind,
  locale,
  onOpen,
  onSearchQueryChange,
  onToggle,
  onToggleAll,
  onToggleComplete,
  searchQuery,
  selectedId,
  title,
}: {
  allLabel: string;
  completedQuestIds: string[];
  emptyLabel: string;
  enabledIds: Set<string>;
  items: TEntry[];
  kind: "quest" | "story" | "event" | "static";
  locale: Locale;
  onOpen: (entry: TEntry) => void;
  onSearchQueryChange: (query: string) => void;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onToggleComplete?: (id: string) => void;
  searchQuery: string;
  selectedId: string | null;
  title: string;
}) {
  const filteredItems = useMemo(
    () => items.filter((entry) => matchesFilterText(getEntryLabel(entry, locale), searchQuery)),
    [items, locale, searchQuery],
  );

  return (
    <section className="border-b border-gray-200 p-3 last:border-b-0 dark:border-[#3a3d41]">
      <div className="mb-2 flex h-9 items-center justify-between gap-2 rounded-md bg-gray-100 px-2 dark:bg-[#2a2d31]">
        <h2 className="text-sm font-black text-gray-900 dark:text-white">{title}</h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onToggleAll}
            className="h-6 rounded px-2 text-xs font-bold text-orange-500 hover:bg-white dark:hover:bg-[#3a3d41]"
          >
            {allLabel}
          </button>
        </div>
      </div>
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
                    <EntryIcon kind="static" />
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
                    {group.entries.map((entry) => {
                      const isSelected = selectedId === entry.id;
                      const enabled = enabledIds.has(entry.id);
                      const label = getEntryLabel(entry, locale);

                      return (
                        <div
                          ref={isSelected ? selectedItemRef : null}
                          key={entry.id}
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
                    })}
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
