"use client";

import { rankTierInfo } from "@/lib/consts/libraryConsts";
import { TierSectionTypes } from "../rank.types";
import ItemCard from "../ItemCard/item-card";

export default function TierSection({
  rankItem,
  priceType,
  onTooltipShow,
  searchWord,
}: TierSectionTypes) {
  const rankData =
    priceType === "PVP" ? rankItem.pvp_top_list : rankItem.pve_top_list;

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6">
      {rankData.map((itemGroup) => {
        const tierConfig =
          rankTierInfo[itemGroup.tier as keyof typeof rankTierInfo];

        return (
          <div className="mb-8" key={itemGroup.tier}>
            <div
              className={`flex items-center gap-3 mb-4 p-3 rounded-lg border ${tierConfig.bgColor} ${tierConfig.borderColor}`}
            >
              <div
                className={`
                flex items-center justify-center w-8 h-8 rounded-lg font-bold text-white shadow-sm
                ${
                  itemGroup.tier === "S"
                    ? "bg-red-500"
                    : itemGroup.tier === "A"
                    ? "bg-orange-500"
                    : itemGroup.tier === "B"
                    ? "bg-yellow-500"
                    : itemGroup.tier === "C"
                    ? "bg-green-500"
                    : itemGroup.tier === "D"
                    ? "bg-blue-500"
                    : itemGroup.tier === "E"
                    ? "bg-purple-500"
                    : "bg-gray-500"
                }
              `}
              >
                {itemGroup.tier}
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${tierConfig.color}`}>
                  {tierConfig.name}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 2xl:grid-cols-16 gap-2 sm:gap-3">
              {itemGroup.list.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  isHighlighted={
                    (searchWord &&
                      item.name.en
                        .toLowerCase()
                        .includes(searchWord.toLowerCase())) ||
                    item.name.ko
                      .toLowerCase()
                      .includes(searchWord.toLowerCase()) ||
                    item.name.ja
                      .toLowerCase()
                      .includes(searchWord.toLowerCase())
                  }
                  tier={itemGroup.tier}
                  onTooltipShow={onTooltipShow}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
