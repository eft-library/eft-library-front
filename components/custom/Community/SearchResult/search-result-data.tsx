"use client";

import { requestData } from "@/lib/config/api";
import { useSearchParams } from "next/navigation";
import { COMMUNITY_ENDPOINTS } from "@/lib/config/endpoint";
import Loading from "../../Loading/loading";
import { useEffect, useState } from "react";
import type { PostWithCommentsSearchTypes } from "../community.types";
import SearchResultView from "./search-result-view";

export default function SearchResultData() {
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page") ?? "1";
  const searchType = searchParams.get("search_type") ?? "all";
  const word = searchParams.get("word") ?? "";

  const [postInfo, setPostInfo] = useState<PostWithCommentsSearchTypes>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCommunitySearch = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await requestData(
          `${
            COMMUNITY_ENDPOINTS.SEARCH_POSTS
          }?page_num=${pageNum}&word=${word}&search_type=${searchType}&_ts=${Date.now()}`
        );
        if (!data || data.status !== 200)
          throw new Error(data?.msg || "Failed to fetch posts");
        setPostInfo(data.data);
      } catch (err) {
        console.error(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunitySearch();
  }, [searchType, pageNum, word]);

  if (isLoading) return <Loading />;
  if (isError || !postInfo)
    return <div>게시글을 불러오는 중 오류가 발생했습니다.</div>;

  return <SearchResultView postInfo={postInfo} />;
}
