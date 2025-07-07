"use client";

import type { QuestDetailTypes } from "@/app/quest/_components/quest.types";
import { Card, CardContent } from "@/components/ui/card";
import { Skull, Star } from "lucide-react";
import { questI18N } from "@/lib/consts/i18nConsts";
import { useLocale } from "next-intl";
import {
  getLocaleKey,
  getDescriptionLocaleKey,
} from "@/lib/func/localeFunction";

export default function QuestObjectives({ quest }: QuestDetailTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div>
      <Card className="mb-6 sm:mb-8 mx-4 sm:mx-0 bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700/50 shadow-xl">
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3">
            {questI18N.objectives[localeKey]}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {quest.objectives.map((objective, index) => (
              <div key={index} className="flex items-start gap-3">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                {objective.type === "shoot" ? (
                  <span className="flex items-center">
                    {objective[getDescriptionLocaleKey(locale)]}
                    [
                    <Skull className="inline-block w-4 h-4" strokeWidth={3} />
                    x&nbsp;{objective.count}]
                  </span>
                ) : (
                  <span>{objective[getDescriptionLocaleKey(locale)]}</span>
                )}
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed text-sm sm:text-base"></p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
