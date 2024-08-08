"use client";

import { Box, useDisclosure } from "@chakra-ui/react";
import BoardHeader from "@/components/board/boardHeader";
import BoardContainer from "@/components/board/boardContainer";
import DetailTitle from "@/components/boardDetail/detailTitle";
import useBoardDetail from "@/hooks/userBoardDetail";
import DetailContents from "@/components/boardDetail/detailContents";
import { fetchUserData } from "@/lib/api";
import { useSession } from "next-auth/react";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import DetailComment from "./comment/detailComment";
import type { BoardMain } from "@/types/types";
import QuillWrapper from "@/components/quill/quillWrapper";
import { insertVideo, videoHandler } from "@/components/quill/videoUtils";
import LoadingSpinner from "@/components/quill/loadingSpinner";
import { useMemo, useRef, useState } from "react";
import SubmitButton from "@/components/quill/submitButton";
import { QuillToolbar } from "@/components/quill/quickToolbar";
import { ImageHandler } from "@/components/quill/imageHandler";
import "react-quill/dist/quill.snow.css";
import "@/assets/commentEditor.css";
import { QUILL_FORMATS } from "@/util/consts/libraryConsts";
import API_ENDPOINTS from "@/config/endPoints";
import { VideoDialog } from "@/components/quill/videoDiaglog";

export default function DetailMain({ siteParam }: BoardMain) {
  const { data: session } = useSession();
  const quillRef = useRef<any>();
  const { postInfo, getBoardPage } = useBoardDetail(siteParam);
  const [editorContent, setEditorContent] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [insertPosition, setInsertPosition] = useState<number | null>(null); // 커서 위치 저장
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

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

  if (!postInfo) return null;

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
        <Box w={"100%"} display={"flex"} flexDirection={"column"} mt={10}>
          <QuillWrapper
            forwardedRef={quillRef}
            value={editorContent}
            onChange={handleChange}
            modules={modules}
            formats={QUILL_FORMATS}
            theme="snow"
          />
          <SubmitButton
            onClick={() => console.log(editorContent)}
            type={"comment"}
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
        {loading && <LoadingSpinner />}
      </Box>
    </BoardContainer>
  );
}
