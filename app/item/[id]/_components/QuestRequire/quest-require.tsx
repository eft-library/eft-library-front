"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { itemRelatedInfo } from "@/lib/consts/i18nConsts";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import Image from "next/image";
import type { QuestRequireTypes } from "../item.types";
import Link from "next/link";

export default function QuestRequire({ itemInfo }: QuestRequireTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <Card className="rounded-xl shadow-lg border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl font-bold text-center text-foreground">
          {itemRelatedInfo.questRequired[localeKey]}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-6">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold text-sm sm:text-base mb-4 bg-secondary">
          <span className="text-center">
            {itemRelatedInfo.quest[localeKey]}
          </span>
          <span className="text-center">
            {itemRelatedInfo.material[localeKey]}
          </span>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {itemInfo.required_by_quest_item.length > 0 &&
            itemInfo.required_by_quest_item.map((questItem) => (
              <Link
                key={`required_by_quest_item-${questItem.objective.id}`}
                href={`/quest/detail/${questItem.url_mapping}`}
                target="_blank"
                className="block"
              >
                <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 py-3 px-3 sm:px-4 rounded-lg hover:bg-secondary transition-colors border-b border-border last:border-b-0 min-h-[80px] sm:min-h-[100px]">
                  {/* Quest Info */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
                      <Image
                        src={questItem.npc_image || "/placeholder.svg"}
                        alt={questItem.npc_name.en}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <span className="font-medium text-sm sm:text-base text-foreground leading-tight">
                      {questItem.name[localeKey]}
                    </span>
                  </div>

                  {/* Material Info */}
                  <div className="flex items-center gap-2 justify-start sm:justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-md flex items-center justify-center flex-shrink-0">
                      <Image
                        src={
                          questItem.objective.questItem.gridImageLink ||
                          "/placeholder.svg"
                        }
                        alt={questItem.objective.questItem.name_en}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0 flex-1">
                      <span className="text-xs sm:text-sm font-medium dark:text-white text-dark truncate">
                        {
                          questItem.objective.questItem[
                            getOtherLocalizedKey(localeKey)
                          ]
                        }
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-primary flex-shrink-0">
                        ×{questItem.objective.count}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

          {itemInfo.required_by_quest_item_array.length > 0 &&
            itemInfo.required_by_quest_item_array.map((questItem) => (
              <Link
                key={`required_by_quest_item-array-${questItem.objective.id}`}
                href={`/quest/detail/${questItem.url_mapping}`}
                target="_blank"
                className="block"
              >
                <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 py-3 px-3 sm:px-4 rounded-lg hover:bg-secondary transition-colors border-b border-border last:border-b-0 min-h-[80px] sm:min-h-[100px]">
                  {/* Quest Info */}
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
                      <Image
                        src={questItem.npc_image || "/placeholder.svg"}
                        alt={questItem.npc_name.en}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <span className="font-medium text-sm sm:text-base text-foreground leading-tight">
                      {questItem.name[localeKey]}
                    </span>
                  </div>

                  {/* Material Info */}
                  <div className="flex items-center gap-2 justify-start sm:justify-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-md flex items-center justify-center flex-shrink-0">
                      <Image
                        src={
                          questItem.objective.items.find(
                            (qItem) => qItem.id === itemInfo.id
                          )?.gridImageLink || ""
                        }
                        alt={
                          questItem.objective.items.find(
                            (qItem) => qItem.id === itemInfo.id
                          )?.name_en || ""
                        }
                        width={80}
                        height={80}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 min-w-0 flex-1">
                      <span className="text-xs sm:text-sm font-medium dark:text-white text-dark truncate">
                        {
                          questItem.objective.items.find(
                            (qItem) => qItem.id === itemInfo.id
                          )?.name_en
                        }
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-primary flex-shrink-0">
                        ×{questItem.objective.count}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
