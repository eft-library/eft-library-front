"use client";

import { useSession } from "next-auth/react";
import { COMMUNITY_ENDPOINTS } from "@/lib/config/endpoint";
import Loading from "@/components/custom/Loading/loading";
import { requestPostData } from "@/lib/config/api";
import type { CommunitDetailDataTypes } from "../community.types";
import { CommunityDetailView } from "./community-detail-view";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/provider";

// 여기는 항상 최신 데이터가 보여야 하는 곳이라 캐싱을 쓰면 안되기에 react query 제거

export default function CommunityDetailData() {
  const { pageCategory } = useAppStore((state) => state);
  const { id } = useParams<{ id: string }>();
  const { data: session, status } = useSession();
  const userEmail = session?.email ?? "";

  const [postInfo, setPostInfo] = useState<CommunitDetailDataTypes | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchCommunityDetail = async () => {
      if (status === "loading") return;
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await requestPostData(
          `${COMMUNITY_ENDPOINTS.GET_DETAIL_POST}`,
          {
            url: id,
            user_email: userEmail,
            page_category: pageCategory,
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
  }, [id, userEmail, status, pageCategory]);

  useEffect(() => {
    if (!id) return;

    // localStorage 가져오기
    const viewed = JSON.parse(
      localStorage.getItem("viewed_community_posts") || "[]"
    );

    // 이미 조회한 게시글이면 return
    if (viewed.includes(id)) return;

    // 조회수 증가 API 호출
    fetch(COMMUNITY_ENDPOINTS.POST_VIEW_COUNT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post_id: id }),
    })
      .then(() => {
        // 성공 시 localStorage 업데이트
        viewed.push(id);
        localStorage.setItem("viewed_community_posts", JSON.stringify(viewed));
      })
      .catch((err) => {
        console.error("조회수 증가 실패:", err);
      });
  }, [id]);

  if (isLoading) return <Loading />;
  if (isError) return <div>게시글 데이터를 불러오지 못했습니다.</div>;
  if (!postInfo) return <div>게시글이 없습니다.</div>;

  return <CommunityDetailView postInfo={postInfo} />;
}
