"use client";
import { useTheme } from "next-themes";
import type { NewsCardTypes } from "../types/NewsCard.types";

export default function NewsCard({ section }: NewsCardTypes) {
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-lg p-4 border ${
        theme === "dark"
          ? "bg-gray-800/30 border-gray-700/50"
          : "bg-white border-gray-200 shadow-sm"
      }`}
    >
      <div className="flex items-center space-x-2 mb-3">
        <span className="text-lg">{section.icon}</span>
        <h3
          className={`text-sm font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {section.title}
        </h3>
      </div>
      <div className="space-y-1">
        {section.items.map((item) => (
          <div
            key={item.id}
            className={`text-xs cursor-pointer transition-colors ${
              theme === "dark"
                ? "text-gray-300 hover:text-orange-400"
                : "text-gray-600 hover:text-orange-500"
            }`}
          >
            - {item.title}
          </div>
        ))}
      </div>
    </div>
  );
}
