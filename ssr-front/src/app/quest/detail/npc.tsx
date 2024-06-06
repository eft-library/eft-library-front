"use client";

import { Box, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { formatImage } from "@/lib/formatImage";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import { useAppStore } from "@/store/provider";

interface NPCType {
  id: string;
  image: string;
  name_kr: string;
}

export default function NPC() {
  const { npcId, setNpcId } = useAppStore((state) => state);
  const [npc, setNpc] = useState<NPCType[]>([]);

  useEffect(() => {
    fetchDataWithNone("/api/quest/npc", setNpc);
  }, []);

  const handleHover = (e: any) => {
    e.target.style.transform = "scale(1.1)"; // 이미지 확대
    e.target.style.opacity = "0.8"; // 이미지 불투명도 변경
  };

  const handleHoverExit = (e: any) => {
    e.target.style.transform = "scale(1)"; // 이미지 축소
    e.target.style.opacity = "1"; // 이미지 불투명도 원래대로
  };

  return (
    <Box display="flex" justifyContent="center" alignItems={"center"} mb={10}>
      <SimpleGrid columns={[2, null, 5]} spacing={12}>
        {npc.map((npcItem, index) => (
          <Flex key={index} flexDirection={"column"}>
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
            <Text color={"white"} textAlign={"center"} mt={"2"}>
              {npcItem.name_kr}
            </Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
}
