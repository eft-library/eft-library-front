"use client";

import Link from "next/link";
import { Flame, Megaphone } from "lucide-react";

import type { Locale } from "@/i18n/config";
import type { CommunitySideResponse } from "@/types/api/community";
import { formatCommunityDate, getCommunityPostUrl, getNoticeTitle } from "@/features/community/utils";

interface CommunitySidebarProps {
  side: CommunitySideResponse | null;
  locale: Locale;
}

export function CommunitySidebar({ side, locale }: CommunitySidebarProps) {
  return (
    <aside className="space-y-4 lg:sticky lg:top-24">
      <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700/70 dark:bg-[#252932]">
        <h2 className="flex items-center gap-2 text-sm font-black text-gray-950 dark:text-gray-50">
          <Flame className="h-4 w-4 text-orange-500" />
          실시간 이슈
        </h2>
        <div className="mt-3 space-y-2">
          {side?.issue_posts?.length ? (
            side.issue_posts.map((post) => (
              <Link
                key={post.id}
                href={getCommunityPostUrl(post)}
                target="_blank"
                rel="noreferrer"
                className="block rounded-md px-2 py-2 text-sm text-gray-700 transition hover:bg-orange-50 hover:text-orange-700 dark:text-gray-300 dark:hover:bg-[#303540] dark:hover:text-orange-300"
              >
                <span className="line-clamp-1 font-semibold">{post.title}</span>
                <span className="mt-1 block text-xs text-gray-400">
                  댓글 {post.comment_count ?? 0} · 추천 {post.reaction_score ?? 0}
                </span>
              </Link>
            ))
          ) : (
            <p className="rounded-md bg-gray-50 px-3 py-4 text-center text-xs text-gray-500 dark:bg-gray-800/60 dark:text-gray-400">
              아직 이슈 게시글이 없습니다.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700/70 dark:bg-[#252932]">
        <h2 className="flex items-center gap-2 text-sm font-black text-gray-950 dark:text-gray-50">
          <Megaphone className="h-4 w-4 text-sky-500" />
          공지사항
        </h2>
        <div className="mt-3 space-y-2">
          {side?.notice_posts?.length ? (
            side.notice_posts.slice(0, 5).map((notice) => (
              <Link
                key={notice.id}
                href={`/notice?id=${notice.id.replace("notice", "")}`}
                target="_blank"
                rel="noreferrer"
                className="block rounded-md px-2 py-2 text-sm text-gray-700 transition hover:bg-sky-50 hover:text-sky-700 dark:text-gray-300 dark:hover:bg-[#303540] dark:hover:text-sky-300"
              >
                <span className="line-clamp-1 font-semibold">{getNoticeTitle(notice, locale)}</span>
                <span className="mt-1 block text-xs text-gray-400">{formatCommunityDate(notice.update_time)}</span>
              </Link>
            ))
          ) : (
            <p className="rounded-md bg-gray-50 px-3 py-4 text-center text-xs text-gray-500 dark:bg-gray-800/60 dark:text-gray-400">
              표시할 공지가 없습니다.
            </p>
          )}
        </div>
      </section>
    </aside>
  );
}
