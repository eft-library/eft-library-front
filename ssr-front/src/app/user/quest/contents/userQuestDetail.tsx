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
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UserQuestSelector from "./userQuestSelector";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import { fetchUserData } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function UserQuestDetail() {
  const router = useRouter();
  const [indices, setIndices] = useState([0]);
  const [userQuest, setUserQuest] = useState<UserQuest[]>();
  const { data: session } = useSession();

  // get
  useEffect(() => {
    const getUserQuest = async () => {
      await fetchUserData(
        USER_API_ENDPOINTS.GET_USER_QUEST,
        "POST",
        { provider: session.provider },
        setUserQuest,
        router,
        session
      );
      if (userQuest && userQuest.length > 1) {
        setIndices(userQuest.map((_, index) => index));
      }
    };

    if (session && session.accessToken && session.provider) {
      getUserQuest();
    }
  }, [session]);

  // success
  const successUserQuest = async (quest_id, next) => {
    const onlyQuestIdList = userQuest.flatMap((npc) =>
      npc.quest_info.map((quest) => quest.quest_id)
    );
    const newQuestList = [
      ...onlyQuestIdList.filter((quest) => quest !== quest_id),
      ...next.map((quest) => quest.id),
    ];

    await fetchUserData(
      USER_API_ENDPOINTS.UPDATE_USER_QUEST,
      "POST",
      { provider: session.provider, userQuestList: newQuestList },
      setUserQuest,
      router,
      session
    );
  };

  // delete
  const deleteUserQuest = async (deleteList) => {
    const onlyQuestIdList = userQuest.flatMap((npc) =>
      npc.quest_info.map((quest) => quest.quest_id)
    );
    const newQuestList = onlyQuestIdList.filter(
      (quest_id) => !deleteList.includes(quest_id)
    );

    await fetchUserData(
      USER_API_ENDPOINTS.DELETE_USER_QUEST,
      "POST",
      { provider: session.provider, userQuestList: newQuestList },
      setUserQuest,
      router,
      session
    );
  };

  // update
  const updateUserQuest = async (selectedList) => {
    const onlyQuestIdList = userQuest.flatMap((npc) =>
      npc.quest_info.map((quest) => quest.quest_id)
    );
    const onlySelectQuestIdList = selectedList.flatMap((quest) => quest.id);
    const newQuestList = [
      ...new Set([...onlyQuestIdList, ...onlySelectQuestIdList]),
    ];

    await fetchUserData(
      USER_API_ENDPOINTS.UPDATE_USER_QUEST,
      "POST",
      { provider: session.provider, userQuestList: newQuestList },
      setUserQuest,
      router,
      session
    );
  };

  if (!userQuest) return null;
  console.log(userQuest);
  return (
    <Box w={"95%"} h="100%">
      <UserQuestSelector updateQuest={updateUserQuest} />
      {userQuest.length < 0 ? (
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
