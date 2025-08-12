"use client";

import { Flame, MessageSquare, Pin } from "lucide-react";
import { CommunitySideBarTypes } from "../community.types";
import SidebarSearch from "../SideBarSearch/side-bar-search";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function CommunitySideBar({
  issue_posts,
  notice_posts,
}: CommunitySideBarTypes) {
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
          {issue_posts.map((post, index) => (
            <Link
              key={post.id}
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
                      {/* {post.comments} */}
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
          {notice_posts.map((announcement, index) => (
            <Link key={index} href={`/notice/detail/${announcement.id}`}>
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
    </div>
  );
}
