"use client";

import type { ArmBandListTypes } from "./arm-band.types";
import ArmBandTable from "./ArmBandTable/arm-band-table";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";
import ArmBandCardM from "./ArmBandCardM/arm-band-card-m";

export default function ArmBandView({ armBandList }: ArmBandListTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 sm:py-8 space-y-6 sm:space-y-8 max-w-6xl">
        <div className="text-center mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">
              {itemI18N.armBand.title[localeKey]}
            </h1>
          </div>

          {/* Search Bar */}
          {/* <div className="relative max-w-md mx-auto mb-6 md:mb-8">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <Input
              type="text"
              placeholder="아이템 혹은 스킬을 검색하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 rounded-lg ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
          </div> */}
        </div>
        <ArmBandTable armBandList={armBandList} />
        <ArmBandCardM armBandList={armBandList} />
      </div>
    </div>
  );
}
