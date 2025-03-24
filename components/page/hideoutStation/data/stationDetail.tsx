"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import type { StationDetail } from "./stationType";
import { formatImage } from "@/lib/func/formatImage";

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
        {/* Header */}
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

        {/* Construction Time */}
        <div>
          <p className="text-white text-xl font-bold">
            건설 시간 : {changeTime(levelItem?.level_info[0].construction_time)}
          </p>
        </div>

        {/* Required Items */}
        <div>
          <h3 className="text-white text-xl font-bold mb-3">필요:</h3>
          <div className="grid grid-cols-7 gap-2">
            {/* Item 1 */}
            <div className="relative">
              <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
                <div className="h-20 w-full relative">
                  <div className="absolute inset-0 bg-purple-900/20"></div>
                </div>
                <div className="absolute bottom-0 right-0 bg-black/80 px-1 rounded-tl-md">
                  <span className="text-white text-xs">x1</span>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="relative">
              <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden">
                <div className="h-20 w-full relative">
                  <div className="absolute inset-0 bg-blue-900/20"></div>
                </div>
                <div className="absolute bottom-0 right-0 bg-black/80 px-1 rounded-tl-md">
                  <span className="text-white text-xs">x1</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Level Icons */}
        <div className="flex space-x-4 mt-4">
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-1"></div>
            <span className="text-white text-sm">Level 2</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-1 flex items-center justify-center border border-gray-700 rounded-md bg-black">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                </div>
              </div>
            </div>
            <span className="text-white text-sm">Level 3</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-1 flex items-center justify-center border border-gray-700 rounded-md bg-black">
              <div className="w-8 h-8 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white/20 rounded"></div>
                </div>
              </div>
            </div>
            <span className="text-white text-sm">Level 2</span>
          </div>
        </div>

        {/* Bonus */}
        <div>
          <h3 className="text-white text-xl font-bold mb-3">보너스:</h3>
          <p className="text-gray-300 mb-3">
            수리 키트를 사용하면 방어구 수리 비용 감소 +3 %
          </p>

          <div className="grid grid-cols-4 gap-2">
            {/* Bonus Item 1 */}
            <div className="flex flex-col items-center">
              <div className="bg-gray-800 border border-gray-700 rounded-md overflow-hidden mb-1">
                <div className="h-16 w-16 relative"></div>
              </div>
              <span className="text-white text-xs">제작</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
      </div>
    </div>
  );
}
