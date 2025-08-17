"use client";

import { Button } from "@/components/ui/button";
import { CATEGORY_LIST } from "@/lib/consts/community-consts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAppStore } from "@/store/provider";

export default function CategoryTab() {
  const { pageCategory } = useAppStore((state) => state);
  const { data: session } = useSession();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-1 flex items-center justify-between">
      <div className="flex flex-wrap gap-1">
        {CATEGORY_LIST.map((category) => (
          <Link key={category.id} href={`/community/${category.id}`}>
            <button
              className={cn(
                "px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200 flex items-center space-x-2 cursor-pointer",
                pageCategory === category.id
                  ? `${category.color} text-white shadow-lg`
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <span>{category.kr}</span>
              {/* <span className="text-xs opacity-75">({category.count})</span> */}
            </button>
          </Link>
        ))}
      </div>
      {session && session.email && (
        <Link href={"/community/create"}>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-md flex items-center gap-1 ml-2">
            <Pencil className="w-4 h-4" />
            글쓰기
          </Button>
        </Link>
      )}
    </div>
  );
}
