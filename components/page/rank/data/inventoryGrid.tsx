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

export default function InventoryGrid({
  topList,
  viewType,
  searchWord,
}: InventoryGrid) {
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);
  const [hoverItem, setHoverItem] = useState<TopListDetailData>();

  const onHoverItem = (itemInfo: TopListDetailData, index: number | null) => {
    setOpenTooltipIndex(index);
    setHoverItem(itemInfo);
  };

  return (
    <TooltipProvider>
      <Masonry breakpointCols={16} className="flex flex-wrap">
        {topList.map((topImage, index) => {
          const isHighlighted =
            searchWord.length > 0 &&
            (topImage.item_name_en.includes(searchWord) ||
              (topImage.item_name_kr &&
                topImage.item_name_kr.includes(searchWord)));

          const imgStyle =
            searchWord.length < 1
              ? undefined // searchWord가 빈 문자열이면 스타일을 적용하지 않음
              : {
                  boxShadow: isHighlighted
                    ? "0px 0px 10px rgba(255, 255, 255, 0.8)"
                    : "none",
                  borderRadius: isHighlighted ? "8px" : "0",
                  opacity: isHighlighted ? 1 : 0.2,
                };

          return (
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
                  style={imgStyle}
                />
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="center"
                className="bg-Background border-solid border-white border-2"
              >
                <TextSpan size="xl" textColor="GoldenYellow">
                  {hoverItem?.item_name_kr || hoverItem?.item_name_en}
                </TextSpan>
                <br />
                <TextSpan size="base">플리마켓 가격&nbsp;:&nbsp;</TextSpan>
                <TextSpan
                  size="base"
                  textColor={viewType === "PVP" ? "PeachCream" : "SkyBloom"}
                >
                  {hoverItem?.flea_market_price.toLocaleString()}
                </TextSpan>
                <br />
                <TextSpan size="base">슬롯당 가격&nbsp;:&nbsp;</TextSpan>
                <TextSpan
                  size="base"
                  textColor={viewType === "PVP" ? "PeachCream" : "SkyBloom"}
                >
                  {hoverItem?.per_slot.toLocaleString()}
                </TextSpan>
                <br />
                <TextSpan size="base">슬롯 크기&nbsp;:&nbsp;</TextSpan>
                <TextSpan
                  size="base"
                  textColor={viewType === "PVP" ? "PeachCream" : "SkyBloom"}
                >
                  {hoverItem?.width} X {hoverItem?.height}
                </TextSpan>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </Masonry>
    </TooltipProvider>
  );
}
