"use client";

import type { InformationTypes } from "./information/information.types";
import { Eye } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Link from "next/link";
import { useTheme } from "next-themes";
import { getFirstParagraph } from "@/lib/func/jsxfunction";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { formatISODate } from "@/lib/func/formatTime";
import { Badge } from "../ui/badge";

export default function Information({
  informationData,
  routeLink,
  title,
  badgeColor,
}: InformationTypes) {
  const { theme } = useTheme();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div
      className={`min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-gray-50`}
    >
      <div className="container mx-auto px-4 py-8">
        <div>
          <h1
            className={`text-xl font-semibold mb-4 text-gray-900 dark:text-white`}
          >
            {title}
          </h1>
          <div className="grid gap-4">
            {informationData.data.map((item) => (
              <Link key={item.id} href={`${routeLink}/detail/${item.id}`}>
                <Card
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                      : "bg-white border-gray-200 hover:shadow-md"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={badgeColor}>{title}</Badge>
                        </div>
                        <h3
                          className={`text-lg font-semibold mb-2 ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item.name[localeKey]}
                        </h3>
                        <p
                          className={`text-sm mb-3 line-clamp-2 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <div
                            className={
                              "truncate text-base font-semibold text-white"
                            }
                            dangerouslySetInnerHTML={{
                              __html: getFirstParagraph(
                                item.description[localeKey]
                              ),
                            }}
                          ></div>
                        </p>
                        <div
                          className={`flex items-center gap-4 text-sm ${
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
