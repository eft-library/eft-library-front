import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight, Hammer, Package, Clock, Award } from "lucide-react";
import Image from "next/image";
import type { HideoutCraftingTypes } from "../item.types";
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
    <Card className="rounded-xl shadow-lg border border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl font-bold text-center text-foreground flex items-center justify-center gap-2">
          <Hammer className="w-5 h-5 text-primary" />
          {itemRelatedInfo.hideoutCrafting[localeKey]}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-6">
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
        </div>

        {itemInfo.used_in_crafts.map((craft, index) => (
          <div
            key={`craft-${craft.id}-${index}`}
            className="flex flex-col gap-3 sm:gap-4 py-3 sm:py-4 px-3 sm:px-4 rounded-lg hover:bg-secondary transition-colors items-start border-b border-border last:border-b-0 md:grid md:grid-cols-4 md:items-center"
          >
            {/* Requirement Section */}
            <div className="w-full">
              {/* Mobile Layout for Requirement */}
              <div className="flex items-center gap-2 md:hidden">
                <Hammer className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-semibold text-sm text-foreground flex-shrink-0">
                  {itemRelatedInfo.requirement[localeKey]}:
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center bg-secondary/30">
                    {getStationSVG(
                      craft.master_id,
                      32,
                      32,
                      getMaxSuffix(
                        Number.parseInt(craft.level_id.split("-")[1], 10)
                      )
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-foreground truncate">
                      {craft.master_name[localeKey]}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-xs px-1 py-0 rounded-sm bg-secondary text-secondary-foreground"
                    >
                      LV {craft.level}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Desktop Layout for Requirement */}
              <div className="hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md flex items-center justify-center bg-secondary/30">
                    {getStationSVG(
                      craft.master_id,
                      40,
                      40,
                      getMaxSuffix(
                        Number.parseInt(craft.level_id.split("-")[1], 10)
                      )
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-base text-foreground">
                      {craft.master_name[localeKey]}
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground mt-1"
                    >
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
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-semibold text-sm text-foreground flex-shrink-0">
                    {itemRelatedInfo.material[localeKey]}:
                  </span>
                </div>
                <div className="space-y-1 max-h-20 overflow-y-auto pr-1 w-full">
                  {craft.req_item.map((reqItem, index) => (
                    <div
                      key={`craft-${reqItem.item.id}-${index}`}
                      className="flex items-center gap-2 text-sm flex-nowrap"
                    >
                      <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 bg-secondary/30">
                        <Image
                          src={reqItem.item.gridImageLink || "/placeholder.svg"}
                          alt={reqItem.item.name_en}
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain rounded-lg"
                        />
                      </div>
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span className="text-xs text-black dark:text-white flex-1 truncate">
                          {reqItem.item[getOtherLocalizedKey(localeKey)]}
                        </span>
                        <span className="text-xs font-semibold text-black dark:text-white flex-shrink-0">
                          ×{reqItem.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop Layout for Materials */}
              <div className="hidden md:block space-y-2 max-h-40 overflow-y-auto pr-2 w-full">
                {craft.req_item.map((reqItem, index) => (
                  <div
                    key={`craft-${reqItem.item.id}-${index}-${index}`}
                    className="flex items-center gap-2 text-sm flex-nowrap"
                  >
                    <div className="w-14 h-14 rounded-md flex items-center justify-center flex-shrink-0 bg-secondary/30">
                      <Image
                        src={reqItem.item.gridImageLink || "/placeholder.svg"}
                        alt={reqItem.item.name_en}
                        width={40}
                        height={40}
                        className="w-14 h-14 object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-xs sm:text-sm font-medium text-black dark:text-white truncate">
                        {reqItem.item[getOtherLocalizedKey(localeKey)]}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-black dark:text-white flex-shrink-0 ml-1">
                        ×{reqItem.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Section */}
            <div className="w-full">
              {/* Mobile Layout for Time */}
              <div className="flex items-center gap-2 md:hidden">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-semibold text-sm text-black dark:text-white flex-shrink-0">
                  {itemRelatedInfo.time[localeKey]}:
                </span>
                <span className="text-sm font-semibold text-black dark:text-white">
                  {changeTime(craft.duration)}
                </span>
              </div>

              {/* Desktop Layout for Time */}
              <div className="hidden md:flex flex-col items-center justify-center w-full text-center">
                <ArrowRight className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-base font-bold text-black dark:text-white">
                  {changeTime(craft.duration)}
                </span>
              </div>
            </div>

            {/* Reward Section */}
            <div className="w-full">
              {/* Mobile Layout for Reward */}
              <div className="flex items-center gap-2 md:hidden">
                <Award className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-semibold text-sm text-black dark:text-white flex-shrink-0">
                  {itemRelatedInfo.reward[localeKey]}:
                </span>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 bg-secondary/30">
                    <Image
                      src={craft.image || "/placeholder.svg"}
                      alt={craft.name.en}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-xs sm:text-sm font-medium text-black dark:text-white truncate">
                      {craft.name[localeKey]}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-black dark:text-white flex-shrink-0 ml-1">
                      ×{craft.quantity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Desktop Layout for Reward */}
              <div className="hidden md:flex items-center gap-2 justify-center w-full flex-nowrap">
                <div className="w-20 h-20 rounded-md flex items-center justify-center flex-shrink-0 bg-secondary/30">
                  <Image
                    src={craft.image || "/placeholder.svg"}
                    alt={craft.name.en}
                    width={40}
                    height={40}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-xs sm:text-sm font-medium text-black dark:text-white truncate">
                    {craft.name[localeKey]}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-black dark:text-white flex-shrink-0 ml-1">
                    ×{craft.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
