"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import type { TraderPriceTypes } from "../price.types";
import { price18N } from "@/lib/consts/i18nConsts";

export default function TraderPrice({ item, priceType }: TraderPriceTypes) {
  const { theme } = useTheme();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <Card
      className={`mb-6 sm:mb-8 ${
        theme === "dark"
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-gray-200"
      }`}
    >
      <CardHeader>
        <CardTitle
          className={`flex items-center gap-2 text-lg sm:text-xl ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          <Users className="h-4 w-4 sm:h-5 sm:w-5" />
          {price18N.traderPrice[localeKey]}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-2 sm:gap-4">
          {traders.map((trader) => (
            <div key={trader.id} className="text-center">
              <div
                className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-1 sm:mb-2 rounded-full ${
                  theme === "dark" ? "bg-slate-700" : "bg-gray-200"
                } flex items-center justify-center overflow-hidden`}
              >
                <img
                  src={trader.avatar || "/placeholder.svg"}
                  alt={trader.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs sm:text-sm font-medium text-orange-400">
                {trader.price.toLocaleString()} ₽
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
