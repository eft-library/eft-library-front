"use client";

import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Text,
} from "@chakra-ui/react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { ItemJPG } from "@/components/viewSVG/dynamicJPG";
import { formatImage } from "@/lib/formatImage";
import { useWindowSize } from "@/hooks/useWindowSize";
import type { JPGView, JpgItemPath } from "@/types/types";
import JPGSkeleton from "../skeleton/jpgSkeleton";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useRef, useState } from "react";
import Link from "next/link";

export default function JPGView({ map, viewItemList }: JPGView) {
  const size = useWindowSize();
  const transformWrapperRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [popoverItem, setPopoverItem] = useState<JpgItemPath>(null); // 팝오버에 표시될 아이템 정보 상태

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
          minScale={0.8}
          // wheel={{ step: 0.1 }}
          wheel={{ disabled: true }}
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
                    <g
                      onClick={() => handleItemClick(item)}
                      key={item.x}
                      cursor={"pointer"}
                    >
                      <ItemJPG
                        svgValue={item.childValue}
                        x={item.x}
                        y={item.y}
                        scale={1 / scale}
                      />
                    </g>
                  )
              )}
            </svg>
            {popoverItem && (
              <Popover
                placement="top"
                isOpen={true}
                onClose={() => setPopoverItem(null)}
              >
                <PopoverTrigger>
                  <Text
                    borderRadius={"lg"}
                    fontWeight={600}
                    p={1}
                    position={"absolute"}
                    left={popoverItem.x}
                    top={popoverItem.y - 40}
                    color={ALL_COLOR.WHITE}
                    bg={ALL_COLOR.BLACK}
                    _hover={{ color: ALL_COLOR.BEIGE, bg: ALL_COLOR.AMMO_ONE }}
                    cursor={"pointer"}
                  >
                    닫기
                  </Text>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverBody>
                    <Box
                      display={"flex"}
                      alignItems={"center"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                    >
                      <Text fontWeight={800}>연관 퀘스트</Text>
                      {popoverItem.quest_info &&
                      popoverItem.quest_info.length > 0 ? (
                        popoverItem.quest_info.map((quest) => (
                          <Link
                            href={`/quest/detail/${quest.url_mapping}`}
                            target="_blank"
                            key={quest.id}
                          >
                            <Text
                              _hover={{ color: ALL_COLOR.BEIGE }}
                              fontWeight={600}
                            >
                              {quest.name_kr}
                            </Text>
                          </Link>
                        ))
                      ) : (
                        <Text fontWeight={800}>-</Text>
                      )}
                    </Box>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            )}
          </TransformComponent>
        </TransformWrapper>
      </Box>
    </Box>
  );
}
