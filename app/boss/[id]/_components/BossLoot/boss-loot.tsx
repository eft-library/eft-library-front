"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import Highlighter from "react-highlight-words";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { boss18N, placeHolderText } from "@/lib/consts/i18nConsts";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import type { FollowerLoot } from "../boss.types";

export default function BossLoot({ follower }: FollowerLoot) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [word, setWord] = useState<string>("");

  const combinedItemInfo = [
    ...follower.item_info,
    ...(Array.isArray(follower.children)
      ? follower.children.flatMap((child) => child.item_info)
      : []),
  ];

  const uniqueItemInfo = Array.from(
    new Map(combinedItemInfo.map((data) => [data.item.id, data])).values(),
  );

  return (
    uniqueItemInfo.length > 0 && (
      <Card className="w-full dark:bg-gray-800/30 dark:border-gray-700/50 bg-white border-gray-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl sm:text-2xl">
            {boss18N.loot[localeKey]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search Input */}
          <div className="mb-4">
            <Input
              type="text"
              placeholder={placeHolderText.search[localeKey]} // Use a placeholder from i18n or a default
              value={word}
              onChange={(e) => setWord(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {follower.item_info.map((loot, index) => (
              <Link
                key={`boss-loot-${index}-${loot.item.name_en}`}
                href={`/item/info/${loot.item.normalizedName}`}
                target="_blank"
              >
                <div className="group flex flex-col items-center p-2 border-2 rounded-xl hover:bg-muted/20 hover:border-muted hover:shadow-md transition-all duration-300 cursor-pointer">
                  {/* Image Container */}
                  <div className="relative w-26 h-26 mb-3 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300">
                    <Image
                      src={
                        loot.item.gridImageLink ||
                        "/placeholder.svg?height=64&width=64" ||
                        "/placeholder.svg"
                      }
                      alt={loot.item.name_en || "Loot item"}
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                      fill
                      sizes="(max-width: 640px) 56px, (max-width: 768px) 64px, 72px"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                    />
                  </div>
                  {/* Item Name */}
                  <span className="text-xs text-center font-semibold leading-tight line-clamp-3 group-hover:text-foreground transition-colors duration-200">
                    <Highlighter
                      highlightClassName="bg-yellow-200 dark:bg-yellow-600/50 font-bold text-foreground px-1 rounded"
                      searchWords={[word]}
                      autoEscape
                      textToHighlight={
                        loot.item[getOtherLocalizedKey(localeKey)]
                      }
                    />
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
