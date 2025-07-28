import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import type { PurchaseUnlockTypes } from "../item.types";
import Image from "next/image";
import { itemRelatedInfo } from "@/lib/consts/i18nConsts";
import Link from "next/link";
import { ShoppingCart, Unlock } from "lucide-react";

export default function PurchaseUnlock({ itemInfo }: PurchaseUnlockTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <Card className="rounded-xl shadow-lg border border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl font-bold text-center text-foreground flex items-center justify-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary" />
          {itemRelatedInfo.questOfferUnlock[localeKey]}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-6">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold text-sm sm:text-base mb-4 bg-secondary">
          <span className="text-center">
            {itemRelatedInfo.quest[localeKey]}
          </span>
          <span className="text-center">
            {itemRelatedInfo.purchase[localeKey]}
          </span>
        </div>
        <div className="space-y-2 sm:space-y-3">
          {itemInfo.rewarded_by_quests_offer_unlock.map((unlock, index) => (
            <Link
              href={`/quest/detail/${unlock.url_mapping}`}
              key={`rewarded_by_quests_craft_unlock-${unlock.reward.item.id}-${index}`}
              target="_blank"
              className="block"
            >
              <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 py-3 px-3 sm:px-4 rounded-lg hover:bg-secondary transition-colors border-b border-border last:border-b-0 min-h-[80px] sm:min-h-[100px]">
                {/* Quest Info */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-md flex items-center justify-center overflow-hidden flex-shrink-0 bg-secondary/30">
                    <Image
                      src={unlock.npc_image || "/placeholder.svg"}
                      alt={unlock.npc_name.en}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex items-center justify-start sm:justify-start">
                    {/* Changed justify-center to justify-start */}
                    <span className="font-medium text-sm sm:text-base text-black dark:text-white text-left sm:text-left line-clamp-2">
                      {/* Changed text-center to text-left */}
                      {unlock.name[localeKey]}
                    </span>
                  </div>
                </div>

                {/* Purchase Info */}
                <div className="flex items-center gap-2 mt-2 sm:mt-0 justify-start sm:justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-md flex items-center justify-center flex-shrink-0 bg-secondary/30">
                    <Image
                      src={
                        unlock.reward.item.gridImageLink || "/placeholder.svg"
                      }
                      alt={unlock.reward.item.name_en}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Unlock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-black dark:text-white truncate">
                      {unlock.reward.item[getOtherLocalizedKey(localeKey)]}
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
