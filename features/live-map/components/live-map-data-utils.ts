import type { Locale } from "@/i18n/config";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type {
  EventInfo,
  LiveMapEventPoint,
  LiveMapFloor,
  LiveMapObjectivePoint,
  LiveMapPointDetail,
  LiveMapQuestInfo,
  LiveMapQuestPoint,
  LiveMapStaticPoint,
  LiveMapStoryPoint,
  StoryInfo,
} from "@/types/api/live-map";
import type { QuestDetailResponse } from "@/types/api/quest";

import type { LiveMapCopy } from "./live-map-copy";

export type PanelState =
  | { type: "quest"; id: string; info: LiveMapQuestInfo; pointId?: string }
  | { type: "story"; id: string; info: StoryInfo; objectiveId?: string | null; pointId?: string }
  | { type: "event"; id: string; info: EventInfo; objectiveId?: string | null; pointId?: string }
  | { type: "static"; id: string; point: LiveMapStaticPoint };

export type NestedLiveObjective = {
  objective_id: string;
  description_en: string | null;
  description_ko: string | null;
  description_ja: string | null;
  count: number | null;
  is_optional: boolean;
  items: LiveMapQuestInfo["objectives"][number]["items"];
  maps?: Array<{ id: string; normalized_name: string; name_en: string; name_ko: string; name_ja: string }>;
  live_map_points: LiveMapObjectivePoint[];
  children: NestedLiveObjective[];
};

export type StaticEntry = { id: string; point: LiveMapStaticPoint };

export type StaticCategoryGroup = {
  category: string;
  entries: StaticEntry[];
};

export type RightEntry =
  | { id: string; point: LiveMapQuestPoint }
  | { id: string; point: LiveMapStoryPoint }
  | { id: string; point: LiveMapEventPoint }
  | { id: string; point: LiveMapStaticPoint };

export function localizedName(value: Record<string, unknown>, locale: Locale) {
  return String(pickLocalizedField(value, locale, "name") ?? value.name_en ?? "");
}

export function localizedTitle(value: Record<string, unknown>, locale: Locale) {
  return String(pickLocalizedField(value, locale, "title") ?? value.title_en ?? "");
}

export function localizedDescription(value: Record<string, unknown>, locale: Locale) {
  return String(
    pickLocalizedField(value, locale, "description") ?? value.description_en ?? "",
  );
}

export function getFloorLabel(floor: LiveMapFloor, locale: Locale) {
  return localizedName(floor as unknown as Record<string, unknown>, locale);
}

export function getDefaultFloor(floors: LiveMapFloor[]) {
  return floors.find((floor) => Number(floor.floor_no) === 1) ?? floors[0] ?? null;
}

export function getStaticCategoryLabel(category: string, copy: LiveMapCopy) {
  return (
    copy.staticCategories[category as keyof typeof copy.staticCategories] ??
    category
      .split("_")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
}

export function getStaticFaction(point: LiveMapStaticPoint) {
  const rawValue = point.metadata?.raw;

  if (
    rawValue &&
    typeof rawValue === "object" &&
    "faction" in rawValue &&
    typeof rawValue.faction === "string" &&
    rawValue.faction.trim()
  ) {
    return rawValue.faction.trim().toLowerCase();
  }

  return "unknown";
}

export function getStaticFactionLabel(faction: string, copy: LiveMapCopy) {
  return (
    copy.staticFactions[faction as keyof typeof copy.staticFactions] ??
    faction.charAt(0).toUpperCase() + faction.slice(1)
  );
}

export function uniqueById<TItem extends { id: string }>(items: TItem[]) {
  return Array.from(new Map(items.map((item) => [item.id, item])).values());
}

export function groupStaticEntries(entries: StaticEntry[]): StaticCategoryGroup[] {
  const groups = new Map<string, StaticEntry[]>();

  entries.forEach((entry) => {
    const category = entry.point.category || "other";
    groups.set(category, [...(groups.get(category) ?? []), entry]);
  });

  return Array.from(groups.entries())
    .map(([category, groupEntries]) => ({
      category,
      entries: groupEntries.sort((left, right) =>
        localizedName(left.point as unknown as Record<string, unknown>, "en").localeCompare(
          localizedName(right.point as unknown as Record<string, unknown>, "en"),
        ),
      ),
    }))
    .sort((left, right) => {
      const categoryOrder = [
        "extract",
        "transit",
        "transit_switch",
        "stationary_weapon",
        "btr_stop",
        "boss_spawn",
        "sniper_spawn",
        "pmc_spawn",
        "scav_spawn",
        "cultist_spawn",
        "rogue_spawn",
        "raider_spawn",
        "black_div_spawn",
        "bloodhounds_spawn",
        "goons_spawn",
      ];
      const leftIndex = categoryOrder.indexOf(left.category);
      const rightIndex = categoryOrder.indexOf(right.category);

      if (leftIndex !== -1 || rightIndex !== -1) {
        return (leftIndex === -1 ? categoryOrder.length : leftIndex) -
          (rightIndex === -1 ? categoryOrder.length : rightIndex);
      }

      return left.category.localeCompare(right.category);
    });
}

export function parseCanvasMarkerId(markerId: string) {
  const separatorIndex = markerId.indexOf(":");

  if (separatorIndex === -1) {
    return { id: markerId, kind: markerId };
  }

  return {
    id: markerId.slice(separatorIndex + 1),
    kind: markerId.slice(0, separatorIndex),
  };
}

export function getQuestId(point: LiveMapQuestPoint) {
  return point.quest_info?.quest?.id ?? point.id;
}

export function getStoryId(point: LiveMapStoryPoint) {
  return point.story_info?.story.id ?? point.story_id;
}

export function getEventId(point: LiveMapEventPoint) {
  return point.event_info?.event.id ?? point.event_id;
}

export function toLiveMapQuestInfo(response: QuestDetailResponse): LiveMapQuestInfo {
  return {
    finish_rewards: response.finish_rewards,
    next_quests: response.next_quests,
    objectives: response.objectives.map((objective) => ({
      ...objective,
      live_map_point: null,
      live_map_points: [],
      type: objective.type,
    })),
    quest: response.quest,
    require_quests: response.require_quests,
    trader: response.trader,
  };
}

export function getLocalizedDetailText(detail: LiveMapPointDetail, locale: Locale) {
  const localizedValue = pickLocalizedField(
    detail as unknown as Record<string, unknown>,
    locale,
    "description",
  );

  return typeof localizedValue === "string" ? localizedValue.trim() : "";
}

export function getPointDetailText(
  point: LiveMapObjectivePoint | null | undefined,
  locale: Locale,
) {
  return point?.details.map((detail) => getLocalizedDetailText(detail, locale)).find(Boolean) ?? "";
}

export function getQuestObjectivePoints(
  objective: LiveMapQuestInfo["objectives"][number] | null | undefined,
) {
  if (!objective) {
    return [];
  }

  if ((objective.live_map_points?.length ?? 0) > 0) {
    return objective.live_map_points ?? [];
  }

  return objective.live_map_point ? [objective.live_map_point] : [];
}

export function getQuestObjectivePoint(
  objective: LiveMapQuestInfo["objectives"][number] | null | undefined,
  pointId?: string,
) {
  const points = getQuestObjectivePoints(objective);

  if (pointId) {
    return points.find((point) => point.id === pointId) ?? null;
  }

  return objective?.live_map_point ?? points[0] ?? null;
}

export function getObjectivePointMap(
  point: LiveMapObjectivePoint | null | undefined,
  maps: Array<{ id: string; normalized_name: string; name_en: string; name_ko: string; name_ja: string }>,
) {
  if (!point) {
    return null;
  }

  return point.map ?? maps.find((map) => map.id === point.map_id) ?? null;
}

export function isRemoteObjectivePoint(
  point: LiveMapObjectivePoint | null | undefined,
  maps: Array<{ id: string; normalized_name: string; name_en: string; name_ko: string; name_ja: string }>,
  normalizedName: string,
) {
  const map = getObjectivePointMap(point, maps);

  return Boolean(map?.normalized_name && map.normalized_name !== normalizedName);
}

export function getQuestObjectiveText(
  objective: LiveMapQuestInfo["objectives"][number] | null | undefined,
  locale: Locale,
  pointId?: string,
) {
  if (!objective) {
    return "";
  }

  return (
    getPointDetailText(getQuestObjectivePoint(objective, pointId), locale) ||
    localizedDescription(objective as unknown as Record<string, unknown>, locale)
  );
}

export function getQuestObjectiveDescription(
  objective: LiveMapQuestInfo["objectives"][number] | null | undefined,
  locale: Locale,
) {
  return objective
    ? localizedDescription(objective as unknown as Record<string, unknown>, locale)
    : "";
}

export function findQuestObjectiveByPointId(info: LiveMapQuestInfo, pointId: string) {
  return (
    info.objectives.find((objective) =>
      getQuestObjectivePoints(objective).some((point) => point.id === pointId),
    ) ?? null
  );
}

export function findNestedObjectiveByPoint(
  objectives: NestedLiveObjective[],
  pointId: string,
  objectiveId: string | null,
): NestedLiveObjective | null {
  for (const objective of objectives) {
    const isTargetObjective = objectiveId !== null && objective.objective_id === objectiveId;
    const hasTargetPoint = objective.live_map_points.some((point) => point.id === pointId);

    if (isTargetObjective || hasTargetPoint) {
      return objective;
    }

    const childObjective = findNestedObjectiveByPoint(objective.children, pointId, objectiveId);

    if (childObjective) {
      return childObjective;
    }
  }

  return null;
}

export function getNestedObjectiveText(
  objective: NestedLiveObjective | null | undefined,
  pointId: string | undefined,
  locale: Locale,
) {
  if (!objective) {
    return "";
  }

  const selectedPoint = pointId
    ? objective.live_map_points.find((point) => point.id === pointId)
    : objective.live_map_points[0];

  return (
    getPointDetailText(selectedPoint, locale) ||
    localizedDescription(objective as unknown as Record<string, unknown>, locale)
  );
}

export function getNestedObjectiveDescription(
  objective: NestedLiveObjective | null | undefined,
  locale: Locale,
) {
  return objective
    ? localizedDescription(objective as unknown as Record<string, unknown>, locale)
    : "";
}

export function getQuestPointLabel(point: LiveMapQuestPoint, locale: Locale) {
  if (!point.quest_info) {
    return point.id;
  }

  const objectiveText = point.quest_info.objective
    ? localizedDescription(point.quest_info.objective as unknown as Record<string, unknown>, locale)
    : "";

  return (
    objectiveText ||
    (point.quest_info.quest
      ? localizedName(point.quest_info.quest as unknown as Record<string, unknown>, locale)
      : point.id)
  );
}

export function getStoryPointLabel(point: LiveMapStoryPoint, locale: Locale) {
  if (!point.story_info) {
    return point.id;
  }

  const objectiveText = point.story_info.objective
    ? localizedDescription(point.story_info.objective as unknown as Record<string, unknown>, locale)
    : "";

  return objectiveText || localizedTitle(point.story_info.story as unknown as Record<string, unknown>, locale);
}

export function getEventPointLabel(point: LiveMapEventPoint, locale: Locale) {
  if (!point.event_info) {
    return point.id;
  }

  const objectiveText = point.event_info.objective
    ? localizedDescription(point.event_info.objective as unknown as Record<string, unknown>, locale)
    : "";

  return objectiveText || localizedTitle(point.event_info.event as unknown as Record<string, unknown>, locale);
}

export function getEntryLabel(entry: RightEntry, locale: Locale) {
  if ("quest_info" in entry.point) {
    return entry.point.quest_info
      ? entry.point.quest_info.quest
        ? localizedName(entry.point.quest_info.quest as unknown as Record<string, unknown>, locale)
        : entry.id
      : entry.id;
  }

  if ("story_info" in entry.point) {
    return entry.point.story_info
      ? localizedTitle(entry.point.story_info.story as unknown as Record<string, unknown>, locale)
      : entry.id;
  }

  if ("event_info" in entry.point) {
    return entry.point.event_info
      ? localizedTitle(entry.point.event_info.event as unknown as Record<string, unknown>, locale)
      : entry.id;
  }

  return localizedName(entry.point as unknown as Record<string, unknown>, locale);
}

export function getQuestMarkerSearchText(point: LiveMapQuestPoint, locale: Locale) {
  if (!point.quest_info) {
    return point.id;
  }

  return [
    point.quest_info.quest
      ? localizedName(point.quest_info.quest as unknown as Record<string, unknown>, locale)
      : "",
    getQuestPointLabel(point, locale),
  ].join(" ");
}

export function getStoryMarkerSearchText(point: LiveMapStoryPoint, locale: Locale) {
  if (!point.story_info) {
    return point.id;
  }

  return [
    localizedTitle(point.story_info.story as unknown as Record<string, unknown>, locale),
    getStoryPointLabel(point, locale),
  ].join(" ");
}

export function getEventMarkerSearchText(point: LiveMapEventPoint, locale: Locale) {
  if (!point.event_info) {
    return point.id;
  }

  return [
    localizedTitle(point.event_info.event as unknown as Record<string, unknown>, locale),
    getEventPointLabel(point, locale),
  ].join(" ");
}

export function getStaticMarkerSearchText(
  point: LiveMapStaticPoint,
  locale: Locale,
  copy: LiveMapCopy,
) {
  return [
    localizedName(point as unknown as Record<string, unknown>, locale),
    localizedDescription(point as unknown as Record<string, unknown>, locale),
    getStaticCategoryLabel(point.category, copy),
  ].join(" ");
}

export function matchesFilterText(value: string, query: string) {
  return value.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
}
