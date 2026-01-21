"use client";

import { Check } from "lucide-react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import type { ProgressItemBoxTypes } from "./progress.types";
import Image from "next/image";

export default function ProgressItem({
  item,
  handleClick,
  currentUserList,
}: ProgressItemBoxTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const isInclude = currentUserList.includes(item.id);

  return (
    <button
      key={item.id}
      onClick={() => handleClick(item.id)}
      className="group/item relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300/50 dark:hover:border-gray-600/50 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 p-3"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5 dark:from-emerald-400/10 dark:via-blue-400/10 dark:to-purple-400/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />

      <div className="relative flex flex-col items-center gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-800 dark:to-gray-700/50">
          <div className="flex h-full w-full items-center justify-center p-2">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name.en}
              width={128}
              height={128}
              className={`h-full w-full object-contain rounded-lg transition-all duration-200 ${
                isInclude
                  ? "brightness-50 scale-95"
                  : "group-hover/item:scale-110"
              }`}
            />
          </div>

          {isInclude && (
            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm bg-black/10 dark:bg-black/30">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/50">
                <Check className="h-8 w-8 text-white" strokeWidth={3} />
              </div>
            </div>
          )}
        </div>

        <p className="relative text-center text-xs font-semibold text-gray-900 dark:text-white line-clamp-2">
          {item.name[localeKey]}
        </p>
      </div>
    </button>
  );
}
