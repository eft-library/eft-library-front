"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { BACKPACK_WIDTH, BACKPACK_HEIGHT } from "@/lib/consts/libraryConsts";
import { itemI18N } from "@/lib/consts/i18nConsts";
import { cn } from "@/lib/utils";
import type { BackpackGridTypes } from "../../minigame-types";

export default function BackpackGrid({ itemList }: BackpackGridTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="text-lg font-bold text-foreground">배낭</h2>
      <div
        className="grid gap-0.5 p-2 bg-secondary/50 rounded-lg border border-border"
        style={{
          gridTemplateColumns: `repeat(${BACKPACK_WIDTH}, 1fr)`,
        }}
      >
        {Array.from({ length: BACKPACK_HEIGHT }).map((_, y) =>
          Array.from({ length: BACKPACK_WIDTH }).map((_, x) => {
            const cellKey = `${x},${y}`;
            return (
              <div
                key={cellKey}
                className={cn(
                  "w-16 h-16 md:w-18 md:h-18 border border-border/50 rounded-sm border-gray-400 dark:border-slate-900 bg-gray-100 dark:bg-gray-700/50 relative",
                  "hover:bg-muted/50"
                )}
              ></div>
            );
          })
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        {BACKPACK_WIDTH} x {BACKPACK_HEIGHT} {itemI18N.backpack.grid[localeKey]}
      </p>
    </div>
  );
}
