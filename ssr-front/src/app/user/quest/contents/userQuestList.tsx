"use client";

import type { UserQuestList } from "@/types/types";
import {
  Box,
  AccordionPanel,
  Text,
  GridItem,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import GridContents from "@/components/gridContents/gridContents";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import Link from "next/link";

export default function UserQuestList({
  userQuest,
  successQuest,
  checkedQuest,
  checkedBox,
}: UserQuestList) {
  const getTitle = (item) => {
    // 첫 번째 부분 추출
    let firstPart = item.quest_name_kr
      .substring(0, item.quest_name_kr.indexOf("("))
      .trim();

    // 두 번째 부분 추출
    let secondPart = item.quest_name_kr
      .substring(item.quest_name_kr.indexOf("("))
      .trim();

    return (
      <Box
        display={"flex"}
        color={ALL_COLOR.ORANGE}
        _hover={{ color: ALL_COLOR.BEIGE }}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Link href={`/quest/detail/${item.quest_id}`} target="_blank">
          <Text fontWeight={600}>{firstPart}</Text>
        </Link>
        <Link href={`/quest/detail/${item.quest_id}`} target="_blank">
          <Text fontWeight={600}>{secondPart}</Text>
        </Link>
      </Box>
    );
  };

  return (
    <AccordionPanel p={1} mt={3}>
      {userQuest.quest_info.map((quest) => (
        <GridContents
          key={quest.quest_id}
          id={quest.quest_id}
          columnDesign={[2, null, 11]}
          contentsWidth="100%"
        >
          <GridItem
            p={2}
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
          >
            <Checkbox
              borderColor={ALL_COLOR.WHITE}
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
            p={2}
            display={"flex"}
            alignItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
            colSpan={3}
          >
            {getTitle(quest)}
          </GridItem>
          <GridItem
            colSpan={4}
            display={"flex"}
            justifyItems={"center"}
            flexDirection={"column"}
            justifyContent={"center"}
            p={2}
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
            p={2}
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
