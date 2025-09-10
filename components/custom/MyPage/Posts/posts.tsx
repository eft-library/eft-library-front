"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { requestGetUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useQuery } from "@tanstack/react-query";
import { MessageSquare, X, Calendar, Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Loading from "../../Loading/loading";
import { PostsTypes } from "../my-page.types";
import CustomPagination from "../../CustomPagination/custom-pagination";
import { useSearchParams } from "next/navigation";
import { formatISODateTime } from "@/lib/func/formatTime";
import CommunityDelete from "../../Community/CommunityDetail/CommunityDelete/community-delete";
import { useState } from "react";

export default function Posts() {
  const { data: session, status } = useSession();
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page") || 1;
  const [deletePost, setDeletePost] = useState({
    postId: "",
    deleteOpen: false,
  });

  const fetchPostsData = async () => {
    const data = await requestGetUserData(
      `${
        USER_API_ENDPOINTS.MY_PAGE_POSTS
      }?page_num=${pageNum}&_ts=${Date.now()}`,
      session
    );
    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch post reaction data");
    }
    return data.data;
  };

  const { data: postsData, isLoading } = useQuery<PostsTypes>({
    queryKey: ["myPagePostsData"],
    queryFn: () => fetchPostsData(),
    enabled: status === "authenticated",
  });

  if (isLoading || !postsData) return <Loading />;

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
          <MessageSquare className="w-5 h-5" />
          <span>작성 글 ({postsData.total_count})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4">
          {postsData.posts.map((post) => (
            <div
              key={post.id}
              className={`p-4 rounded-lg border transition-colors cursor-pointer relative ${
                theme === "dark"
                  ? "border-gray-700/50 hover:border-orange-400/50 hover:bg-gray-700/30"
                  : "border-gray-200 hover:border-orange-500/50 hover:bg-gray-50"
              }`}
            >
              <button
                onClick={() => {
                  setDeletePost({
                    deleteOpen: true,
                    postId: post.id,
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
              <h3
                className={`font-medium mb-2 pr-8 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {post.title}
              </h3>
              <div
                className={`flex items-center space-x-4 text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>작성일: {formatISODateTime(post.create_time)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>최종 수정: {formatISODateTime(post.update_time)}</span>
                </span>
                <span>조회 {post.view_count}</span>
                <span className="flex items-center space-x-1">
                  <Heart className="w-4 h-4" />
                  <span>{post.reaction_score}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.comment_count}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
        {postsData.total_count > 0 && (
          <CustomPagination
            total={postsData.max_page_count}
            routeLink={`/mypage/posts?page=`}
            currentPage={Number(pageNum)}
          />
        )}
      </CardContent>
      <CommunityDelete
        open={deletePost.deleteOpen}
        setOpen={(open) => setDeletePost({ postId: "", deleteOpen: open })}
        postId={deletePost.postId}
        routeLink="/mypage/posts"
      />
    </Card>
  );
}
