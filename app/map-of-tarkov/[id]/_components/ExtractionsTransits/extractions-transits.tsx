import { ExtractionsTransitsTypes } from "../map-of-tarkov.types";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { mapOfTarkovI18n } from "@/lib/consts/i18nConsts";
import { Card } from "@/components/ui/card";
import {
  Navigation2Icon,
  Check,
  X,
  Clock,
  Lightbulb,
  Repeat,
  Shield,
  Tag,
  Clipboard,
} from "lucide-react";
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
    <div className="mb-12">
      <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
        <Navigation2Icon className="inline mr-2 h-5 w-5 text-orange-600 dark:text-orange-400" />
        {title}
      </h3>

      {/* Extract Table Header */}
      <Card className="bg-white border-gray-200 shadow-sm dark:bg-[#1e2124] dark:border-gray-700 mb-4">
        <div className="p-4 hidden md:block">
          {/* Hidden on mobile */}
          <div className="grid grid-cols-7 gap-4 text-center font-semibold text-sm text-gray-700 dark:text-gray-300">
            <div>{mapOfTarkovI18n.photo[localeKey]}</div>
            <div>{mapOfTarkovI18n.name[localeKey]}</div>
            <div>{mapOfTarkovI18n.affiliation[localeKey]}</div>
            <div>{mapOfTarkovI18n.alwaysOpen[localeKey]}</div>
            <div>{mapOfTarkovI18n.oneTimeUse[localeKey]}</div>
            <div>{mapOfTarkovI18n.requirements[localeKey]}</div>
            <div>{mapOfTarkovI18n.tip[localeKey]}</div>
          </div>
        </div>
      </Card>

      {/* Extract Points Cards */}
      <div className="space-y-3">
        {extractionsOrTransits.map((extract, index) => (
          <Card
            key={`extract-${extract.id}-${index}`}
            className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-all dark:bg-[#1e2124] dark:border-gray-700 dark:hover:bg-[#2a2d35]"
          >
            <div className="p-4">
              {/* Mobile Layout */}
              <div className="flex flex-col space-y-3 md:hidden">
                <div className="flex justify-center mb-2">
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
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                  {/* 이름 */}
                  <div className="flex items-center font-semibold text-gray-900 dark:text-white">
                    <Tag className="h-4 w-4 mr-2 text-orange-400" />
                    {mapOfTarkovI18n.name[localeKey]}:
                  </div>
                  <div className="font-semibold text-right text-gray-900 dark:text-white">
                    {extract.name[localeKey]}
                  </div>

                  {/* 진영 */}
                  <div className="flex items-center font-semibold text-gray-900 dark:text-white">
                    <Shield className="h-4 w-4 mr-2 text-orange-400" />
                    {mapOfTarkovI18n.affiliation[localeKey]}:
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="secondary"
                      className={`${getFactionBadgeStyle(
                        extract.faction
                      )} font-medium`}
                    >
                      {extract.faction}
                    </Badge>
                  </div>

                  {/* 항상 열림 */}
                  <div className="flex items-center font-semibold text-gray-900 dark:text-white">
                    <Clock className="h-4 w-4 mr-2 text-orange-400" />
                    {mapOfTarkovI18n.alwaysOpen[localeKey]}:
                  </div>
                  <div className="flex justify-end">
                    {extract.always_available ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>

                  {/* 1회용 */}
                  <div className="flex items-center font-semibold text-gray-900 dark:text-white">
                    <Repeat className="h-4 w-4 mr-2 text-orange-400" />
                    {mapOfTarkovI18n.oneTimeUse[localeKey]}:
                  </div>
                  <div className="flex justify-end">
                    {extract.single_use ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 text-red-500" />
                    )}
                  </div>

                  {/* 요구 조건 */}
                  <div className="flex items-center font-semibold text-gray-900 dark:text-white">
                    <Clipboard className="h-4 w-4 mr-2 text-orange-400" />
                    {mapOfTarkovI18n.requirements[localeKey]}:
                  </div>
                  <div className="text-right text-gray-700 dark:text-gray-300">
                    {extract.requirements?.[localeKey] ? (
                      <HtmlWithImage
                        contents={extract.requirements[localeKey]}
                      />
                    ) : (
                      <span>-</span>
                    )}
                  </div>

                  {/* 팁 */}
                  <div className="flex items-center font-semibold text-gray-900 dark:text-white">
                    <Lightbulb className="h-4 w-4 mr-2 text-orange-400" />
                    {mapOfTarkovI18n.tip[localeKey]}:
                  </div>
                  <div className="text-right text-gray-600 dark:text-gray-400">
                    {extract.tip?.[localeKey] ? (
                      <HtmlWithImage contents={extract.tip[localeKey]} />
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:grid md:grid-cols-7 gap-4 items-center text-sm">
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
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex justify-center">
                  {extract.single_use ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="text-center text-gray-700 dark:text-gray-300">
                  {extract.requirements?.[localeKey] ? (
                    <HtmlWithImage contents={extract.requirements[localeKey]} />
                  ) : (
                    <span>-</span>
                  )}
                </div>
                <div className="text-xs text-center text-gray-600 dark:text-gray-400">
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
