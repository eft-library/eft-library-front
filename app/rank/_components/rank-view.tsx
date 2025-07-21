"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { rankI18N } from "@/lib/consts/i18nConsts";
import { useCallback, useEffect, useState } from "react";
import CategoryFilter from "./CategoryFilter/category-filter";
import { defaultRankCategory } from "@/lib/consts/libraryConsts";
import { RankData, TopListDetailData } from "./rank.types";
import { requestPostData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import SearchFilter from "./SearchFilter/search-filter";
import TierSection from "./TierSection/tier-section";
import ItemTooltip from "./ItemTooltip/item-tooltip";

export default function RankView() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [searchWord, setSearchWord] = useState<string>("");
  const [realWord, setSearchRealWord] = useState<string>("");
  const [topRankData, setTopRankData] = useState<RankData>();
  const [priceType, setPriceType] = useState<string>("PVE");
  const [tooltipItem, setTooltipItem] = useState<TopListDetailData | null>(
    null
  );
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [listCategory, setListCategory] =
    useState<string[]>(defaultRankCategory);

  const getItemRank = useCallback(async () => {
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
  }, [listCategory]);

  const onChangeCategory = (clickCategory: string) => {
    setListCategory((prevCategory) => {
      if (prevCategory.includes(clickCategory)) {
        if (prevCategory.length === 1) {
          return prevCategory;
        }
        return prevCategory.filter((category) => category !== clickCategory);
      } else {
        return [...prevCategory, clickCategory];
      }
    });
  };

  const handleTooltipShow = (
    item: TopListDetailData | null,
    position?: { x: number; y: number }
  ) => {
    if (item && position) {
      setTooltipItem(item);
      setTooltipPosition(position);
    } else {
      setTooltipItem(null);
    }
  };

  useEffect(() => {
    getItemRank();
  }, [getItemRank]);

  if (!topRankData) return null;

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-3 sm:px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Item Rank
          </h1>
        </div>

        {/* Game Mode Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4">
          <div className="text-sm text-gray-600 dark:text-gray-400 text-center sm:text-left">
            {rankI18N.notice[localeKey]}
          </div>
          <div className="flex rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Button
              variant={priceType === "PVE" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPriceType("PVE")}
              className="rounded-none px-4 py-2"
            >
              PVE
            </Button>
            <Button
              variant={priceType === "PVP" ? "default" : "ghost"}
              size="sm"
              onClick={() => setPriceType("PVP")}
              className="rounded-none px-4 py-2"
            >
              PVP
            </Button>
          </div>
        </div>
        {/* Search */}
        <SearchFilter
          searchWord={searchWord}
          setSearchRealWord={setSearchRealWord}
          setSearchWord={setSearchWord}
        />

        {/* Category Filters */}
        <CategoryFilter
          onChangeCategory={onChangeCategory}
          listCategory={listCategory}
        />

        <TierSection
          priceType={priceType}
          rankItem={topRankData}
          searchWord={realWord}
          onTooltipShow={handleTooltipShow}
        />

        {tooltipItem && (
          <ItemTooltip item={tooltipItem} position={tooltipPosition} />
        )}
      </div>
    </div>
  );
}
