"use client";

import { Box, useDisclosure } from "@chakra-ui/react";
import BoardHeader from "@/components/board/boardHeader";
import BoardContainer from "@/components/board/boardContainer";
import DetailTitle from "@/components/boardDetail/detailTitle";
import useBoardDetail from "@/hooks/userBoardDetail";
import DetailContents from "@/components/boardDetail/detailContents";
import { fetchDataWithReturn, fetchUserData } from "@/lib/api";
import { useSession } from "next-auth/react";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import DetailComment from "./comment/detailComment";
import type { BoardMain, CommentInfo } from "@/types/types";
import QuillWrapper from "@/components/quill/quillWrapper";
import { insertVideo, videoHandler } from "@/components/quill/videoUtils";
import LoadingSpinner from "@/components/quill/loadingSpinner";
import { useEffect, useMemo, useRef, useState } from "react";
import { QuillToolbar } from "@/components/quill/quickToolbar";
import { ImageHandler } from "@/components/quill/imageHandler";
import "react-quill/dist/quill.snow.css";
import CommentPagination from "../pagination/commentPagination";
import "@/assets/commentEditor.css";
import { QUILL_FORMATS } from "@/util/consts/libraryConsts";
import API_ENDPOINTS from "@/config/endPoints";
import { VideoDialog } from "@/components/quill/videoDiaglog";
import { useAppStore } from "@/store/provider";
import CommentSubmit from "./comment/commentSubmit";

export default function DetailMain({ siteParam }: BoardMain) {
  const { user } = useAppStore((state) => state);
  const { data: session } = useSession();
  const quillRef = useRef<any>();
  const { postInfo, getBoardPage } = useBoardDetail(siteParam);
  const [editorContent, setEditorContent] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [insertPosition, setInsertPosition] = useState<number | null>(null); // 커서 위치 저장
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();
  const [comments, setComments] = useState<CommentInfo>();

  const getCommentsByBoardID = async (page: number) => {
    const result = await fetchDataWithReturn(
      `${API_ENDPOINTS.GET_COMMENTS_BY_BOARD_ID}?page=${page}&page_size=10&board_id=${postInfo.id}`
    );
    setComments(result);
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

  const handleInsertVideo = () => {
    insertVideo(quillRef, videoUrl, insertPosition, setVideoUrl, onClose);
  };

  const handleVideoHandler = () => {
    videoHandler(quillRef, setInsertPosition, onOpen);
  };

  const handleChange = (content: string) => {
    setEditorContent(content);
  };

  const modules = useMemo(
    () => ({
      toolbar: QuillToolbar({ onVideoHandler: handleVideoHandler }),
      imageActions: {},
      imageFormats: {},
      imageDropAndPaste: ImageHandler({
        quillRef,
        api: API_ENDPOINTS.UPLOAD_BOARD_IMAGE,
        setLoading: setLoading,
      }),
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const submitComment = async (parent_email, contents, depth, parent_id) => {
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
          setEditorContent("");
          getCommentsByBoardID(comments.max_pages);
          // 댓글 새로 불러오는 통신 필요
        } else {
          alert("잠시후 다시 시도해주세요");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!postInfo || !comments) return null;

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
              comment={comment}
              submitComment={submitComment}
            />
          ))}
        <Box w={"100%"} display={"flex"} flexDirection={"column"} mt={10}>
          <QuillWrapper
            forwardedRef={quillRef}
            value={editorContent}
            onChange={handleChange}
            modules={modules}
            formats={QUILL_FORMATS}
            theme="snow"
          />
          <CommentSubmit
            onClick={submitComment}
            parent_email={""}
            contents={editorContent}
            depth={1}
            parent_id={""}
          />
          <VideoDialog
            isOpen={isOpen}
            onClose={onClose}
            cancelRef={cancelRef}
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
            insertVideo={handleInsertVideo}
          />
        </Box>
        <CommentPagination
          total={comments.max_pages}
          onPageChange={getCommentsByBoardID}
          currentPage={comments.current_page}
        />
        {loading && <LoadingSpinner />}
      </Box>
    </BoardContainer>
  );
}
