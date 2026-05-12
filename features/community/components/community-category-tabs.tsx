"use client";

import Link from "next/link";

import { useAppStore } from "@/components/providers/app-store-provider";
import {
  communityCategories,
} from "@/lib/constants/community-categories";

type CommunityCategoryId = (typeof communityCategories)[number]["id"];

export function CommunityCategoryTabs() {
  const activeCategory = useAppStore((state) => state.activeCommunityCategory);
  const setActiveCategory = useAppStore(
    (state) => state.setActiveCommunityCategory,
  );
  const locale = useAppStore((state) => state.uiLocale);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
      <div className="flex flex-wrap gap-1">
        {communityCategories.map((category) => {
          const isActive = activeCategory === category.id;

          return (
            <Link
              key={category.id}
              href={`/community/${category.id}`}
              onClick={() =>
                setActiveCategory(category.id as CommunityCategoryId)
              }
              className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-orange-500 dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-orange-400"
              }`}
            >
              {category.labels[locale]}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
