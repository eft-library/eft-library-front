"use client";

import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { price18N } from "@/lib/consts/i18nConsts";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import ControlPanel from "./ControlPanel/control-panel";
import PriceChart from "./PriceChart/price-chart";
import TraderPrice from "./TraderPrice/trader-price";
import PriceTable from "./PriceTable/price-table";
import { Price } from "./price.types";
import Loading from "@/components/custom/Loading/loading";

export default function PriceView() {
  const { theme } = useTheme();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [search, setSearch] = useState<string>("");
  const [fetchWord, setFetchWord] = useState<string>("");
  const [priceType, setPriceType] = useState<string>("PVE");
  const [selectItem, setSelectItem] = useState<Price>();

  const getItemPrice = async ({ pageParam = 1, query = "" }) => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.GET_PRICE}?page=${pageParam}&page_size=30&word=${query}`,
        {
          next: { revalidate: 14400 },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["items", fetchWord],
    queryFn: ({ pageParam = 1 }) =>
      getItemPrice({ pageParam, query: fetchWord }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.current_page + 1;
      const totalPages = lastPage.data.max_pages;

      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  const items = data?.pages.flatMap((page) => page.data.data) || [];

  useEffect(() => {
    if (data?.pages.length && !selectItem) {
      const firstItem = data.pages[0]?.data?.data?.[0];
      setSelectItem(firstItem);
    }
  }, [data, selectItem]);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-slate-900 text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <div
        className={`border-b ${
          theme === "dark"
            ? "border-slate-700 bg-slate-800/50"
            : "border-gray-200 bg-white/80"
        } backdrop-blur-sm`}
      >
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col gap-4">
            {/* Title and Theme Toggle Row */}
            <div className="flex items-center justify-between">
              <div>
                <h1
                  className={`text-xl sm:text-2xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {price18N.title[localeKey]}
                </h1>
                <p
                  className={`${
                    theme === "dark" ? "text-slate-400" : "text-gray-600"
                  } mt-1 text-sm sm:text-base`}
                >
                  {price18N.checkPriceByButton[localeKey]}
                </p>
              </div>
            </div>
            {/* Controls Row */}
            <ControlPanel
              priceType={priceType}
              setPriceType={setPriceType}
              search={search}
              setSearch={setSearch}
              setFetchWord={setFetchWord}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Price Chart Section */}
        <PriceChart item={selectItem} priceType={priceType} />

        {/* Traders Section */}
        <TraderPrice item={selectItem} priceType={priceType} />

        {/* Market Items Table */}
        <PriceTable
          items={items}
          priceType={priceType}
          setSelectItem={setSelectItem}
          selectItem={selectItem}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>
      {isFetching && <Loading />}
    </div>
  );
}
