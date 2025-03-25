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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export default function DetailRequire({ items, type }: RequireList) {
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);
  const [hoverItem, setHoverItem] = useState<
    ItemRequire | SkillRequire | TraderRequire
  >();

  const onHoverItem = (
    itemInfo: ItemRequire | SkillRequire | TraderRequire,
    index: number | null
  ) => {
    setOpenTooltipIndex(index);
    setHoverItem(itemInfo);
  };

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
              <TooltipProvider>
                <Tooltip
                  open={openTooltipIndex === index}
                  onOpenChange={(open) =>
                    open
                      ? setOpenTooltipIndex(index)
                      : setOpenTooltipIndex(null)
                  }
                >
                  <TooltipTrigger>
                    <Image
                      src={
                        type === "skill" || type === "station"
                          ? formatImage(item.image || "")
                          : item.image || ""
                      }
                      onMouseEnter={() => onHoverItem(item, index)}
                      onMouseLeave={() => setOpenTooltipIndex(null)}
                      onFocus={() => onHoverItem(item, index)}
                      onBlur={() => setOpenTooltipIndex(null)}
                      alt={item.name_en || ""}
                      width={60}
                      height={60}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    align="center"
                    className="bg-Background border-solid border-white border-2"
                  >
                    <TextSpan size="base" textColor="GoldenYellow">
                      {hoverItem?.name_kr || hoverItem?.name_en}
                    </TextSpan>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {type === "item" ? (
              <div className="relative">
                <div className="absolute bottom-1 left-2">
                  <span className="text-white text-sm font-bold whitespace-nowrap">
                    x{"quantity" in item ? item.quantity : 1}
                  </span>
                </div>
              </div>
            ) : (
              <TextSpan size="lg">
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
