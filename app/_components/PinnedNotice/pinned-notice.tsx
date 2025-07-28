import { information18N } from "@/lib/consts/i18nConsts";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { Pin } from "lucide-react";
import type { PinnedNotice } from "../news-view.types";
import Link from "next/link";

export default function PinnedNotice({ notice }: PinnedNotice) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="rounded-lg p-6 border bg-white border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700/50">
      <div className="flex items-center space-x-2 mb-4">
        <Pin className="w-5 h-5 text-orange-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {information18N.notice.title[localeKey]}
        </h2>
      </div>
      <div className="space-y-3">
        {notice.json_value.notice.map((content, index) => (
          <div
            key={`pinned-notice-${index}`}
            className="text-sm cursor-pointer transition-colors text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400"
          >
            {content.link ? (
              <Link href={content.link}>{content[localeKey]}</Link>
            ) : (
              content[localeKey]
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
