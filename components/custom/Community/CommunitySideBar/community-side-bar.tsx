"use client";

import { Flame, MessageSquare, Pin } from "lucide-react";
import { CommunitySideBarTypes, SideBarStateTypes } from "../community.types";
import SidebarSearch from "../SideBarSearch/side-bar-search";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import FollowUser from "../CommunityDetail/FollowUser/follow-user";
import { useEffect, useState } from "react";
import { requestData } from "@/lib/config/api";
import { COMMUNITY_ENDPOINTS } from "@/lib/config/endpoint";

export default function CommunitySideBar({
  author_detail,
}: CommunitySideBarTypes) {
  const [sideBarData, setSideBarData] = useState<SideBarStateTypes>();

  useEffect(() => {
    const fetchCommunityDetail = async () => {
      try {
        const data = await requestData(`${COMMUNITY_ENDPOINTS.SIDE_POSTS}`);

        if (!data || data.status !== 200)
          throw new Error(data?.msg || "Failed to fetch post data");
        setSideBarData(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCommunityDetail();
  }, []);

  if (!sideBarData) return null;

  return (
    <div className="space-y-6">
      <div className="hidden md:block">
        <SidebarSearch />
      </div>

      {/* Trending Posts */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Flame className="w-5 h-5 mr-2 text-orange-400" />
          인기 게시물
        </h3>
        <div className="space-y-3">
          {sideBarData.issue_posts.map((post, index) => (
            <Link
              key={post.id}
              scroll={false}
              href={`/community/detail/${post.id}-${post.slug}`}
            >
              <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                <span className="text-xs font-bold text-orange-400 mt-1">
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-1">
                    {post.title}
                    <Flame className="inline w-3 h-3 ml-1 text-red-500" />
                  </p>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-3 h-3 text-gray-400 dark:text-gray-500" />
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {post.comment_count}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Pinned Announcements */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Pin className="w-5 h-5 mr-2 text-orange-400" />
          {"공지사항"}
        </h3>
        <div className="space-y-3">
          {sideBarData.notice_posts.map((announcement, index) => (
            <Link
              key={index}
              href={`/notice/detail/${announcement.id}`}
              scroll={false}
            >
              <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                <p className="text-gray-700 dark:text-gray-300 text-sm flex-1 line-clamp-1">
                  {announcement.name.ko}
                </p>
                <Badge
                  variant="outline"
                  className="ml-2 text-xs border-orange-400 text-orange-400"
                >
                  공지
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {author_detail && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            작성자 정보
          </h3>
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full mx-auto flex items-center justify-center">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                User
              </span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">
                {author_detail.nickname}
              </h4>
              {/* <Badge
                variant="outline"
                className="text-xs border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 mt-1"
              >
                베테랑
              </Badge> */}
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {author_detail.posts_count}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  게시물
                </p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {author_detail.like_count.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  좋아요
                </p>
              </div>
            </div>
            <FollowUser author_email={author_detail.user_email} />
            {/* <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              팔로우
            </Button> */}
          </div>
        </div>
      )}
    </div>
  );
}
