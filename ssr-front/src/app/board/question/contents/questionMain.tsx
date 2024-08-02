"use client";

import { Box, VStack } from "@chakra-ui/react";
import BoardHeader from "@/components/board/boardHeader";
import BoardPost from "@/components/board/boardPost";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/pagination/pagination";
import BoardSearch from "@/components/board/boardSearch";
import BoardContainer from "@/components/board/boardContainer";
import useBoardSearch from "@/hooks/useBoardSearch";

export default function QuestionMain() {
  const param = useSearchParams();
  const siteParam = "question";
  const { searchInfo, postInfo, setSearchData, getFilterPage } =
    useBoardSearch(siteParam);

  if (!postInfo) return null;

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
          routeLink={`/board/${siteParam}?id=`}
          currentPage={Number(param.get("id"))}
        />
      </Box>
    </BoardContainer>
  );
}
