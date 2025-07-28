"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Search } from "lucide-react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { buttonI18N, placeHolderText } from "@/lib/consts/i18nConsts";
import { ControlPanelTypes } from "../price.types";

export default function ControlPanel({
  priceType,
  setPriceType,
  search,
  setSearch,
  setFetchWord,
}: ControlPanelTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Tabs
        value={priceType}
        onValueChange={setPriceType}
        className="w-full sm:w-auto"
      >
        <TabsList className="w-full sm:w-auto p-1 rounded-lg shadow-sm bg-white border border-gray-200 dark:bg-gray-800/30 dark:border-gray-700/50">
          <TabsTrigger
            value="PVP"
            className="flex-1 sm:flex-initial px-6 py-2 rounded-md font-semibold transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700 dark:data-[state=active]:bg-orange-500 dark:data-[state=active]:text-white dark:data-[state=active]:shadow-md"
          >
            PVP
          </TabsTrigger>
          <TabsTrigger
            value="PVE"
            className="flex-1 sm:flex-initial px-6 py-2 rounded-md font-semibold transition-all duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-700 dark:data-[state=active]:bg-orange-500 dark:data-[state=active]:text-white dark:data-[state=active]:shadow-md"
          >
            PVE
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600 dark:text-slate-400" />
          <Input
            placeholder={placeHolderText.search[localeKey]}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-400"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setFetchWord(search);
              }
            }}
          />
        </div>
        <Button
          className="bg-orange-500 hover:bg-orange-600 text-white px-6"
          onClick={() => setFetchWord(search)}
        >
          {buttonI18N.search[localeKey]}
        </Button>
      </div>
    </div>
  );
}
