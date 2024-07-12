"use client";

import type { UserQuestList } from "@/types/types";
import { useState } from "react";
import {
  Box,
  AccordionPanel,
  Text,
  GridItem,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import GridContents from "@/components/gridContents/gridContents";

export default function UserQuestList({
  userQuest,
  successQuest,
  deleteQuest,
}: UserQuestList) {
  const [checkedQuest, setCheckedQuest] = useState([]);

  const checkedBox = (quest_id: string) => {
    if (checkedQuest.includes(quest_id)) {
      const filterData = checkedQuest.filter((id) => id !== quest_id);
      setCheckedQuest(filterData);
    } else {
      setCheckedQuest([...checkedQuest, quest_id]);
    }
  };

  const allCheck = () => {
    if (checkedQuest.length === userQuest.quest_info.length) {
      setCheckedQuest([]);
    } else {
      const allQuestIds = userQuest.quest_info.map((quest) => quest.quest_id);
      setCheckedQuest(allQuestIds);
    }
  };

  return (
    <AccordionPanel p={1} mt={3}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={2}
      >
        <Checkbox
          sx={{
            "input + span": {
              width: "25px", // 체크박스 크기 조절
              height: "25px", // 체크박스 크기 조절
            },
          }}
          isChecked={checkedQuest.length === userQuest.quest_info.length}
          onChange={() => allCheck()}
        >
          전체 선택
        </Checkbox>
        <Button onClick={() => deleteQuest(checkedQuest)}>삭제</Button>
      </Box>
      {userQuest.quest_info.map((quest) => (
        <GridContents
          key={quest.quest_id}
          id={quest.quest_id}
          columnDesign={[2, null, 11]}
          contentsWidth="100%"
        >
          <GridItem
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Checkbox
              sx={{
                "input + span": {
                  width: "25px", // 체크박스 크기 조절
                  height: "25px", // 체크박스 크기 조절
                },
              }}
              isChecked={checkedQuest.includes(quest.quest_id)}
              onChange={() => checkedBox(quest.quest_id)}
            />
          </GridItem>
          <GridItem
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
            colSpan={3}
          >
            <Text fontWeight={600}>{quest.quest_name_kr}</Text>
          </GridItem>
          <GridItem
            colSpan={4}
            display={"flex"}
            justifyItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Box
              display={"flex"}
              justifyItems={"center"}
              flexDirection={"column"}
              justifyContent={"center"}
            >
              {quest.objectives_kr.map((objective, index) => (
                <Text
                  key={index}
                  mb={1}
                  fontWeight={600}
                  dangerouslySetInnerHTML={{
                    __html: `*&nbsp;&nbsp;${objective}`,
                  }}
                />
              ))}
            </Box>
          </GridItem>
          <GridItem
            display={"flex"}
            colSpan={3}
            justifyItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              w={"100px"}
              onClick={() => successQuest(quest.quest_id, quest.next)}
            >
              완료
            </Button>
          </GridItem>
        </GridContents>
      ))}
    </AccordionPanel>
  );
}
