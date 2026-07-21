"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, PenLine, Search } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

import { useAppStore } from "@/components/providers/app-store-provider";
import {
  getCommunityPosts,
  getCommunitySidePosts,
} from "@/features/community/api";
import { CommunityCategoryTabs } from "@/features/community/components/community-category-tabs";
import { CommunityPagination } from "@/features/community/components/community-pagination";
import { CommunityPostList } from "@/features/community/components/community-post-list";
import { CommunitySidebar } from "@/features/community/components/community-sidebar";
import { communityCategories } from "@/lib/constants/community-categories";
import type {
  CommunityListResponse,
  CommunitySideResponse,
} from "@/types/api/community";

interface CommunityListPageProps {
  category: string;
}

export function CommunityListPage({ category }: CommunityListPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const locale = useAppStore((state) => state.uiLocale);
  const setActiveCategory = useAppStore(
    (state) => state.setActiveCommunityCategory,
  );
  const [list, setList] = useState<CommunityListResponse | null>(null);
  const [side, setSide] = useState<CommunitySideResponse | null>(null);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loginNotice, setLoginNotice] = useState("");
  const [isStartingLogin, setIsStartingLogin] = useState(false);
  const loginRedirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const currentCategory = useMemo(
    () =>
      communityCategories.find((item) => item.id === category)?.id ?? "all",
    [category],
  );

  useEffect(() => {
    setActiveCategory(currentCategory);
  }, [currentCategory, setActiveCategory]);

  useEffect(() => {
    let ignore = false;
    setIsLoading(true);
    setError(null);

    Promise.all([
      getCommunityPosts(currentCategory, page, session?.accessToken),
      getCommunitySidePosts(session?.accessToken),
    ])
      .then(([nextList, nextSide]) => {
        if (!ignore) {
          setList(nextList);
          setSide(nextSide);
        }
      })
      .catch(() => {
        if (!ignore) {
          setError("PMC 라운지 데이터를 불러오지 못했습니다.");
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
  }, [currentCategory, page, session?.accessToken]);

  useEffect(() => {
    return () => {
      if (loginRedirectTimerRef.current) {
        clearTimeout(loginRedirectTimerRef.current);
      }
    };
  }, []);

  function openPostEditor() {
    if (status === "loading" || isStartingLogin) {
      return;
    }

    if (status === "authenticated") {
      router.push("/community/create");
      return;
    }

    setLoginNotice("글을 작성하려면 로그인이 필요합니다. 로그인 화면으로 이동합니다.");
    setIsStartingLogin(true);
    loginRedirectTimerRef.current = setTimeout(() => {
      void signIn("google", { callbackUrl: "/community/create" });
    }, 1200);
  }

  function changePage(nextPage: number) {
    router.push(`/community/${currentCategory}?page=${nextPage}`);
  }

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const word = keyword.trim();
    if (!word) {
      return;
    }
    router.push(
      `/community/search?search_type=all&word=${encodeURIComponent(word)}&page=1&from=${currentCategory}`,
    );
  }

  return (
    <main className="bg-gray-50 py-8 text-gray-950 dark:bg-[#1f232b] dark:text-gray-50">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_310px] lg:px-8">
        <section className="min-w-0 space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-orange-600 dark:text-orange-300">
                Community
              </p>
              <h1 className="mt-1 text-2xl font-black">PMC 라운지</h1>
            </div>
            <button
              type="button"
              onClick={openPostEditor}
              disabled={status === "loading" || isStartingLogin}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-orange-500 px-4 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-wait disabled:opacity-70"
            >
              <PenLine className="h-4 w-4" />
              {isStartingLogin ? "로그인으로 이동 중" : "글쓰기"}
            </button>
          </div>

          <CommunityCategoryTabs />

          <form
            onSubmit={submitSearch}
            className="flex gap-2 rounded-lg border border-gray-200 bg-white p-2 shadow-sm dark:border-gray-700/70 dark:bg-[#252932]"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="PMC 라운지 검색"
                className="h-10 w-full rounded-md border border-transparent bg-gray-50 pl-9 pr-3 text-sm outline-none transition focus:border-orange-300 dark:bg-[#1f232b] dark:text-gray-100 dark:placeholder:text-gray-500"
              />
            </div>
            <button
              type="submit"
              className="h-10 rounded-md border border-gray-200 px-4 text-sm font-bold text-gray-700 transition hover:border-orange-300 hover:text-orange-600 dark:border-gray-700 dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-300"
            >
              검색
            </button>
          </form>

          {isLoading ? (
            <div className="rounded-lg border border-gray-200 bg-white p-12 text-center text-sm text-gray-500 dark:border-gray-700/70 dark:bg-[#252932] dark:text-gray-400">
              게시글을 불러오는 중입니다.
            </div>
          ) : error ? (
            <div className="rounded-lg border border-red-200 bg-red-50 p-12 text-center text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
              {error}
            </div>
          ) : (
            <>
              <CommunityPostList posts={list?.posts ?? []} locale={locale} />
              <CommunityPagination
                page={page}
                maxPage={list?.max_page_count ?? 1}
                onPageChange={changePage}
              />
            </>
          )}
        </section>

        <CommunitySidebar side={side} locale={locale} />
      </div>
      {loginNotice ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-[100] flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center gap-3 rounded-lg border border-orange-400/30 bg-gray-950 px-4 py-3 text-sm font-semibold text-white shadow-2xl dark:bg-white dark:text-gray-950"
        >
          <LogIn className="h-4 w-4 shrink-0 text-orange-400" />
          <span>{loginNotice}</span>
        </div>
      ) : null}
    </main>
  );
}
