"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SidebarSearch() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    router.push(`/community/search`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-4 h-4" />
          <Input
            type="search"
            placeholder="통합 검색..."
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
    </div>
  );
}
