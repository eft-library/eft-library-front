"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { LatLng } from "leaflet";
import {
  ChevronDown,
  CircleHelp,
  Layers,
  LocateFixed,
  MapPinned,
  Search,
} from "lucide-react";

import type { Locale } from "@/i18n/config";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import { useWsStore } from "@/store/ws-store";
import type { LiveMapFloor, LiveMapPageData } from "@/types/api/live-map";
import { findFloorForHeight, parseWhereText, type LiveMapLocation } from "./live-map-utils";

const LiveMapCanvas = dynamic(
  () => import("./live-map-canvas").then((mod) => mod.LiveMapCanvas),
  { ssr: false },
);

const copyByLocale = {
  ko: {
    title: "Live Map",
    locate: "Locate",
    placeholder: "좌표 또는 스크린샷 파일명을 입력하세요",
    map: "지도",
    floor: "층",
    coordinates: "좌표",
    height: "높이",
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

function getFloorLabel(floor: LiveMapFloor, locale: Locale) {
  const name = localizedName(floor as unknown as Record<string, unknown>, locale);

  if (floor.min_z === null || floor.max_z === null) {
    return name;
  }

  return `${name} (${floor.min_z}~${floor.max_z})`;
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
  const websocketLocation = useWsStore((state) => state.location);
  const previousLocationRef = useRef<string | null>(null);
  const [where, setWhere] = useState("");
  const [location, setLocation] = useState<LiveMapLocation | null>(null);
  const [mousePosition, setMousePosition] = useState<LatLng | null>(null);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
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
            className="inline-flex h-9 items-center gap-2 rounded-md bg-orange-500 px-3 text-sm font-black text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 dark:text-[#1e2124] dark:focus:ring-offset-[#1f2124]"
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
                      className={`flex h-8 w-full items-center justify-between rounded-md px-2 text-left text-sm ${
                        isSelected
                          ? "bg-orange-500 text-white dark:text-[#1e2124]"
                          : "text-gray-700 hover:bg-gray-100 hover:text-orange-500 dark:text-gray-300 dark:hover:bg-[#2a2d31]"
                      }`}
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
                        className={`h-2.5 w-2.5 rounded-full ${
                          isSelected ? "bg-orange-500" : "bg-gray-300 dark:bg-gray-600"
                        }`}
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
        </div>
      </div>
    </main>
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
