import type { QuestDetailTypes } from "@/app/quest/_components/quest.types";
import { Card, CardContent } from "@/components/ui/card";
import { useLocale } from "next-intl";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { questI18N } from "@/lib/consts/i18nConsts";
import Link from "next/link";
import {
  TrendingUp,
  Package,
  ArrowBigUpDash,
  HandCoins,
  Pickaxe,
} from "lucide-react";

export default function QuestRewards({ quest }: QuestDetailTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <Card className="mb-6 sm:mb-8 mx-4 sm:mx-0 bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700/50 shadow-xl">
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black dark:text-white border-b border-gray-200 dark:border-gray-700 pb-3">
          {questI18N.reward[localeKey]}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {quest.finish_rewards.items.map((rewards, rIndex) => (
            <div
              key={`${rIndex}-rewards-${quest.id}`}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-100 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700/30"
            >
              <div className={`text-blue-400`}>{<Package />}</div>
              <Link
                href={`/item/${rewards.item.normalizedName}`}
                target="_blank"
                className="hover:text-yellow-400"
              >
                <span className="font-semibold">
                  {rewards.item[getOtherLocalizedKey(locale)]}
                </span>
                <span className={`font-semibold text-blue-400`}>
                  {` x ${rewards.quantity}`}
                </span>
              </Link>
            </div>
          ))}
          {quest.finish_rewards.offerUnlock.map((offer, rIndex) => (
            <div
              key={`${rIndex}-offerUnlock-${quest.id}`}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-100 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700/30"
            >
              <div className={`text-purple-400`}>{<HandCoins />}</div>
              <span className="font-semibold">
                {offer.trader[getOtherLocalizedKey(locale)]}
              </span>
              <Link
                href={`/item/${offer.item.normalizedName}`}
                target="_blank hover:text-yellow-400"
              >
                <span className={`font-semibold`}>
                  {offer.item[getOtherLocalizedKey(locale)]}
                </span>
              </Link>
              <span className={`font-semibold text-purple-400`}>
                {questI18N.purchaseUnlock[localeKey]}
              </span>
            </div>
          ))}
          {quest.finish_rewards.traderStanding.map((standing, rIndex) => (
            <div
              key={`${rIndex}-traderStanding-${quest.id}`}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-100 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700/30"
            >
              <div className={`text-lime-400`}>{<TrendingUp />}</div>
              <span className={`font-semibold`}>
                {standing.trader[getOtherLocalizedKey(locale)]}
              </span>
              <span className={`font-semibold`}>
                {questI18N.standing[localeKey]}
              </span>
              <span className={`font-semibold text-lime-400`}>
                {standing.standing}
              </span>
            </div>
          ))}
          {quest.finish_rewards.craftUnlock.flatMap((craft, rIndex) =>
            craft.rewardItems.map((crReward, crIndex) => (
              <div
                key={`${rIndex}-${crIndex}-craftUnlock-${quest.id}`}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-100 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700/30"
              >
                <div className="text-red-400">
                  <Pickaxe />
                </div>
                <span className="font-semibold">
                  {questI18N.workbenchLevel[localeKey]}
                </span>
                <span className="font-semibold">{craft.level}</span>
                <Link
                  href={`/item/${crReward.item.normalizedName}`}
                  target="_blank"
                >
                  <span className="font-semibold hover:text-yellow-400">
                    {crReward.item[getOtherLocalizedKey(locale)]}
                  </span>
                </Link>
                <span className="font-semibold text-red-400">
                  {questI18N.craftUnlock[localeKey]}
                </span>
              </div>
            ))
          )}

          {quest.finish_rewards.skillLevelReward.map((skill, rIndex) => (
            <div
              key={`${rIndex}-skillLevelReward-${quest.id}`}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-100 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700/30"
            >
              <div className={`text-yellow-400`}>{<ArrowBigUpDash />}</div>
              <span className="font-semibold">
                {skill[getOtherLocalizedKey(locale)]}
              </span>
              <span className={`font-semibold text-yellow-400`}>
                LV. {skill.level}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
