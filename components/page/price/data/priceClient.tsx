"use client";

import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useState } from "react";
import Loading from "@/components/custom/loading/loading";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@/components/ui/button";
import PriceTable from "./priceTable";
import PriceHeader from "./priceHeader";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function PriceClient() {
  const [search, setSearch] = useState<string>("");
  const [fetchWord, setFetchWord] = useState<string>("");
  const [priceType, setPriceType] = useState<string>("PVP");

  const getItemPrice = async ({ pageParam = 1, query = "" }) => {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.GET_PRICE}?page=${pageParam}&page_size=50&word=${query}`,
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

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
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

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
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
      <div className="w-full">
        <div className="max-h-[600px] overflow-y-auto" id="scrollableDiv">
          <PriceHeader />
          <InfiniteScroll
            dataLength={items.length}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<Loading />}
            scrollThreshold={0.9}
            scrollableTarget="scrollableDiv"
          >
            {items.map((item) => (
              <PriceTable price={item} key={item.id} viewType={priceType} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}
