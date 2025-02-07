"use client";

import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useEffect, useState } from "react";
import Loading from "@/components/custom/loading/loading";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@/components/ui/button";
import PriceTable from "./priceTable";
import PriceHeader from "./priceHeader";
import PriceDetail from "./priceDetail";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Price } from "./priceTypes";
import PriceChart from "./priceChart";
import TextSpan from "@/components/custom/gridContents/textSpan";

export default function PriceList() {
  const [search, setSearch] = useState<string>("");
  const [fetchWord, setFetchWord] = useState<string>("");
  const [priceType, setPriceType] = useState<string>("PVP");
  const [selectItem, setSelectItem] = useState<Price>();

  const getItemPrice = async ({ pageParam = 1, query = "" }) => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.GET_PRICE}?page=${pageParam}&page_size=10&word=${query}`,
        {
          next: { revalidate: 60000 },
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

  const changePriceType = () => {
    if (priceType === "PVP") {
      setPriceType("PVE");
    } else {
      setPriceType("PVP");
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
        <Input
          type="text"
          value={search}
          className="text-base font-bold border-white border-2 border-solid placeholder:text-SilverGray"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="검색어 입력"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setFetchWord(search);
            }
          }}
        />
        <Button
          className="border-2 font-bold border-white px-4 py-2 bg-transparent text-white rounded-lg hover:bg-NeutralGray transition"
          onClick={() => setFetchWord(search)}
        >
          검색
        </Button>
      </div>

      <PriceChart item={selectItem} viewType={priceType} />

      <PriceDetail item={selectItem} viewType={priceType} />

      <div className="w-full">
        <div className="w-full flex justify-end">
          <TextSpan textColor="GoldenYellow">
            아이템 클릭 후 최신 시세를 확인하세요!
          </TextSpan>
        </div>
        <PriceHeader />
        <div className="max-h-[600px] overflow-y-auto" id="scrollableDiv">
          <InfiniteScroll
            dataLength={items.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<Loading />}
            scrollThreshold={0.9}
            scrollableTarget="scrollableDiv"
          >
            {items.map((item) => (
              <PriceTable
                price={item}
                key={item.id}
                viewType={priceType}
                setSelectItem={setSelectItem}
                selectItem={selectItem}
              />
            ))}
          </InfiniteScroll>
        </div>
      </div>
      {isFetching && <Loading />}
    </div>
  );
}
