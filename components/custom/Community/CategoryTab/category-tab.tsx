import { Button } from "@/components/ui/button";
import { CATEGORY_LIST } from "@/lib/consts/community-consts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { CategoryTabTypes } from "../community.types";

export default function CategoryTab({ currentCategory }: CategoryTabTypes) {
  return (
    <div className="bg-gray-800 light:bg-white rounded-lg p-1 flex items-center justify-between">
      <div className="flex flex-wrap gap-1">
        {CATEGORY_LIST.map((category) => (
          <Link key={category.id} href={`/community/${category.id}`}>
            <button
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-2",
                currentCategory === category.id
                  ? "bg-orange-500 text-white shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              )}
            >
              <span>{category.kr}</span>
            </button>
          </Link>
        ))}
      </div>
      <Link href={"/community/create"}>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-md flex items-center gap-1 ml-2">
          <Pencil className="w-4 h-4" />
          글쓰기
        </Button>
      </Link>
    </div>
  );
}
