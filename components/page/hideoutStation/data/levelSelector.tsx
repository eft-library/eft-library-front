"use client";

import { cn } from "@/lib/utils";
import type { LevelSelector } from "./stationType";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import TextSpan from "@/components/custom/gridContents/textSpan";

export default function LevelSelector({
  masterId,
  hideoutData,
  onChangeLevel,
}: LevelSelector) {
  const masterInfo = hideoutData.hideout_info.find(
    (station) => station.master_id === masterId
  );

  const getLevelColor = (index: number) => {
    if (index === 1) return ALL_COLOR.SAND_BEIGE;
    if (index === 2) return ALL_COLOR.BURNT_SIENNA;
    if (index === 3) return ALL_COLOR.SAGE_GREEN;
    if (index === 4) return ALL_COLOR.DUSTY_TEAL;
    if (index === 5) return ALL_COLOR.LAVENDER_BLUE;
    if (index === 6) return ALL_COLOR.MAUVE_ORCHID;
    return ALL_COLOR.ASH_GRAY;
  };

  return (
    <div className="w-[450px] absolute bottom-10 right-60">
      <TextSpan textColor="GoldenYellow">
        LV를 눌러 상세 정보를 확인하세요!
      </TextSpan>
      <div className="w-full max-w-md rounded-lg bg-NodeBackground p-8">
        <div className="flex items-center justify-center mb-12 gap-4">
          {getStationSVG(masterId, 60, 60, ALL_COLOR.ASH_GRAY)}
          <div className="flex justify-center font-bold text-xl">
            {masterInfo?.master_name_kr || ""}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {(masterInfo?.data || []).map((level, index) => (
            <button
              key={level.level_id}
              onClick={() => onChangeLevel(level.level_id)}
              className="flex flex-col items-center justify-center transition-transform hover:scale-105"
            >
              <span
                className={cn("text-lg font-medium")}
                style={{ color: getLevelColor(index + 1) }}
              >
                LV {index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
