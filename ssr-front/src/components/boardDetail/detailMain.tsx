"use client";

import { Box } from "@chakra-ui/react";
import BoardHeader from "@/components/board/boardHeader";
import BoardContainer from "@/components/board/boardContainer";
import DetailTitle from "@/components/boardDetail/detailTitle";
import useBoardDetail from "@/hooks/userBoardDetail";
import DetailContents from "@/components/boardDetail/detailContents";
import { fetchUserData } from "@/lib/api";
import { useSession } from "next-auth/react";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import DetailComment from "@/components/boardDetail/detailComment";
import type { BoardMain } from "@/types/types";

export default function DetailMain({ siteParam }: BoardMain) {
  const { data: session } = useSession();
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
          board_type: siteParam,
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
      <BoardHeader siteParam={siteParam} />

      <Box border="1px solid white" p={5} borderRadius="10px">
        <DetailTitle post={postInfo} />
        <DetailContents
          post={postInfo}
          onClickLike={onClickLike}
          boardType={siteParam}
        />
        {siteParam !== "notice" && <DetailComment />}
      </Box>
    </BoardContainer>
  );
}
