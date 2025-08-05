"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Youtube from "@tiptap/extension-youtube";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Shadcn UI
import { PostEditorTypes } from "./post-editor.types";

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
      Highlight,
      Link.configure({ openOnClick: false }),
      Image,
      Youtube.configure({ controls: true }),
      CodeBlockLowlight.configure({ lowlight }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialContent,
    immediatelyRender: false, // SSR 방지
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  useEffect(() => {
    setMounted(true);
    return () => editor?.destroy();
  }, [editor]);

  if (!mounted || !editor) return null;

  // 이미지 업로드 버튼
  const addImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        editor.chain().focus().setImage({ src: data.url }).run();
      }
    };
    input.click();
  };

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
        <Button variant="outline" onClick={addImage}>
          🖼
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
      <EditorContent editor={editor} className="ProseMirror" />
    </div>
  );
}
