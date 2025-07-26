"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { price18N } from "@/lib/consts/i18nConsts";
import { PriceTableTypes } from "../price.types";
import PriceTablePC from "./price-table-pc";
import PriceTableM from "./price-table-m";

export default function PriceTable({
  items,
  priceType,
  setSelectItem,
  selectItem,
  hasNextPage,
  fetchNextPage,
  word,
}: PriceTableTypes) {
  const { theme } = useTheme();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <Card
      className={`${
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
          <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
          {price18N.checkLatestPriceAfterClick[localeKey]}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 sm:p-6">
        {/* Mobile Card Layout */}
        <PriceTableM
          items={items}
          priceType={priceType}
          setSelectItem={setSelectItem}
          selectItem={selectItem}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          word={word}
        />
        {/* Desktop Table Layout */}
        <PriceTablePC
          items={items}
          priceType={priceType}
          setSelectItem={setSelectItem}
          selectItem={selectItem}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          word={word}
        />
      </CardContent>
    </Card>
  );
}
