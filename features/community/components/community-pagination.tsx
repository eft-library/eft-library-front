"use client";

interface CommunityPaginationProps {
  page: number;
  maxPage: number;
  onPageChange: (page: number) => void;
}

export function CommunityPagination({ page, maxPage, onPageChange }: CommunityPaginationProps) {
  if (maxPage <= 1) {
    return null;
  }

  const start = Math.max(1, page - 2);
  const end = Math.min(maxPage, start + 4);
  const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index);

  return (
    <nav className="flex items-center justify-center gap-2 pt-6" aria-label="pagination">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="h-9 rounded-md border border-gray-200 px-3 text-sm font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-300"
      >
        이전
      </button>
      {pages.map((nextPage) => (
        <button
          key={nextPage}
          type="button"
          onClick={() => onPageChange(nextPage)}
          className={`h-9 min-w-9 rounded-md px-3 text-sm font-semibold transition ${
            nextPage === page
              ? "bg-orange-500 text-white"
              : "border border-gray-200 text-gray-700 hover:border-orange-300 hover:text-orange-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-300"
          }`}
        >
          {nextPage}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(maxPage, page + 1))}
        disabled={page >= maxPage}
        className="h-9 rounded-md border border-gray-200 px-3 text-sm font-semibold text-gray-700 transition hover:border-orange-300 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-300"
      >
        다음
      </button>
    </nav>
  );
}
