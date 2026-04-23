import type { DashboardAnalysisResponse } from "@/types/api/dashboard";

function MetricCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint: string;
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-500">
        {label}
      </p>
      <p className="mt-3 text-3xl font-bold">{value.toLocaleString()}</p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{hint}</p>
    </article>
  );
}

function EmptyPanel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="rounded-2xl border border-dashed border-gray-300 bg-white/70 p-6 dark:border-gray-700 dark:bg-[#252830]/70">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </section>
  );
}

export function DashboardPage({
  dashboard,
}: {
  dashboard: DashboardAnalysisResponse;
}) {
  const activeUsers = dashboard.active_user.active_user ?? 0;
  const totalUsers = dashboard.total_user.user_total_count ?? 0;
  const currentRequests = dashboard.total_request.current_requests ?? 0;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
            Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold">Service Overview</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
            현재 V3 대시보드 API에서 내려주는 운영 지표를 그대로 묶었습니다. 데이터가 비어
            있어도 구조는 유지해서, 이후 백엔드 지표가 늘어나면 이 화면에서 바로 반영됩니다.
          </p>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <MetricCard
            label="Active Users"
            value={activeUsers}
            hint="최근 활동 유저 수"
          />
          <MetricCard label="Total Users" value={totalUsers} hint="누적 가입 유저 수" />
          <MetricCard
            label="Current Requests"
            value={currentRequests}
            hint="집계 기준 현재 요청 수"
          />
        </section>

        {dashboard.endpoint.length > 0 ? (
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
            <h2 className="text-lg font-semibold">Top Endpoints</h2>
            <div className="mt-4 grid gap-3">
              {dashboard.endpoint.map((entry, index) => (
                <div
                  key={`${entry.endpoint ?? "endpoint"}-${index}`}
                  className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-[#1f222a]"
                >
                  <div>
                    <p className="font-medium">{entry.endpoint ?? "Unknown endpoint"}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-gray-400">
                      {entry.method ?? "GET"}
                    </p>
                  </div>
                  <p className="text-lg font-semibold">
                    {(entry.request_count ?? 0).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <EmptyPanel
            title="Top Endpoints"
            description="현재 서버에서 상위 엔드포인트 집계 데이터가 비어 있습니다."
          />
        )}

        <div className="grid gap-6 xl:grid-cols-2">
          {dashboard.time_distribution.length > 0 ? (
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
              <h2 className="text-lg font-semibold">Hourly Distribution</h2>
            </section>
          ) : (
            <EmptyPanel
              title="Hourly Distribution"
              description="시간대별 분포 데이터가 아직 수집되지 않았습니다."
            />
          )}

          {dashboard.response_time.length > 0 ? (
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
              <h2 className="text-lg font-semibold">Response Time</h2>
            </section>
          ) : (
            <EmptyPanel
              title="Response Time"
              description="응답 시간 집계가 비어 있어서 빈 상태 패널로 유지합니다."
            />
          )}
        </div>

        {dashboard.health_check.length > 0 ? (
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
            <h2 className="text-lg font-semibold">Health Check</h2>
          </section>
        ) : (
          <EmptyPanel
            title="Health Check"
            description="헬스 체크 이력 데이터가 없어서 상태 카드만 비워둡니다."
          />
        )}
      </div>
    </main>
  );
}
