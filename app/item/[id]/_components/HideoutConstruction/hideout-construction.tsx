import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { HideoutConstructionTypes } from "../item.types";
import { Badge } from "@/components/ui/badge";
import { itemRelatedInfo } from "@/lib/consts/i18nConsts";
import Image from "next/image";
import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import { getMaxSuffix } from "@/lib/func/jsxfunction";

export default function HideoutConstruction({
  itemInfo,
}: HideoutConstructionTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <Card className="rounded-xl shadow-lg border border-border">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-center text-foreground">
          {itemRelatedInfo.hideoutConstruction[localeKey]}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <div className="grid grid-cols-2 gap-4 py-3 px-4 rounded-lg font-semibold text-base mb-4 bg-secondary">
          <span>{itemRelatedInfo.hideout[localeKey]}</span>
          <span className="text-right">
            {itemRelatedInfo.material[localeKey]}
          </span>
        </div>

        <div className="space-y-3">
          {itemInfo.hideout_items.map((hideout) => (
            <div
              key={`hideout-${hideout.level_id}`}
              className="flex flex-col sm:grid sm:grid-cols-2 gap-4 py-3 px-4 rounded-lg hover:bg-secondary transition-colors items-start sm:items-center border-b border-border last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0`}
                >
                  <div
                    className={`w-8 h-8 rounded-md flex items-center justify-center`}
                  >
                    {getStationSVG(
                      hideout.master_id,
                      80,
                      80,
                      getMaxSuffix(parseInt(hideout.level_id.split("-")[1], 10))
                    )}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-base text-foreground">
                    {hideout.master_name[localeKey]}
                  </div>
                  <Badge className="text-xs px-2 py-0.5 rounded-md bg-secondary/20 text-secondary-foreground mt-1">
                    LV {parseInt(hideout.level_id.split("-")[1], 10)}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2 sm:mt-0 sm:justify-end w-full sm:w-auto flex-nowrap">
                <div className="w-20 h-20 rounded-md flex items-center justify-center flex-shrink-0">
                  <Image
                    src={hideout.image}
                    alt={hideout.name.en}
                    width={40}
                    height={40}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                </div>
                <span className="text-sm font-medium text-muted-foreground flex-grow-0">
                  {hideout.name[localeKey]}
                </span>
                <span className="text-sm font-semibold text-primary flex-shrink-0">
                  x {hideout.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
