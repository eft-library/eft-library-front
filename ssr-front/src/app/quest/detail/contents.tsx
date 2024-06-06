"use client";

import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useAppStore } from "@/store/provider";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";

interface QuestType {
  id: string;
  npc_value: string;
  name_kr: string;
  name_en: string;
  required_kappa: boolean;
  objectives_kr: string[];
  rewards_kr: string[];
}

export default function Contents() {
  const { npcId } = useAppStore((state) => state);
  const [quest, setQuest] = useState<QuestType[]>([]);

  useEffect(() => {
    fetchDataWithNone("/api/quest/all", setQuest);
  }, []);

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"95%"}
    >
      <TableContainer border="1px solid" borderColor={ALL_COLOR.WHITE}>
        <Table variant="simple" size={"lg"}>
          <Thead>
            <Tr>
              <Th
                fontWeight={"800"}
                textAlign={"center"}
                borderRight="1px solid white"
                fontSize="lg"
                color={ALL_COLOR.WHITE}
              >
                제목
              </Th>
              <Th
                fontWeight={"800"}
                textAlign={"center"}
                borderRight="1px solid white"
                fontSize="lg"
                color={ALL_COLOR.WHITE}
              >
                목표
              </Th>
              <Th
                fontWeight={"800"}
                textAlign={"center"}
                borderRight="1px solid white"
                fontSize="lg"
                color={ALL_COLOR.WHITE}
              >
                보상
              </Th>
              <Th
                fontWeight={"800"}
                textAlign={"center"}
                borderRight="1px solid white"
                fontSize="lg"
                color={ALL_COLOR.WHITE}
              >
                카파
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {quest.map(
              (item, index) =>
                npcId === null || npcId === item.npc_value ? (
                  <Tr key={index}>
                    <Td
                      fontSize="md"
                      fontWeight={"700"}
                      borderRight="1px solid white"
                      color={ALL_COLOR.ORANGE}
                      textAlign={"center"}
                      cursor={"pointer"}
                      _hover={{ color: ALL_COLOR.BEIGE }}
                      paddingX={2}
                      paddingY={2}
                    >
                      <Link href={`/quest/detail/${item.id}`}>
                        {item.name_kr}
                      </Link>
                      <br />
                      <Link href={`/quest/detail/${item.id}`}>
                        {item.name_en}
                      </Link>
                    </Td>
                    <Td
                      maxW="520px"
                      minW="320px"
                      fontSize="md"
                      borderRight="1px solid white"
                      color={ALL_COLOR.WHITE}
                      fontWeight={"700"}
                      whiteSpace="normal"
                      paddingX={4}
                      paddingY={4}
                    >
                      {item.objectives_kr.map((obj, oIndex) => (
                        <Text
                          key={oIndex}
                          mb={1}
                          dangerouslySetInnerHTML={{
                            __html: `*&nbsp;&nbsp;${obj}`,
                          }}
                        />
                      ))}
                    </Td>
                    <Td
                      maxW="500px"
                      minW="300px"
                      fontSize="md"
                      borderRight="1px solid white"
                      color={ALL_COLOR.WHITE}
                      fontWeight={"700"}
                      whiteSpace="normal"
                      paddingX={4}
                      paddingY={4}
                    >
                      {item.rewards_kr.map((rewards, rIndex) => (
                        <Text
                          key={rIndex}
                          mb={1}
                          dangerouslySetInnerHTML={{
                            __html: `*&nbsp;&nbsp;${rewards}`,
                          }}
                        />
                      ))}
                    </Td>
                    <Td
                      width={"20px"}
                      fontSize="lg"
                      borderRight="1px solid white"
                      textAlign={"center"}
                      fontWeight={"700"}
                      paddingX={2}
                      paddingY={2}
                    >
                      <Text
                        color={
                          item.required_kappa ? ALL_COLOR.YELLOW : ALL_COLOR.RED
                        }
                      >
                        {item.required_kappa ? "Y" : "N"}
                      </Text>
                    </Td>
                  </Tr>
                ) : null // 필터링된 퀘스트가 아닌 경우에는 null 반환
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
