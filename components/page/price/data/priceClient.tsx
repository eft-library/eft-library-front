"use client";

import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useState, useEffect } from "react";
import Loading from "@/components/custom/loading/loading";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

export default function PriceClient() {
  const [search, setSearch] = useState("");

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

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ["items", search],
    queryFn: ({ pageParam = 1 }) => getItemPrice({ pageParam, query: search }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.data.current_page + 1;
      const totalPages = lastPage.data.max_pages;

      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  // 데이터 검색어 변경시 리셋
  useEffect(() => {
    refetch();
  }, [search, refetch]);

  const items = data?.pages.flatMap((page) => page.data.data) || [];

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="검색어 입력"
        className="border p-2"
      />
      <button onClick={() => refetch()}>검색</button>

      <InfiniteScroll
        dataLength={items.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={<Loading />}
        scrollThreshold={0.9} // 화면의 90%까지 스크롤되면 데이터를 불러옴
      >
        {items.map((item, index) => (
          <div key={index} className="p-4 border-b">
            {item.item_name_en}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
