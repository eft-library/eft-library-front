"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { MessageCircle, Send } from "lucide-react";
import { ReportDialog } from "../ReportDialog/report-dialog";
// import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { requestPostData } from "@/lib/config/api";
import { COMMUNITY_ENDPOINTS } from "@/lib/config/endpoint";
import { useQuery } from "@tanstack/react-query";
import { CommentListsTypes, CommentSectionTypes } from "../../community.types";
import Loading from "@/components/custom/Loading/loading";
import Comment from "./comment";
import { useCommentReaction } from "@/lib/hooks/useCommentReaction";

export default function CommentSection({ postInfo }: CommentSectionTypes) {
  const { data: session } = useSession();
  const {
    likeComment,
    dislikeComment,
    createParentComment,
    createChildComment,
  } = useCommentReaction(postInfo.id, session?.accessToken || "");
  const [newComment, setNewComment] = useState("");
  const [reportOpen, setReportOpen] = useState<{
    open: boolean;
    id: string;
  }>({
    open: false,
    id: "",
  });

  const deleteComment = (commentId: string) => {};

  const createParentCommentFunc = () => {
    createParentComment.mutate({ contents: newComment });
    setNewComment("");
  };

  const updateComment = (commentId: string, contents: string) => {};

  const fetchCommentData = async (
    email: string
  ): Promise<CommentListsTypes> => {
    const data = await requestPostData(`${COMMUNITY_ENDPOINTS.GET_COMMENTS}`, {
      post_id: postInfo.id,
      user_email: email,
      issue_comment_id: "",
      page_num: 1,
    });

    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch post reaction data");
    }
    return data.data;
  };

  const userEmail = session?.email ?? "";

  // TODO: query 파라미터로 page_num, comment_id 가져와야 함
  const { data: commentData, isLoading } = useQuery({
    queryKey: ["commentData", postInfo.id, userEmail],
    queryFn: () => fetchCommentData(userEmail),
  });

  if (isLoading || !commentData) return <Loading />;

  return (
    <section className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            댓글 ({commentData.total})
          </h2>
        </div>

        {/* Comment Search - Removed */}

        {/* Composer (logged-in) */}
        <div className="space-y-3 mb-8">
          <div className="flex items-start gap-3">
            {/* <Avatar className="w-10 h-10">
              <AvatarImage
                src={currentUser.avatar || "/placeholder.svg"}
                alt={currentUser.name}
              />
              <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar> */}
            <div className="flex-1">
              <Textarea
                placeholder="댓글을 작성해주세요."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-400 min-h-[100px]"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-2">
                  <Button
                    onClick={createParentCommentFunc}
                    className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                  >
                    <Send className="w-4 h-4 mr-1" /> 댓글 작성
                  </Button>
                  {newComment.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setNewComment("")}
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                    >
                      취소
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-6">
          {/* {commentData.issue_comments.map((issue) => (
            <div key={`issue-${issue.id}`} className="space-y-4">
              <div className="flex space-x-4">
                <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage
                      src={comment.author.avatar || "/placeholder.svg"}
                      alt={comment.author.name}
                    />
                    <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                  </Avatar>
              </div>
            </div>
          ))} */}
          <div className="space-y-4">
            {commentData.comments.map((comment) => (
              <Comment
                comment={comment}
                postInfo={postInfo}
                key={`comment-${comment.id}`}
                deleteComment={deleteComment}
                updateComment={updateComment}
                setReportOpen={setReportOpen}
              />
            ))}
          </div>

          {/* {filteredAndSortedComments.map((comment) => {
            return (
              <div key={comment.id} className="space-y-4">
                
                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-14 space-y-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                    {comment.replies.map((reply) => {
                      const isMyReply = reply.author.id === currentUser.id;
                      const replyEditDraft = reply.content;
                      const isEditingReply =
                        editingId?.type === "reply" &&
                        editingId.id === reply.id;

                      return (
                        <div key={reply.id} className="flex space-x-4">
                          <Avatar className="w-8 h-8 flex-shrink-0">
                            <AvatarImage
                              src={reply.author.avatar || "/placeholder.svg"}
                              alt={reply.author.name}
                            />
                            <AvatarFallback>
                              {reply.author.name[0]}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div className="flex flex-col">
                                <div className="flex items-center space-x-2 flex-wrap">
                                  <span className="font-medium text-gray-900 dark:text-white text-sm">
                                    {reply.author.name}
                                  </span>
                                  {reply.author.isModerator && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs border-orange-400 text-orange-400"
                                    >
                                      모더레이터
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-500 mt-1 flex-wrap">
                                  <Badge
                                    variant="outline"
                                    className="text-xs border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                                  >
                                    {reply.author.level}
                                  </Badge>
                                  <span>{timeAgo(reply.createdAt)}</span>
                                  {reply.pinned && (
                                    <span className="inline-flex items-center text-orange-400">
                                      <Pin className="w-3 h-3 mr-1" /> 고정됨
                                    </span>
                                  )}
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 w-7 p-0"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                                >
                                  {isMyReply ? (
                                    <>
                                      <DropdownMenuItem
                                        className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                                        onClick={() =>
                                          setEditingId({
                                            type: "reply",
                                            id: reply.id,
                                          })
                                        }
                                      >
                                        <Pencil className="w-4 h-4 mr-2" /> 수정
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="text-red-500 dark:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                                        onClick={() =>
                                          deleteItem({
                                            type: "reply",
                                            id: reply.id,
                                            parentId: comment.id,
                                          })
                                        }
                                      >
                                        <Trash2 className="w-4 h-4 mr-2" /> 삭제
                                      </DropdownMenuItem>
                                    </>
                                  ) : (
                                    <DropdownMenuItem
                                      className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                                      onClick={() =>
                                        setReportOpen({
                                          open: true,
                                          id: reply.id,
                                        })
                                      }
                                    >
                                      <Flag className="w-4 h-4 mr-2" /> 신고하기
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            {!isEditingReply ? (
                              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                {reply.content}
                              </p>
                            ) : (
                              <div className="space-y-2">
                                <Textarea
                                  value={replyEditDraft}
                                  onChange={(e) =>
                                    setEditingId({
                                      ...editingId,
                                      content: e.target.value,
                                    })
                                  }
                                  className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                  rows={3}
                                />
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      updateItem(
                                        {
                                          type: "reply",
                                          id: reply.id,
                                          parentId: comment.id,
                                        },
                                        replyEditDraft
                                      )
                                    }
                                    className="bg-orange-500 hover:bg-orange-600 text-white"
                                  >
                                    저장
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setEditingId(null)}
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                  >
                                    취소
                                  </Button>
                                </div>
                              </div>
                            )}

                            <div className="flex items-center space-x-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                                onClick={() =>
                                  toggleLikeDislike(
                                    {
                                      type: "reply",
                                      id: reply.id,
                                      parentId: comment.id,
                                    },
                                    "like"
                                  )
                                }
                              >
                                <ThumbsUp className="w-3 h-3 mr-1" />
                                {reply.likes}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 px-2 text-xs text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                                onClick={() =>
                                  toggleLikeDislike(
                                    {
                                      type: "reply",
                                      id: reply.id,
                                      parentId: comment.id,
                                    },
                                    "dislike"
                                  )
                                }
                              >
                                <ThumbsDown className="w-3 h-3 mr-1" />
                                {reply.dislikes}
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })} */}
        </div>
      </div>

      <ReportDialog
        open={reportOpen.open}
        onOpenChange={(open) => setReportOpen({ open, id: "" })}
        subject="comment"
        subjectId={reportOpen.id ?? ""}
      />
    </section>
  );
}
