/* eslint-disable @next/next/no-img-element */
"use client";

import type { InventoryGrid, TopListDetailData } from "./rankTypes";
import TextSpan from "@/components/custom/gridContents/textSpan";
import Masonry from "react-masonry-css";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export default function InventoryGrid({ topList, viewType }: InventoryGrid) {
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);
  const [hoverItem, setHoverItem] = useState<TopListDetailData>();

  const onHoverItem = (itemInfo: TopListDetailData, index: number | null) => {
    setOpenTooltipIndex(index);
    setHoverItem(itemInfo);
  };

  return (
    <TooltipProvider>
      <Masonry breakpointCols={16} className="flex flex-wrap">
        {topList.map((topImage, index) => (
          <Tooltip
            key={topImage.id}
            open={openTooltipIndex === index}
            onOpenChange={(open) =>
              open ? setOpenTooltipIndex(index) : setOpenTooltipIndex(null)
            }
          >
            <TooltipTrigger className="mr-4">
              <img
                src={topImage.item_image}
                onMouseEnter={() => onHoverItem(topImage, index)}
                onMouseLeave={() => setOpenTooltipIndex(null)}
                onFocus={() => onHoverItem(topImage, index)}
                onBlur={() => setOpenTooltipIndex(null)}
                alt={topImage.item_name_en}
                width={topImage.width * 64}
                height={topImage.height * 64}
              />
            </TooltipTrigger>
            <TooltipContent side="top" align="center" className="bg-Background">
              <TextSpan size="xl" textColor="GoldenYellow">
                {hoverItem?.item_name_kr || hoverItem?.item_name_en}
              </TextSpan>
              <br />
              <TextSpan size="xl">플리마켓 가격:&nbsp;</TextSpan>
              <TextSpan
                size="xl"
                textColor={viewType === "PVP" ? "PeachCream" : "SkyBloom"}
              >
                {hoverItem?.flea_market_price.toLocaleString()}
              </TextSpan>
              <br />
              <TextSpan size="xl">슬롯당 가격:&nbsp;</TextSpan>
              <TextSpan
                size="xl"
                textColor={viewType === "PVP" ? "PeachCream" : "SkyBloom"}
              >
                {hoverItem?.per_slot.toLocaleString()}
              </TextSpan>
              <br />
              <TextSpan size="xl">슬롯 크기:&nbsp;</TextSpan>
              <TextSpan
                size="xl"
                textColor={viewType === "PVP" ? "PeachCream" : "SkyBloom"}
              >
                {hoverItem?.width} X {hoverItem?.height}
              </TextSpan>
            </TooltipContent>
          </Tooltip>
        ))}
      </Masonry>
    </TooltipProvider>
  );
}
