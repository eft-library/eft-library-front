"use client";

import { useTheme } from "next-themes";
import type { NewsViewTypes } from "./NewsView.types";
import Link from "next/link";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { newsI18N } from "@/lib/consts/i18nConsts";

export default function NewsView({ news }: NewsViewTypes) {
  const { theme } = useTheme();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div
          className={`rounded-lg p-4 border ${
            theme === "dark"
              ? "bg-gray-800/30 border-gray-700/50"
              : "bg-white border-gray-200 shadow-sm"
          }`}
        >
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg">⭐</span>
            <h3
              className={`text-sm font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {newsI18N.recommendationFeature[localeKey]}
            </h3>
          </div>
          <div className="space-y-1">
            {news.json_value.recommend.map((item, recommend_index) => (
              <div
                key={`recommend-${item.en}-${recommend_index}`}
                className={`text-xs cursor-pointer transition-colors ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-orange-400"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                <Link
                  target="_blank"
                  key={item.en}
                  rel="noopener noreferrer"
                  href={item.link}
                >
                  - {item[localeKey]}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`rounded-lg p-4 border ${
            theme === "dark"
              ? "bg-gray-800/30 border-gray-700/50"
              : "bg-white border-gray-200 shadow-sm"
          }`}
        >
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg">🎯</span>
            <h3
              className={`text-sm font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {newsI18N.event[localeKey]}
            </h3>
          </div>
          <div className="space-y-1">
            {news.json_value.event.map((item, event_index) => (
              <div
                key={`event-${item.en}-${event_index}`}
                className={`text-xs cursor-pointer transition-colors ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-orange-400"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                <Link
                  target="_blank"
                  key={item.en}
                  rel="noopener noreferrer"
                  href={item.link}
                >
                  - {item[localeKey]}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`rounded-lg p-4 border ${
            theme === "dark"
              ? "bg-gray-800/30 border-gray-700/50"
              : "bg-white border-gray-200 shadow-sm"
          }`}
        >
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg">📅</span>
            <h3
              className={`text-sm font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {newsI18N.comingSoon[localeKey]}
            </h3>
          </div>
          <div className="space-y-1">
            {news.json_value.next_update.map((item, next_update_index) => (
              <div
                key={`next-update-${item.en}-${next_update_index}`}
                className={`text-xs cursor-pointer transition-colors ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-orange-400"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                - {item[localeKey]}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`rounded-lg p-4 border ${
            theme === "dark"
              ? "bg-gray-800/30 border-gray-700/50"
              : "bg-white border-gray-200 shadow-sm"
          }`}
        >
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg">📋</span>
            <h3
              className={`text-sm font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {newsI18N.patchNote[localeKey]}
            </h3>
          </div>
          <div className="space-y-1">
            {news.json_value.patch.map((item, patch_index) => (
              <div
                key={`patch-${item.en}-${patch_index}`}
                className={`text-xs cursor-pointer transition-colors ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-orange-400"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                <Link
                  target="_blank"
                  key={item.en}
                  rel="noopener noreferrer"
                  href={item.link}
                >
                  - {item[localeKey]}
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`rounded-lg p-4 border ${
            theme === "dark"
              ? "bg-gray-800/30 border-gray-700/50"
              : "bg-white border-gray-200 shadow-sm"
          }`}
        >
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg">🎮</span>
            <h3
              className={`text-sm font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {newsI18N.tarkovInfo[localeKey]}
            </h3>
          </div>
          <div className="space-y-1">
            {news.json_value.tarkov_info.map((item, tarkov_info_index) => (
              <div
                key={`tarkov-info-${item.en}-${tarkov_info_index}`}
                className={`text-xs cursor-pointer transition-colors ${
                  theme === "dark"
                    ? "text-gray-300 hover:text-orange-400"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                <Link
                  target="_blank"
                  key={item.en}
                  rel="noopener noreferrer"
                  href={item.link}
                >
                  - {item[localeKey]}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
