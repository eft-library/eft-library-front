import { useState, useMemo, useRef } from "react";
import QuillWrapper from "@/components/quill/quillWrapper";
import { insertVideo, videoHandler } from "@/components/quill/videoUtils";
import "@/assets/editor.css";
import { COMMENT_FORMAT } from "@/util/consts/libraryConsts";
import API_ENDPOINTS from "@/config/endPoints";
import { VideoDialog } from "@/components/quill/videoDiaglog";
import CommentSubmit from "./commentSubmit";
import { CommentToolbar } from "@/components/quill/quickToolbar";
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
  const [editorContent, setEditorContent] = useState<string>(
    "<p>사진은 드래그로 놓아주세요.</p><br/><p>타인을 배려하는 마음으로, 긍정적인 의견을 남겨주세요.</p><p>명예훼손, 개인정보 유출, 허위사실 유포 등의 글은 법률에 의해 처벌 받을 수 있습니다.</p>"
  ); // 초기 텍스트 설정
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [insertPosition, setInsertPosition] = useState<number | null>(null); // 커서 위치 저장
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  // 사용자 첫 클릭에 에디터 내용을 비우기 위한 상태
  const [isInitial, setIsInitial] = useState<boolean>(true);

  const handleInsertVideo = () => {
    insertVideo(quillRef, videoUrl, insertPosition, setVideoUrl, onClose);
  };

  const handleVideoHandler = () => {
    videoHandler(quillRef, setInsertPosition, onOpen);
  };

  const handleChange = (content: string) => {
    setEditorContent(content);
  };

  // 포커스 핸들러: 사용자 첫 클릭 시 에디터 내용을 비움
  const handleFocus = () => {
    if (isInitial) {
      setEditorContent(""); // 빈 문자열로 초기화
      setIsInitial(false); // 이후에는 초기화하지 않음
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: CommentToolbar({ onVideoHandler: handleVideoHandler }),
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
        onFocus={handleFocus} // 포커스 핸들러 연결
        modules={modules}
        formats={COMMENT_FORMAT}
        theme="snow"
        className="comment-quill-editor"
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
