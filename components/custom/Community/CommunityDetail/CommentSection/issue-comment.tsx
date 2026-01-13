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
                  {comment.nickname}
                </span>
                <span className="text-xs px-2 py-1 bg-yellow-100 dark:bg-yellow-700/40 text-yellow-700 dark:text-yellow-300 rounded-full font-medium">
                  ISSUE
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-1 flex-wrap">
                <span>{formatISODateTime(comment.create_time)}</span>
              </div>
            </div>

            {/* 바로가기 버튼 */}
            <Link
              href={`/community/detail/${postInfo.id}-${postInfo.slug}?comment_id=${comment.id}`}
              scroll={false}
            >
              <LinkIcon className="cursor-pointer flex items-center text-yellow-700 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-200 transition">
                <ArrowRight size={18} />
              </LinkIcon>
            </Link>
          </div>

          {/* 본문 */}
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {comment.depth > 1 && comment.parent_nickname && (
              <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                ↪️
                <span className="font-semibold">
                  @{comment.parent_nickname}
                </span>
                님에게 답글
              </p>
            )}

            {!comment.delete_by_user && !comment.delete_by_admin ? (
              <p className="text-gray-800 dark:text-gray-200 leading-relaxed m-0 font-medium whitespace-pre-line">
                {comment.contents}
              </p>
            ) : (
              <p className="text-gray-400 dark:text-gray-500 italic text-sm m-0">
                {comment.delete_by_user && "⚠️ 사용자가 삭제한 댓글입니다."}
                {comment.delete_by_admin && "🚫 관리자가 삭제한 댓글입니다."}
              </p>
            )}

            {!comment.delete_by_admin &&
              !comment.delete_by_user &&
              comment.create_time !== comment.update_time && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right italic">
                  ✏️ {formatISODateTime(comment.update_time)} 수정됨
                </p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
