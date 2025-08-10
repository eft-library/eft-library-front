"use client";

import { Button } from "@/components/ui/button";
import { CATEGORY_LIST } from "@/lib/consts/community-consts";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CategoryTab() {
  const param = useParams<{ id: string }>();

  return (
    <div className="bg-gray-800 rounded-lg p-1">
      <div className="flex flex-wrap gap-1">
        {CATEGORY_LIST.map((category) => (
          <Link key={category.id} href={`/community/${category.id}`}>
            <Button
              variant={"outline"}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2",
                param.id === category.id
                  ? "bg-orange-500 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              )}
            >
              <span>{category.kr}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
