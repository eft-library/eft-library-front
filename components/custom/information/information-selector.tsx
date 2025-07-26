"use client";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { newsI18N } from "@/lib/consts/i18nConsts";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function InformationSelector() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const pathname = usePathname();

  return (
    <div className="mb-6 flex justify-center">
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg overflow-x-auto">
        <Link href="/notice?id=1">
          <button
            className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
              pathname.split("/").filter(Boolean)[0] === "notice"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {newsI18N.notice[localeKey]}
          </button>
        </Link>
        <Link href="/patch-notes?id=1">
          <button
            className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
              pathname.split("/").filter(Boolean)[0] === "patch-notes"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {newsI18N.patchNote[localeKey]}
          </button>
        </Link>
        <Link href="/event?id=1">
          <button
            className={`flex-shrink-0 px-4 py-2 text-sm font-semibold rounded-md transition-colors cursor-pointer ${
              pathname.split("/").filter(Boolean)[0] === "event"
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {newsI18N.event[localeKey]}
          </button>
        </Link>
      </div>
    </div>
  );
}
