"use client";

import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import type { MinigameTabTypes } from "../minigame-types";
import { minigameI18N } from "@/lib/consts/i18nConsts";

export default function MinigameTab({
  tabState,
  setTabState,
}: MinigameTabTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Tabs
        value={tabState}
        onValueChange={setTabState}
        className="w-full sm:w-auto"
      >
        <TabsList className="w-full sm:w-auto p-1 rounded-lg shadow-sm bg-card border border-gray-200 dark:border-gray-700/50">
          <TabsTrigger
            value="RNG-ITEM"
            className="flex-1 sm:flex-initial px-6 py-2 rounded-md font-semibold transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700 dark:data-[state=active]:bg-orange-500 dark:data-[state=active]:text-white dark:data-[state=active]:shadow-md"
          >
            {minigameI18N.rngItem[localeKey]}
          </TabsTrigger>
          <TabsTrigger
            value="TO_BE"
            className="flex-1 sm:flex-initial px-6 py-2 rounded-md font-semibold transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700 dark:data-[state=active]:bg-orange-500 dark:data-[state=active]:text-white dark:data-[state=active]:shadow-md"
          >
            TO BE Continued
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
