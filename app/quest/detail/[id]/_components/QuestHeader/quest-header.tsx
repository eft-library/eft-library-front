"use client";

import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Image from "next/image";
import type { QuestDetailTypes } from "@/app/quest/_components/quest.types";
import { useLocale } from "next-intl";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { questI18N } from "@/lib/consts/i18nConsts";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function QuestHeader({ quest }: QuestDetailTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [showAllPrevious, setShowAllPrevious] = useState(false);
  const [showAllNext, setShowAllNext] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="text-center mb-8 sm:mb-12">
      <div className="relative inline-block mb-6">
        <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-2xl border-2 border-lime-400/30 shadow-lg shadow-lime-400/20 overflow-hidden bg-gradient-to-b from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900">
          <Image
            src={quest.npc_image}
            alt="Therapist"
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-black dark:text-white">
        {quest.name[getLocaleKey(localeKey)]}
      </h1>

      <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
        <Badge
          variant="outline"
          className="bg-gray-100 dark:bg-gray-800/50 border-yellow-400/50 text-yellow-400 px-3 sm:px-4 py-2"
        >
          LV. {quest.min_player_level}
        </Badge>
        <div className="flex items-center gap-2">
          <span className="text-gray-600 dark:text-gray-300 font-semibold">
            Kappa
          </span>
          <div className="w-6 h-6 bg-lime-400 rounded flex items-center justify-center">
            <Check className="w-4 h-4 text-black" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-start justify-center gap-8 sm:gap-16 max-w-4xl mx-auto">
        <div className="text-center flex-1">
          <div
            className={`text-sm leading-relaxed font-semibold ${
              theme === "dark" ? "text-[#CCCCCC]" : "text-gray-600"
            } cursor-not-allowed px-2 sm:px-4 py-2 sm:text-base`}
          >
            {questI18N.prev[localeKey]}
          </div>
          <div className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mt-2 space-y-1">
            {quest.task_requirements &&
              (showAllPrevious
                ? quest.task_requirements
                : quest.task_requirements.slice(0, 5)
              ).map((prev_quest, index) => (
                <div
                  key={index}
                  className={`text-sm font-semibold ${
                    theme === "dark" ? "text-[#CCCCCC]" : "text-gray-600"
                  } hover:text-yellow-400 transition-colors cursor-pointer text-center leading-relaxed`}
                >
                  <Link
                    href={`/quest/detail/${prev_quest.task.normalizedName}`}
                  >
                    {prev_quest.task[getOtherLocalizedKey(localeKey)]}
                  </Link>
                </div>
              ))}
            {quest.task_requirements && quest.task_requirements.length > 5 && (
              <button
                onClick={() => setShowAllPrevious(!showAllPrevious)}
                className="text-yellow-400 hover:text-yellow-300 transition-colors text-xs mt-3 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700"
              >
                {showAllPrevious
                  ? `${questI18N.less[localeKey]}`
                  : `+${quest.task_requirements.length - 5} ${
                      questI18N.more[localeKey]
                    }`}
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 text-center">
          <div
            className={`text-sm font-semibold leading-relaxed ${
              theme === "dark" ? "text-[#CCCCCC]" : "text-gray-600"
            } cursor-not-allowed px-2 sm:px-4 py-2 sm:text-base`}
          >
            {questI18N.next[localeKey]}
          </div>
          <div className="text-gray-400 dark:text-gray-500 text-xs sm:text-sm mt-2 space-y-1 max-w-xs mx-auto">
            {quest.task_next &&
              (showAllNext ? quest.task_next : quest.task_next.slice(0, 5)).map(
                (next_quest) => (
                  <div
                    key={`next-quest-${next_quest.task.normalizedName}`}
                    className={`text-sm font-semibold ${
                      theme === "dark" ? "text-[#CCCCCC]" : "text-gray-600"
                    } hover:text-yellow-400 transition-colors cursor-pointer text-center leading-relaxed`}
                  >
                    <Link
                      href={`/quest/detail/${next_quest.task.normalizedName}`}
                    >
                      {next_quest.task[getOtherLocalizedKey(localeKey)]}
                    </Link>
                  </div>
                )
              )}
            {quest.task_next && quest.task_next.length > 5 && (
              <button
                onClick={() => setShowAllNext(!showAllNext)}
                className="text-yellow-400 hover:text-yellow-300 transition-colors text-xs mt-3 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700"
              >
                {showAllNext
                  ? `${questI18N.less[localeKey]}`
                  : `+${quest.task_next.length - 5} ${
                      questI18N.more[localeKey]
                    }`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
