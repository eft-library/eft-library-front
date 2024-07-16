"use client";

import { Box, Flex } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import "@/assets/quest.css";
import type { Quest } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import dynamic from "next/dynamic";

const QuestInfo = dynamic(() => import("./contents/questInfo"), {
  ssr: false,
});
const QuestContents = dynamic(() => import("./contents/questContents"), {
  ssr: false,
});

export default function QuestDetail() {
  const param = useParams<{ id: string }>();
  const [questDetail, setQuestDetail] = useState<Quest>();
  useEffect(() => {
    fetchDataWithNone(`${API_ENDPOINTS.GET_QUEST}/${param.id}`, setQuestDetail);
  }, [param]);

  return (
    <Box
      className="Main"
      bgSize="cover"
      bg={ALL_COLOR.BLACK}
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
