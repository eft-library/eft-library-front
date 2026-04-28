import Link from "next/link";
import { Search } from "lucide-react";

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

function getPlainText(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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

        <section className="rounded-md border border-gray-200 bg-white text-gray-900 shadow-sm dark:border-[#2a3038] dark:bg-[#181c21] dark:text-gray-100">
          <div className="bg-gray-50 px-5 py-4 text-lg font-bold dark:bg-[#20242b]">
            자세히 알아보기
          </div>
          <div className="divide-y divide-gray-100 dark:divide-[#2a3038]">
            {["게임", "비디오 게임", "도서관 및 박물관"].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between px-5 py-4 text-base"
              >
                <span>{item}</span>
                <span className="text-3xl font-light text-gray-400 dark:text-gray-500">›</span>
              </div>
            ))}
          </div>
        </section>

        <div className="max-w-md">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="이름을 최소 2글자 입력하세요"
              className="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-300 dark:border-[#2f3742] dark:bg-[#181c21] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-orange-500"
            />
          </div>
        </div>

        {board.data.length > 0 ? (
          <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
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
              const previewText = getPlainText(preview);

              return (
                <Link
                  key={post.id}
                  href={`/${boardPath}/detail/${post.id}`}
                  className="group grid gap-4 border-b border-gray-100 px-5 py-5 transition last:border-b-0 hover:bg-orange-50/40 dark:border-[#2a3038] dark:hover:bg-[#20242b] md:grid-cols-[92px_1fr_180px]"
                >
                  <div className="flex items-start">
                    <span className="inline-flex rounded-md border border-yellow-500/40 bg-yellow-500/10 px-2 py-1 text-xs font-bold text-yellow-600 dark:border-orange-400/30 dark:bg-orange-400/10 dark:text-orange-300">
                      {displayTitle}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold text-gray-900 transition group-hover:text-orange-500 dark:text-gray-100 dark:group-hover:text-orange-300">
                      {title}
                    </h2>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {previewText}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-500 md:flex-col md:items-end md:justify-center md:gap-1">
                    <span>EFT Library</span>
                    <span>{formatIsoDateTime(post.update_time, locale)}</span>
                  </div>
                </Link>
              );
            })}
          </section>
        ) : (
          <section className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {labels.noPostsLabel}
            </p>
          </section>
        )}

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
                  aria-current={item === board.current_page ? "page" : undefined}
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
