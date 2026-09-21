"use client";

import type { LiveMapFloor } from "@/types/api/live-map";
import type { LiveMapPartyController } from "./use-live-map-party";
import { PartyField, partyInput } from "./party-forms";
import type { MapSelectorEntry } from "@/types/api/map-of-tarkov";
import { partyText, type PartyLocale } from "./copy";

export function PartyLiveControls({
  party,
  locale,
  floors,
  mapOptions,
}: {
  party: LiveMapPartyController;
  locale: PartyLocale;
  floors: LiveMapFloor[];
  mapOptions: MapSelectorEntry[];
}) {
  const t = (ko: string, en: string, ja: string) =>
    partyText(locale, ko, en, ja);
  return (
    <div className="space-y-2 border-t border-gray-200 pt-3 dark:border-[#3a3d41]">
      <h3 className="text-sm font-bold">
        {t("위치 공유", "Party positions", "位置の共有")}
      </h3>
      {party.gameMapName ? (
        <p className="text-xs text-gray-600 dark:text-gray-300">
          {t("플레이 중인 지도", "In-game map", "プレイ中のマップ")}:{" "}
          {mapOptions.find((m) => m.normalized_name === party.gameMapName)?.[
            `name_${locale}`
          ] || party.gameMapName}
        </p>
      ) : (
        <PartyField
          label={t("플레이 중인 지도", "In-game map", "プレイ中のマップ")}
        >
          <select
            className={partyInput}
            value={party.manualMapName}
            onChange={(e) => party.setManualMapName(e.target.value)}
          >
            <option value="">
              {t(
                "위치 공유에 사용할 지도 선택",
                "Choose the map for your position",
                "位置を共有するマップを選択",
              )}
            </option>
            {mapOptions.map((map) => (
              <option key={map.normalized_name} value={map.normalized_name}>
                {map[`name_${locale}`] || map.name_en || map.normalized_name}
              </option>
            ))}
          </select>
        </PartyField>
      )}
      {!party.actualMapName && (
        <p
          role="status"
          className="text-xs text-orange-700 dark:text-orange-300"
        >
          {t(
            "게임 지도를 확인할 수 없습니다. 플레이 중인 지도를 선택한 뒤 새 위치를 보내 주세요.",
            "Choose your in-game map, then send a new position to share it.",
            "プレイ中のマップを選んでから、新しい位置を送信してください。",
          )}
        </p>
      )}
      {party.locationIssue === "map-unavailable" && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400">
          {t(
            "위치 지도를 불러오지 못했습니다. 지도를 확인한 뒤 새 위치를 보내 주세요.",
            "Could not load the position map. Check the map and send a new position.",
            "位置のマップを読み込めませんでした。マップを確認して新しい位置を送信してください。",
          )}
        </p>
      )}
      <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
        {t(
          "내 위치가 업데이트되면 파티원에게도 자동으로 공유됩니다. 마지막 위치는 다음 업데이트까지 유지됩니다.",
          "When your location updates, it is automatically shared with your party. Your last position stays visible until the next update.",
          "自分の位置が更新されると、パーティーメンバーにも自動で共有されます。最後の位置は次の更新まで表示されます。",
        )}
      </p>
      {party.positions.length > 0 && (
        <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
          {party.positions.map((p) => (
            <li key={p.data.member_id}>
              {p.data.nickname} ·{" "}
              {(p.data.map_id ?? party.snapshot?.room.map_id) === party.mapId
                ? floors.find((f) => f.id === p.data.floor_id)?.[
                    `name_${locale}`
                  ] || t("다른 층", "Another floor", "他の階")
                : t("다른 지도", "Another map", "別のマップ")}{" "}
              · X {p.data.x.toFixed(1)} / Z {p.data.z.toFixed(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
