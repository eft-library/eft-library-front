"use client";

import { Button, Flex, Input, Select } from "@chakra-ui/react";
import "@/assets/input.css";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function BoardSearch({
  searchInfo,
  setSearchData,
  getFilterPage,
}) {
  return (
    <Flex justifyContent="center" alignItems="center" mt={5}>
      <Select
        placeholder="필터 선택"
        width="200px"
        mr={2}
        onChange={(e) => setSearchData(e, "filter")}
        fontWeight={600}
        value={searchInfo.filter}
        bg={ALL_COLOR.BLACK}
        borderColor={ALL_COLOR.WHITE}
      >
        <option value="title">제목</option>
        <option value="contents_title">제목+내용</option>
        <option value="contents">내용</option>
        <option value="nickname">닉네임</option>
      </Select>
      <Input
        placeholder="검색어를 입력해주세요"
        width="300px"
        fontWeight={600}
        value={searchInfo.word}
        onChange={(e) => setSearchData(e, "word")}
        mr={2}
        border={"1px solid"}
        borderRadius={"lg"}
      />
      <Button
        color={ALL_COLOR.WHITE}
        _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
        borderColor={ALL_COLOR.WHITE}
        border={"1px solid"}
        onClick={() => getFilterPage()}
      >
        검색
      </Button>
    </Flex>
  );
}
