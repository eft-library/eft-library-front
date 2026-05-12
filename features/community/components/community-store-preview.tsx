"use client";

import { useAppStore } from "@/components/providers/app-store-provider";

export function CommunityStorePreview() {
  const activeCategory = useAppStore((state) => state.activeCommunityCategory);

  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-900/30 dark:text-gray-300">
      현재 store 기준 community category:{" "}
      <span className="font-semibold text-orange-500">{activeCategory}</span>
    </div>
  );
}
