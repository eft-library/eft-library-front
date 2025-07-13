import Link from "next/link";
import type { ItemTableRowWrapperMTypes } from "./item-table.types";

export default function ItemTableRowWrapperM({
  urlMapping,
  children,
}: ItemTableRowWrapperMTypes) {
  return (
    <Link target="_blank" href={`/item/${urlMapping}`}>
      <div
        className={`rounded-lg border p-4 bg-white border-gray-200 hover:bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-600`}
      >
        {children}
      </div>
    </Link>
  );
}
