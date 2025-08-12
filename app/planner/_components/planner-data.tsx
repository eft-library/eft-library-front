"use client";

import { requestPostData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useSession } from "next-auth/react";
import type { Planner } from "./planner.types";
import PlannerView from "./planner-view";
import Loading from "@/components/custom/Loading/loading";
import { useQuery } from "@tanstack/react-query";

export default function PlannerData() {
  const { data: session, status } = useSession();

  const fetchPlanner = async (email: string): Promise<Planner[]> => {
    const data = await requestPostData(USER_API_ENDPOINTS.GET_USER_QUEST, {
      user_email: email,
    });

    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch planner data");
    }

    return data.data;
  };

  // 로그인 안 돼도 빈 문자열로 요청
  const userEmail = session?.email ?? "";

  const {
    data: userQuestList,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["planner", userEmail],
    queryFn: () => fetchPlanner(userEmail),
    // 항상 요청, 단 email은 빈 문자열일 수 있음
    enabled: status !== "loading",
    retry: 1,
  });

  if (isLoading) return <Loading />;

  if (error) {
    console.error(error);
    return <div>로드맵 데이터를 불러오지 못했습니다.</div>;
  }

  if (!userQuestList) return <div>로드맵 데이터가 없습니다.</div>;

  return <PlannerView userQuestList={userQuestList} />;
}
