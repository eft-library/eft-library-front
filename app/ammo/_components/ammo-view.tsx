"use client";

import type { AmmoViewTypes } from "./ammo.types";
import AmmoTable from "./AmmoTable/ammo-table";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N, placeHolderText } from "@/lib/consts/i18nConsts";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";
import AdBanner from "@/components/custom/Adsense/ad-banner";

export default function AmmoView({ ammoList }: AmmoViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [word, setWord] = useState<string>("");
  return (
    <ViewWrapper>
      <div className="container mx-auto px-4 py-4 sm:py-8 space-y-6 sm:space-y-8 max-w-7xl">
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold mb-2 dark:text-white text-gray-900">
            {itemI18N.ammo.title[localeKey]}
          </h1>
          <AdBanner
            dataAdFormat={"auto"}
            dataFullWidthResponsive={true}
            dataAdSlot="2690838054"
            maxWidth={1220}
          />
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-6 md:mb-8 mt-4">
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
    </ViewWrapper>
  );
}
