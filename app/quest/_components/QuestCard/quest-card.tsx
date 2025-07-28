"use client";

import { Card } from "@/components/ui/card";
import { Check, Skull, X } from "lucide-react";
import { questI18N } from "@/lib/consts/i18nConsts";
import { useLocale } from "next-intl";
import {
  getDescriptionLocaleKey,
  getLocaleKey,
  getOtherLocalizedKey,
} from "@/lib/func/localeFunction";
import type { QuestCardTypes } from "../quest.types";
import Link from "next/link";
import Highlighter from "react-highlight-words";

export default function QuestCard({ quest_list, word }: QuestCardTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const filteredList = quest_list.filter((item) =>
    item.name[localeKey].toLowerCase().includes(word.toLowerCase())
  );

  return (
    <div className="hidden md:block">
      <Card className="overflow-hidden p-0 bg-white border-gray-200 dark:bg-[#1E1E1E] dark:border-[#2B2B2B]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 dark:border-[#2B2B2B] dark:bg-[#2B2B2B]">
                {[
                  questI18N.name[localeKey],
                  questI18N.objectives[localeKey],
                  questI18N.reward[localeKey],
                  questI18N.kappa[localeKey],
                ].map((header, idx) => (
                  <th
                    key={idx}
                    className="p-6 font-semibold text-lg text-center text-[#FF8C00] hover:text-yellow-400 dark:text-[#FFB82E] dark:hover:text-yellow-400"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredList.map((quest) => (
                <tr
                  key={quest.id}
                  className={`border-b transition-colors border-gray-200 hover:bg-gray-50 even:bg-gray-25 odd:bg-white
                  dark:border-[#2B2B2B] dark:hover:bg-[#2B2B2B]/50 even:dark:bg-[#1A1A1A] odd:dark:bg-[#1E1E1E]`}
                >
                  <td className="p-2 font-semibold text-center text-[#FF8C00] hover:text-yellow-400 dark:text-[#FFB82E] dark:hover:text-yellow-400">
                    <Link href={`/quest/detail/${quest.url_mapping}`}>
                      <Highlighter
                        highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                        searchWords={[word]}
                        autoEscape
                        textToHighlight={quest.name[localeKey]}
                      />
                    </Link>
                  </td>
                  <td className="p-6">
                    <ul className="space-y-2">
                      {quest.objectives?.map((objective, idx) => (
                        <li
                          key={idx}
                          className="text-sm leading-relaxed text-gray-600 dark:text-[#CCCCCC]"
                        >
                          {objective.type === "shoot" ? (
                            <>
                              • {objective[getDescriptionLocaleKey(locale)]}
                              &nbsp;[
                              <Skull
                                className="inline-block w-4 h-4 text-red-400"
                                strokeWidth={3}
                              />
                              x&nbsp;{objective.count}]
                            </>
                          ) : (
                            <>• {objective[getDescriptionLocaleKey(locale)]}</>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-6">
                    <div className="space-y-2">
                      {quest.finish_rewards.items.map((rewards, rIndex) => (
                        <div
                          key={`${rIndex}-rewards-${quest.id}`}
                          className="text-sm font-semibold text-[#FF8C00] hover:text-yellow-400 dark:text-[#FFB82E] dark:hover:text-yellow-400 transition-colors"
                        >
                          •&nbsp;
                          <Link
                            href={`/item/${rewards.item.normalizedName}`}
                            target="_blank"
                          >
                            {rewards.item[getOtherLocalizedKey(locale)]}
                            &nbsp;x&nbsp;
                            {rewards.quantity}
                          </Link>
                        </div>
                      ))}
                      {quest.finish_rewards.offerUnlock.map((offer, rIndex) => (
                        <div
                          key={`${rIndex}-offerUnlock-${quest.id}`}
                          className="text-sm text-gray-600 dark:text-[#CCCCCC]"
                        >
                          • {offer.trader[getOtherLocalizedKey(locale)]}&nbsp;
                          <Link
                            href={`/item/${offer.item.normalizedName}`}
                            target="_blank"
                          >
                            {offer.item[getOtherLocalizedKey(locale)]}
                          </Link>
                          &nbsp;
                          <span>{questI18N.purchaseUnlock[localeKey]}</span>
                        </div>
                      ))}
                      {quest.finish_rewards.traderStanding.map(
                        (standing, rIndex) => (
                          <div
                            key={`${rIndex}-traderStanding-${quest.id}`}
                            className="text-sm text-gray-600 dark:text-[#CCCCCC]"
                          >
                            *&nbsp;
                            {standing.trader[getOtherLocalizedKey(locale)]}
                            &nbsp;
                            {questI18N.standing[localeKey]}&nbsp;
                            <span>{standing.standing}</span>
                          </div>
                        )
                      )}
                      {quest.finish_rewards.craftUnlock.map((craft, rIndex) => (
                        <div
                          key={`${rIndex}-craftUnlock-${quest.id}`}
                          className="text-sm text-gray-600 dark:text-[#CCCCCC]"
                        >
                          {craft.rewardItems.map((crReward, crIndex) => (
                            <div
                              key={`${crIndex}-crReward-${quest.id}`}
                              className="text-sm text-gray-600 dark:text-[#CCCCCC]"
                            >
                              <span>
                                * {questI18N.workbenchLevel[localeKey]}&nbsp;
                              </span>
                              <span>{craft.level}&nbsp;</span>
                              <Link
                                href={`/item/${crReward.item.normalizedName}`}
                                target="_blank"
                              >
                                {crReward.item[getOtherLocalizedKey(locale)]}
                              </Link>
                              <span>
                                &nbsp;{questI18N.craftUnlock[localeKey]}
                              </span>
                            </div>
                          ))}
                        </div>
                      ))}
                      {quest.finish_rewards.traderStanding.map(
                        (standing, rIndex) => (
                          <div
                            key={`${rIndex}-traderStanding-${quest.id}`}
                            className="text-sm text-gray-600 dark:text-[#CCCCCC]"
                          >
                            *&nbsp;
                            {standing.trader[getOtherLocalizedKey(locale)]}
                            &nbsp;
                            {questI18N.standing[localeKey]}&nbsp;
                            <span>{standing.standing}</span>
                          </div>
                        )
                      )}
                      {quest.finish_rewards.skillLevelReward.map(
                        (skill, rIndex) => (
                          <div
                            key={`${rIndex}-skillLevelReward-${quest.id}`}
                            className="text-sm text-gray-600 dark:text-[#CCCCCC]"
                          >
                            * {skill[getOtherLocalizedKey(locale)]}
                            <span>&nbsp;LV&nbsp;{skill.level}</span>
                          </div>
                        )
                      )}
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <div className="flex justify-center">
                      {quest.kappa_required ? (
                        <div className="bg-green-600 rounded-full p-2 hover:bg-green-500 transition-colors">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                      ) : (
                        <div className="bg-red-600 rounded-full p-2 hover:bg-red-500 transition-colors">
                          <X className="w-5 h-5 text-white" />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
