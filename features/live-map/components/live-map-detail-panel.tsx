import type React from "react";
import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Check, ExternalLink, MapPin, Route, X } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/class-name";
import type { QuestDetailItem } from "@/types/api/quest";
import type {
  EventInfo,
  EventObjective,
  LiveMapFloor,
  LiveMapObjectivePoint,
  LiveMapQuestInfo,
  LiveMapStaticPoint,
  StoryInfo,
  StoryObjective,
  StoryRequirement,
} from "@/types/api/live-map";

import { copyByLocale, type LiveMapCopy } from "./live-map-copy";
import {
  findNestedObjectiveByPoint,
  getFloorLabel,
  getQuestObjectivePoint,
  getQuestObjectivePoints,
  isRemoteObjectivePoint,
  localizedDescription,
  localizedName,
  localizedTitle,
  type PanelState,
} from "./live-map-data-utils";
import { KappaBadge } from "./live-map-sections";

const LiveMapFloorsContext = createContext<LiveMapFloor[]>([]);

type ItemRowEntry = {
  quantity?: number | null;
  count?: number | null;
  found_in_raid?: boolean | null;
  item_role?: string | null;
  item_type?: string;
  item: QuestDetailItem;
};

function getNestedStoryPoints(objectives: StoryObjective[]): LiveMapObjectivePoint[] {
  return objectives.flatMap((objective) => [
    ...objective.live_map_points,
    ...getNestedStoryPoints(objective.children),
  ]);
}

function getNestedEventPoints(objectives: EventObjective[]): LiveMapObjectivePoint[] {
  return objectives.flatMap((objective) => [
    ...objective.live_map_points,
    ...getNestedEventPoints(objective.children),
  ]);
}

function getPanelLocationPoints(panel: PanelState) {
  if (panel.type === "quest") {
    return panel.info.objectives.flatMap(getQuestObjectivePoints);
  }

  if (panel.type === "story") {
    return [
      ...panel.info.requirements.flatMap(
        (requirement) => requirement.live_map_points ?? [],
      ),
      ...getNestedStoryPoints(panel.info.objectives),
    ];
  }

  if (panel.type === "event") {
    return getNestedEventPoints(panel.info.objectives);
  }

  return [];
}

function hasRequirementItem(
  entry: NonNullable<StoryRequirement["items"]>[number],
): entry is NonNullable<StoryRequirement["items"]>[number] & { item: QuestDetailItem } {
  return Boolean(entry.item);
}

export function DetailPanel({
  completedQuestIds,
  copy,
  currentMapId,
  floors,
  focusEventObjective,
  focusQuestObjective,
  focusStoryObjective,
  focusStoryRequirement,
  loadingQuestNormalizedName,
  locale,
  normalizedName,
  onClose,
  onOpenQuest,
  onSelectFloor,
  onToggleQuest,
  panel,
  savingQuestId,
  selectedFloorId,
}: {
  completedQuestIds: string[];
  copy: LiveMapCopy;
  currentMapId: string | null;
  floors: LiveMapFloor[];
  focusQuestObjective: (
    objective: LiveMapQuestInfo["objectives"][number],
    questId: string,
    pointId?: string,
  ) => void;
  focusStoryObjective: (objective: StoryObjective, storyId: string, pointId?: string) => void;
  focusStoryRequirement: (requirement: StoryRequirement, storyId: string, pointId?: string) => void;
  focusEventObjective: (objective: EventObjective, eventId: string, pointId?: string) => void;
  loadingQuestNormalizedName: string | null;
  locale: Locale;
  normalizedName: string;
  onClose: () => void;
  onOpenQuest: (normalizedQuestName: string) => void;
  onSelectFloor: (floorId: string) => void;
  onToggleQuest: (questId: string) => void;
  panel: PanelState;
  savingQuestId: string | null;
  selectedFloorId: string;
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const selectedScrollKey =
    panel.type === "quest" && panel.pointId
      ? `${panel.type}:${panel.id}:${panel.pointId ?? ""}`
      : (panel.type === "story" && (panel.objectiveId || panel.requirementId || panel.pointId)) ||
          (panel.type === "event" && (panel.objectiveId || panel.pointId))
        ? `${panel.type}:${panel.id}:${panel.objectiveId ?? ""}:${panel.type === "story" ? panel.requirementId ?? "" : ""}:${panel.pointId ?? ""}`
        : null;

  useEffect(() => {
    if (!selectedScrollKey) {
      return;
    }

    const container = scrollContainerRef.current;
    const selectedObjective = container?.querySelector<HTMLElement>(
      '[data-live-map-selected-objective="true"]',
    );

    selectedObjective?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [selectedScrollKey]);

  const floorSummaries = useMemo(() => {
    if (!currentMapId) {
      return [];
    }

    const uniquePoints = Array.from(
      new Map(
        getPanelLocationPoints(panel).map((point) => [point.id, point]),
      ).values(),
    );
    const counts = new Map<string, number>();

    uniquePoints.forEach((point) => {
      if (point.map_id !== currentMapId || !point.floor_id) {
        return;
      }

      counts.set(point.floor_id, (counts.get(point.floor_id) ?? 0) + 1);
    });

    return floors.flatMap((floor) => {
      const count = counts.get(floor.id);

      return count ? [{ count, floor }] : [];
    });
  }, [currentMapId, floors, panel]);

  return (
    <LiveMapFloorsContext.Provider value={floors}>
      <aside className="absolute inset-y-0 right-0 z-[600] flex w-full max-w-72 shrink-0 flex-col border-l border-gray-200 bg-white shadow-2xl dark:border-[#3a3d41] dark:bg-[#1f2124] md:static md:order-2 md:min-h-0 md:max-w-none md:flex-1 md:border-l-0 md:border-t md:shadow-none lg:max-w-none xl:order-1 xl:w-96 xl:max-w-96 xl:flex-none xl:border-l xl:border-t-0">
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
        {floorSummaries.length > 1 ? (
          <div className="flex shrink-0 items-center gap-1.5 overflow-x-auto border-b border-gray-200 px-3 py-2 dark:border-[#3a3d41]">
            <span className="mr-0.5 shrink-0 text-[10px] font-bold text-gray-500 dark:text-gray-300">
              {copy.floor}
            </span>
            {floorSummaries.map(({ count, floor }) => {
              const isSelected = floor.id === selectedFloorId;

              return (
                <button
                  key={floor.id}
                  type="button"
                  onClick={() => onSelectFloor(floor.id)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-bold transition",
                    isSelected
                      ? "border-sky-500 bg-sky-500 text-white dark:text-[#15171a]"
                      : "border-sky-200 bg-sky-50 text-sky-700 hover:border-sky-400 hover:bg-sky-100 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200 dark:hover:border-sky-400 dark:hover:bg-sky-500/15",
                  )}
                >
                  {getFloorLabel(floor, locale)}
                  <span className={cn(
                    "rounded-full px-1 text-[9px]",
                    isSelected
                      ? "bg-white/20"
                      : "bg-sky-100 dark:bg-sky-500/20",
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
        <div ref={scrollContainerRef} className="min-h-0 flex-1 overflow-y-auto p-3">
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
            focusStoryRequirement={focusStoryRequirement}
            info={panel.info}
            locale={locale}
            normalizedName={normalizedName}
            selectedObjectiveId={panel.objectiveId}
            selectedPointId={panel.pointId}
            selectedRequirementId={panel.requirementId}
          />
        ) : null}
        {panel.type === "event" ? (
          <EventPanel
            copy={copy}
            focusEventObjective={focusEventObjective}
            info={panel.info}
            locale={locale}
            normalizedName={normalizedName}
            selectedObjectiveId={panel.objectiveId}
            selectedPointId={panel.pointId}
          />
        ) : null}
        {panel.type === "static" ? (
          <StaticPanel point={panel.point} locale={locale} />
        ) : null}
        </div>
      </aside>
    </LiveMapFloorsContext.Provider>
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
    pointId?: string,
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
        onFocusObjective={(objective, pointId) => focusQuestObjective(objective, info.quest.id, pointId)}
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
  focusStoryRequirement,
  info,
  locale,
  normalizedName,
  selectedObjectiveId,
  selectedPointId,
  selectedRequirementId,
}: {
  copy: LiveMapCopy;
  focusStoryObjective: (objective: StoryObjective, storyId: string, pointId?: string) => void;
  focusStoryRequirement: (requirement: StoryRequirement, storyId: string, pointId?: string) => void;
  info: StoryInfo;
  locale: Locale;
  normalizedName: string;
  selectedObjectiveId?: string | null;
  selectedPointId?: string;
  selectedRequirementId?: string | null;
}) {
  const selectedObjective = selectedPointId
    ? findNestedObjectiveByPoint(info.objectives, selectedPointId, selectedObjectiveId ?? null)
    : null;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-sm font-black text-gray-950 dark:text-white">
          {localizedTitle(info.story as unknown as Record<string, unknown>, locale)}
        </h3>
        <a
          href={`/story/${info.story.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-7 items-center gap-1 rounded border border-gray-200 px-2 text-xs font-bold text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-[#3a3d41] dark:text-gray-100 dark:hover:border-orange-500 dark:hover:text-orange-300"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {copy.questDetailPage}
        </a>
      </div>
      <StoryRequirementList
        copy={copy}
        locale={locale}
        normalizedName={normalizedName}
        onFocusRequirement={(requirement, pointId) => focusStoryRequirement(requirement, info.story.id, pointId)}
        requirements={info.requirements}
        selectedPointId={selectedPointId}
        selectedRequirementId={selectedRequirementId}
      />
      <StoryObjectiveList
        copy={copy}
        onFocusObjective={(objective, pointId) => focusStoryObjective(objective, info.story.id, pointId)}
        locale={locale}
        normalizedName={normalizedName}
        objectives={info.objectives}
        selectedObjectiveId={selectedObjective?.objective_id ?? null}
        selectedPointId={selectedPointId}
      />
      <StoryRewardList copy={copy} info={info} locale={locale} />
    </div>
  );
}

function EventPanel({
  copy,
  focusEventObjective,
  info,
  locale,
  normalizedName,
  selectedObjectiveId,
  selectedPointId,
}: {
  copy: LiveMapCopy;
  focusEventObjective: (objective: EventObjective, eventId: string, pointId?: string) => void;
  info: EventInfo;
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
        onFocusObjective={(objective, pointId) => focusEventObjective(objective, info.event.id, pointId)}
        locale={locale}
        normalizedName={normalizedName}
        objectives={info.objectives}
        selectedObjectiveId={selectedObjective?.objective_id ?? null}
        selectedPointId={selectedPointId}
      />
      <EventRewardList copy={copy} info={info} locale={locale} />
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
  onFocusObjective?: (objective: LiveMapQuestInfo["objectives"][number], pointId?: string) => void;
  selectedPointId?: string;
}) {
  return (
    <section>
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-300">
        {copy.objectives}
      </h4>
      <ul className="space-y-0.5">
        {objectives.map((objective) => {
          const points = getQuestObjectivePoints(objective);
          const isRemote = hasRemoteObjectivePoint(points, objective.maps, normalizedName);
          const isSelected =
            !!selectedPointId &&
            getQuestObjectivePoints(objective).some((entry) => entry.id === selectedPointId);

          return (
            <li
              key={objective.objective_id}
              data-live-map-objective-id={objective.objective_id}
              data-live-map-selected-objective={isSelected ? "true" : undefined}
              className={cn(
                "space-y-1 rounded-md border border-transparent px-1.5 py-0.5 text-xs font-medium text-gray-700 dark:text-gray-100",
                isSelected
                  ? "border-orange-300 bg-orange-50 dark:border-orange-500/40 dark:bg-orange-500/10"
                  : "",
              )}
            >
              <ObjectiveLine
                count={objective.count}
                description={localizedDescription(objective as unknown as Record<string, unknown>, locale)}
                locale={locale}
                onFocus={
                  points.length > 0
                    ? () => onFocusObjective?.(objective)
                    : undefined
                }
                optional={false}
                points={points}
                remote={isRemote}
              />
              {points.length > 1 ? (
                <ObjectivePointList
                  copy={copy}
                  locale={locale}
                  normalizedName={normalizedName}
                  onFocusPoint={(pointId) => onFocusObjective?.(objective, pointId)}
                  points={points}
                  selectedPointId={selectedPointId}
                  maps={objective.maps}
                />
              ) : null}
              {objective.items.length > 0 ? <ItemRow items={objective.items} locale={locale} /> : null}
              {objective.required_keys.length > 0 ? (
                <RequiredKeyRow
                  copy={copy}
                  keys={objective.required_keys}
                  locale={locale}
                />
              ) : null}
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
  onFocusObjective?: (objective: StoryObjective, pointId?: string) => void;
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
        copy={copy}
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

function StoryRequirementList({
  copy,
  locale,
  normalizedName,
  onFocusRequirement,
  requirements,
  selectedPointId,
  selectedRequirementId,
}: {
  copy: LiveMapCopy;
  locale: Locale;
  normalizedName: string;
  onFocusRequirement?: (requirement: StoryRequirement, pointId?: string) => void;
  requirements: StoryRequirement[];
  selectedPointId?: string;
  selectedRequirementId?: string | null;
}) {
  if (requirements.length === 0) {
    return null;
  }

  return (
    <section>
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-300">
        {copy.requirements}
      </h4>
      <ul className="space-y-1">
        {requirements.map((requirement) => {
          const details = requirement.details ?? [];
          const items = requirement.items ?? [];
          const maps = requirement.maps ?? [];
          const points = requirement.live_map_points ?? [];
          const isSelected =
            requirement.id === selectedRequirementId ||
            (!!selectedPointId &&
              points.some((point) => point.id === selectedPointId));
          const isRemote = hasRemoteObjectivePoint(points, maps, normalizedName);
          const description = localizedDescription(requirement as unknown as Record<string, unknown>, locale);
          const visibleDetails = details.filter((detail) => {
            const detailText = localizedDescription(detail as unknown as Record<string, unknown>, locale);

            return Boolean(detail.image) || (!!detailText && detailText !== description);
          });

          return (
            <li
              key={requirement.id}
              data-live-map-objective-id={requirement.id}
              data-live-map-selected-objective={isSelected ? "true" : undefined}
              className={cn(
                "space-y-1 rounded-md border border-transparent px-1.5 py-1 text-xs text-gray-700 dark:text-gray-100",
                isSelected
                  ? "border-orange-300 bg-orange-50 dark:border-orange-500/40 dark:bg-orange-500/10"
                  : "",
              )}
            >
              <ObjectiveLine
                count={null}
                description={description}
                locale={locale}
                onFocus={
                  points.length > 0
                    ? () => onFocusRequirement?.(requirement)
                    : undefined
                }
                optional={false}
                points={points}
                remote={isRemote}
              />
              {visibleDetails.length > 0 ? (
                <div className="grid gap-1.5 pl-5">
                  {visibleDetails.map((detail) => {
                    const detailText = localizedDescription(detail as unknown as Record<string, unknown>, locale);

                    return detailText || detail.image ? (
                      <div
                        key={detail.id}
                        className="rounded-md border border-gray-200 bg-white p-2 dark:border-[#3a3d41] dark:bg-[#15171a]"
                      >
                        {detailText ? (
                          <p className="text-xs font-medium leading-5 text-gray-700 dark:text-gray-100">
                            {detailText}
                          </p>
                        ) : null}
                        {detail.image ? (
                          <img
                            alt={detailText || description}
                            className="mt-2 max-h-36 w-full rounded object-cover"
                            src={detail.image}
                          />
                        ) : null}
                      </div>
                    ) : null;
                  })}
                </div>
              ) : null}
              {points.length > 0 ? (
                <ObjectivePointList
                  copy={copy}
                  locale={locale}
                  normalizedName={normalizedName}
                  onFocusPoint={(pointId) => onFocusRequirement?.(requirement, pointId)}
                  points={points}
                  selectedPointId={selectedPointId}
                  maps={maps}
                />
              ) : null}
              {items.length > 0 ? (
                <ItemRow
                  items={items.filter(hasRequirementItem)}
                  locale={locale}
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function EventObjectiveList({
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
  onFocusObjective?: (objective: EventObjective, pointId?: string) => void;
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
        copy={copy}
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

function NestedStoryObjectives({
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
  onFocusObjective?: (objective: StoryObjective, pointId?: string) => void;
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
        const isRemote = hasRemoteObjectivePoint(objective.live_map_points, objective.maps, normalizedName);

        return (
          <li
            key={objective.objective_id}
            data-live-map-objective-id={objective.objective_id}
            data-live-map-selected-objective={isSelected ? "true" : undefined}
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
              locale={locale}
              onFocus={
                objective.live_map_points.length > 0
                  ? () => onFocusObjective?.(objective)
                  : undefined
              }
              optional={objective.is_optional}
              points={objective.live_map_points}
              remote={isRemote}
              />
            {objective.live_map_points.length > 1 ? (
              <ObjectivePointList
                copy={copy}
                locale={locale}
                normalizedName={normalizedName}
                onFocusPoint={(pointId) => onFocusObjective?.(objective, pointId)}
                points={objective.live_map_points}
                selectedPointId={selectedPointId}
                maps={objective.maps}
              />
            ) : null}
            {objective.items.length > 0 ? <ItemRow items={objective.items} locale={locale} /> : null}
            <StoryObjectiveRewardList copy={copy} locale={locale} rewards={objective.rewards} />
            {objective.children.length > 0 ? (
              <div className="border-l border-gray-200 pl-3 dark:border-[#3a3d41]">
                <NestedStoryObjectives
                  copy={copy}
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

function StoryObjectiveRewardList({
  copy,
  locale,
  rewards,
}: {
  copy: LiveMapCopy;
  locale: Locale;
  rewards: StoryObjective["rewards"];
}) {
  if (!rewards || (!rewards.items.length && !rewards.texts.length)) {
    return null;
  }

  return (
    <div className="space-y-1.5 pl-5">
      {rewards.texts.map((reward) => (
        <div
          key={reward.id}
          className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1.5 text-xs font-semibold text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200"
        >
          {localizedDescription(reward as unknown as Record<string, unknown>, locale)}
        </div>
      ))}
      {rewards.items.length > 0 ? (
        <ExpandableRows className="grid gap-1.5" copy={copy}>
          {rewards.items.map((reward) => (
            <RewardItemLink
              key={`${reward.item.id}-${reward.quantity}`}
              image={reward.item.image}
              meta={`x${reward.quantity.toLocaleString()}`}
              name={localizedName(reward.item as unknown as Record<string, unknown>, locale)}
              normalizedName={reward.item.normalized_name}
              tone="success"
            />
          ))}
        </ExpandableRows>
      ) : null}
    </div>
  );
}

function NestedEventObjectives({
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
  onFocusObjective?: (objective: EventObjective, pointId?: string) => void;
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
        const isRemote = hasRemoteObjectivePoint(objective.live_map_points, [], normalizedName);

        return (
          <li
            key={objective.objective_id}
            data-live-map-objective-id={objective.objective_id}
            data-live-map-selected-objective={isSelected ? "true" : undefined}
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
              locale={locale}
              onFocus={
                objective.live_map_points.length > 0
                  ? () => onFocusObjective?.(objective)
                  : undefined
              }
              optional={objective.is_optional}
              points={objective.live_map_points}
              remote={isRemote}
            />
            {objective.live_map_points.length > 1 ? (
              <ObjectivePointList
                copy={copy}
                locale={locale}
                normalizedName={normalizedName}
                onFocusPoint={(pointId) => onFocusObjective?.(objective, pointId)}
                points={objective.live_map_points}
                selectedPointId={selectedPointId}
                maps={[]}
              />
            ) : null}
            {objective.items.length > 0 ? <ItemRow items={objective.items} locale={locale} /> : null}
            {objective.children.length > 0 ? (
              <div className="border-l border-gray-200 pl-3 dark:border-[#3a3d41]">
                <NestedEventObjectives
                  copy={copy}
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

function hasRemoteObjectivePoint(
  points: LiveMapObjectivePoint[],
  maps: Array<{ id: string; normalized_name: string; name_en: string; name_ko: string; name_ja: string }>,
  normalizedName: string,
) {
  return points.some((point) => isRemoteObjectivePoint(point, maps, normalizedName));
}

function ObjectivePointList({
  copy,
  locale,
  maps,
  normalizedName,
  onFocusPoint,
  points,
  selectedPointId,
}: {
  copy: LiveMapCopy;
  locale: Locale;
  maps: Array<{ id: string; normalized_name: string; name_en: string; name_ko: string; name_ja: string }>;
  normalizedName: string;
  onFocusPoint?: (pointId: string) => void;
  points: LiveMapObjectivePoint[];
  selectedPointId?: string;
}) {
  const floors = useContext(LiveMapFloorsContext);

  return (
    <div className="ml-5 grid gap-1 border-l border-gray-200 pl-2 dark:border-[#3a3d41]">
      {points.map((point, index) => {
        const isSelected = point.id === selectedPointId;
        const isRemote = isRemoteObjectivePoint(point, maps, normalizedName);
        const mapName = point.map
          ? localizedName(point.map as unknown as Record<string, unknown>, locale)
          : maps.find((map) => map.id === point.map_id)
            ? localizedName(maps.find((map) => map.id === point.map_id) as unknown as Record<string, unknown>, locale)
            : "";
        const floor = floors.find(
          (entry) =>
            entry.id === point.floor_id &&
            entry.map_id === point.map_id,
        );

        return (
          <button
            key={point.id}
            type="button"
            onClick={() => onFocusPoint?.(point.id)}
            className={cn(
              "group flex min-w-0 items-start gap-1.5 rounded border px-2 py-1 text-left transition",
              isSelected
                ? "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-500/50 dark:bg-orange-500/15 dark:text-orange-200"
                : "border-transparent text-gray-600 hover:border-gray-200 hover:bg-gray-50 hover:text-orange-600 dark:text-gray-100 dark:hover:border-[#3a3d41] dark:hover:bg-[#2a2d31] dark:hover:text-orange-300",
            )}
          >
            <MapPin
              className={cn(
                "mt-0.5 h-3.5 w-3.5 shrink-0",
                isRemote ? "text-sky-500" : "text-orange-500",
              )}
            />
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-black leading-4">
                {copy.objectiveLocation} {index + 1}
                {mapName ? (
                  <span className="ml-1 font-semibold text-gray-500 dark:text-gray-300">
                    {mapName}
                  </span>
                ) : null}
                {floor ? (
                  <span className="ml-1 inline-flex rounded border border-sky-200 bg-sky-50 px-1 py-0.5 text-[9px] font-bold leading-none text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200">
                    {getFloorLabel(floor, locale)}
                  </span>
                ) : null}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ObjectiveLine({
  count,
  description,
  locale,
  onFocus,
  optional,
  points = [],
  remote = false,
}: {
  count: number | null;
  description: string;
  locale: Locale;
  onFocus?: () => void;
  optional: boolean;
  points?: LiveMapObjectivePoint[];
  remote?: boolean;
}) {
  const floors = useContext(LiveMapFloorsContext);
  const floorLabels = Array.from(
    new Set(
      points.flatMap((point) => {
        const floor = floors.find(
          (entry) =>
            entry.id === point.floor_id &&
            entry.map_id === point.map_id,
        );

        return floor ? [getFloorLabel(floor, locale)] : [];
      }),
    ),
  );
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
      {floorLabels.map((floorLabel) => (
        <span
          key={floorLabel}
          className="ml-1 inline-flex whitespace-nowrap rounded border border-sky-200 bg-sky-50 px-1.5 py-0.5 text-[10px] font-bold leading-none text-sky-700 align-[1px] dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-200"
        >
          {floorLabel}
        </span>
      ))}
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
  items: ItemRowEntry[];
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

function RequiredKeyRow({
  copy,
  keys,
  locale,
}: {
  copy: LiveMapCopy;
  keys: QuestDetailItem[];
  locale: Locale;
}) {
  return (
    <div className="space-y-1.5 pl-5">
      <div className="text-[11px] font-black uppercase tracking-[0.12em] text-violet-600 dark:text-violet-300">
        {copy.requiredKeys}
      </div>
      <ExpandableRows className="grid gap-1.5" copy={copy}>
        {keys.map((keyItem) => (
          <a
            key={keyItem.id}
            href={`/item/info/${keyItem.normalized_name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 items-center gap-2 rounded-md border border-violet-200 bg-violet-50 px-2 py-1.5 text-xs font-medium text-violet-800 hover:border-violet-300 hover:text-violet-600 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-100 dark:hover:border-violet-400 dark:hover:text-violet-200"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded bg-white/80 dark:bg-[#20242b]">
              {keyItem.image ? (
                <img
                  alt={localizedName(keyItem as unknown as Record<string, unknown>, locale)}
                  className="h-full w-full object-contain"
                  src={keyItem.image}
                />
              ) : null}
            </span>
            <span className="min-w-0 flex-1 truncate">
              {localizedName(keyItem as unknown as Record<string, unknown>, locale)}
            </span>
          </a>
        ))}
      </ExpandableRows>
    </div>
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

function StoryRewardList({
  copy,
  info,
  locale,
}: {
  copy: LiveMapCopy;
  info: StoryInfo;
  locale: Locale;
}) {
  const rewards = info.finish_rewards;

  if (!rewards || (!rewards.trader_standing.length && !rewards.items.length)) {
    return null;
  }

  return (
    <section>
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-300">
        {copy.rewards}
      </h4>
      <div className="space-y-3">
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
      </div>
    </section>
  );
}

function EventRewardList({
  copy,
  info,
  locale,
}: {
  copy: LiveMapCopy;
  info: EventInfo;
  locale: Locale;
}) {
  const rewards = info.finish_rewards;

  if (!rewards || (!rewards.trader_standing.length && !rewards.items.length && !rewards.texts.length)) {
    return null;
  }

  const textGroups = groupRewardTexts(rewards.texts);

  return (
    <section>
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-300">
        {copy.rewards}
      </h4>
      <div className="space-y-3">
        {textGroups.map(([rewardType, texts]) => (
          <RewardBlock
            key={rewardType}
            copy={copy}
            title={getRewardTextTypeLabel(rewardType, locale, copy)}
          >
            {texts.map((reward) => (
              <RewardPill key={reward.id}>
                {localizedDescription(reward as unknown as Record<string, unknown>, locale)}
              </RewardPill>
            ))}
          </RewardBlock>
        ))}
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
      </div>
    </section>
  );
}

function groupRewardTexts(texts: NonNullable<EventInfo["finish_rewards"]>["texts"]) {
  const groups = new Map<string, typeof texts>();

  texts.forEach((reward) => {
    const rewardType = reward.reward_type?.trim() || "etc";
    groups.set(rewardType, [...(groups.get(rewardType) ?? []), reward]);
  });

  return Array.from(groups.entries());
}

function getRewardTextTypeLabel(rewardType: string, locale: Locale, copy: LiveMapCopy) {
  if (rewardType === "experience") {
    return copy.experience;
  }

  if (rewardType === "achievement") {
    return locale === "ko" ? "업적" : locale === "ja" ? "実績" : "Achievement";
  }

  if (rewardType === "etc") {
    return locale === "ko" ? "기타 보상" : locale === "ja" ? "その他の報酬" : "Other Rewards";
  }

  return rewardType;
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
  tone = "default",
}: {
  image: string | null;
  meta: string;
  name: string;
  normalizedName: string;
  tone?: "default" | "success";
}) {
  return (
    <a
      href={`/item/info/${normalizedName}`}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex min-w-0 items-center gap-2 rounded-md border px-2 py-1.5 text-xs font-medium",
        tone === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-300 hover:text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200 dark:hover:border-emerald-400/60 dark:hover:text-emerald-100"
          : "border-gray-200 bg-gray-50 text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-[#3a3d41] dark:bg-[#15171a] dark:text-gray-100 dark:hover:border-orange-500 dark:hover:text-orange-300",
      )}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded bg-white dark:bg-[#20242b]">
        {image ? <img alt={name} className="h-full w-full object-contain" src={image} /> : null}
      </span>
      <span className="min-w-0 flex-1 truncate">{name}</span>
      <span
        className={cn(
          "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold",
          tone === "success"
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-200"
            : "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-300",
        )}
      >
        {meta}
      </span>
    </a>
  );
}

function formatSignedNumber(value: number) {
  return value > 0 ? `+${value}` : String(value);
}
