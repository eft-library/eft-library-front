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
import { CommentsTypes } from "../my-page.types";
import CustomPagination from "../../CustomPagination/custom-pagination";
import { formatISODateTime } from "@/lib/func/formatTime";
import CommentDelete from "../../Community/CommunityDetail/CommentSection/comment-delete";
import { useState } from "react";
import { useMyPageReaction } from "@/lib/hooks/useMyPageReaction";

export default function Comments() {
  const { data: session, status } = useSession();
  const { deleteCommentByUser } = useMyPageReaction(session?.accessToken ?? "");
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page") || 1;
  const [deleteComment, setDeleteComment] = useState({
    commentId: "",
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
    queryKey: ["myPageCommentsData"],
    queryFn: () => fetchCommentsData(),
    enabled: status === "authenticated",
  });

  const onClickDeleteComment = () => {
    deleteCommentByUser.mutate({ commentId: deleteComment.commentId });
  };

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
            <div
              key={comment.comment.id}
              className={`p-4 rounded-lg border transition-colors cursor-pointer relative ${
                theme === "dark"
                  ? "border-gray-700/50 hover:border-orange-400/50 hover:bg-gray-700/30"
                  : "border-gray-200 hover:border-orange-500/50 hover:bg-gray-50"
              }`}
            >
              <button
                onClick={() => {
                  setDeleteComment({
                    deleteOpen: true,
                    commentId: comment.comment.id,
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
                <span className="text-orange-400">{comment.title}</span>에 댓글
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
                <span className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{comment.comment.id}</span>
                </span>
              </div>
            </div>
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
      <CommentDelete
        open={deleteComment.deleteOpen}
        setOpen={(open) =>
          setDeleteComment({ commentId: "", deleteOpen: open })
        }
        onClickDeleteCommentByUser={onClickDeleteComment}
      />
    </Card>
  );
}
