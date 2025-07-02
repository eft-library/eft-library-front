"use client";

import { requestPostData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { Planner } from "./plannerType";
import PlannerClient from "./plannerClient";
import Loading from "@/components/custom/loading/loading";

export default function GetPlanner() {
  const { data: session } = useSession();
  const [userQuestList, setUserQuestList] = useState<Planner[]>();

  useEffect(() => {
    const getUserQuest = async (email: string) => {
      const data = await requestPostData(
        `${USER_API_ENDPOINTS.GET_USER_QUEST}`,
        { user_email: email }
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch quest data:",
          data?.msg || "Unknown error"
        );
        return null;
      }

      setUserQuestList(data.data);
    };

    if (session && session.email) {
      getUserQuest(session.email);
    } else {
      getUserQuest("");
    }
  }, [session]);

  if (!userQuestList) return <Loading />;

  return <PlannerClient userQuestList={userQuestList} />;
}
