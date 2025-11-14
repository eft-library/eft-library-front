"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { requestGetUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useQuery } from "@tanstack/react-query";
import { Reply, X, Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import Loading from "../../Loading/loading";
import { CommentsTypes, DeleteCommentStateTypes } from "../my-page.types";
import CustomPagination from "../../CustomPagination/custom-pagination";
import { formatISODateTime } from "@/lib/func/formatTime";
import { useState } from "react";
import Link from "next/link";
import CommentDeleteModal from "../Modal/comment-delete-modal";

export default function Comments() {
  const { data: session, status } = useSession();
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page") || 1;
  const [deleteComment, setDeleteComment] = useState<DeleteCommentStateTypes>({
    commentInfo: null,
    deleteOpen: false,
  });

  const fetchCommentsData = async () => {
    const data = await requestGetUserData(
      `${
        USER_API_ENDPOINTS.MY_PAGE_COMMENTS
      }?page_num=${pageNum}&_ts=${Date.now()}`,
      session
    );
    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch post reaction data");
    }
    return data.data;
  };

  const { data: commentsData, isLoading } = useQuery<CommentsTypes>({
    queryKey: ["myPageCommentsData", pageNum],
    queryFn: () => fetchCommentsData(),
    enabled: status === "authenticated",
  });

  if (isLoading || !commentsData) return <Loading />;

  return (
    <Card
      className={`${
        theme === "dark"
          ? "bg-gray-800/30 border-gray-700/50"
          : "bg-white border-gray-200"
      }`}
    >
      <CardHeader>
        <CardTitle
          className={`flex items-center space-x-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          <Reply className="w-5 h-5" />
          <span>작성 댓글 ({commentsData.total_count})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4">
          {commentsData.comments.map((comment) => (
            <Link
              key={comment.comment.id}
              target="_blank"
              href={`/community/detail/${comment.id}-${comment.slug}?comment_id=${comment.comment.id}`}
            >
              <div
                className={`m-1 p-4 rounded-lg border transition-colors cursor-pointer relative ${
                  theme === "dark"
                    ? "border-gray-700/50 hover:border-orange-400/50 hover:bg-gray-700/30"
                    : "border-gray-200 hover:border-orange-500/50 hover:bg-gray-50"
                }`}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    setDeleteComment({
                      deleteOpen: true,
                      commentInfo: comment,
                    });
                  }}
                  className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                      : "text-gray-500 hover:text-red-500 hover:bg-red-50"
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
                <div
                  className={`text-sm mb-2 pr-8 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <span className="text-orange-400">{comment.title}</span>에
                  댓글
                </div>
                <p
                  className={`mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {comment.comment.contents}
                </p>
                <div
                  className={`flex items-center space-x-4 text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <span>
                    작성일: {formatISODateTime(comment.comment.create_time)}
                  </span>
                  <span>
                    최종 수정: {formatISODateTime(comment.comment.update_time)}
                  </span>
                  {/* <span className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>{comment.comment.id}</span>
                  </span> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
        {commentsData.total_count > 0 && (
          <CustomPagination
            total={commentsData.max_page_count}
            routeLink={`/mypage/comments?page=`}
            currentPage={Number(pageNum)}
          />
        )}
      </CardContent>
      {deleteComment.deleteOpen && (
        <CommentDeleteModal
          setDeleteComment={setDeleteComment}
          commentInfo={deleteComment.commentInfo}
        />
      )}
    </Card>
  );
}
