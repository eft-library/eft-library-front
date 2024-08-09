"use client";

import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Input, Select, Text } from "@chakra-ui/react";
import type { EditorSub, BoardType, Column } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";

export default function SubContents({
  subContents,
  setSubData,
  userInfo,
}: EditorSub) {
  const [typeList, setTypeList] = useState<BoardType[]>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_BOARD_TYPE, setTypeList);
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.boardNotice}`,
      setColumn
    );
  }, []);

  if (!typeList || !column) return null;

  return (
    <Box w={"100%"} display={"flex"} flexDirection={"column"} mb={6}>
      <Box w={"100%"} display={"flex"} alignItems={"center"} mb={4}>
        <Box flex={"1"}>
          <Input
            placeholder="게시글 제목"
            bg={ALL_COLOR.BLACK}
            borderColor={ALL_COLOR.WHITE}
            fontWeight={600}
            value={subContents.title}
            onChange={(e) => setSubData(e, "title")}
          />
        </Box>
        <Box w={"40%"} ml={10}>
          <Select
            placeholder="게시글 분류"
            fontWeight={600}
            value={subContents.type}
            onChange={(e) => setSubData(e, "type")}
            bg={ALL_COLOR.BLACK}
            borderColor={ALL_COLOR.WHITE}
          >
            {typeList.map((boardType) => {
              if (boardType.value === "notice" && !userInfo.user.is_admin) {
                return null;
              }
              return (
                <option key={boardType.id} value={boardType.value}>
                  {boardType.name_kr}
                </option>
              );
            })}
          </Select>
        </Box>
      </Box>
      <Box borderRadius={"lg"} w={"100%"} bg={ALL_COLOR.LIGHT_GRAY}>
        {column.value_kr.map((col, index) => (
          <Text key={index} p={2} fontWeight={600}>
            {col}
          </Text>
        ))}
      </Box>
    </Box>
  );
}
