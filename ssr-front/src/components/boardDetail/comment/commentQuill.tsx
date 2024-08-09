"use client";

import { useState, useMemo, useRef } from "react";
import QuillWrapper from "@/components/quill/quillWrapper";
import { insertVideo, videoHandler } from "@/components/quill/videoUtils";
import "@/assets/commentEditor.css";
import { QUILL_FORMATS } from "@/util/consts/libraryConsts";
import API_ENDPOINTS from "@/config/endPoints";
import { VideoDialog } from "@/components/quill/videoDiaglog";
import CommentSubmit from "./commentSubmit";
import { QuillToolbar } from "@/components/quill/quickToolbar";
import { ImageHandler } from "@/components/quill/imageHandler";
import "react-quill/dist/quill.snow.css";
import LoadingSpinner from "@/components/quill/loadingSpinner";
import { Box, useDisclosure } from "@chakra-ui/react";
import type { CommentQuill } from "@/types/types";

export default function CommentQuill({
  submitComment,
  comment,
  depth,
  setWriteComment,
}: CommentQuill) {
  const quillRef = useRef<any>();
  const [editorContent, setEditorContent] = useState<string>("");
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

  return (
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
        contents={editorContent}
        parent_email={comment ? comment.user_email : ""}
        depth={depth}
        parent_id={comment ? comment.id : ""}
        setEditorContent={setEditorContent}
        setWriteComment={setWriteComment}
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
  );
}
