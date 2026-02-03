import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import type { QuestRewardTypes } from "../item.types";
import Image from "next/image";
import { itemRelatedInfo } from "@/lib/consts/i18nConsts";
import Link from "next/link";
import { Gift } from "lucide-react";

export default function QuestReward({ itemInfo }: QuestRewardTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <Card className="rounded-xl shadow-lg border border-border bg-card mt-4">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl font-bold text-center text-foreground flex items-center justify-center gap-2">
          <Gift className="w-5 h-5 text-primary" />
          {itemRelatedInfo.questReward[localeKey]}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-6">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold text-sm sm:text-base mb-4 bg-secondary">
          <span className="text-center">
            {itemRelatedInfo.quest[localeKey]}
          </span>
          <span className="text-center">
            {itemRelatedInfo.reward[localeKey]}
          </span>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {itemInfo.rewarded_by_quests.map((reward, index) => (
            <Link
              href={`/quest/detail/${reward.url_mapping}`}
              target="_blank"
              key={`reward-${reward.quest_id}-${index}`}
              className="block"
            >
              <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 py-3 px-3 sm:px-4 rounded-lg hover:bg-secondary transition-colors border-b border-border last:border-b-0 min-h-20 sm:min-h-25">
                {/* Quest Info */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-md flex items-center justify-center overflow-hidden shrink-0 bg-secondary/30">
                    <Image
                      src={reward.npc_image || "/placeholder.svg"}
                      alt={reward.npc_name.en}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex items-center justify-start sm:justify-start">
                    {/* Changed justify-center to justify-start */}
                    <span className="font-medium text-sm sm:text-base text-black dark:text-white text-left sm:text-left block leading-tight line-clamp-2">
                      {/* Changed text-center to text-left */}
                      {reward.name[localeKey]}
                    </span>
                  </div>
                </div>
                {/* Reward Info */}
                <div className="flex items-center gap-2 mt-2 sm:mt-0 justify-start sm:justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-md flex items-center justify-center shrink-0 bg-secondary/30">
                    <Image
                      src={
                        reward.reward.item.gridImageLink || "/placeholder.svg"
                      }
                      alt={reward.reward.item.name_en}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex items-center gap-1">
                    {/* 보상 아이콘 추가 */}
                    <span className="text-xs sm:text-sm font-medium text-black dark:text-white truncate">
                      {reward.reward.item[getOtherLocalizedKey(localeKey)]}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-black dark:text-white shrink-0 ml-1">
                      ×{reward.reward.quantity}
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
