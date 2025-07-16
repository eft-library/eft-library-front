"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TraderTabTypes } from "../roadmap.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function TraderTab({
  npcList,
  setTabState,
  tabState,
}: TraderTabTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="w-full">
      <Tabs value={tabState} onValueChange={setTabState} className="w-full">
        <TabsList className="w-full grid grid-cols-6 lg:grid-cols-12 gap-2 h-auto p-2 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm">
          <TabsTrigger
            value={"all"}
            className="
              relative text-xs font-medium px-3 py-2.5 rounded-lg
              transition-all duration-200 ease-in-out
              text-slate-600 dark:text-slate-400
              hover:text-slate-900 dark:hover:text-slate-100
              hover:bg-white/60 dark:hover:bg-slate-700/60
              data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700
              data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100
              data-[state=active]:shadow-md dark:data-[state=active]:shadow-slate-900/20
              data-[state=active]:border data-[state=active]:border-slate-200 dark:data-[state=active]:border-slate-600
              before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r 
              before:from-blue-500/0 before:to-purple-500/0
              data-[state=active]:before:from-blue-500/10 data-[state=active]:before:to-purple-500/10
              dark:data-[state=active]:before:from-blue-400/10 dark:data-[state=active]:before:to-purple-400/10
            "
          >
            <span className="relative z-10">ALL</span>
          </TabsTrigger>

          {npcList.map((trader) => (
            <TabsTrigger
              key={trader.id}
              value={trader.id}
              className="
                relative text-xs font-medium px-3 py-2.5 rounded-lg
                transition-all duration-200 ease-in-out
                text-slate-600 dark:text-slate-400
                hover:text-slate-900 dark:hover:text-slate-100
                hover:bg-white/60 dark:hover:bg-slate-700/60
                hover:scale-105 hover:shadow-sm
                data-[state=active]:bg-white dark:data-[state=active]:bg-slate-700
                data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100
                data-[state=active]:shadow-md dark:data-[state=active]:shadow-slate-900/20
                data-[state=active]:border data-[state=active]:border-slate-200 dark:data-[state=active]:border-slate-600
                data-[state=active]:scale-105
                before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r 
                before:from-blue-500/0 before:to-purple-500/0
                data-[state=active]:before:from-blue-500/10 data-[state=active]:before:to-purple-500/10
                dark:data-[state=active]:before:from-blue-400/10 dark:data-[state=active]:before:to-purple-400/10
                cursor-pointer
              "
            >
              <span className="relative z-10 truncate">
                {trader.name[localeKey]}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
