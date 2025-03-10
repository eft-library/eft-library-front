/* eslint-disable @next/next/no-img-element */
"use client";

import type { InventoryGrid, TopListDetailData } from "../priceTypes";
import Masonry from "react-masonry-css";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export default function InventoryGrid({ topList }: InventoryGrid) {
  const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);
  const [hoverItem, setHoverItem] = useState<TopListDetailData>();

  const onHoverItem = (itemInfo: TopListDetailData, index: number | null) => {
    setOpenTooltipIndex(index);
    setHoverItem(itemInfo);
  };

  return (
    <TooltipProvider>
      <Masonry
        breakpointCols={16}
        className="masonry-grid flex flex-wrap"
        columnClassName="masonry-grid_column"
      >
        {topList.map((topImage, index) => (
          <Tooltip
            key={topImage.id}
            open={openTooltipIndex === index}
            onOpenChange={(open) =>
              open ? setOpenTooltipIndex(index) : setOpenTooltipIndex(null)
            }
          >
            <TooltipTrigger>
              <img
                src={topImage.item_image}
                onMouseEnter={() => onHoverItem(topImage, index)}
                onMouseLeave={() => setOpenTooltipIndex(null)}
                onFocus={() => onHoverItem(topImage, index)}
                onBlur={() => setOpenTooltipIndex(null)}
                alt={topImage.item_name_en}
                width={topImage.width * 64}
                height={topImage.height * 64}
                style={{
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="top" align="center" className="bg-Background">
              <p className="text-GoldenYellow text-lg font-bold">
                {hoverItem?.item_name_kr || hoverItem?.item_name_en}
              </p>
              <p className="text-white text-lg font-bold">
                플리마켓 가격:&nbsp;
                {hoverItem?.flea_market_price.toLocaleString()}
              </p>
              <p className="text-white text-lg font-bold">
                슬롯당 가격:&nbsp;{hoverItem?.per_slot.toLocaleString()}
              </p>
              <p className="text-white text-lg font-bold">
                슬롯 크기:&nbsp;{hoverItem?.width} X {hoverItem?.height}
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </Masonry>
    </TooltipProvider>
  );
}
