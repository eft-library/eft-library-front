"use client";

import { requestPostData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { Planner } from "./planner.types";
import PlannerView from "./planner-view";

export default function PlannerData() {
  const { data: session, status } = useSession();
  const [userQuestList, setUserQuestList] = useState<Planner[]>();

  useEffect(() => {
    if (status === "loading") return;

    const getUserQuest = async (email: string) => {
      try {
        const data = await requestPostData(USER_API_ENDPOINTS.GET_USER_QUEST, {
          user_email: email,
        });

        if (data && data.status === 200) {
          setUserQuestList(data.data);
        } else {
          console.error(
            "Failed to fetch planner data:",
            data?.msg || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Error fetching planner:", error);
      }
    };

    const userEmail = session?.email || "";
    getUserQuest(userEmail);
  }, [status, session]);

  if (!userQuestList) return null;

  return <PlannerView userQuestList={userQuestList} />;
}
