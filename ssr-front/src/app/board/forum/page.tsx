"use client";

import { ALL_COLOR } from "@/util/consts/colorConsts";
import {
  Box,
  Flex,
  Heading,
  Link,
  UnorderedList,
  ListItem,
  Text,
  Image,
  Select,
  Input,
  Button,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { fetchDataWithNone, fetchDataWithReturn } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { useEffect, useState } from "react";
import type { EditorSub, BoardType, Column, PostInfo } from "@/types/types";
import BoardHeader from "@/components/board/boardHeader";
import BoardPost from "@/components/board/boardPost";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination/pagination";
import BoardSearch from "@/components/board/boardSearch";
import BoardContainer from "@/components/board/boardContainer";

export default function Forum() {
  const param = useSearchParams();
  const [postInfo, setPostInfo] = useState<PostInfo>();

  const getBoardPage = async (page: number) => {
    const result = await fetchDataWithReturn(
      `${API_ENDPOINTS.GET_BOARD}?page=${page}&page_size=10`
    );
    setPostInfo(result);
  };

  useEffect(() => {
    getBoardPage(Number(param.get("id")));
  }, [param]);

  if (!postInfo) return null;

  return (
    <BoardContainer>
      <Box width="1300px" mx="auto">
        <BoardHeader siteParam="forum" />
        <Box border="1px solid white" p={5} borderRadius="10px">
          <VStack spacing={5}>
            {postInfo.data.map((post) => (
              <BoardPost key={post.id} post={post} />
            ))}
            <BoardSearch />
          </VStack>
          <Pagination
            total={postInfo.max_pages}
            routeLink={"/board/forum?id="}
            currentPage={Number(param.get("id"))}
          />
        </Box>
      </Box>
    </BoardContainer>
  );
}
