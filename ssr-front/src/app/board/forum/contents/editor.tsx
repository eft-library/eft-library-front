"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { forwardRef, useMemo, useState } from "react";
import type { ReactQuillProps } from "react-quill";
import ReactQuill from "react-quill";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import { Box } from "@chakra-ui/react";
import API_ENDPOINTS from "@/config/endPoints";
import "@/assets/editor.css";

// 동적으로 ReactQuill을 로드
const QuillWrapper = dynamic(
  async () => {
    const { default: ReactQuill } = await import("react-quill");
    const { default: ImageDropAndPaste } = await import(
      "quill-image-drop-and-paste"
    );

    ReactQuill.Quill.register("modules/imageActions", ImageActions);
    ReactQuill.Quill.register("modules/imageFormats", ImageFormats);
    ReactQuill.Quill.register("modules/imageDropAndPaste", ImageDropAndPaste);

    // forwardRef를 사용하여 ref를 전달
    return forwardRef<ReactQuill, ReactQuillProps>((props, ref) => (
      <ReactQuill ref={ref} {...props} />
    ));
  },
  {
    ssr: false,
  }
) as typeof ReactQuill;

export default function Editor() {
  const [editorContent, setEditorContent] = useState<string>("");

  const handleChange = (content: string) => {
    setEditorContent(content);
  };

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image", "video"],
      ],
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
            const quill = this.quill; // Ensure `this.quill` is accessible
            const index = (quill.getSelection() || {}).index;
            const insertionIndex =
              index === undefined || index < 0 ? quill.getLength() : index;
            quill.insertEmbed(insertionIndex, "image", data.image_url, "user");
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
        value={editorContent}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        theme="snow"
        style={{
          color: "#fff",
        }}
      />
    </Box>
  );
}
