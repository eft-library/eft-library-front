import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, MoveRight } from "lucide-react";
import { useTheme } from "next-themes";
import dayjs from "dayjs";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import type { PriceChartTypes } from "../price.types";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { price18N } from "@/lib/consts/i18nConsts";
import { calcChangeRate } from "@/lib/func/jsxfunction";

export default function PriceChart({ item, priceType }: PriceChartTypes) {
  const { theme } = useTheme();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  if (!item) return null;

  const { raw, formatted } = calcChangeRate(item, priceType);
  const textClass =
    raw > 0
      ? "text-green-500"
      : raw < 0
      ? "text-red-500"
      : "dark:text-white text-gray-900";

  return (
    <Card className="mb-6 sm:mb-8 bg-white border border-gray-200 dark:bg-gray-800/30 dark:border-gray-700/50">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="text-lg sm:text-xl dark:text-white text-gray-900">
            {item.name[localeKey]}
          </CardTitle>
          <div className="flex items-center gap-2">
            {raw > 0 ? (
              <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            ) : raw < 0 ? (
              <TrendingDown className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
            ) : (
              <MoveRight className="h-4 w-4 sm:h-5 sm:w-5 dark:text-white text-gray-900" />
            )}
            <span className={`font-semibold text-sm sm:text-base ${textClass}`}>
              {formatted}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-48 sm:h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={
                priceType === "PVP"
                  ? item.history_by_type.pvp
                  : item.history_by_type.pve
              }
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={theme === "dark" ? "#374151" : "#E5E7EB"}
                opacity={0.5}
              />
              <XAxis
                dataKey="price_time"
                tick={{
                  fill: theme === "dark" ? "#9CA3AF" : "#6B7280",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: string) =>
                  dayjs(value).format("MM/DD HH:mm")
                }
              />
              <YAxis
                tick={{
                  fill: theme === "dark" ? "#9CA3AF" : "#6B7280",
                  fontSize: 12,
                }}
                tickFormatter={(value) => value.toLocaleString()}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
                  border: `1px solid ${
                    theme === "dark" ? "#475569" : "#e2e8f0"
                  }`,
                  borderRadius: "8px",
                  color: theme === "dark" ? "#ffffff" : "#1f2937",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                labelStyle={{
                  color: theme === "dark" ? "#ffffff" : "#1f2937",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
                itemStyle={{
                  color: "#F97316",
                  fontWeight: "bold",
                }}
                formatter={(value) => [
                  `${(value ?? 0).toLocaleString()} ₽`,
                  price18N.fleaMarketPrice[localeKey],
                ]}
                labelFormatter={(label) =>
                  dayjs(label).format(`YYYY/MM/DD·HH:mm`)
                }
              />
              <Area
                type="monotone"
                dataKey="item_price"
                stroke="#F97316"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
