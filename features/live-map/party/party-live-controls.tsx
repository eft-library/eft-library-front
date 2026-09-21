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
