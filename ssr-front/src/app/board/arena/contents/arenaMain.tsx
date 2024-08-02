"use client";

import { Box, VStack } from "@chakra-ui/react";
import { fetchDataWithReturn } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { useEffect, useState } from "react";
import type { PostInfo } from "@/types/types";
import BoardHeader from "@/components/board/boardHeader";
import BoardPost from "@/components/board/boardPost";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination/pagination";
import BoardSearch from "@/components/board/boardSearch";
import BoardContainer from "@/components/board/boardContainer";

export default function ArenaMain() {
  const param = useSearchParams();
  const [postInfo, setPostInfo] = useState<PostInfo>();
  const siteParam = "arena";
  const getBoardPage = async (page: number) => {
    const result = await fetchDataWithReturn(
      `${API_ENDPOINTS.GET_BOARD_BY_TYPE}/${siteParam}?page=${page}&page_size=10`
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
        <BoardHeader siteParam={siteParam} />
        <Box border="1px solid white" p={5} borderRadius="10px">
          <VStack spacing={5}>
            {postInfo.data.map((post) => (
              <BoardPost key={post.id} post={post} />
            ))}
            <BoardSearch />
          </VStack>
          <Pagination
            total={postInfo.max_pages}
            routeLink={`/board/${siteParam}?id=`}
            currentPage={Number(param.get("id"))}
          />
        </Box>
      </Box>
    </BoardContainer>
  );
}
