"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { buttonI18N, placeHolderText } from "@/lib/consts/i18nConsts";
import { ControlPanelTypes } from "../price.types";

export default function ControlPanel({
  priceType,
  setPriceType,
  search,
  setSearch,
}: ControlPanelTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Tabs
        value={priceType}
        onValueChange={setPriceType}
        className="w-full sm:w-auto"
      >
        <TabsList
          className={`${
            theme === "dark"
              ? "bg-slate-800 border border-slate-600"
              : "bg-white border border-gray-300"
          } w-full sm:w-auto p-1 rounded-lg shadow-sm`}
        >
          <TabsTrigger
            value="PVE"
            className={`flex-1 sm:flex-initial px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              theme === "dark"
                ? "text-slate-300 hover:text-white hover:bg-slate-700 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md"
            }`}
          >
            PVE
          </TabsTrigger>
          <TabsTrigger
            value="PVP"
            className={`flex-1 sm:flex-initial px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              theme === "dark"
                ? "text-slate-300 hover:text-white hover:bg-slate-700 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=active]:shadow-md"
            }`}
          >
            PVP
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="flex gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-80">
          <Search
            className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${
              theme === "dark" ? "text-slate-400" : "text-gray-600"
            }`}
          />
          <Input
            placeholder={placeHolderText.search[localeKey]}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`pl-10 ${
              theme === "dark"
                ? "bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder:text-gray-500"
            }`}
          />
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">
          {buttonI18N.search[localeKey]}
        </Button>
      </div>
    </div>
  );
}
