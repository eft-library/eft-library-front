"use client";

import type { LiveMapFloor } from "@/types/api/live-map";
import type { LiveMapPartyController } from "./use-live-map-party";
import { partyText, type PartyLocale } from "./copy";
import { partyButton } from "./party-forms";

export function PartyLiveControls({
  party,
  locale,
  floors,
  activeFloorId,
  onPlace,
}: {
  party: LiveMapPartyController;
  locale: PartyLocale;
  floors: LiveMapFloor[];
  activeFloorId: string;
  onPlace: (kind: "marker" | "ping" | "position") => void;
}) {
  const t = (ko: string, en: string, ja: string) =>
    partyText(locale, ko, en, ja);
  return (
    <div className="space-y-2 border-t border-gray-200 pt-3 dark:border-[#3a3d41]">
      <h3 className="text-sm font-bold">
        {t(
          "핑·위치 공유",
          "Pings & positions",
          "ピン・手動位置の共有",
        )}
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className={partyButton}
          disabled={!party.connected || party.busy || !activeFloorId}
          onClick={() => onPlace("ping")}
        >
          {t("순간 핑 찍기", "Place a ping", "ピンを送信")}
        </button>
        <button
          type="button"
          className={partyButton}
          disabled={!party.connected || party.busy || !activeFloorId}
          onClick={() => onPlace("position")}
        >
          {t("내 위치 찍기", "Place my position", "自分の位置を指定")}
        </button>
      </div>
      <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
        {t(
          "기존 위치 입력·WebSocket 수신 시 파티에도 공유합니다. 수신한 위치는 다음 입력까지 유지됩니다. 핑은 5초, 지도에 직접 찍은 위치는 60초간 표시됩니다.",
          "Location input and incoming location updates are shared with the party. Received positions remain until replaced. Pings last 5s; manually placed positions last 60s.",
          "位置入力・位置の受信時にパーティーにも共有します。受信した位置は次の入力まで維持します。ピンは5秒、地図で指定した位置は60秒で消えます。",
        )}
      </p>
      {party.pings.filter((p) => p.data.floor_id !== activeFloorId).length >
        0 && (
        <p
          role="status"
          className="rounded bg-orange-50 p-2 text-xs text-orange-800 dark:bg-orange-950 dark:text-orange-200"
        >
          {t("다른 층의 핑", "Pings on other floors", "他の階のピン")}:{" "}
          {floors
            .filter((f) =>
              party.pings.some(
                (p) => p.data.floor_id === f.id && f.id !== activeFloorId,
              ),
            )
            .map(
              (f) =>
                `${f[`name_${locale}`] ?? f.floor_no} (${party.pings.filter((p) => p.data.floor_id === f.id).length})`,
            )
            .join(", ")}
        </p>
      )}
      {party.positions.length > 0 && (
        <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-300">
          {party.positions.map((p) => (
            <li key={p.data.member_id}>
              {p.data.nickname} ·{" "}
              {floors.find((f) => f.id === p.data.floor_id)?.[
                `name_${locale}`
              ] ?? t("다른 층", "Another floor", "他の階")}{" "}
              · X {p.data.x.toFixed(1)} / Z {p.data.z.toFixed(1)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
