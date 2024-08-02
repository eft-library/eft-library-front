"use client";

import { Button, Flex, Input, Select } from "@chakra-ui/react";

export default function BoardSearch() {
  return (
    <Flex justifyContent="center" alignItems="center" mt={5}>
      <Select placeholder="필터 선택" width="200px" mr={2}>
        <option value="title">제목</option>
        <option value="title_content">제목+내용</option>
        <option value="content">내용</option>
        <option value="nickname">닉네임</option>
      </Select>
      <Input placeholder="검색..." width="300px" mr={2} />
      <Button colorScheme="whiteAlpha">검색</Button>
    </Flex>
  );
}
