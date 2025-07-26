import { information18N } from "@/lib/consts/i18nConsts";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { Pin } from "lucide-react";
import { useTheme } from "next-themes";
import type { PinnedNotice } from "../news-view.types";
import Link from "next/link";

export default function PinnedNotice({ notice }: PinnedNotice) {
  const { theme } = useTheme();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div
      className={`rounded-lg p-6 border ${
        theme === "dark"
          ? "bg-gray-800/30 border-gray-700/50"
          : "bg-white border-gray-200 shadow-sm"
      }`}
    >
      <div className="flex items-center space-x-2 mb-4">
        <Pin className="w-5 h-5 text-orange-400" />
        <h2
          className={`text-lg font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {information18N.notice.title[localeKey]}
        </h2>
      </div>
      <div className="space-y-3">
        {notice.json_value.notice.map((content, index) => (
          <div
            key={`pinned-notice-${index}`}
            className={`text-sm cursor-pointer transition-colors ${
              theme === "dark"
                ? "text-gray-300 hover:text-orange-400"
                : "text-gray-600 hover:text-orange-500"
            }`}
          >
            <Link href={content.link}>{content[localeKey]}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
