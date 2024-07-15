"use client";

import { Box, Button, HStack } from "@chakra-ui/react";
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
      <HStack spacing={4} mb={4}>
        <Button onClick={() => transformWrapperRef.current?.zoomIn()}>+</Button>
        <Button onClick={() => transformWrapperRef.current?.zoomOut()}>
          -
        </Button>
        <Button onClick={() => transformWrapperRef.current?.resetTransform()}>
          Reset
        </Button>
      </HStack>
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
                    />
                  )
              )}
            </svg>
          </TransformComponent>
        </TransformWrapper>
      </Box>
    </Box>
  );
}
