"use client";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import type React from "react";
import { Children, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { LatLng } from "leaflet";
import {
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  Flag,
  Layers,
  LocateFixed,
  MapPinned,
  Route,
  Search,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import { getQuestCompletionGraph, getQuestDetail } from "@/features/quest/api";
import { getUserRoadmap, saveRoadmap } from "@/features/roadmap/api";
import type { Locale } from "@/i18n/config";
import {
  createQuestCompletionMap,
  toggleQuestCompletion,
} from "@/lib/quest/quest-completion";
import { cn } from "@/lib/utils/class-name";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import { useWsStore } from "@/store/ws-store";
import type {
  EventInfo,
  EventObjective,
  LiveMapEventPoint,
  LiveMapFloor,
  LiveMapObjectivePoint,
  LiveMapPageData,
  LiveMapPointDetail,
  LiveMapQuestInfo,
  LiveMapQuestPoint,
  LiveMapStaticPoint,
  LiveMapStoryPoint,
  StoryInfo,
  StoryObjective,
} from "@/types/api/live-map";
import type { QuestCompletionGraphNode, QuestDetailResponse } from "@/types/api/quest";
import type { LiveMapCanvasMarker, LiveMapPopupImage } from "./live-map-canvas";
import { findFloorForHeight, parseWhereText, type LiveMapLocation } from "./live-map-utils";

const LiveMapCanvas = dynamic(
  () => import("./live-map-canvas").then((mod) => mod.LiveMapCanvas),
  { ssr: false },
);

const KAPPA_IMAGE = "https://assets.tarkov.dev/5c093ca986f7740a1867ab12-8x.webp";

type PanelState =
  | { type: "quest"; id: string; info: LiveMapQuestInfo; pointId?: string }
  | { type: "story"; id: string; info: StoryInfo; objectiveId?: string | null; pointId?: string }
  | { type: "event"; id: string; info: EventInfo; objectiveId?: string | null; pointId?: string }
  | { type: "static"; id: string; point: LiveMapStaticPoint };

type NestedLiveObjective = {
  objective_id: string;
  description_en: string | null;
  description_ko: string | null;
  description_ja: string | null;
  count: number | null;
  is_optional: boolean;
  items: LiveMapQuestInfo["objectives"][number]["items"];
  live_map_points: LiveMapObjectivePoint[];
  children: NestedLiveObjective[];
};

type StaticEntry = { id: string; point: LiveMapStaticPoint };

type StaticCategoryGroup = {
  category: string;
  entries: StaticEntry[];
};

const copyByLocale = {
  ko: {
    title: "Live Map",
    locate: "Locate",
    placeholder: "좌표 또는 스크린샷 파일명을 입력하세요",
    map: "지도",
    floor: "층",
    coordinates: "좌표",
    height: "높이",
    quests: "퀘스트",
    stories: "스토리",
    events: "이벤트",
    staticPoints: "위치",
    staticCategoryAll: "전체",
    staticCategories: {
      extract: "탈출구",
      stationary_weapon: "고정 무기",
      transit: "이동 경로",
      transit_switch: "이동 스위치",
    },
    allOnOff: "ALL ON/OFF",
    save: "저장",
    saved: "저장되었습니다.",
    loginRequired: "로그인이 필요합니다.",
    noItems: "표시할 항목이 없습니다.",
    showMore: "더 보기",
    showLess: "접기",
    progress: "진행 중",
    completed: "완료",
    requirements: "선행 조건",
    objectives: "목표",
    requiredItems: "필요 아이템",
    rewards: "보상",
    minPlayerLevel: "최소 레벨",
    experience: "경험치",
    traderStanding: "상인 평판",
    rewardItems: "보상 아이템",
    unlocks: "해금",
    skills: "스킬",
    crafts: "제작",
    previous: "이전",
    next: "다음",
    noCoordinateInfo: "이 지도는 아직 위치 좌표 메타데이터가 없습니다.",
    noFloors: "표시할 지도 층 데이터가 없습니다.",
    guideTitle: "내 위치 찾기",
    guide:
      "where-am-i 프로그램에서 전달된 위치가 자동으로 반영됩니다. 직접 사용할 때는 스크린샷 파일명을 붙여넣고 Locate를 누르세요.",
  },
  en: {
    title: "Live Map",
    locate: "Locate",
    placeholder: "Enter coordinates or screenshot filename",
    map: "Map",
    floor: "Floor",
    coordinates: "Coordinates",
    height: "Height",
    quests: "Quests",
    stories: "Stories",
    events: "Events",
    staticPoints: "Locations",
    staticCategoryAll: "All",
    staticCategories: {
      extract: "Extracts",
      stationary_weapon: "Stationary Weapons",
      transit: "Transits",
      transit_switch: "Transit Switches",
    },
    allOnOff: "ALL ON/OFF",
    save: "Save",
    saved: "Saved.",
    loginRequired: "Sign in required.",
    noItems: "No items to show.",
    showMore: "Show more",
    showLess: "Show less",
    progress: "Progress",
    completed: "Completed",
    requirements: "Requirements",
    objectives: "Objectives",
    requiredItems: "Required Items",
    rewards: "Rewards",
    minPlayerLevel: "Minimum Level",
    experience: "Experience",
    traderStanding: "Trader Standing",
    rewardItems: "Reward Items",
    unlocks: "Unlocks",
    skills: "Skills",
    crafts: "Crafts",
    previous: "Previous",
    next: "Next",
    noCoordinateInfo: "This map does not have coordinate metadata yet.",
    noFloors: "No map floor data is available.",
    guideTitle: "Find My Location",
    guide:
      "Locations sent by the where-am-i program appear automatically. To use it manually, paste the screenshot filename and press Locate.",
  },
  ja: {
    title: "Live Map",
    locate: "Locate",
    placeholder: "座標またはスクリーンショット名を入力",
    map: "マップ",
    floor: "階",
    coordinates: "座標",
    height: "高さ",
    quests: "クエスト",
    stories: "ストーリー",
    events: "イベント",
    staticPoints: "位置",
    staticCategoryAll: "全体",
    staticCategories: {
      extract: "脱出口",
      stationary_weapon: "固定武器",
      transit: "移動ルート",
      transit_switch: "移動スイッチ",
    },
    allOnOff: "ALL ON/OFF",
    save: "保存",
    saved: "保存しました。",
    loginRequired: "ログインが必要です。",
    noItems: "表示する項目がありません。",
    showMore: "もっと見る",
    showLess: "閉じる",
    progress: "進行中",
    completed: "完了",
    requirements: "前提条件",
    objectives: "目標",
    requiredItems: "必要アイテム",
    rewards: "報酬",
    minPlayerLevel: "必要レベル",
    experience: "経験値",
    traderStanding: "トレーダー評価",
    rewardItems: "報酬アイテム",
    unlocks: "アンロック",
    skills: "スキル",
    crafts: "制作",
    previous: "前",
    next: "次",
    noCoordinateInfo: "このマップにはまだ座標メタデータがありません。",
    noFloors: "表示できるフロアデータがありません。",
    guideTitle: "位置確認",
    guide:
      "where-am-iプログラムから送信された位置は自動で反映されます。手動ではスクリーンショット名を貼り付けてLocateを押してください。",
  },
} as const;

function localizedName(value: Record<string, unknown>, locale: Locale) {
  return String(pickLocalizedField(value, locale, "name") ?? value.name_en ?? "");
}

function localizedTitle(value: Record<string, unknown>, locale: Locale) {
  return String(pickLocalizedField(value, locale, "title") ?? value.title_en ?? "");
}

function localizedDescription(value: Record<string, unknown>, locale: Locale) {
  return String(
    pickLocalizedField(value, locale, "description") ?? value.description_en ?? "",
  );
}

function getFloorLabel(floor: LiveMapFloor, locale: Locale) {
  return localizedName(floor as unknown as Record<string, unknown>, locale);
}

function getStaticCategoryLabel(
  category: string,
  copy: (typeof copyByLocale)[Locale],
) {
  return (
    copy.staticCategories[category as keyof typeof copy.staticCategories] ??
    category
      .split("_")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
}

function uniqueById<TItem extends { id: string }>(items: TItem[]) {
  return Array.from(new Map(items.map((item) => [item.id, item])).values());
}

function groupStaticEntries(entries: StaticEntry[]): StaticCategoryGroup[] {
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
      const categoryOrder = ["extract", "transit", "transit_switch", "stationary_weapon"];
      const leftIndex = categoryOrder.indexOf(left.category);
      const rightIndex = categoryOrder.indexOf(right.category);

      if (leftIndex !== -1 || rightIndex !== -1) {
        return (leftIndex === -1 ? categoryOrder.length : leftIndex) -
          (rightIndex === -1 ? categoryOrder.length : rightIndex);
      }

      return left.category.localeCompare(right.category);
    });
}

function parseCanvasMarkerId(markerId: string) {
  const separatorIndex = markerId.indexOf(":");

  if (separatorIndex === -1) {
    return { id: markerId, kind: markerId };
  }

  return {
    id: markerId.slice(separatorIndex + 1),
    kind: markerId.slice(0, separatorIndex),
  };
}

function getQuestId(point: LiveMapQuestPoint) {
  return point.quest_info?.quest.id ?? point.id;
}

function getStoryId(point: LiveMapStoryPoint) {
  return point.story_info?.story.id ?? point.story_id;
}

function getEventId(point: LiveMapEventPoint) {
  return point.event_info?.event.id ?? point.event_id;
}

function toLiveMapQuestInfo(response: QuestDetailResponse): LiveMapQuestInfo {
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getLocalizedDetailText(detail: LiveMapPointDetail, locale: Locale) {
  return localizedDescription(detail as unknown as Record<string, unknown>, locale).trim();
}

function getPointDetailText(
  point: LiveMapObjectivePoint | null | undefined,
  locale: Locale,
) {
  return point?.details.map((detail) => getLocalizedDetailText(detail, locale)).find(Boolean) ?? "";
}

function getQuestObjectivePoints(
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

function getQuestObjectivePoint(
  objective: LiveMapQuestInfo["objectives"][number] | null | undefined,
  pointId?: string,
) {
  const points = getQuestObjectivePoints(objective);

  if (pointId) {
    return points.find((point) => point.id === pointId) ?? null;
  }

  return objective?.live_map_point ?? points[0] ?? null;
}

function getQuestObjectiveText(
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

function getQuestObjectiveDescription(
  objective: LiveMapQuestInfo["objectives"][number] | null | undefined,
  locale: Locale,
) {
  return objective
    ? localizedDescription(objective as unknown as Record<string, unknown>, locale)
    : "";
}

function findQuestObjectiveByPointId(info: LiveMapQuestInfo, pointId: string) {
  return (
    info.objectives.find((objective) =>
      getQuestObjectivePoints(objective).some((point) => point.id === pointId),
    ) ?? null
  );
}

function findNestedObjectiveByPoint(
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

function getNestedObjectiveText(
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

function getNestedObjectiveDescription(
  objective: NestedLiveObjective | null | undefined,
  locale: Locale,
) {
  return objective
    ? localizedDescription(objective as unknown as Record<string, unknown>, locale)
    : "";
}

function getQuestPointLabel(point: LiveMapQuestPoint, locale: Locale) {
  if (!point.quest_info) {
    return point.id;
  }

  const objective = findQuestObjectiveByPointId(point.quest_info, point.id);

  return (
    getQuestObjectiveText(objective, locale, point.id) ||
    localizedName(point.quest_info.quest as unknown as Record<string, unknown>, locale)
  );
}

function getStoryPointLabel(point: LiveMapStoryPoint, locale: Locale) {
  if (!point.story_info) {
    return point.id;
  }

  const objective = findNestedObjectiveByPoint(
    point.story_info.objectives,
    point.id,
    point.objective_id,
  );

  return (
    getNestedObjectiveText(objective, point.id, locale) ||
    localizedTitle(point.story_info.story as unknown as Record<string, unknown>, locale)
  );
}

function getEventPointLabel(point: LiveMapEventPoint, locale: Locale) {
  if (!point.event_info) {
    return point.id;
  }

  const objective = findNestedObjectiveByPoint(
    point.event_info.objectives,
    point.id,
    point.objective_id,
  );

  return (
    getNestedObjectiveText(objective, point.id, locale) ||
    localizedTitle(point.event_info.event as unknown as Record<string, unknown>, locale)
  );
}

function getPopupImages(details: LiveMapPointDetail[]) {
  return details
    .filter((detail) => detail.image)
    .map((detail) => ({
      alt: detail.description_en ?? detail.description_ko ?? detail.description_ja ?? "",
      src: detail.image ?? "",
    }));
}

function createMarkerPopupHtml({
  description,
  images,
  location,
  title,
  titleImage,
}: {
  description: string;
  images: Array<{ alt: string; src: string }>;
  location: string;
  title: string;
  titleImage?: string | null;
}) {
  const firstImage = images[0];
  const thumbnails = images
    .map(
      (image, index) => `
        <button
          class="live-map-popup-thumb ${index === 0 ? "live-map-popup-thumb-active" : ""}"
          type="button"
          data-index="${index}"
          data-src="${escapeHtml(image.src)}"
          data-alt="${escapeHtml(image.alt)}"
        >
          <img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt)}" />
        </button>
      `,
    )
    .join("");

  return `
    <div class="live-map-popup-card">
      <div class="live-map-popup-header">
        ${
          titleImage
            ? `<img class="live-map-popup-avatar" src="${escapeHtml(titleImage)}" alt="" />`
            : ""
        }
        <strong>${escapeHtml(title)}</strong>
      </div>
      <div class="live-map-popup-body">
        ${
          description
            ? `<p class="live-map-popup-description">${escapeHtml(description)}</p>`
            : ""
        }
      </div>
      ${
        firstImage
          ? `<div class="live-map-popup-media">
              <img class="live-map-popup-image" src="${escapeHtml(firstImage.src)}" data-full-src="${escapeHtml(firstImage.src)}" alt="${escapeHtml(firstImage.alt)}" />
              ${images.length > 1 ? `<span class="live-map-popup-count">1 / ${images.length}</span>` : ""}
            </div>`
          : ""
      }
      <div class="live-map-popup-body live-map-popup-body-compact">
        ${location ? `<p class="live-map-popup-location">${escapeHtml(location)}</p>` : ""}
      </div>
      ${thumbnails ? `<div class="live-map-popup-thumbs">${thumbnails}</div>` : ""}
    </div>
  `;
}

function getQuestPointPopupHtml(point: LiveMapQuestPoint, locale: Locale) {
  if (!point.quest_info) {
    return undefined;
  }

  const objective = findQuestObjectiveByPointId(point.quest_info, point.id);
  const selectedPoint = getQuestObjectivePoint(objective, point.id);
  const details = selectedPoint?.details ?? [];

  return createMarkerPopupHtml({
    description: getQuestObjectiveDescription(objective, locale),
    images: getPopupImages(details),
    location: getPointDetailText(selectedPoint, locale),
    title: localizedName(point.quest_info.quest as unknown as Record<string, unknown>, locale),
    titleImage: point.quest_info.trader?.image,
  });
}

function getStoryPointPopupHtml(point: LiveMapStoryPoint, locale: Locale) {
  if (!point.story_info) {
    return undefined;
  }

  const objective = findNestedObjectiveByPoint(
    point.story_info.objectives,
    point.id,
    point.objective_id,
  );
  const selectedPoint = objective?.live_map_points.find((entry) => entry.id === point.id);
  const details = selectedPoint?.details ?? [];

  return createMarkerPopupHtml({
    description: getNestedObjectiveDescription(objective, locale),
    images: getPopupImages(details),
    location: getPointDetailText(selectedPoint, locale),
    title: localizedTitle(point.story_info.story as unknown as Record<string, unknown>, locale),
  });
}

function getEventPointPopupHtml(point: LiveMapEventPoint, locale: Locale) {
  if (!point.event_info) {
    return undefined;
  }

  const objective = findNestedObjectiveByPoint(
    point.event_info.objectives,
    point.id,
    point.objective_id,
  );
  const selectedPoint = objective?.live_map_points.find((entry) => entry.id === point.id);
  const details = selectedPoint?.details ?? [];

  return createMarkerPopupHtml({
    description: getNestedObjectiveDescription(objective, locale),
    images: getPopupImages(details),
    location: getPointDetailText(selectedPoint, locale),
    title: localizedTitle(point.event_info.event as unknown as Record<string, unknown>, locale),
    titleImage: point.event_info.trader?.image,
  });
}

function getStaticPointPopupHtml(
  point: LiveMapStaticPoint,
  locale: Locale,
  copy: (typeof copyByLocale)[Locale],
) {
  const title = localizedName(point as unknown as Record<string, unknown>, locale);
  const description = localizedDescription(point as unknown as Record<string, unknown>, locale);
  const image = point.image
    ? [{
        alt: title,
        src: point.image,
      }]
    : [];

  return createMarkerPopupHtml({
    description,
    images: image,
    location: getStaticCategoryLabel(point.category, copy),
    title,
  });
}

export function LiveMapPage({
  data,
  locale,
  normalizedName,
}: {
  data: LiveMapPageData;
  locale: Locale;
  normalizedName: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const focusedMarkerId = searchParams.get("focus");
  const copy = copyByLocale[locale];
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const websocketLocation = useWsStore((state) => state.location);
  const previousLocationRef = useRef<string | null>(null);
  const [where, setWhere] = useState("");
  const [location, setLocation] = useState<LiveMapLocation | null>(null);
  const [mousePosition, setMousePosition] = useState<LatLng | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isMapSelectorOpen, setIsMapSelectorOpen] = useState(false);
  const [panel, setPanel] = useState<PanelState | null>(null);
  const [imagePopup, setImagePopup] = useState<LiveMapPopupImage | null>(null);
  const [notice, setNotice] = useState("");
  const [loadingQuestNormalizedName, setLoadingQuestNormalizedName] = useState<string | null>(null);
  const [savingQuestId, setSavingQuestId] = useState<string | null>(null);
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([]);
  const [completionGraph, setCompletionGraph] = useState<QuestCompletionGraphNode[]>([]);
  const [selectedStaticId, setSelectedStaticId] = useState<string | null>(null);
  const questById = useMemo(
    () => createQuestCompletionMap(completionGraph),
    [completionGraph],
  );
  const sortedFloors = useMemo(
    () => [...data.floors].sort((left, right) => left.floor_no - right.floor_no),
    [data.floors],
  );
  const defaultFloor =
    sortedFloors.find((floor) => floor.floor_no === 1) ?? sortedFloors[0] ?? null;
  const defaultFloorId = defaultFloor?.id ?? "";
  const [selectedFloorId, setSelectedFloorId] = useState(() => defaultFloorId);
  const selectedMap =
    data.map_selector.find((entry) => entry.normalized_name === normalizedName) ??
    data.map_selector[0];
  const selectedFloor =
    sortedFloors.find((floor) => floor.id === selectedFloorId) ?? defaultFloor;

  const questEntries = useMemo(
    () => uniqueById(data.quest_points.filter((point) => point.quest_info).map((point) => ({
      id: getQuestId(point),
      point,
    }))),
    [data.quest_points],
  );
  const storyEntries = useMemo(
    () => uniqueById(data.story_points.filter((point) => point.story_info).map((point) => ({
      id: getStoryId(point),
      point,
    }))),
    [data.story_points],
  );
  const eventEntries = useMemo(
    () => uniqueById(data.event_points.filter((point) => point.event_info).map((point) => ({
      id: getEventId(point),
      point,
    }))),
    [data.event_points],
  );
  const staticEntries = useMemo<StaticEntry[]>(
    () => uniqueById(data.static_points.map((point) => ({ id: point.id, point }))),
    [data.static_points],
  );
  const staticGroups = useMemo(() => groupStaticEntries(staticEntries), [staticEntries]);
  const [enabledQuestIds, setEnabledQuestIds] = useState<Set<string>>(new Set());
  const [enabledStoryIds, setEnabledStoryIds] = useState<Set<string>>(new Set());
  const [enabledEventIds, setEnabledEventIds] = useState<Set<string>>(new Set());
  const [enabledStaticIds, setEnabledStaticIds] = useState<Set<string>>(new Set());
  const [expandedStaticCategories, setExpandedStaticCategories] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    setEnabledQuestIds(new Set(questEntries.map((entry) => entry.id)));
  }, [questEntries]);

  useEffect(() => {
    setEnabledQuestIds((current) => {
      const next = new Set(current);

      completedQuestIds.forEach((questId) => next.delete(questId));

      return next;
    });
  }, [completedQuestIds]);

  useEffect(() => {
    setEnabledStoryIds(new Set(storyEntries.map((entry) => entry.id)));
  }, [storyEntries]);

  useEffect(() => {
    setEnabledEventIds(new Set(eventEntries.map((entry) => entry.id)));
  }, [eventEntries]);

  useEffect(() => {
    setEnabledStaticIds(new Set(staticEntries.map((entry) => entry.id)));
  }, [staticEntries]);

  useEffect(() => {
    setExpandedStaticCategories(new Set(staticGroups.map((group) => group.category)));
  }, [staticGroups]);

  useEffect(() => {
    let cancelled = false;

    getQuestCompletionGraph()
      .then((graph) => {
        if (!cancelled) {
          setCompletionGraph(graph);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCompletionGraph([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    if (!accessToken) {
      setCompletedQuestIds([]);
      return;
    }

    getUserRoadmap(accessToken)
      .then((questList) => {
        if (!cancelled) {
          setCompletedQuestIds(questList.filter((value): value is string => typeof value === "string"));
        }
      })
      .catch(() => {
        if (!cancelled) {
          showNotice(copy.loginRequired);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [accessToken, copy.loginRequired]);

  const visibleMarkers = useMemo<LiveMapCanvasMarker[]>(() => {
    const questMarkers = data.quest_points
      .filter((point) => {
        const questId = getQuestId(point);

        return (
          point.quest_info &&
          enabledQuestIds.has(questId) &&
          !completedQuestIds.includes(questId)
        );
      })
      .map<LiveMapCanvasMarker>((point) => ({
        floorId: point.floor_id,
        id: `quest:${point.id}`,
        kind: "quest",
        label: getQuestPointLabel(point, locale),
        popupHtml: getQuestPointPopupHtml(point, locale),
        x: point.x,
        y: point.z,
      }));
    const storyMarkers = data.story_points
      .filter((point) => point.story_info && enabledStoryIds.has(getStoryId(point)))
      .map<LiveMapCanvasMarker>((point) => ({
        floorId: point.floor_id,
        id: `story:${point.id}`,
        kind: "story",
        label: getStoryPointLabel(point, locale),
        popupHtml: getStoryPointPopupHtml(point, locale),
        x: point.x,
        y: point.z,
      }));
    const eventMarkers = data.event_points
      .filter((point) => point.event_info && enabledEventIds.has(getEventId(point)))
      .map<LiveMapCanvasMarker>((point) => ({
        floorId: point.floor_id,
        id: `event:${point.id}`,
        kind: "event",
        label: getEventPointLabel(point, locale),
        popupHtml: getEventPointPopupHtml(point, locale),
        x: point.x,
        y: point.z,
      }));
    const staticMarkers = data.static_points
      .filter((point) => enabledStaticIds.has(point.id))
      .map<LiveMapCanvasMarker>((point) => ({
        floorId: point.floor_id,
        id: `static:${point.id}`,
        kind: "static",
        label: localizedName(point as unknown as Record<string, unknown>, locale),
        popupHtml: getStaticPointPopupHtml(point, locale, copy),
        x: point.x,
        y: point.z,
      }));

    return [...questMarkers, ...storyMarkers, ...eventMarkers, ...staticMarkers];
  }, [
    data.event_points,
    data.quest_points,
    data.static_points,
    data.story_points,
    completedQuestIds,
    enabledEventIds,
    enabledQuestIds,
    enabledStaticIds,
    enabledStoryIds,
    copy,
    locale,
  ]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function applyWhereText(text: string) {
    const parsed = parseWhereText(text);
    setLocation(parsed);

    if (!parsed) {
      return;
    }

    const matchedFloor = findFloorForHeight(sortedFloors, parsed.z);

    if (matchedFloor) {
      setSelectedFloorId(matchedFloor.id);
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text");
    setWhere(pastedText);
    window.setTimeout(() => applyWhereText(pastedText), 0);
  }

  const openImagePopup = useCallback((image: LiveMapPopupImage) => {
    setImagePopup(image);
  }, []);

  const focusQuestObjective = useCallback(
    (objective: LiveMapQuestInfo["objectives"][number], questId: string) => {
      const point = getQuestObjectivePoint(objective);

      if (!point) {
        return;
      }

      const targetMap =
        point.map?.normalized_name ??
        objective.maps.find((map) => map.id === point.map_id)?.normalized_name ??
        objective.maps[0]?.normalized_name ??
        normalizedName;
      const focus = `quest:${point.id}`;

      setEnabledQuestIds((current) => new Set([...current, questId]));

      if (point.floor_id) {
        setSelectedFloorId(point.floor_id);
      }

      if (targetMap === normalizedName) {
        if (focusedMarkerId !== focus) {
          router.replace(`/live-map/${normalizedName}?focus=${encodeURIComponent(focus)}`, {
            scroll: false,
          });
        }
        return;
      }

      setPanel(null);
      setSelectedStaticId(null);
      router.push(`/live-map/${targetMap}?focus=${encodeURIComponent(focus)}`, {
        scroll: false,
      });
    },
    [focusedMarkerId, normalizedName, router],
  );

  const focusStoryObjective = useCallback(
    (objective: StoryObjective, storyId: string) => {
      const point = objective.live_map_points[0];

      if (!point) {
        return;
      }

      const targetMap =
        objective.maps.find((map) => map.id === point.map_id)?.normalized_name ??
        objective.maps[0]?.normalized_name ??
        normalizedName;
      const focus = `story:${point.id}`;

      setEnabledStoryIds((current) => new Set([...current, storyId]));

      if (point.floor_id) {
        setSelectedFloorId(point.floor_id);
      }

      if (targetMap === normalizedName) {
        if (focusedMarkerId !== focus) {
          router.replace(`/live-map/${normalizedName}?focus=${encodeURIComponent(focus)}`, {
            scroll: false,
          });
        }
        return;
      }

      setPanel(null);
      setSelectedStaticId(null);
      router.push(`/live-map/${targetMap}?focus=${encodeURIComponent(focus)}`, {
        scroll: false,
      });
    },
    [focusedMarkerId, normalizedName, router],
  );

  const focusStaticPoint = useCallback(
    (entry: StaticEntry) => {
      const focus = `static:${entry.point.id}`;

      setSelectedStaticId(entry.id);
      setPanel((current) => (current?.type === "static" ? null : current));
      setEnabledStaticIds((current) => new Set([...current, entry.id]));
      setExpandedStaticCategories((current) => new Set([...current, entry.point.category || "other"]));

      if (entry.point.floor_id) {
        setSelectedFloorId(entry.point.floor_id);
      }

      if (focusedMarkerId !== focus) {
        router.replace(`/live-map/${normalizedName}?focus=${encodeURIComponent(focus)}`, {
          scroll: false,
        });
      }
    },
    [focusedMarkerId, normalizedName, router],
  );

  function toggleSet(setter: React.Dispatch<React.SetStateAction<Set<string>>>, id: string) {
    setter((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }

  function toggleAll(
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    ids: string[],
  ) {
    setter((current) => (current.size === ids.length ? new Set() : new Set(ids)));
  }

  const openPanelForMarkerId = useCallback(
    (markerId: string, { openStaticPanel = false }: { openStaticPanel?: boolean } = {}) => {
      const { id, kind } = parseCanvasMarkerId(markerId);

      if (kind === "quest") {
        const point = data.quest_points.find((entry) => entry.id === id);
        if (point?.quest_info) {
          setPanel({
            id: getQuestId(point),
            info: point.quest_info,
            pointId: point.id,
            type: "quest",
          });
        }
      }

      if (kind === "story") {
        const point = data.story_points.find((entry) => entry.id === id);
        if (point?.story_info) {
          setPanel({
            id: getStoryId(point),
            info: point.story_info,
            objectiveId: point.objective_id,
            pointId: point.id,
            type: "story",
          });
        }
      }

      if (kind === "event") {
        const point = data.event_points.find((entry) => entry.id === id);
        if (point?.event_info) {
          setPanel({
            id: getEventId(point),
            info: point.event_info,
            objectiveId: point.objective_id,
            pointId: point.id,
            type: "event",
          });
        }
      }

      if (kind === "static") {
        const point = data.static_points.find((entry) => entry.id === id);
        if (point) {
          setSelectedStaticId(point.id);
          setExpandedStaticCategories((current) => new Set([...current, point.category || "other"]));
          setPanel((current) =>
            openStaticPanel
              ? { id: point.id, point, type: "static" }
              : current?.type === "static"
                ? null
                : current,
          );
        }
      }
    },
    [data.event_points, data.quest_points, data.static_points, data.story_points],
  );

  const openPanelForMarker = useCallback(
    (marker: LiveMapCanvasMarker) => {
      openPanelForMarkerId(marker.id);
    },
    [openPanelForMarkerId],
  );

  function clearLiveMapSelection() {
    setPanel(null);
    setSelectedStaticId(null);
    setExpandedStaticCategories(new Set());
  }

  async function toggleQuestCompletionState(questId: string) {
    if (!accessToken) {
      showNotice(copy.loginRequired);
      return;
    }

    const previousCompleted = completedQuestIds;
    const nextCompleted = toggleQuestCompletion({
      checked: !completedQuestIds.includes(questId),
      completed: completedQuestIds,
      questById,
      questId,
    });

    setCompletedQuestIds(nextCompleted);
    setEnabledQuestIds((current) => {
      const next = new Set(current);

      if (nextCompleted.includes(questId)) {
        next.delete(questId);
      } else {
        next.add(questId);
      }

      return next;
    });
    setSavingQuestId(questId);
    try {
      const savedQuestList = await saveRoadmap(nextCompleted, accessToken);
      setCompletedQuestIds(savedQuestList.filter((value): value is string => typeof value === "string"));
      showNotice(copy.saved);
    } catch {
      setCompletedQuestIds(previousCompleted);
      setEnabledQuestIds((current) => {
        const next = new Set(current);

        if (previousCompleted.includes(questId)) {
          next.delete(questId);
        } else {
          next.add(questId);
        }

        return next;
      });
      showNotice(copy.loginRequired);
    } finally {
      setSavingQuestId((current) => (current === questId ? null : current));
    }
  }

  async function openQuestDetail(normalizedQuestName: string) {
    setLoadingQuestNormalizedName(normalizedQuestName);

    try {
      const questDetail = await getQuestDetail(normalizedQuestName);
      setPanel({
        id: questDetail.quest.id,
        info: toLiveMapQuestInfo(questDetail),
        type: "quest",
      });
    } catch {
      showNotice(copy.noItems);
    } finally {
      setLoadingQuestNormalizedName((current) =>
        current === normalizedQuestName ? null : current,
      );
    }
  }

  useEffect(() => {
    setSelectedFloorId(defaultFloorId);
  }, [defaultFloorId, normalizedName]);

  useEffect(() => {
    if (!websocketLocation || websocketLocation === previousLocationRef.current) {
      return;
    }

    previousLocationRef.current = websocketLocation;
    setWhere(websocketLocation);
    applyWhereText(websocketLocation);
  }, [websocketLocation]);

  useEffect(() => {
    if (!focusedMarkerId) {
      return;
    }

    const marker = visibleMarkers.find((entry) => entry.id === focusedMarkerId);

    if (!marker) {
      return;
    }

    if (marker.floorId) {
      setSelectedFloorId(marker.floorId);
    }

    openPanelForMarkerId(focusedMarkerId);
  }, [focusedMarkerId, openPanelForMarkerId, visibleMarkers]);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gray-100 text-gray-950 dark:bg-[#1e2124] dark:text-white">
      <div className="flex h-[calc(100vh-4rem)] min-h-[720px] flex-col overflow-hidden">
        <header className="flex min-h-14 items-center gap-3 border-b border-gray-200 bg-white px-3 shadow-sm dark:border-[#3a3d41] dark:bg-[#1f2124]">
          <div className="hidden items-center gap-2 text-sm font-black sm:flex">
            <MapPinned className="h-4 w-4 text-orange-500" />
            <span>{copy.title}</span>
          </div>

          <div className="relative min-w-0 flex-1 sm:max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={where}
              onChange={(event) => setWhere(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  applyWhereText(where);
                }
              }}
              onPaste={handlePaste}
              placeholder={copy.placeholder}
              className="h-9 w-full rounded-md border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none transition placeholder:text-gray-400 hover:bg-white focus:border-orange-400 focus:bg-white dark:border-[#3a3d41] dark:bg-[#2a2d31] dark:text-white dark:hover:bg-[#30343a] dark:focus:border-orange-400"
            />
          </div>

          <button
            type="button"
            onClick={() => applyWhereText(where)}
            className="inline-flex h-9 items-center gap-2 rounded-md bg-orange-500 px-3 text-sm font-black text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white dark:text-[#1e2124] dark:focus:ring-offset-[#1f2124]"
          >
            <LocateFixed className="h-4 w-4" />
            <span className="hidden sm:inline">{copy.locate}</span>
          </button>

          <button
            type="button"
            aria-label={copy.guideTitle}
            title={copy.guideTitle}
            onClick={() => setIsGuideOpen((value) => !value)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-600 hover:border-orange-300 hover:text-orange-500 dark:border-[#3a3d41] dark:bg-[#2a2d31] dark:text-gray-300"
          >
            <CircleHelp className="h-4 w-4" />
          </button>
        </header>

        <div className="flex min-h-0 flex-1">
          <aside className="hidden w-72 shrink-0 flex-col border-r border-gray-200 bg-white dark:border-[#3a3d41] dark:bg-[#1f2124] md:flex">
            <div className="min-h-0 flex-1 overflow-y-auto">
              <PanelBlock>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsMapSelectorOpen((value) => !value)}
                    className="flex h-9 w-full items-center justify-between gap-2 rounded-md border border-gray-200 bg-gray-50 px-2 text-left text-sm font-bold text-gray-800 hover:border-orange-300 hover:text-orange-500 dark:border-[#3a3d41] dark:bg-[#2a2d31] dark:text-gray-200"
                  >
                    <span className="truncate">
                      {selectedMap
                        ? localizedName(selectedMap as unknown as Record<string, unknown>, locale)
                        : copy.map}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 shrink-0 text-orange-500",
                        isMapSelectorOpen ? "rotate-180" : "",
                      )}
                    />
                  </button>
                  {isMapSelectorOpen ? (
                    <div className="absolute left-0 right-0 top-10 z-[500] max-h-72 overflow-y-auto rounded-md border border-gray-200 bg-white p-1 shadow-xl dark:border-[#3a3d41] dark:bg-[#1f2124]">
                      {data.map_selector.map((entry) => {
                        const isSelected = entry.normalized_name === normalizedName;

                        return (
                          <button
                            key={entry.normalized_name}
                            type="button"
                            onClick={() => {
                              setIsMapSelectorOpen(false);
                              clearLiveMapSelection();
                              router.push(`/live-map/${entry.normalized_name}`);
                            }}
                            className={cn(
                              "flex h-8 w-full items-center rounded px-2 text-left text-sm",
                              isSelected
                                ? "bg-orange-500 font-black text-white dark:text-[#1e2124]"
                                : "text-gray-700 hover:bg-gray-100 hover:text-orange-500 dark:text-gray-300 dark:hover:bg-[#2a2d31]",
                            )}
                          >
                            <span className="truncate">
                              {localizedName(entry as unknown as Record<string, unknown>, locale)}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </PanelBlock>

              <PanelBlock>
                <div className="space-y-1">
                  {sortedFloors.map((floor) => {
                    const isSelected = floor.id === selectedFloor?.id;

                    return (
                      <button
                        key={floor.id}
                        type="button"
                        onClick={() => setSelectedFloorId(floor.id)}
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm hover:bg-gray-100 dark:hover:bg-[#2a2d31]"
                      >
                        <span
                          className={cn(
                            "h-2.5 w-2.5 rounded-full",
                            isSelected ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-600",
                          )}
                        />
                        <span
                          className={
                            isSelected
                              ? "font-bold text-orange-500"
                              : "text-gray-600 dark:text-gray-300"
                          }
                        >
                          {getFloorLabel(floor, locale)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </PanelBlock>

              <StaticPointSection
                allLabel={copy.allOnOff}
                enabledIds={enabledStaticIds}
                emptyLabel={copy.noItems}
                expandedCategories={expandedStaticCategories}
                groups={staticGroups}
                locale={locale}
                onOpen={focusStaticPoint}
                onToggle={(id) => toggleSet(setEnabledStaticIds, id)}
                onToggleAll={() => toggleAll(setEnabledStaticIds, staticEntries.map((entry) => entry.id))}
                onToggleCategory={(category, ids) => {
                  setEnabledStaticIds((current) => {
                    const next = new Set(current);
                    const isCategoryEnabled = ids.every((id) => next.has(id));

                    ids.forEach((id) => {
                      if (isCategoryEnabled) {
                        next.delete(id);
                      } else {
                        next.add(id);
                      }
                    });

                    return next;
                  });
                }}
                onToggleCategoryOpen={(category) => toggleSet(setExpandedStaticCategories, category)}
                selectedId={selectedStaticId}
                title={copy.staticPoints}
                copy={copy}
              />
            </div>

            <div className="border-t border-gray-200 p-3 text-xs text-gray-500 dark:border-[#3a3d41] dark:text-gray-400">
              <div className="flex items-center gap-2 font-bold text-gray-700 dark:text-gray-200">
                <Layers className="h-3.5 w-3.5 text-orange-500" />
                {selectedMap ? localizedName(selectedMap as unknown as Record<string, unknown>, locale) : copy.title}
              </div>
              <div className="mt-2 space-y-1">
                <p>
                  {copy.coordinates}: X {mousePosition?.lng.toFixed(2) ?? "0.00"} / Z{" "}
                  {mousePosition?.lat.toFixed(2) ?? "0.00"}
                </p>
                <p>
                  {copy.height}: {location?.z.toFixed(2) ?? "0.00"}
                </p>
              </div>
              {notice ? (
                <div className="mt-2 border-t border-gray-200 pt-2 font-bold text-orange-500 dark:border-[#3a3d41]">
                  {notice}
                </div>
              ) : null}
            </div>
          </aside>

          <section className="relative min-w-0 flex-1 bg-gray-200 dark:bg-[#15171a]">
            {selectedFloor && data.coordinate_info ? (
              <LiveMapCanvas
                activeFloorId={selectedFloor.id}
                coordinateInfo={data.coordinate_info}
                focusedMarkerId={focusedMarkerId}
                floors={sortedFloors}
                location={location}
                mapKey={normalizedName}
                markers={visibleMarkers}
                onMarkerClick={openPanelForMarker}
                onMousePositionChange={setMousePosition}
                onPopupImageClick={openImagePopup}
              />
            ) : (
              <div className="flex h-full items-center justify-center p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                {selectedFloor ? copy.noCoordinateInfo : copy.noFloors}
              </div>
            )}

            <div className="absolute bottom-3 left-3 right-3 grid gap-2 rounded-md border border-gray-200 bg-white/90 p-3 text-xs shadow-lg backdrop-blur dark:border-[#3a3d41] dark:bg-[#1f2124]/90 sm:left-auto sm:right-3 sm:w-80">
              <div className="flex items-center justify-between gap-3">
                <span className="font-black text-gray-800 dark:text-white">
                  {selectedFloor ? localizedName(selectedFloor as unknown as Record<string, unknown>, locale) : copy.floor}
                </span>
                <span className="font-mono text-orange-500">
                  X {mousePosition?.lng.toFixed(2) ?? "0.00"} / Z{" "}
                  {mousePosition?.lat.toFixed(2) ?? "0.00"}
                </span>
              </div>
              {isGuideOpen ? (
                <p className="leading-5 text-gray-600 dark:text-gray-300">{copy.guide}</p>
              ) : null}
            </div>
          </section>

          {panel ? (
          <DetailPanel
            completedQuestIds={completedQuestIds}
            copy={copy}
            focusQuestObjective={focusQuestObjective}
            focusStoryObjective={focusStoryObjective}
            loadingQuestNormalizedName={loadingQuestNormalizedName}
            locale={locale}
            onClose={() => setPanel(null)}
              onOpenQuest={openQuestDetail}
              onToggleQuest={toggleQuestCompletionState}
              panel={panel}
              savingQuestId={savingQuestId}
            />
          ) : null}

          <aside className="hidden w-72 shrink-0 flex-col border-l border-gray-200 bg-white dark:border-[#3a3d41] dark:bg-[#1f2124] lg:flex">
            <div className="min-h-0 flex-1 overflow-y-auto">
              <RightSection
                allLabel={copy.allOnOff}
                completedQuestIds={completedQuestIds}
                enabledIds={enabledQuestIds}
                emptyLabel={copy.noItems}
                items={questEntries}
                kind="quest"
                onOpen={(entry) =>
                  entry.point.quest_info
                    ? setPanel({ id: entry.id, info: entry.point.quest_info, type: "quest" })
                    : undefined
                }
                onToggle={(id) => toggleSet(setEnabledQuestIds, id)}
                onToggleAll={() => toggleAll(setEnabledQuestIds, questEntries.map((entry) => entry.id))}
                onToggleComplete={toggleQuestCompletionState}
                selectedId={panel?.type === "quest" ? panel.id : null}
                title={copy.quests}
                locale={locale}
              />
              <RightSection
                allLabel={copy.allOnOff}
                completedQuestIds={completedQuestIds}
                enabledIds={enabledStoryIds}
                emptyLabel={copy.noItems}
                items={storyEntries}
                kind="story"
                onOpen={(entry) =>
                  entry.point.story_info
                    ? setPanel({ id: entry.id, info: entry.point.story_info, type: "story" })
                    : undefined
                }
                onToggle={(id) => toggleSet(setEnabledStoryIds, id)}
                onToggleAll={() => toggleAll(setEnabledStoryIds, storyEntries.map((entry) => entry.id))}
                selectedId={panel?.type === "story" ? panel.id : null}
                title={copy.stories}
                locale={locale}
              />
              <RightSection
                allLabel={copy.allOnOff}
                completedQuestIds={completedQuestIds}
                enabledIds={enabledEventIds}
                emptyLabel={copy.noItems}
                items={eventEntries}
                kind="event"
                onOpen={(entry) =>
                  entry.point.event_info
                    ? setPanel({ id: entry.id, info: entry.point.event_info, type: "event" })
                    : undefined
                }
                onToggle={(id) => toggleSet(setEnabledEventIds, id)}
                onToggleAll={() => toggleAll(setEnabledEventIds, eventEntries.map((entry) => entry.id))}
                selectedId={panel?.type === "event" ? panel.id : null}
                title={copy.events}
                locale={locale}
              />
            </div>
          </aside>
        </div>
      </div>
      <LiveMapImagePopup image={imagePopup} onClose={() => setImagePopup(null)} />
    </main>
  );
}

type RightEntry =
  | { id: string; point: LiveMapQuestPoint }
  | { id: string; point: LiveMapStoryPoint }
  | { id: string; point: LiveMapEventPoint }
  | { id: string; point: LiveMapStaticPoint };

function RightSection<TEntry extends RightEntry>({
  allLabel,
  completedQuestIds,
  emptyLabel,
  enabledIds,
  items,
  kind,
  locale,
  onOpen,
  onToggle,
  onToggleAll,
  onToggleComplete,
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
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onToggleComplete?: (id: string) => void;
  selectedId: string | null;
  title: string;
}) {
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
        <div className="space-y-0.5">
          {items.map((entry) => {
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
                      "min-w-0 truncate text-gray-700 dark:text-gray-300",
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

function StaticPointSection({
  allLabel,
  copy,
  emptyLabel,
  enabledIds,
  expandedCategories,
  groups,
  locale,
  onOpen,
  onToggle,
  onToggleAll,
  onToggleCategory,
  onToggleCategoryOpen,
  selectedId,
  title,
}: {
  allLabel: string;
  copy: (typeof copyByLocale)[Locale];
  emptyLabel: string;
  enabledIds: Set<string>;
  expandedCategories: Set<string>;
  groups: StaticCategoryGroup[];
  locale: Locale;
  onOpen: (entry: StaticEntry) => void;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onToggleCategory: (category: string, ids: string[]) => void;
  onToggleCategoryOpen: (category: string) => void;
  selectedId: string | null;
  title: string;
}) {
  const totalCount = groups.reduce((sum, group) => sum + group.entries.length, 0);
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
          <span className="ml-1 text-xs font-bold text-gray-500 dark:text-gray-400">
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
        <div className="space-y-1.5">
          {groups.map((group) => {
            const ids = group.entries.map((entry) => entry.id);
            const isOpen = expandedCategories.has(group.category);
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
                    <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400">
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
                                "min-w-0 truncate text-gray-700 dark:text-gray-300",
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

function KappaBadge() {
  return (
    <img
      alt="Kappa"
      className="h-4 w-4 shrink-0 rounded object-contain"
      src={KAPPA_IMAGE}
      title="Kappa"
    />
  );
}

function getEntryLabel(entry: RightEntry, locale: Locale) {
  if ("quest_info" in entry.point) {
    return entry.point.quest_info
      ? localizedName(entry.point.quest_info.quest as unknown as Record<string, unknown>, locale)
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

function DetailPanel({
  completedQuestIds,
  copy,
  focusQuestObjective,
  focusStoryObjective,
  loadingQuestNormalizedName,
  locale,
  onClose,
  onOpenQuest,
  onToggleQuest,
  panel,
  savingQuestId,
}: {
  completedQuestIds: string[];
  copy: (typeof copyByLocale)[Locale];
  focusQuestObjective: (
    objective: LiveMapQuestInfo["objectives"][number],
    questId: string,
  ) => void;
  focusStoryObjective: (objective: StoryObjective, storyId: string) => void;
  loadingQuestNormalizedName: string | null;
  locale: Locale;
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
  onOpenQuest,
  onToggle,
  saving,
  selectedPointId,
}: {
  completed: boolean;
  copy: (typeof copyByLocale)[Locale];
  info: LiveMapQuestInfo;
  focusQuestObjective: (
    objective: LiveMapQuestInfo["objectives"][number],
    questId: string,
  ) => void;
  loadingQuestNormalizedName: string | null;
  locale: Locale;
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
      <QuestRequirementList
        copy={copy}
        minPlayerLevel={info.quest.min_player_level}
      />
      <ObjectiveList
        copy={copy}
        locale={locale}
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
  selectedObjectiveId,
  selectedPointId,
}: {
  copy: (typeof copyByLocale)[Locale];
  focusStoryObjective: (objective: StoryObjective, storyId: string) => void;
  info: StoryInfo;
  locale: Locale;
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
          <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-400">
            {copy.requirements}
          </h4>
          <ul className="space-y-1">
            {info.requirements.map((requirement) => (
              <li key={requirement.id} className="text-xs leading-5 text-gray-700 dark:text-gray-300">
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
  copy: (typeof copyByLocale)[Locale];
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
      <p className="text-xs leading-5 text-gray-700 dark:text-gray-300">
        {localizedDescription(point as unknown as Record<string, unknown>, locale)}
      </p>
    </div>
  );
}

function ObjectiveList({
  copy,
  locale,
  objectives,
  onFocusObjective,
  selectedPointId,
}: {
  copy: (typeof copyByLocale)[Locale];
  locale: Locale;
  objectives: LiveMapQuestInfo["objectives"];
  onFocusObjective?: (objective: LiveMapQuestInfo["objectives"][number]) => void;
  selectedPointId?: string;
}) {
  return (
    <section>
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-400">
        {copy.objectives}
      </h4>
      <ul className="space-y-0.5">
        {objectives.map((objective) => (
          <li
            key={objective.objective_id}
            className={cn(
              "space-y-1 rounded-md border border-transparent px-1.5 py-0.5 text-xs text-gray-700 dark:text-gray-300",
              selectedPointId &&
                getQuestObjectivePoints(objective).some((point) => point.id === selectedPointId)
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
            />
            {objective.items.length > 0 ? <ItemRow items={objective.items} locale={locale} /> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function StoryObjectiveList({
  copy,
  locale,
  onFocusObjective,
  objectives,
  selectedObjectiveId,
  selectedPointId,
}: {
  copy: (typeof copyByLocale)[Locale];
  locale: Locale;
  onFocusObjective?: (objective: StoryObjective) => void;
  objectives: StoryObjective[];
  selectedObjectiveId?: string | null;
  selectedPointId?: string;
}) {
  return (
    <section>
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-400">
        {copy.objectives}
      </h4>
      <NestedStoryObjectives
        locale={locale}
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
  copy: (typeof copyByLocale)[Locale];
  locale: Locale;
  objectives: EventObjective[];
  selectedObjectiveId?: string | null;
  selectedPointId?: string;
}) {
  return (
    <section>
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-400">
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
  onFocusObjective,
  objectives,
  selectedObjectiveId,
  selectedPointId,
}: {
  locale: Locale;
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
            />
            {objective.items.length > 0 ? <ItemRow items={objective.items} locale={locale} /> : null}
            {objective.children.length > 0 ? (
              <div className="border-l border-gray-200 pl-3 dark:border-[#3a3d41]">
                <NestedStoryObjectives
                  locale={locale}
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
}: {
  count: number | null;
  description: string;
  onFocus?: () => void;
  optional: boolean;
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
    <div className="flex gap-2 text-xs leading-4 text-gray-700 dark:text-gray-300">
      <Route className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500" />
      <div className="min-w-0 flex-1">
        <p className="min-w-0">
          {onFocus ? (
            <button
              type="button"
              onClick={onFocus}
              className="inline text-left font-semibold text-orange-600 hover:underline dark:text-orange-300"
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
          className="flex min-w-0 items-center gap-2 rounded-md border border-gray-200 bg-white px-2 py-1.5 text-xs text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-[#3a3d41] dark:bg-[#15171a] dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-300"
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
  copy: (typeof copyByLocale)[Locale];
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
  copy: (typeof copyByLocale)[Locale];
  minPlayerLevel: number | null;
}) {
  if (minPlayerLevel === null) {
    return null;
  }

  return (
    <section>
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-400">
        {copy.requirements}
      </h4>
      <div className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs font-semibold text-gray-700 dark:border-[#3a3d41] dark:bg-[#15171a] dark:text-gray-300">
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
  copy: (typeof copyByLocale)[Locale];
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
          <h4 className="mb-1 text-xs font-bold text-gray-500 dark:text-gray-400">
            {copy.previous}
          </h4>
          {previous.map((quest) => (
            <button
              key={quest.id}
              type="button"
              disabled={loadingQuestNormalizedName === quest.normalized_name}
              onClick={() => onOpenQuest(quest.normalized_name)}
              className="block w-full rounded px-1 py-0.5 text-left text-xs text-gray-600 hover:bg-gray-100 hover:text-orange-500 disabled:cursor-wait disabled:opacity-60 dark:text-gray-300 dark:hover:bg-[#2a2d31]"
            >
              ← {localizedName(quest as unknown as Record<string, unknown>, locale)}
            </button>
          ))}
        </div>
      ) : null}
      {next.length > 0 ? (
      <div>
        <h4 className="mb-1 text-xs font-bold text-gray-500 dark:text-gray-400">
          {copy.next}
        </h4>
        {next.map((quest) => (
          <button
            key={quest.id}
            type="button"
            disabled={loadingQuestNormalizedName === quest.normalized_name}
            onClick={() => onOpenQuest(quest.normalized_name)}
            className="block w-full rounded px-1 py-0.5 text-left text-xs text-gray-600 hover:bg-gray-100 hover:text-orange-500 disabled:cursor-wait disabled:opacity-60 dark:text-gray-300 dark:hover:bg-[#2a2d31]"
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
  copy: (typeof copyByLocale)[Locale];
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
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-400">
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
  copy: (typeof copyByLocale)[Locale];
  title: string;
}) {
  return (
    <div>
      <h5 className="mb-1 text-[11px] font-bold text-gray-500 dark:text-gray-400">{title}</h5>
      <ExpandableRows className="grid gap-1.5" copy={copy}>
        {children}
      </ExpandableRows>
    </div>
  );
}

function RewardPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs font-semibold text-gray-700 dark:border-[#3a3d41] dark:bg-[#15171a] dark:text-gray-300">
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
      className="flex min-w-0 items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-[#3a3d41] dark:bg-[#15171a] dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-300"
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

function LiveMapImagePopup({
  image,
  onClose,
}: {
  image: LiveMapPopupImage | null;
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
      className="fixed inset-x-0 bottom-0 top-14 z-[80] flex items-center justify-center bg-black/80 p-4"
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

function PanelBlock({
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
