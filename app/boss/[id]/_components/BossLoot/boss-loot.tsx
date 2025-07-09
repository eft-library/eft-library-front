"use client";

import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
// import { useState } from "react";
import Image from "next/image";
import type { FollowerLoot } from "../boss.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { boss18N } from "@/lib/consts/i18nConsts";
import Link from "next/link";

export default function BossLoot({ follower }: FollowerLoot) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  //   const [word, setWord] = useState<string>("");

  const combinedItemInfo = [
    ...follower.item_info,
    ...(Array.isArray(follower.children)
      ? follower.children.flatMap((child) => child.item_info)
      : []),
  ];

  const uniqueItemInfo = Array.from(
    new Map(combinedItemInfo.map((data) => [data.item.id, data])).values()
  );

  return (
    uniqueItemInfo.length > 0 && (
      <Card className="w-full">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl sm:text-2xl">
            {boss18N.loot[localeKey]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {uniqueItemInfo.map((loot, index) => (
              <Link
                key={`boss-loot-${index}-${loot.item.name_en}`}
                href={`/item/${loot.item.normalizedName}`}
                target="_blank"
              >
                <div className="group flex flex-col items-center p-3 sm:p-4 border-2 border-muted/40 rounded-xl hover:bg-muted/20 hover:border-muted hover:shadow-md transition-all duration-300 cursor-pointer">
                  {/* Image Container */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border shadow-sm group-hover:shadow-md transition-all duration-300">
                    <Image
                      src={
                        loot.item.gridImageLink ||
                        "/placeholder.svg?height=64&width=64"
                      }
                      alt={loot.item.name_en || "Loot item"}
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      fill
                      sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, 72px"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                    />
                    {/* Overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Item Name */}
                  <span className="text-xs sm:text-sm text-center font-medium leading-tight line-clamp-2 group-hover:text-foreground transition-colors duration-200">
                    {loot.item[getOtherLocalizedKey(localeKey)]}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  );
}
