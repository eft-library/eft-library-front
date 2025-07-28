import { ExtractionsTransitsTypes } from "../map-of-tarkov.types";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { mapOfTarkovI18n } from "@/lib/consts/i18nConsts";
import { Card } from "@/components/ui/card";
import { Navigation2Icon, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import HtmlWithImage from "@/components/custom/HtmlWithImg/html-with-img";
import ImageView from "@/components/custom/ImageView/image-view";

export default function ExtractionsTransits({
  extractionsOrTransits,
  title,
}: ExtractionsTransitsTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const getFactionBadgeStyle = (faction: string) => {
    switch (faction) {
      case "ALL":
        return "bg-purple-600 text-white border-purple-500";
      case "PMC":
        return "bg-blue-600 text-white border-blue-500";
      case "Scav":
        return "bg-orange-600 text-white border-orange-500";
      default:
        return "bg-gray-600 text-white border-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 mb-6">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        <Navigation2Icon className="inline mr-2 h-5 w-5 text-orange-600 dark:text-orange-400" />
        {title}
      </h3>

      {/* Extract Table Header */}
      <Card className="bg-white border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700/50 mb-4">
        <div className="grid grid-cols-7 gap-2 text-center font-semibold text-sm text-gray-700 dark:text-white">
          <div>{mapOfTarkovI18n.photo[localeKey]}</div>
          <div>{mapOfTarkovI18n.name[localeKey]}</div>
          <div>{mapOfTarkovI18n.affiliation[localeKey]}</div>
          <div>{mapOfTarkovI18n.alwaysOpen[localeKey]}</div>
          <div>{mapOfTarkovI18n.oneTimeUse[localeKey]}</div>
          <div>{mapOfTarkovI18n.requirements[localeKey]}</div>
          <div>{mapOfTarkovI18n.tip[localeKey]}</div>
        </div>
      </Card>

      <div className="space-y-2">
        {extractionsOrTransits.map((extract, index) => (
          <Card
            key={index}
            className="bg-white border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700/50 transition-all"
          >
            <div className="p-2">
              <div className="grid grid-cols-7 gap-2 items-center text-sm">
                <div className="flex justify-center">
                  <ImageView
                    src={extract.image}
                    alt={extract.name.en}
                    popWidth={1600}
                    popHeight={900}
                    size="240px"
                    wrapWidth={240}
                    wrapHeight={130}
                  />
                </div>
                <div className="font-semibold text-center text-gray-900 dark:text-white">
                  {extract.name[localeKey]}
                </div>
                <div className="text-center">
                  <Badge
                    variant="secondary"
                    className={`${getFactionBadgeStyle(
                      extract.faction
                    )} font-medium`}
                  >
                    {extract.faction}
                  </Badge>
                </div>
                <div className="flex justify-center">
                  {extract.always_available ? (
                    <Check className="h-10 w-10 text-green-500" />
                  ) : (
                    <X className="h-10 w-10 text-red-500" />
                  )}
                </div>
                <div className="flex justify-center">
                  {extract.single_use ? (
                    <Check className="h-10 w-10 text-green-500" />
                  ) : (
                    <X className="h-10 w-10 text-red-500" />
                  )}
                </div>
                <div className="text-center text-gray-700 dark:text-white">
                  {extract.requirements?.[localeKey] ? (
                    <HtmlWithImage contents={extract.requirements[localeKey]} />
                  ) : (
                    <span>-</span>
                  )}
                </div>
                <div className="text-xs text-center text-gray-600 dark:text-white">
                  {extract.tip?.[localeKey] ? (
                    <HtmlWithImage contents={extract.tip[localeKey]} />
                  ) : (
                    <span>-</span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
