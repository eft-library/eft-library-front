"use client";

import { Separator } from "@radix-ui/react-separator";
import { ChevronLeft, Calendar } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../../ui/card";
import type { InformationDetailTypes } from "./information.types";
import Link from "next/link";
import { newsI18N } from "@/lib/consts/i18nConsts";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { returnBadgeColor } from "@/lib/func/jsxfunction";
import { formatISODate } from "@/lib/func/formatTime";
import { Badge } from "../../ui/badge";
import ViewWrapper from "../ViewWrapper/view-wrapper";
import AdBanner from "../Adsense/ad-banner";

export default function InformationDetail({
  informationInfo,
  routeLink,
  title,
}: InformationDetailTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <ViewWrapper>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Link href={`${routeLink}?id=1`}>
            <Button
              variant="ghost"
              className="mb-6 font-semibold cursor-pointer text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {newsI18N.list[localeKey]}
            </Button>
          </Link>

          <Card className="bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-4">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={returnBadgeColor(routeLink)}>
                      {title}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2 text-gray-900 dark:text-white">
                    {informationInfo.information.name[localeKey]}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <span>EFT Library</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatISODate(informationInfo.information.update_time)}
                      </span>
                    </div>
                    {/* <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>
                      {notices.find((n) => n.id === selectedNotice)?.views?.toLocaleString()}
                    </span>
                  </div> */}
                  </div>
                </div>
              </div>
            </CardHeader>

            <Separator className="bg-gray-200 dark:bg-gray-700" />

            <CardContent className="pt-6">
              <div
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{
                  __html: informationInfo.information.description[localeKey],
                }}
              />
            </CardContent>
          </Card>

          <AdBanner
            dataAdFormat={"auto"}
            dataFullWidthResponsive={true}
            dataAdSlot="2690838054"
            maxWidth={1220}
          />
          {/* 다른 공지사항 목록 */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              {title}
            </h3>
            <div className="grid gap-3">
              {informationInfo.information_group.map((item) => (
                <Link href={`${routeLink}/detail/${item.id}`} key={item.id}>
                  <Card className="cursor-pointer transition-all duration-200 hover:shadow-md bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:dark:bg-gray-750">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              className={`text-xs ${returnBadgeColor(
                                routeLink,
                              )}`}
                            >
                              {title}
                            </Badge>
                          </div>
                          <h4 className="font-semibold mb-1 text-gray-900 dark:text-white">
                            {item.name[localeKey]}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                            <span>EFT Library</span>
                            <span>{formatISODate(item.update_time)}</span>
                            {/* <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{notice.views.toLocaleString()}</span>
                          </div> */}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ViewWrapper>
  );
}
