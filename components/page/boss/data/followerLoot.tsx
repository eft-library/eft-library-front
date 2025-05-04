"use client";

import { Separator } from "@/components/ui/separator";
import ImageView from "../../../custom/imageView/imageView";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { FollowerLoot } from "./bossTypes";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { imageNameTableColumn } from "@/lib/consts/columnConsts";
import { useLocale } from "next-intl";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { filteringData, highlightMatchedText } from "@/lib/func/jsxfunction";
import Link from "next/link";

export default function FollowerLoot({ follower }: FollowerLoot) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [word, setWord] = useState<string>("");

  // 전체 아이템 리스트
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
    <>
      {uniqueItemInfo.length > 0 && (
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex gap-2 mb-2 justify-between">
            <span className="font-bold text-3xl">전리품</span>
            <Input
              className="text-base font-bold border-white placeholder:text-SilverGray w-[400px] border-2"
              value={word}
              placeholder="이름을 최소 2글자 입력하세요"
              onChange={(e) => setWord(e.currentTarget.value)}
            />
          </div>
          <Separator className="bg-white" />
          <div className="flex flex-col justify-center items-center w-full gap-2">
            <TableColumn columnDesign={2} columnData={imageNameTableColumn} />
            {uniqueItemInfo.map(
              (loot, index) =>
                filteringData(
                  word,
                  loot.item.name_en,
                  loot.item.name_ko,
                  loot.item.name_ja
                ) && (
                  <div
                    key={`follower-loot-${loot.item.id}-${index}`}
                    className="w-full grid grid-cols-2 gap-2 border-solid border-white border-2 rounded-lg p-3"
                  >
                    <div className="flex justify-center items-center">
                      <ImageView
                        wrapWidth={240}
                        wrapHeight={100}
                        src={loot.item.gridImageLink}
                        alt={loot.item.name_en}
                        popHeight={180}
                        popWidth={320}
                        size="240px"
                      />
                    </div>
                    <div className="flex justify-center items-center">
                      <Link
                        href={`/item/${loot.item.normalizedName}`}
                        target="_blank"
                      >
                        <TextSpan>
                          {highlightMatchedText(
                            loot.item[getOtherLocalizedKey(localeKey)],
                            word
                          )}
                        </TextSpan>
                      </Link>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </>
  );
}
