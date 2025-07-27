"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { CategoryFilterTypes } from "../rank.types";
import { rankCategoryList } from "@/lib/consts/libraryConsts";

export default function CategoryFilter({
  onChangeCategory,
  listCategory,
}: CategoryFilterTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {rankCategoryList.map((category) => (
        <Button
          key={category.value}
          variant={
            listCategory.includes(category.value) ? "outline" : "secondary" // "default" 대신 "secondary" 사용
          }
          size="sm"
          onClick={() => onChangeCategory(category.value)}
          className="text-xs px-3 py-1.5 h-auto cursor-pointer"
        >
          {category[localeKey]}
        </Button>
      ))}
    </div>
  );
}
