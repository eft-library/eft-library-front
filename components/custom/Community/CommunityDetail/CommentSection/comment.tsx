"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatISODateTime } from "@/lib/func/formatTime";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Flag,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Ban,
  UserRoundX,
  MessageCircleX,
} from "lucide-react";
import { CommentTypes } from "../../community.types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useCommentReaction } from "@/lib/hooks/useCommentReaction";
import DefaultDialog from "@/components/custom/DefaultDialog/default-dialog";
import { useSearchParams } from "next/navigation";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Comment({
  comment,
  postInfo,
  setReportOpen,
}: CommentTypes) {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const commentId = searchParams.get("comment_id") ?? "";
  const {
    likeComment,
    dislikeComment,
    createChildComment,
    updateComment,
    deleteCommentByAdmin,
    deleteCommentByUser,
  } = useCommentReaction(postInfo.id, session?.accessToken || "");
  const userEmail = session?.email ?? "";
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.contents);
  const [alertDesc, setAlertDesc] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);
  const [replying, setReplying] = useState(false);
  const [open, setOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    if (commentId) {
      const el = document.getElementById(`comment-${commentId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" }); // 해당 댓글로 스크롤
        el.classList.add("ring-2", "ring-blue-400"); // 선택된 댓글 강조 효과 (옵션)
        setTimeout(() => {
          el.classList.remove("ring-2", "ring-blue-400");
        }, 2000);
      }
    }
  }, [commentId]);

  const onSubmitReply = () => {
    if (session && session.email) {
      createChildComment.mutate({
        contents: replyText,
        parent_comment_id: comment.id,
      });
      setReplyText("");
      setReplying(false);
    } else {
      setAlertDesc("로그인 사용자만 저장 가능합니다.");
      requestAnimationFrame(() => {
        setAlertStatus(true);
      });
    }
  };

  const onClickupdateComment = () => {
    if (session && session.email) {
      updateComment.mutate({
        contents: editText,
        comment_id: comment.id,
      });
      setReplyText("");
      setReplying(false);
      setIsEditing(false);
    } else {
      setAlertDesc("로그인 사용자만 저장 가능합니다.");
      requestAnimationFrame(() => {
        setAlertStatus(true);
      });
    }
  };

  const onClickDeleteCommentByUser = () => {
    if (session && session.email) {
      deleteCommentByUser.mutate(comment.id);
    } else {
      setAlertDesc("로그인 사용자만 저장 가능합니다.");
      requestAnimationFrame(() => {
        setAlertStatus(true);
      });
    }
  };

  const onClickDeleteCommentByAdmin = () => {
    if (session && session.email) {
      deleteCommentByAdmin.mutate(comment.id);
    } else {
      setAlertDesc("로그인 사용자만 저장 가능합니다.");
      requestAnimationFrame(() => {
        setAlertStatus(true);
      });
    }
  };

  const onClickReaction = (actionType: string) => {
    if (session && session.email) {
      switch (actionType) {
        case "like":
          likeComment.mutate(comment.id);
          break;
        case "dislike":
          dislikeComment.mutate(comment.id);
          break;
        default:
          // 필요 시 처리
          break;
      }
    } else {
      setAlertDesc("로그인 사용자만 저장 가능합니다.");
      requestAnimationFrame(() => {
        setAlertStatus(true);
      });
    }
  };

  return (
    <div className="relative" id={`comment-${comment.id}`}>
      {/* Connection line for nested comments */}
      {comment.depth > 1 && (
        <div
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-blue-200 via-blue-300 to-transparent dark:from-blue-800 dark:via-blue-700 dark:to-transparent"
          style={{
            left: `${(comment.depth - 2) * 24 + 12}px`,
            height: "60px",
          }}
        />
      )}

      {/* Reply connector */}
      {comment.depth > 1 && (
        <div
          className="absolute top-6 w-3 h-px bg-gradient-to-r from-blue-300 to-transparent dark:from-blue-700 dark:to-transparent"
          style={{ left: `${(comment.depth - 2) * 24 + 12}px` }}
        />
      )}

      <div
        className={`relative bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-200 ${
          comment.depth > 1 ? "ml-6" : ""
        }`}
        style={{
          marginLeft:
            comment.depth > 1 ? `${(comment.depth - 1) * 24}px` : "0px",
        }}
      >
        {/* Comment depth indicator */}
        {comment.depth > 1 && (
          <div className="absolute -left-2 top-6 w-4 h-4 bg-blue-100 dark:bg-gray-700 border-2 border-blue-300 dark:border-gray-500 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-gray-300 rounded-full" />
          </div>
        )}

        <div className="p-2 pl-4 space-y-3">
          {/* Header with user info and actions */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {comment.nickname}
                </span>
                {comment.depth > 1 && (
                  <span className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                    답글
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-1 flex-wrap">
                <span>{formatISODateTime(comment.create_time)}</span>
              </div>
            </div>
            {session && session.email && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={6}
                  className="z-[9999] w-32 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg overflow-hidden"
                >
                  {comment.user_email === userEmail ? (
                    <>
                      <DropdownMenuItem
                        className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                        onClick={() => setIsEditing(true)}
                      >
                        <Pencil className="w-4 h-4 mr-2 text-gray-500" />
                        수정
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="my-1 h-px bg-gray-100 dark:bg-gray-700" />

                      <DropdownMenuItem
                        onClick={() => setOpen(true)}
                        className="flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-2 text-red-500" />
                        삭제
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem
                        className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                        onClick={() =>
                          setReportOpen({
                            open: true,
                            id: comment.id,
                            userEmail: comment.user_email,
                          })
                        }
                      >
                        <Flag className="w-4 h-4 mr-2 text-yellow-500" />
                        신고
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                        onClick={() =>
                          setReportOpen({
                            open: true,
                            id: comment.id,
                            userEmail: comment.user_email,
                          })
                        }
                      >
                        <Ban className="w-4 h-4 mr-2 text-red-500" />
                        차단
                      </DropdownMenuItem>
                    </>
                  )}
                  {session.userInfo.is_admin && (
                    <>
                      <DropdownMenuItem
                        className="flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 cursor-pointer transition-colors"
                        onClick={() => onClickDeleteCommentByAdmin()}
                      >
                        <MessageCircleX className="w-4 h-4 mr-2 text-red-500" />
                        관리자 삭제
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="flex items-center px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 cursor-pointer transition-colors"
                        onClick={() => onClickDeleteCommentByAdmin()}
                      >
                        <UserRoundX className="w-4 h-4 mr-2 text-red-500" />
                        사용자 밴
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Comment content */}
          {!isEditing ? (
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
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed m-0 font-medium">
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
          ) : (
            <div className="space-y-3">
              <Textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => onClickupdateComment()}
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  저장
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  className="cursor-pointer border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  취소
                </Button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center space-x-1 pt-1 border-t border-gray-100 dark:border-gray-600">
            <Button
              variant="ghost"
              size="sm"
              className={`cursor-pointer h-8 px-3 rounded-full transition-colors ${
                comment.is_like === 1
                  ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
                  : "text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
              }`}
              onClick={() => onClickReaction("like")}
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{comment.like_count}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`cursor-pointer h-8 px-2 rounded-full transition-colors ${
                comment.is_like === 0
                  ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20"
                  : "text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              }`}
              onClick={() => onClickReaction("dislike")}
            >
              <ThumbsDown className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">
                {comment.dislike_count}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer h-8 px-3 rounded-full text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
              onClick={() => setReplying(!replying)}
            >
              <Reply className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">답글</span>
            </Button>
          </div>

          {/* Reply form */}
          {replying && (
            <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-600">
              <Textarea
                placeholder={`${comment.nickname} 님에게 답글을 작성하세요.`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setReplying(false)}
                  className="cursor-pointer border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  취소
                </Button>
                <Button
                  size="sm"
                  onClick={onSubmitReply}
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  답글 작성
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <DefaultDialog
        open={alertStatus}
        setOpen={setAlertStatus}
        title="Notice"
        description={alertDesc}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>댓글을 정말 삭제하시겠습니까?</DialogTitle>
          </DialogHeader>
          <div className="text-sm text-gray-600 dark:text-gray-400 my-4">
            삭제한 댓글은 복구할 수 없습니다.
          </div>
          <DialogFooter className="flex justify-end gap-3">
            <Button
              className=" cursor-pointer"
              variant="outline"
              size="sm"
              onClick={() => setOpen(false)}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              className=" cursor-pointer"
              size="sm"
              onClick={() => {
                onClickDeleteCommentByUser();
                setOpen(false);
              }}
            >
              삭제
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
