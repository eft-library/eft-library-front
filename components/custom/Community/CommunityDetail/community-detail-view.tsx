"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Clock,
  UserIcon,
  Flag,
  Bell,
  Edit,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReportDialog } from "./ReportDialog/report-dialog";
import { ShareDialog } from "./ShareDialog/share-dialog";
import { CommunityDetailTypes } from "../community.types";
import { formatISODateTime } from "@/lib/func/formatTime";
import { useSession } from "next-auth/react";
import { CATEGORY_LIST } from "@/lib/consts/community-consts";
import { purifyHtml } from "@/lib/func/jsxfunction";

export function CommunityDetailView({ postInfo }: CommunityDetailTypes) {
  const { data: session } = useSession();
  const currentUser = {
    id: "u1",
    name: "EFTVeteraN",
    avatar: "/placeholder.svg?height=40&width=40",
    isModerator: true,
  };

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false); // 싫어요 상태 추가
  const [bookmarked, setBookmarked] = useState(false);
  const [following, setFollowing] = useState(false);
  const [subscribed, setSubscribed] = useState(true);
  const [shareOpen, setShareOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const isOwner = session && session?.email === postInfo.user_email;

  const postCategory = CATEGORY_LIST.find(
    (original) => original.id === postInfo.category
  );

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      if (disliked) setDisliked(false);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      if (liked) setLiked(false);
    }
  };

  return (
    <article className="space-y-6">
      {/* Breadcrumb / back */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-auto text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          목록으로
        </Button>

        <div className="flex items-center gap-2">
          {isOwner && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Edit className="w-4 h-4 mr-1" /> 수정
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 dark:text-red-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Trash2 className="w-4 h-4 mr-1" /> 삭제
              </Button>
            </>
          )}
          {currentUser.isModerator && !isOwner && (
            <Badge
              variant="outline"
              className="border-orange-400 text-orange-400 dark:text-orange-300"
            >
              모더레이터
            </Badge>
          )}
        </div>
      </div>

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
          <Badge
            className={`${postCategory?.color} mb-2 sm:mb-0 text-white flex items-center justify-center`}
          >
            {postCategory?.kr}
          </Badge>
          <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 flex-wrap justify-end">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{postInfo.view_count.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {/* <span>{post.comments}</span> */}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{formatISODateTime(postInfo.create_time)}</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          {postInfo.title}
        </h1>

        {/* Author row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            {/* <Avatar className="w-10 h-10 rounded-lg">
              <AvatarImage
                src={post.author.avatar || "/placeholder.svg"}
                alt={postInfo.user_email}
              />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar> */}
            <div>
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="font-medium text-gray-900 dark:text-white">
                  {postInfo.user_email}
                </span>
                {/* <Badge
                  variant="outline"
                  className="text-xs border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                >
                  {post.author.level}
                </Badge> */}
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <UserIcon className="w-3 h-3 mr-1" />
                  게시물
                  {/* <span className="text-gray-900 dark:text-white">
                    {post.author.posts}
                  </span> */}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  팔로워
                  {/* <span className="text-gray-900 dark:text-white">
                    {post.author.followers.toLocaleString()}
                  </span> */}
                </span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-500 mt-1">
                최종 수정: {formatISODateTime(postInfo.update_time)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className={`text-sm ${
                following
                  ? "text-orange-400"
                  : "text-gray-600 dark:text-gray-300"
              } hover:bg-gray-100 dark:hover:bg-gray-700`}
              onClick={() => setFollowing((f) => !f)}
            >
              <CheckCircle2 className="w-4 h-4 mr-1" />
              {following ? "팔로잉" : "팔로우"}
            </Button>
            <Button
              variant="ghost"
              className={`text-sm ${
                subscribed
                  ? "text-orange-400"
                  : "text-gray-600 dark:text-gray-300"
              } hover:bg-gray-100 dark:hover:bg-gray-700`}
              onClick={() => setSubscribed((s) => !s)}
            >
              <Bell className="w-4 h-4 mr-1" />
              알림 {subscribed ? "해제" : "받기"}
            </Button>
          </div>
        </div>
      </div>

      {/* Attachments - Removed */}

      {/* Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="prose prose-invert max-w-none">
          <div
            className="text-gray-700 dark:text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: purifyHtml(postInfo.contents) }}
          />
        </div>
      </div>

      {/* Reactions / Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <div className="flex flex-wrap justify-center sm:flex sm:items-center sm:justify-between gap-2 sm:gap-4">
          {/* 좋아요 / 싫어요 그룹 */}
          <div className="flex w-full sm:w-auto justify-center gap-2">
            <Button
              variant="ghost"
              className={`flex items-center space-x-2 ${
                liked ? "text-orange-400" : "text-gray-600 dark:text-gray-300"
              } hover:bg-gray-100 dark:hover:bg-gray-700 w-1/2 sm:w-auto justify-center`}
              onClick={handleLike}
            >
              <ThumbsUp className="w-5 h-5" />
              <span>좋아요</span>
              {/* <span className="text-sm">
                ({liked ? post.likes + 1 : post.likes})
              </span> */}
            </Button>
            <Button
              variant="ghost"
              className={`flex items-center space-x-2 ${
                disliked ? "text-red-400" : "text-gray-600 dark:text-gray-300"
              } hover:bg-gray-100 dark:hover:bg-gray-700 w-1/2 sm:w-auto justify-center`}
              onClick={handleDislike}
            >
              <ThumbsDown className="w-5 h-5" />
              <span>싫어요</span>
              {/* <span className="text-sm">({disliked ? 10 + 1 : 10})</span>{" "} */}
            </Button>
          </div>

          {/* 북마크 / 공유 / 신고 그룹 */}
          <div className="flex w-full sm:w-auto justify-center gap-2 mt-2 sm:mt-0">
            <Button
              variant="ghost"
              className={`flex items-center space-x-2 ${
                bookmarked
                  ? "text-orange-400"
                  : "text-gray-600 dark:text-gray-300"
              } hover:bg-gray-100 dark:hover:bg-gray-700 w-1/3 sm:w-auto justify-center`}
              onClick={() => setBookmarked((v) => !v)}
            >
              <Bookmark className="w-5 h-5" />
              <span>북마크</span>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-1/3 sm:w-auto justify-center"
              onClick={() => setShareOpen(true)}
            >
              <Share2 className="w-5 h-5" />
              <span>공유</span>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-1/3 sm:w-auto justify-center"
              onClick={() => setReportOpen(true)}
            >
              <Flag className="w-5 h-5" />
              <span>신고</span>
            </Button>
          </div>
        </div>
      </div>

      <ShareDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        title="게시글 공유"
        url=""
      />
      <ReportDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        subject="post"
        subjectId={postInfo.id}
      />

      <Separator className="bg-gray-200 dark:bg-gray-700" />
    </article>
  );
}
