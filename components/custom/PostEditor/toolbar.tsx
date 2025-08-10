import React, { useRef } from "react";
import { ToolbarTypes } from "./post-editor.types";
import ColorPalette from "./color-palette";
import IframeInsertDialog from "./iframe-insert-dialog";

export default function Toolbar({ editor, handleFileChange }: ToolbarTypes) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editor) return null;

  const buttons = [
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
    {
      name: "H1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      name: "H2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
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
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg shadow-inner">
      {buttons.map(({ name, action, isActive }, idx) => (
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
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* 툴바 버튼 */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        이미지
      </button>
      <IframeInsertDialog editor={editor} />
      <ColorPalette editor={editor} />
    </div>
  );
}
