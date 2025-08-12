"use client";

import { cn } from "@/lib/utils";
import { FileText, Clock, Eye, MessageCircle, ThumbsUp } from "lucide-react";
import { PostGridTypes } from "../community.types";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatISODateTime } from "@/lib/func/formatTime";
import { CATEGORY_LIST } from "@/lib/consts/community-consts";
import CustomPagination from "../../CustomPagination/custom-pagination";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function PostGrid({ postInfo, category }: PostGridTypes) {
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page") || 1;
  console.log(postInfo);
  return (
    <div className="space-y-4">
      {postInfo.posts.length < 1 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          결과가 없습니다.
        </div>
      ) : (
        postInfo.posts.map((post) => (
          <Link
            key={post.id}
            href={`/community/detail/${post.id}-${post.slug}`}
            className="block bg-white dark:bg-gray-800 rounded-lg p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200 cursor-pointer group"
          >
            <div className="flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 dark:text-white dark:group-hover:text-blue-400 flex items-center gap-2">
                    <span className="inline-flex items-center gap-2">
                      {post.thumbnail ? (
                        <div className="flex-shrink-0 relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden rounded-lg">
                          <Image
                            src={post.thumbnail}
                            alt={post.title || "Thumbnail"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 25vw"
                            priority={false} // 중요도 낮으면 lazy load
                          />
                        </div>
                      ) : (
                        <FileText
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0"
                        />
                      )}
                      <span>{post.title}</span>
                    </span>
                  </h3>
                  <Badge
                    className={cn(
                      "ml-2 flex-shrink-0 text-white",
                      CATEGORY_LIST.find(
                        (original) => original.id === post.category
                      )?.color
                    )}
                  >
                    {
                      CATEGORY_LIST.find(
                        (original) => original.id === post.category
                      )?.kr
                    }
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {post.user_email}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatISODateTime(post.create_time)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      {/* <span>{post.views.toLocaleString()}</span> */}
                    </div>
                    <div className="flex items-center space-x-1">
                      <MessageCircle className="w-3 h-3" />
                      {/* <span>{post.comments}</span> */}
                    </div>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="w-3 h-3" />
                      {/* <span>{post.likes}</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))
      )}
      {postInfo.total > 0 && (
        <CustomPagination
          total={postInfo.max_page_count}
          routeLink={`/community/${category}?page=`}
          currentPage={Number(pageNum)}
        />
      )}
    </div>
  );
}
