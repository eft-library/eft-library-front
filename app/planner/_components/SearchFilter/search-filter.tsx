"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { planner18N } from "@/lib/consts/i18nConsts";
import { Search } from "lucide-react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import type { Quest } from "@/app/quest/_components/quest.types";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    const getQuestList = async () => {
      const data = await requestData(API_ENDPOINTS.GET_ALL_QUEST);
      if (data?.status === 200) {
        setQuestList(data.data);
      }
    };
    getQuestList();
  }, []);

  const getFilteredQuests = (keyword: string) => {
    const lower = keyword.toLowerCase();

    return questList.filter(
      (quest) =>
        !selectedItems.some((s) => s.id === quest.id) &&
        (quest.name[localeKey].toLowerCase().includes(lower) ||
          quest.npc_name[localeKey].toLowerCase().includes(lower))
    );
  };

  const {
    isOpen,
    highlightedIndex,
    getMenuProps,
    getItemProps,
    getInputProps,
    inputValue,
    setInputValue,
    selectItem,
  } = useCombobox<Quest>({
    items: getFilteredQuests(""), // 초기값

    itemToString: (item) => (item ? item.name[localeKey] : ""),

    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue ?? "");
    },

    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setSelectedItems([...selectedItems, selectedItem]); // prev 사용 X
        setInputValue("");
      }
    },
  });

  const filteredQuests = getFilteredQuests(inputValue ?? "");

  return (
    <div className="mb-4 mt-4">
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 z-10" />

          {/* 최중요: getInputProps 적용 */}
          <Input
            {...getInputProps({
              placeholder: planner18N.selectQuest[localeKey],
              className:
                "pl-10 h-12 text-lg rounded-2xl border-2 focus:border-orange-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-gray-900",
            })}
          />
        </div>

        {/* 드롭다운 영역 */}
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

          {isOpen && inputValue && filteredQuests.length === 0 && (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No quests found matching
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
