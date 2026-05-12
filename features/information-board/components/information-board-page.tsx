import Link from "next/link";

import { HorizontalAdBanner } from "@/components/shared/ad-banner";
import type { Locale } from "@/i18n/config";
import type { InformationListResponse } from "@/types/api/news";

import { InformationBoardList } from "./information-board-list";

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

function getPaginationItems(currentPage: number, maxPages: number) {
  if (maxPages <= 7) {
    return Array.from({ length: maxPages }, (_, index) => index + 1);
  }

  const pages = new Set([1, maxPages]);

  for (let page = currentPage - 1; page <= currentPage + 1; page += 1) {
    if (page > 1 && page < maxPages) {
      pages.add(page);
    }
  }

  const sortedPages = Array.from(pages).sort((left, right) => left - right);
  const items: Array<number | "ellipsis"> = [];

  sortedPages.forEach((page, index) => {
    const previousPage = sortedPages[index - 1];

    if (previousPage && page - previousPage > 1) {
      items.push("ellipsis");
    }

    items.push(page);
  });

  return items;
}

const boardTabs = [
  { path: "notice", label: "공지사항" },
  { path: "patch-notes", label: "패치노트" },
  { path: "event", label: "이벤트" },
];

function getDisplayTitle(path: string, title: string) {
  if (path === "notice") {
    return "공지사항";
  }

  return title;
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
  const displayTitle = getDisplayTitle(boardPath, boardTitle);
  const maxPages = Math.max(board.max_pages, 1);
  const paginationItems = getPaginationItems(board.current_page, maxPages);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#111418] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="flex flex-col items-center gap-4 pt-4">
          <h1 className="text-3xl font-black sm:text-4xl">{displayTitle}</h1>
          <HorizontalAdBanner />
          <nav className="flex rounded-lg bg-gray-200 p-1 shadow-sm dark:bg-[#20242b]">
            {boardTabs.map((tab) => {
              const isActive = tab.path === boardPath;

              return (
                <Link
                  key={tab.path}
                  href={`/${tab.path}`}
                  className={`rounded-md px-5 py-2 text-sm font-bold transition ${
                    isActive
                      ? "bg-white text-gray-900 shadow-sm dark:bg-[#f97316] dark:text-white"
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </section>

        <InformationBoardList
          boardPath={boardPath}
          displayTitle={displayTitle}
          posts={board.data}
          locale={locale}
          noPostsLabel={labels.noPostsLabel}
        />

        <nav
          aria-label={labels.pageLabel}
          className="flex flex-col items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21] sm:flex-row"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {labels.totalLabel} {board.total_count}
          </p>

          <div className="flex items-center justify-center gap-2">
            {hasPreviousPage ? (
              <Link
                href={buildPageHref(boardPath, board.current_page - 1)}
                className="inline-flex h-9 items-center rounded-md border border-gray-300 bg-white px-3 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-500 dark:border-[#2f3742] dark:bg-[#20242b] dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-300"
              >
                {labels.previousLabel}
              </Link>
            ) : null}

            {paginationItems.map((item, index) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-9 w-9 items-center justify-center text-sm font-bold text-gray-400"
                >
                  ...
                </span>
              ) : (
                <Link
                  key={item}
                  href={buildPageHref(boardPath, item)}
                  aria-current={
                    item === board.current_page ? "page" : undefined
                  }
                  className={`inline-flex h-9 min-w-9 items-center justify-center rounded-md px-3 text-sm font-bold transition ${
                    item === board.current_page
                      ? "bg-orange-500 text-white shadow-sm"
                      : "border border-gray-300 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-[#2f3742] dark:bg-[#20242b] dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-300"
                  }`}
                >
                  {item}
                </Link>
              ),
            )}

            {hasNextPage ? (
              <Link
                href={buildPageHref(boardPath, board.current_page + 1)}
                className="inline-flex h-9 items-center rounded-md border border-gray-300 bg-white px-3 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-500 dark:border-[#2f3742] dark:bg-[#20242b] dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-300"
              >
                {labels.nextLabel}
              </Link>
            ) : null}
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {labels.pageLabel} {board.current_page} / {maxPages}
          </p>
        </nav>
      </div>
    </main>
  );
}
