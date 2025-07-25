"use client";

import type { AmmoViewTypes } from "./ammo.types";
import AmmoTable from "./AmmoTable/ammo-table";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N, placeHolderText } from "@/lib/consts/i18nConsts";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function AmmoView({ ammoList }: AmmoViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [word, setWord] = useState<string>("");
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 sm:py-8 space-y-6 sm:space-y-8 max-w-6xl">
        <div className="text-center mb-6 md:mb-8">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              {itemI18N.ammo.title[localeKey]}
            </h1>
          </div>

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
              className={`pl-10 rounded-lg dark:bg-[#1a1c20] dark:border-gray-700 dark:text-white dark:placeholder-gray-400 bg-white border-gray-300 text-gray-900 placeholder-gray-500`}
            />
          </div>
        </div>
        <AmmoTable ammoList={ammoList} word={word} />
      </div>
    </div>
  );
}
