import type React from "react";
import { Children, useState } from "react";
import { Check, ExternalLink, Route, X } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/class-name";
import type {
  EventInfo,
  EventObjective,
  LiveMapQuestInfo,
  LiveMapStaticPoint,
  StoryInfo,
  StoryObjective,
} from "@/types/api/live-map";

import { copyByLocale, type LiveMapCopy } from "./live-map-copy";
import {
  findNestedObjectiveByPoint,
  getQuestObjectivePoint,
  getQuestObjectivePoints,
  isRemoteObjectivePoint,
  localizedDescription,
  localizedName,
  localizedTitle,
  type PanelState,
} from "./live-map-data-utils";
import { KappaBadge } from "./live-map-sections";

export function DetailPanel({
  completedQuestIds,
  copy,
  focusQuestObjective,
  focusStoryObjective,
  loadingQuestNormalizedName,
  locale,
  normalizedName,
  onClose,
  onOpenQuest,
  onToggleQuest,
  panel,
  savingQuestId,
}: {
  completedQuestIds: string[];
  copy: LiveMapCopy;
  focusQuestObjective: (
    objective: LiveMapQuestInfo["objectives"][number],
    questId: string,
  ) => void;
  focusStoryObjective: (objective: StoryObjective, storyId: string) => void;
  loadingQuestNormalizedName: string | null;
  locale: Locale;
  normalizedName: string;
  onClose: () => void;
  onOpenQuest: (normalizedQuestName: string) => void;
  onToggleQuest: (questId: string) => void;
  panel: PanelState;
  savingQuestId: string | null;
}) {
  return (
    <aside className="hidden w-96 shrink-0 flex-col border-l border-gray-200 bg-white dark:border-[#3a3d41] dark:bg-[#1f2124] xl:flex">
      <div className="flex h-10 items-center justify-between border-b border-gray-200 px-3 dark:border-[#3a3d41]">
        <span className="text-xs font-black text-orange-500">
          {panel.type === "quest"
            ? copy.quests
            : panel.type === "story"
              ? copy.stories
              : panel.type === "event"
                ? copy.events
                : copy.staticPoints}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-orange-500 dark:text-gray-400 dark:hover:bg-[#2a2d31]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto p-3">
        {panel.type === "quest" ? (
          <QuestPanel
            completed={completedQuestIds.includes(panel.info.quest.id)}
            copy={copy}
            focusQuestObjective={focusQuestObjective}
            info={panel.info}
            loadingQuestNormalizedName={loadingQuestNormalizedName}
            locale={locale}
            normalizedName={normalizedName}
            onOpenQuest={onOpenQuest}
            onToggle={() => onToggleQuest(panel.info.quest.id)}
            saving={savingQuestId === panel.info.quest.id}
            selectedPointId={panel.pointId}
          />
        ) : null}
        {panel.type === "story" ? (
          <StoryPanel
            copy={copy}
            focusStoryObjective={focusStoryObjective}
            info={panel.info}
            locale={locale}
            normalizedName={normalizedName}
            selectedObjectiveId={panel.objectiveId}
            selectedPointId={panel.pointId}
          />
        ) : null}
        {panel.type === "event" ? (
          <EventPanel
            copy={copy}
            info={panel.info}
            locale={locale}
            selectedObjectiveId={panel.objectiveId}
            selectedPointId={panel.pointId}
          />
        ) : null}
        {panel.type === "static" ? (
          <StaticPanel point={panel.point} locale={locale} />
        ) : null}
      </div>
    </aside>
  );
}

function QuestPanel({
  completed,
  copy,
  info,
  focusQuestObjective,
  loadingQuestNormalizedName,
  locale,
  normalizedName,
  onOpenQuest,
  onToggle,
  saving,
  selectedPointId,
}: {
  completed: boolean;
  copy: LiveMapCopy;
  info: LiveMapQuestInfo;
  focusQuestObjective: (
    objective: LiveMapQuestInfo["objectives"][number],
    questId: string,
  ) => void;
  loadingQuestNormalizedName: string | null;
  locale: Locale;
  normalizedName: string;
  onOpenQuest: (normalizedQuestName: string) => void;
  onToggle: () => void;
  saving: boolean;
  selectedPointId?: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        {info.trader?.image ? (
          <img
            alt={localizedName(info.trader as unknown as Record<string, unknown>, locale)}
            className="h-8 w-8 rounded object-cover"
            src={info.trader.image}
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-1.5">
            <h3 className="min-w-0 text-sm font-black leading-tight text-gray-950 dark:text-white">
              {localizedName(info.quest as unknown as Record<string, unknown>, locale)}
            </h3>
            {info.quest.kappa_required ? <KappaBadge /> : null}
          </div>
          {info.trader ? (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {localizedName(info.trader as unknown as Record<string, unknown>, locale)}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={saving}
          onClick={onToggle}
          className={cn(
            "inline-flex h-7 items-center gap-1 rounded px-2 text-xs font-black disabled:cursor-wait disabled:opacity-70",
            completed
              ? "bg-emerald-500 text-white"
              : "bg-orange-500 text-white dark:text-[#1e2124]",
          )}
        >
          {completed ? <Check className="h-3.5 w-3.5" /> : null}
          {completed ? copy.completed : copy.progress}
        </button>
        <a
          href={`/quest/detail/${info.quest.normalized_name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-7 items-center gap-1 rounded border border-gray-200 px-2 text-xs font-bold text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-[#3a3d41] dark:text-gray-100 dark:hover:border-orange-500 dark:hover:text-orange-300"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {copy.questDetailPage}
        </a>
      </div>
      <QuestRequirementList
        copy={copy}
        minPlayerLevel={info.quest.min_player_level}
      />
      <ObjectiveList
        copy={copy}
        locale={locale}
        normalizedName={normalizedName}
        objectives={info.objectives}
        onFocusObjective={(objective) => focusQuestObjective(objective, info.quest.id)}
        selectedPointId={selectedPointId}
      />
      <QuestRewardList copy={copy} info={info} locale={locale} />
      <RelatedList
        copy={copy}
        loadingQuestNormalizedName={loadingQuestNormalizedName}
        locale={locale}
        next={info.next_quests}
        onOpenQuest={onOpenQuest}
        previous={info.require_quests}
      />
    </div>
  );
}

function StoryPanel({
  copy,
  focusStoryObjective,
  info,
  locale,
  normalizedName,
  selectedObjectiveId,
  selectedPointId,
}: {
  copy: LiveMapCopy;
  focusStoryObjective: (objective: StoryObjective, storyId: string) => void;
  info: StoryInfo;
  locale: Locale;
  normalizedName: string;
  selectedObjectiveId?: string | null;
  selectedPointId?: string;
}) {
  const selectedObjective = selectedPointId
    ? findNestedObjectiveByPoint(info.objectives, selectedPointId, selectedObjectiveId ?? null)
    : null;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-black text-gray-950 dark:text-white">
        {localizedTitle(info.story as unknown as Record<string, unknown>, locale)}
      </h3>
      {info.requirements.length > 0 ? (
        <section>
          <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-300">
            {copy.requirements}
          </h4>
          <ul className="space-y-1">
            {info.requirements.map((requirement) => (
              <li key={requirement.id} className="text-xs font-medium leading-5 text-gray-700 dark:text-gray-100">
                {localizedDescription(requirement as unknown as Record<string, unknown>, locale)}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <StoryObjectiveList
        copy={copy}
        onFocusObjective={(objective) => focusStoryObjective(objective, info.story.id)}
        locale={locale}
        normalizedName={normalizedName}
        objectives={info.objectives}
        selectedObjectiveId={selectedObjective?.objective_id ?? null}
        selectedPointId={selectedPointId}
      />
    </div>
  );
}

function EventPanel({
  copy,
  info,
  locale,
  selectedObjectiveId,
  selectedPointId,
}: {
  copy: LiveMapCopy;
  info: EventInfo;
  locale: Locale;
  selectedObjectiveId?: string | null;
  selectedPointId?: string;
}) {
  const selectedObjective = selectedPointId
    ? findNestedObjectiveByPoint(info.objectives, selectedPointId, selectedObjectiveId ?? null)
    : null;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        {info.trader?.image ? (
          <img
            alt={localizedName(info.trader as unknown as Record<string, unknown>, locale)}
            className="h-8 w-8 rounded object-cover"
            src={info.trader.image}
          />
        ) : null}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-black text-gray-950 dark:text-white">
            {localizedTitle(info.event as unknown as Record<string, unknown>, locale)}
          </h3>
          {info.trader ? (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {localizedName(info.trader as unknown as Record<string, unknown>, locale)}
            </p>
          ) : null}
        </div>
      </div>
      <EventObjectiveList
        copy={copy}
        locale={locale}
        objectives={info.objectives}
        selectedObjectiveId={selectedObjective?.objective_id ?? null}
        selectedPointId={selectedPointId}
      />
    </div>
  );
}

function StaticPanel({ point, locale }: { point: LiveMapStaticPoint; locale: Locale }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-black text-gray-950 dark:text-white">
        {localizedName(point as unknown as Record<string, unknown>, locale)}
      </h3>
      <p className="text-xs font-bold text-orange-500">{point.category}</p>
      <p className="text-xs font-medium leading-5 text-gray-700 dark:text-gray-100">
        {localizedDescription(point as unknown as Record<string, unknown>, locale)}
      </p>
    </div>
  );
}

function ObjectiveList({
  copy,
  locale,
  normalizedName,
  objectives,
  onFocusObjective,
  selectedPointId,
}: {
  copy: LiveMapCopy;
  locale: Locale;
  normalizedName: string;
  objectives: LiveMapQuestInfo["objectives"];
  onFocusObjective?: (objective: LiveMapQuestInfo["objectives"][number]) => void;
  selectedPointId?: string;
}) {
  return (
    <section>
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-300">
        {copy.objectives}
      </h4>
      <ul className="space-y-0.5">
        {objectives.map((objective) => {
          const point = getQuestObjectivePoint(objective);
          const isRemote = isRemoteObjectivePoint(point, objective.maps, normalizedName);

          return (
            <li
              key={objective.objective_id}
              className={cn(
                "space-y-1 rounded-md border border-transparent px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-100",
                selectedPointId &&
                  getQuestObjectivePoints(objective).some((entry) => entry.id === selectedPointId)
                  ? "border-orange-300 bg-orange-50 dark:border-orange-500/40 dark:bg-orange-500/10"
                  : "",
              )}
            >
              <ObjectiveLine
                count={objective.count}
                description={localizedDescription(objective as unknown as Record<string, unknown>, locale)}
                onFocus={
                  getQuestObjectivePoints(objective).length > 0
                    ? () => onFocusObjective?.(objective)
                    : undefined
                }
                optional={false}
                remote={isRemote}
              />
              {objective.items.length > 0 ? <ItemRow items={objective.items} locale={locale} /> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function StoryObjectiveList({
  copy,
  locale,
  normalizedName,
  onFocusObjective,
  objectives,
  selectedObjectiveId,
  selectedPointId,
}: {
  copy: LiveMapCopy;
  locale: Locale;
  normalizedName: string;
  onFocusObjective?: (objective: StoryObjective) => void;
  objectives: StoryObjective[];
  selectedObjectiveId?: string | null;
  selectedPointId?: string;
}) {
  return (
    <section>
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-300">
        {copy.objectives}
      </h4>
      <NestedStoryObjectives
        locale={locale}
        normalizedName={normalizedName}
        onFocusObjective={onFocusObjective}
        objectives={objectives}
        selectedObjectiveId={selectedObjectiveId}
        selectedPointId={selectedPointId}
      />
    </section>
  );
}

function EventObjectiveList({
  copy,
  locale,
  objectives,
  selectedObjectiveId,
  selectedPointId,
}: {
  copy: LiveMapCopy;
  locale: Locale;
  objectives: EventObjective[];
  selectedObjectiveId?: string | null;
  selectedPointId?: string;
}) {
  return (
    <section>
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-300">
        {copy.objectives}
      </h4>
      <NestedEventObjectives
        locale={locale}
        objectives={objectives}
        selectedObjectiveId={selectedObjectiveId}
        selectedPointId={selectedPointId}
      />
    </section>
  );
}

function NestedStoryObjectives({
  locale,
  normalizedName,
  onFocusObjective,
  objectives,
  selectedObjectiveId,
  selectedPointId,
}: {
  locale: Locale;
  normalizedName: string;
  onFocusObjective?: (objective: StoryObjective) => void;
  objectives: StoryObjective[];
  selectedObjectiveId?: string | null;
  selectedPointId?: string;
}) {
  return (
    <ul className="space-y-1">
      {objectives.map((objective) => {
        const isSelected =
          objective.objective_id === selectedObjectiveId ||
          (!!selectedPointId &&
            objective.live_map_points.some((point) => point.id === selectedPointId));
        const point = objective.live_map_points[0];
        const isRemote = isRemoteObjectivePoint(point, objective.maps, normalizedName);

        return (
          <li
            key={objective.objective_id}
            className={cn(
              "space-y-1 rounded-md border border-transparent px-1.5 py-1",
              isSelected
                ? "border-orange-300 bg-orange-50 dark:border-orange-500/40 dark:bg-orange-500/10"
                : "",
            )}
          >
            <ObjectiveLine
              count={objective.count}
              description={localizedDescription(objective as unknown as Record<string, unknown>, locale)}
              onFocus={
                objective.live_map_points.length > 0
                  ? () => onFocusObjective?.(objective)
                  : undefined
              }
              optional={objective.is_optional}
              remote={isRemote}
            />
            {objective.items.length > 0 ? <ItemRow items={objective.items} locale={locale} /> : null}
            {objective.children.length > 0 ? (
              <div className="border-l border-gray-200 pl-3 dark:border-[#3a3d41]">
                <NestedStoryObjectives
                  locale={locale}
                  normalizedName={normalizedName}
                  onFocusObjective={onFocusObjective}
                  objectives={objective.children}
                  selectedObjectiveId={selectedObjectiveId}
                  selectedPointId={selectedPointId}
                />
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function NestedEventObjectives({
  locale,
  objectives,
  selectedObjectiveId,
  selectedPointId,
}: {
  locale: Locale;
  objectives: EventObjective[];
  selectedObjectiveId?: string | null;
  selectedPointId?: string;
}) {
  return (
    <ul className="space-y-1">
      {objectives.map((objective) => {
        const isSelected =
          objective.objective_id === selectedObjectiveId ||
          (!!selectedPointId &&
            objective.live_map_points.some((point) => point.id === selectedPointId));

        return (
          <li
            key={objective.objective_id}
            className={cn(
              "space-y-1 rounded-md border border-transparent px-1.5 py-1",
              isSelected
                ? "border-orange-300 bg-orange-50 dark:border-orange-500/40 dark:bg-orange-500/10"
                : "",
            )}
          >
            <ObjectiveLine
              count={objective.count}
              description={localizedDescription(objective as unknown as Record<string, unknown>, locale)}
              optional={objective.is_optional}
            />
            {objective.items.length > 0 ? <ItemRow items={objective.items} locale={locale} /> : null}
            {objective.children.length > 0 ? (
              <div className="border-l border-gray-200 pl-3 dark:border-[#3a3d41]">
                <NestedEventObjectives
                  locale={locale}
                  objectives={objective.children}
                  selectedObjectiveId={selectedObjectiveId}
                  selectedPointId={selectedPointId}
                />
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function ObjectiveLine({
  count,
  description,
  onFocus,
  optional,
  remote = false,
}: {
  count: number | null;
  description: string;
  onFocus?: () => void;
  optional: boolean;
  remote?: boolean;
}) {
  const badges = (
    <>
      {optional ? (
        <span className="ml-1 inline-flex whitespace-nowrap rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold leading-none text-blue-600 align-[1px] dark:bg-blue-500/10 dark:text-blue-300">
          Optional
        </span>
      ) : null}
      {count !== null ? (
        <span className="ml-1 inline-flex whitespace-nowrap rounded bg-orange-50 px-1.5 py-0.5 text-[10px] font-bold leading-none text-orange-600 align-[1px] dark:bg-orange-500/10 dark:text-orange-300">
          x{count}
        </span>
      ) : null}
    </>
  );

  return (
    <div className="flex gap-2 text-xs font-medium leading-4 text-gray-700 dark:text-gray-100">
      <Route className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", remote ? "text-sky-500" : "text-orange-500")} />
      <div className="min-w-0 flex-1">
        <p className="min-w-0">
          {onFocus ? (
            <button
              type="button"
              onClick={onFocus}
              className={cn(
                "inline text-left font-semibold hover:underline",
                remote
                  ? "text-sky-700 dark:text-sky-300"
                  : "text-orange-600 dark:text-orange-300",
              )}
            >
              {description || "-"}
              {badges}
            </button>
          ) : (
            <span>
              {description || "-"}
              {badges}
            </span>
          )}
        </p>
      </div>
    </div>
  );
}

function ItemRow({
  items,
  locale,
}: {
  items: LiveMapQuestInfo["objectives"][number]["items"];
  locale: Locale;
}) {
  return (
    <ExpandableRows className="grid gap-1.5 pl-5" copy={copyByLocale[locale]}>
      {items.map((entry) => (
        <a
          key={`${entry.item.id}-${entry.item_role ?? entry.item_type ?? "item"}`}
          href={`/item/info/${entry.item.normalized_name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 items-center gap-2 rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-[#3a3d41] dark:bg-[#15171a] dark:text-gray-100 dark:hover:border-orange-500 dark:hover:text-orange-300"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded bg-gray-50 dark:bg-[#20242b]">
            {entry.item.image ? (
              <img
                alt={localizedName(entry.item as unknown as Record<string, unknown>, locale)}
                className="h-full w-full object-contain"
                src={entry.item.image}
              />
            ) : null}
          </span>
          <span className="min-w-0 flex-1 truncate">
            {localizedName(entry.item as unknown as Record<string, unknown>, locale)}
          </span>
        </a>
      ))}
    </ExpandableRows>
  );
}

function ExpandableRows({
  children,
  className,
  copy,
  limit = 4,
}: {
  children: React.ReactNode;
  className: string;
  copy: LiveMapCopy;
  limit?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const items = Children.toArray(children);
  const shouldCollapse = items.length > limit;
  const visibleItems = shouldCollapse && !isOpen ? items.slice(0, limit) : items;

  return (
    <div className={className}>
      {visibleItems}
      {shouldCollapse ? (
        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="rounded px-2 py-1 text-left text-xs font-bold text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10"
        >
          {isOpen ? copy.showLess : `${copy.showMore} (${items.length - limit})`}
        </button>
      ) : null}
    </div>
  );
}

function QuestRequirementList({
  copy,
  minPlayerLevel,
}: {
  copy: LiveMapCopy;
  minPlayerLevel: number | null;
}) {
  if (minPlayerLevel === null) {
    return null;
  }

  return (
    <section>
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-300">
        {copy.requirements}
      </h4>
      <div className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs font-semibold text-gray-700 dark:border-[#3a3d41] dark:bg-[#15171a] dark:text-gray-100">
        {copy.minPlayerLevel} {minPlayerLevel}
      </div>
    </section>
  );
}

function RelatedList({
  copy,
  loadingQuestNormalizedName,
  locale,
  next,
  onOpenQuest,
  previous,
}: {
  copy: LiveMapCopy;
  loadingQuestNormalizedName: string | null;
  locale: Locale;
  next: LiveMapQuestInfo["next_quests"];
  onOpenQuest: (normalizedQuestName: string) => void;
  previous: LiveMapQuestInfo["require_quests"];
}) {
  if (!next.length && !previous.length) {
    return null;
  }

  return (
    <section className="space-y-2">
      {previous.length > 0 ? (
        <div>
          <h4 className="mb-1 text-xs font-bold text-gray-500 dark:text-gray-300">
            {copy.previous}
          </h4>
          {previous.map((quest) => (
            <button
              key={quest.id}
              type="button"
              disabled={loadingQuestNormalizedName === quest.normalized_name}
              onClick={() => onOpenQuest(quest.normalized_name)}
              className="block w-full rounded px-1 py-0.5 text-left text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-orange-500 disabled:cursor-wait disabled:opacity-60 dark:text-gray-100 dark:hover:bg-[#2a2d31]"
            >
              ← {localizedName(quest as unknown as Record<string, unknown>, locale)}
            </button>
          ))}
        </div>
      ) : null}
      {next.length > 0 ? (
        <div>
          <h4 className="mb-1 text-xs font-bold text-gray-500 dark:text-gray-300">
            {copy.next}
          </h4>
          {next.map((quest) => (
            <button
              key={quest.id}
              type="button"
              disabled={loadingQuestNormalizedName === quest.normalized_name}
              onClick={() => onOpenQuest(quest.normalized_name)}
              className="block w-full rounded px-1 py-0.5 text-left text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-orange-500 disabled:cursor-wait disabled:opacity-60 dark:text-gray-100 dark:hover:bg-[#2a2d31]"
            >
              → {localizedName(quest as unknown as Record<string, unknown>, locale)}
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function QuestRewardList({
  copy,
  info,
  locale,
}: {
  copy: LiveMapCopy;
  info: LiveMapQuestInfo;
  locale: Locale;
}) {
  const rewards = info.finish_rewards;
  const hasRewards =
    !!info.quest.experience ||
    rewards.trader_standing.length > 0 ||
    rewards.skill_level_reward.length > 0 ||
    rewards.items.length > 0 ||
    rewards.offer_unlock.length > 0 ||
    rewards.craft_unlock.length > 0;

  if (!hasRewards) {
    return null;
  }

  return (
    <section>
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-300">
        {copy.rewards}
      </h4>
      <div className="space-y-3">
        {info.quest.experience ? (
          <RewardBlock copy={copy} title={copy.experience}>
            <RewardPill>{info.quest.experience.toLocaleString()} EXP</RewardPill>
          </RewardBlock>
        ) : null}
        {rewards.trader_standing.length > 0 ? (
          <RewardBlock copy={copy} title={copy.traderStanding}>
            {rewards.trader_standing.map((reward) => (
              <RewardPill key={`${reward.trader.id}-${reward.standing}`}>
                {localizedName(reward.trader as unknown as Record<string, unknown>, locale)}{" "}
                {formatSignedNumber(reward.standing)}
              </RewardPill>
            ))}
          </RewardBlock>
        ) : null}
        {rewards.skill_level_reward.length > 0 ? (
          <RewardBlock copy={copy} title={copy.skills}>
            {rewards.skill_level_reward.map((reward) => (
              <RewardPill key={`${reward.name_en}-${reward.skill_level}`}>
                {reward.name_en} +{reward.skill_level}
              </RewardPill>
            ))}
          </RewardBlock>
        ) : null}
        {rewards.items.length > 0 ? (
          <RewardBlock copy={copy} title={copy.rewardItems}>
            {rewards.items.map((reward) => (
              <RewardItemLink
                key={`${reward.item.id}-${reward.quantity}`}
                image={reward.item.image}
                meta={`x${reward.quantity.toLocaleString()}`}
                name={localizedName(reward.item as unknown as Record<string, unknown>, locale)}
                normalizedName={reward.item.normalized_name}
              />
            ))}
          </RewardBlock>
        ) : null}
        {rewards.offer_unlock.length > 0 ? (
          <RewardBlock copy={copy} title={copy.unlocks}>
            {rewards.offer_unlock.map((reward) =>
              reward.item ? (
                <RewardItemLink
                  key={reward.offer_id}
                  image={reward.item.image}
                  meta={`LL${reward.level}`}
                  name={localizedName(reward.item as unknown as Record<string, unknown>, locale)}
                  normalizedName={reward.item.normalized_name}
                />
              ) : (
                <RewardPill key={reward.offer_id}>
                  {reward.offer_id} · LL{reward.level}
                </RewardPill>
              ),
            )}
          </RewardBlock>
        ) : null}
        {rewards.craft_unlock.length > 0 ? (
          <RewardBlock copy={copy} title={copy.crafts}>
            {rewards.craft_unlock.map((reward) =>
              reward.reward_item ? (
                <RewardItemLink
                  key={reward.craft_id}
                  image={reward.reward_item.image}
                  meta={`Lv.${reward.station_level}`}
                  name={localizedName(reward.reward_item as unknown as Record<string, unknown>, locale)}
                  normalizedName={reward.reward_item.normalized_name}
                />
              ) : (
                <RewardPill key={reward.craft_id}>
                  {reward.craft_id} · Lv.{reward.station_level}
                </RewardPill>
              ),
            )}
          </RewardBlock>
        ) : null}
      </div>
    </section>
  );
}

function RewardBlock({
  children,
  copy,
  title,
}: {
  children: React.ReactNode;
  copy: LiveMapCopy;
  title: string;
}) {
  return (
    <div>
      <h5 className="mb-1 text-[11px] font-bold text-gray-500 dark:text-gray-300">{title}</h5>
      <ExpandableRows className="grid gap-1.5" copy={copy}>
        {children}
      </ExpandableRows>
    </div>
  );
}

function RewardPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs font-semibold text-gray-700 dark:border-[#3a3d41] dark:bg-[#15171a] dark:text-gray-100">
      {children}
    </div>
  );
}

function RewardItemLink({
  image,
  meta,
  name,
  normalizedName,
}: {
  image: string | null;
  meta: string;
  name: string;
  normalizedName: string;
}) {
  return (
    <a
      href={`/item/info/${normalizedName}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex min-w-0 items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs font-medium text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-[#3a3d41] dark:bg-[#15171a] dark:text-gray-100 dark:hover:border-orange-500 dark:hover:text-orange-300"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded bg-white dark:bg-[#20242b]">
        {image ? <img alt={name} className="h-full w-full object-contain" src={image} /> : null}
      </span>
      <span className="min-w-0 flex-1 truncate">{name}</span>
      <span className="shrink-0 rounded bg-orange-50 px-1.5 py-0.5 text-[10px] font-bold text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
        {meta}
      </span>
    </a>
  );
}

function formatSignedNumber(value: number) {
  return value > 0 ? `+${value}` : String(value);
}
