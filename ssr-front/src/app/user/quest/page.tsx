"use client";

import { useEffect, useState } from "react";
import PageParent from "@/components/pageParent/pageParent";
import { useSession } from "next-auth/react";
import SubHeader from "@/components/subHeader/subHeader";
import UserQuestDetail from "./contents/userQuestDetail";
import type { UserQuest } from "@/types/types";

export default function UserQuest() {
  const [userQuest, setUserQuest] = useState<UserQuest[]>();
  const { data: session } = useSession();

  useEffect(() => {
    const getUserQuest = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user/quest", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            provider: session.provider,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to add user");
        }

        const response = await res.json();
        if (response.status === 200 && response.data.length > 0) {
          setUserQuest(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (session && session.accessToken && session.provider) {
      getUserQuest();
    }
  }, [session]);

  const successUserQuest = async (quest_id: string, next: any) => {
    try {
      console.log(next);
      // 전체 퀘스트에서 완료한 것 제외하고 다음 단계 추가하기
      const onlyQuestIdList = userQuest.flatMap((npc) =>
        npc.quest_info.map((quest) => quest.quest_id)
      );
      const newQuestList = [
        ...onlyQuestIdList.filter((quest) => quest !== quest_id),
        ...next.map((quest) => quest.id),
      ];

      const res = await fetch("http://localhost:8000/api/user/quest/success", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: session.provider,
          userQuestList: newQuestList,
          successId: quest_id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add user");
      }

      const response = await res.json();
      if (response.status === 200 && response.data.length > 0) {
        setUserQuest(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!userQuest) return null;

  return (
    <PageParent>
      <SubHeader title="사용자 퀘스트 개발 중" />
      <UserQuestDetail
        userQuestList={userQuest}
        successQuest={successUserQuest}
      />
    </PageParent>
  );
}
