"use client";

import { useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { requestPostData } from "@/lib/config/api";
import type { RankData } from "../priceTypes";
import Loading from "@/components/custom/loading/loading";
import TextSpan from "@/components/custom/gridContents/textSpan";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import TierIndicator from "./tierIndicater";
// import InventoryGrid from "./inventoryGrid";

// 여기서 rankList 조회
// category 동작도 여기

export default function RankDetail() {
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
    getItemRank();
  };

  useEffect(() => {
    getItemRank();
  }, []);

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
        <Button onClick={() => onChangeCategory("Mods")}>카테고리 변경</Button>
      </div>
      {/* {topRankData.pve_top_list.S.list.map((s_item, index) => (
        <div className="flex h-[600px] bg-[#1a1a1a]" key={index}>
          <TierIndicator />
          <InventoryGrid />
        </div>
      ))} */}
    </div>
  );
}
