import type { ItemTableHeaderTypes } from "./item-table.types";

export default function ItemTableHeader({
  columns,
  gridColSpan,
}: ItemTableHeaderTypes) {
  return (
    <div
      className={`dark:bg-slate-700 border-slate-600 bg-gray-100 border-gray-200 grid grid-cols-${gridColSpan} gap-4 p-4 border-b font-semibold`}
    >
      {columns.map((col) => (
        <div
          key={col.key}
          className={`col-span-${col.colSpan} text-${col.align || "center"}`}
        >
          {col.colText}
        </div>
      ))}
    </div>
  );
}
