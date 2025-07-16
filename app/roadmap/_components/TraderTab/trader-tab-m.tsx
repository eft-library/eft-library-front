"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Check, ChevronDown, Store } from "lucide-react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import type { TraderTabTypes } from "../roadmap.types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { roadmapI18N } from "@/lib/consts/i18nConsts";
import Image from "next/image";

export default function TraderTabM({
  npcList,
  tabState,
  setTabState,
}: TraderTabTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const trader = npcList.find((npc) => npc.id === tabState);
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          {tabState === "all" ? (
            <Button
              variant="outline"
              className="w-full justify-between h-12 px-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-white/70 dark:hover:bg-gray-900/70 transition-all duration-200 shadow-sm dark:shadow-gray-900/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 flex items-center justify-center shadow-md">
                  <Store className="h-4 w-4 text-white" />
                </div>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  ALL
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full justify-between h-12 px-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-white/70 dark:hover:bg-gray-900/70 transition-all duration-200 shadow-sm dark:shadow-gray-900/20"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 flex items-center justify-center shadow-md">
                  <Image
                    src={trader?.image || ""}
                    alt={trader?.name[localeKey] || ""}
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />
                </div>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {trader?.name[localeKey]}
                </span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </Button>
          )}
        </SheetTrigger>

        <SheetContent
          side="bottom"
          className="h-[60vh] rounded-t-2xl border-t-0 shadow-2xl bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 dark:shadow-black/40"
        >
          <SheetHeader className="pb-6">
            <SheetTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 flex items-center justify-center">
                {tabState === "all" ? (
                  <Store className="h-4 w-4 text-white" />
                ) : (
                  <Image
                    src={trader?.image || ""}
                    alt={trader?.name[localeKey] || ""}
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />
                )}
              </div>
              {roadmapI18N.traderSelectTitle[localeKey]}
            </SheetTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {roadmapI18N.traderSelectDescription[localeKey]}
            </p>
          </SheetHeader>

          <ScrollArea className="h-full pb-6">
            <div className="grid grid-cols-1 gap-3">
              <Button
                key={`mobile-selector-all`}
                variant="ghost"
                onClick={() => setTabState("all")}
                className={`
                    h-16 p-4 justify-start rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                    ${
                      tabState === "all"
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-300 dark:border-blue-600 shadow-md dark:shadow-blue-900/20"
                        : "bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/70"
                    }
                  `}
              >
                <div className="flex items-center gap-4 w-full">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md
                      ${
                        tabState === "all"
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 shadow-blue-200 dark:shadow-blue-900/50"
                          : "bg-gradient-to-br from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700 shadow-gray-200 dark:shadow-gray-800"
                      }
                    `}
                  >
                    <Store className="h-4 w-4 text-white" />
                  </div>

                  <div className="flex-1 text-left">
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      All
                    </div>
                  </div>

                  {tabState === "all" && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700/50"
                    >
                      <Check />
                    </Badge>
                  )}
                </div>
              </Button>
              {npcList.map((traderItem) => (
                <Button
                  key={`mobile-selector-${traderItem.id}`}
                  variant="ghost"
                  onClick={() => setTabState(traderItem.id)}
                  className={`
                    h-16 p-4 justify-start rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
                    ${
                      tabState === traderItem.id
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-blue-300 dark:border-blue-600 shadow-md dark:shadow-blue-900/20"
                        : "bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800/70"
                    }
                  `}
                >
                  <div className="flex items-center gap-4 w-full">
                    <div
                      className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md
                      ${
                        tabState === traderItem.id
                          ? "bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 shadow-blue-200 dark:shadow-blue-900/50"
                          : "bg-gradient-to-br from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700 shadow-gray-200 dark:shadow-gray-800"
                      }
                    `}
                    >
                      <Image
                        src={traderItem.image}
                        alt={traderItem.name[localeKey]}
                        width={36}
                        height={36}
                        className="rounded-full object-cover"
                      />
                    </div>

                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {traderItem.name[localeKey]}
                      </div>
                    </div>

                    {tabState === traderItem.id && (
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700/50"
                      >
                        <Check />
                      </Badge>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
