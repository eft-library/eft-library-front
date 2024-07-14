"use client";

import type { UserQuest, UserQuestDetail } from "@/types/types";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Text,
} from "@chakra-ui/react";
import { formatImage } from "@/lib/formatImage";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import ImageZoom from "@/components/imageZoom/imageZoom";
import UserQuestList from "./userQuestList";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import UserQuestSelector from "./userQuestSelector";

export default function UserQuestDetail() {
  const [indices, setIndices] = useState([0]);
  const [userQuest, setUserQuest] = useState<UserQuest[]>();
  const { data: session } = useSession();
  const router = useRouter();

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

        const response = await res.json();
        if (response.msg !== "OK") {
          alert("로그인 다시");
          signOut();
          router.push("/");
        } else if (response.status === 200 && response.data.length > 0) {
          setUserQuest(response.data);
          setIndices(response.data.map((_, index) => index));
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
      // 전체 퀘스트에서 완료한 것 제외하고 다음 단계 추가하기
      const onlyQuestIdList = userQuest.flatMap((npc) =>
        npc.quest_info.map((quest) => quest.quest_id)
      );
      const newQuestList = [
        ...onlyQuestIdList.filter((quest) => quest !== quest_id),
        ...next.map((quest) => quest.id),
      ];

      const res = await fetch("http://localhost:8000/api/user/quest/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: session.provider,
          userQuestList: newQuestList,
        }),
      });

      const response = await res.json();

      if (response.msg !== "OK") {
        alert("로그인 다시");
        signOut();
        router.push("/");
      } else if (response.status === 200 && response.data.length > 0) {
        setUserQuest(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserQuest = async (deleteList: string[]) => {
    try {
      // 전체 퀘스트에서 완료한 것 제외하고 다음 단계 추가하기

      const onlyQuestIdList = userQuest.flatMap((npc) =>
        npc.quest_info.map((quest) => quest.quest_id)
      );
      const newQuestList = onlyQuestIdList.filter(
        (quest_id) => !deleteList.includes(quest_id)
      );

      const res = await fetch("http://localhost:8000/api/user/quest/delete", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: session.provider,
          userQuestList: newQuestList,
        }),
      });

      const response = await res.json();

      if (response.msg !== "OK") {
        alert("로그인 다시");
        signOut();
        router.push("/");
      } else if (response.status === 200 && response.data.length > 0) {
        setUserQuest(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserQuest = async (selectedList: any) => {
    try {
      const onlyQuestIdList = userQuest.flatMap((npc) =>
        npc.quest_info.map((quest) => quest.quest_id)
      );
      const onlySelectQuestIdList = selectedList.flatMap((quest) => quest.id);
      const newQuestList = [
        ...new Set([...onlyQuestIdList, ...onlySelectQuestIdList]),
      ];
      const res = await fetch("http://localhost:8000/api/user/quest/update", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: session.provider,
          userQuestList: newQuestList,
        }),
      });
      const response = await res.json();
      if (response.msg !== "OK") {
        alert("로그인 다시");
        signOut();
        router.push("/");
      } else if (response.status === 200 && response.data.length > 0) {
        setUserQuest(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!userQuest) return null;

  return (
    <Box w={"95%"} h="100%">
      <UserQuestSelector updateQuest={updateUserQuest} />
      {!userQuest[0].npc_id ? (
        <Text>퀘스트 추가 Please~~~</Text>
      ) : (
        <Accordion allowMultiple defaultIndex={indices}>
          {userQuest.map((npc) => (
            <AccordionItem key={npc.npc_id}>
              <AccordionButton
                bg={ALL_COLOR.HIDE_BLUE}
                color={ALL_COLOR.WHITE}
                _expanded={{ bg: ALL_COLOR.HIDE_RED, color: ALL_COLOR.WHITE }}
                borderRadius={"lg"}
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  mr={2}
                >
                  <ImageZoom
                    isQuest
                    originalImg={formatImage(npc.npc_image)}
                    thumbnail={formatImage(npc.npc_image)}
                  />
                </Box>
                <Box as="span" flex={1} textAlign={"left"} fontWeight={800}>
                  {npc.npc_name_kr}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <UserQuestList
                successQuest={successUserQuest}
                deleteQuest={deleteUserQuest}
                userQuest={npc}
              />
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </Box>
  );
}
