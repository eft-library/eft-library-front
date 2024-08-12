"use client";

import { useState, useMemo, useRef } from "react";
import QuillWrapper from "@/components/quill/quillWrapper";
import { insertVideo, videoHandler } from "@/components/quill/videoUtils";
import "@/assets/commentEditor.css";
import { QUILL_FORMATS } from "@/util/consts/libraryConsts";
import API_ENDPOINTS from "@/config/endPoints";
import { VideoDialog } from "@/components/quill/videoDiaglog";
import { QuillToolbar } from "@/components/quill/quickToolbar";
import { ImageHandler } from "@/components/quill/imageHandler";
import "react-quill/dist/quill.snow.css";
import LoadingSpinner from "@/components/quill/loadingSpinner";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import type { CommentRewrite } from "@/types/types";
import ImgWithZoom from "../imgWithZoom";
import { fetchUserData } from "@/lib/api";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import { useSession } from "next-auth/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function CommentRewrite({
  comment,
  setIsRewrite,
  editorWidth,
  getComment,
  currentComment,
}: CommentRewrite) {
  const { data: session } = useSession();
  const [preview, setPreview] = useState(false);
  const quillRef = useRef<any>();
  const [editorContent, setEditorContent] = useState<string>(comment.contents);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [insertPosition, setInsertPosition] = useState<number | null>(null); // 커서 위치 저장
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

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

  const updateComment = async () => {
    try {
      const response = await fetchUserData(
        USER_API_ENDPOINTS.UPDATE_COMMENT,
        "POST",
        {
          id: comment.id,
          contents: editorContent,
        },
        session
      );

      if (response.status === 200) {
        await getComment(currentComment);
        alert("수정되었습니다.");
        setIsRewrite(false);
        setPreview(false);
      } else {
        alert("잠시후 다시 시도해주세요");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {preview ? (
        <ImgWithZoom content={editorContent} />
      ) : (
        <>
          <Box w={editorWidth} display={"flex"} flexDirection={"column"} mt={4}>
            <QuillWrapper
              forwardedRef={quillRef}
              value={editorContent}
              onChange={handleChange}
              modules={modules}
              formats={QUILL_FORMATS}
              theme="snow"
            />
            <VideoDialog
              isOpen={isOpen}
              onClose={onClose}
              cancelRef={cancelRef}
              videoUrl={videoUrl}
              setVideoUrl={setVideoUrl}
              insertVideo={handleInsertVideo}
            />
            {loading && <LoadingSpinner />}
          </Box>
        </>
      )}
      <Box
        display={"flex"}
        mt={4}
        mb={10}
        justifyContent={"flex-end"}
        alignItems={"center"}
        w={editorWidth}
      >
        {preview ? (
          <Button
            border={"1px solid"}
            borderColor={ALL_COLOR.WHITE}
            bg={ALL_COLOR.BLACK}
            _hover={{ bg: ALL_COLOR.DARK_GRAY }}
            mr={2}
            onClick={() => setPreview(false)}
          >
            수정하기
          </Button>
        ) : (
          <Button
            border={"1px solid"}
            borderColor={ALL_COLOR.WHITE}
            bg={ALL_COLOR.BLACK}
            _hover={{ bg: ALL_COLOR.DARK_GRAY }}
            mr={2}
            onClick={() => setPreview(true)}
          >
            미리보기
          </Button>
        )}
        <Button
          border={"1px solid"}
          borderColor={ALL_COLOR.WHITE}
          bg={ALL_COLOR.BLACK}
          _hover={{ bg: ALL_COLOR.DARK_GRAY }}
          mr={2}
          onClick={updateComment}
        >
          저장
        </Button>
        <Button
          border={"1px solid"}
          borderColor={ALL_COLOR.WHITE}
          bg={ALL_COLOR.BLACK}
          _hover={{ bg: ALL_COLOR.DARK_GRAY }}
          onClick={() => setIsRewrite(false)}
        >
          취소
        </Button>
      </Box>
    </>
  );
}
