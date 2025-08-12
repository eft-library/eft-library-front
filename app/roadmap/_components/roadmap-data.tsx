"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import type { RoadmapDataTypes } from "./roadmap.types";
import { ReactFlowProvider } from "@xyflow/react";
import RoadmapView from "./roadmap-view";
import Loading from "@/components/custom/Loading/loading";
import { requestPostData } from "@/lib/config/api";

export default function RoadmapData() {
  const { data: session, status } = useSession();

  const fetchRoadmap = async (email: string): Promise<RoadmapDataTypes> => {
    const data = await requestPostData(API_ENDPOINTS.GET_QUEST_LOADMAP, {
      user_email: email,
    });

    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch roadmap data");
    }

    return data.data;
  };

  // 로그인 안 돼도 빈 문자열로 요청
  const userEmail = session?.email ?? "";

  const {
    data: roadmapList,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["roadmap", userEmail],
    queryFn: () => fetchRoadmap(userEmail),
    // 항상 요청, 단 email은 빈 문자열일 수 있음
    enabled: status !== "loading",
    retry: 1,
  });

  if (isLoading) return <Loading />;

  if (error) {
    console.error(error);
    return <div>로드맵 데이터를 불러오지 못했습니다.</div>;
  }

  if (!roadmapList) return <div>로드맵 데이터가 없습니다.</div>;

  return (
    <ReactFlowProvider>
      <RoadmapView roadmapInfo={roadmapList} />
    </ReactFlowProvider>
  );
}
