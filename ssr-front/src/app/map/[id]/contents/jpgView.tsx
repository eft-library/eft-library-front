"use client";

import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ItemJPG } from "@/components/viewSVG/dynamicJPG";
import { formatImage } from "@/lib/formatImage";
import { useWindowSize } from "@/hooks/useWindowSize";
import type { JPGView } from "@/types/types";
import JPGSkeleton from "../skeleton/jpgSkeleton";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useRef, useState } from "react";

export default function JPGView({ map, viewItemList }: JPGView) {
  const size = useWindowSize();
  const transformWrapperRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [popoverItem, setPopoverItem] = useState(null); // 팝오버에 표시될 아이템 정보 상태

  const handleItemClick = (item) => {
    setPopoverItem(item); // 아이템 클릭 시 팝오버 아이템 설정
  };

  const handleZoom = (e) => {
    setScale(e.state.scale);
  };

  const handleClick = (e) => {
    const svg = e.currentTarget;
    const svgRect = svg.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;
    const svgX = clientX - svgRect.left;
    const svgY = clientY - svgRect.top;

    console.log(`SVG 기준의 클릭한 위치의 x 좌표: ${svgX}, y 좌표: ${svgY}`);
  };

  if (!size.width || !size.height) return <JPGSkeleton />;

  return (
    <Box
      height={"100%"}
      width={"100%"}
      display={"flex"}
      flexDirection="column"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        boxSize="sm"
        height={"100%"}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <TransformWrapper
          initialScale={1}
          initialPositionX={-450}
          initialPositionY={100}
          minScale={0.5}
          wheel={{ step: 0.1 }}
          ref={transformWrapperRef}
          onZoom={handleZoom}
        >
          <TransformComponent>
            <svg
              width={size.width}
              height={size.height / 1.3}
              fill={ALL_COLOR.THREE_BACKGROUND}
              onClick={handleClick}
            >
              <image
                xlinkHref={formatImage(map.jpg_image)}
                width="100%"
                height="100%"
              />
              {map.jpg_item_path.map(
                (item) =>
                  viewItemList.includes(item.childValue) && (
                    <ItemJPG
                      key={item.x}
                      svgValue={item.childValue}
                      x={item.x}
                      y={item.y}
                      scale={1 / scale}
                      clickItem={() => handleItemClick(item)}
                    />
                  )
              )}
            </svg>
          </TransformComponent>
          {popoverItem && (
            <Popover
              placement="right"
              isOpen={true}
              onClose={() => setPopoverItem(null)}
            >
              <PopoverTrigger>
                <span>Click me</span>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverBody>
                  Popover content for {popoverItem.svgValue}
                </PopoverBody>
              </PopoverContent>
            </Popover>
          )}
        </TransformWrapper>
      </Box>
    </Box>
  );
}
