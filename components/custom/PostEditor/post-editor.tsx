"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { TipTapIframe } from "@/lib/config/tiptap-iframe";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import ImageResize from "tiptap-extension-resize-image";
import Highlight from "@tiptap/extension-highlight";
import Youtube from "@tiptap/extension-youtube";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button"; // Shadcn UI
import { PostEditorTypes } from "./post-editor.types";
import { COMMUNITY_ENDPOINTS } from "@/lib/config/endpoint";

export default function PostEditor({
  initialContent = "",
  onChange,
}: PostEditorTypes) {
  const lowlight = createLowlight(common);
  const [mounted, setMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      TipTapIframe,
      Highlight,
      Link.configure({ openOnClick: false }),
      Image,
      Youtube.configure({ controls: true }),
      CodeBlockLowlight.configure({ lowlight }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      ImageResize,
    ],
    content: initialContent,
    immediatelyRender: false, // SSR 방지
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  const uploadFileToFastAPI = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(COMMUNITY_ENDPOINTS.IMAGE_UPLOAD, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("이미지 업로드 실패");
    const response = await res.json();

    return response.data.image_url;
  };

  const onDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!editor) return;

      const files = event.dataTransfer.files;
      if (!files || files.length === 0) return;

      const images = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );

      for (const file of images) {
        try {
          const url = await uploadFileToFastAPI(file);
          editor.chain().focus().setImage({ src: url }).run();
        } catch (error) {
          alert("이미지 업로드 중 오류가 발생했습니다.");
          console.error(error);
        }
      }
    },
    [editor]
  );

  const insertIframe = () => {
    const url = prompt("iframe URL을 입력하세요");
    if (!url || !editor) return;
    editor
      .chain()
      .focus()
      .insertContent({
        type: "iframe",
        attrs: { src: url },
      })
      .run();
  };

  useEffect(() => {
    setMounted(true);
    return () => editor?.destroy();
  }, [editor]);

  if (!mounted || !editor) return null;

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-900">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={editor.isActive("bold") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </Button>
        <Button
          variant={editor.isActive("italic") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </Button>
        <Button variant="outline" onClick={insertIframe}>
          iframe 삽입
        </Button>
        <Button
          variant={editor.isActive("underline") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          U
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </Button>
        <Button
          variant="outline"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          ❝
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run()
          }
        >
          표
        </Button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="ProseMirror" onDrop={onDrop} />
    </div>
  );
}
