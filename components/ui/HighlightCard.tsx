"use client";

import { FlameIcon as Fire } from "lucide-react";
import { useTheme } from "@/lib/hooks/useTheme";
import type { HighlightCardTypes } from "../types/HighlightsCard.types";

export default function HighlightCardList({
  sectionTitle,
  posts,
}: HighlightCardTypes) {
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-lg p-6 border ${
        theme === "dark"
          ? "bg-gray-800/30 border-gray-700/50"
          : "bg-white border-gray-200 shadow-sm"
      }`}
    >
      <div className="flex items-center space-x-2 mb-4">
        <Fire className="w-5 h-5 text-orange-400" />
        <h2
          className={`text-lg font-semibold ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {sectionTitle}
        </h2>
      </div>
      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={`main-post-${post.id}`}
            className={`text-sm cursor-pointer transition-colors ${
              theme === "dark"
                ? "text-gray-300 hover:text-orange-400"
                : "text-gray-600 hover:text-orange-500"
            }`}
          >
            {post.title}
          </div>
        ))}
      </div>
    </div>
  );
}
