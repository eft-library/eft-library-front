"use client";

import { FlameIcon as Fire } from "lucide-react";
import type { HighlightCardTypes } from "../types/HighlightsCard.types";

export default function HighlightCardList({
  sectionTitle,
  posts,
}: HighlightCardTypes) {
  return (
    <div className="rounded-lg p-6 border bg-white border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700/50">
      <div className="flex items-center space-x-2 mb-4">
        <Fire className="w-5 h-5 text-orange-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {sectionTitle}
        </h2>
      </div>
      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={`main-post-${post.id}`}
            className="text-sm cursor-pointer text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400 transition-colors"
          >
            {post.title}
          </div>
        ))}
      </div>
    </div>
  );
}
