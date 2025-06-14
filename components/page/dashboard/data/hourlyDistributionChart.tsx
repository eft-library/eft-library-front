import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Clock, TrendingUp } from "lucide-react";
import type { HourlyDistributionChart } from "./dashboardTypes";
import { ALL_COLOR } from "@/lib/consts/colorConsts";

export default function HourlyDistributionChart({
  time_distribution,
}: HourlyDistributionChart) {
  const maxRequestEntry = time_distribution.reduce((max, current) => {
    return current.requests > max.requests ? current : max;
  });
  return (
    <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700">
      <div className="p-6 pb-2">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <Clock className="h-5 w-5 text-green-400" />
          <span>시간대별 요청 분포</span>
        </h3>
        <p className="text-sm text-gray-300 mt-1">
          시간대별 API 요청 패턴 ({maxRequestEntry.time} 집중)
        </p>
      </div>
      <div className="p-6 pt-0 h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={time_distribution}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12, fill: ALL_COLOR.White }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fill: ALL_COLOR.White }} />
            <Tooltip
              formatter={(value) => [
                `${value.toLocaleString()} 요청`,
                "요청 수",
              ]}
              labelFormatter={(label) => `시간: ${label}`}
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#ffffff",
              }}
            />
            <Area
              type="monotone"
              dataKey="requests"
              stroke="#60a5fa"
              fillOpacity={1}
              fill="url(#colorRequests)"
            />
          </AreaChart>
        </ResponsiveContainer>
        {/* 피크 시간 정보 */}
        <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-700/50">
          <div className="flex items-center space-x-2 text-blue-300">
            <TrendingUp className="h-4 w-4" />
            <span className="font-medium">피크 시간대</span>
          </div>
          <p className="text-sm text-white mt-1">
            {maxRequestEntry.time} 에 요청이 집중되었습니다 (총
            {maxRequestEntry.requests.toLocaleString()} 요청)
          </p>
        </div>
      </div>
    </div>
  );
}
