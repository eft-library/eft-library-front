import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import type { HideoutConstructionTypes } from "../item.types";
import { Badge } from "@/components/ui/badge";
import { itemRelatedInfo } from "@/lib/consts/i18nConsts";
import Image from "next/image";
import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import { getMaxSuffix } from "@/lib/func/jsxfunction";
import { Home } from "lucide-react";

export default function HideoutConstruction({
  itemInfo,
}: HideoutConstructionTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <Card className="rounded-xl shadow-lg border border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl font-bold text-center text-foreground flex items-center justify-center gap-2">
          <Home className="w-5 h-5 text-primary" />
          {itemRelatedInfo.hideoutConstruction[localeKey]}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-6">
        <div className="grid grid-cols-2 gap-2 sm:gap-4 py-2 sm:py-3 px-2 sm:px-4 rounded-lg font-semibold text-sm sm:text-base mb-4 bg-secondary">
          <span className="text-black dark:text-white">
            {itemRelatedInfo.hideout[localeKey]}
          </span>
          <span className="text-black dark:text-white">
            {itemRelatedInfo.material[localeKey]}
          </span>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {itemInfo.hideout_items.map((hideout, index) => (
            <div
              key={`hideout-${hideout.level_id}-${index}`}
              className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 py-3 px-3 sm:px-4 rounded-lg hover:bg-secondary transition-colors border-b border-border last:border-b-0 min-h-[80px] sm:min-h-[100px]"
            >
              {/* Hideout Info */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-md flex items-center justify-center flex-shrink-0 bg-secondary/30">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-md flex items-center justify-center">
                    {getStationSVG(
                      hideout.master_id,
                      80,
                      80,
                      getMaxSuffix(
                        Number.parseInt(hideout.level_id.split("-")[1], 10)
                      )
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-start sm:justify-start">
                  <div className="flex items-center justify-start sm:justify-start">
                    <span className="font-medium text-sm sm:text-base text-black dark:text-white text-left sm:text-left">
                      {hideout.master_name[localeKey]}
                    </span>
                  </div>
                  <div className="flex justify-start sm:justify-start mt-1">
                    <Badge
                      variant="outline"
                      className="text-xs px-2 py-0.5 rounded-md bg-secondary text-black dark:text-white"
                    >
                      LV {Number.parseInt(hideout.level_id.split("-")[1], 10)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Material Info */}
              <div className="flex items-center gap-2 mt-2 sm:mt-0 justify-start sm:justify-end">
                <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-md flex items-center justify-center flex-shrink-0 bg-secondary/30">
                  <Image
                    src={hideout.image || "/placeholder.svg"}
                    alt={hideout.name.en}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <span className="text-xs sm:text-sm font-medium text-black dark:text-white truncate">
                    {hideout.name[localeKey]}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-black dark:text-white flex-shrink-0 ml-1">
                    ×{hideout.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
