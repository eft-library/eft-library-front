"use client";

import { QuestDetailTypes } from "@/app/quest/_components/quest.types";
import { Card, CardContent } from "@/components/ui/card";
import { Check, SquareX } from "lucide-react";
import Image from "next/image";
import { useLocale } from "next-intl";
import Link from "next/link";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { questI18N } from "@/lib/consts/i18nConsts";

export default function QuestItems({ quest }: QuestDetailTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const mergedItems = (quest.objectives ?? []).flatMap((item) => {
    if (
      (item.type === "giveItem" || item.type === "findItem") &&
      Array.isArray(item.items)
    ) {
      return item.items.map((subItem) => ({
        id: subItem.id,
        type: item.type,
        count: item.count,
        foundInRaid: item.foundInRaid,
        itemData: subItem,
      }));
    }

    if (
      (item.type === "findQuestItem" || item.type === "giveQuestItem") &&
      item.questItem
    ) {
      return [
        {
          id: item.questItem.id,
          type: item.type,
          count: item.count,
          foundInRaid: item.foundInRaid,
          itemData: item.questItem,
        },
      ];
    }

    return [];
  });

  const questItems = Array.from(
    new Map(mergedItems.map((entry) => [entry.itemData.id, entry])).values()
  );
  if (questItems.length < 1) return null;

  return (
    <Card className="mb-6 sm:mb-8 mx-4 sm:mx-0 bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700/50 shadow-xl">
      <CardContent className="p-4 sm:p-6">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="min-w-full inline-block align-middle">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="py-3 sm:py-4 px-2 text-gray-600 dark:text-gray-300 font-semibold text-center text-sm sm:text-base">
                    {questI18N.image[localeKey]}
                  </th>
                  <th className="py-3 sm:py-4 px-2 text-gray-600 dark:text-gray-300 font-semibold text-center text-sm sm:text-base">
                    {questI18N.itemName[localeKey]}
                  </th>
                  <th className="text-center py-3 sm:py-4 px-2 text-gray-600 dark:text-gray-300 font-semibold text-sm sm:text-base">
                    {questI18N.quantity[localeKey]}
                  </th>
                  <th className="text-center py-3 sm:py-4 px-2 text-gray-600 dark:text-gray-300 font-semibold text-sm sm:text-base">
                    {questI18N.inRaid[localeKey]}
                  </th>
                </tr>
              </thead>
              <tbody>
                {questItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border border-gray-200 dark:border-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-800/30 transition-colors group"
                  >
                    <td className="py-3 sm:py-4 px-2">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600/50 overflow-hidden mx-auto">
                        <Image
                          src={item.itemData.gridImageLink}
                          alt={item.itemData.name_en}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-3 sm:py-4 px-2 text-gray-700 dark:text-gray-200 text-center text-xs sm:text-sm">
                      {item.type === "findQuestItem" ||
                      item.type === "giveQuestItem" ? (
                        <Link
                          href={`/item/${item.itemData.normalizedName}`}
                          className="hover:text-yellow-200"
                          target="_blank"
                        >
                          {item.itemData[getOtherLocalizedKey(locale)]}
                        </Link>
                      ) : (
                        <>{item.itemData[getOtherLocalizedKey(locale)]}</>
                      )}
                    </td>
                    <td className="py-3 sm:py-4 px-2 text-center text-black dark:text-white font-semibold text-sm sm:text-base">
                      {item.count}
                    </td>
                    <td className="py-3 sm:py-4 px-2 text-center">
                      {item.foundInRaid ? (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-lime-400 rounded mx-auto flex items-center justify-center">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-red-400 rounded mx-auto flex items-center justify-center">
                          <SquareX className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
