"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";
import { useSession } from "next-auth/react";

import { useAppStore } from "@/components/providers/app-store-provider";
import { getCommunitySearch } from "@/features/community/api";
import { CommunityPagination } from "@/features/community/components/community-pagination";
import { CommunityPostList } from "@/features/community/components/community-post-list";
import {
  communityCategories,
  communitySearchCategories,
} from "@/lib/constants/community-categories";
import type { CommunitySearchResponse } from "@/types/api/community";

export function CommunitySearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const locale = useAppStore((state) => state.uiLocale);
  const [result, setResult] = useState<CommunitySearchResponse | null>(null);
  const [word, setWord] = useState(searchParams.get("word") ?? "");
  const [searchType, setSearchType] = useState(
    searchParams.get("search_type") ?? "all",
  );
  const [isLoading, setIsLoading] = useState(false);

  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const queryWord = searchParams.get("word") ?? "";
  const queryType = searchParams.get("search_type") ?? "all";
  const fromCategory = getValidCommunityCategory(searchParams.get("from"));
  const fromQuery = `&from=${fromCategory}`;

  useEffect(() => {
    setWord(queryWord);
    setSearchType(queryType);
    if (!queryWord.trim()) {
      setResult(null);
      return;
    }

    let ignore = false;
    setIsLoading(true);
    getCommunitySearch(page, queryWord, queryType, session?.accessToken)
      .then((nextResult) => {
        if (!ignore) {
          setResult(nextResult);
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [page, queryType, queryWord, session?.accessToken]);

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextWord = word.trim();
    if (!nextWord) {
      return;
    }
    router.push(
      `/community/search?search_type=${searchType}&word=${encodeURIComponent(nextWord)}&page=1${fromQuery}`,
    );
  }

  function changePage(nextPage: number) {
    router.push(
      `/community/search?search_type=${queryType}&word=${encodeURIComponent(queryWord)}&page=${nextPage}${fromQuery}`,
    );
  }

  return (
    <main className="bg-gray-50 py-8 text-gray-950 dark:bg-[#1f232b] dark:text-gray-50">
      <div className="mx-auto w-full max-w-5xl space-y-5 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-orange-600 dark:text-orange-300">
              Community Search
            </p>
            <h1 className="mt-1 text-2xl font-black">PMC 라운지 검색</h1>
          </div>
          <Link
            href={`/community/${fromCategory}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-600 dark:border-gray-700 dark:bg-[#252932] dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-300"
          >
            <ArrowLeft className="h-4 w-4" />
            목록으로
          </Link>
        </div>
        <form
          onSubmit={submitSearch}
          className="grid gap-2 rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700/70 dark:bg-[#252932] sm:grid-cols-[160px_1fr_auto]"
        >
          <select
            value={searchType}
            onChange={(event) => setSearchType(event.target.value)}
            className="h-10 rounded-md border border-gray-200 bg-white px-3 text-sm font-semibold outline-none dark:border-gray-700 dark:bg-[#1f232b]"
          >
            {communitySearchCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.labels[locale]}
              </option>
            ))}
          </select>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={word}
              onChange={(event) => setWord(event.target.value)}
              className="h-10 w-full rounded-md border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none focus:border-orange-300 dark:border-gray-700 dark:bg-[#1f232b]"
              placeholder="검색어"
            />
          </div>
          <button
            type="submit"
            className="h-10 rounded-md bg-orange-500 px-5 text-sm font-bold text-white hover:bg-orange-600"
          >
            검색
          </button>
        </form>

        {isLoading ? (
          <div className="rounded-lg border border-gray-200 bg-white p-12 text-center text-sm text-gray-500 dark:border-gray-700/70 dark:bg-[#252932] dark:text-gray-400">
            검색 중입니다.
          </div>
        ) : (
          <>
            <CommunityPostList
              posts={result?.search_result ?? []}
              locale={locale}
              emptyLabel={
                queryWord ? "검색 결과가 없습니다." : "검색어를 입력해 주세요."
              }
            />
            <CommunityPagination
              page={page}
              maxPage={result?.max_page_count ?? 1}
              onPageChange={changePage}
            />
          </>
        )}
      </div>
    </main>
  );
}

function getValidCommunityCategory(value: string | null) {
  return communityCategories.some((category) => category.id === value) ? value ?? "all" : "all";
}
