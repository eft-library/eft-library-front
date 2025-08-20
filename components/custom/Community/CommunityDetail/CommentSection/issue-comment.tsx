"use client";

import { formatISODateTime } from "@/lib/func/formatTime";
import { IssueCommentTypes } from "../../community.types";
import { ArrowRight, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

export default function IssueComment({ postInfo, comment }: IssueCommentTypes) {
  return (
    <div className="relative">
      <div
        className={`relative bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700 shadow-md hover:shadow-lg transition-all duration-200`}
      >
        <div className="p-3 pl-4 space-y-3">
          {/* 헤더 */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {comment.user_email}
                </span>
                <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-700/40 text-yellow-700 dark:text-yellow-300 rounded-full font-medium">
                  ISSUE
                </span>
                {comment.depth > 1 && (
                  <span className="text-xs px-2 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-400 rounded-full">
                    답글
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-1 flex-wrap">
                <span>{formatISODateTime(comment.create_time)}</span>
              </div>
            </div>

            {/* 바로가기 버튼 */}
            <Link
              href={`/community/detail/${postInfo.id}-${postInfo.slug}?comment_id=${comment.id}`}
            >
              <LinkIcon className="cursor-pointer flex items-center text-yellow-700 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-200 transition">
                <ArrowRight size={18} />
              </LinkIcon>
            </Link>
          </div>

          {/* 본문 */}
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-gray-800 dark:text-gray-200 leading-relaxed m-0 font-semibold">
              {comment.contents}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
