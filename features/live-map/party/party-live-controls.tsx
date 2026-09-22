"use client";

import type { LiveMapFloor } from "@/types/api/live-map";
import type { LiveMapPartyController } from "./use-live-map-party";
import { partyText, type PartyLocale } from "./copy";

export function PartyLiveControls({
  party,
  locale,
  floors,
}: {
  party: LiveMapPartyController;
  locale: PartyLocale;
  floors: LiveMapFloor[];
}) {
  const t = (ko: string, en: string, ja: string) =>
    partyText(locale, ko, en, ja);
  return (
    <div className="space-y-2 border-t border-gray-200 pt-3 dark:border-[#3a3d41]">
      <h3 className="text-sm font-bold">
        {t("위치 공유", "Party positions", "位置の共有")}
      </h3>
      {party.locationIssue === "map-unavailable" && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400">
          {t(
            "현재 지도에서 위치를 확인하지 못했습니다. 지도와 층을 확인한 뒤 새 위치를 보내 주세요.",
            "Could not place your position on this map. Check the map and floor, then send a new position.",
            "現在のマップで位置を確認できませんでした。マップと階を確認して、新しい位置を送信してください。",
          )}
        </p>
      )}
      <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
        {t(
          "내 위치는 현재 보고 있는 지도에 자동으로 공유되며, 다음 위치가 올 때까지 유지됩니다.",
          "Your position is shared automatically on the map you are viewing and remains until the next update.",
          "自分の位置は現在表示中のマップに自動共有され、次の更新まで表示されます。",
        )}
      </p>
      {party.positions.length > 0 && (
        <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
          {party.positions.map((position) => (
            <li key={position.data.member_id}>
              {position.data.nickname} ·{" "}
              {(position.data.map_id ?? party.snapshot?.room.map_id) ===
              party.mapId
                ? floors.find((floor) => floor.id === position.data.floor_id)?.[
                    `name_${locale}`
                  ] || t("다른 층", "Another floor", "他の階")
                : t("다른 지도", "Another map", "別のマップ")}{" "}
              · X {position.data.x.toFixed(1)} / Z {position.data.z.toFixed(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
