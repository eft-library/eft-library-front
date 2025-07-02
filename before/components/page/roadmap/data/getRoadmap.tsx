"use client";

import { requestPostData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import RoadmapClient from "./roadmapClient";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { RoadmapData } from "./roadmapTypes";
import { ReactFlowProvider } from "@xyflow/react";
import Loading from "@/components/custom/loading/loading";

export default function GetRoadmap() {
  const { data: session } = useSession();
  const [roadmapList, setRoadmapList] = useState<RoadmapData>();

  useEffect(() => {
    const getRoadmap = async (email: string) => {
      try {
        const data = await requestPostData(API_ENDPOINTS.GET_QUEST_LOADMAP, {
          user_email: email,
        });

        if (data && data.status === 200) {
          setRoadmapList(data.data);
        } else {
          console.error(
            "Failed to fetch quest data:",
            data?.msg || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      }
    };

    if (session?.email) {
      getRoadmap(session.email);
    } else {
      getRoadmap("");
    }
  }, [session?.email]);

  if (!roadmapList) return <Loading />;

  return (
    <ReactFlowProvider>
      <RoadmapClient roadmapInfo={roadmapList} />
    </ReactFlowProvider>
  );
}
