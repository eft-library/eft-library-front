"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import RoadmapView from "./roadmap-view";
import type {
  RoadmapDataTypes,
  RoadmapServerDataTypes,
} from "./roadmap.types";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { requestGetUserData } from "@/lib/config/api";

interface RoadmapClientDataProps {
  initialRoadmapInfo: RoadmapServerDataTypes;
}

export default function RoadmapClientData({
  initialRoadmapInfo,
}: RoadmapClientDataProps) {
  const { data: session, status } = useSession();

  const fetchRoadmap = async (): Promise<string[]> => {
    const data = await requestGetUserData<string[]>(
      API_ENDPOINTS.GET_USER_ROADMAP,
      session,
    );

    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch roadmap data");
    }

    return data.data;
  };

  const { data: userQuestList } = useQuery({
    queryKey: ["roadmap", session?.email ?? ""],
    queryFn: fetchRoadmap,
    enabled: status === "authenticated",
    retry: 1,
  });

  const roadmapInfo: RoadmapDataTypes = {
    ...initialRoadmapInfo,
    quest_list: userQuestList ?? [],
  };

  return <RoadmapView roadmapInfo={roadmapInfo} />;
}
