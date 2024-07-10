"use client";

import { Box, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import { formatImage } from "@/lib/formatImage";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { useAppStore } from "@/store/provider";
import type { NPC } from "@/types/types";
import NPCSkeleton from "../skeleton/npcSkeleton";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function NPC() {
  const { npcId, setNpcId } = useAppStore((state) => state);
  const [npc, setNpc] = useState<NPC[]>();

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_NPC, setNpc);
  }, []);

  const handleHover = (e: any) => {
    e.target.style.transform = "scale(1.1)"; // 이미지 확대
    e.target.style.opacity = "0.8"; // 이미지 불투명도 변경
  };

  const handleHoverExit = (e: any) => {
    e.target.style.transform = "scale(1)"; // 이미지 축소
    e.target.style.opacity = "1"; // 이미지 불투명도 원래대로
  };

  if (!npc) return <NPCSkeleton />;

  return (
    <Box display="flex" justifyContent="center" alignItems={"center"} mb={10}>
      <SimpleGrid columns={[2, null, 5]} spacing={12}>
        {npc.map((npcItem) => (
          <Flex key={npcItem.id} flexDirection={"column"}>
            <Box
              cursor={"pointer"}
              w="120px"
              h="120px"
              onClick={() => setNpcId(npcItem.id)}
              color={ALL_COLOR.WHITE}
              backgroundImage={`url(${formatImage(npcItem.image)})`}
              outline={npcId === npcItem.id ? "4px solid" : "1px solid"}
              outlineColor={
                npcId === npcItem.id ? ALL_COLOR.DARK_YELLOW : ALL_COLOR.WHITE
              }
              borderRadius={"lg"}
              onMouseEnter={handleHover}
              onMouseLeave={handleHoverExit}
            />
            <Text color={ALL_COLOR.WHITE} textAlign={"center"} mt={"2"}>
              {npcItem.name_kr}
            </Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
}
