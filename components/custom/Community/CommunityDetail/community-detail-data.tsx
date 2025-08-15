"use client";

import { useSession } from "next-auth/react";
import { COMMUNITY_ENDPOINTS } from "@/lib/config/endpoint";
import Loading from "@/components/custom/Loading/loading";
import { requestPostData } from "@/lib/config/api";
import type { CommunityPost } from "../community.types";
import { CommunityDetailView } from "./community-detail-view";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// 여기는 항상 최신 데이터가 보여야 하는 곳이라 캐싱을 쓰면 안되기에 react query 제거

export default function CommunityDetailData() {
  const { id } = useParams<{ id: string }>();
  const { data: session, status } = useSession();
  const userEmail = session?.email ?? "";

  const [postInfo, setPostInfo] = useState<CommunityPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCommunityDetail = async () => {
      if (status === "loading") return; // 세션 로딩 중이면 대기
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await requestPostData(
          `${COMMUNITY_ENDPOINTS.GET_DETAIL_POST}`,
          {
            url: id,
            user_email: userEmail,
          }
        );
        if (!data || data.status !== 200)
          throw new Error(data?.msg || "Failed to fetch post data");
        setPostInfo(data.data);
      } catch (err) {
        console.error(err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCommunityDetail();
  }, [id, userEmail, status]); // id, 사용자 이메일, 세션 상태 바뀌면 새로 요청

  if (isLoading) return <Loading />;
  if (isError) return <div>게시글 데이터를 불러오지 못했습니다.</div>;
  if (!postInfo) return <div>게시글이 없습니다.</div>;

  return <CommunityDetailView postInfo={postInfo} />;
}
