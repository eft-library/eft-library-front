"use client";

import type { LevelSelector } from "./stationType";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import TextSpan from "@/components/custom/gridContents/textSpan";

export default function LevelSelector({
  masterId,
  hideoutData,
  selectLevelId,
  onChangeLevel,
}: LevelSelector) {
  const masterInfo = hideoutData.hideout_info.find(
    (station) => station.master_id === masterId
  );

  const getLevelColor = (index: number) => {
    if (index === 1) return "text-SandyOchre";
    if (index === 2) return "text-BurningOrange";
    if (index === 3) return "text-MossGreen";
    if (index === 4) return "text-CobaltBlue";
    if (index === 5) return "text-IndigoViolet";
    if (index === 6) return "text-RoyalPurple";
    return "text-AshGray";
  };

  return (
    <div className="w-[450px] absolute bottom-10 right-60">
      <TextSpan textColor="GoldenYellow">
        LV를 눌러 상세 정보를 확인하세요!
      </TextSpan>
      <div className="w-full max-w-md rounded-lg bg-NodeBackground p-8">
        <div className="flex items-center justify-center mb-4 gap-4">
          {getStationSVG(masterId, 60, 60, ALL_COLOR.SoftAlloy)}
          <div className="flex justify-center font-bold text-xl">
            {masterInfo?.master_name_kr || ""}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(masterInfo?.data || []).map((level, index) => (
            <button
              key={level.level_id}
              onClick={() => onChangeLevel(level.level_id)}
              className={`flex flex-col items-center p-2 justify-center ${
                selectLevelId === level.level_id &&
                "border-2 border-solid border-white rounded-lg"
              }`}
            >
              <span className={`text-lg font-bold ${getLevelColor(index + 1)}`}>
                LV {index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
