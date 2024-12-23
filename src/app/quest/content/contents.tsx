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
  Skeleton,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAppStore } from "@/store/provider";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import type { Quest, Column } from "@/types/types";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function Contents() {
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

  const getTitle = (item) => {
    // 첫 번째 부분 추출
    let firstPart = item.title_kr
      .substring(0, item.title_kr.indexOf("("))
      .trim();

    // 두 번째 부분 추출
    let secondPart = item.title_kr.substring(item.title_kr.indexOf("(")).trim();

    return (
      <Td
        fontSize="md"
        fontWeight={"700"}
        borderRight="1px solid white"
        color={ALL_COLOR.ORANGE}
        textAlign={"center"}
        _hover={{ color: ALL_COLOR.BEIGE }}
        paddingX={2}
        paddingY={2}
      >
        <Link href={`/quest/detail/${item.id}`}>
          <Text _hover={{ color: ALL_COLOR.BEIGE }} color={ALL_COLOR.ORANGE}>
            {firstPart}
            <br />
            {secondPart}
          </Text>
        </Link>
      </Td>
    );
  };

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
      marginTop={10}
    >
      <TableContainer border="1px solid" borderColor={ALL_COLOR.WHITE}>
        <Table variant="simple" size={"lg"}>
          <Thead>
            <Tr>
              {!column
                ? Array(4)
                    .fill(null)
                    .map((_, index) => (
                      <Th
                        key={`null-column-${index}`}
                        fontWeight={"800"}
                        textAlign={"center"}
                        borderRight="1px solid white"
                        fontSize="lg"
                        color={ALL_COLOR.WHITE}
                      >
                        <Skeleton height="20px" width="100%" />
                      </Th>
                    ))
                : column.value_kr.map((item) => (
                    <Th
                      key={item}
                      fontWeight={"800"}
                      textAlign={"center"}
                      borderRight="1px solid white"
                      fontSize="lg"
                      color={ALL_COLOR.WHITE}
                    >
                      {item}
                    </Th>
                  ))}
            </Tr>
          </Thead>
          <Tbody>
            {!quest
              ? Array(10)
                  .fill(null)
                  .map((_, index) => (
                    <Tr key={`null-title-${index}`}>
                      <Td
                        borderRight="1px solid white"
                        textAlign={"center"}
                        paddingX={2}
                        paddingY={2}
                      >
                        <Skeleton height="20px" width="120px" />
                        <br />
                        <Skeleton height="20px" width="120px" />
                      </Td>
                      <Td
                        maxW="520px"
                        minW="320px"
                        borderRight="1px solid white"
                        whiteSpace="normal"
                        paddingX={4}
                        paddingY={4}
                      >
                        <Skeleton height="20px" width="100%" />
                        <Skeleton height="20px" width="100%" mt={4} mb={4} />
                        <Skeleton height="20px" width="100%" />
                      </Td>
                      <Td
                        maxW="500px"
                        minW="300px"
                        borderRight="1px solid white"
                        whiteSpace="normal"
                        paddingX={4}
                        paddingY={4}
                      >
                        <Skeleton height="20px" width="100%" />
                        <Skeleton height="20px" width="100%" mt={4} mb={4} />
                        <Skeleton height="20px" width="100%" />
                      </Td>
                      <Td
                        width={"20px"}
                        borderRight="1px solid white"
                        paddingX={2}
                        paddingY={2}
                      >
                        <Skeleton height="20px" width="100%" />
                      </Td>
                    </Tr>
                  ))
              : quest.map(
                  (item) =>
                    npcId === null || npcId === item.npc_value ? (
                      <Tr key={item.id}>
                        {getTitle(item)}
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
                              item.required_kappa
                                ? ALL_COLOR.YELLOW
                                : ALL_COLOR.RED
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
