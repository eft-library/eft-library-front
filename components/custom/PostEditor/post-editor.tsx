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
      StarterKit.configure({ codeBlock: false, underline: false }),
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
    const raw = prompt("iframe 태그 전체 또는 URL을 입력하세요");

    if (!raw || !editor) return;

    // 1. iframe 전체 태그 형태인지 체크
    const iframeMatch = raw.match(/<iframe[^>]+>/i);

    if (iframeMatch) {
      // iframe 태그에서 속성 파싱
      const parser = new DOMParser();
      const doc = parser.parseFromString(raw, "text/html");
      const iframeEl = doc.querySelector("iframe");

      if (iframeEl) {
        const attrs: Record<string, string> = {};
        for (const attr of iframeEl.attributes) {
          attrs[attr.name] = attr.value;
        }

        editor
          .chain()
          .focus()
          .insertContent({
            type: "iframe",
            attrs,
          })
          .run();

        return;
      }
    }

    // 2. 그냥 URL인 경우 기본 속성으로 삽입
    editor
      .chain()
      .focus()
      .insertContent({
        type: "iframe",
        attrs: {
          src: raw,
          width: "800",
          height: "450",
          frameborder: "0",
          allow: "autoplay; clipboard-write; web-share",
          allowfullscreen: "true",
          title: "Iframe",
        },
      })
      .run();
  };

  useEffect(() => {
    setMounted(true);
    return () => editor?.destroy();
  }, [editor]);

  if (!mounted || !editor) return null;

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-900 shadow-md">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 mb-4 bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow-inner">
        {/** 버튼 공통 스타일 */}
        {[
          {
            name: "B",
            action: () => editor.chain().focus().toggleBold().run(),
            isActive: editor.isActive("bold"),
          },
          {
            name: "I",
            action: () => editor.chain().focus().toggleItalic().run(),
            isActive: editor.isActive("italic"),
          },
          {
            name: "U",
            action: () => editor.chain().focus().toggleUnderline().run(),
            isActive: editor.isActive("underline"),
          },
          { name: "iframe 삽입", action: insertIframe, isActive: false },
          {
            name: "H1",
            action: () =>
              editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: editor.isActive("heading", { level: 1 }),
          },
          {
            name: "H2",
            action: () =>
              editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: editor.isActive("heading", { level: 2 }),
          },
          {
            name: "• List",
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive("bulletList"),
          },
          {
            name: "1. List",
            action: () => editor.chain().focus().toggleOrderedList().run(),
            isActive: editor.isActive("orderedList"),
          },
          {
            name: "❝",
            action: () => editor.chain().focus().toggleBlockquote().run(),
            isActive: editor.isActive("blockquote"),
          },
          {
            name: "표",
            action: () =>
              editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run(),
            isActive: false,
          },
        ].map(({ name, action, isActive }, idx) => (
          <button
            key={idx}
            onClick={action}
            className={`px-3 py-1.5 rounded-md text-sm font-semibold transition-colors
          ${
            isActive
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          }
          focus:outline-none focus:ring-2 focus:ring-blue-500
        `}
            type="button"
          >
            {name}
          </button>
        ))}
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="ProseMirror min-h-[300px] max-h-[600px] overflow-auto"
        onDrop={onDrop}
      />
    </div>
  );
}
