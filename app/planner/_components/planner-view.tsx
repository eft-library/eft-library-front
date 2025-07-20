"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { planner18N } from "@/lib/consts/i18nConsts";
import { useTheme } from "next-themes";
import type { PlannerViewTypes } from "./planner.types";
import SearchFilter from "./SearchFilter/search-filter";
import { Quest } from "@/app/quest/_components/quest.types";
import { useState } from "react";
import PreviewSelect from "./PreviewSelect/preview-select";

export default function PlannerView({ userQuestList }: PlannerViewTypes) {
  const { theme } = useTheme();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [selectedItems, setSelectedItems] = useState<Quest[]>([]);

  const removeSelected = (quest: Quest) => {
    setSelectedItems(
      selectedItems.filter((originQuest) => originQuest.id !== quest.id)
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "dark bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
            <div className="order-2 sm:order-1"></div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center order-1 sm:order-2">
              {planner18N.title[localeKey]}
            </h1>
          </div>
        </div>

        {/* 퀘스트 검색 */}
        <SearchFilter
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />

        {/* 선택된 퀘스트 미리보기 */}
        <PreviewSelect
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          removeSelected={removeSelected}
          updateQuest={() => {}}
        />

        {/* 퀘스트 진행 목록 */}

        {/* 빈 상태 */}
      </div>
    </div>
  );
}
