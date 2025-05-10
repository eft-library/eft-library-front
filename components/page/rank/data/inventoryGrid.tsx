"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
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
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { rankI18N } from "@/lib/consts/i18nConsts";

export default function InventoryGrid({
  topList,
  viewType,
  searchWord,
}: InventoryGrid) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
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
            (topImage.name.en
              .toLowerCase()
              .includes(searchWord.toLowerCase()) ||
              topImage.name.ko
                .toLowerCase()
                .includes(searchWord.toLowerCase()) ||
              topImage.name.ja
                .toLowerCase()
                .includes(searchWord.toLowerCase()));

          const imgStyle =
            searchWord.length < 1
              ? undefined
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
                <Gallery>
                  <Item
                    original={topImage.image}
                    width={topImage.width * 128}
                    height={topImage.height * 128}
                  >
                    {({ ref, open }) => (
                      <img
                        ref={ref}
                        onClick={open}
                        src={topImage.image}
                        onMouseEnter={() => onHoverItem(topImage, index)}
                        onMouseLeave={() => setOpenTooltipIndex(null)}
                        onFocus={() => onHoverItem(topImage, index)}
                        onBlur={() => setOpenTooltipIndex(null)}
                        alt={topImage.name.en}
                        width={topImage.width * 64}
                        height={topImage.height * 64}
                        style={imgStyle}
                      />
                    )}
                  </Item>
                </Gallery>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                align="center"
                className="bg-Background border-solid border-white border-2"
              >
                <TextSpan size="xl" textColor="GoldenYellow">
                  {hoverItem?.name[localeKey]}
                </TextSpan>
                <br />
                <TextSpan size="base">
                  {rankI18N.fleaMarketPrice[localeKey]}&nbsp;:&nbsp;
                </TextSpan>
                <TextSpan
                  size="base"
                  textColor={viewType === "PVP" ? "PeachCream" : "SkyBloom"}
                >
                  {hoverItem?.flea_market_price.toLocaleString()}&nbsp;₽
                </TextSpan>
                <br />
                <TextSpan size="base">
                  {rankI18N.slotPerPrice[localeKey]}&nbsp;:&nbsp;
                </TextSpan>
                <TextSpan
                  size="base"
                  textColor={viewType === "PVP" ? "PeachCream" : "SkyBloom"}
                >
                  {hoverItem?.per_slot.toLocaleString()}&nbsp;₽
                </TextSpan>
                <br />
                <TextSpan size="base">
                  {rankI18N.slotSize[localeKey]}&nbsp;:&nbsp;
                </TextSpan>
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
