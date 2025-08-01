import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import InfiniteScroll from "react-infinite-scroll-component";
import { price18N } from "@/lib/consts/i18nConsts";
import type { PriceTablePCTypes } from "../price.types";
import Image from "next/image";
import {
  calcChangeRate,
  findExpensiveTrader,
  findFleaMarketPrice,
} from "@/lib/func/jsxfunction";
import { Badge } from "@/components/ui/badge";
import Highlighter from "react-highlight-words";

export default function PriceTablePC({
  items,
  fetchNextPage,
  hasNextPage,
  priceType,
  setSelectItem,
  selectItem,
  word,
}: PriceTablePCTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <>
      <div className="hidden sm:block">
        <InfiniteScroll
          dataLength={items.length}
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={null}
          height={500}
          scrollThreshold={0.9}
          className="overflow-auto"
        >
          <table className="w-full table-fixed min-w-[800px]">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800">
                <th className="text-center py-3 px-3 w-32 text-gray-700 dark:text-slate-300">
                  {price18N.image[localeKey]}
                </th>
                <th className="text-left py-3 px-3 text-gray-700 dark:text-slate-300">
                  {price18N.name[localeKey]}
                </th>
                <th className="text-left py-3 px-3 w-36 text-gray-700 dark:text-slate-300">
                  {price18N.traderPrice[localeKey]}
                </th>
                <th className="text-left py-3 px-3 w-36 text-gray-700 dark:text-slate-300">
                  {price18N.fleaMarketPrice[localeKey]}
                </th>
                <th className="text-left py-3 px-3 w-28 text-gray-700 dark:text-slate-300">
                  {price18N.changeRate[localeKey]}
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const isSelected = selectItem?.id === item.id;
                const baseRowClasses =
                  "border-b cursor-pointer transition-colors border-gray-200/50 hover:bg-gray-50";
                const darkRowClasses =
                  "dark:border-slate-700/50 dark:hover:bg-slate-700/30";
                const selectedClasses = isSelected
                  ? "bg-gray-100 border-gray-200/50 dark:bg-slate-700/50 dark:border-slate-700/50"
                  : "";

                return (
                  <tr
                    key={`price-table-${item.id}-${index}`}
                    className={`${baseRowClasses} ${darkRowClasses} ${selectedClasses}`}
                    onClick={() => setSelectItem(item)}
                  >
                    <td className="py-4 px-3">
                      <div className="relative w-24 h-16 mx-auto">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name.en}
                          fill
                          className="rounded object-contain bg-gray-200 dark:bg-slate-700"
                          sizes="96px"
                        />
                      </div>
                    </td>
                    <td
                      className="py-4 px-3 font-semibold leading-tight text-gray-900 dark:text-white"
                      title={item.name[localeKey]}
                    >
                      <Highlighter
                        highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                        searchWords={[word]}
                        autoEscape
                        textToHighlight={item.name[localeKey]}
                      />
                    </td>
                    <td className="py-4 px-3">
                      <span className="font-semibold text-orange-400 whitespace-nowrap">
                        {priceType === "PVE"
                          ? findExpensiveTrader(item.trader.pve_trader)
                          : findExpensiveTrader(item.trader.pvp_trader)}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-green-500 font-semibold whitespace-nowrap">
                        {priceType === "PVE"
                          ? findFleaMarketPrice(item.trader.pve_trader)
                          : findFleaMarketPrice(item.trader.pvp_trader)}
                      </span>
                    </td>
                    <td className="py-4 px-3">
                      {(() => {
                        const { raw, formatted } = calcChangeRate(
                          item,
                          priceType
                        );
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
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>
    </>
  );
}
