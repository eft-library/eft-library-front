"use client";

import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";
import { dashboardI18N } from "@/lib/consts/i18nConsts";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import DatePicker from "react-datepicker";
import {
  getDefaultDates,
  getMethodColor,
  getYesterday,
} from "@/lib/func/jsxfunction";
import { ChartData } from "./dashboard.types";
import { useEffect, useState } from "react";
import Loading from "@/components/custom/Loading/loading";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import TotalRequestCard from "./TotalRequestCard/total-request-card";
import TopEndpointsChart from "./TopEndPointsChart/top-end-points-chart";
import HourlyDistributionChart from "./HourlyDistributionChart/hourly-distribution-chart";
import StatusCard from "./StatusCard/status-card";
import HealthCheck from "./HealthCheck/health-check";

export default function DashboardView() {
  const { start, end } = getDefaultDates();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<ChartData>();
  const [startDate, setStartDate] = useState<Date | null>(start);
  const [endDate, setEndDate] = useState<Date | null>(end);
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const getChartData = async (start: Date, end: Date) => {
    try {
      setLoading(true);

      const formatDate = (date: Date, isEnd = false) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const time = isEnd ? "23:59:59" : "00:00:00";
        return `${yyyy}-${mm}-${dd} ${time}`;
      };

      const startStr = formatDate(start); // 00:00:00
      const endStr = formatDate(end, true); // 23:59:59

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

  useEffect(() => {
    if (startDate && endDate) {
      getChartData(startDate, endDate);
    }
  }, [startDate, endDate]);

  if (!chartData) return <Loading />;

  return (
    <ViewWrapper>
      <div className="container mx-auto px-4 py-4 sm:py-8 space-y-6 sm:space-y-8 max-w-7xl">
        <div className="text-center mb-4">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2 dark:text-white text-gray-900">
            {dashboardI18N.pageStats[localeKey]}
          </h1>

          {/* here */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-end gap-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-black dark:text-white font-bold">
                시작일:
              </span>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                className="
                  text-black dark:text-white
                  px-2 py-1
                  rounded
                  border border-gray-300 dark:border-gray-600
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  hover:border-blue-400 dark:hover:border-blue-400
                  bg-white dark:bg-gray-800
                  transition
                "
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
              <span className="text-black dark:text-white font-bold">
                종료일:
              </span>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => setEndDate(date ?? null)}
                dateFormat="yyyy-MM-dd"
                className="
                  text-black dark:text-white
                  px-2 py-1
                  rounded
                  border border-gray-300 dark:border-gray-600
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                  hover:border-blue-400 dark:hover:border-blue-400
                  bg-white dark:bg-gray-800
                  transition
                "
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
            <HealthCheck health_check={chartData.health_check} />
          </div>
        </div>
      </div>
      {isLoading && <Loading />}
    </ViewWrapper>
  );
}
