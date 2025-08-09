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
import { TableKit } from "@tiptap/extension-table";
import { useState, useEffect, useCallback } from "react";
import { PostEditorTypes } from "./post-editor.types";
import { COMMUNITY_ENDPOINTS } from "@/lib/config/endpoint";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import ColorPalette from "./color-palette";

export default function PostEditor({
  initialContent = "",
  onChange,
}: PostEditorTypes) {
  const lowlight = createLowlight(common);
  const [mounted, setMounted] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        underline: false,
      }),
      TextStyle,
      Color,
      Underline,
      TipTapIframe,
      Highlight,
      Link.configure({ openOnClick: false }),
      Image,
      Youtube.configure({ controls: true }),
      CodeBlockLowlight.configure({ lowlight }),
      TableKit,
      ImageResize,
    ],
    content: initialContent,
    immediatelyRender: false,
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

    const iframeMatch = raw.match(/<iframe[^>]+>/i);

    if (iframeMatch) {
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

  // **수정된 안전한 행 삭제 함수**
  const deleteRowSmart = () => {
    if (!editor) return;

    const { state } = editor;
    const { selection } = state;
    const $from = selection.$from;

    // 위로 올라가면서 table 노드를 찾는다 (depth 범위 내)
    let tableNode: any | null = null;
    for (let d = $from.depth; d > 0; d--) {
      const node = $from.node(d);
      if (node && node.type && node.type.name === "table") {
        tableNode = node;
        break;
      }
    }

    if (!tableNode) {
      // 테이블이 아닌 위치에서 호출되면 아무것도 안 함
      console.warn("표 노드를 찾을 수 없습니다. 커서가 표 내부에 있나요?");
      return;
    }

    const rowCount = tableNode.childCount;

    if (rowCount <= 1) {
      // 마지막 행이면 표 자체 삭제
      editor.chain().focus().deleteTable().run();
    } else {
      editor.chain().focus().deleteRow().run();
    }
  };

  useEffect(() => {
    setMounted(true);
    return () => editor?.destroy();
  }, [editor]);

  if (!mounted || !editor) return null;

  const inTable = editor.isActive("table");

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-900 shadow-lg">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-inner">
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
          { name: "iframe", action: insertIframe, isActive: false },
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
            name: "•",
            action: () => editor.chain().focus().toggleBulletList().run(),
            isActive: editor.isActive("bulletList"),
          },
          {
            name: "1.",
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
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150
          ${
            isActive
              ? "bg-blue-600 text-white shadow hover:bg-blue-700"
              : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
          }
        `}
            type="button"
          >
            {name}
          </button>
        ))}
        <ColorPalette editor={editor} />
      </div>

      {/* Table Controls */}
      <div className="flex flex-wrap gap-2 mb-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
        {[
          {
            label: "행 위",
            onClick: () => editor.chain().focus().addRowBefore().run(),
          },
          {
            label: "행 아래",
            onClick: () => editor.chain().focus().addRowAfter().run(),
          },
          { label: "행 삭제", onClick: deleteRowSmart },
          {
            label: "열 왼쪽",
            onClick: () => editor.chain().focus().addColumnBefore().run(),
          },
          {
            label: "열 오른쪽",
            onClick: () => editor.chain().focus().addColumnAfter().run(),
          },
          {
            label: "열 삭제",
            onClick: () => editor.chain().focus().deleteColumn().run(),
          },
          {
            label: "표 삭제",
            onClick: () => editor.chain().focus().deleteTable().run(),
          },
        ].map(({ label, onClick }, idx) => (
          <button
            key={idx}
            onClick={onClick}
            disabled={!inTable}
            className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 text-sm
                   bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300
                   hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed
                   transition-colors duration-150"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="ProseMirror min-h-[300px] max-h-[600px] overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onDrop={onDrop}
      />
    </div>
  );
}
