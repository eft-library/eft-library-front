"use client";

import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { requestPostData } from "@/lib/config/api";
import type { RankData } from "./rankTypes";
import Loading from "@/components/custom/loading/loading";
import TextSpan from "@/components/custom/gridContents/textSpan";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TierIndicator from "./tierIndicater";
import InventoryGrid from "./inventoryGrid";

export default function RankClient() {
  const [priceType, setPriceType] = useState<string>("PVP");
  const [topRankData, setTopRankData] = useState<RankData>();
  const [listCategory, setListCategory] = useState<string[]>([
    "Keys",
    "Weapon",
    "Ammo",
    "Provisions",
    "Container",
    "Keys",
    "Meds",
    "Wearables",
    "LOOT",
    "Mods",
  ]);

  const getItemRank = async () => {
    try {
      const data = await requestPostData(API_ENDPOINTS.GET_TOP_PRICE, {
        categoryList: listCategory,
      });

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch quest data:",
          data?.msg || "Unknown error"
        );
        return null;
      }
      setTopRankData(data.data);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const changePriceType = () => {
    if (priceType === "PVP") {
      setPriceType("PVE");
    } else {
      setPriceType("PVP");
    }
  };

  const onChangeCategory = (clickCategory: string) => {
    if (listCategory.includes(clickCategory)) {
      setListCategory((prevCategory) =>
        prevCategory.filter((category) => category !== clickCategory)
      );
    } else {
      setListCategory((prevCategory) => [...prevCategory, clickCategory]);
    }
  };

  useEffect(() => {
    getItemRank();
  }, [listCategory]);

  if (!topRankData) return <Loading />;

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <div className="w-full flex justify-start">
        <TextSpan textColor="SkyBloom">PVE</TextSpan>
        <TextSpan>&nbsp;/&nbsp;</TextSpan>
        <TextSpan textColor="PeachCream">PVP</TextSpan>
        <TextSpan textColor="GoldenYellow">
          &nbsp;시세를 확인하려면 버튼을 클릭하세요!
        </TextSpan>
      </div>
      <div className="flex gap-2 w-full">
        <Button
          className={cn(
            priceType === "PVP" ? "text-PeachCream" : "text-SkyBloom",
            "border-2 font-bold border-white px-4 py-2 bg-transparent rounded-lg hover:bg-NeutralGray transition"
          )}
          onClick={() => changePriceType()}
        >
          {priceType}
        </Button>
        <div className="flex flex-wrap gap-2">
          {[
            "Keys",
            "Weapon",
            "Ammo",
            "Provisions",
            "Container",
            "Meds",
            "Wearables",
            "LOOT",
            "Mods",
          ].map((category) => (
            <button
              key={category}
              onClick={() => onChangeCategory(category)}
              className={`px-4 py-2 rounded-md text-white font-semibold transition-colors duration-200 ${
                listCategory.includes(category)
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {priceType === "PVE" &&
        topRankData.pve_top_list.map((rankItem) => (
          <div
            className="flex flex-col h-full bg-Background w-full"
            key={`item-rank-${rankItem.tier}`}
          >
            <TierIndicator
              tier={rankItem.tier}
              min={rankItem.min}
              max={rankItem.max}
              viewType={priceType}
            />
            <InventoryGrid topList={rankItem.list} viewType={priceType} />
          </div>
        ))}

      {priceType === "PVP" &&
        topRankData.pvp_top_list.map((rankItem) => (
          <div
            className="flex flex-col h-full bg-Background w-full"
            key={`item-rank-${rankItem.tier}`}
          >
            <TierIndicator
              tier={rankItem.tier}
              min={rankItem.min}
              max={rankItem.max}
              viewType={priceType}
            />
            <InventoryGrid topList={rankItem.list} viewType={priceType} />
          </div>
        ))}
    </div>
  );
}
