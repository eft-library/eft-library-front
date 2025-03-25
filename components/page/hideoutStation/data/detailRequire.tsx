"use client";

import { formatImage } from "@/lib/func/formatImage";
import type {
  RequireList,
  ItemRequire,
  SkillRequire,
  TraderRequire,
} from "./stationType";
import TextSpan from "@/components/custom/gridContents/textSpan";
import Image from "next/image";

export default function DetailRequire({ items, type }: RequireList) {
  const isItemRequire = (item: any): item is ItemRequire => "quantity" in item;
  const isSkillRequire = (item: any): item is SkillRequire => "level" in item;
  const isTraderRequire = (item: any): item is TraderRequire => "value" in item;

  const checkType = (item: ItemRequire | SkillRequire | TraderRequire) => {
    if (type === "item" && isItemRequire(item)) {
      return `x ${item.quantity}`;
    } else if (type === "trader" && isTraderRequire(item)) {
      return `Level ${item.value || ""}`;
    } else if (type === "skill" && isSkillRequire(item)) {
      return `${item.name_kr} ${item.level || ""}`;
    }
    return `Level ${"level" in item ? item.level : ""}`;
  };

  return (
    items.length > 0 && (
      <div className="flex gap-4">
        {items.map((item, index) => (
          <div
            key={("id" in item && item.id) || index}
            className={"flex flex-col items-center gap-2"}
          >
            {item.image && (
              <Image
                src={
                  type === "skill" || type === "station"
                    ? formatImage(item.image || "")
                    : item.image || ""
                }
                alt={item.name_en || ""}
                width={60}
                height={60}
              />
            )}
            {type === "item" ? (
              <div className="relative">
                <div className="absolute bottom-1 left-4">
                  <span className="text-white text-xs font-bold">
                    x{"quantity" in item ? item.quantity : 1}
                  </span>
                </div>
              </div>
            ) : (
              <TextSpan size="xs">
                &nbsp;
                {checkType(item)}
              </TextSpan>
            )}
          </div>
        ))}
      </div>
    )
  );
}
