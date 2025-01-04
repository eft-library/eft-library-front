"use client";

import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import type { UserQuest } from "@/components/custom/userQuest/data/userQuestType";
import UserQuestClient from "@/components/custom/userQuest/data/userQuestClient";

export default function GetUserQuest() {
  const { data: session } = useSession();
  const [userQuestList, setUserQuestList] = useState<UserQuest[]>();

  useEffect(() => {
    const getUserQuest = async () => {
      const data = await requestUserData(
        `${USER_API_ENDPOINTS.GET_USER_QUEST}`,
        {},
        session
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

    if (session && session.accessToken) {
      getUserQuest();
    }
  }, [session]);

  if (!userQuestList) return null;

  return <UserQuestClient userQuestList={userQuestList} />;
}
