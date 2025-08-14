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
import { useQuery } from "@tanstack/react-query";

export default function CommunityData({ category }: CommunityDataTypes) {
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page") ?? "1";

  const fetchCommunity = async (): Promise<CommunityPostsResponse> => {
    const data = await requestData(
      `${COMMUNITY_ENDPOINTS.GET_POSTS}/${category}?page_num=${pageNum}`
    );

    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch posts data");
    }

    return data.data;
  };

  const {
    data: postInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["communityPosts", category, pageNum], // 캐싱 키
    queryFn: fetchCommunity,
    staleTime: 1000 * 60, // 1분 동안 캐시 유지
    retry: 1, // 실패 시 재시도 횟수
  });

  if (isLoading) return <Loading />;
  if (isError) {
    console.error("Failed to fetch posts data:", (error as Error).message);
    return <div>게시글을 불러오는 중 오류가 발생했습니다.</div>;
  }

  return <CommunityView postInfo={postInfo!} category={category} />;
}
