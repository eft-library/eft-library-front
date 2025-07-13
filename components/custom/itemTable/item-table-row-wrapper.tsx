import Link from "next/link";
import type { ItemTableRowWrapperTypes } from "./item-table.types";

export default function ItemTableRowWrapper({
  urlMapping,
  dataLength,
  dataIndex,
  children,
}: ItemTableRowWrapperTypes) {
  return (
    <Link target="_blank" href={`/item/${urlMapping}`}>
      <div
        className={`dark:border-slate-700 dark:hover:bg-slate-600 border-gray-200 hover:bg-gray-50 grid grid-cols-7 gap-4 p-4 border-b transition-colors
             ${dataIndex === dataLength - 1 ? "border-b-0" : ""}`}
      >
        {children}
      </div>
    </Link>
  );
}
