"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { formatIsoDateTime } from "@/lib/utils/date-time";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { InformationPreview } from "@/types/api/news";

interface InformationBoardListProps {
  boardPath: string;
  displayTitle: string;
  posts: InformationPreview[];
  locale: Locale;
  noPostsLabel: string;
}

function getPlainText(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getPostText(post: InformationPreview, locale: Locale) {
  const title = String(
    pickLocalizedField(post as unknown as Record<string, unknown>, locale, "title") ??
      "",
  );
  const content = String(
    pickLocalizedField(
      post as unknown as Record<string, unknown>,
      locale,
      "content",
    ) ?? "",
  );

  return {
    content,
    previewText: getPlainText(content),
    title,
  };
}

export function InformationBoardList({
  boardPath,
  displayTitle,
  posts,
  locale,
  noPostsLabel,
}: InformationBoardListProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const isFiltering = normalizedQuery.length >= 2;

  const postItems = useMemo(
    () =>
      posts.map((post) => ({
        ...getPostText(post, locale),
        post,
      })),
    [locale, posts],
  );

  const filteredItems = useMemo(() => {
    if (!isFiltering) {
      return postItems;
    }

    return postItems.filter((item) =>
      `${item.title} ${item.previewText}`.toLowerCase().includes(normalizedQuery),
    );
  }, [isFiltering, normalizedQuery, postItems]);

  return (
    <>
      <div className="max-w-md">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="이름을 최소 2글자 입력하세요"
            className="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-orange-300 dark:border-[#2f3742] dark:bg-[#181c21] dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-orange-500"
          />
        </div>
      </div>

      {filteredItems.length > 0 ? (
        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
          {filteredItems.map(({ post, title, previewText }) => (
            <Link
              key={post.id}
              href={`/${boardPath}/detail/${post.id}`}
              className="group grid gap-4 border-b border-gray-100 px-5 py-5 transition last:border-b-0 hover:bg-orange-50/40 dark:border-[#2a3038] dark:hover:bg-[#20242b] md:grid-cols-[92px_1fr_180px]"
            >
              <div className="flex items-start md:items-center md:justify-center">
                <span className="inline-flex min-w-16 justify-center rounded-md border border-yellow-500/40 bg-yellow-500/10 px-2 py-1 text-center text-xs font-bold text-yellow-600 dark:border-orange-400/30 dark:bg-orange-400/10 dark:text-orange-300">
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
          ))}
        </section>
      ) : (
        <section className="rounded-lg border border-dashed border-gray-300 bg-white px-6 py-12 text-center shadow-sm dark:border-[#2a3038] dark:bg-[#181c21]">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {noPostsLabel}
          </p>
        </section>
      )}
    </>
  );
}
