import Link from "next/link";

import { formatIsoDateTime } from "@/lib/utils/date-time";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { Locale } from "@/i18n/config";
import type { InformationListResponse } from "@/types/api/news";

interface InformationBoardPageProps {
  boardPath: string;
  boardTitle: string;
  boardDescription: string;
  board: InformationListResponse;
  locale: Locale;
  labels: {
    totalLabel: string;
    pageLabel: string;
    updatedAtLabel: string;
    noPostsLabel: string;
    viewDetailLabel: string;
    previousLabel: string;
    nextLabel: string;
  };
}

function buildPageHref(path: string, page: number) {
  return page <= 1 ? `/${path}` : `/${path}?page=${page}`;
}

export function InformationBoardPage({
  boardPath,
  boardTitle,
  boardDescription,
  board,
  locale,
  labels,
}: InformationBoardPageProps) {
  const hasPreviousPage = board.current_page > 1;
  const hasNextPage = board.current_page < board.max_pages;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <h1 className="text-2xl font-bold sm:text-3xl">{boardTitle}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
            {boardDescription}
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
              {labels.totalLabel}
            </div>
            <div className="mt-2 text-2xl font-semibold">{board.total_count}</div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
            <div className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
              {labels.pageLabel}
            </div>
            <div className="mt-2 text-2xl font-semibold">
              {board.current_page}
              <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                / {Math.max(board.max_pages, 1)}
              </span>
            </div>
          </div>
        </section>

        {board.data.length > 0 ? (
          <section className="grid gap-4">
            {board.data.map((post) => {
              const title = String(
                pickLocalizedField(
                  post as unknown as Record<string, unknown>,
                  locale,
                  "title",
                ) ?? "",
              );
              const preview = String(
                pickLocalizedField(
                  post as unknown as Record<string, unknown>,
                  locale,
                  "content",
                ) ?? "",
              );

              return (
                <article
                  key={post.id}
                  className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-orange-300 hover:shadow-md dark:border-gray-700/50 dark:bg-gray-800/30 dark:hover:border-orange-400/60"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        <Link
                          href={`/${boardPath}/detail/${post.id}`}
                          className="transition hover:text-orange-500 dark:hover:text-orange-300"
                        >
                          {title}
                        </Link>
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                        {preview}
                      </p>
                    </div>
                    <div className="shrink-0 text-sm text-gray-500 dark:text-gray-400 lg:pl-6">
                      <div className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                        {labels.updatedAtLabel}
                      </div>
                      <div className="mt-2 font-mono">
                        {formatIsoDateTime(post.update_time, locale)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Link
                      href={`/${boardPath}/detail/${post.id}`}
                      className="inline-flex rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:bg-[#2a2d35] dark:text-gray-200 dark:hover:border-orange-400 dark:hover:text-orange-300"
                    >
                      {labels.viewDetailLabel}
                    </Link>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <section className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800/30">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {labels.noPostsLabel}
            </p>
          </section>
        )}

        <section className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <div>
            {hasPreviousPage ? (
              <Link
                href={buildPageHref(boardPath, board.current_page - 1)}
                className="inline-flex rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:bg-[#2a2d35] dark:text-gray-200 dark:hover:border-orange-400 dark:hover:text-orange-300"
              >
                {labels.previousLabel}
              </Link>
            ) : null}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {labels.pageLabel} {board.current_page} / {Math.max(board.max_pages, 1)}
          </div>
          <div>
            {hasNextPage ? (
              <Link
                href={buildPageHref(boardPath, board.current_page + 1)}
                className="inline-flex rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:bg-[#2a2d35] dark:text-gray-200 dark:hover:border-orange-400 dark:hover:text-orange-300"
              >
                {labels.nextLabel}
              </Link>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
