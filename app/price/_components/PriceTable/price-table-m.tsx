"use client";

import { Badge } from "@/components/ui/badge";
import InfiniteScroll from "react-infinite-scroll-component";
import Image from "next/image";
import type { PriceTableMTypes } from "../price.types";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import {
  calcChangeRate,
  findExpensiveTrader,
  findFleaMarketPrice,
} from "@/lib/func/jsxfunction";

export default function PriceTableM({
  items,
  fetchNextPage,
  hasNextPage,
  priceType,
  setSelectItem,
  selectItem,
}: PriceTableMTypes) {
  const { theme } = useTheme();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="block sm:hidden">
      <InfiniteScroll
        dataLength={items.length}
        next={fetchNextPage}
        hasMore={hasNextPage}
        loader={null}
        height={600}
        scrollThreshold={0.9}
        className="overflow-auto"
      >
        {items.map((item, index) => (
          <div
            key={`price-table-m-${item.id}-${index}`}
            className={`p-4 border-b ${
              theme === "dark" ? "border-slate-700/50" : "border-gray-200/50"
            } last:border-b-0 cursor-pointer transition-colors ${
              selectItem?.id === item.id
                ? theme === "dark"
                  ? "bg-slate-700/50"
                  : "bg-gray-100"
                : theme === "dark"
                ? "hover:bg-slate-700/30"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectItem(item)}
          >
            <div className="flex items-start gap-3">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name.en}
                width={48}
                height={48}
                className={`w-12 h-12 rounded ${
                  theme === "dark" ? "bg-slate-700" : "bg-gray-200"
                } flex-shrink-0`}
              />
              <div className="flex-1 min-w-0">
                <div
                  className={`font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  } text-sm leading-tight`}
                >
                  {item.name[localeKey]}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex flex-col gap-1">
                    <div className="text-xs text-orange-400 font-medium">
                      {priceType === "PVE"
                        ? findExpensiveTrader(item.trader.pve_trader)
                        : findExpensiveTrader(item.trader.pvp_trader)}
                    </div>
                    <div className="text-xs text-green-500 font-medium">
                      {priceType === "PVE"
                        ? findFleaMarketPrice(item.trader.pve_trader)
                        : findFleaMarketPrice(item.trader.pvp_trader)}
                    </div>
                  </div>
                  {(() => {
                    const { raw, formatted } = calcChangeRate(item, priceType);
                    const badgeClass =
                      raw > 0
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : raw < 0
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-gray-400 hover:bg-gray-500 text-white";
                    return (
                      <Badge
                        variant="default"
                        className={`text-xs ${badgeClass}`}
                      >
                        {formatted}
                      </Badge>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
