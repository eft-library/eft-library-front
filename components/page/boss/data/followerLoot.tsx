"use client";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import GetClientColumn from "../../../custom/getColumn/getClientColumn";
import ImageView from "../../../custom/imageView/imageView";
import TextSpan from "../../../custom/gridContents/textSpan";
import { follwerColumn } from "@/lib/consts/gridContsts";
import type { FollowerLoot, FollowersLoot } from "./bossTypes";

export default function FollowerLoot({ follower }: FollowerLoot) {
  const [lootType, setLootType] = useState<string>();

  useEffect(() => {
    if (follower && follower.loot.length > 0) {
      setLootType(follower.loot[0].item_type);
    }
  }, [follower]);

  const updateSelector = (colList: FollowersLoot[]) => {
    const map = new Map();

    colList.forEach((item) => {
      const key = `${item.item_type}|${item.item_type_kr}|${item.item_type_en}`;
      if (!map.has(key)) {
        map.set(key, item);
      }
    });
    return Array.from(map.values());
  };

  return (
    <>
      {follower.loot.length > 0 && (
        <div className="w-full flex flex-col gap-4">
          <span className="font-bold text-3xl">{follower.name_kr} 전리품</span>
          <Separator className="bg-white" />
          <div className="flex justify-center w-full flex-wrap gap-4">
            {updateSelector(follower.loot).map((selector) => (
              <div
                onClick={() => setLootType(selector.item_type)}
                key={selector.item_id}
                className={cn(
                  "rounded-lg flex justify-center items-center p-[8px] w-[120px] h-[40px] cursor-pointer hover:bg-NeutralGray border-solid border-[1px] border-white",
                  { "bg-NeutralGray": lootType === selector.item_type }
                )}
              >
                <TextSpan size="sm">{selector.item_type_kr}</TextSpan>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center items-center w-full gap-2">
            <GetClientColumn columnLength={2} columnList={follwerColumn} />
            {follower.loot.map(
              (loot) =>
                lootType === loot.item_type && (
                  <div
                    key={loot.item_id}
                    className="w-full grid grid-cols-2 gap-2 border-solid border-white border-2 rounded-lg p-3"
                  >
                    <div className="flex justify-center items-center">
                      <ImageView
                        wrapWidth={240}
                        wrapHeight={100}
                        src={loot.item_image}
                        alt={loot.item_name_en}
                        popHeight={180}
                        popWidth={320}
                        size="240px"
                      />
                    </div>
                    <div className="flex justify-center items-center">
                      <TextSpan>{loot.item_name_kr}</TextSpan>
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
