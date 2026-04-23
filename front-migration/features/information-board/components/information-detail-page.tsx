import Link from "next/link";

import { formatIsoDateTime } from "@/lib/utils/date-time";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { Locale } from "@/i18n/config";
import type { InformationDetailResponse } from "@/types/api/news";

interface InformationDetailPageProps {
  boardPath: string;
  boardTitle: string;
  detail: InformationDetailResponse;
  locale: Locale;
  labels: {
    updatedAtLabel: string;
    latestPostsLabel: string;
    backToListLabel: string;
  };
}

export function InformationDetailPage({
  boardPath,
  boardTitle,
  detail,
  locale,
  labels,
}: InformationDetailPageProps) {
  const title = String(
    pickLocalizedField(
      detail.information as unknown as Record<string, unknown>,
      locale,
      "title",
    ) ?? "",
  );
  const content = String(
    pickLocalizedField(
      detail.information as unknown as Record<string, unknown>,
      locale,
      "content",
    ) ?? "",
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
                {boardTitle}
              </p>
              <h1 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">
                {title}
              </h1>
            </div>
            <div className="shrink-0 text-sm text-gray-500 dark:text-gray-400">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                {labels.updatedAtLabel}
              </div>
              <div className="mt-2 font-mono">
                {formatIsoDateTime(detail.information.update_time, locale)}
              </div>
            </div>
          </div>

          <div
            className="mt-8 space-y-4 text-sm leading-7 text-gray-700 dark:text-gray-200 [&_a]:text-orange-500 [&_a]:underline-offset-2 hover:[&_a]:text-orange-400 [&_a:hover]:underline [&_b]:font-semibold [&_br]:leading-8 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          <div className="mt-8">
            <Link
              href={`/${boardPath}`}
              className="inline-flex rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:bg-[#2a2d35] dark:text-gray-200 dark:hover:border-orange-400 dark:hover:text-orange-300"
            >
              {labels.backToListLabel}
            </Link>
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <h2 className="text-lg font-semibold">{labels.latestPostsLabel}</h2>
          <div className="mt-4 grid gap-3">
            {detail.information_group.map((post) => {
              const relatedTitle = String(
                pickLocalizedField(
                  post as unknown as Record<string, unknown>,
                  locale,
                  "title",
                ) ?? "",
              );

              return (
                <Link
                  key={post.id}
                  href={`/${boardPath}/detail/${post.id}`}
                  className={`rounded-lg border px-4 py-3 text-sm transition ${
                    post.id === detail.information.id
                      ? "border-orange-300 bg-orange-50 text-orange-700 dark:border-orange-500/60 dark:bg-orange-500/10 dark:text-orange-300"
                      : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:bg-[#2a2d35] dark:text-gray-200 dark:hover:border-orange-400 dark:hover:text-orange-300"
                  }`}
                >
                  <div className="font-medium">{relatedTitle}</div>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {formatIsoDateTime(post.update_time, locale)}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
