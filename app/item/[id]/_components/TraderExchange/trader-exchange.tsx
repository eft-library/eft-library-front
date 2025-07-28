import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TraderExchangeTypes } from "../item.types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { itemRelatedInfo } from "@/lib/consts/i18nConsts";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";

export default function TraderExchange({ itemInfo }: TraderExchangeTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <Card className="rounded-xl shadow-lg border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-center text-foreground">
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
              <div className="w-20 h-20 rounded-mdflex items-center justify-center overflow-hidden flex-shrink-0">
                <Image
                  src={trader.npc_image}
                  alt={trader.npc_name.en}
                  width={48}
                  height={48}
                  className="w-20 h-20 object-contain rounded-lg"
                />
              </div>
              <div>
                <div className="font-medium text-base text-foreground">
                  {trader.npc_name[localeKey]}
                </div>
                <Badge className="text-xs px-2 py-0.5 rounded-md bg-secondary/20 text-secondary-foreground mt-1">
                  LV {trader.barter_info.level}
                </Badge>
              </div>
            </div>
            {trader.barter_info.requiredItems.map((reqItem, sIndex) => (
              <div
                key={`trader-req-${reqItem.item.id}-${sIndex}`}
                className="flex items-center gap-2 mt-2 sm:mt-0 sm:justify-center w-full sm:w-auto flex-nowrap"
              >
                <div className="w-20 h-20 rounded-md flex items-center justify-center flex-shrink-0">
                  <Image
                    src={reqItem.item.gridImageLink}
                    alt={reqItem.item.name_en}
                    width={40}
                    height={40}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground flex-grow-0">
                  {reqItem.item[getOtherLocalizedKey(localeKey)]}
                </span>
                <span className="text-sm font-semibold text-primary flex-shrink-0">
                  x {reqItem.quantity}
                </span>
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
