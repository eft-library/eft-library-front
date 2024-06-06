"use client";

import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Flex } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import QuestInfo from "./contents/questInfo";
import QuestContents from "./contents/questContents";
import "@/assets/quest.css";

export default function QuestDetail() {
  const param = useParams<{ id: string }>();
  const [questDetail, setQuestDetail] = useState({
    objectives_kr: [],
    rewards_kr: [],
    guide: "",
  });
  useEffect(() => {
    fetchDataWithNone(`/api/quest/detail/${param.id}`, setQuestDetail);
  }, [param]);

  return (
    <Box
      className="Main"
      bgSize="cover"
      bg={ALL_COLOR.BACKGROUND}
      bgPosition="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingTop="80px"
      paddingBottom="20px"
      width="100%"
      height="auto"
    >
      <Flex
        className="Container"
        flex="1"
        flexDirection="column"
        width="60%"
        height="100vh"
        justifyContent="center"
        border="1px"
        borderColor={ALL_COLOR.LIGHT_GRAY}
        borderRadius={"lg"}
        paddingBottom={"20px"}
      >
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection="column"
          mb={"40px"}
          mt={"40px"}
        >
          <QuestInfo quest={questDetail} />
          <QuestContents quest={questDetail} />
        </Flex>
      </Flex>
    </Box>
  );
}
