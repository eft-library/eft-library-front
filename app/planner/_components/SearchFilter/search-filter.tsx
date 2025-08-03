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
  const [input, setInput] = useState("");

  useEffect(() => {
    const getQuestList = async () => {
      const data = await requestData(API_ENDPOINTS.GET_ALL_QUEST);
      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch quest data:",
          data?.msg || "Unknown error"
        );
        return null;
      }
      setQuestList(data.data);
    };
    getQuestList();
  }, []);

  const getFilteredQuests = (inputValue: string) => {
    const lower = inputValue.toLowerCase();

    return questList.filter(
      (quest) =>
        !selectedItems.some((selected) => selected.id === quest.id) &&
        (quest.name[localeKey].toLowerCase().includes(lower) ||
          quest.npc_name[localeKey].toLowerCase().includes(lower))
    );
  };

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    inputValue,
    reset,
  } = useCombobox<Quest>({
    items: getFilteredQuests(input), // ✅ 외부 상태 사용
    inputValue: input, // ✅ 직접 컨트롤
    onInputValueChange: ({ inputValue }) => {
      setInput(inputValue ?? "");
    },
    itemToString: (item) => (item ? item.name[localeKey] : ""),
    onSelectedItemChange: ({ selectedItem }) => {
      if (
        selectedItem &&
        !selectedItems.find((item) => item.id === selectedItem.id)
      ) {
        setSelectedItems([...selectedItems, selectedItem]);
        setInput(""); // ✅ inputValue 상태 초기화
      }

      reset(); // ✅ focus 상태 초기화
    },
  });

  const filteredQuests = getFilteredQuests(inputValue);

  return (
    <div className="mb-4 mt-4">
      {/* Combobox Container */}
      <div className="relative">
        <label {...getLabelProps()} className="sr-only">
          {planner18N.selectQuest[localeKey]}
        </label>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 z-10" />
          <Input
            {...getInputProps()}
            type="text"
            placeholder={planner18N.selectQuest[localeKey]}
            className="pl-10 h-12 text-lg rounded-2xl border-2 focus:border-orange-500 dark:bg-gray-800 dark:border-gray-600 text-white"
          />
        </div>

        {/* Dropdown Menu */}
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
