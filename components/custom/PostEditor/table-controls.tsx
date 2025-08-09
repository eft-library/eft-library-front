import React from "react";
import { TableControlsTypes } from "./post-editor.types";

export default function TableControls({
  editor,
  inTable,
  deleteRowSmart,
}: TableControlsTypes) {
  if (!editor) return null;

  const controls = [
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
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
      {controls.map(({ label, onClick }, idx) => (
        <button
          key={idx}
          onClick={onClick}
          disabled={!inTable}
          className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 text-sm
          bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300
          hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed
          transition-colors duration-150"
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
