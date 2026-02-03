"use client";

import type { InformationTypes } from "./information.types";
import { Card, CardContent } from "../../ui/card";
import Link from "next/link";
import { getFirstParagraph, returnBadgeColor } from "@/lib/func/jsxfunction";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { formatISODate } from "@/lib/func/formatTime";
import { Badge } from "../../ui/badge";
import InformationSelector from "./information-selector";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { placeHolderText } from "@/lib/consts/i18nConsts";
import { useState } from "react";
import Highlighter from "react-highlight-words";
import CustomPagination from "../CustomPagination/custom-pagination";
import { useSearchParams } from "next/navigation";
import ViewWrapper from "../ViewWrapper/view-wrapper";
import AdBanner from "../Adsense/ad-banner";

export default function Information({
  informationData,
  routeLink,
  title,
}: InformationTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [word, setWord] = useState<string>("");
  const param = useSearchParams();

  return (
    <ViewWrapper>
      <div className="max-w-7xl mx-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl text-center font-bold mb-2 text-gray-900 dark:text-white">
              {title}
            </h1>
            <InformationSelector />

            <AdBanner
              dataAdFormat={"auto"}
              dataFullWidthResponsive={true}
              dataAdSlot="2690838054"
              maxWidth={1220}
            />
            <div className="mb-4 mt-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
                <Input
                  placeholder={placeHolderText.search[localeKey]}
                  value={word}
                  onChange={(e) => {
                    setWord(e.target.value);
                  }}
                  className="pl-10 bg-white border-gray-300 text-gray-900 placeholder-gray-400 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>
            <div className="grid gap-4">
              {informationData.data
                .filter((item) =>
                  item.name[localeKey]
                    .toLowerCase()
                    .includes(word.toLowerCase()),
                )
                .map((item) => (
                  <Link key={item.id} href={`${routeLink}/detail/${item.id}`}>
                    <Card className="cursor-pointer transition-all duration-200 hover:shadow-lg bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:dark:bg-gray-750">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={returnBadgeColor(routeLink)}>
                                {title}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                              <Highlighter
                                highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                                searchWords={[word]}
                                autoEscape
                                textToHighlight={item.name[localeKey]}
                              />
                            </h3>
                            <div
                              className="text-sm mb-3 line-clamp-2 text-gray-600 dark:text-gray-400"
                              dangerouslySetInnerHTML={{
                                __html: getFirstParagraph(
                                  item.description[localeKey],
                                ),
                              }}
                            />
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <span>EFT Library</span>
                              <span>{formatISODate(item.update_time)}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>

          {!word && (
            <CustomPagination
              total={informationData.max_pages}
              routeLink={`${routeLink}?id=`}
              currentPage={Number(param.get("id"))}
            />
          )}
        </div>
      </div>
    </ViewWrapper>
  );
}
