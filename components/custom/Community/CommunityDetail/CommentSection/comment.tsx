"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatISODateTime } from "@/lib/func/formatTime";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, Flag } from "lucide-react";
import { CommentTypes } from "../../community.types";
import { useSession } from "next-auth/react";

export default function Comment({ comment, deleteComment }: CommentTypes) {
  const { data: session } = useSession();
  const userEmail = session?.email ?? "";

  return (
    <div className="flex space-x-4">
      {/* <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage
                      src={comment.author.avatar || "/placeholder.svg"}
                      alt={comment.author.name}
                    />
                    <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                  </Avatar> */}
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="font-medium text-gray-900 dark:text-white">
                {comment.user_email}
              </span>
              {/* {comment.isAdmin && (
                          <Badge
                            variant="outline"
                            className="text-xs text-red-400 border-red-400"
                          >
                            관리자
                          </Badge>
                        )} */}
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-500 mt-1 flex-wrap">
              {/* <Badge
                          variant="outline"
                          className="text-xs border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                        >
                          {comment.author.level}
                        </Badge> */}
              <span>{formatISODateTime(comment.create_time)}</span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            >
              {comment.user_email === userEmail ? (
                <>
                  <DropdownMenuItem
                    className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() =>
                      setEditingId({
                        type: "comment",
                        id: comment.id,
                      })
                    }
                  >
                    <Pencil className="w-4 h-4 mr-2" /> 수정
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-500 dark:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => deleteComment(comment.id)}
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
                      id: comment.id,
                    })
                  }
                >
                  <Flag className="w-4 h-4 mr-2" /> 신고하기
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {!isEditing ? (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {comment.content}
          </p>
        ) : (
          <div className="space-y-2">
            <Textarea
              value={editDraft}
              onChange={(e) =>
                setEditingId({
                  ...editingId,
                  content: e.target.value,
                })
              }
              className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() =>
                  updateItem({ type: "comment", id: comment.id }, editDraft)
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

        {/* <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400"
                      onClick={() =>
                        toggleLikeDislike(
                          { type: "comment", id: comment.id },
                          "like"
                        )
                      }
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {comment.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                      onClick={() =>
                        toggleLikeDislike(
                          { type: "comment", id: comment.id },
                          "dislike"
                        )
                      }
                    >
                      <ThumbsDown className="w-4 h-4 mr-1" />
                      {comment.dislikes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      onClick={() =>
                        setReplyingTo(
                          replyingTo === comment.id ? null : comment.id
                        )
                      }
                    >
                      <Reply className="w-4 h-4 mr-1" />
                      답글
                    </Button>
                  </div> */}

        {/* {replyingTo === comment.id && (
                    <div className="space-y-2 mt-3">
                      <Textarea
                        placeholder={`${comment.author.name}님에게 답글...`}
                        value={replyDraft}
                        onChange={(e) =>
                          setReplyingTo({
                            ...replyingTo,
                            content: e.target.value,
                          })
                        }
                        className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        rows={3}
                      />
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setReplyingTo(null)}
                          className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                        >
                          취소
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => submitReply(comment.id, replyDraft)}
                          className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                          답글 작성
                        </Button>
                      </div>
                    </div>
                  )} */}
      </div>
    </div>
  );
}
