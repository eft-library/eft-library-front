"use client";

import type {
  RequireList,
  ItemRequire,
  SkillRequire,
  TraderRequire,
} from "./stationType";
import TextSpan from "@/components/custom/gridContents/textSpan";
import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { ALL_COLOR } from "@/lib/consts/colorConsts";

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

  const getLevelColor = (item: ItemRequire | SkillRequire | TraderRequire) => {
    if (type === "station") {
      if ("level" in item) {
        if (item.level === 1) return "text-SandyOchre";
        if (item.level === 2) return "text-BurningOrange";
        if (item.level === 3) return "text-MossGreen";
        if (item.level === 4) return "text-CobaltBlue";
        if (item.level === 5) return "text-IndigoViolet";
        if (item.level === 6) return "text-RoyalPurple";
      }
    }

    return "text-white";
  };

  const getMaxSuffix = (item: ItemRequire | SkillRequire | TraderRequire) => {
    if (type === "station") {
      if ("level" in item) {
        if (item.level === 1) return ALL_COLOR.SandyOchre;
        if (item.level === 2) return ALL_COLOR.BurningOrange;
        if (item.level === 3) return ALL_COLOR.OliveTeal;
        if (item.level === 4) return ALL_COLOR.CobaltBlue;
        if (item.level === 5) return ALL_COLOR.IndigoViolet;
        if (item.level === 6) return ALL_COLOR.RoyalPurple;
      }
    }

    return ALL_COLOR.AshGray;
  };

  const checkType = (item: ItemRequire | SkillRequire | TraderRequire) => {
    if (type === "item" && isItemRequire(item)) {
      return `x ${item.quantity}`;
    } else if (type === "trader" && isTraderRequire(item)) {
      return `LV ${item.value || ""}`;
    } else if (type === "skill" && isSkillRequire(item)) {
      return `${item.name_kr} ${item.level || ""}`;
    }
    return `LV ${"level" in item ? item.level : ""}`;
  };

  const getMaster = (item: ItemRequire | SkillRequire | TraderRequire) => {
    if (type === "station") {
      if ("station_master_id" in item) {
        return item.station_master_id || "";
      }
    }
    return "";
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
                    {type !== "station" && (
                      <Image
                        src={item.image || ""}
                        onMouseEnter={() => onHoverItem(item, index)}
                        onMouseLeave={() => setOpenTooltipIndex(null)}
                        onFocus={() => onHoverItem(item, index)}
                        onBlur={() => setOpenTooltipIndex(null)}
                        alt={item.name_en || ""}
                        width={60}
                        height={60}
                      />
                    )}
                    {type === "station" && (
                      <div
                        onMouseEnter={() => onHoverItem(item, index)}
                        onMouseLeave={() => setOpenTooltipIndex(null)}
                      >
                        {getStationSVG(
                          getMaster(item),
                          60,
                          60,
                          getMaxSuffix(item)
                        )}
                      </div>
                    )}
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
              <span
                className={`text-center font-bold text-lg ${getLevelColor(
                  item
                )}`}
              >
                &nbsp;
                {checkType(item)}
              </span>
            )}
          </div>
        ))}
      </div>
    )
  );
}
