"use client";

import { Box, Text } from "@chakra-ui/react";
import BoardHeader from "@/components/board/boardHeader";
import BoardContainer from "@/components/board/boardContainer";
import DetailTitle from "@/components/boardDetail/detailTitle";
import useBoardDetail from "@/hooks/userBoardDetail";
import DetailContents from "@/components/boardDetail/detailContents";
import { fetchUserData } from "@/lib/api";
import { useSession } from "next-auth/react";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import DetailComment from "./comment/detailComment";
import type { BoardMain, CommentInfo } from "@/types/types";
import { useEffect, useState } from "react";
import CommentPagination from "../pagination/commentPagination";
import API_ENDPOINTS from "@/config/endPoints";
import { useAppStore } from "@/store/provider";
import CommentQuill from "./comment/commentQuill";

export default function DetailMain({ siteParam }: BoardMain) {
  const { user } = useAppStore((state) => state);
  const { data: session } = useSession();
  const { postInfo, getBoardPage } = useBoardDetail(siteParam);
  const [comments, setComments] = useState<CommentInfo>();

  const getCommentsByBoardID = async (page: number) => {
    const res = await fetch(
      `${API_ENDPOINTS.GET_COMMENTS_BY_BOARD_ID}?page=${page}&page_size=10&board_id=${postInfo.id}`,
      {
        method: "GET",
        headers: {
          Authorization:
            session && session.accessToken
              ? `Bearer ${session.accessToken}`
              : "Bearer ",
          "Content-Type": "application/json",
        },
      }
    );

    const response = await res.json();
    setComments(response.data);
  };

  useEffect(() => {
    if (postInfo && postInfo.id) {
      getCommentsByBoardID(1);
    }
  }, [postInfo]);

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

  const submitComment = async (
    parent_email: string,
    contents: string,
    depth: number,
    parent_id: string
  ) => {
    try {
      if (user.ban.ban_end_time !== null) {
        alert("제재 중인 사용자입니다.");
      } else {
        const response = await fetchUserData(
          USER_API_ENDPOINTS.ADD_COMMENT,
          "POST",
          {
            contents: contents,
            board_type: postInfo.type,
            parent_id: parent_id,
            board_id: postInfo.id,
            depth: depth,
            parent_user_email: parent_email,
          },
          session
        );

        if (response.status === 200) {
          alert("글이 정상적으로 등록 되었습니다.");
          // 새로운 댓글의 경우
          if (depth == 1) {
            getCommentsByBoardID(comments.max_pages);
          }
          // 대댓일 경우
          else {
            getCommentsByBoardID(comments.current_page);
          }

          // 댓글 새로 불러오는 통신 필요
        } else {
          alert("잠시후 다시 시도해주세요");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDelete = async (commentId: string, deleteByUser: boolean) => {
    try {
      const response = await fetchUserData(
        USER_API_ENDPOINTS.DELETE_COMMENT,
        "POST",
        {
          comment_id: commentId,
          delete_by_user: deleteByUser,
        },
        session
      );

      if (response.status === 200) {
        alert("댓글이 삭제 되었습니다.");
        getCommentsByBoardID(comments.current_page);
      } else {
        alert("잠시후 다시 시도해주세요");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickLikeOrDis = async (commentId: string, type: string) => {
    try {
      if (!session) {
        alert("로그인 후 사용가능합니다.");
      }

      const response = await fetchUserData(
        USER_API_ENDPOINTS.LIKE_OR_DIS_COMMENT,
        "POST",
        {
          id: commentId,
          type: type,
        },
        session
      );

      if (response.status === 200) {
        getCommentsByBoardID(comments.current_page);
      } else {
        alert("잠시후 다시 시도해주세요");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!postInfo || !comments) return null;

  const checkUser = () => {
    if (!session || !user) return false;

    return true;
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
        {siteParam !== "notice" &&
          comments.data.map((comment) => (
            <DetailComment
              key={comment.id}
              onClickLikeOrDis={onClickLikeOrDis}
              comment={comment}
              onClickDelete={onClickDelete}
              submitComment={submitComment}
            />
          ))}
        {checkUser() &&
          (user.ban.ban_end_time ? (
            <Box w={"100%"} mt={10}>
              <Text textAlign={"center"}>
                밴 당한 사용자는 댓글 작성이 제한 됩니다.
              </Text>
            </Box>
          ) : (
            <CommentQuill
              depth={1}
              comment={null}
              submitComment={submitComment}
            />
          ))}
        <CommentPagination
          total={comments.max_pages}
          onPageChange={getCommentsByBoardID}
          currentPage={comments.current_page}
        />
      </Box>
    </BoardContainer>
  );
}