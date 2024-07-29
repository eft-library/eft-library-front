"use client";

import "react-quill/dist/quill.snow.css";
import { useMemo, useRef, useState } from "react";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import "@/assets/editor.css";
import { VideoDialog } from "./videoDiaglog";
import QuillWrapper from "./quillWrapper";

export default function Editor() {
  const quillRef = useRef<any>();
  const [editorContent, setEditorContent] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [insertPosition, setInsertPosition] = useState<number | null>(null); // 커서 위치 저장
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const handleChange = (content: string) => {
    setEditorContent(content);
  };

  // 비디오 삽입 핸들러
  const insertVideo = () => {
    const quill = quillRef.current?.getEditor();
    if (videoUrl) {
      // URL이 YouTube 비디오 URL인지 확인
      const youtubeMatch = videoUrl.match(
        /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      );

      if (youtubeMatch) {
        const videoId = youtubeMatch[1];
        const videoSrc = `https://www.youtube.com/embed/${videoId}`;
        const position =
          insertPosition !== null ? insertPosition : quill.getLength();

        // 비디오 삽입
        quill.insertEmbed(position, "video", videoSrc);

        // 커서 이동 (선택 영역 없을 경우)
        if (insertPosition === null) {
          quill.setSelection(position + 1);
        }
      } else {
        alert("유효한 YouTube URL이 아닙니다.");
      }
    }
    setVideoUrl("");
    setInsertPosition(null); // 위치 초기화
    onClose();
  };

  // 비디오 삽입 모달 핸들러
  const VideoHandler = () => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const range = quill.getSelection();
      setInsertPosition(range ? range.index : quill.getLength()); // 현재 커서 위치 저장
    }
    onOpen();
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }, { font: [] }],
          [{ size: [] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "video"],
        ],
        handlers: {
          video: VideoHandler,
        },
      },
      imageActions: {},
      imageFormats: {},
      imageDropAndPaste: {
        handler: async (dataUrl, type, imageData) => {
          const file = imageData.toFile();

          // generate a form data
          const formData = new FormData();

          // or just append the file
          formData.append("file", file);

          try {
            const response = await fetch(API_ENDPOINTS.UPLOAD_BOARD_IMAGE, {
              method: "POST",
              body: formData,
            });

            if (!response.ok) {
              throw new Error("Network response was not ok");
            }

            const data = await response.json();
            const quill = quillRef.current?.getEditor();
            const index = (quill.getSelection() || {}).index;
            const insertionIndex =
              index === undefined || index < 0 ? quill.getLength() : index;
            quill.insertEmbed(insertionIndex, "image", data.data, "user");
          } catch (error) {
            console.error("Error uploading image:", error);
            return dataUrl;
          }
        },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "float",
    "height",
    "width",
  ];

  return (
    <Box w={"95%"}>
      <QuillWrapper
        forwardedRef={quillRef}
        value={editorContent}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme="snow"
      />
      <Button onClick={() => console.log(editorContent)}>Save</Button>

      <VideoDialog
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        insertVideo={insertVideo}
      />
    </Box>
  );
}
