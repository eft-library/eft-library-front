"use client";

import { useMemo, useState } from "react";

import { Temporal } from "@js-temporal/polyfill";
import {
  Activity,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock,
  Server,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { HorizontalAdBanner } from "@/components/shared/ad-banner";
import { getDashboardAnalysis } from "@/features/dashboard/api";
import type {
  DashboardAnalysisResponse,
  DashboardEndpointMetric,
} from "@/types/api/dashboard";

const methodColors: Record<string, string> = {
  GET: "#60a5fa",
  POST: "#34d399",
  PUT: "#f59e0b",
  PATCH: "#a78bfa",
  DELETE: "#f87171",
};

const chartTooltipStyle = {
  backgroundColor: "rgb(31 41 55)",
  border: "1px solid rgb(55 65 81)",
  borderRadius: "8px",
  color: "#ffffff",
} as const;

const chartTooltipLabelStyle = {
  color: "#f9fafb",
  fontWeight: 700,
} as const;

const chartTooltipItemStyle = {
  color: "#f3f4f6",
} as const;

function getMethodColor(method?: string) {
  return methodColors[(method ?? "GET").toUpperCase()] ?? "#94a3b8";
}

function numberFormat(value: number | undefined) {
  return (value ?? 0).toLocaleString();
}

function Panel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      {children}
    </section>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900/30 dark:text-gray-400">
      {label}
    </div>
  );
}

function TotalRequestCard({
  total,
  startDate,
  endDate,
}: {
  total: number;
  startDate: string;
  endDate: string;
}) {
  return (
    <section className="rounded-lg border border-blue-300/40 bg-linear-to-r from-blue-600 to-purple-700 text-white shadow-xl">
      <div className="space-y-2 p-8 text-center">
        <div className="flex items-center justify-center gap-2">
          <Activity className="h-8 w-8" />
          <span className="text-lg font-semibold">총 요청 수</span>
        </div>
        <div className="text-5xl font-bold">{total.toLocaleString()}</div>
        <div className="flex items-center justify-center gap-2 text-sm opacity-90">
          <CalendarDays className="h-4 w-4" />
          <span>
            {startDate} ~ {endDate}
          </span>
        </div>
      </div>
    </section>
  );
}

function StatusMetric({
  label,
  value,
  colorClass,
}: {
  label: string;
  value: string;
  colorClass: string;
}) {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-blue-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500/60">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${colorClass}`} />
        <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
          {label}
        </span>
      </div>
      <div className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </div>
    </article>
  );
}

function StatusGrid({ dashboard }: { dashboard: DashboardAnalysisResponse }) {
  const fastApi = dashboard.response_time.find(
    (entry) => entry.service_name?.toLowerCase() === "fastapi",
  );
  const nextJs = dashboard.response_time.find((entry) =>
    entry.service_name?.toLowerCase().includes("next"),
  );

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <StatusMetric
        label="FastAPI 평균 응답 시간"
        value={`${fastApi?.avg_response_ms ?? "-"} ms`}
        colorClass="bg-blue-400 shadow-lg shadow-blue-400/40"
      />
      <StatusMetric
        label="Next.js 평균 응답 시간"
        value={`${nextJs?.avg_response_ms ?? "-"} ms`}
        colorClass="bg-green-400 shadow-lg shadow-green-400/40"
      />
      <StatusMetric
        label="기간내 활성 사용자"
        value={numberFormat(dashboard.active_user?.active_user)}
        colorClass="bg-yellow-400 shadow-lg shadow-yellow-400/40"
      />
      <StatusMetric
        label="총 사용자"
        value={numberFormat(dashboard.total_user?.user_total_count)}
        colorClass="bg-purple-400 shadow-lg shadow-purple-400/40"
      />
    </section>
  );
}

function TopEndpointsChart({
  endpoints,
}: {
  endpoints: DashboardEndpointMetric[];
}) {
  const total = endpoints.reduce((sum, item) => sum + (item.request_count ?? 0), 0);
  const data = endpoints.map((entry) => ({
    ...entry,
    label: entry.url ?? "Unknown",
  }));

  return (
    <Panel>
      <div className="p-6 pb-2">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          <BarChart3 className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          Top 10 엔드포인트
        </h2>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            요청 수 기준 API 엔드포인트
          </p>
          <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1 text-blue-700 dark:border-blue-700/50 dark:bg-blue-900/30 dark:text-blue-300">
            <Activity className="h-4 w-4" />
            <span className="text-sm font-semibold">총 요청:</span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        {data.length > 0 ? (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 20, right: 24, left: 36, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="text-gray-200 dark:text-gray-700"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  className="text-gray-600 dark:text-gray-300"
                />
                <YAxis
                  dataKey="label"
                  type="category"
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  className="text-gray-600 dark:text-gray-300"
                  width={150}
                  tickFormatter={(value: string) =>
                    value.length > 20 ? `${value.slice(0, 20)}...` : value
                  }
                />
                <Tooltip
                  formatter={(value) => [
                    `${Number(value ?? 0).toLocaleString()} 요청`,
                    "요청 수",
                  ]}
                  labelFormatter={(label) => `엔드포인트: ${label}`}
                  contentStyle={chartTooltipStyle}
                  itemStyle={chartTooltipItemStyle}
                  labelStyle={chartTooltipLabelStyle}
                />
                <Bar dataKey="request_count" radius={[0, 4, 4, 0]}>
                  {data.map((entry, index) => (
                    <Cell
                      key={`${entry.label}-${index}`}
                      fill={getMethodColor(entry.request_type)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <EmptyState label="엔드포인트 집계 데이터가 없습니다." />
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          {Object.keys(methodColors).map((method) => (
            <div
              key={method}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1 dark:border-gray-700 dark:bg-gray-700/50"
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: getMethodColor(method) }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">{method}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

function HourlyDistributionChart({
  data,
}: {
  data: DashboardAnalysisResponse["time_distribution"];
}) {
  const peak = data.reduce(
    (max, current) => ((current.requests ?? 0) > (max.requests ?? 0) ? current : max),
    data[0] ?? { time: "-", requests: 0 },
  );

  return (
    <Panel>
      <div className="p-6 pb-2">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          <Clock className="h-5 w-5 text-green-500 dark:text-green-400" />
          시간대별 요청 분포
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
          API 요청 패턴 {peak.time ? `(${peak.time} 집중)` : ""}
        </p>
      </div>
      <div className="p-6 pt-0">
        {data.length > 0 ? (
          <>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="dashboardRequests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.85} />
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.12} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="currentColor"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 12, fill: "currentColor" }}
                    className="text-gray-600 dark:text-gray-300"
                  />
                  <YAxis
                    tick={{ fill: "currentColor" }}
                    className="text-gray-600 dark:text-gray-300"
                  />
                  <Tooltip
                    formatter={(value) => [
                      `${Number(value ?? 0).toLocaleString()} 요청`,
                      "요청 수",
                    ]}
                    labelFormatter={(label) => `시간: ${label}`}
                    contentStyle={{
                      backgroundColor: "rgb(31 41 55)",
                      border: "1px solid rgb(55 65 81)",
                      borderRadius: "8px",
                      color: "#ffffff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="requests"
                    stroke="#60a5fa"
                    fill="url(#dashboardRequests)"
                    fillOpacity={1}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-700/50 dark:bg-blue-900/30">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <TrendingUp className="h-4 w-4" />
                <span className="font-semibold">피크 시간</span>
              </div>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">
                {peak.time} 집중 요청 ({numberFormat(peak.requests)})
              </p>
            </div>
          </>
        ) : (
          <EmptyState label="시간대별 요청 데이터가 없습니다." />
        )}
      </div>
    </Panel>
  );
}

function HealthCheckChart({
  data,
}: {
  data: DashboardAnalysisResponse["health_check"];
}) {
  return (
    <Panel>
      <div className="p-6 pb-2">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
          <CheckCircle2 className="h-5 w-5 text-orange-500" />
          서비스 상태
        </h2>
      </div>
      <div className="px-6 pb-6">
        {data.length > 0 ? (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical" margin={{ left: 80, right: 24 }}>
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  unit="%"
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  className="text-gray-600 dark:text-gray-300"
                />
                <YAxis
                  type="category"
                  dataKey="service_name"
                  tick={{ fill: "currentColor", fontSize: 12 }}
                  className="text-gray-600 dark:text-gray-300"
                />
                <Tooltip
                  formatter={(value, name, entry) => {
                    const payload = entry?.payload;
                    const label = name === "정상" ? "성공률" : "실패율";
                    const extra = ` (성공 ${payload.ok_count} / 실패 ${payload.fail_count} / 총 ${payload.total})`;
                    return [`${Number(value ?? 0).toLocaleString()}%${extra}`, label];
                  }}
                  contentStyle={{
                    backgroundColor: "rgb(31 41 55)",
                    border: "1px solid rgb(55 65 81)",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                />
                <Legend />
                <Bar dataKey="ok_percentage" stackId="a" fill="#34d399" name="정상" />
                <Bar dataKey="fail_percentage" stackId="a" fill="#f87171" name="이상" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <EmptyState label="헬스 체크 데이터가 없습니다." />
        )}
      </div>
    </Panel>
  );
}

export function DashboardPage({
  initialDashboard,
  initialStartDate,
  initialEndDate,
}: {
  initialDashboard: DashboardAnalysisResponse;
  initialStartDate: string;
  initialEndDate: string;
}) {
  const [dashboard, setDashboard] = useState(initialDashboard);
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [isLoading, setIsLoading] = useState(false);
  const [notice, setNotice] = useState("");
  const totalRequests = dashboard.total_request?.current_requests ?? 0;

  const maxDate = useMemo(() => {
    return Temporal.Now.plainDateISO("Asia/Seoul").toString();
  }, []);

  const handleLoad = async () => {
    if (!startDate || !endDate || startDate > endDate) {
      setNotice("조회 기간을 확인해 주세요.");
      return;
    }

    setIsLoading(true);
    setNotice("");

    try {
      const nextDashboard = await getDashboardAnalysis({ startDate, endDate });
      setDashboard(nextDashboard);
    } catch {
      setNotice("대시보드 데이터를 불러오지 못했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold md:text-4xl">페이지 통계</h1>
          <HorizontalAdBanner />
        </div>

        <div className="flex flex-col items-start justify-end gap-3 md:flex-row md:items-center">
          <label className="flex items-center gap-2">
            <span className="font-bold text-gray-900 dark:text-white">시작일:</span>
            <input
              type="date"
              value={startDate}
              max={endDate || maxDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="rounded border border-gray-300 bg-white px-2 py-1 text-gray-900 transition hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </label>
          <label className="flex items-center gap-2">
            <span className="font-bold text-gray-900 dark:text-white">종료일:</span>
            <input
              type="date"
              value={endDate}
              min={startDate}
              max={maxDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="rounded border border-gray-300 bg-white px-2 py-1 text-gray-900 transition hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </label>
          <button
            type="button"
            onClick={handleLoad}
            disabled={isLoading}
            className="h-9 rounded bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
          >
            {isLoading ? "조회 중" : "조회"}
          </button>
        </div>

        {notice ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
            {notice}
          </div>
        ) : null}

        <TotalRequestCard total={totalRequests} startDate={startDate} endDate={endDate} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TopEndpointsChart endpoints={dashboard.endpoint} />
          <HourlyDistributionChart data={dashboard.time_distribution} />
        </div>

        <StatusGrid dashboard={dashboard} />
        <HealthCheckChart data={dashboard.health_check} />
      </div>
    </main>
  );
}
