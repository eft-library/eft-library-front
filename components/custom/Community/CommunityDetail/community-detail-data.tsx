"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { COMMUNITY_ENDPOINTS } from "@/lib/config/endpoint";
import Loading from "@/components/custom/Loading/loading";
import { requestPostData } from "@/lib/config/api";
import type { CommunityPost } from "../community.types";
import { CommunityDetailView } from "./community-detail-view";
import { useParams } from "next/navigation";

export default function CommunityDetailData() {
  const { id } = useParams<{ id: string }>();
  const { data: session, status } = useSession();

  const fetchCommunityDetail = async (
    email: string
  ): Promise<CommunityPost> => {
    const data = await requestPostData(
      `${COMMUNITY_ENDPOINTS.GET_DETAIL_POST}${id}`,
      {
        user_email: email,
      }
    );

    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch post data");
    }

    return data.data;
  };
  const userEmail = session?.email ?? "";

  const { data, error, isLoading } = useQuery({
    queryKey: ["communityDetail", userEmail],
    queryFn: () => fetchCommunityDetail(userEmail),
    enabled: status !== "loading",
    retry: 1,
  });

  if (isLoading) return <Loading />;

  if (error) {
    console.error(error);
    return <div>로드맵 데이터를 불러오지 못했습니다.</div>;
  }

  if (!data) return <div>로드맵 데이터가 없습니다.</div>;
  return <CommunityDetailView postInfo={data} />;
}
