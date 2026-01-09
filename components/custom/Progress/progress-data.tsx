"use client";

import { requestGetUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import type { Progress } from "./progress.types";
import ProgressView from "./progress-view";

export default function ProgressData() {
  const { data: session, status } = useSession();

  const fetchProgress = async (): Promise<Progress> => {
    const data = await requestGetUserData(
      USER_API_ENDPOINTS.GET_USER_PROGRESS,
      session
    );

    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch progress data");
    }
    return data.data;
  };
  const userEmail = session?.email ?? "";

  const { data: userProgressList, error } = useQuery({
    queryKey: ["progress", userEmail],
    queryFn: () => fetchProgress(),
    enabled: status !== "loading",
    retry: 1,
  });

  if (error) {
    console.error(error);
    return <div>로드맵 데이터를 불러오지 못했습니다.</div>;
  }
  if (!userProgressList) return <div></div>;

  return <ProgressView progress={userProgressList} />;
}
