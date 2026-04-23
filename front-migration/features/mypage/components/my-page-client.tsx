"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

import { authenticatedApiRequest } from "@/lib/api/auth-client";
import {
  apiEndpoints,
  getMyPageBlocksEndpoint,
  getMyPageBookmarksEndpoint,
  getMyPageCommentsEndpoint,
  getMyPageFollowEndpoint,
  getMyPageNotificationsEndpoint,
  getMyPagePostsEndpoint,
} from "@/lib/config/api-endpoints";
import { formatIsoDateTime } from "@/lib/utils/date-time";
import type {
  MyPageBlocksResponse,
  MyPageBookmarksResponse,
  MyPageCommentsResponse,
  MyPageDefaultResponse,
  MyPageFollowResponse,
  MyPageNotificationsResponse,
  MyPagePostsResponse,
  UserInfoResponse,
} from "@/types/api/mypage";

type MyPageSection =
  | "profile"
  | "posts"
  | "comments"
  | "bookmarks"
  | "blocked"
  | "following"
  | "notifications";

const sectionConfig: Record<
  MyPageSection,
  { title: string; href: string; pageLabel: string }
> = {
  profile: { title: "Profile", href: "/mypage/profile", pageLabel: "프로필" },
  posts: { title: "Posts", href: "/mypage/posts", pageLabel: "작성한 글" },
  comments: { title: "Comments", href: "/mypage/comments", pageLabel: "작성한 댓글" },
  bookmarks: { title: "Bookmarks", href: "/mypage/bookmarks", pageLabel: "북마크" },
  blocked: { title: "Blocked", href: "/mypage/blocked", pageLabel: "차단 목록" },
  following: { title: "Following", href: "/mypage/following", pageLabel: "팔로우" },
  notifications: {
    title: "Notifications",
    href: "/mypage/notifications",
    pageLabel: "알림",
  },
};

function Pagination({
  page,
  maxPage,
  onChange,
}: {
  page: number;
  maxPage: number;
  onChange: (nextPage: number) => void;
}) {
  if (maxPage <= 1) {
    return null;
  }

  return (
    <div className="mt-6 flex items-center justify-between gap-3">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page <= 1}
        className="rounded-lg border border-gray-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
      >
        Previous
      </button>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {page} / {maxPage}
      </span>
      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page >= maxPage}
        className="rounded-lg border border-gray-200 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700"
      >
        Next
      </button>
    </div>
  );
}

export function MyPageClient({ section }: { section: MyPageSection }) {
  const { data: session, status } = useSession();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserInfoResponse | null>(null);
  const [summary, setSummary] = useState<MyPageDefaultResponse | null>(null);
  const [pagedData, setPagedData] = useState<
    | MyPagePostsResponse
    | MyPageCommentsResponse
    | MyPageBookmarksResponse
    | MyPageBlocksResponse
    | MyPageFollowResponse
    | MyPageNotificationsResponse
    | null
  >(null);

  useEffect(() => {
    setPage(1);
  }, [section]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (status !== "authenticated" || !session?.accessToken) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        if (section === "profile") {
          const [nextProfile, nextSummary] = await Promise.all([
            authenticatedApiRequest<UserInfoResponse>(apiEndpoints.myPageInfo, {
              accessToken: session.accessToken,
            }),
            authenticatedApiRequest<MyPageDefaultResponse>(apiEndpoints.myPageDefault, {
              accessToken: session.accessToken,
            }),
          ]);

          if (!cancelled) {
            setProfile(nextProfile);
            setSummary(nextSummary);
            setPagedData(null);
          }

          return;
        }

        const endpointBySection: Record<Exclude<MyPageSection, "profile">, string> = {
          posts: getMyPagePostsEndpoint(page),
          comments: getMyPageCommentsEndpoint(page),
          bookmarks: getMyPageBookmarksEndpoint(page),
          blocked: getMyPageBlocksEndpoint(page),
          following: getMyPageFollowEndpoint(page),
          notifications: getMyPageNotificationsEndpoint(page),
        };

        const nextData = await authenticatedApiRequest<
          | MyPagePostsResponse
          | MyPageCommentsResponse
          | MyPageBookmarksResponse
          | MyPageBlocksResponse
          | MyPageFollowResponse
          | MyPageNotificationsResponse
        >(endpointBySection[section], {
          accessToken: session.accessToken,
        });

        if (!cancelled) {
          setPagedData(nextData);
          setProfile(null);
          setSummary(null);
        }
      } catch (caughtError) {
        if (!cancelled) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Failed to load my page data.",
          );
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [page, section, session?.accessToken, status]);

  const maxPage = useMemo(() => {
    if (!pagedData || !("max_page_count" in pagedData)) {
      return 1;
    }

    return pagedData.max_page_count;
  }, [pagedData]);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
            My Page
          </p>
          <h1 className="mt-2 text-3xl font-bold">{sectionConfig[section].pageLabel}</h1>
          <div className="mt-6 flex flex-wrap gap-2">
            {Object.entries(sectionConfig).map(([key, config]) => (
              <Link
                key={key}
                href={config.href}
                className={`rounded-full border px-3 py-2 text-sm font-medium ${
                  key === section
                    ? "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"
                    : "border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-[#1f222a] dark:text-gray-200"
                }`}
              >
                {config.title}
              </Link>
            ))}
          </div>
        </section>

        {status !== "authenticated" || !session?.accessToken ? (
          <section className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center shadow-sm dark:border-gray-700 dark:bg-[#252830]">
            <h2 className="text-xl font-semibold">Sign in required</h2>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              마이페이지 데이터는 사용자 토큰이 필요한 V3 숨김 엔드포인트를 사용합니다.
            </p>
            <button
              type="button"
              onClick={() => void signIn("google")}
              className="mt-5 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white"
            >
              Continue with Google
            </button>
          </section>
        ) : null}

        {status === "authenticated" && session?.accessToken ? (
          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
            {isLoading ? <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p> : null}
            {error ? <p className="text-sm text-red-500">{error}</p> : null}

            {!isLoading && !error && section === "profile" && profile && summary ? (
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-[#1f222a]">
                  <h2 className="text-lg font-semibold">{profile.nickname ?? profile.email}</h2>
                  <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <p>Email: {profile.email}</p>
                    <p>Attendance: {profile.attendance_count}</p>
                    <p>Created: {formatIsoDateTime(profile.create_time)}</p>
                    <p>
                      Penalty:{" "}
                      {profile.reason
                        ? `${profile.reason} (${profile.end_time ?? "permanent"})`
                        : "None"}
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-[#1f222a]">
                    <div className="text-xs uppercase tracking-[0.16em] text-gray-400">Posts</div>
                    <div className="mt-3 text-3xl font-bold">{summary.post_count}</div>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-[#1f222a]">
                    <div className="text-xs uppercase tracking-[0.16em] text-gray-400">Comments</div>
                    <div className="mt-3 text-3xl font-bold">{summary.comment_count}</div>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-[#1f222a]">
                    <div className="text-xs uppercase tracking-[0.16em] text-gray-400">Following</div>
                    <div className="mt-3 text-3xl font-bold">{summary.follow_count}</div>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-[#1f222a]">
                    <div className="text-xs uppercase tracking-[0.16em] text-gray-400">Unread Notifications</div>
                    <div className="mt-3 text-3xl font-bold">{summary.notification_count}</div>
                  </div>
                </div>
              </div>
            ) : null}

            {!isLoading && !error && section === "posts" && pagedData && "posts" in pagedData ? (
              <div>
                <div className="grid gap-3">
                  {pagedData.posts.map((post) => (
                    <article
                      key={post.id}
                      className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-[#1f222a]"
                    >
                      <p className="text-xs uppercase tracking-[0.16em] text-orange-500">
                        {post.category}
                      </p>
                      <h2 className="mt-2 text-lg font-semibold">{post.title}</h2>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {post.comment_count} comments · {post.reaction_score} score ·{" "}
                        {formatIsoDateTime(post.create_time)}
                      </p>
                    </article>
                  ))}
                </div>
                <Pagination page={page} maxPage={maxPage} onChange={setPage} />
              </div>
            ) : null}

            {!isLoading && !error && section === "comments" && pagedData && "comments" in pagedData ? (
              <div>
                <div className="grid gap-3">
                  {pagedData.comments.map((entry) => (
                    <article
                      key={`${entry.id}-${entry.comment.id}`}
                      className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-[#1f222a]"
                    >
                      <h2 className="text-lg font-semibold">{entry.title}</h2>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {entry.comment.contents}
                      </p>
                    </article>
                  ))}
                </div>
                <Pagination page={page} maxPage={maxPage} onChange={setPage} />
              </div>
            ) : null}

            {!isLoading && !error && section === "bookmarks" && pagedData && "bookmarks" in pagedData ? (
              <div>
                <div className="grid gap-3">
                  {pagedData.bookmarks.map((entry) => (
                    <article
                      key={entry.id}
                      className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-[#1f222a]"
                    >
                      <h2 className="text-lg font-semibold">{entry.title}</h2>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {entry.category} · {entry.comment_count} comments
                      </p>
                    </article>
                  ))}
                </div>
                <Pagination page={page} maxPage={maxPage} onChange={setPage} />
              </div>
            ) : null}

            {!isLoading && !error && section === "blocked" && pagedData && "blocks" in pagedData ? (
              <div>
                <div className="grid gap-3">
                  {pagedData.blocks.map((entry) => (
                    <article
                      key={`${entry.blocked_email}-${entry.create_time}`}
                      className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-[#1f222a]"
                    >
                      <h2 className="text-lg font-semibold">{entry.nickname ?? entry.blocked_email}</h2>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {entry.reason ?? "No reason"} · {formatIsoDateTime(entry.create_time)}
                      </p>
                    </article>
                  ))}
                </div>
                <Pagination page={page} maxPage={maxPage} onChange={setPage} />
              </div>
            ) : null}

            {!isLoading && !error && section === "following" && pagedData && "follow" in pagedData ? (
              <div>
                <div className="grid gap-3">
                  {pagedData.follow.map((entry) => (
                    <article
                      key={`${entry.follower_email}-${entry.create_time}`}
                      className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-[#1f222a]"
                    >
                      <h2 className="text-lg font-semibold">{entry.nickname ?? entry.follower_email}</h2>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {entry.post_count} posts · {formatIsoDateTime(entry.create_time)}
                      </p>
                    </article>
                  ))}
                </div>
                <Pagination page={page} maxPage={maxPage} onChange={setPage} />
              </div>
            ) : null}

            {!isLoading && !error && section === "notifications" && pagedData && "notifications" in pagedData ? (
              <div>
                <div className="grid gap-3">
                  {pagedData.notifications.map((entry) => (
                    <article
                      key={entry.id}
                      className="rounded-2xl border border-gray-100 bg-gray-50 p-5 dark:border-gray-700 dark:bg-[#1f222a]"
                    >
                      <h2 className="text-lg font-semibold">{entry.noti_type}</h2>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {typeof entry.payload === "string"
                          ? entry.payload
                          : JSON.stringify(entry.payload)}
                      </p>
                      <p className="mt-3 text-xs text-gray-400">
                        {formatIsoDateTime(entry.create_time)}
                      </p>
                    </article>
                  ))}
                </div>
                <Pagination page={page} maxPage={maxPage} onChange={setPage} />
              </div>
            ) : null}
          </section>
        ) : null}
      </div>
    </main>
  );
}
