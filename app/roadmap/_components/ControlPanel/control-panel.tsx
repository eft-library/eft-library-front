"use client";

import { Button } from "@/components/ui/button";
import { Search, CheckSquare, Square, Save, Eye } from "lucide-react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { roadmapI18N } from "@/lib/consts/i18nConsts";
import { Input } from "@/components/ui/input";
import type { ControlPanelTypes } from "../roadmap.types";

export default function ControlPanel({
  searchQuery,
  setSearchQuery,
  handleSearch,
  checkAllNodes,
  uncheckAllNodes,
  onClickSave,
  onClickKappaFilter,
  onlyKappa,
}: ControlPanelTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="flex flex-col sm:flex-row justify-end items-end sm:items-center gap-4 w-full p-4 bg-gradient-to-r from-slate-50/50 to-slate-100/50 dark:from-slate-900/50 dark:to-slate-800/50 rounded-xl border border-slate-200/60 dark:border-slate-700/60 backdrop-blur-sm">
      {/* 검색바 */}
      <div className="relative w-full sm:w-80 group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm"></div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 h-4 w-4 transition-colors duration-200 group-focus-within:text-blue-500 dark:group-focus-within:text-blue-400" />
          <Input
            placeholder={roadmapI18N.placeHolder[localeKey]}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="
              pl-10 w-full h-10
              bg-white/80 dark:bg-slate-800/80
              border-slate-200 dark:border-slate-700
              focus:border-blue-500 dark:focus:border-blue-400
              focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20
              placeholder:text-slate-400 dark:placeholder:text-slate-500
              text-slate-900 dark:text-slate-100
              transition-all duration-200
              backdrop-blur-sm
            "
          />
        </div>
      </div>

      {/* 액션 버튼들 */}
      <div className="flex flex-wrap gap-2 justify-end w-full sm:w-auto">
        {/* Select All Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={checkAllNodes}
          className="
            flex items-center gap-2 h-10 px-4
            bg-white/60 dark:bg-slate-800/60
            border-slate-200 dark:border-slate-700
            text-slate-700 dark:text-slate-300
            hover:bg-green-50 dark:hover:bg-green-900/20
            hover:border-green-300 dark:hover:border-green-600
            hover:text-green-700 dark:hover:text-green-400
            transition-all duration-200
            backdrop-blur-sm
            group
          "
        >
          <CheckSquare className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          <span className="font-medium">
            {roadmapI18N.selectAll[localeKey]}
          </span>
        </Button>

        {/* Unselect All Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={uncheckAllNodes}
          className="
            flex items-center gap-2 h-10 px-4
            bg-white/60 dark:bg-slate-800/60
            border-slate-200 dark:border-slate-700
            text-slate-700 dark:text-slate-300
            hover:bg-orange-50 dark:hover:bg-orange-900/20
            hover:border-orange-300 dark:hover:border-orange-600
            hover:text-orange-700 dark:hover:text-orange-400
            transition-all duration-200
            backdrop-blur-sm
            group
          "
        >
          <Square className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          <span className="font-medium">
            {roadmapI18N.unSelectAll[localeKey]}
          </span>
        </Button>

        {/* Save Button - Primary */}
        <Button
          size="sm"
          onClick={() => onClickSave()}
          className="
            flex items-center gap-2 h-10 px-4
            bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600
            hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700
            text-white
            border-0
            shadow-md hover:shadow-lg
            transition-all duration-200
            group
          "
        >
          <Save className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          <span className="font-medium">{roadmapI18N.save[localeKey]}</span>
        </Button>

        {/* Kappa Filter Toggle Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onClickKappaFilter()}
          className={`
            flex items-center gap-2 h-10 px-4
            transition-all duration-200
            backdrop-blur-sm
            group
            ${
              onlyKappa
                ? "bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-600 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30"
                : "bg-white/60 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-600 hover:text-purple-700 dark:hover:text-purple-400"
            }
          `}
        >
          <Eye
            className={`h-4 w-4 transition-all duration-200 group-hover:scale-110 ${
              onlyKappa ? "text-purple-600 dark:text-purple-400" : ""
            }`}
          />
          <span className="font-medium">
            {onlyKappa
              ? roadmapI18N.viewAllQuest[localeKey]
              : roadmapI18N.viewKappaQuest[localeKey]}
          </span>
        </Button>
      </div>
    </div>
  );
}
