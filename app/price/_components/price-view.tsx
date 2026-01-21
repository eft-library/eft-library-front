"use client";

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
import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";
import AdBanner from "@/components/custom/Adsense/ad-banner";

export default function PriceView() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [search, setSearch] = useState<string>("");
  const [fetchWord, setFetchWord] = useState<string>("");
  const [priceType, setPriceType] = useState<string>("PVP");
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
      const firstItem = data.pages[0]?.data?.data?.[2];
      setSelectItem(firstItem);
    }
  }, [data, selectItem]);

  return (
    <ViewWrapper>
      <div
        className={`min-h-screen dark:bg-[#1e2124] dark:text-white bg-gray-50 text-black`}
      >
        {/* Header */}
        <div className={`backdrop-blur-sm`}>
          <div className="container mx-auto px-4 py-4 sm:py-6">
            <div className="flex flex-col gap-4 items-center justify-center">
              {/* Title and Theme Toggle Row */}
              <h1
                className={`text-3xl font-bold dark:text-white text-gray-900`}
              >
                {price18N.title[localeKey]}
              </h1>
              <AdBanner
                dataAdFormat={"auto"}
                dataFullWidthResponsive={true}
                dataAdSlot="2690838054"
                maxWidth={1220}
              />
              <p
                className={` mt-1 text-sm sm:text-base dark:text-slate-400 text-gray-600`}
              >
                {price18N.checkPriceByButton[localeKey]}
              </p>
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
            word={fetchWord}
          />
        </div>
        {isFetching && <Loading />}
      </div>
    </ViewWrapper>
  );
}
