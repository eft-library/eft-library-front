"use client";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import type { LatLng } from "leaflet";
import {
  ChevronDown,
  CircleDot,
  Download,
  Eraser,
  Eye,
  EyeOff,
  Hand,
  Leaf,
  Lock,
  LocateFixed,
  MapPinned,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Pencil,
  RotateCcw,
  RotateCw,
  Search,
  Settings2,
  Trash2,
  Unlock,
  type LucideIcon,
} from "lucide-react";

import { useAppStore } from "@/components/providers/app-store-provider";
import {
  getLiveMapEventDetail,
  getLiveMapQuestDetail,
  getLiveMapStoryDetail,
} from "@/features/live-map/api";
import { getUserRoadmap, saveRoadmap } from "@/features/roadmap/api";
import type { Locale } from "@/i18n/config";
import {
  createQuestCompletionMap,
  toggleQuestCompletion,
} from "@/lib/quest/quest-completion";
import { cn } from "@/lib/utils/class-name";
import { useWsStore } from "@/store/ws-store";
import type {
  EventObjective,
  EventInfo,
  LiveMapObjectivePoint,
  LiveMapPageData,
  LiveMapQuestInfo,
  LiveMapStoryPoint,
  StoryInfo,
  StoryObjective,
  StoryRequirement,
} from "@/types/api/live-map";
import type { QuestCompletionGraphNode } from "@/types/api/quest";
import type {
  LiveMapCanvasMarker,
  LiveMapDrawingMode,
  LiveMapPopupImage,
} from "./live-map-canvas";
import { copyByLocale } from "./live-map-copy";
import {
  getDefaultFloor,
  getEventId,
  getEventMarkerSearchText,
  getEventPointLabel,
  findNestedObjectiveByPoint,
  getFloorLabel,
  getNestedObjectiveText,
  getQuestId,
  getQuestMarkerSearchText,
  getQuestObjectivePoint,
  getQuestPointLabel,
  getStaticMarkerSearchText,
  getStaticFaction,
  getStoryId,
  getStoryMarkerSearchText,
  getStoryPointLabel,
  groupStaticEntries,
  localizedName,
  localizedTitle,
  matchesFilterText,
  parseCanvasMarkerId,
  uniqueById,
  type PanelState,
  type StaticEntry,
} from "./live-map-data-utils";
import {
  getDisabledIds,
  getEnabledIdsFromDisabled,
  readLiveMapFilterStorage,
  writeLiveMapFilterStorage,
} from "./live-map-filter-storage";
import {
  getEventDetailPointPopupHtml,
  getEventPointPopupHtml,
  getQuestDetailPointPopupHtml,
  getQuestPointPopupHtml,
  getStaticPointPopupHtml,
  getStoryDetailPointPopupHtml,
  getStoryPointPopupHtml,
} from "./live-map-marker-popup";
import { LiveMapLocationGuide } from "./live-map-location-guide";
import {
  readLiveMapPreferences,
  writeLiveMapPreferences,
} from "./live-map-preferences-storage";
import { PanelBlock, RightSection, StaticPointSection } from "./live-map-sections";
import { findFloorForLocation, parseWhereText, type LiveMapLocation } from "./live-map-utils";

const LiveMapCanvas = dynamic(
  () => import("./live-map-canvas").then((mod) => mod.LiveMapCanvas),
  { ssr: false },
);
const DetailPanel = dynamic(
  () => import("./live-map-detail-panel").then((mod) => mod.DetailPanel),
  { ssr: false },
);
const LiveMapImagePopup = dynamic(
  () => import("./live-map-image-popup").then((mod) => mod.LiveMapImagePopup),
  { ssr: false },
);

const RIGHT_SECTION_IDS = ["quest", "story", "event"] as const;

function addPointMapNames(
  names: Set<string>,
  points: Array<{ map?: { normalized_name?: string | null } | null }> | null | undefined,
) {
  (points ?? []).forEach((point) => {
    if (point.map?.normalized_name) {
      names.add(point.map.normalized_name);
    }
  });
}

function addMapListNames(
  names: Set<string>,
  maps: Array<{ normalized_name?: string | null }> | null | undefined,
) {
  (maps ?? []).forEach((map) => {
    if (map.normalized_name) {
      names.add(map.normalized_name);
    }
  });
}

function addStoryObjectiveMapNames(names: Set<string>, objectives: StoryObjective[]) {
  (objectives ?? []).forEach((objective) => {
    addMapListNames(names, objective.maps);
    addPointMapNames(names, objective.live_map_points);
    addStoryObjectiveMapNames(names, objective.children ?? []);
  });
}

function addStoryRequirementMapNames(names: Set<string>, requirements: StoryRequirement[]) {
  requirements.forEach((requirement) => {
    addMapListNames(names, requirement.maps ?? []);
    addPointMapNames(names, requirement.live_map_points ?? []);
  });
}

function addEventObjectiveMapNames(names: Set<string>, objectives: EventObjective[]) {
  (objectives ?? []).forEach((objective) => {
    addPointMapNames(names, objective.live_map_points);
    addEventObjectiveMapNames(names, objective.children ?? []);
  });
}

function getPanelObjectiveMapNames(panel: PanelState | null) {
  const names = new Set<string>();

  if (!panel) {
    return names;
  }

  if (panel.type === "quest") {
    panel.info.objectives.forEach((objective) => {
      addMapListNames(names, objective.maps);
      addPointMapNames(names, objective.live_map_points ?? []);

      if (objective.live_map_point) {
        addPointMapNames(names, [objective.live_map_point]);
      }
    });
  }

  if (panel.type === "story") {
    addStoryObjectiveMapNames(names, panel.info.objectives);
    addStoryRequirementMapNames(names, panel.info.requirements);
  }

  if (panel.type === "event") {
    addEventObjectiveMapNames(names, panel.info.objectives);
  }

  return names;
}

function getStoryPointMapName(
  point: LiveMapObjectivePoint,
  maps: Array<{ id: string; normalized_name: string }>,
) {
  return point.map?.normalized_name ?? maps.find((map) => map.id === point.map_id)?.normalized_name ?? null;
}

function isStoryRequirementPointOnMap(
  requirement: StoryRequirement,
  point: LiveMapObjectivePoint,
  normalizedName: string,
) {
  const pointMapName = getStoryPointMapName(point, requirement.maps ?? []);

  return !pointMapName || pointMapName === normalizedName;
}

function makeStoryPointFromRequirement(
  story: StoryInfo["story"],
  requirement: StoryRequirement,
  point: LiveMapObjectivePoint,
): LiveMapStoryPoint {
  return {
    floor_id: point.floor_id,
    id: point.id,
    map_id: point.map_id,
    objective_id: null,
    requirement_id: requirement.id,
    story_id: story.id,
    story_info: {
      objective: null,
      requirement: {
        description_en: requirement.description_en,
        description_ja: requirement.description_ja,
        description_ko: requirement.description_ko,
        id: requirement.id,
        requirement_type: requirement.requirement_type,
      },
      story,
    },
    x: point.x,
    z: point.z,
  };
}

function makeStoryListPoint(storyDetail: StoryInfo): LiveMapStoryPoint {
  const requirementWithPoint = storyDetail.requirements.find((requirement) => (requirement.live_map_points ?? []).length > 0);
  const firstPoint = requirementWithPoint?.live_map_points?.[0];

  if (requirementWithPoint && firstPoint) {
    return makeStoryPointFromRequirement(storyDetail.story, requirementWithPoint, firstPoint);
  }

  return {
    floor_id: null,
    id: `${storyDetail.story.id}:summary`,
    map_id: "",
    objective_id: null,
    requirement_id: null,
    story_id: storyDetail.story.id,
    story_info: {
      objective: null,
      requirement: null,
      story: storyDetail.story,
    },
    x: 0,
    z: 0,
  };
}

function getLoadedStoryDetails(panel: PanelState | null, cache: Map<string, StoryInfo>) {
  const details = new Map<string, StoryInfo>();

  cache.forEach((detail) => {
    details.set(detail.story.id, detail);
  });

  if (panel?.type === "story") {
    details.set(panel.info.story.id, panel.info);
  }

  return Array.from(details.values());
}

function findStoryRequirementByPointId(info: StoryInfo, pointId: string) {
  for (const requirement of info.requirements) {
    const point = (requirement.live_map_points ?? []).find((entry) => entry.id === pointId);

    if (point) {
      return { point, requirement };
    }
  }

  return null;
}

function getStoryMarkerId(storyId: string, pointId: string) {
  return `story:${storyId}:${pointId}`;
}

function parseStoryMarkerPayload(value: string) {
  const separatorIndex = value.indexOf(":");

  if (separatorIndex === -1) {
    return {
      pointId: value,
      storyId: null,
    };
  }

  return {
    pointId: value.slice(separatorIndex + 1),
    storyId: value.slice(0, separatorIndex),
  };
}

function getCachedPopupHtml(
  cache: Map<string, string | undefined>,
  key: string,
  create: () => string | undefined,
) {
  if (cache.has(key)) {
    return cache.get(key);
  }

  const html = create();
  cache.set(key, html);
  return html;
}

function ViewSettingButton({
  checked,
  icon: Icon,
  label,
  onClick,
}: {
  checked: boolean;
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="menuitemcheckbox"
      aria-checked={checked}
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm font-bold text-gray-700 transition hover:bg-gray-100 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-400 dark:text-gray-200 dark:hover:bg-[#2a2d31] dark:hover:text-orange-400"
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="min-w-0 flex-1 truncate">{label}</span>
      <span
        aria-hidden="true"
        className={cn(
          "relative h-5 w-9 shrink-0 rounded-full transition-colors",
          checked ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-600",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-[18px]" : "translate-x-0.5",
          )}
        />
      </span>
    </button>
  );
}

export function LiveMapClientPage({
  data,
  initialCompletionGraph,
  normalizedName,
}: {
  data: LiveMapPageData;
  initialCompletionGraph: QuestCompletionGraphNode[];
  normalizedName: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlFocusedMarkerId = searchParams.get("focus");
  const [localFocusedMarkerId, setLocalFocusedMarkerId] = useState<
    string | null | undefined
  >(undefined);
  const [focusRequestKey, setFocusRequestKey] = useState(0);
  const [focusTarget, setFocusTarget] = useState<{
    id: string;
    key: number;
    moveView: boolean;
    x: number;
    y: number;
  } | null>(null);
  const [, startFocusRouteTransition] = useTransition();
  const focusedMarkerId =
    localFocusedMarkerId === undefined ? urlFocusedMarkerId : localFocusedMarkerId;
  const locale = useAppStore((state) => state.uiLocale);
  const copy = copyByLocale[locale];
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const latestWebsocketLocation = useWsStore((state) => state.latestLocation);
  const setLocationForMap = useWsStore((state) => state.setLocationForMap);
  const previousLocationEventRef = useRef<number | null>(null);
  const eventDetailCacheRef = useRef<Map<string, EventInfo>>(new Map());
  const openPanelForMarkerIdRef = useRef<(markerId: string) => Promise<boolean>>(() => Promise.resolve(false));
  const popupHtmlCacheRef = useRef<Map<string, string | undefined>>(new Map());
  const prefetchedMapNamesRef = useRef<Set<string>>(new Set());
  const questDetailCacheRef = useRef<Map<string, LiveMapQuestInfo>>(new Map());
  const storyDetailCacheRef = useRef<Map<string, StoryInfo>>(new Map());
  const focusRequestKeyRef = useRef(0);
  const skipQuestDetailAutoOpenRef = useRef<string | null>(null);
  const initializedFilterMapRef = useRef<string | null>(null);
  const [where, setWhere] = useState("");
  const [location, setLocation] = useState<LiveMapLocation | null>(null);
  const [mousePosition, setMousePosition] = useState<LatLng | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isMapSelectorOpen, setIsMapSelectorOpen] = useState(false);
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(true);
  const [isAutoPanLocked, setIsAutoPanLocked] = useState(false);
  const [areStaticLabelsVisible, setAreStaticLabelsVisible] = useState(true);
  const [isEyeComfortMode, setIsEyeComfortMode] = useState(false);
  const [isMarkerSimplified, setIsMarkerSimplified] = useState(false);
  const [openQuestDetailsOnMarkerClick, setOpenQuestDetailsOnMarkerClick] = useState(true);
  const [mapRotation, setMapRotation] = useState<0 | 90 | 180 | 270>(0);
  const [mapRotations, setMapRotations] = useState<Record<string, number>>({});
  const [isMapRotating, setIsMapRotating] = useState(false);
  const rotationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hasLoadedPreferences, setHasLoadedPreferences] = useState(false);
  const [isDrawingToolbarOpen, setIsDrawingToolbarOpen] = useState(false);
  const [isClearDrawingConfirmOpen, setIsClearDrawingConfirmOpen] = useState(false);
  const [isViewSettingsOpen, setIsViewSettingsOpen] = useState(false);
  const mapToolbarRef = useRef<HTMLDivElement | null>(null);
  const [drawingMode, setDrawingMode] = useState<LiveMapDrawingMode>("hand");
  const [undoDrawingRequest, setUndoDrawingRequest] = useState(0);
  const [clearDrawingRequest, setClearDrawingRequest] = useState(0);
  const [panel, setPanel] = useState<PanelState | null>(null);
  const [questDetailRevision, setQuestDetailRevision] = useState(0);
  const [imagePopup, setImagePopup] = useState<LiveMapPopupImage | null>(null);
  const [notice, setNotice] = useState("");
  const [loadingQuestNormalizedName, setLoadingQuestNormalizedName] = useState<string | null>(null);
  const [savingQuestId, setSavingQuestId] = useState<string | null>(null);
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([]);
  const [selectedStaticId, setSelectedStaticId] = useState<string | null>(null);
  const questById = useMemo(
    () => createQuestCompletionMap(initialCompletionGraph),
    [initialCompletionGraph],
  );
  const sortedFloors = useMemo(
    () => [...data.floors].sort((left, right) => left.floor_no - right.floor_no),
    [data.floors],
  );

  useEffect(() => {
    const preferences = readLiveMapPreferences();

    if (preferences) {
      setAreStaticLabelsVisible(preferences.areStaticLabelsVisible);
      setIsAutoPanLocked(preferences.isAutoPanLocked);
      setIsEyeComfortMode(preferences.isEyeComfortMode);
      setIsMarkerSimplified(preferences.isMarkerSimplified);
      setOpenQuestDetailsOnMarkerClick(preferences.openQuestDetailsOnMarkerClick);
      setIsRightPanelOpen(preferences.isRightPanelOpen);
      setMapRotations(preferences.mapRotations);
      const savedRotation = preferences.mapRotations[normalizedName];
      setMapRotation(savedRotation === 90 || savedRotation === 180 || savedRotation === 270 ? savedRotation : 0);
    }

    setHasLoadedPreferences(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedPreferences) {
      return;
    }

    writeLiveMapPreferences({
      areStaticLabelsVisible,
      isAutoPanLocked,
      isEyeComfortMode,
      isMarkerSimplified,
      openQuestDetailsOnMarkerClick,
      isRightPanelOpen,
      mapRotations,
    });
  }, [areStaticLabelsVisible, hasLoadedPreferences, isAutoPanLocked, isEyeComfortMode, isMarkerSimplified, isRightPanelOpen, mapRotations, openQuestDetailsOnMarkerClick]);

  useEffect(() => {
    if (!hasLoadedPreferences) {
      return;
    }

    const savedRotation = mapRotations[normalizedName];
    setMapRotation(
      savedRotation === 90 || savedRotation === 180 || savedRotation === 270
        ? savedRotation
        : 0,
    );
  }, [hasLoadedPreferences, mapRotations, normalizedName]);

  const rotateMap = useCallback(() => {
    if (isMapRotating) {
      return;
    }

    setIsMapRotating(true);
    setMapRotation((current) => {
      const next = ((current + 90) % 360) as 0 | 90 | 180 | 270;
      setMapRotations((rotations) => ({ ...rotations, [normalizedName]: next }));
      return next;
    });
    rotationTimeoutRef.current = setTimeout(() => {
      setIsMapRotating(false);
      rotationTimeoutRef.current = null;
    }, 200);
  }, [isMapRotating, normalizedName]);

  useEffect(() => {
    return () => {
      if (rotationTimeoutRef.current) {
        clearTimeout(rotationTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isViewSettingsOpen) {
      return;
    }

    const closeSettings = (event: MouseEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.key === "Escape") {
        setIsViewSettingsOpen(false);
        return;
      }

      if (
        event instanceof MouseEvent &&
        mapToolbarRef.current &&
        !mapToolbarRef.current.contains(event.target as Node)
      ) {
        setIsViewSettingsOpen(false);
      }
    };

    window.addEventListener("mousedown", closeSettings);
    window.addEventListener("keydown", closeSettings);
    return () => {
      window.removeEventListener("mousedown", closeSettings);
      window.removeEventListener("keydown", closeSettings);
    };
  }, [isViewSettingsOpen]);

  useEffect(() => {
    if (!isClearDrawingConfirmOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsClearDrawingConfirmOpen(false);
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isClearDrawingConfirmOpen]);
  const defaultFloor = getDefaultFloor(sortedFloors);
  const defaultFloorId = defaultFloor?.id ?? "";
  const [selectedFloorId, setSelectedFloorId] = useState(() => defaultFloorId);
  const selectedMap =
    data.map_selector.find((entry) => entry.normalized_name === normalizedName) ??
    data.map_selector[0];
  const selectedFloor =
    sortedFloors.find((floor) => floor.id === selectedFloorId) ?? defaultFloor;
  const currentMapId =
    selectedFloor?.map_id ?? data.coordinate_info?.id ?? data.floors[0]?.map_id ?? null;
  const resolvePointFloorId = useCallback(
    (point: { floor_id?: string | null }) => point.floor_id ?? null,
    [],
  );
  const selectPointFloor = useCallback(
    (point: { floor_id?: string | null }) => {
      const floorId = resolvePointFloorId(point);

      if (floorId) {
        setSelectedFloorId(floorId);
      }
    },
    [resolvePointFloorId],
  );

  const questEntries = useMemo(
    () => uniqueById(data.quest_points.filter((point) => point.quest_info).map((point) => ({
      id: getQuestId(point),
      point,
    }))),
    [data.quest_points],
  );
  const storyEntries = useMemo(
    () => uniqueById([
      ...data.story_points.filter((point) => point.story_info).map((point) => ({
        id: getStoryId(point),
        point,
      })),
      ...getLoadedStoryDetails(panel, storyDetailCacheRef.current).map((storyDetail) => ({
        id: storyDetail.story.id,
        point: makeStoryListPoint(storyDetail),
      })),
    ]),
    [data.story_points, panel],
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
  const [questFilterQuery, setQuestFilterQuery] = useState("");
  const [storyFilterQuery, setStoryFilterQuery] = useState("");
  const [eventFilterQuery, setEventFilterQuery] = useState("");
  const [staticFilterQuery, setStaticFilterQuery] = useState("");
  const [expandedRightSections, setExpandedRightSections] = useState<Set<string>>(
    () => new Set(["quest", "story", "event"]),
  );
  const areAllRightSectionsOpen = RIGHT_SECTION_IDS.every((section) =>
    expandedRightSections.has(section)
  );
  const [hydratedFilterMap, setHydratedFilterMap] = useState<string | null>(null);
  const [expandedStaticCategories, setExpandedStaticCategories] = useState<Set<string>>(
    new Set(),
  );
  const requestMarkerFocus = useCallback((
    markerId: string | null,
    position?: { x: number; y: number },
    { moveView = true }: { moveView?: boolean } = {},
  ) => {
    setLocalFocusedMarkerId(markerId);

    if (markerId) {
      const nextKey = focusRequestKeyRef.current + 1;
      focusRequestKeyRef.current = nextKey;

      setFocusRequestKey(nextKey);
      setFocusTarget(position ? {
        id: markerId,
        key: nextKey,
        moveView,
        x: position.x,
        y: position.y,
      } : null);
    } else {
      setFocusTarget(null);
    }
  }, []);

  useEffect(() => {
    popupHtmlCacheRef.current.clear();
  }, [data, locale]);

  useEffect(() => {
    if (initializedFilterMapRef.current === normalizedName) {
      return;
    }

    initializedFilterMapRef.current = normalizedName;
    setHydratedFilterMap(null);

    const savedFilters = readLiveMapFilterStorage(normalizedName);
    const questIds = questEntries.map((entry) => entry.id);
    const storyIds = storyEntries.map((entry) => entry.id);
    const eventIds = eventEntries.map((entry) => entry.id);
    const staticIds = staticEntries.map((entry) => entry.id);
    const staticCategories = staticGroups.map((group) => group.category);

    setEnabledQuestIds(getEnabledIdsFromDisabled(questIds, savedFilters?.disabledQuestIds));
    setEnabledStoryIds(getEnabledIdsFromDisabled(storyIds, savedFilters?.disabledStoryIds));
    setEnabledEventIds(getEnabledIdsFromDisabled(eventIds, savedFilters?.disabledEventIds));
    setEnabledStaticIds(getEnabledIdsFromDisabled(staticIds, savedFilters?.disabledStaticIds));
    setExpandedStaticCategories(new Set(staticCategories));
    setHydratedFilterMap(normalizedName);
  }, [
    eventEntries,
    normalizedName,
    questEntries,
    staticEntries,
    staticGroups,
    storyEntries,
  ]);

  useEffect(() => {
    if (hydratedFilterMap !== normalizedName) {
      return;
    }

    const questIds = questEntries.map((entry) => entry.id);
    const storyIds = storyEntries.map((entry) => entry.id);
    const eventIds = eventEntries.map((entry) => entry.id);
    const staticIds = staticEntries.map((entry) => entry.id);

    writeLiveMapFilterStorage(normalizedName, {
      disabledEventIds: getDisabledIds(eventIds, enabledEventIds),
      disabledQuestIds: getDisabledIds(questIds, enabledQuestIds),
      disabledStaticIds: getDisabledIds(staticIds, enabledStaticIds),
      disabledStoryIds: getDisabledIds(storyIds, enabledStoryIds),
    });
  }, [
    enabledEventIds,
    enabledQuestIds,
    enabledStaticIds,
    enabledStoryIds,
    eventEntries,
    hydratedFilterMap,
    normalizedName,
    questEntries,
    staticEntries,
    storyEntries,
  ]);

  useEffect(() => {
    if (
      localFocusedMarkerId !== undefined &&
      urlFocusedMarkerId === localFocusedMarkerId
    ) {
      setLocalFocusedMarkerId(undefined);
    }
  }, [localFocusedMarkerId, urlFocusedMarkerId]);

  useEffect(() => {
    setLocalFocusedMarkerId(undefined);
  }, [normalizedName]);

  useEffect(() => {
    getPanelObjectiveMapNames(panel).forEach((mapName) => {
      if (mapName === normalizedName || prefetchedMapNamesRef.current.has(mapName)) {
        return;
      }

      prefetchedMapNamesRef.current.add(mapName);
      router.prefetch(`/live-map/${mapName}`);
    });
  }, [normalizedName, panel, router]);

  useEffect(() => {
    setEnabledQuestIds((current) => {
      const next = new Set(current);

      completedQuestIds.forEach((questId) => next.delete(questId));

      return next;
    });
  }, [completedQuestIds]);

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
    const popupHtmlCache = popupHtmlCacheRef.current;
    const questMarkers = data.quest_points
      .filter((point) => {
        const questId = getQuestId(point);
        const isFocused = focusedMarkerId === `quest:${point.id}`;
        const matchesQuery = matchesFilterText(getQuestMarkerSearchText(point, locale), questFilterQuery);

        return (
          point.quest_info &&
          matchesQuery &&
          (isFocused || (enabledQuestIds.has(questId) && !completedQuestIds.includes(questId)))
        );
      })
      .map<LiveMapCanvasMarker>((point) => {
        const questId = getQuestId(point);
        const questDetail =
          panel?.type === "quest" && panel.id === questId
            ? panel.info
            : questDetailCacheRef.current.get(questId) ??
              (point.quest_info?.quest?.normalized_name
                ? questDetailCacheRef.current.get(point.quest_info.quest.normalized_name)
                : undefined);

        return {
          floorId: resolvePointFloorId(point),
          id: `quest:${point.id}`,
          kind: "quest",
          label: getQuestPointLabel(point, locale),
          popupHtml: getCachedPopupHtml(
            popupHtmlCache,
            `${locale}:quest:${point.id}:${questDetail ? `detail:${questDetail.quest.id}` : "summary"}`,
            () => questDetail
              ? getQuestDetailPointPopupHtml(point, questDetail, locale)
              : getQuestPointPopupHtml(point, locale),
          ),
          x: point.x,
          y: point.z,
        };
      });
    const storyMarkers = data.story_points
      .filter((point) => {
        const storyId = getStoryId(point);
        const markerId = getStoryMarkerId(storyId, point.id);

        return (
          point.story_info &&
          matchesFilterText(getStoryMarkerSearchText(point, locale), storyFilterQuery) &&
          (focusedMarkerId === markerId || focusedMarkerId === `story:${point.id}` || enabledStoryIds.has(storyId))
        );
      })
      .map<LiveMapCanvasMarker>((point) => {
        const storyId = getStoryId(point);
        const storyDetail =
          panel?.type === "story" && panel.id === storyId
            ? panel.info
            : storyDetailCacheRef.current.get(storyId);
        const storyObjective = storyDetail
          ? findNestedObjectiveByPoint(storyDetail.objectives, point.id, point.objective_id)
          : null;
        const storyLabel =
          getNestedObjectiveText(storyObjective, point.id, locale) ||
          getStoryPointLabel(point, locale);

        return {
          floorId: resolvePointFloorId(point),
          id: getStoryMarkerId(storyId, point.id),
          kind: "story",
          label: storyLabel,
          popupHtml: getCachedPopupHtml(
            popupHtmlCache,
            `${locale}:story:${storyId}:${point.id}:${storyDetail ? `detail:${storyDetail.story.id}` : "summary"}`,
            () => storyDetail
              ? getStoryDetailPointPopupHtml(point, storyDetail, locale)
              : getStoryPointPopupHtml(point, locale),
          ),
          x: point.x,
          y: point.z,
        };
      });
    const existingStoryMarkerIds = new Set(storyMarkers.map((marker) => marker.id));
    const storyRequirementMarkers = getLoadedStoryDetails(panel, storyDetailCacheRef.current)
      .flatMap((storyDetail) =>
        storyDetail.requirements.flatMap((requirement) =>
          (requirement.live_map_points ?? [])
            .filter((point) => isStoryRequirementPointOnMap(requirement, point, normalizedName))
            .map((point) => ({
              point: makeStoryPointFromRequirement(storyDetail.story, requirement, point),
              requirement,
              storyDetail,
            })),
        ),
      )
      .filter(({ point, requirement, storyDetail }) => (
        !existingStoryMarkerIds.has(getStoryMarkerId(storyDetail.story.id, point.id)) &&
        matchesFilterText(
          [
            localizedTitle(storyDetail.story as unknown as Record<string, unknown>, locale),
            getStoryPointLabel(point, locale),
          ].join(" "),
          storyFilterQuery,
        ) &&
        (focusedMarkerId === getStoryMarkerId(storyDetail.story.id, point.id) ||
          focusedMarkerId === `story:${point.id}` ||
          enabledStoryIds.has(storyDetail.story.id)) &&
        (requirement.live_map_points ?? []).some((entry) => entry.id === point.id)
      ))
      .map<LiveMapCanvasMarker>(({ point, storyDetail }) => ({
        floorId: resolvePointFloorId(point),
        id: getStoryMarkerId(storyDetail.story.id, point.id),
        kind: "story",
        label: getStoryPointLabel(point, locale),
        popupHtml: getCachedPopupHtml(
          popupHtmlCache,
          `${locale}:story:${storyDetail.story.id}:${point.id}:detail:${storyDetail.story.id}:requirement`,
          () => getStoryDetailPointPopupHtml(point, storyDetail, locale),
        ),
        x: point.x,
        y: point.z,
      }));
    const eventMarkers = data.event_points
      .filter((point) => (
        point.event_info &&
        point.map_id === currentMapId &&
        matchesFilterText(getEventMarkerSearchText(point, locale), eventFilterQuery) &&
        (focusedMarkerId === `event:${point.id}` || enabledEventIds.has(getEventId(point)))
      ))
      .map<LiveMapCanvasMarker>((point) => {
        const eventId = getEventId(point);
        const eventDetail =
          panel?.type === "event" && panel.id === eventId
            ? panel.info
            : eventDetailCacheRef.current.get(eventId);
        const eventObjective = eventDetail
          ? findNestedObjectiveByPoint(eventDetail.objectives, point.id, point.objective_id)
          : null;
        const eventLabel =
          getNestedObjectiveText(eventObjective, point.id, locale) ||
          getEventPointLabel(point, locale);

        return {
          floorId: resolvePointFloorId(point),
          id: `event:${point.id}`,
          kind: "event",
          label: eventLabel,
          popupHtml: getCachedPopupHtml(
            popupHtmlCache,
            `${locale}:event:${point.id}:${eventDetail ? `detail:${eventDetail.event.id}` : "summary"}`,
            () => eventDetail
              ? getEventDetailPointPopupHtml(point, eventDetail, locale)
              : getEventPointPopupHtml(point, locale),
          ),
          x: point.x,
          y: point.z,
        };
      });
    const staticMarkers = data.static_points
      .filter((point) => (
        matchesFilterText(getStaticMarkerSearchText(point, locale, copy), staticFilterQuery) &&
        (focusedMarkerId === `static:${point.id}` || enabledStaticIds.has(point.id))
      ))
      .map<LiveMapCanvasMarker>((point) => ({
        floorId: resolvePointFloorId(point),
        id: `static:${point.id}`,
        kind: "static",
        label: localizedName(point as unknown as Record<string, unknown>, locale),
        popupHtml: getCachedPopupHtml(
          popupHtmlCache,
          `${locale}:static:${point.id}`,
          () => getStaticPointPopupHtml(point, locale, copy),
        ),
        staticCategory: point.category,
        staticFaction: getStaticFaction(point),
        x: point.x,
        y: point.z,
      }));

    return [...questMarkers, ...storyMarkers, ...storyRequirementMarkers, ...eventMarkers, ...staticMarkers];
  }, [
    data.event_points,
    data.quest_points,
    data.static_points,
    data.story_points,
    completedQuestIds,
    currentMapId,
    enabledEventIds,
    enabledQuestIds,
    enabledStaticIds,
    enabledStoryIds,
    eventFilterQuery,
    focusedMarkerId,
    panel,
    questDetailRevision,
    questFilterQuery,
    staticFilterQuery,
    storyFilterQuery,
    copy,
    locale,
    normalizedName,
    resolvePointFloorId,
  ]);

  function showNotice(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2200);
  }

  function applyWhereText(text: string, { save = true }: { save?: boolean } = {}) {
    const parsed = parseWhereText(text);
    setLocation(parsed);

    if (!parsed) {
      return;
    }

    if (save) {
      setLocationForMap(normalizedName, text);
    }

    const matchedFloor = findFloorForLocation(sortedFloors, parsed);

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

  const replaceFocusParam = useCallback(
    (markerId: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("focus", markerId);
      const queryString = params.toString();

      startFocusRouteTransition(() => {
        router.replace(`/live-map/${normalizedName}?${queryString}`, {
          scroll: false,
        });
      });
    },
    [normalizedName, router, searchParams, startFocusRouteTransition],
  );

  const openImagePopup = useCallback((image: LiveMapPopupImage) => {
    setImagePopup(image);
  }, []);

  const navigateImagePopup = useCallback((index: number) => {
    setImagePopup((current) => {
      const nextImage = current?.images?.[index];

      if (!current || !nextImage) {
        return current;
      }

      return {
        ...nextImage,
        images: current.images,
        index,
      };
    });
  }, []);

  const loadQuestDetail = useCallback(async (questIdOrNormalizedName: string) => {
    const cached = questDetailCacheRef.current.get(questIdOrNormalizedName);

    if (cached) {
      return cached;
    }

    const detail = await getLiveMapQuestDetail(questIdOrNormalizedName);
    questDetailCacheRef.current.set(detail.quest.id, detail);
    questDetailCacheRef.current.set(detail.quest.normalized_name, detail);
    questDetailCacheRef.current.set(questIdOrNormalizedName, detail);
    setQuestDetailRevision((current) => current + 1);
    return detail;
  }, []);

  const loadStoryDetail = useCallback(async (storyId: string) => {
    const cached = storyDetailCacheRef.current.get(storyId);

    if (cached) {
      return cached;
    }

    const detail = await getLiveMapStoryDetail(storyId);
    storyDetailCacheRef.current.set(detail.story.id, detail);
    storyDetailCacheRef.current.set(storyId, detail);
    setEnabledStoryIds((current) => new Set([...current, detail.story.id]));
    return detail;
  }, []);

  const loadEventDetail = useCallback(async (eventId: string) => {
    const cached = eventDetailCacheRef.current.get(eventId);

    if (cached) {
      return cached;
    }

    const detail = await getLiveMapEventDetail(eventId);
    eventDetailCacheRef.current.set(detail.event.id, detail);
    eventDetailCacheRef.current.set(eventId, detail);
    return detail;
  }, []);

  const focusQuestObjective = useCallback(
    (
      objective: LiveMapQuestInfo["objectives"][number],
      questId: string,
      pointId?: string,
    ) => {
      const point = getQuestObjectivePoint(objective, pointId);

      if (!point) {
        return;
      }

      const targetMap =
        point.map?.normalized_name ??
        objective.maps?.find((map) => map.id === point.map_id)?.normalized_name ??
        objective.maps?.[0]?.normalized_name ??
        normalizedName;
      const focus = `quest:${point.id}`;
      requestMarkerFocus(focus, { x: point.x, y: point.z });

      selectPointFloor(point);

      if (targetMap === normalizedName) {
        setPanel((current) =>
          current?.type === "quest" && current.id === questId
            ? {
                ...current,
                pointId: point.id,
              }
            : current,
        );

        if (focusedMarkerId !== focus) {
          replaceFocusParam(focus);
        }
        return;
      }

      setLocalFocusedMarkerId(null);
      setFocusTarget(null);
      setPanel(null);
      setSelectedStaticId(null);
      router.push(`/live-map/${targetMap}?focus=${encodeURIComponent(focus)}`, {
        scroll: false,
      });
    },
    [focusedMarkerId, normalizedName, replaceFocusParam, requestMarkerFocus, router, selectPointFloor],
  );

  const focusStoryObjective = useCallback(
    (objective: StoryObjective, storyId: string, pointId?: string) => {
      const point = pointId
        ? objective.live_map_points.find((entry) => entry.id === pointId)
        : objective.live_map_points[0];

      if (!point) {
        return;
      }

      const targetMap =
        point.map?.normalized_name ??
        objective.maps?.find((map) => map.id === point.map_id)?.normalized_name ??
        objective.maps?.[0]?.normalized_name ??
        normalizedName;
      const focus = getStoryMarkerId(storyId, point.id);
      requestMarkerFocus(focus, { x: point.x, y: point.z });

      selectPointFloor(point);

      if (targetMap === normalizedName) {
        setPanel((current) =>
          current?.type === "story" && current.id === storyId
            ? {
                ...current,
                objectiveId: objective.objective_id,
                pointId: point.id,
              }
            : current,
        );

        if (focusedMarkerId !== focus) {
          replaceFocusParam(focus);
        }
        return;
      }

      setLocalFocusedMarkerId(null);
      setFocusTarget(null);
      setPanel(null);
      setSelectedStaticId(null);
      router.push(`/live-map/${targetMap}?focus=${encodeURIComponent(focus)}`, {
        scroll: false,
      });
    },
    [focusedMarkerId, normalizedName, replaceFocusParam, requestMarkerFocus, router, selectPointFloor],
  );

  const focusStoryRequirement = useCallback(
    (requirement: StoryRequirement, storyId: string, pointId?: string) => {
      const points = requirement.live_map_points ?? [];
      const point = pointId
        ? points.find((entry) => entry.id === pointId)
        : points[0];

      if (!point) {
        return;
      }

      const targetMap =
        point.map?.normalized_name ??
        requirement.maps?.find((map) => map.id === point.map_id)?.normalized_name ??
        requirement.maps?.[0]?.normalized_name ??
        normalizedName;
      const focus = getStoryMarkerId(storyId, point.id);
      requestMarkerFocus(focus, { x: point.x, y: point.z });

      selectPointFloor(point);

      if (targetMap === normalizedName) {
        setPanel((current) =>
          current?.type === "story" && current.id === storyId
            ? {
                ...current,
                objectiveId: null,
                requirementId: requirement.id,
                pointId: point.id,
              }
            : current,
        );

        if (focusedMarkerId !== focus) {
          replaceFocusParam(focus);
        }
        return;
      }

      setLocalFocusedMarkerId(null);
      setFocusTarget(null);
      setPanel(null);
      setSelectedStaticId(null);
      router.push(`/live-map/${targetMap}?focus=${encodeURIComponent(focus)}`, {
        scroll: false,
      });
    },
    [focusedMarkerId, normalizedName, replaceFocusParam, requestMarkerFocus, router, selectPointFloor],
  );

  const focusEventObjective = useCallback(
    (objective: EventObjective, eventId: string, pointId?: string) => {
      const point = pointId
        ? objective.live_map_points.find((entry) => entry.id === pointId)
        : objective.live_map_points[0];

      if (!point) {
        return;
      }

      const targetMap = point.map?.normalized_name ?? normalizedName;
      const focus = `event:${point.id}`;
      requestMarkerFocus(focus, { x: point.x, y: point.z });

      selectPointFloor(point);

      if (targetMap === normalizedName) {
        setPanel((current) =>
          current?.type === "event" && current.id === eventId
            ? {
                ...current,
                objectiveId: objective.objective_id,
                pointId: point.id,
              }
            : current,
        );

        if (focusedMarkerId !== focus) {
          replaceFocusParam(focus);
        }
        return;
      }

      setLocalFocusedMarkerId(null);
      setFocusTarget(null);
      setPanel(null);
      setSelectedStaticId(null);
      router.push(`/live-map/${targetMap}?focus=${encodeURIComponent(focus)}`, {
        scroll: false,
      });
    },
    [focusedMarkerId, normalizedName, replaceFocusParam, requestMarkerFocus, router, selectPointFloor],
  );

  const focusStaticPoint = useCallback(
    (entry: StaticEntry) => {
      const focus = `static:${entry.point.id}`;
      requestMarkerFocus(focus, { x: entry.point.x, y: entry.point.z });

      setSelectedStaticId(entry.id);
      setPanel((current) => (current?.type === "static" ? null : current));
      setExpandedStaticCategories((current) => new Set([...current, entry.point.category || "other"]));

      selectPointFloor(entry.point);

      if (focusedMarkerId !== focus) {
        replaceFocusParam(focus);
      }
    },
    [focusedMarkerId, replaceFocusParam, requestMarkerFocus, selectPointFloor],
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

  function toggleRightSection(section: "quest" | "story" | "event") {
    toggleSet(setExpandedRightSections, section);
  }

  function toggleAll(
    setter: React.Dispatch<React.SetStateAction<Set<string>>>,
    ids: string[],
  ) {
    setter((current) => (current.size === ids.length ? new Set() : new Set(ids)));
  }

  const openPanelForMarkerId = useCallback(
    async (
      markerId: string,
      {
        openQuestPanel = true,
        openStaticPanel = false,
      }: { openQuestPanel?: boolean; openStaticPanel?: boolean } = {},
    ) => {
      const { id, kind } = parseCanvasMarkerId(markerId);

      if (kind === "quest") {
        const point = data.quest_points.find((entry) => entry.id === id);
        if (point?.quest_info) {
          selectPointFloor(point);
          try {
            const info = await loadQuestDetail(point.quest_info.quest?.normalized_name ?? getQuestId(point));
            if (openQuestPanel) {
              setPanel({
                id: info.quest.id,
                info,
                pointId: point.id,
                type: "quest",
              });
            }
            return true;
          } catch {
            showNotice(copy.noItems);
            return false;
          }
        }
      }

      if (kind === "story") {
        const storyMarker = parseStoryMarkerPayload(id);
        const point = data.story_points.find((entry) =>
          entry.id === storyMarker.pointId &&
          (!storyMarker.storyId || getStoryId(entry) === storyMarker.storyId)
        );
        if (point?.story_info) {
          selectPointFloor(point);
          try {
            const info = await loadStoryDetail(getStoryId(point));
            setPanel((current) => {
              if (
                current?.type === "story" &&
                current.id === info.story.id &&
                current.pointId === point.id &&
                current.objectiveId === point.objective_id &&
                current.requirementId === point.requirement_id
              ) {
                return current;
              }

              return {
                id: info.story.id,
                info,
                objectiveId: point.objective_id,
                pointId: point.id,
                requirementId: point.requirement_id,
                type: "story",
              };
            });
            return true;
          } catch {
            showNotice(copy.noItems);
            return false;
          }
        }

        for (const storyDetail of getLoadedStoryDetails(panel, storyDetailCacheRef.current)) {
          if (storyMarker.storyId && storyDetail.story.id !== storyMarker.storyId) {
            continue;
          }

          const requirementMatch = findStoryRequirementByPointId(storyDetail, storyMarker.pointId);

          if (!requirementMatch) {
            continue;
          }

          selectPointFloor(requirementMatch.point);

          setPanel({
            id: storyDetail.story.id,
            info: storyDetail,
            objectiveId: null,
            pointId: requirementMatch.point.id,
            requirementId: requirementMatch.requirement.id,
            type: "story",
          });
          return true;
        }
      }

      if (kind === "event") {
        const point = data.event_points.find((entry) => entry.id === id);
        if (point?.event_info) {
          selectPointFloor(point);
          try {
            const info = await loadEventDetail(getEventId(point));
            setPanel({
              id: info.event.id,
              info,
              objectiveId: point.objective_id,
              pointId: point.id,
              type: "event",
            });
            return true;
          } catch {
            showNotice(copy.noItems);
            return false;
          }
        }
      }

      if (kind === "static") {
        const point = data.static_points.find((entry) => entry.id === id);
        if (point) {
          setSelectedStaticId(point.id);
          selectPointFloor(point);
          setExpandedStaticCategories((current) => new Set([...current, point.category || "other"]));
          setPanel((current) =>
            openStaticPanel
              ? { id: point.id, point, type: "static" }
              : current?.type === "static"
                ? null
                : current,
          );
          return true;
        }
      }

      return false;
    },
    [
      copy.noItems,
      data.event_points,
      data.quest_points,
      data.static_points,
      data.story_points,
      loadEventDetail,
      loadQuestDetail,
      loadStoryDetail,
      panel,
      selectPointFloor,
    ],
  );

  useEffect(() => {
    openPanelForMarkerIdRef.current = (markerId: string) => openPanelForMarkerId(markerId);
  }, [openPanelForMarkerId]);

  const openPanelForMarker = useCallback(
    async (marker: LiveMapCanvasMarker) => {
      if (marker.kind === "quest" && !openQuestDetailsOnMarkerClick) {
        skipQuestDetailAutoOpenRef.current = marker.id;
        setPanel(null);
        requestMarkerFocus(
          marker.id,
          { x: marker.x, y: marker.y },
          { moveView: false },
        );
        const opened = await openPanelForMarkerId(marker.id, { openQuestPanel: false });

        if (opened && focusedMarkerId !== marker.id) {
          replaceFocusParam(marker.id);
        }

        return;
      }

      requestMarkerFocus(
        marker.id,
        { x: marker.x, y: marker.y },
        { moveView: false },
      );
      const opened = await openPanelForMarkerId(marker.id);

      if (!opened || focusedMarkerId === marker.id) {
        return;
      }

      replaceFocusParam(marker.id);
    },
    [focusedMarkerId, openPanelForMarkerId, openQuestDetailsOnMarkerClick, replaceFocusParam, requestMarkerFocus],
  );

  const clearFocusParam = useCallback(() => {
    setLocalFocusedMarkerId(null);
    setFocusTarget(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("focus");
    const queryString = params.toString();

    startFocusRouteTransition(() => {
      router.replace(
        queryString ? `/live-map/${normalizedName}?${queryString}` : `/live-map/${normalizedName}`,
        { scroll: false },
      );
    });
  }, [normalizedName, router, searchParams, startFocusRouteTransition]);

  const closeDetailPanel = useCallback(() => {
    setPanel(null);

    if (focusedMarkerId) {
      clearFocusParam();
    }
  }, [clearFocusParam, focusedMarkerId]);

  useEffect(() => {
    if (!panel) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDetailPanel();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [closeDetailPanel, panel]);

  const clearFocusedMarker = useCallback(
    (markerId: string) => {
      if (focusedMarkerId !== markerId) {
        return;
      }

      clearFocusParam();
    },
    [clearFocusParam, focusedMarkerId],
  );

  const selectFloor = useCallback(
    (floorId: string) => {
      if (focusedMarkerId) {
        clearFocusParam();
      }

      setSelectedFloorId(floorId);
    },
    [clearFocusParam, focusedMarkerId],
  );

  const stepFloor = useCallback(
    (direction: "next" | "previous") => {
      const currentIndex = sortedFloors.findIndex(
        (floor) => floor.id === selectedFloor?.id,
      );

      if (currentIndex === -1) {
        return;
      }

      const nextIndex = currentIndex + (direction === "next" ? 1 : -1);
      const nextFloor = sortedFloors[nextIndex];

      if (nextFloor) {
        selectFloor(nextFloor.id);
      }
    },
    [selectFloor, selectedFloor?.id, sortedFloors],
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
      const questDetail = await loadQuestDetail(normalizedQuestName);
      setPanel({
        id: questDetail.quest.id,
        info: questDetail,
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

  async function openQuestSummaryPanel(entry: (typeof questEntries)[number]) {
    if (!entry.point.quest_info?.quest) {
      return;
    }

    setLoadingQuestNormalizedName(entry.point.quest_info.quest.normalized_name);

    try {
      const info = await loadQuestDetail(entry.point.quest_info.quest.normalized_name);
      setPanel({
        id: info.quest.id,
        info,
        type: "quest",
      });
    } catch {
      showNotice(copy.noItems);
    } finally {
      setLoadingQuestNormalizedName((current) =>
        current === entry.point.quest_info?.quest?.normalized_name ? null : current,
      );
    }
  }

  async function openStorySummaryPanel(entry: (typeof storyEntries)[number]) {
    if (!entry.point.story_info) {
      return;
    }

    try {
      const info = await loadStoryDetail(getStoryId(entry.point));
      setPanel({
        id: info.story.id,
        info,
        type: "story",
      });
    } catch {
      showNotice(copy.noItems);
    }
  }

  async function openEventSummaryPanel(entry: (typeof eventEntries)[number]) {
    if (!entry.point.event_info) {
      return;
    }

    const targetMap = entry.point.map?.normalized_name;

    if (targetMap && targetMap !== normalizedName) {
      const focus = `event:${entry.point.id}`;
      setLocalFocusedMarkerId(null);
      setFocusTarget(null);
      clearLiveMapSelection();
      router.push(`/live-map/${targetMap}?focus=${encodeURIComponent(focus)}`, {
        scroll: false,
      });
      return;
    }

    try {
      const info = await loadEventDetail(getEventId(entry.point));
      setPanel({
        id: info.event.id,
        info,
        type: "event",
      });
    } catch {
      showNotice(copy.noItems);
    }
  }

  useEffect(() => {
    setSelectedFloorId(defaultFloorId);
  }, [defaultFloorId, normalizedName]);

  useEffect(() => {
    previousLocationEventRef.current = latestWebsocketLocation?.receivedAt ?? null;
    setWhere("");
    setLocation(null);
  }, [normalizedName]);

  useEffect(() => {
    if (
      !latestWebsocketLocation ||
      latestWebsocketLocation.receivedAt === previousLocationEventRef.current
    ) {
      return;
    }

    previousLocationEventRef.current = latestWebsocketLocation.receivedAt;
    setWhere(latestWebsocketLocation.value);
    applyWhereText(latestWebsocketLocation.value);
  }, [latestWebsocketLocation]);

  useEffect(() => {
    if (!focusedMarkerId) {
      return;
    }

    if (skipQuestDetailAutoOpenRef.current === focusedMarkerId) {
      skipQuestDetailAutoOpenRef.current = null;
      return;
    }

    void openPanelForMarkerIdRef.current(focusedMarkerId);
  }, [focusedMarkerId]);

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
            aria-label={copy.guideDownload}
            title={`${copy.guideDownload} · ${copy.guideTitle}`}
            onClick={() => setIsGuideOpen(true)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white dark:text-[#1e2124] dark:focus:ring-offset-[#1f2124] sm:w-auto sm:px-3"
          >
            <Download className="h-4 w-4 shrink-0" />
            <span className="hidden text-sm font-bold sm:inline">{copy.guideDownload}</span>
          </button>
        </header>

        <div className="relative flex min-h-0 flex-1">
          <aside
            className={cn(
              "hidden shrink-0 flex-col border-r border-gray-200 bg-white transition-[width] duration-200 dark:border-[#3a3d41] dark:bg-[#1f2124] md:flex",
              isLeftPanelOpen ? "w-60 lg:w-72" : "w-11",
            )}
          >
            <div
              className={cn(
                "flex h-11 shrink-0 items-center border-b border-gray-200 px-1.5 dark:border-[#3a3d41]",
                isLeftPanelOpen ? "justify-end" : "justify-center",
              )}
            >
              <button
                type="button"
                aria-expanded={isLeftPanelOpen}
                aria-label={isLeftPanelOpen ? copy.collapseSpawnPanel : copy.expandSpawnPanel}
                title={isLeftPanelOpen ? copy.collapseSpawnPanel : copy.expandSpawnPanel}
                onClick={() => setIsLeftPanelOpen((value) => !value)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:text-gray-300 dark:hover:bg-[#2a2d31] dark:hover:text-orange-400"
              >
                {isLeftPanelOpen ? (
                  <PanelLeftClose className="h-4 w-4" />
                ) : (
                  <PanelLeftOpen className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className={cn("min-h-0 flex-1 overflow-y-auto", !isLeftPanelOpen && "hidden")}>
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
                                : "text-gray-700 hover:bg-gray-100 hover:text-orange-500 dark:text-gray-200 dark:hover:bg-[#2a2d31]",
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
                        onClick={() => selectFloor(floor.id)}
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
                              : "text-gray-600 dark:text-gray-200"
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
                onSearchQueryChange={setStaticFilterQuery}
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
                onSetCategoriesOpen={(categories, open) => {
                  setExpandedStaticCategories((current) => {
                    const next = new Set(current);

                    categories.forEach((category) => {
                      if (open) {
                        next.add(category);
                      } else {
                        next.delete(category);
                      }
                    });

                    return next;
                  });
                }}
                searchQuery={staticFilterQuery}
                selectedId={selectedStaticId}
                title={copy.staticPoints}
                copy={copy}
              />
            </div>

          </aside>

          <section
            className={cn(
              "relative isolate min-w-0 flex-1 bg-gray-200 dark:bg-[#15171a]",
              !areStaticLabelsVisible && "live-map-static-labels-hidden",
              isEyeComfortMode && "live-map-eye-comfort",
            )}
          >
            {selectedFloor && data.coordinate_info ? (
              <LiveMapCanvas
                activeFloorId={selectedFloor.id}
                clearDrawingRequest={clearDrawingRequest}
                coordinateInfo={data.coordinate_info}
                drawingMode={drawingMode}
                focusedMarkerId={focusedMarkerId}
                focusRequestKey={focusRequestKey}
                focusTarget={focusTarget}
                floors={sortedFloors}
                isAutoPanLocked={isAutoPanLocked}
                isMarkerSimplified={isMarkerSimplified}
                location={location}
                mapKey={normalizedName}
                preserveFocusOnPopupEscape={panel !== null}
                rotation={mapRotation}
                markers={visibleMarkers}
                onMarkerClick={openPanelForMarker}
                onMapClick={clearFocusParam}
                onFloorStep={stepFloor}
                onMousePositionChange={setMousePosition}
                onFocusedMarkerClose={clearFocusedMarker}
                onPopupImageClick={openImagePopup}
                undoDrawingRequest={undoDrawingRequest}
              />
            ) : (
              <div className="flex h-full items-center justify-center p-6 text-center text-sm text-gray-500 dark:text-gray-400">
                {selectedFloor ? copy.noCoordinateInfo : copy.noFloors}
              </div>
            )}

            {notice ? (
              <div
                role="status"
                className="pointer-events-none absolute left-1/2 top-3 z-[1100] -translate-x-1/2 rounded-md border border-orange-300 bg-white/95 px-4 py-2 text-sm font-bold text-orange-600 shadow-lg backdrop-blur dark:border-orange-500/50 dark:bg-[#1f2124]/95 dark:text-orange-400"
              >
                {notice}
              </div>
            ) : null}

            <div ref={mapToolbarRef} className="absolute right-3 top-3 z-[1000] flex items-center gap-2">
              <button
                type="button"
                aria-label={`${copy.rotateMap} (${mapRotation}°)`}
                title={`${copy.rotateMap} (${mapRotation}°)`}
                onClick={rotateMap}
                disabled={isMapRotating}
                className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-200 bg-white/90 px-3 text-xs font-black text-gray-700 shadow-lg backdrop-blur transition hover:border-orange-300 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:cursor-wait disabled:opacity-70 dark:border-[#3a3d41] dark:bg-[#1f2124]/90 dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-400"
              >
                <RotateCw
                  className={cn(
                    "h-4 w-4 transition-transform duration-200 motion-reduce:transition-none",
                    isMapRotating && "rotate-90",
                  )}
                />
                <span className="hidden 2xl:inline">{copy.rotation} {mapRotation}°</span>
              </button>

              <button
                type="button"
                aria-expanded={isDrawingToolbarOpen}
                aria-label={copy.drawingTools}
                title={copy.drawingTools}
                onClick={() => {
                  setIsViewSettingsOpen(false);
                  setIsDrawingToolbarOpen((value) => {
                    if (value) {
                      setDrawingMode("hand");
                    }

                    return !value;
                  });
                }}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-md border px-3 text-xs font-black shadow-lg backdrop-blur transition focus:outline-none focus:ring-2 focus:ring-orange-400",
                  isDrawingToolbarOpen
                    ? "border-orange-400 bg-orange-500 text-white hover:bg-orange-600 dark:text-[#1e2124]"
                    : "border-gray-200 bg-white/90 text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-[#3a3d41] dark:bg-[#1f2124]/90 dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-400",
                )}
              >
                <Pencil className="h-4 w-4" />
                <span className="hidden 2xl:inline">{copy.drawing}</span>
              </button>

              <button
                type="button"
                aria-expanded={isViewSettingsOpen}
                aria-haspopup="menu"
                aria-label={copy.viewSettings}
                title={copy.viewSettings}
                onClick={() => {
                  setIsDrawingToolbarOpen(false);
                  setDrawingMode("hand");
                  setIsViewSettingsOpen((value) => !value);
                }}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-md border px-3 text-xs font-black shadow-lg backdrop-blur transition focus:outline-none focus:ring-2 focus:ring-orange-400",
                  isViewSettingsOpen
                    ? "border-orange-400 bg-orange-500 text-white hover:bg-orange-600 dark:text-[#1e2124]"
                    : "border-gray-200 bg-white/90 text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-[#3a3d41] dark:bg-[#1f2124]/90 dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-400",
                )}
              >
                <Settings2 className="h-4 w-4" />
                <span className="hidden 2xl:inline">{copy.viewSettings}</span>
              </button>

              {isViewSettingsOpen ? (
                <div role="menu" aria-label={copy.viewSettings} className="absolute right-0 top-11 w-80 max-w-[calc(100vw-1.5rem)] rounded-lg border border-gray-200 bg-white/95 p-2 shadow-xl backdrop-blur dark:border-[#3a3d41] dark:bg-[#1f2124]/95">
                  <ViewSettingButton
                    checked={isEyeComfortMode}
                    icon={Leaf}
                    label={isEyeComfortMode ? copy.eyeComfortOn : copy.eyeComfortOff}
                    onClick={() => setIsEyeComfortMode((value) => !value)}
                  />
                  <ViewSettingButton
                    checked={isMarkerSimplified}
                    icon={CircleDot}
                    label={isMarkerSimplified ? copy.markersSimplified : copy.markersDetailed}
                    onClick={() => setIsMarkerSimplified((value) => !value)}
                  />
                  <ViewSettingButton
                    checked={areStaticLabelsVisible}
                    icon={areStaticLabelsVisible ? Eye : EyeOff}
                    label={areStaticLabelsVisible ? copy.mapLabelsShown : copy.mapLabelsHidden}
                    onClick={() => setAreStaticLabelsVisible((value) => !value)}
                  />
                  <ViewSettingButton
                    checked={isAutoPanLocked}
                    icon={isAutoPanLocked ? Lock : Unlock}
                    label={isAutoPanLocked ? copy.autoMoveLocked : copy.autoMoveUnlocked}
                    onClick={() => setIsAutoPanLocked((value) => !value)}
                  />
                  <ViewSettingButton
                    checked={openQuestDetailsOnMarkerClick}
                    icon={PanelRightOpen}
                    label={openQuestDetailsOnMarkerClick ? copy.questDetailsOn : copy.questDetailsOff}
                    onClick={() => setOpenQuestDetailsOnMarkerClick((value) => !value)}
                  />
                </div>
              ) : null}

              {isDrawingToolbarOpen ? (
                <div className="absolute right-0 top-11 flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white/95 p-2 shadow-xl backdrop-blur dark:border-[#3a3d41] dark:bg-[#1f2124]/95">
                  <button
                    type="button"
                    aria-label={copy.panMap}
                    title={copy.panMap}
                    onClick={() => setDrawingMode("hand")}
                    className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-md border transition focus:outline-none focus:ring-2 focus:ring-orange-400",
                      drawingMode === "hand"
                        ? "border-orange-400 bg-orange-500 text-white dark:text-[#1e2124]"
                        : "border-gray-200 text-gray-600 hover:text-orange-500 dark:border-[#3a3d41] dark:text-gray-200",
                    )}
                  >
                    <Hand className="h-4 w-4" />
                  </button>
                  {(["red", "blue"] as const).map((colorMode) => (
                    <button
                      key={colorMode}
                      type="button"
                      aria-label={colorMode === "red" ? copy.redPen : copy.bluePen}
                      title={colorMode === "red" ? copy.redPen : copy.bluePen}
                      onClick={() => setDrawingMode(colorMode)}
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-md border transition focus:outline-none focus:ring-2 focus:ring-orange-400",
                        drawingMode === colorMode
                          ? "border-white ring-2 ring-gray-700 dark:ring-white"
                          : "border-gray-200 dark:border-[#3a3d41]",
                      )}
                    >
                      <span
                        className={cn(
                          "h-4 w-4 rounded-full",
                          colorMode === "red" ? "bg-red-500" : "bg-blue-500",
                        )}
                      />
                    </button>
                  ))}
                  <button
                    type="button"
                    aria-label={copy.eraser}
                    title={copy.eraser}
                    onClick={() => setDrawingMode("erase")}
                    className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-md border transition focus:outline-none focus:ring-2 focus:ring-orange-400",
                      drawingMode === "erase"
                        ? "border-orange-400 bg-orange-500 text-white dark:text-[#1e2124]"
                        : "border-gray-200 text-gray-600 hover:text-orange-500 dark:border-[#3a3d41] dark:text-gray-200",
                    )}
                  >
                    <Eraser className="h-4 w-4" />
                  </button>
                  <span className="mx-0.5 h-6 w-px bg-gray-200 dark:bg-[#3a3d41]" />
                  <button
                    type="button"
                    aria-label={copy.undoDrawing}
                    title={copy.undoDrawing}
                    onClick={() => setUndoDrawingRequest((value) => value + 1)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:border-[#3a3d41] dark:text-gray-200"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={copy.clearDrawing}
                    title={copy.clearDrawing}
                    onClick={() => setIsClearDrawingConfirmOpen(true)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-600 transition hover:border-red-300 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 dark:border-[#3a3d41] dark:text-gray-200"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : null}
            </div>

            {isClearDrawingConfirmOpen ? (
              <div
                className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/55 p-4 backdrop-blur-sm"
                onMouseDown={(event) => {
                  if (event.currentTarget === event.target) {
                    setIsClearDrawingConfirmOpen(false);
                  }
                }}
              >
                <div
                  role="alertdialog"
                  aria-modal="true"
                  aria-labelledby="clear-drawing-dialog-title"
                  aria-describedby="clear-drawing-dialog-description"
                  className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-2xl dark:border-[#3a3d41] dark:bg-[#1f2124]"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                      <Trash2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h2 id="clear-drawing-dialog-title" className="font-black text-gray-900 dark:text-white">
                        {copy.clearDrawing}
                      </h2>
                      <p id="clear-drawing-dialog-description" className="mt-1.5 text-sm leading-6 text-gray-600 dark:text-gray-300">
                        {copy.clearDrawingConfirm}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex justify-end gap-2">
                    <button
                      type="button"
                      autoFocus
                      onClick={() => setIsClearDrawingConfirmOpen(false)}
                      className="h-9 rounded-md border border-gray-200 px-4 text-sm font-bold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:border-[#3a3d41] dark:text-gray-200 dark:hover:bg-[#2a2d31]"
                    >
                      {copy.cancel}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setClearDrawingRequest((value) => value + 1);
                        setIsClearDrawingConfirmOpen(false);
                      }}
                      className="h-9 rounded-md bg-red-500 px-4 text-sm font-black text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-[#1f2124]"
                    >
                      {copy.clearDrawing}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

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
            </div>
          </section>

          <div
            className={cn(
              "contents md:flex md:min-h-0 md:shrink-0 md:flex-col md:border-l md:border-gray-200 md:bg-white md:transition-[width] md:duration-200 dark:md:border-[#3a3d41] dark:md:bg-[#1f2124] xl:w-auto xl:flex-row xl:border-l-0 xl:bg-transparent dark:xl:bg-transparent",
              panel
                ? "md:w-72 lg:w-80"
                : isRightPanelOpen
                  ? "md:w-52 lg:w-60"
                  : "md:w-11",
            )}
          >
            {panel ? (
              <DetailPanel
                completedQuestIds={completedQuestIds}
                copy={copy}
                focusEventObjective={focusEventObjective}
                focusQuestObjective={focusQuestObjective}
                focusStoryObjective={focusStoryObjective}
                focusStoryRequirement={focusStoryRequirement}
                loadingQuestNormalizedName={loadingQuestNormalizedName}
                locale={locale}
                normalizedName={normalizedName}
                onClose={closeDetailPanel}
                onOpenQuest={openQuestDetail}
                onToggleQuest={toggleQuestCompletionState}
                panel={panel}
                savingQuestId={savingQuestId}
              />
            ) : null}

            <aside
              className={cn(
                "hidden shrink-0 flex-col bg-white dark:bg-[#1f2124] md:order-1 md:flex md:min-h-0 md:w-full xl:order-2 xl:border-l xl:border-gray-200 dark:xl:border-[#3a3d41]",
                panel
                  ? isRightPanelOpen
                    ? "md:h-[38%] xl:h-auto"
                    : "md:h-11 xl:h-auto"
                  : "md:flex-1 xl:flex-none",
                isRightPanelOpen ? "xl:w-72" : "xl:w-11",
              )}
            >
            <div
              className={cn(
                "flex h-11 shrink-0 items-center border-b border-gray-200 px-1.5 dark:border-[#3a3d41]",
                isRightPanelOpen ? "justify-between" : "justify-center",
              )}
            >
              <button
                type="button"
                aria-expanded={isRightPanelOpen}
                aria-label={isRightPanelOpen ? copy.collapseQuestPanel : copy.expandQuestPanel}
                title={isRightPanelOpen ? copy.collapseQuestPanel : copy.expandQuestPanel}
                onClick={() => setIsRightPanelOpen((value) => !value)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition hover:bg-gray-100 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 dark:text-gray-300 dark:hover:bg-[#2a2d31] dark:hover:text-orange-400"
              >
                {isRightPanelOpen ? (
                  <PanelRightClose className="h-4 w-4" />
                ) : (
                  <PanelRightOpen className="h-4 w-4" />
                )}
              </button>
              {isRightPanelOpen ? (
                <button
                  type="button"
                  onClick={() => {
                    setExpandedRightSections(
                      areAllRightSectionsOpen ? new Set() : new Set(RIGHT_SECTION_IDS),
                    );
                  }}
                  className="mr-1 inline-flex h-7 items-center rounded px-2 text-xs font-bold text-orange-500 transition hover:bg-gray-100 hover:text-orange-600 dark:text-orange-400 dark:hover:bg-[#2a2d31] dark:hover:text-orange-300"
                >
                  {areAllRightSectionsOpen
                    ? copy.collapseAllCategories
                    : copy.expandAllCategories}
                </button>
              ) : null}
            </div>

            <div className={cn("min-h-0 flex-1 overflow-y-auto", !isRightPanelOpen && "hidden")}>
              <RightSection
                allLabel={copy.allOnOff}
                completedQuestIds={completedQuestIds}
                enabledIds={enabledQuestIds}
                emptyLabel={copy.noItems}
                items={questEntries}
                isOpen={expandedRightSections.has("quest")}
                kind="quest"
                onOpen={(entry) => {
                  void openQuestSummaryPanel(entry);
                }}
                onToggle={(id) => toggleSet(setEnabledQuestIds, id)}
                onToggleAll={() => toggleAll(setEnabledQuestIds, questEntries.map((entry) => entry.id))}
                onToggleComplete={toggleQuestCompletionState}
                onToggleOpen={() => toggleRightSection("quest")}
                onSearchQueryChange={setQuestFilterQuery}
                searchQuery={questFilterQuery}
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
                isOpen={expandedRightSections.has("story")}
                kind="story"
                onOpen={(entry) => {
                  void openStorySummaryPanel(entry);
                }}
                onToggle={(id) => toggleSet(setEnabledStoryIds, id)}
                onToggleAll={() => toggleAll(setEnabledStoryIds, storyEntries.map((entry) => entry.id))}
                onToggleOpen={() => toggleRightSection("story")}
                onSearchQueryChange={setStoryFilterQuery}
                searchQuery={storyFilterQuery}
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
                isOpen={expandedRightSections.has("event")}
                kind="event"
                onOpen={(entry) => {
                  void openEventSummaryPanel(entry);
                }}
                onToggle={(id) => toggleSet(setEnabledEventIds, id)}
                onToggleAll={() => toggleAll(setEnabledEventIds, eventEntries.map((entry) => entry.id))}
                onToggleOpen={() => toggleRightSection("event")}
                onSearchQueryChange={setEventFilterQuery}
                searchQuery={eventFilterQuery}
                selectedId={panel?.type === "event" ? panel.id : null}
                title={copy.events}
                locale={locale}
              />
            </div>
            </aside>
          </div>
        </div>
      </div>
      <LiveMapLocationGuide
        copy={copy}
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
      <LiveMapImagePopup
        image={imagePopup}
        onClose={() => setImagePopup(null)}
        onNavigate={navigateImagePopup}
      />
    </main>
  );
}
