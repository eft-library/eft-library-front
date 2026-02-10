"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { planner18N } from "@/lib/consts/i18nConsts";
import { Search } from "lucide-react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import type { Quest } from "@/app/quest/[id]/_components/quest.types";
import { useEffect, useState, useRef } from "react";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useCombobox } from "downshift";
import { SearchFilterTypes } from "../planner.types";

export default function SearchFilter({
  selectedItems,
  setSelectedItems,
}: SearchFilterTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const [questList, setQuestList] = useState<Quest[]>([]);
  const [keyword, setKeyword] = useState(""); // 내가 직접 관리하는 검색어
  const composing = useRef(false);

  useEffect(() => {
    const getQuestList = async () => {
      const data = await requestData(API_ENDPOINTS.GET_ALL_QUEST);
      if (data?.status === 200) {
        setQuestList(data.data);
      }
    };
    getQuestList();
  }, []);

  const filteredQuests = questList.filter((quest) => {
    const lower = keyword.toLowerCase();
    return (
      !selectedItems.some((s) => s.id === quest.id) &&
      (quest.name[localeKey].toLowerCase().includes(lower) ||
        quest.npc_name[localeKey].toLowerCase().includes(lower))
    );
  });

  const {
    isOpen,
    highlightedIndex,
    getMenuProps,
    getItemProps,
    selectItem,
    getInputProps,
  } = useCombobox<Quest>({
    items: filteredQuests,

    itemToString: (item) => (item ? item.name[localeKey] : ""),

    // Downshift의 inputValue는 완전히 무시 → 한글 100% 정상
    onInputValueChange: ({ inputValue }) => {
      if (!composing.current) {
        setKeyword(inputValue ?? "");
      }
    },

    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setSelectedItems((prev) => [...prev, selectedItem]);
        setKeyword("");
        selectItem(null);
      }
    },
  });

  const inputProps = getInputProps({
    placeholder: planner18N.selectQuest[localeKey],
    className:
      "pl-10 h-12 text-lg rounded-2xl border-2 focus:border-orange-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-gray-900",

    onCompositionStart: () => {
      composing.current = true;
    },
    onCompositionEnd: (e) => {
      composing.current = false;
      const value = (e.target as HTMLInputElement).value;
      setKeyword(value);
    },
  });

  return (
    <div className="mb-4 mt-4">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 z-10" />

          <Input {...inputProps} />
        </div>

        <div
          {...getMenuProps()}
          className={`absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-lg z-20 max-h-60 overflow-y-auto ${
            isOpen && filteredQuests.length > 0 ? "block" : "hidden"
          }`}
        >
          {isOpen &&
            filteredQuests.map((quest, index) => (
              <div
                key={quest.id}
                {...getItemProps({ item: quest, index })}
                className={`p-4 cursor-pointer border-b border-gray-100 dark:border-gray-600 last:border-b-0 ${
                  highlightedIndex === index
                    ? "bg-orange-50 dark:bg-orange-900/20"
                    : "hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {quest.name[localeKey]}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {quest.npc_name[localeKey]}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Lv.{quest.min_player_level}
                  </Badge>
                </div>
              </div>
            ))}

          {isOpen && keyword && filteredQuests.length === 0 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No quests found matching
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
