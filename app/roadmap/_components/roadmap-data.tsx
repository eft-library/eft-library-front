"use client";

import { requestPostData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { RoadmapDataTypes } from "./roadmap.types";
import { ReactFlowProvider } from "@xyflow/react";
import RoadmapView from "./roadmap-view";

export default function RoadmapData() {
  const { data: session, status } = useSession();
  const [roadmapList, setRoadmapList] = useState<RoadmapDataTypes>();

  useEffect(() => {
    if (status === "loading") return; // 아직 세션 로딩 중이면 아무것도 안함

    const getRoadmap = async (email: string) => {
      try {
        const data = await requestPostData(API_ENDPOINTS.GET_QUEST_LOADMAP, {
          user_email: email,
        });

        if (data && data.status === 200) {
          setRoadmapList(data.data);
        } else {
          console.error(
            "Failed to fetch roadmap data:",
            data?.msg || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      }
    };

    const userEmail = session?.email || "";
    getRoadmap(userEmail);
  }, [status, session]);

  if (!roadmapList) return null;

  return (
    <ReactFlowProvider>
      <RoadmapView roadmapInfo={roadmapList} />
    </ReactFlowProvider>
  );
}
