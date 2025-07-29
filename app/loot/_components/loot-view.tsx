"use client";

import type { LootViewTypes } from "./loot.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N, placeHolderText } from "@/lib/consts/i18nConsts";
import LootTable from "./LootTable/loot-table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";

export default function LootView({ lootList }: LootViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [word, setWord] = useState<string>("");

  return (
    <ViewWrapper>
      <div className="container mx-auto px-4 py-4 sm:py-8 space-y-6 sm:space-y-8 max-w-6xl">
        <div className="text-center mb-4">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2 dark:text-white text-gray-900">
            {itemI18N.loot.title[localeKey]}
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-6 md:mb-8">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 dark:text-gray-400 text-gray-500`}
            />
            <Input
              type="text"
              placeholder={placeHolderText.search[localeKey]}
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className={`pl-10 rounded-lg dark:card dark:border-slate-700 dark:text-white dark:placeholder-gray-400 bg-white border-gray-300 text-gray-900 placeholder-gray-500`}
            />
          </div>
        </div>
        <LootTable lootList={lootList} word={word} />
      </div>
    </ViewWrapper>
  );
}
