import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { HideoutCraftingTypes } from "../item.types";
import { itemRelatedInfo } from "@/lib/consts/i18nConsts";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import { changeTime, getMaxSuffix } from "@/lib/func/jsxfunction";
import { Badge } from "@/components/ui/badge";

export default function HideoutCrafting({ itemInfo }: HideoutCraftingTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <Card className="rounded-xl shadow-lg border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-center text-foreground">
          {itemRelatedInfo.hideoutCrafting[localeKey]}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        {/* Header Row - Hidden on mobile, visible on md and up */}
        <div className="hidden md:grid grid-cols-4 gap-4 py-3 px-4 rounded-lg font-semibold text-base mb-4 bg-secondary">
          <span>{itemRelatedInfo.requirement[localeKey]}</span>
          <span className="text-center">
            {itemRelatedInfo.material[localeKey]}
          </span>
          <span className="text-center">{itemRelatedInfo.time[localeKey]}</span>
          <span className="text-center">
            {itemRelatedInfo.reward[localeKey]}
          </span>
          {/* Changed to text-center for consistency with content */}
        </div>
        {itemInfo.used_in_crafts.map((craft) => (
          <div className="flex flex-col gap-4 py-4 px-4 rounded-lg hover:bg-secondary transition-colors items-start border-b border-border last:border-b-0 md:grid md:grid-cols-4 md:items-center">
            {/* Requirement Section */}
            <div className="w-full">
              {/* Mobile Layout for Requirement */}
              <div className="flex items-center gap-2 md:hidden">
                <span className="font-bold text-base text-foreground flex-shrink-0">
                  {itemRelatedInfo.requirement[localeKey]}:
                </span>
                <div className="flex items-center gap-2">
                  {getStationSVG(
                    craft.master_id,
                    40,
                    40,
                    getMaxSuffix(parseInt(craft.level_id.split("-")[1], 10))
                  )}
                </div>
              </div>
              {/* Desktop Layout for Requirement */}
              <div className="hidden md:block">
                <div className="flex items-center gap-3">
                  {getStationSVG(
                    craft.master_id,
                    40,
                    40,
                    getMaxSuffix(parseInt(craft.level_id.split("-")[1], 10))
                  )}
                  <div>
                    <div className="font-medium text-base text-foreground">
                      {craft.master_name[localeKey]}
                    </div>
                    <Badge className="text-xs px-2 py-0.5 rounded-md bg-secondary/20 text-secondary-foreground mt-1">
                      LV {craft.level}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>

            {/* Materials Section */}
            <div className="w-full">
              {/* Mobile Layout for Materials */}
              <div className="flex flex-col gap-2 md:hidden">
                <span className="font-bold text-base text-foreground flex-shrink-0">
                  {itemRelatedInfo.material[localeKey]}:
                </span>{" "}
                {/* Increased font size and weight */}
                <div className="space-y-2 max-h-24 overflow-y-auto pr-2 w-full">
                  {/* Added max-h and overflow for mobile */}
                  {craft.req_item.map((reqItem, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm flex-nowrap"
                    >
                      <div className="w-14 h-14 rounded-md flex items-center justify-center flex-shrink-0">
                        <Image
                          src={reqItem.item.gridImageLink}
                          alt={reqItem.item.name_en}
                          width={32}
                          height={32}
                          className="w-14 h-14 object-contain rounded-lg"
                        />
                      </div>
                      <span className="text-xs text-muted-foreground flex-grow-0">
                        {reqItem.item[getOtherLocalizedKey(localeKey)]}
                      </span>
                      <span className="text-xs font-semibold text-primary flex-shrink-0">
                        x {reqItem.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Desktop Layout for Materials */}
              <div className="hidden md:block space-y-2 max-h-40 overflow-y-auto pr-2 w-full">
                {craft.req_item.map((reqItem, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm flex-nowrap"
                  >
                    <div className="w-14 h-14 rounded-md  flex items-center justify-center flex-shrink-0">
                      <Image
                        src={reqItem.item.gridImageLink}
                        alt={reqItem.item.name_en}
                        width={40}
                        height={40}
                        className="w-14 h-14 object-contain rounded-lg"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground flex-grow-0">
                      {reqItem.item[getOtherLocalizedKey(localeKey)]}
                    </span>
                    <span className="text-xs font-semibold text-primary flex-shrink-0">
                      x {reqItem.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Section */}
            <div className="w-full">
              {/* Mobile Layout for Time */}
              <div className="flex items-center gap-2 md:hidden">
                <span className="font-bold text-base text-foreground flex-shrink-0">
                  {itemRelatedInfo.time[localeKey]}:
                </span>
                {/* Increased font size and weight */}
                <span className="text-sm font-bold text-foreground">
                  {changeTime(craft.duration)}
                </span>
              </div>
              {/* Desktop Layout for Time */}
              <div className="hidden md:block flex flex-col items-center justify-center w-full md:mt-0 text-center">
                <ArrowRight className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-base font-bold text-foreground">
                  {changeTime(craft.duration)}
                </span>
              </div>
            </div>

            {/* Reward Section */}
            <div className="w-full">
              {/* Mobile Layout for Reward */}
              <div className="flex items-center gap-2 md:hidden">
                <span className="font-bold text-base text-foreground flex-shrink-0">
                  {itemRelatedInfo.reward[localeKey]}:
                </span>{" "}
                {/* Increased font size and weight */}
                <div className="flex items-center gap-2">
                  <div className="w-14 h-14 rounded-md flex items-center justify-center flex-shrink-0">
                    <Image
                      src={craft.image}
                      alt={craft.name.en}
                      width={32}
                      height={32}
                      className="w-14 h-14 object-contain rounded-lg"
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground flex-grow-0">
                    {craft.name[localeKey]}
                  </span>
                  <span className="text-xs font-semibold text-primary flex-shrink-0">
                    x {craft.quantity}
                  </span>
                </div>
              </div>
              {/* Desktop Layout for Reward */}
              <div className="hidden md:block flex items-center gap-2 justify-center w-full flex-nowrap md:mt-0">
                {" "}
                {/* Changed justify-end to justify-center */}
                <div className="w-14 h-14 rounded-md flex items-center justify-center flex-shrink-0">
                  <Image
                    src={craft.image}
                    alt={craft.name.en}
                    width={40}
                    height={40}
                    className="w-14 h-14 object-contain rounded-lg"
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground flex-grow-0">
                  {craft.name[localeKey]}
                </span>
                <span className="text-sm font-semibold text-primary flex-shrink-0">
                  &nbsp;x {craft.quantity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
