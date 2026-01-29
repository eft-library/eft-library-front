import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TraderExchangeTypes } from "../item.types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { itemRelatedInfo } from "@/lib/consts/i18nConsts";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { SmilePlus } from "lucide-react";

export default function TraderExchange({ itemInfo }: TraderExchangeTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <Card className="rounded-xl shadow-lg border border-border mt-4">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl font-bold text-center text-foreground flex items-center justify-center gap-2">
          <SmilePlus className="w-5 h-5 text-primary" />
          {itemRelatedInfo.traderExchange[localeKey]}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-4 py-3 px-4 rounded-lg font-semibold text-base mb-4 bg-secondary">
          <span className="text-center">
            {itemRelatedInfo.trader[localeKey]}
          </span>
          <span className="text-center">
            {itemRelatedInfo.material[localeKey]}
          </span>
          <span className="text-center">
            {itemRelatedInfo.reward[localeKey]}
          </span>
        </div>
        {itemInfo.rewarded_by_npcs.map((trader, index) => (
          <div
            key={`trader-${trader.barter_info.level}-${trader.npc_name.en}-${index}`}
            className="flex flex-col sm:grid sm:grid-cols-3 gap-4 py-3 px-4 rounded-lg hover:bg-secondary transition-colors items-start sm:items-center border-b border-border last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-mdflex items-center justify-center overflow-hidden flex-shrink-0">
                <Image
                  src={trader.npc_image}
                  alt={trader.npc_name.en}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <div className="font-medium text-base text-black dark:text-white">
                  {trader.npc_name[localeKey]}
                </div>
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-0.5 rounded-md bg-secondary text-black dark:text-white mt-1"
                >
                  LV {trader.barter_info.level}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {trader.barter_info.requiredItems.map((reqItem, sIndex) => (
                <div
                  key={`trader-req-${reqItem.item.id}-${sIndex}`}
                  className="flex items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto flex-nowrap"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-md flex items-center justify-center flex-shrink-0">
                    <Image
                      src={reqItem.item.gridImageLink}
                      alt={reqItem.item.name_en}
                      width={40}
                      height={40}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <span className="text-sm font-medium text-black dark:text-white flex-grow-0">
                    {reqItem.item[getOtherLocalizedKey(localeKey)]}
                  </span>
                  <span className="text-sm font-semibold text-black dark:text-white flex-shrink-0">
                    x {reqItem.quantity}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:justify-center w-full sm:w-auto flex-nowrap">
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-md flex items-center justify-center flex-shrink-0">
                  <Image
                    src={trader.barter_info.rewardItems.item.gridImageLink}
                    alt={trader.barter_info.rewardItems.item.name_en}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <span className="text-sm font-medium text-black dark:text-white flex-grow-0">
                  {
                    trader.barter_info.rewardItems.item[
                      getOtherLocalizedKey(localeKey)
                    ]
                  }
                </span>
                <span className="text-sm font-semibold text-black dark:text-white flex-shrink-0">
                  x {trader.barter_info.rewardItems.quantity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
