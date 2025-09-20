import React from "react";
import { TableControlsTypes } from "./post-editor.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { editorI18N } from "@/lib/consts/i18nConsts";

export default function TableControls({
  editor,
  inTable,
  deleteRowSmart,
}: TableControlsTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  if (!editor) return null;

  const controls = [
    {
      label: editorI18N.rowAbove[localeKey],
      onClick: () => editor.chain().focus().addRowBefore().run(),
    },
    {
      label: editorI18N.rowBelow[localeKey],
      onClick: () => editor.chain().focus().addRowAfter().run(),
    },
    { label: editorI18N.deleteRow[localeKey], onClick: deleteRowSmart },
    {
      label: editorI18N.columnLeft[localeKey],
      onClick: () => editor.chain().focus().addColumnBefore().run(),
    },
    {
      label: editorI18N.columnRight[localeKey],
      onClick: () => editor.chain().focus().addColumnAfter().run(),
    },
    {
      label: editorI18N.deleteColumn[localeKey],
      onClick: () => editor.chain().focus().deleteColumn().run(),
    },
    {
      label: editorI18N.deleteTable[localeKey],
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
