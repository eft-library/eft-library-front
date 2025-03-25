"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { StationDetail } from "./stationType";
import { formatImage } from "@/lib/func/formatImage";
import DetailRequire from "./detailRequire";
import DetailBonus from "./detailBonus";

export default function StationDetail({ levelId, hideoutData }: StationDetail) {
  const splitLevel = levelId.split("-");

  const masterInfo = hideoutData.hideout_info.find(
    (station) => station.master_id === splitLevel[0]
  );

  const levelItem = masterInfo?.data.find((sub) => sub.level_id === levelId);

  const changeTime = (sec: number | undefined) => {
    if (!sec) return "0 시간";
    return Math.floor(sec / 3600) + " 시간 ";
  };

  return (
    <div className="w-full border-solid border-white border-2 rounded-lg overflow-hidden">
      <div className="p-5 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 from-amber-700/80 to-amber-900/80 rounded-lg"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  width={60}
                  height={60}
                  alt={"asd"}
                  src={
                    (masterInfo &&
                      masterInfo.image &&
                      formatImage(masterInfo.image)) ||
                    ""
                  }
                />
              </div>
            </div>
            <div>
              <p className="text-xl font-medium font-bold">
                {masterInfo ? masterInfo.master_name_kr : ""}
              </p>
              <p className="text-lg font-bold">Level {splitLevel[1]}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-2 w-[140px]">
            <Button className="px-4 font-bold py-2 border-2 bg-Background border-LimeGreen text-white rounded-lg hover:bg-NeutralGray text-lg">
              건설
            </Button>
            <Button className="px-4 font-bold py-2 border-2 bg-Background border-Red text-white rounded-lg hover:bg-NeutralGray text-lg">
              파괴
            </Button>
          </div>
        </div>

        <div>
          <p className="text-white text-xl font-bold">건설 시간</p>
          <p className="text-white text-base font-bold">
            {changeTime(levelItem?.level_info[0].construction_time)}
          </p>
        </div>

        <div>
          <h3 className="text-white text-xl font-bold mb-3">요구사항</h3>
          <div className="w-full flex flex-col gap-4">
            {levelItem && levelItem.trader_require && (
              <DetailRequire items={levelItem?.trader_require} type="trader" />
            )}
            {levelItem && levelItem.station_require && (
              <DetailRequire
                items={levelItem?.station_require}
                type="station"
              />
            )}
            {levelItem && levelItem.skill_require && (
              <DetailRequire items={levelItem?.skill_require} type="skill" />
            )}
            {levelItem && levelItem.item_require && (
              <DetailRequire items={levelItem?.item_require} type="item" />
            )}
          </div>
        </div>

        {/* Bonus */}
        <div>
          <h3 className="text-white text-xl font-bold mb-3">보너스</h3>
          <div className="w-full flex flex-col gap-2">
            {levelItem && levelItem.bonus && (
              <DetailBonus bonuses={levelItem?.bonus} />
            )}
            {levelItem && levelItem.crafts && (
              <>
                {levelItem.crafts.map((craft, index) => (
                  <span className="font-bold text-sm" key={index}>
                    {craft.name_kr} 제작
                  </span>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
