"use client";

import type { CommunityViewTypes } from "../community.types";
import CategoryTab from "../CategoryTab/category-tab";

export default function CommunityView({
  postInfo,
  category,
}: CommunityViewTypes) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          커뮤니티
        </h1>
        <CategoryTab currentCategory={category} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3">
            {/* <PostGrid searchQuery={searchQuery} searchScope={searchScope} /> */}
            {/* <div className="flex flex-col sm:flex-row gap-2 mt-6">
              <Select
                value={searchScope}
                onValueChange={(value: "title" | "titleContent" | "author") =>
                  setSearchScope(value)
                }
              >
                <SelectTrigger className="w-full sm:w-[150px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                  <SelectValue placeholder="검색 범위" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                  <SelectItem value="title">제목</SelectItem>
                  <SelectItem value="titleContent">제목+내용</SelectItem>
                  <SelectItem value="author">글쓴이</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="게시글 검색..."
                  className="pl-10 w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                />
              </div>
              <Button
                onClick={handleSearch}
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
              >
                검색
              </Button>
              <Button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 flex items-center gap-1 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
                <Pencil className="w-4 h-4" />
                글쓰기
              </Button>
            </div> */}
          </div>
          <div className="lg:col-span-1">{/* <Sidebar /> */}</div>
        </div>
      </div>
    </div>
  );
}
