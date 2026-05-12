"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ThumbsUp, Eye } from "lucide-react";

import type { Locale } from "@/i18n/config";
import type { CommunityPost } from "@/types/api/community";
import {
  buildPostPreview,
  formatCommunityDate,
  getCategoryLabel,
  getCommunityPostUrl,
} from "@/features/community/utils";

interface CommunityPostListProps {
  posts: CommunityPost[];
  locale: Locale;
  emptyLabel?: string;
}

export function CommunityPostList({ posts, locale, emptyLabel = "게시글이 없습니다." }: CommunityPostListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-white p-12 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-[#252932] dark:text-gray-400">
        {emptyLabel}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700/70 dark:bg-[#252932]">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={getCommunityPostUrl(post)}
          className="grid gap-4 border-b border-gray-100 p-4 transition last:border-b-0 hover:bg-orange-50/70 dark:border-gray-700/60 dark:hover:bg-[#303540] sm:grid-cols-[1fr_auto]"
        >
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-orange-100 px-2 py-1 text-xs font-bold text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                {getCategoryLabel(post.category, locale)}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {post.nickname || "익명"}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {formatCommunityDate(post.create_time)}
              </span>
            </div>
            <h2 className="mt-2 line-clamp-1 text-base font-bold text-gray-950 dark:text-gray-50">
              {post.title}
            </h2>
            <p className="mt-1 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              {buildPostPreview(post)}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {post.view_count ?? 0}
              </span>
              <span className="inline-flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5" />
                {post.comment_count ?? 0}
              </span>
              <span className="inline-flex items-center gap-1">
                <ThumbsUp className="h-3.5 w-3.5" />
                {post.reaction_score ?? 0}
              </span>
            </div>
          </div>
          {post.thumbnail ? (
            <div className="relative h-24 w-full overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800 sm:w-32">
              <Image
                src={post.thumbnail}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 128px"
                className="object-cover"
              />
            </div>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
