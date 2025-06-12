"use client";

import TotalRequestCard from "./totalRequestCard";
import TopEndpointsChart from "./topEndPointChart";
import HourlyDistributionChart from "./hourlyDistributionChart";
import { useEffect, useState } from "react";
import type { ChartData } from "./dashboardTypes";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";

export default function ApiDashboard() {
  const [chartData, setChartData] = useState<ChartData>();

  const getChartData = async () => {
    try {
      const data = await requestData(
        `${API_ENDPOINTS.GET_DASHBOARD_CHART}?start_date=2025-06-12 00:00:00&end_date=2025-06-13 00:00:00`
      );
      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch quest data:",
          data?.msg || "Unknown error"
        );
        return null;
      }
      setChartData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getChartData();
  }, []);

  // HTTP 메서드별 색상 매핑 (다크모드에 최적화된 밝은 색상)
  const getMethodColor = (method: string) => {
    const colors = {
      GET: "#34d399", // 더 밝은 초록
      POST: "#60a5fa", // 더 밝은 파랑
      // PUT: "#fbbf24", // 더 밝은 주황
      // DELETE: "#f87171", // 더 밝은 빨강
      // PATCH: "#a78bfa", // 더 밝은 보라
    };
    return colors[method as keyof typeof colors] || "#9ca3af";
  };

  if (!chartData) return null;

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
        <TotalRequestCard totalRequests={2389098} />

        {/* 차트 섹션 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 상위 10개 엔드포인트 막대 차트 */}
          <TopEndpointsChart
            endpoint={chartData.endpoint}
            getMethodColor={getMethodColor}
          />
          <HourlyDistributionChart
            time_distribution={chartData.time_distribution}
          />
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
