"use client";

import type { UserQuest, UserQuestDetail } from "@/types/types";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Text,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import { formatImage } from "@/lib/formatImage";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import ImageZoom from "@/components/imageZoom/imageZoom";
import UserQuestList from "./userQuestList";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import UserQuestSelector from "./userQuestSelector";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import { fetchUserData } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function UserQuestDetail() {
  const [checkedQuest, setCheckedQuest] = useState([]);
  const router = useRouter();
  const [indices, setIndices] = useState([0]);
  const [userQuest, setUserQuest] = useState<UserQuest[]>();
  const { data: session } = useSession();

  const makeOnlyQuestIds = () => {
    let onlyQuestIds = userQuest.flatMap((npc) =>
      npc.quest_info.map((quest) => quest.quest_id)
    );
    return onlyQuestIds.filter((questId) => questId !== null);
  };

  // get
  useEffect(() => {
    const getUserQuest = async () => {
      const response = await fetchUserData(
        USER_API_ENDPOINTS.GET_USER_QUEST,
        "POST",
        {},
        session
      );

      checkResponse(response);
    };

    if (session && session.accessToken) {
      getUserQuest();
    }
  }, [session]);

  // success
  const successUserQuest = async (quest_id, next) => {
    const onlyQuestIdList = makeOnlyQuestIds();
    const newQuestList = [
      ...onlyQuestIdList.filter((quest) => quest !== quest_id),
      ...next.map((quest) => quest.id),
    ];
    const uniqueQuestList = [...new Set(newQuestList)];

    const response = await fetchUserData(
      USER_API_ENDPOINTS.UPDATE_USER_QUEST,
      "POST",
      { userQuestList: uniqueQuestList },
      session
    );

    checkResponse(response);
  };

  // delete
  const deleteUserQuest = async (deleteList) => {
    const onlyQuestIdList = makeOnlyQuestIds();
    const newQuestList = onlyQuestIdList.filter(
      (quest_id) => !deleteList.includes(quest_id)
    );

    const response = await fetchUserData(
      USER_API_ENDPOINTS.DELETE_USER_QUEST,
      "POST",
      { userQuestList: newQuestList },
      session
    );

    checkResponse(response);
  };

  // update
  const updateUserQuest = async (selectedList) => {
    const onlyQuestIdList = makeOnlyQuestIds();
    const onlySelectQuestIdList = selectedList.flatMap((quest) => quest.id);
    const newQuestList = [
      ...new Set([...onlyQuestIdList, ...onlySelectQuestIdList]),
    ];
    const response = await fetchUserData(
      USER_API_ENDPOINTS.UPDATE_USER_QUEST,
      "POST",
      { userQuestList: newQuestList },
      session
    );

    checkResponse(response);
  };

  const checkResponse = (response: any) => {
    if (response.status === 200) {
      setUserQuest(response.data);
      if (response.data.length > 0) {
        setIndices(response.data.map((_, index) => index));
      }
      setCheckedQuest([]);
    } else {
      alert("로그인 다시");
      signOut();
      router.push("/");
    }
  };

  const checkedBox = (quest_id: string) => {
    if (checkedQuest.includes(quest_id)) {
      const filterData = checkedQuest.filter((id) => id !== quest_id);
      setCheckedQuest(filterData);
    } else {
      setCheckedQuest([...checkedQuest, quest_id]);
    }
  };

  const allCheck = () => {
    const onlyQuestIdList = userQuest.flatMap((npc) =>
      npc.quest_info.map((quest) => quest.quest_id)
    );
    if (checkedQuest.length === onlyQuestIdList.length) {
      setCheckedQuest([]);
    } else {
      setCheckedQuest(onlyQuestIdList);
    }
  };

  const checkAllQuest = () => {
    const onlyQuestIdList = userQuest.flatMap((npc) =>
      npc.quest_info.map((quest) => quest.quest_id)
    );
    return checkedQuest.length === onlyQuestIdList.length;
  };

  if (!userQuest) return null;

  return (
    <Box w={"100%"} h="100%">
      <UserQuestSelector updateQuest={updateUserQuest} />
      {userQuest.length < 0 || !userQuest[0].npc_id ? (
        <Text fontWeight={600}>
          퀘스트 플래너에 등록할 퀘스트를 검색하여 추가 버튼을 눌러주세요.
        </Text>
      ) : (
        <Accordion allowMultiple defaultIndex={indices}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            mb={2}
          >
            <Checkbox
              borderColor={ALL_COLOR.WHITE}
              sx={{
                "input + span": {
                  width: "25px", // 체크박스 크기 조절
                  height: "25px", // 체크박스 크기 조절
                },
              }}
              isChecked={checkAllQuest()}
              onChange={() => allCheck()}
            >
              전체 선택
            </Checkbox>
            <Button
              onClick={() => deleteUserQuest(checkedQuest)}
              border={"1px solid"}
              borderColor={ALL_COLOR.WHITE}
            >
              삭제
            </Button>
          </Box>
          {userQuest.map((npc) => (
            <AccordionItem key={npc.npc_id} borderBottom={0}>
              <AccordionButton
                bg={ALL_COLOR.LIGHT_GRAY}
                color={ALL_COLOR.WHITE}
                borderRadius={"lg"}
                _hover={{ bg: ALL_COLOR.DARK_GRAY }}
                mb={2}
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
                    name={npc.npc_name_kr}
                  />
                </Box>
                <Box as="span" flex={1} textAlign={"left"} fontWeight={800}>
                  {npc.npc_name_kr}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <UserQuestList
                successQuest={successUserQuest}
                userQuest={npc}
                checkedQuest={checkedQuest}
                checkedBox={checkedBox}
              />
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </Box>
  );
}
