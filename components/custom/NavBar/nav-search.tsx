"use client";

import Downshift from "downshift";
import { Search } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { NavSearchTypes, SearchData } from "./nav-bar.types";
import Highlighter from "react-highlight-words";

export default function NavSearch({ searchList }: NavSearchTypes) {
  const [inputValue, setInputValue] = useState("");
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const onClickItem = (item: SearchData) => {
    setInputValue("");
    router.push(item.link);
  };
  console.log(searchList);
  return (
    <Downshift
      inputValue={inputValue}
      onInputValueChange={(value) => setInputValue(value)}
      onChange={(selection) => onClickItem(selection)}
      itemToString={(item) => (item ? item.value : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getRootProps,
        getMenuProps,
        highlightedIndex,
        isOpen,
      }) => (
        <div className="relative w-full" ref={menuRef} {...getRootProps()}>
          {/* 아이콘 + 입력창 */}
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            {...getInputProps({
              placeholder: "검색...",
              className: cn(
                "w-full pl-10 h-9 focus:ring-orange-400 dark:bg-[#36393f] dark:border-[#36393f] dark:text-white dark:placeholder-gray-400 dark:focus:border-orange-400 bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-orange-500",
              ),
            })}
          />

          {/* 자동완성 드롭다운 */}
          {isOpen && (
            <div
              {...getMenuProps()}
              className="absolute left-0 z-20 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white shadow-lg border dark:bg-[#1e2124]"
            >
              {searchList
                .filter((item) => item.lang === localeKey)
                .filter((item) =>
                  inputValue
                    ? item.value
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    : true,
                )
                .map((item, index) => (
                  <div
                    key={`${item.lang}-${item.value}-${item.page_value}`}
                    {...getItemProps({
                      item,
                      index,
                      className: cn(
                        "cursor-pointer px-4 py-2 text-sm font-medium",
                        highlightedIndex === index
                          ? "bg-gray-200 dark:bg-slate-600"
                          : "bg-white dark:bg-[#1e2124] text-gray-900 dark:text-white",
                      ),
                    })}
                  >
                    <Highlighter
                      highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                      searchWords={[inputValue]}
                      autoEscape
                      textToHighlight={item.value}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </Downshift>
  );
}
