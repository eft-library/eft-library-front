"use client";

import { Box, VStack } from "@chakra-ui/react";
import BoardHeader from "@/components/board/boardHeader";
import BoardPost from "@/components/board/boardPost";
import { usePathname, useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination/pagination";
import BoardSearch from "@/components/board/boardSearch";
import BoardContainer from "@/components/board/boardContainer";
import useBoardSearch from "@/hooks/useBoardSearch";
import type { BoardMain } from "@/types/types";
import BoardSkeleton from "./boardSkeleton";

export default function BoardMain({ siteParam }: BoardMain) {
  const param = useSearchParams();
  const pathname = usePathname();
  const { searchInfo, postInfo, setSearchData, getFilterPage } =
    useBoardSearch(siteParam);

  if (!postInfo) return <BoardSkeleton />;

  const makeRouteLink = () => {
    if (pathname === "/board") {
      return "/board?id=";
    } else if (pathname === "/board/issue") {
      return "/board/issue?id=";
    } else if (pathname.includes("issue")) {
      return `/board/${siteParam}/issue?id=`;
    } else {
      return `/board/${siteParam}?id=`;
    }
  };

  return (
    <BoardContainer>
      <BoardHeader siteParam={siteParam} />
      <Box border="1px solid white" p={5} borderRadius="10px">
        <VStack spacing={5}>
          {postInfo.data.map((post) => (
            <BoardPost key={post.id} post={post} />
          ))}
          <BoardSearch
            searchInfo={searchInfo}
            setSearchData={setSearchData}
            getFilterPage={getFilterPage}
          />
        </VStack>
        <Pagination
          total={postInfo.max_pages}
          routeLink={makeRouteLink()}
          currentPage={Number(param.get("id"))}
        />
      </Box>
    </BoardContainer>
  );
}
