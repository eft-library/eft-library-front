"use client";

import { Separator } from "@radix-ui/react-separator";
import { ChevronLeft, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import type { InformationDetailTypes } from "./information/information.types";
import Link from "next/link";
import { newsI18N } from "@/lib/consts/i18nConsts";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useTheme } from "next-themes";
import { returnBadgeColor } from "@/lib/func/jsxfunction";
import { formatISODate } from "@/lib/func/formatTime";
import { Badge } from "../ui/badge";

export default function InformationDetail({
  informationInfo,
  routeLink,
  title,
}: InformationDetailTypes) {
  const { theme } = useTheme();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Link href={`${routeLink}?id=1`}>
          <Button
            variant="ghost"
            className={`mb-6 font-semibold cursor-pointer ${
              theme === "dark"
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            {newsI18N.list[localeKey]}
          </Button>
        </Link>

        <Card
          className={`${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={returnBadgeColor(routeLink)}>{title}</Badge>
                </div>
                <CardTitle
                  className={`text-2xl mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {informationInfo.information.name[localeKey]}
                </CardTitle>
                <div
                  className={`flex items-center gap-4 text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
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
                    {notices
                      .find((n) => n.id === selectedNotice)
                      ?.views?.toLocaleString()}
                  </span>
                </div> */}
                </div>
              </div>
            </div>
          </CardHeader>
          <Separator
            className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"}
          />
          <CardContent className="pt-6">
            <div
              className={`prose max-w-none ${
                theme === "dark" ? "prose-invert" : ""
              }`}
              dangerouslySetInnerHTML={{
                __html: `${informationInfo.information.description[localeKey]}`,
              }}
            />
          </CardContent>
        </Card>

        {/* 다른 공지사항 목록 */}
        <div className="mt-8">
          <h3
            className={`text-xl font-semibold mb-4 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h3>
          <div className="grid gap-3">
            {informationInfo.information_group.map((item) => (
              <Link href={`${routeLink}/detail/${item.id}`} key={item.id}>
                <Card
                  key={item.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                      : "bg-white border-gray-200 hover:shadow-sm"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            className={`text-xs ${returnBadgeColor(routeLink)}`}
                          >
                            {item.name[localeKey]}
                          </Badge>
                        </div>
                        <h4
                          className={`font-medium mb-1 ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.name[localeKey]}
                        </h4>
                        <div
                          className={`flex items-center gap-3 text-xs ${
                            theme === "dark" ? "text-gray-500" : "text-gray-500"
                          }`}
                        >
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
  );
}
