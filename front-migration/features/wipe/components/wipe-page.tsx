import type { WipePageProps } from "@/features/wipe/types";

function getDurationInDays(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = end === "~" ? new Date() : new Date(end);
  const difference = endDate.getTime() - startDate.getTime();

  return Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)));
}

function getBarWidth(duration: number, maxDuration: number) {
  if (maxDuration <= 0) {
    return 0;
  }

  return Math.max(8, (duration / maxDuration) * 100);
}

export function WipePage({ seasons, labels }: WipePageProps) {
  const maxDuration = Math.max(
    ...seasons.map((season) =>
      getDurationInDays(season.season_start, season.season_end),
    ),
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            {labels.title}
          </h1>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <div className="hidden border-b border-gray-200 px-6 py-4 text-sm font-semibold text-gray-600 dark:border-gray-700 dark:text-gray-300 lg:grid lg:grid-cols-[1.1fr_0.9fr_0.9fr_1.4fr] lg:gap-6">
            <div>{labels.version}</div>
            <div className="text-center">{labels.start}</div>
            <div className="text-center">{labels.end}</div>
            <div className="text-center">{labels.days}</div>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {seasons.map((season, index) => {
              const isActive = index === 0;
              const duration = getDurationInDays(
                season.season_start,
                season.season_end,
              );

              return (
                <article
                  key={season.id}
                  className={`grid gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1.4fr] lg:items-center lg:gap-6 ${
                    isActive ? "bg-orange-50/70 dark:bg-orange-950/15" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-base font-semibold text-gray-900 dark:text-white">
                      {season.patch_version}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                        isActive
                          ? "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-700/50 dark:text-gray-300"
                      }`}
                    >
                      {isActive ? labels.active : labels.completed}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 lg:block lg:text-center">
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400 lg:hidden">
                      {labels.start}
                    </span>
                    <span className="font-mono text-sm text-gray-700 dark:text-gray-200">
                      {season.season_start}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 lg:block lg:text-center">
                    <span className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400 lg:hidden">
                      {labels.end}
                    </span>
                    <span className="font-mono text-sm text-gray-700 dark:text-gray-200">
                      {season.season_end}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400 lg:hidden">
                        {labels.days}
                      </span>
                      <span
                        className={`font-semibold ${
                          isActive
                            ? "text-orange-600 dark:text-orange-300"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      >
                        {duration} {labels.days}
                      </span>
                    </div>
                    <div className="h-3 rounded-full bg-gray-100 dark:bg-gray-700/60">
                      <div
                        className={`h-full rounded-full ${
                          isActive
                            ? "bg-linear-to-r from-orange-400 to-amber-300"
                            : "bg-linear-to-r from-slate-400 to-slate-300 dark:from-slate-500 dark:to-slate-400"
                        }`}
                        style={{ width: `${getBarWidth(duration, maxDuration)}%` }}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white px-6 py-4 text-sm text-gray-600 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-linear-to-r from-orange-400 to-amber-300" />
            <span>{labels.active}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-linear-to-r from-slate-400 to-slate-300 dark:from-slate-500 dark:to-slate-400" />
            <span>{labels.completed}</span>
          </div>
          <div className="sm:ml-auto">
            {labels.total}: {seasons.length}
          </div>
        </section>
      </div>
    </main>
  );
}
