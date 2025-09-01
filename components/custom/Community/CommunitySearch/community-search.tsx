"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CommunitySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchType = searchParams.get("search_type") ?? "all";
  const word = searchParams.get("word") ?? "";
  const [searchQuery, setSearchQuery] = useState(word);
  const [searchScope, setSearchScope] = useState(searchType);

  const handleSearch = () => {
    router.push(
      `/community/search?word=${searchQuery}&search_type=${searchScope}&page=1`
    );
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 mt-6">
      <Select
        value={searchScope}
        onValueChange={(value: string) => setSearchScope(value)}
      >
        <SelectTrigger className="w-full sm:w-[150px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
          <SelectValue placeholder="검색 범위" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100">
          <SelectItem value="all">통합검색</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="titleContent">제목+내용</SelectItem>
          <SelectItem value="comment">댓글</SelectItem>
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
    </div>
  );
}
