"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check, Skull, X } from "lucide-react";
import { useTheme } from "next-themes";
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

export default function QuestCardM({ quest_list, word }: QuestCardTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { theme } = useTheme();
  const filteredList = quest_list.filter((item) =>
    item.name[localeKey].toLowerCase().includes(word.toLowerCase())
  );

  return filteredList.map((quest) => (
    <Card
      key={quest.id}
      className={`${
        theme === "dark"
          ? "bg-[#1E1E1E] border-[#2B2B2B] hover:bg-[#2B2B2B]/50"
          : "bg-white border-gray-200 hover:bg-gray-50"
      } transition-colors duration-200`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle
            className={`text-lg font-semibold ${
              theme === "dark"
                ? "text-[#FFB82E] hover:text-yellow-400"
                : "text-[#FF8C00] hover:text-yellow-400"
            }`}
          >
            <Link href={`/quest/detail/${quest.url_mapping}`}>
              <Highlighter
                highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                searchWords={[word]}
                autoEscape
                textToHighlight={quest.name[localeKey]}
              />
            </Link>
          </CardTitle>
          <div className="flex justify-center">
            {quest.kappa_required ? (
              <div className="bg-green-600 rounded-full p-1.5 hover:bg-green-500 transition-colors">
                <Check className="w-4 h-4 text-white" />
              </div>
            ) : (
              <div className="bg-red-600 rounded-full p-1.5 hover:bg-red-500 transition-colors">
                <X className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Objectives */}
        <div>
          <h4
            className={`text-sm font-medium mb-2 ${
              theme === "dark" ? "text-[#FFB82E]" : "text-[#FF8C00]"
            }`}
          >
            {questI18N.objectives[localeKey]}
          </h4>
          <ul className="space-y-1">
            {quest.objectives &&
              quest.objectives.map((objective, idx) => (
                <li
                  key={idx}
                  className={`text-sm leading-relaxed ${
                    theme === "dark" ? "text-[#CCCCCC]" : "text-gray-600"
                  }`}
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
        </div>

        {/* Rewards */}
        <div>
          <h4
            className={`text-sm font-medium mb-2 ${
              theme === "dark" ? "text-[#FFB82E]" : "text-[#FF8C00]"
            }`}
          >
            {questI18N.reward[localeKey]}
          </h4>
          <div className="space-y-1">
            {quest.finish_rewards.items.map((rewards, rIndex) => (
              <div
                key={`${rIndex}-rewards-${quest.id}`}
                className={`text-sm font-medium transition-colors ${
                  theme === "dark"
                    ? "text-[#FFB82E] hover:text-yellow-400"
                    : "text-[#FF8C00] hover:text-yellow-400"
                }`}
              >
                •&nbsp;
                <Link
                  href={`/item/${rewards.item.normalizedName}`}
                  target="_blank"
                >
                  {rewards.item[getOtherLocalizedKey(locale)]}&nbsp;x&nbsp;
                  {rewards.quantity}
                </Link>
              </div>
            ))}
            {quest.finish_rewards.offerUnlock.map((offer, rIndex) => (
              <div
                key={`${rIndex}-offerUnlock-${quest.id}`}
                className={`text-sm ${
                  theme === "dark" ? "text-[#CCCCCC]" : "text-gray-600"
                }`}
              >
                • {offer.trader[getOtherLocalizedKey(locale)]}
                &nbsp;
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
            {quest.finish_rewards.traderStanding.map((standing, rIndex) => (
              <div
                key={`${rIndex}-traderStanding-${quest.id}`}
                className={`text-sm ${
                  theme === "dark" ? "text-[#CCCCCC]" : "text-gray-600"
                }`}
              >
                *&nbsp;
                {standing.trader[getOtherLocalizedKey(locale)]}
                &nbsp;{questI18N.standing[localeKey]}&nbsp;
                <span>{standing.standing}</span>
              </div>
            ))}
            {quest.finish_rewards.craftUnlock.map((craft, rIndex) => (
              <div
                key={`${rIndex}-craftUnlock-${quest.id}`}
                className={`text-sm ${
                  theme === "dark" ? "text-[#CCCCCC]" : "text-gray-600"
                }`}
              >
                {craft.rewardItems.map((crReward, crIndex) => (
                  <div
                    key={`${crIndex}-crReward-${quest.id}`}
                    className={`text-sm ${
                      theme === "dark" ? "text-[#CCCCCC]" : "text-gray-600"
                    }`}
                  >
                    <span>* {questI18N.workbenchLevel[localeKey]}&nbsp;</span>
                    <span>{craft.level}&nbsp;</span>
                    <Link
                      href={`/item/${crReward.item.normalizedName}`}
                      target="_blank"
                    >
                      {crReward.item[getOtherLocalizedKey(locale)]}
                    </Link>
                    <span>&nbsp;{questI18N.craftUnlock[localeKey]}</span>
                  </div>
                ))}
              </div>
            ))}
            {quest.finish_rewards.traderStanding.map((standing, rIndex) => (
              <div
                key={`${rIndex}-traderStanding-${quest.id}`}
                className={`text-sm ${
                  theme === "dark" ? "text-[#CCCCCC]" : "text-gray-600"
                }`}
              >
                *&nbsp;
                {standing.trader[getOtherLocalizedKey(locale)]}
                &nbsp;{questI18N.standing[localeKey]}&nbsp;
                <span>{standing.standing}</span>
              </div>
            ))}
            {quest.finish_rewards.skillLevelReward.map((skill, rIndex) => (
              <div
                key={`${rIndex}-skillLevelReward-${quest.id}`}
                className={`text-sm ${
                  theme === "dark" ? "text-[#CCCCCC]" : "text-gray-600"
                }`}
              >
                * {skill[getOtherLocalizedKey(locale)]}
                <span>&nbsp;LV&nbsp;{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  ));
}
