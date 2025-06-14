"use client";

import TotalRequestCard from "./totalRequestCard";
import TopEndpointsChart from "./topEndPointChart";
import HourlyDistributionChart from "./hourlyDistributionChart";
import { useEffect, useState } from "react";
import type { ChartData } from "./dashboardTypes";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import DatePicker from "react-datepicker";
import StatusCard from "./statusCard";
import Loading from "@/components/custom/loading/loading";

// ✅ 오늘 날짜와 일주일 전 날짜 구하는 유틸 함수
const getDefaultDates = () => {
  const end = new Date(); // 오늘
  const start = new Date();
  start.setDate(end.getDate() - 7); // 7일 전
  return { start, end };
};

export default function ApiDashboard() {
  const { start, end } = getDefaultDates();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<ChartData>();
  const [startDate, setStartDate] = useState<Date | null>(start);
  const [endDate, setEndDate] = useState<Date | null>(end);

  const getChartData = async (start: Date, end: Date) => {
    try {
      setLoading(true);
      const formatDate = (date: Date) =>
        `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")} 00:00:00`;

      const startStr = formatDate(start);
      const endStr = formatDate(end);

      const url = `${API_ENDPOINTS.GET_DASHBOARD_ANALYSIS}?start_date=${startStr}&end_date=${endStr}`;
      const data = await requestData(url);

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch chart data:",
          data?.msg || "Unknown error"
        );
        return;
      }

      setChartData(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // ✅ 초기 로딩 시에도 데이터 불러오도록 useEffect 한 번 실행
  useEffect(() => {
    if (startDate && endDate) {
      getChartData(startDate, endDate);
    }
  }, [startDate, endDate]);

  const getMethodColor = (method: string) => {
    const colors = {
      GET: "#34d399",
      POST: "#60a5fa",
    };
    return colors[method as keyof typeof colors] || "#9ca3af";
  };

  const getYesterday = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate()); // 시/분/초 제거
  };

  if (!chartData) return null;

  return (
    <div className="min-h-screen p-6">
      {isLoading && <Loading />}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-end gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">시작일:</span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date ?? null)}
            dateFormat="yyyy-MM-dd"
            className="text-black px-2 py-1 rounded"
            placeholderText="날짜 선택"
            maxDate={
              endDate
                ? new Date(
                    endDate.getFullYear(),
                    endDate.getMonth(),
                    endDate.getDate() - 1
                  )
                : undefined
            }
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white font-bold">종료일:</span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date ?? null)}
            dateFormat="yyyy-MM-dd"
            className="text-black px-2 py-1 rounded"
            placeholderText="날짜 선택"
            minDate={
              startDate
                ? new Date(
                    startDate.getFullYear(),
                    startDate.getMonth(),
                    startDate.getDate() + 1
                  )
                : undefined
            }
            maxDate={getYesterday()}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        <TotalRequestCard
          total_request={chartData.total_request}
          startDate={startDate}
          endDate={endDate}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TopEndpointsChart
            endpoint={chartData.endpoint}
            getMethodColor={getMethodColor}
          />
          <HourlyDistributionChart
            time_distribution={chartData.time_distribution}
          />
        </div>

        <StatusCard chartData={chartData} />
      </div>
    </div>
  );
}
