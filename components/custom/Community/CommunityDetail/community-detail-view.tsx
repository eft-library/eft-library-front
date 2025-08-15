"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Eye,
  MessageCircle,
  Clock,
  UserIcon,
  // Bell,
  Edit,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommunityDetailTypes } from "../community.types";
import { formatISODateTime } from "@/lib/func/formatTime";
import { useSession } from "next-auth/react";
import { CATEGORY_LIST } from "@/lib/consts/community-consts";
import { purifyHtml } from "@/lib/func/jsxfunction";
import CategoryTab from "../CategoryTab/category-tab";
import { useRouter } from "next/navigation";
import CommunityReaction from "./CommunityReaction/community-reaction";

export function CommunityDetailView({ postInfo }: CommunityDetailTypes) {
  const { data: session } = useSession();
  const router = useRouter();
  const [following, setFollowing] = useState(false);

  const isOwner = session && session?.email === postInfo.user_email;

  const postCategory = CATEGORY_LIST.find(
    (original) => original.id === postInfo.category
  );

  const goBack = () => {
    router.push(`/community/${postInfo.category}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          PMC 라운지
        </h1>
        <CategoryTab currentCategory={postInfo.category} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
          <div className="lg:col-span-3">
            <article className="space-y-6">
              {/* Breadcrumb / back */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goBack}
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
                  {/* {currentUser.isModerator && !isOwner && (
                    <Badge
                      variant="outline"
                      className="border-orange-400 text-orange-400 dark:text-orange-300"
                    >
                      모더레이터
                    </Badge>
                  )} */}
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
                          <span className="text-gray-900 dark:text-white">
                            {postInfo.total_post_count}
                          </span>
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          팔로워
                          <span className="text-gray-900 dark:text-white">
                            {postInfo.follower_count.toLocaleString()}
                          </span>
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
                    {/* <Button
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
                    </Button> */}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <div className="prose prose-invert max-w-none">
                  <div
                    className="text-gray-700 dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: purifyHtml(postInfo.contents),
                    }}
                  />
                </div>
              </div>

              {/* Reactions / Actions */}
              <CommunityReaction postInfo={postInfo} />

              <Separator className="bg-gray-200 dark:bg-gray-700" />
            </article>
            {/* <CommentsSection /> */}

            {/* Full Post List Section */}
            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                전체 게시글
              </h2>
              {/* PostGrid will now display all posts without a local search filter */}
              {/* <PostGrid /> */}
            </section>
          </div>
          <div className="lg:col-span-1">{/* <PostSidebar /> */}</div>
        </div>
      </div>
    </div>
  );
}
