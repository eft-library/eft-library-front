import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Activity, BarChart as BarChartIcon } from "lucide-react";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import { dashboardI18N } from "@/lib/consts/i18nConsts";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { TopEndpointsChartTypes } from "../dashboard.types";

export default function TopEndpointsChart({
  endpoint,
  getMethodColor,
}: TopEndpointsChartTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const totalTopRequests = endpoint.reduce(
    (sum, item) => sum + item.request_count,
    0
  );

  return (
    <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700">
      <div className="p-6 pb-2">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <BarChartIcon className="h-5 w-5 text-blue-400" />
          <span>{dashboardI18N.top10Endpoints[localeKey]}</span>
        </h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-gray-300">
            {dashboardI18N.top10ApiEndpointsByRequest[localeKey]}
          </p>
          <div className="flex items-center space-x-2 bg-blue-900/30 px-3 py-1 rounded-lg border border-blue-700/50">
            <Activity className="h-4 w-4 text-blue-300" />
            <span className="text-sm font-semibold text-blue-300">
              {dashboardI18N.totalRequests[localeKey]}:
            </span>
            <span className="text-sm font-bold text-white">
              {totalTopRequests.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={endpoint}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#374151"
                horizontal={false}
              />
              <XAxis type="number" tick={{ fill: ALL_COLOR.White }} />
              <YAxis
                dataKey="link"
                type="category"
                tick={{ fill: ALL_COLOR.White, fontSize: 12 }}
                width={150}
                tickFormatter={(value) =>
                  value.length > 20 ? value.substring(0, 20) + "..." : value
                }
              />
              <Tooltip
                formatter={(value) => [
                  `${(value ?? 0).toLocaleString()} ${
                    dashboardI18N.request[localeKey]
                  }`,
                  "요청 수",
                ]}
                labelFormatter={(label) =>
                  `${dashboardI18N.endpoint[localeKey]}: ${label}`
                }
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "#ffffff",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                }}
              />
              <Bar
                dataKey="request_count"
                radius={[0, 4, 4, 0]}
                fill={ALL_COLOR.CrystalBlue}
              >
                {endpoint.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={getMethodColor(entry.request)}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 범례 */}
        <div className="flex flex-wrap gap-3 mt-4">
          {["GET", "POST"].map((method) => (
            <div
              key={method}
              className="flex items-center space-x-2 bg-gray-700/50 px-3 py-1 rounded-lg border border-gray-600"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: getMethodColor(method),
                  boxShadow: `0 0 10px ${getMethodColor(method)}40`,
                }}
              />
              <span className="text-sm text-gray-300">{method}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
