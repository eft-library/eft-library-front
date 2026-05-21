"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  Save,
  Search,
  X,
} from "lucide-react";

import { getQuestCompletionGraph } from "@/features/quest/api";
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
  LiveMapPageData,
  LiveMapQuestInfo,
  LiveMapQuestPoint,
  LiveMapStaticPoint,
  LiveMapStoryPoint,
  StoryInfo,
  StoryObjective,
} from "@/types/api/live-map";
import type { QuestCompletionGraphNode } from "@/types/api/quest";
import type { LiveMapCanvasMarker } from "./live-map-canvas";
import { findFloorForHeight, parseWhereText, type LiveMapLocation } from "./live-map-utils";

const LiveMapCanvas = dynamic(
  () => import("./live-map-canvas").then((mod) => mod.LiveMapCanvas),
  { ssr: false },
);

type PanelState =
  | { type: "quest"; id: string; info: LiveMapQuestInfo }
  | { type: "story"; id: string; info: StoryInfo }
  | { type: "event"; id: string; info: EventInfo }
  | { type: "static"; id: string; point: LiveMapStaticPoint };

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
    allOnOff: "ALL ON/OFF",
    save: "저장",
    saved: "저장되었습니다.",
    loginRequired: "로그인이 필요합니다.",
    noItems: "표시할 항목이 없습니다.",
    requirements: "선행 조건",
    objectives: "목표",
    requiredItems: "필요 아이템",
    rewards: "보상",
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
    allOnOff: "ALL ON/OFF",
    save: "Save",
    saved: "Saved.",
    loginRequired: "Sign in required.",
    noItems: "No items to show.",
    requirements: "Requirements",
    objectives: "Objectives",
    requiredItems: "Required Items",
    rewards: "Rewards",
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
    allOnOff: "ALL ON/OFF",
    save: "保存",
    saved: "保存しました。",
    loginRequired: "ログインが必要です。",
    noItems: "表示する項目がありません。",
    requirements: "前提条件",
    objectives: "目標",
    requiredItems: "必要アイテム",
    rewards: "報酬",
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
  const name = localizedName(floor as unknown as Record<string, unknown>, locale);

  if (floor.min_z === null || floor.max_z === null) {
    return name;
  }

  return `${name} (${floor.min_z}~${floor.max_z})`;
}

function uniqueById<TItem extends { id: string }>(items: TItem[]) {
  return Array.from(new Map(items.map((item) => [item.id, item])).values());
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

function getObjectiveImages(info: LiveMapQuestInfo) {
  return info.objectives.flatMap((objective) =>
    objective.live_map_point?.details
      .filter((detail) => detail.image)
      .map((detail) => ({
        description: detail,
        image: detail.image ?? "",
      })) ?? [],
  );
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
  const copy = copyByLocale[locale];
  const { data: session } = useSession();
  const accessToken = session?.accessToken;
  const websocketLocation = useWsStore((state) => state.location);
  const previousLocationRef = useRef<string | null>(null);
  const [where, setWhere] = useState("");
  const [location, setLocation] = useState<LiveMapLocation | null>(null);
  const [mousePosition, setMousePosition] = useState<LatLng | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [panel, setPanel] = useState<PanelState | null>(null);
  const [notice, setNotice] = useState("");
  const [completedQuestIds, setCompletedQuestIds] = useState<string[]>([]);
  const [completionGraph, setCompletionGraph] = useState<QuestCompletionGraphNode[]>([]);
  const questById = useMemo(
    () => createQuestCompletionMap(completionGraph),
    [completionGraph],
  );
  const sortedFloors = useMemo(
    () => [...data.floors].sort((left, right) => left.floor_no - right.floor_no),
    [data.floors],
  );
  const [selectedFloorId, setSelectedFloorId] = useState(sortedFloors[0]?.id ?? "");
  const selectedMap =
    data.map_selector.find((entry) => entry.normalized_name === normalizedName) ??
    data.map_selector[0];
  const selectedFloor =
    sortedFloors.find((floor) => floor.id === selectedFloorId) ?? sortedFloors[0] ?? null;

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
  const staticEntries = useMemo(
    () => uniqueById(data.static_points.map((point) => ({ id: point.id, point }))),
    [data.static_points],
  );
  const [enabledQuestIds, setEnabledQuestIds] = useState<Set<string>>(new Set());
  const [enabledStoryIds, setEnabledStoryIds] = useState<Set<string>>(new Set());
  const [enabledEventIds, setEnabledEventIds] = useState<Set<string>>(new Set());
  const [enabledStaticIds, setEnabledStaticIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setEnabledQuestIds(new Set(questEntries.map((entry) => entry.id)));
  }, [questEntries]);

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
      .filter((point) => point.quest_info && enabledQuestIds.has(getQuestId(point)))
      .map<LiveMapCanvasMarker>((point) => ({
        floorId: point.floor_id,
        id: `quest:${point.id}`,
        kind: "quest",
        label: localizedName(point.quest_info?.quest as unknown as Record<string, unknown>, locale),
        x: point.x,
        y: point.y,
      }));
    const storyMarkers = data.story_points
      .filter((point) => point.story_info && enabledStoryIds.has(getStoryId(point)))
      .map<LiveMapCanvasMarker>((point) => ({
        floorId: point.floor_id,
        id: `story:${point.id}`,
        kind: "story",
        label: localizedTitle(point.story_info?.story as unknown as Record<string, unknown>, locale),
        x: point.x,
        y: point.y,
      }));
    const eventMarkers = data.event_points
      .filter((point) => point.event_info && enabledEventIds.has(getEventId(point)))
      .map<LiveMapCanvasMarker>((point) => ({
        floorId: point.floor_id,
        id: `event:${point.id}`,
        kind: "event",
        label: localizedTitle(point.event_info?.event as unknown as Record<string, unknown>, locale),
        x: point.x,
        y: point.y,
      }));
    const staticMarkers = data.static_points
      .filter((point) => enabledStaticIds.has(point.id))
      .map<LiveMapCanvasMarker>((point) => ({
        floorId: point.floor_id,
        id: `static:${point.id}`,
        kind: "static",
        label: localizedName(point as unknown as Record<string, unknown>, locale),
        x: point.x,
        y: point.y,
      }));

    return [...questMarkers, ...storyMarkers, ...eventMarkers, ...staticMarkers];
  }, [
    data.event_points,
    data.quest_points,
    data.static_points,
    data.story_points,
    enabledEventIds,
    enabledQuestIds,
    enabledStaticIds,
    enabledStoryIds,
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

  const openPanelForMarker = useCallback(
    (marker: LiveMapCanvasMarker) => {
      const [kind, id] = marker.id.split(":");

      if (kind === "quest") {
        const point = data.quest_points.find((entry) => entry.id === id);
        if (point?.quest_info) {
          setPanel({ id: getQuestId(point), info: point.quest_info, type: "quest" });
        }
      }

      if (kind === "story") {
        const point = data.story_points.find((entry) => entry.id === id);
        if (point?.story_info) {
          setPanel({ id: getStoryId(point), info: point.story_info, type: "story" });
        }
      }

      if (kind === "event") {
        const point = data.event_points.find((entry) => entry.id === id);
        if (point?.event_info) {
          setPanel({ id: getEventId(point), info: point.event_info, type: "event" });
        }
      }

      if (kind === "static") {
        const point = data.static_points.find((entry) => entry.id === id);
        if (point) {
          setPanel({ id: point.id, point, type: "static" });
        }
      }
    },
    [data.event_points, data.quest_points, data.static_points, data.story_points],
  );

  function toggleQuestCompletionState(questId: string) {
    setCompletedQuestIds((current) =>
      toggleQuestCompletion({
        checked: !current.includes(questId),
        completed: current,
        questById,
        questId,
      }),
    );
  }

  async function handleSaveQuestProgress() {
    if (!accessToken) {
      showNotice(copy.loginRequired);
      return;
    }

    try {
      const savedQuestList = await saveRoadmap(completedQuestIds, accessToken);
      setCompletedQuestIds(savedQuestList.filter((value): value is string => typeof value === "string"));
      showNotice(copy.saved);
    } catch {
      showNotice(copy.loginRequired);
    }
  }

  useEffect(() => {
    setSelectedFloorId(sortedFloors[0]?.id ?? "");
  }, [normalizedName, sortedFloors]);

  useEffect(() => {
    if (!websocketLocation || websocketLocation === previousLocationRef.current) {
      return;
    }

    previousLocationRef.current = websocketLocation;
    setWhere(websocketLocation);
    applyWhereText(websocketLocation);
  }, [websocketLocation]);

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
          <aside className="hidden w-60 shrink-0 flex-col border-r border-gray-200 bg-white dark:border-[#3a3d41] dark:bg-[#1f2124] md:flex">
            <PanelBlock title={copy.map}>
              <div className="space-y-1">
                {data.map_selector.map((entry) => {
                  const isSelected = entry.normalized_name === normalizedName;

                  return (
                    <button
                      key={entry.normalized_name}
                      type="button"
                      onClick={() => router.push(`/live-map/${entry.normalized_name}`)}
                      className={cn(
                        "flex h-8 w-full items-center justify-between rounded-md px-2 text-left text-sm",
                        isSelected
                          ? "bg-orange-500 text-white dark:text-[#1e2124]"
                          : "text-gray-700 hover:bg-gray-100 hover:text-orange-500 dark:text-gray-300 dark:hover:bg-[#2a2d31]",
                      )}
                    >
                      <span>{localizedName(entry as unknown as Record<string, unknown>, locale)}</span>
                      {isSelected ? <ChevronDown className="h-4 w-4" /> : null}
                    </button>
                  );
                })}
              </div>
            </PanelBlock>

            <PanelBlock title={copy.floor}>
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

            <div className="mt-auto border-t border-gray-200 p-3 text-xs text-gray-500 dark:border-[#3a3d41] dark:text-gray-400">
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
            </div>
          </aside>

          <section className="relative min-w-0 flex-1 bg-gray-200 dark:bg-[#15171a]">
            {selectedFloor && data.coordinate_info ? (
              <LiveMapCanvas
                activeFloorId={selectedFloor.id}
                coordinateInfo={data.coordinate_info}
                floors={sortedFloors}
                location={location}
                mapKey={normalizedName}
                markers={visibleMarkers}
                onMarkerClick={openPanelForMarker}
                onMousePositionChange={setMousePosition}
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
              locale={locale}
              onClose={() => setPanel(null)}
              onToggleQuest={toggleQuestCompletionState}
              panel={panel}
            />
          ) : null}

          <aside className="hidden w-72 shrink-0 flex-col border-l border-gray-200 bg-white dark:border-[#3a3d41] dark:bg-[#1f2124] lg:flex">
            <div className="min-h-0 flex-1 overflow-y-auto p-3">
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
                saveLabel={copy.save}
                selectedId={panel?.type === "quest" ? panel.id : null}
                title={copy.quests}
                onSave={handleSaveQuestProgress}
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
              <RightSection
                allLabel={copy.allOnOff}
                completedQuestIds={completedQuestIds}
                enabledIds={enabledStaticIds}
                emptyLabel={copy.noItems}
                items={staticEntries}
                kind="static"
                onOpen={(entry) => setPanel({ id: entry.id, point: entry.point, type: "static" })}
                onToggle={(id) => toggleSet(setEnabledStaticIds, id)}
                onToggleAll={() => toggleAll(setEnabledStaticIds, staticEntries.map((entry) => entry.id))}
                selectedId={panel?.type === "static" ? panel.id : null}
                title={copy.staticPoints}
                locale={locale}
              />
            </div>
            {notice ? (
              <div className="border-t border-gray-200 px-3 py-2 text-xs font-bold text-orange-500 dark:border-[#3a3d41]">
                {notice}
              </div>
            ) : null}
          </aside>
        </div>
      </div>
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
  onSave,
  onToggle,
  onToggleAll,
  onToggleComplete,
  saveLabel,
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
  onSave?: () => void;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onToggleComplete?: (id: string) => void;
  saveLabel?: string;
  selectedId: string | null;
  title: string;
}) {
  return (
    <section className="border-b border-gray-200 py-3 first:pt-0 last:border-b-0 dark:border-[#3a3d41]">
      <div className="mb-2 flex h-9 items-center justify-between gap-2 rounded-md bg-gray-100 px-2 dark:bg-[#2a2d31]">
        <h2 className="text-sm font-black text-gray-900 dark:text-white">{title}</h2>
        <div className="flex items-center gap-1">
          {onSave ? (
            <button
              type="button"
              onClick={onSave}
              className="inline-flex h-6 items-center gap-1 rounded px-2 text-xs font-bold text-orange-500 hover:bg-white dark:hover:bg-[#3a3d41]"
            >
              <Save className="h-3 w-3" />
              {saveLabel}
            </button>
          ) : null}
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
                  className="flex h-8 min-w-0 items-center rounded px-1 text-left hover:bg-gray-100 dark:hover:bg-[#2a2d31]"
                >
                  <span
                    className={cn(
                      "truncate text-gray-700 dark:text-gray-300",
                      isSelected ? "font-black text-orange-500" : "",
                    )}
                  >
                    {label}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onToggle(entry.id)}
                  className="flex h-8 items-center justify-center rounded-r hover:bg-gray-200 dark:hover:bg-[#3a3d41]"
                  aria-label={label}
                >
                  <span
                    className={cn(
                      "h-4 w-8 rounded-full border p-0.5",
                      enabled
                        ? "border-orange-500 bg-orange-500"
                        : "border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-[#15171a]",
                    )}
                  >
                    <span
                      className={cn(
                        "block h-3 w-3 rounded-full bg-white transition",
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
  locale,
  onClose,
  onToggleQuest,
  panel,
}: {
  completedQuestIds: string[];
  copy: (typeof copyByLocale)[Locale];
  locale: Locale;
  onClose: () => void;
  onToggleQuest: (questId: string) => void;
  panel: PanelState;
}) {
  return (
    <aside className="hidden w-72 shrink-0 flex-col border-l border-gray-200 bg-white dark:border-[#3a3d41] dark:bg-[#1f2124] xl:flex">
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
            info={panel.info}
            locale={locale}
            onToggle={() => onToggleQuest(panel.info.quest.id)}
          />
        ) : null}
        {panel.type === "story" ? (
          <StoryPanel copy={copy} info={panel.info} locale={locale} />
        ) : null}
        {panel.type === "event" ? (
          <EventPanel copy={copy} info={panel.info} locale={locale} />
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
  locale,
  onToggle,
}: {
  completed: boolean;
  copy: (typeof copyByLocale)[Locale];
  info: LiveMapQuestInfo;
  locale: Locale;
  onToggle: () => void;
}) {
  const images = getObjectiveImages(info);

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
          <h3 className="text-sm font-black leading-tight text-gray-950 dark:text-white">
            {localizedName(info.quest as unknown as Record<string, unknown>, locale)}
          </h3>
          {info.trader ? (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {localizedName(info.trader as unknown as Record<string, unknown>, locale)}
            </p>
          ) : null}
        </div>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "inline-flex h-7 items-center gap-1 rounded px-2 text-xs font-black",
          completed
            ? "bg-emerald-500 text-white"
            : "bg-orange-500 text-white dark:text-[#1e2124]",
        )}
      >
        {completed ? <Check className="h-3.5 w-3.5" /> : null}
        {completed ? "Completed" : "Progress"}
      </button>
      <ObjectiveList copy={copy} locale={locale} objectives={info.objectives} />
      <RelatedList
        copy={copy}
        locale={locale}
        next={info.next_quests}
        previous={info.require_quests}
      />
      {images.length > 0 ? <ImageStrip images={images} locale={locale} /> : null}
    </div>
  );
}

function StoryPanel({
  copy,
  info,
  locale,
}: {
  copy: (typeof copyByLocale)[Locale];
  info: StoryInfo;
  locale: Locale;
}) {
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
      <StoryObjectiveList copy={copy} locale={locale} objectives={info.objectives} />
    </div>
  );
}

function EventPanel({
  copy,
  info,
  locale,
}: {
  copy: (typeof copyByLocale)[Locale];
  info: EventInfo;
  locale: Locale;
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
      <EventObjectiveList copy={copy} locale={locale} objectives={info.objectives} />
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
}: {
  copy: (typeof copyByLocale)[Locale];
  locale: Locale;
  objectives: LiveMapQuestInfo["objectives"];
}) {
  return (
    <section>
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-400">
        {copy.objectives}
      </h4>
      <ul className="space-y-2">
        {objectives.map((objective) => (
          <li key={objective.objective_id} className="space-y-2 text-xs text-gray-700 dark:text-gray-300">
            <ObjectiveLine
              count={objective.count}
              description={localizedDescription(objective as unknown as Record<string, unknown>, locale)}
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
  objectives,
}: {
  copy: (typeof copyByLocale)[Locale];
  locale: Locale;
  objectives: StoryObjective[];
}) {
  return (
    <section>
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-400">
        {copy.objectives}
      </h4>
      <NestedStoryObjectives locale={locale} objectives={objectives} />
    </section>
  );
}

function EventObjectiveList({
  copy,
  locale,
  objectives,
}: {
  copy: (typeof copyByLocale)[Locale];
  locale: Locale;
  objectives: EventObjective[];
}) {
  return (
    <section>
      <h4 className="mb-2 text-xs font-bold text-gray-500 dark:text-gray-400">
        {copy.objectives}
      </h4>
      <NestedEventObjectives locale={locale} objectives={objectives} />
    </section>
  );
}

function NestedStoryObjectives({
  locale,
  objectives,
}: {
  locale: Locale;
  objectives: StoryObjective[];
}) {
  return (
    <ul className="space-y-2">
      {objectives.map((objective) => (
        <li key={objective.objective_id} className="space-y-2">
          <ObjectiveLine
            count={objective.count}
            description={localizedDescription(objective as unknown as Record<string, unknown>, locale)}
            optional={objective.is_optional}
          />
          {objective.items.length > 0 ? <ItemRow items={objective.items} locale={locale} /> : null}
          {objective.children.length > 0 ? (
            <div className="border-l border-gray-200 pl-3 dark:border-[#3a3d41]">
              <NestedStoryObjectives locale={locale} objectives={objective.children} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function NestedEventObjectives({
  locale,
  objectives,
}: {
  locale: Locale;
  objectives: EventObjective[];
}) {
  return (
    <ul className="space-y-2">
      {objectives.map((objective) => (
        <li key={objective.objective_id} className="space-y-2">
          <ObjectiveLine
            count={objective.count}
            description={localizedDescription(objective as unknown as Record<string, unknown>, locale)}
            optional={objective.is_optional}
          />
          {objective.items.length > 0 ? <ItemRow items={objective.items} locale={locale} /> : null}
          {objective.children.length > 0 ? (
            <div className="border-l border-gray-200 pl-3 dark:border-[#3a3d41]">
              <NestedEventObjectives locale={locale} objectives={objective.children} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function ObjectiveLine({
  count,
  description,
  optional,
}: {
  count: number | null;
  description: string;
  optional: boolean;
}) {
  return (
    <div className="flex gap-2 text-xs leading-5 text-gray-700 dark:text-gray-300">
      <Route className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-500" />
      <div className="min-w-0">
        <p>{description || "-"}</p>
        <div className="mt-1 flex gap-1">
          {optional ? (
            <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
              Optional
            </span>
          ) : null}
          {count !== null ? (
            <span className="rounded bg-orange-50 px-1.5 py-0.5 text-[10px] font-bold text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
              x{count}
            </span>
          ) : null}
        </div>
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
    <div className="flex flex-wrap gap-2 pl-5">
      {items.map((entry) => (
        <div key={`${entry.item.id}-${entry.item_role ?? entry.item_type ?? "item"}`} className="w-12">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded border border-gray-200 bg-gray-50 dark:border-[#3a3d41] dark:bg-[#15171a]">
            {entry.item.image ? (
              <img
                alt={localizedName(entry.item as unknown as Record<string, unknown>, locale)}
                className="h-full w-full object-cover"
                src={entry.item.image}
              />
            ) : null}
          </div>
          <p className="mt-0.5 truncate text-center text-[10px] text-gray-500 dark:text-gray-400">
            x{entry.quantity ?? entry.count ?? 1}
          </p>
        </div>
      ))}
    </div>
  );
}

function RelatedList({
  copy,
  locale,
  next,
  previous,
}: {
  copy: (typeof copyByLocale)[Locale];
  locale: Locale;
  next: LiveMapQuestInfo["next_quests"];
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
            <p key={quest.id} className="text-xs text-gray-600 dark:text-gray-300">
              ← {localizedName(quest as unknown as Record<string, unknown>, locale)}
            </p>
          ))}
        </div>
      ) : null}
      {next.length > 0 ? (
        <div>
          <h4 className="mb-1 text-xs font-bold text-gray-500 dark:text-gray-400">
            {copy.next}
          </h4>
          {next.map((quest) => (
            <p key={quest.id} className="text-xs text-gray-600 dark:text-gray-300">
              → {localizedName(quest as unknown as Record<string, unknown>, locale)}
            </p>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ImageStrip({
  images,
  locale,
}: {
  images: Array<{ description: { description_en: string | null; description_ko: string | null; description_ja: string | null }; image: string }>;
  locale: Locale;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  if (!active) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded border border-gray-200 dark:border-[#3a3d41]">
      <img
        alt={localizedDescription(active.description as unknown as Record<string, unknown>, locale)}
        className="h-40 w-full object-cover"
        src={active.image}
      />
      <div className="flex gap-1 overflow-x-auto bg-gray-50 p-2 dark:bg-[#15171a]">
        {images.map((image, index) => (
          <button
            key={`${image.image}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-12 w-16 shrink-0 overflow-hidden rounded border",
              index === activeIndex ? "border-orange-500" : "border-transparent opacity-60",
            )}
          >
            <img
              alt={localizedDescription(image.description as unknown as Record<string, unknown>, locale)}
              className="h-full w-full object-cover"
              src={image.image}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

function PanelBlock({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="border-b border-gray-200 p-3 dark:border-[#3a3d41]">
      <h2 className="mb-2 text-xs font-black uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {title}
      </h2>
      {children}
    </section>
  );
}
