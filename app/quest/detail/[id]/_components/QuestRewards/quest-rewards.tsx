"use client";

import type { QuestDetailTypes } from "@/app/quest/_components/quest.types";
import { Card, CardContent } from "@/components/ui/card";
import { useLocale } from "next-intl";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { questI18N } from "@/lib/consts/i18nConsts";
import Link from "next/link";

export default function QuestRewards({ quest }: QuestDetailTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <Card className="mb-6 sm:mb-8 mx-4 sm:mx-0 bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700/50 shadow-xl">
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3">
          보상
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {quest.finish_rewards.items.map((rewards, rIndex) => (
            <div
              key={`${rIndex}-rewards-${quest.id}`}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-100 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700/30"
            >
              <Link
                href={`/item/${rewards.item.normalizedName}`}
                target="_blank"
              >
                <span className="text-gray-700 dark:text-gray-200">
                  {rewards.item[getOtherLocalizedKey(locale)]}
                </span>
                <span className={`ml-2 font-semibold`}>{rewards.quantity}</span>
              </Link>
            </div>
          ))}
          {quest.finish_rewards.offerUnlock.map((offer, rIndex) => (
            <div
              key={`${rIndex}-offerUnlock-${quest.id}`}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-100 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700/30"
            >
              <span className="text-gray-700 dark:text-gray-200">
                {offer.trader[getOtherLocalizedKey(locale)]}
              </span>
              <Link href={`/item/${offer.item.normalizedName}`} target="_blank">
                <span className={`ml-2 font-semibold`}>
                  {offer.item[getOtherLocalizedKey(locale)]}
                </span>
              </Link>
              <span className={`ml-2 font-semibold`}>
                {questI18N.purchaseUnlock[localeKey]}
              </span>
            </div>
          ))}
          {quest.finish_rewards.traderStanding.map((standing, rIndex) => (
            <div
              key={`${rIndex}-traderStanding-${quest.id}`}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-100 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700/30"
            >
              <span className="text-gray-700 dark:text-gray-200">
                {standing.trader[getOtherLocalizedKey(locale)]}
              </span>
              <span className={`ml-2 font-semibold`}>
                {questI18N.standing[localeKey]}
              </span>
              <span className={`ml-2 font-semibold`}>{standing.standing}</span>
            </div>
          ))}
          {quest.finish_rewards.craftUnlock.map((craft, rIndex) => (
            <div
              key={`${rIndex}-craftUnlock-${quest.id}`}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-100 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700/30"
            >
              {craft.rewardItems.map((crReward, crIndex) => (
                <div
                  key={`${crIndex}-crReward-${quest.id}`}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-100 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700/30"
                >
                  <span className="text-gray-700 dark:text-gray-200">
                    {questI18N.workbenchLevel[localeKey]}
                  </span>
                  <span className={`ml-2 font-semibold`}>{craft.level}</span>
                  <Link
                    href={`/item/${crReward.item.normalizedName}`}
                    target="_blank"
                  >
                    <span className={`ml-2 font-semibold`}>
                      {crReward.item[getOtherLocalizedKey(locale)]}
                    </span>
                  </Link>
                  <span className={`ml-2 font-semibold`}>
                    {questI18N.craftUnlock[localeKey]}
                  </span>
                </div>
              ))}
            </div>
          ))}
          {quest.finish_rewards.skillLevelReward.map((skill, rIndex) => (
            <div
              key={`${rIndex}-skillLevelReward-${quest.id}`}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-100 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700/30"
            >
              {/* <div className={`${reward.color}`}>{reward.icon}</div> */}
              <span className="text-gray-700 dark:text-gray-200">
                {skill[getOtherLocalizedKey(locale)]}
              </span>
              {/* <span className={`ml-2 font-semibold ${reward.color}`}> */}
              <span className={`ml-2 font-semibold`}>LV. {skill.level}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
