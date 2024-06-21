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
import { useAppStore } from "@/store/provider";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import type { Quest, Column } from "@/types/types";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import ContentsSkeleton from "../skeleton/contentsSkeleton";
import useColorValue from "@/hooks/useColorValue";

export default function Contents() {
  const { blackWhite, orange, darkLightYellow, red, beige } = useColorValue();
  const { npcId } = useAppStore((state) => state);
  const [quest, setQuest] = useState<Quest[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.quest}`,
      setColumn
    );
  }, []);

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_QUEST, setQuest);
  }, []);

  if (!quest || !column) return <ContentsSkeleton />;

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"95%"}
    >
      <TableContainer border="1px solid" borderColor={blackWhite}>
        <Table variant="simple" size={"lg"}>
          <Thead>
            <Tr>
              {column.value_kr.map((item) => (
                <Th
                  key={item}
                  fontWeight={"800"}
                  textAlign={"center"}
                  borderRight="1px solid white"
                  fontSize="lg"
                  color={blackWhite}
                >
                  {item}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {quest.map(
              (item) =>
                npcId === null || npcId === item.npc_value ? (
                  <Tr key={item.id}>
                    <Td
                      fontSize="md"
                      fontWeight={"700"}
                      borderRight="1px solid white"
                      color={orange}
                      textAlign={"center"}
                      cursor={"pointer"}
                      _hover={{ color: beige }}
                      paddingX={2}
                      paddingY={2}
                    >
                      <Link href={`/quest/detail/${item.id}`}>
                        {item.title_kr}
                      </Link>
                      <br />
                      <Link href={`/quest/detail/${item.id}`}>
                        {item.title_en}
                      </Link>
                    </Td>
                    <Td
                      maxW="520px"
                      minW="320px"
                      fontSize="md"
                      borderRight="1px solid white"
                      color={blackWhite}
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
                      color={blackWhite}
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
                      <Text color={item.required_kappa ? darkLightYellow : red}>
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
