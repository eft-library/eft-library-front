"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { requestGetUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useQuery } from "@tanstack/react-query";
import { Bookmark, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Loading from "../../Loading/loading";
import { BookmarksTypes } from "../my-page.types";
import CustomPagination from "../../CustomPagination/custom-pagination";
import { formatISODateTime } from "@/lib/func/formatTime";

export default function Bookmarks() {
  const { data: session, status } = useSession();
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page") || 1;
  const [deleteBookmark, setDeleteBookmark] = useState({
    postId: "",
    deleteOpen: false,
  });

  const fetchPostsData = async () => {
    const data = await requestGetUserData(
      `${
        USER_API_ENDPOINTS.MY_PAGE_BOOKMARKS
      }?page_num=${pageNum}&_ts=${Date.now()}`,
      session
    );
    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch post reaction data");
    }
    return data.data;
  };

  const { data: bookmarksData, isLoading } = useQuery<BookmarksTypes>({
    queryKey: ["myPageBookmarksData"],
    queryFn: () => fetchPostsData(),
    enabled: status === "authenticated",
  });

  if (isLoading || !bookmarksData) return <Loading />;

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
          <Bookmark className="w-5 h-5" />
          <span>북마크한 게시글 ({bookmarksData.total_count})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mb-4">
          {bookmarksData.bookmarks.map((post) => (
            <div
              key={post.id}
              className={`p-4 rounded-lg border transition-colors cursor-pointer relative ${
                theme === "dark"
                  ? "border-gray-700/50 hover:border-orange-400/50 hover:bg-gray-700/30"
                  : "border-gray-200 hover:border-orange-500/50 hover:bg-gray-50"
              }`}
            >
              <button
                // onClick={(e) => {
                //   e.stopPropagation();
                //   setSelectedBookmarkPost(post);
                //   setShowBookmarkModal(true);
                // }}
                className={`absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
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
                <span>
                  작성자:{" "}
                  <span className="text-orange-400">{post.nickname}</span>
                </span>
                <span>{formatISODateTime(post.create_time)}</span>
              </div>
            </div>
          ))}
        </div>
        {bookmarksData.total_count > 0 && (
          <CustomPagination
            total={bookmarksData.max_page_count}
            routeLink={`/mypage/posts?page=`}
            currentPage={Number(pageNum)}
          />
        )}
      </CardContent>
    </Card>
  );
}
