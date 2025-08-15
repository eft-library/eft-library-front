"use client";

import { requestData } from "@/lib/config/api";
import { useSearchParams } from "next/navigation";
import { COMMUNITY_ENDPOINTS } from "@/lib/config/endpoint";
import Loading from "../../Loading/loading";
import type {
  CommunityDataTypes,
  CommunityPostsResponse,
} from "../community.types";
import CommunityView from "../CommunityView/community-view";
import { useEffect, useState } from "react";

// 여기는 항상 최신 데이터가 보여야 하는 곳이라 캐싱을 쓰면 안되기에 react query 제거

export default function CommunityData({ category }: CommunityDataTypes) {
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page") ?? "1";

  const [postInfo, setPostInfo] = useState<CommunityPostsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchCommunity = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const data = await requestData(
        `${
          COMMUNITY_ENDPOINTS.GET_POSTS
        }/${category}?page_num=${pageNum}&_ts=${Date.now()}`
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

  useEffect(() => {
    fetchCommunity();
  }, [category, pageNum]);

  if (isLoading) return <Loading />;
  if (isError) return <div>게시글을 불러오는 중 오류가 발생했습니다.</div>;

  return <CommunityView postInfo={postInfo!} category={category} />;
}
