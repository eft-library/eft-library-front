"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
} from "recharts";
import { CalendarDays, TrendingUp, Clock, Activity } from "lucide-react";

export default function ApiDashboard() {
  // 샘플 데이터 - 실제 환경에서는 API에서 가져올 데이터
  const totalRequests = 2389098;

  // 상위 10개 엔드포인트 데이터
  const topEndpoints = [
    { endpoint: "GET /api/users", requests: 45230, method: "GET" },
    { endpoint: "POST /api/auth/login", requests: 38920, method: "POST" },
    { endpoint: "GET /api/products", requests: 32150, method: "GET" },
    { endpoint: "PUT /api/users/:id", requests: 28340, method: "PUT" },
    { endpoint: "GET /api/orders", requests: 25680, method: "GET" },
    { endpoint: "POST /api/orders", requests: 22190, method: "POST" },
    { endpoint: "DELETE /api/users/:id", requests: 18750, method: "DELETE" },
    { endpoint: "GET /api/analytics", requests: 16420, method: "GET" },
    { endpoint: "POST /api/products", requests: 14380, method: "POST" },
    { endpoint: "GET /api/dashboard", requests: 12890, method: "GET" },
  ];

  // 시간대별 요청 분포 데이터 (01:15 ~ 01:17에 집중)
  const hourlyDistribution = [
    { time: "00:00", requests: 1200 },
    { time: "00:15", requests: 1100 },
    { time: "00:30", requests: 950 },
    { time: "00:45", requests: 800 },
    { time: "01:00", requests: 1500 },
    { time: "01:15", requests: 8900 }, // 집중 시간
    { time: "01:16", requests: 9200 }, // 집중 시간
    { time: "01:17", requests: 8700 }, // 집중 시간
    { time: "01:30", requests: 2100 },
    { time: "01:45", requests: 1800 },
    { time: "02:00", requests: 1600 },
    { time: "02:15", requests: 1400 },
    { time: "02:30", requests: 1200 },
    { time: "02:45", requests: 1000 },
    { time: "03:00", requests: 900 },
    { time: "03:15", requests: 800 },
    { time: "03:30", requests: 750 },
    { time: "03:45", requests: 700 },
    { time: "04:00", requests: 650 },
    { time: "04:15", requests: 600 },
    { time: "04:30", requests: 580 },
    { time: "04:45", requests: 560 },
    { time: "05:00", requests: 540 },
  ];

  // HTTP 메서드별 색상 매핑 (다크모드에 최적화된 밝은 색상)
  const getMethodColor = (method: string) => {
    const colors = {
      GET: "#34d399", // 더 밝은 초록
      POST: "#60a5fa", // 더 밝은 파랑
      PUT: "#fbbf24", // 더 밝은 주황
      DELETE: "#f87171", // 더 밝은 빨강
      PATCH: "#a78bfa", // 더 밝은 보라
    };
    return colors[method as keyof typeof colors] || "#9ca3af";
  };
  const totalTopRequests = topEndpoints.reduce(
    (sum, item) => sum + item.requests,
    0
  );

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">
            API 요청 분석 대시보드
          </h1>
          <p className="text-gray-300">실시간 API 요청 현황 및 통계</p>
        </div>

        {/* 총 요청수 - 상단 중앙 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg shadow-2xl border border-gray-700">
          <div className="p-8">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Activity className="h-8 w-8" />
                <span className="text-lg font-medium">총 요청수</span>
              </div>
              <div className="text-5xl font-bold">
                {totalRequests.toLocaleString()}
              </div>
              <div className="flex items-center justify-center space-x-4 text-sm opacity-90">
                <div className="flex items-center space-x-1">
                  <CalendarDays className="h-4 w-4" />
                  <span>지난 24시간</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>+12.5% 증가</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 상위 10개 엔드포인트 막대 차트 */}
          <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700">
            <div className="p-6 pb-2">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <BarChart className="h-5 w-5 text-blue-400" />
                <span>상위 10개 엔드포인트</span>
              </h3>

              {/* 상위 10개 총 요청수를 위로 이동 */}
              <div className="flex items-center justify-between mt-2">
                <p className="text-sm text-gray-300">
                  요청 수가 많은 상위 10개 API 엔드포인트
                </p>
                <div className="flex items-center space-x-2 bg-blue-900/30 px-3 py-1 rounded-lg border border-blue-700/50">
                  <Activity className="h-4 w-4 text-blue-300" />
                  <span className="text-sm font-medium text-blue-300">
                    총 요청수:
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
                    data={topEndpoints}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#374151"
                      horizontal={false}
                    />
                    <XAxis type="number" tick={{ fill: "#d1d5db" }} />
                    <YAxis
                      dataKey="endpoint"
                      type="category"
                      tick={{ fill: "#d1d5db", fontSize: 12 }}
                      width={150}
                      tickFormatter={(value) => {
                        // 엔드포인트 이름을 적절한 길이로 자르기
                        return value.length > 20
                          ? value.substring(0, 20) + "..."
                          : value;
                      }}
                    />
                    <Tooltip
                      formatter={(value) => [
                        `${value.toLocaleString()} 요청`,
                        "요청 수",
                      ]}
                      labelFormatter={(label) => `엔드포인트: ${label}`}
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#ffffff",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                      }}
                    />
                    <Bar
                      dataKey="requests"
                      radius={[0, 4, 4, 0]}
                      fill="#60a5fa"
                      background={{ fill: "#374151" }}
                      animationDuration={1500}
                    >
                      {topEndpoints.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getMethodColor(entry.method)}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* HTTP 메서드 범례 */}
              <div className="flex flex-wrap gap-3 mt-4">
                {["GET", "POST", "PUT", "DELETE"].map((method) => (
                  <div
                    key={method}
                    className="flex items-center space-x-2 bg-gray-700/50 px-3 py-1 rounded-lg border border-gray-600"
                  >
                    <div
                      className="w-3 h-3 rounded-full shadow-lg"
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

          {/* 시간대별 요청 분포 */}
          <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700">
            <div className="p-6 pb-2">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-400" />
                <span>시간대별 요청 분포</span>
              </h3>
              <p className="text-sm text-gray-300 mt-1">
                시간대별 API 요청 패턴 (01:15-01:17 집중)
              </p>
            </div>
            <div className="p-6 pt-0">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={hourlyDistribution}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorRequests"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#60a5fa"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#60a5fa"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="time"
                      tick={{ fontSize: 12, fill: "#d1d5db" }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fill: "#d1d5db" }} />
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
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="requests"
                      stroke="#60a5fa"
                      fillOpacity={1}
                      fill="url(#colorRequests)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* 피크 시간 정보 */}
              <div className="mt-4 p-3 bg-blue-900/30 rounded-lg border border-blue-700/50">
                <div className="flex items-center space-x-2 text-blue-300">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">피크 시간대</span>
                </div>
                <p className="text-sm text-blue-200 mt-1">
                  01:15 - 01:17 시간대에 요청이 집중되었습니다 (총 26,800 요청)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 추가 통계 정보 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 hover:border-green-500/50 transition-colors duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
                <span className="text-sm font-medium text-gray-300">
                  서버 통신 상태
                </span>
              </div>
              <div className="text-2xl font-bold text-green-400 mt-2">100%</div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 hover:border-blue-500/50 transition-colors duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                <span className="text-sm font-medium text-gray-300">
                  평균 응답시간
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-400 mt-2">645ms</div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 hover:border-yellow-500/50 transition-colors duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
                <span className="text-sm font-medium text-gray-300">
                  1일간 활성 사용자
                </span>
              </div>
              <div className="text-2xl font-bold text-yellow-400 mt-2">10</div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 hover:border-purple-500/50 transition-colors duration-300">
            <div className="p-6">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                <span className="text-sm font-medium text-gray-300">
                  총 사용자
                </span>
              </div>
              <div className="text-2xl font-bold text-purple-400 mt-2">600</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
