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
import { rankI18N, placeHolderText } from "@/lib/consts/i18nConsts";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { rankCategoryList } from "@/lib/consts/columnConsts";

export default function RankClient() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
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
          &nbsp;{rankI18N.notice[localeKey]}
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
          placeholder={placeHolderText.search[localeKey]}
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
        {rankCategoryList.map((category) => (
          <Button
            key={category.value}
            onClick={() => onChangeCategory(category.value)}
            className={`px-4 py-2 rounded-md text-white font-semibold transition-colors duration-200 border-white border-solid border-2 flex bg-Background hover:bg-NeutralGray ${
              listCategory.includes(category.value)
                ? "bg-Background hover:bg-NeutralGray"
                : "bg-Background hover:bg-NeutralGray opacity-50"
            }`}
          >
            {category[localeKey]}
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
        title="Notice"
        description={rankI18N.alertMsg[localeKey]}
      />
    </div>
  );
}
