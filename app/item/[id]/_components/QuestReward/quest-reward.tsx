import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { QuestRewardTypes } from "../item.types";
import Image from "next/image";
import { itemRelatedInfo } from "@/lib/consts/i18nConsts";
import Link from "next/link";

export default function QuestReward({ itemInfo }: QuestRewardTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <Card className="rounded-xl shadow-lg border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-center text-foreground">
          {itemRelatedInfo.questReward[localeKey]}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-6 space-y-6">
        <div>
          <div className="grid grid-cols-2 gap-4 py-3 px-4 rounded-lg font-semibold text-base mb-4 bg-secondary">
            <span>{itemRelatedInfo.quest[localeKey]}</span>
            <span className="text-right">
              {itemRelatedInfo.reward[localeKey]}
            </span>
          </div>

          <div className="space-y-3">
            {itemInfo.rewarded_by_quests.map((reward) => (
              <Link
                href={`/quest/detail/${reward.url_mapping}`}
                target="_blank"
                key={`reward-${reward.quest_id}`}
              >
                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4 py-3 px-4 rounded-lg hover:bg-secondary transition-colors items-start sm:items-center border-b border-border last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-20 h-20 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0">
                      <Image
                        src={reward.npc_image}
                        alt={reward.npc_name.en}
                        width={48}
                        height={48}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                    </div>
                    <span className="font-medium text-base text-foreground">
                      {reward.name[localeKey]}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:justify-end w-full sm:w-auto flex-nowrap">
                    <div className="w-20 h-20 rounded-md flex items-center justify-center flex-shrink-0">
                      <Image
                        src={reward.reward.item.gridImageLink}
                        alt={reward.reward.item.name_en}
                        width={40}
                        height={40}
                        className="w-20 h-20 object-contain rounded-lg"
                      />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground flex-grow-0">
                      {reward.reward.item[getOtherLocalizedKey(localeKey)]}
                    </span>
                    <span className="text-sm font-semibold text-primary flex-shrink-0">
                      x {reward.reward.quantity}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
