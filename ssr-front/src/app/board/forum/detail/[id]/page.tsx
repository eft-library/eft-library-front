"use client";

import { Box, Flex, Text, Heading, Button, Textarea } from "@chakra-ui/react";
import BoardHeader from "@/components/board/boardHeader";
import BoardContainer from "@/components/board/boardContainer";
import DetailTitle from "@/components/boardDetail/detailTitle";
import useBoardDetail from "@/hooks/userBoardDetail";
import DetailContents from "@/components/boardDetail/detailContents";
import { fetchUserData } from "@/lib/api";
import { useSession } from "next-auth/react";
import USER_API_ENDPOINTS from "@/config/userEndPoints";

export default function ForumDetail() {
  const { data: session } = useSession();
  const siteParam = "forum";
  const { postInfo, getBoardPage } = useBoardDetail(siteParam);

  if (!postInfo) return null;

  const onClickLike = async (boardId: string, type: string) => {
    try {
      if (!session) {
        alert("로그인 후 사용가능합니다.");
      }

      const response = await fetchUserData(
        USER_API_ENDPOINTS.CHANGE_LIKE,
        "POST",
        {
          id: boardId,
          type: type,
          board_type: "forum",
        },
        session
      );

      if (response.status === 200) {
        getBoardPage();
      } else {
        alert("잠시후 다시 시도해주세요");
        getBoardPage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BoardContainer>
      <BoardHeader siteParam="forum" />

      <Box border="1px solid white" p={5} borderRadius="10px">
        <DetailTitle post={postInfo} />
        <DetailContents
          post={postInfo}
          onClickLike={onClickLike}
          boardType={siteParam}
        />
        <Box mt={5}>
          <Heading as="h3" size="md" mb={3}>
            댓글
          </Heading>
          <Box borderTop="1px solid gray" py={3}>
            <Flex justify="space-between" align="flex-start">
              <Box>
                <Text color="white">{"고인물"}</Text>
                <Text color="rgba(255, 255, 255, 0.5)" fontSize="0.9em">
                  10분 전
                </Text>
                <Text mt={2}>여기에 댓글 내용이 들어갑니다.</Text>
              </Box>
              <Text color="white" cursor="pointer" ml={3}>
                답글
              </Text>
            </Flex>
          </Box>
          <Box mt={5} py={3}>
            <Textarea
              placeholder="댓글을 입력하세요..."
              bg="#444"
              color="white"
              borderRadius="5px"
              resize="none"
            />
            <Button
              mt={2}
              bg="none"
              color="white"
              border="1px solid white"
              borderRadius="6px"
              _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
            >
              등록
            </Button>
          </Box>
        </Box>
      </Box>
    </BoardContainer>
  );
}
