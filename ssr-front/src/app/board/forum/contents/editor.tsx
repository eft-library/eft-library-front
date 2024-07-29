"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useMemo, useRef, useState } from "react";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import {
  Box,
  Button,
  Input,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import "@/assets/editor.css";
import { ALL_COLOR } from "@/util/consts/colorConsts";

// 동적으로 ReactQuill을 로드
const QuillWrapper = dynamic(
  async () => {
    const { default: ReactQuill } = await import("react-quill");
    const { default: ImageDropAndPaste } = await import(
      "quill-image-drop-and-paste"
    );
    const Quill = ReactQuill.Quill;

    // VideoBlot을 확장하여 삭제 버튼 추가
    const BlockEmbed = Quill.import("blots/block/embed");

    class VideoBlot extends BlockEmbed {
      static create(value) {
        const node = super.create();
        node.setAttribute("contenteditable", "false");

        const iframe = document.createElement("iframe");
        iframe.setAttribute("width", "560");
        iframe.setAttribute("height", "315");
        iframe.setAttribute("src", value);
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "true");

        const wrapper = document.createElement("div");
        wrapper.className = "ql-video-wrapper";
        wrapper.appendChild(iframe);

        const button = document.createElement("button");
        button.innerHTML = "동영상 제거";
        button.className = "ql-video-delete";
        button.onclick = () => {
          wrapper.remove();
        };

        // 버튼 스타일 추가
        button.style.backgroundColor = ALL_COLOR.BLACK;
        button.style.color = ALL_COLOR.WHITE;
        button.style.border = "1px solid white";
        button.style.padding = "5px 10px";
        button.style.cursor = "pointer";
        button.style.transition = "background-color 0.3s";
        button.style.borderRadius = "8px";

        // 호버 효과 추가
        button.onmouseover = () => {
          button.style.backgroundColor = ALL_COLOR.LIGHT_GRAY;
        };
        button.onmouseout = () => {
          button.style.backgroundColor = ALL_COLOR.BLACK;
        };

        wrapper.appendChild(button);
        node.appendChild(wrapper);

        return node;
      }

      static value(node) {
        const iframe = node.querySelector("iframe");
        return iframe ? iframe.getAttribute("src") : "";
      }
    }

    VideoBlot.blotName = "video";
    VideoBlot.tagName = "div";
    Quill.register(VideoBlot);

    ReactQuill.Quill.register("modules/imageActions", ImageActions);
    ReactQuill.Quill.register("modules/imageFormats", ImageFormats);
    ReactQuill.Quill.register("modules/imageDropAndPaste", ImageDropAndPaste);

    return function comp({ forwardedRef, ...props }: any) {
      return <ReactQuill ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

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

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent
            bg={ALL_COLOR.BLACK}
            borderColor={ALL_COLOR.WHITE}
            border={"1px solid"}
          >
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              비디오 삽입
            </AlertDialogHeader>

            <AlertDialogBody>
              비디오 URL을 입력하세요:
              <Input
                mt={4}
                bg={ALL_COLOR.BLACK}
                borderColor={ALL_COLOR.WHITE}
                placeholder="https://www.youtube.com/watch?v=example"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
                onClick={onClose}
                borderColor={ALL_COLOR.WHITE}
                border={"1px solid"}
              >
                취소
              </Button>
              <Button
                _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
                onClick={insertVideo}
                ml={3}
                borderColor={ALL_COLOR.WHITE}
                border={"1px solid"}
              >
                삽입
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
