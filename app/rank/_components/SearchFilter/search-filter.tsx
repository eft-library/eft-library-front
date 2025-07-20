"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { placeHolderText } from "@/lib/consts/i18nConsts";
import { SearchFilterTypes } from "../rank.types";

export default function SearchFilter({
  searchWord,
  setSearchWord,
  setSearchRealWord,
}: SearchFilterTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex-1 relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder={placeHolderText.search[localeKey]}
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSearchRealWord(searchWord);
            }
          }}
          className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        />
      </div>
    </div>
  );
}
