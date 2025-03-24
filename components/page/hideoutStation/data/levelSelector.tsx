"use client";

import { cn } from "@/lib/utils";
import type { LevelSelector } from "./stationType";
import Image from "next/image";
import { ALL_COLOR } from "@/lib/consts/colorConsts";

export default function LevelSelector({
  masterId,
  hideoutData,
}: LevelSelector) {
  const masterInfo = hideoutData.hideout_info.find(
    (station) => station.master_id === masterId
  );

  const getLevelColor = (index: number) => {
    if (index === 0) return ALL_COLOR.SAND_BEIGE;
    if (index === 1) return ALL_COLOR.BURNT_SIENNA;
    if (index === 2) return ALL_COLOR.SAGE_GREEN;
    if (index === 3) return ALL_COLOR.DUSTY_TEAL;
    if (index === 4) return ALL_COLOR.LAVENDER_BLUE;
    if (index === 5) return ALL_COLOR.MAUVE_ORCHID;
  };

  return (
    <div className="w-full">
      <div className="w-full max-w-md rounded-lg bg-NodeBackground p-8">
        <div className="flex items-center justify-center mb-12 gap-4">
          <Image
            width={60}
            height={60}
            alt={"asd"}
            src={masterInfo?.image || ""}
          />
          <div className="flex justify-center font-bold text-xl">
            {masterInfo?.master_name_kr || ""}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          {(masterInfo?.data || []).map((level, index) => (
            <button
              key={level.level_id}
              onClick={() => alert(level.level_id)}
              className="flex flex-col items-center justify-center transition-transform hover:scale-105"
            >
              <span
                className={cn("text-lg font-medium")}
                style={{ color: getLevelColor(index) }}
              >
                Level {index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
