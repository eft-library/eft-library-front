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
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import DefaultAlert from "@/components/custom/alert/defaultAlert";

export default function RankClient() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [priceType, setPriceType] = useState<string>("PVP");
  const [searchWord, setSearchWord] = useState<string>("");
  const [realWord, setSearchRealWord] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);
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
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
    setListCategory((prevCategory) => {
      if (prevCategory.includes(clickCategory)) {
        if (prevCategory.length === 1) {
          setAlertStatus(true);
          return prevCategory;
        }
        return prevCategory.filter((category) => category !== clickCategory);
      } else {
        return [...prevCategory, clickCategory];
      }
    });
  };

  useEffect(() => {
    getItemRank();
  }, [listCategory]);

  if (!topRankData) return <Loading />;

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      {isLoading && <Loading />}
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

        <Input
          id="name"
          className="text-base font-bold border-white placeholder:text-SilverGray"
          value={searchWord}
          placeholder="검색어"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchRealWord(searchWord);
            }
          }}
          onChange={(e) => setSearchWord(e.currentTarget.value)}
        />
        <Button
          className="border-2 font-bold border-white px-4 py-2 bg-transparent text-white rounded-lg hover:bg-NeutralGray transition"
          onClick={() => setSearchRealWord(searchWord)}
        >
          검색
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {[
          { value: "Keys", kr_name: "열쇠" },
          { value: "Meds", kr_name: "치료품" },
          { value: "Weapon", kr_name: "무기" },
          { value: "Ammo", kr_name: "탄약" },
          { value: "Provisions", kr_name: "식량" },
          { value: "Container", kr_name: "컨테이너" },
          { value: "Wearables", kr_name: "장비" },
          { value: "LOOT", kr_name: "전리품" },
          { value: "Mods", kr_name: "부품" },
        ].map((category) => (
          <Button
            key={category.value}
            onClick={() => onChangeCategory(category.value)}
            className={`px-4 py-2 rounded-md text-white font-semibold transition-colors duration-200 border-white border-solid border-2 flex bg-Background hover:bg-NeutralGray ${
              listCategory.includes(category.value)
                ? "bg-CloudGray hover:bg-NeutralGray text-Background"
                : "bg-Background hover:bg-NeutralGray"
            }`}
          >
            {category.kr_name}
            {listCategory.includes(category.value) && <X strokeWidth={5} />}
          </Button>
        ))}
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
            <InventoryGrid
              topList={rankItem.list}
              viewType={priceType}
              searchWord={realWord}
            />
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
            <InventoryGrid
              topList={rankItem.list}
              viewType={priceType}
              searchWord={realWord}
            />
          </div>
        ))}

      <DefaultAlert
        open={alertStatus}
        setOpen={setAlertStatus}
        title="알림"
        description={"카테고리는 최소 1개가 존재해야 합니다."}
      />
    </div>
  );
}
