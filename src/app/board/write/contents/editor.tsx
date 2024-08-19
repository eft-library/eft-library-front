"use client";

import "react-quill/dist/quill.snow.css";
import { useMemo, useRef, useState } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import "@/assets/editor.css";
import { VideoDialog } from "@/components/quill/videoDiaglog";
import { fetchUserData } from "@/lib/api";
import QuillWrapper from "@/components/quill/quillWrapper";
import SubContents from "@/components/quill/subContents";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/quill/submitButton";
import { QuillToolbar } from "@/components/quill/quickToolbar";
import { ImageHandler } from "@/components/quill/imageHandler";
import { QUILL_FORMATS } from "@/util/consts/libraryConsts";
import { insertVideo, videoHandler } from "@/components/quill/videoUtils";
import LoadingSpinner from "@/components/quill/loadingSpinner";
import { useAppStore } from "@/store/provider";

export default function Editor() {
  const { user } = useAppStore((state) => state);
  const quillRef = useRef<any>();
  const [editorContent, setEditorContent] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [insertPosition, setInsertPosition] = useState<number | null>(null); // 커서 위치 저장
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();
  const router = useRouter();
  const [subContents, setSubContents] = useState({
    title: "",
    type: "",
  });
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const setSubData = (e, val) => {
    if (val === "title") {
      setSubContents((prev) => {
        return {
          ...prev,
          title: e.target.value,
        };
      });
    } else {
      setSubContents((prev) => {
        return {
          ...prev,
          type: e.target.value,
        };
      });
    }
  };

  const handleChange = (content: string) => {
    setEditorContent(content);
  };

  const submitPosts = async () => {
    try {
      if (subContents.title.length < 1 || subContents.type.length < 1) {
        alert("제목 또는 분류를 선택해주세요");
      } else if (user.ban.ban_end_time !== null) {
        alert("제재 중인 사용자입니다.");
      } else {
        const response = await fetchUserData(
          USER_API_ENDPOINTS.ADD_POST,
          "POST",
          {
            title: subContents.title,
            contents: editorContent,
            type: subContents.type,
          },
          session
        );

        if (response.status === 200) {
          const data = response.data;
          alert("글이 정상적으로 등록 되었습니다.");
          router.push(`/board/${data.type}?id=${1}`);
        } else {
          alert("잠시후 다시 시도해주세요");
          router.push("/board/write");
        }
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

  if (!user) return null;

  return (
    <Box w={"95%"} display={"flex"} flexDirection={"column"}>
      <SubContents
        subContents={subContents}
        setSubData={setSubData}
        userInfo={user}
      />
      <QuillWrapper
        forwardedRef={quillRef}
        value={editorContent}
        onChange={handleChange}
        modules={modules}
        formats={QUILL_FORMATS}
        theme="snow"
        className="write-quill-editor" // 사용자 정의 클래스 추가
      />
      <SubmitButton onClick={submitPosts} />
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
