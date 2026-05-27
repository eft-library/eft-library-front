"use client";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import type { LatLng } from "leaflet";
import {
  ChevronDown,
  CircleHelp,
  Layers,
  LocateFixed,
  MapPinned,
  Search,
} from "lucide-react";

import { useAppStore } from "@/components/providers/app-store-provider";
import { getQuestDetail } from "@/features/quest/api";
import { getUserRoadmap, saveRoadmap } from "@/features/roadmap/api";
import type { Locale } from "@/i18n/config";
import {
  createQuestCompletionMap,
  toggleQuestCompletion,
} from "@/lib/quest/quest-completion";
import { cn } from "@/lib/utils/class-name";
import { useWsStore } from "@/store/ws-store";
import type {
  LiveMapPageData,
  LiveMapQuestInfo,
  StoryObjective,
} from "@/types/api/live-map";
import type { QuestCompletionGraphNode, QuestDetailResponse } from "@/types/api/quest";
import type { LiveMapCanvasMarker, LiveMapPopupImage } from "./live-map-canvas";
import { copyByLocale } from "./live-map-copy";
import {
  getDefaultFloor,
  getEventId,
  getEventMarkerSearchText,
  getEventPointLabel,
  getFloorLabel,
  getQuestId,
  getQuestMarkerSearchText,
  getQuestObjectivePoint,
  getQuestPointLabel,
  getStaticMarkerSearchText,
  getStoryId,
  getStoryMarkerSearchText,
  getStoryPointLabel,
  groupStaticEntries,
  localizedName,
  matchesFilterText,
  parseCanvasMarkerId,
  toLiveMapQuestInfo,
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
  getEventPointPopupHtml,
  getQuestPointPopupHtml,
  getStaticPointPopupHtml,
  getStoryPointPopupHtml,
} from "./live-map-marker-popup";
import { LiveMapLocationGuide } from "./live-map-location-guide";
import { PanelBlock, RightSection, StaticPointSection } from "./live-map-sections";
import { findFloorForHeight, parseWhereText, type LiveMapLocation } from "./live-map-utils";

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
  const [localFocusedMarkerId, setLocalFocusedMarkerId] = useState<string | null>(null);
  const [, startFocusRouteTransition] = useTransition();
  const focusedMarkerId = localFocusedMarkerId ?? urlFocusedMarkerId;
  const locale = useAppStore((state) => state.uiLocale);
  const copy = copyByLocale[locale];
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const websocketLocation = useWsStore((state) => state.location);
  const previousLocationRef = useRef<string | null>(null);
  const initializedFilterMapRef = useRef<string | null>(null);
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
  const [selectedStaticId, setSelectedStaticId] = useState<string | null>(null);
  const questById = useMemo(
    () => createQuestCompletionMap(initialCompletionGraph),
    [initialCompletionGraph],
  );
  const sortedFloors = useMemo(
    () => [...data.floors].sort((left, right) => left.floor_no - right.floor_no),
    [data.floors],
  );
  const defaultFloor = getDefaultFloor(sortedFloors);
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
  const [questFilterQuery, setQuestFilterQuery] = useState("");
  const [storyFilterQuery, setStoryFilterQuery] = useState("");
  const [eventFilterQuery, setEventFilterQuery] = useState("");
  const [staticFilterQuery, setStaticFilterQuery] = useState("");
  const [expandedRightSections, setExpandedRightSections] = useState<Set<string>>(
    () => new Set(["quest", "story", "event"]),
  );
  const [hydratedFilterMap, setHydratedFilterMap] = useState<string | null>(null);
  const [expandedStaticCategories, setExpandedStaticCategories] = useState<Set<string>>(
    new Set(),
  );

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
    if (localFocusedMarkerId && urlFocusedMarkerId === localFocusedMarkerId) {
      setLocalFocusedMarkerId(null);
    }
  }, [localFocusedMarkerId, urlFocusedMarkerId]);

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
      .filter((point) => (
        point.story_info &&
        matchesFilterText(getStoryMarkerSearchText(point, locale), storyFilterQuery) &&
        (focusedMarkerId === `story:${point.id}` || enabledStoryIds.has(getStoryId(point)))
      ))
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
      .filter((point) => (
        point.event_info &&
        matchesFilterText(getEventMarkerSearchText(point, locale), eventFilterQuery) &&
        (focusedMarkerId === `event:${point.id}` || enabledEventIds.has(getEventId(point)))
      ))
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
      .filter((point) => (
        matchesFilterText(getStaticMarkerSearchText(point, locale, copy), staticFilterQuery) &&
        (focusedMarkerId === `static:${point.id}` || enabledStaticIds.has(point.id))
      ))
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
    eventFilterQuery,
    focusedMarkerId,
    questFilterQuery,
    staticFilterQuery,
    storyFilterQuery,
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
      setLocalFocusedMarkerId(focus);

      if (point.floor_id) {
        setSelectedFloorId(point.floor_id);
      }

      if (targetMap === normalizedName) {
        if (focusedMarkerId !== focus) {
          replaceFocusParam(focus);
        }
        return;
      }

      setLocalFocusedMarkerId(null);
      setPanel(null);
      setSelectedStaticId(null);
      router.push(`/live-map/${targetMap}?focus=${encodeURIComponent(focus)}`, {
        scroll: false,
      });
    },
    [focusedMarkerId, normalizedName, replaceFocusParam, router],
  );

  const focusStoryObjective = useCallback(
    (objective: StoryObjective, storyId: string) => {
      const point = objective.live_map_points[0];

      if (!point) {
        return;
      }

      const targetMap =
        point.map?.normalized_name ??
        objective.maps.find((map) => map.id === point.map_id)?.normalized_name ??
        objective.maps[0]?.normalized_name ??
        normalizedName;
      const focus = `story:${point.id}`;
      setLocalFocusedMarkerId(focus);

      if (point.floor_id) {
        setSelectedFloorId(point.floor_id);
      }

      if (targetMap === normalizedName) {
        if (focusedMarkerId !== focus) {
          replaceFocusParam(focus);
        }
        return;
      }

      setLocalFocusedMarkerId(null);
      setPanel(null);
      setSelectedStaticId(null);
      router.push(`/live-map/${targetMap}?focus=${encodeURIComponent(focus)}`, {
        scroll: false,
      });
    },
    [focusedMarkerId, normalizedName, replaceFocusParam, router],
  );

  const focusStaticPoint = useCallback(
    (entry: StaticEntry) => {
      const focus = `static:${entry.point.id}`;
      setLocalFocusedMarkerId(focus);

      setSelectedStaticId(entry.id);
      setPanel((current) => (current?.type === "static" ? null : current));
      setExpandedStaticCategories((current) => new Set([...current, entry.point.category || "other"]));

      if (entry.point.floor_id) {
        setSelectedFloorId(entry.point.floor_id);
      }

      if (focusedMarkerId !== focus) {
        replaceFocusParam(focus);
      }
    },
    [focusedMarkerId, replaceFocusParam],
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
    (markerId: string, { openStaticPanel = false }: { openStaticPanel?: boolean } = {}) => {
      const { id, kind } = parseCanvasMarkerId(markerId);

      if (kind === "quest") {
        const point = data.quest_points.find((entry) => entry.id === id);
        if (point?.quest_info) {
          if (point.floor_id) {
            setSelectedFloorId(point.floor_id);
          }
          setPanel({
            id: getQuestId(point),
            info: point.quest_info,
            pointId: point.id,
            type: "quest",
          });
          return true;
        }
      }

      if (kind === "story") {
        const point = data.story_points.find((entry) => entry.id === id);
        if (point?.story_info) {
          if (point.floor_id) {
            setSelectedFloorId(point.floor_id);
          }
          setPanel({
            id: getStoryId(point),
            info: point.story_info,
            objectiveId: point.objective_id,
            pointId: point.id,
            type: "story",
          });
          return true;
        }
      }

      if (kind === "event") {
        const point = data.event_points.find((entry) => entry.id === id);
        if (point?.event_info) {
          if (point.floor_id) {
            setSelectedFloorId(point.floor_id);
          }
          setPanel({
            id: getEventId(point),
            info: point.event_info,
            objectiveId: point.objective_id,
            pointId: point.id,
            type: "event",
          });
          return true;
        }
      }

      if (kind === "static") {
        const point = data.static_points.find((entry) => entry.id === id);
        if (point) {
          setSelectedStaticId(point.id);
          if (point.floor_id) {
            setSelectedFloorId(point.floor_id);
          }
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
    [data.event_points, data.quest_points, data.static_points, data.story_points],
  );

  const openPanelForMarker = useCallback(
    (marker: LiveMapCanvasMarker) => {
      setLocalFocusedMarkerId(marker.id);
      const opened = openPanelForMarkerId(marker.id);

      if (!opened || focusedMarkerId === marker.id) {
        return;
      }

      replaceFocusParam(marker.id);
    },
    [focusedMarkerId, openPanelForMarkerId, replaceFocusParam],
  );

  const clearFocusedMarker = useCallback(
    (markerId: string) => {
      if (focusedMarkerId !== markerId) {
        return;
      }

      setLocalFocusedMarkerId(null);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("focus");
      const queryString = params.toString();

      startFocusRouteTransition(() => {
        router.replace(
          queryString ? `/live-map/${normalizedName}?${queryString}` : `/live-map/${normalizedName}`,
          { scroll: false },
        );
      });
    },
    [focusedMarkerId, normalizedName, router, searchParams, startFocusRouteTransition],
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

    openPanelForMarkerId(focusedMarkerId);
  }, [focusedMarkerId, openPanelForMarkerId]);

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
            onClick={() => setIsGuideOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 bg-gray-50 text-gray-600 hover:border-orange-300 hover:text-orange-500 dark:border-[#3a3d41] dark:bg-[#2a2d31] dark:text-gray-200"
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
                searchQuery={staticFilterQuery}
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
                onFocusedMarkerClose={clearFocusedMarker}
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
              normalizedName={normalizedName}
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
                isOpen={expandedRightSections.has("quest")}
                kind="quest"
                onOpen={(entry) =>
                  entry.point.quest_info
                    ? setPanel({ id: entry.id, info: entry.point.quest_info, type: "quest" })
                    : undefined
                }
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
                onOpen={(entry) =>
                  entry.point.story_info
                    ? setPanel({ id: entry.id, info: entry.point.story_info, type: "story" })
                    : undefined
                }
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
                onOpen={(entry) =>
                  entry.point.event_info
                    ? setPanel({ id: entry.id, info: entry.point.event_info, type: "event" })
                    : undefined
                }
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
      <LiveMapLocationGuide
        copy={copy}
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />
      <LiveMapImagePopup image={imagePopup} onClose={() => setImagePopup(null)} />
    </main>
  );
}
