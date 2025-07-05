"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import type { NewsViewTypes } from "./NewsView.types";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";

export default function NewsView({ news }: NewsViewTypes) {
  const { theme } = useTheme();
  const locale = useLocale();
  const router = useRouter();
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
            <span className="text-lg">"⭐"</span>
            <h3
              className={`text-sm font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              추천 기능
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
                - {item[localeKey]}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
