"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ImageIcon,
  FileText,
  User,
  Clock,
  Eye,
  MessageCircle,
  ThumbsUp,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { CATEGORY_LIST } from "@/lib/consts/community-consts";
import { SearchResultViewTypes } from "../community.types";
import CustomPagination from "../../CustomPagination/custom-pagination";
import { formatISODateTime } from "@/lib/func/formatTime";
import Link from "next/link";
import CategoryTab from "../CategoryTab/category-tab";
import SidebarSearch from "../SideBarSearch/side-bar-search";
import Highlighter from "react-highlight-words";

export default function SearchResultView({ postInfo }: SearchResultViewTypes) {
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page") ?? "1";
  const searchType = searchParams.get("search_type") ?? "all";
  const word = searchParams.get("word") ?? "";

  const getScopeLabel = (scope: string) => {
    switch (scope) {
      case "all":
        return "통합검색";
      case "title":
        return "제목";
      case "titleContent":
        return "제목+내용";
      case "comments":
        return "댓글";
      case "author":
        return "글쓴이";
      default:
        return "전체";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          PMC 라운지
        </h1>
        <CategoryTab />
        <div className="md:hidden mt-6">
          <SidebarSearch />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* 검색 결과 헤더 */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  검색 결과
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>검색어:</span>
                  <Badge
                    variant="outline"
                    className="text-orange-300 border-gray-300"
                  >
                    {word}
                  </Badge>
                  <span>검색 범위:</span>
                  <Badge
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600"
                  >
                    {getScopeLabel(searchType)}
                  </Badge>
                  <span>총 {postInfo.total_count}개 결과</span>
                </div>
              </div>

              {/* 검색 결과 목록 */}
              <div className="space-y-4">
                {postInfo.total_count === 0 ? (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                    검색 결과가 없습니다.
                  </div>
                ) : (
                  <>
                    {/* 통합 검색 결과 - 시간순으로 정렬된 글과 댓글 */}
                    {postInfo.search_result.map((post, index) => (
                      <div
                        key={`post-with-comment-${post.id}-${index}`}
                        className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                      >
                        {/* 게시글 부분 */}
                        <Link
                          href={`/community/detail/${post.id}-${post.slug}`}
                          className="block p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200 cursor-pointer group"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2 dark:text-white dark:group-hover:text-blue-400 flex items-center gap-2">
                                  <span className="inline-flex items-center gap-2">
                                    {post.thumbnail ? (
                                      <ImageIcon
                                        aria-hidden="true"
                                        className="w-5 h-5 text-orange-300 shrink-0"
                                      />
                                    ) : (
                                      <FileText
                                        aria-hidden="true"
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0"
                                      />
                                    )}

                                    <Highlighter
                                      highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                                      searchWords={[word]}
                                      autoEscape
                                      textToHighlight={post.title}
                                    />
                                  </span>
                                </h3>
                                <Badge
                                  className={cn(
                                    "ml-2 flex-shrink-0 text-white",
                                    CATEGORY_LIST.find(
                                      (original) =>
                                        original.id === post.category
                                    )?.color
                                  )}
                                >
                                  {post.category}
                                </Badge>
                              </div>

                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                                <Highlighter
                                  highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                                  searchWords={[word]}
                                  autoEscape
                                  textToHighlight={post.contents}
                                />
                              </p>

                              <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-500">
                                <div className="flex items-center space-x-4">
                                  <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {post.nickname}
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-3 h-3" />
                                    <span>
                                      {formatISODateTime(post.create_time)}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center space-x-1">
                                    <Eye className="w-3 h-3" />
                                    <span>
                                      {post.view_count.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MessageCircle className="w-3 h-3" />
                                    <span>{post.comment_count}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <ThumbsUp className="w-3 h-3" />
                                    <span>{post.reaction_score}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>

                        {/* 댓글 부분 */}
                        {post.comment.id && (
                          <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                            <div className="pt-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <Badge
                                  variant="outline"
                                  className="border-gray-300"
                                >
                                  검색된 댓글
                                </Badge>
                                <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-500">
                                  <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    {post.comment.user_email}
                                  </span>
                                  <div className="flex items-center space-x-1">
                                    <Clock className="w-3 h-3" />
                                    <span>
                                      {formatISODateTime(
                                        post.comment.create_time
                                      )}
                                    </span>
                                  </div>
                                  {/* <div className="flex items-center space-x-1">
                              <ThumbsUp className="w-3 h-3" />
                              <span>{post.comment.}</span>
                            </div> */}
                                </div>
                              </div>

                              <p className="text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded-lg border-l-4 border-orange-400">
                                <Highlighter
                                  highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                                  searchWords={[word]}
                                  autoEscape
                                  textToHighlight={post.comment.contents}
                                />
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>

              {/* 페이지네이션 - 10개 초과 시 표시 */}
              {postInfo.max_page_count > 1 && (
                <CustomPagination
                  total={postInfo.max_page_count}
                  routeLink={`/community/search?word=${word}&search_type=${searchType}&page=`}
                  currentPage={Number(pageNum)}
                />
              )}
            </div>
          </div>
          {/* <div className="lg:col-span-1">
                <CommunitySideBar
                  issue_posts={postInfo.issue_posts}
                  notice_posts={postInfo.notice_posts}
                />
              </div> */}
        </div>
      </div>
    </div>
  );
}
