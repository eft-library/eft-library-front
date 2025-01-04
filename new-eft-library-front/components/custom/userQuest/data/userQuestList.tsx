"use client";

import type {
  UserQuestList,
  UserQuestInfo,
} from "@/components/custom/userQuest/data/userQuestType";
import Link from "next/link";

export default function UserQuestList({
  userQuest,
  successQuest,
  checkedQuest,
  checkedBox,
}: UserQuestList) {
  const getTitle = (item: UserQuestInfo) => {
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
          <Text fontWeight={600}>
            {item.quest_name_kr
              .substring(0, item.quest_name_kr.indexOf("("))
              .trim()}
          </Text>
        </Link>
        <Link href={`/quest/detail/${item.quest_id}`} target="_blank">
          <Text fontWeight={600}>
            {item.quest_name_kr
              .substring(item.quest_name_kr.indexOf("("))
              .trim()}
          </Text>
        </Link>
      </Box>
    );
  };

  return <div></div>;
}
