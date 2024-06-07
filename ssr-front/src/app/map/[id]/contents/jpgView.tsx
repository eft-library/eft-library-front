"use client";

import { Box } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import DynamicJPG from "@/components/viewSVG/dynamicJPG";
import { formatImage } from "@/lib/formatImage";
import { Vector3 } from "three";
import { useWindowSize } from "../../../../../hooks/useWindowSize";

export default function JPGView({ map, viewItemList }: JPGViewType) {
  const size = useWindowSize();

  const handleClick = (e: any) => {
    // SVG 요소 가져오기
    const svg = e.currentTarget;

    // SVG 요소의 위치와 크기 얻기
    const svgRect = svg.getBoundingClientRect();

    // 클릭한 위치의 x와 y 좌표 (브라우저 창 기준)
    const clientX = e.clientX;
    const clientY = e.clientY;

    // SVG 요소 내에서의 상대적인 x와 y 좌표 계산
    const svgX = clientX - svgRect.left;
    const svgY = clientY - svgRect.top;

    console.log(`SVG 기준의 클릭한 위치의 x 좌표: ${svgX}, y 좌표: ${svgY}`);
  };

  if (!size.width || !size.height) return null;

  return (
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
        initialPositionX={200}
        initialPositionY={100}
        minScale={0.5}
        wheel={{ disabled: true }}
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
              (item, index) =>
                viewItemList.includes(item.childValue) && (
                  <DynamicJPG
                    key={index}
                    svgValue={item.childValue}
                    x={item.x}
                    y={item.y}
                  />
                )
            )}
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </Box>
  );
}

interface JPGViewType {
  map: MapInfo;
  viewItemList: string[];
}

interface MapInfo {
  name_en: string;
  three_image: string;
  jpg_image: string;
  depth: number;
  link: string;
  update_time: string;
  name_kr: string;
  id: string;
  three_item_path: ThreeItemPath[];
  jpg_item_path: JpgItemPath[];
  order: number;
  main_image: string;
  sub: SubMap[];
}

interface ThreeItemPath {
  boxArgs: Vector3Like;
  position: Vector3;
  childValue: string;
}

interface JpgItemPath {
  x: number;
  y: number;
  childValue: string;
  motherValue: string;
}

interface SubMap {
  name_en: string;
  three_image: string;
  three_item_path: ThreeItemPath[];
  jpg_item_path: JpgItemPath[];
  order: number;
  parent_value: string;
  update_time: string;
  name_kr: string;
  id: string;
  jpg_image: string;
  depth: number;
  link: string;
  main_image: string;
}

type Vector3Like = [
  width?: number,
  height?: number,
  depth?: number,
  widthSegments?: number,
  heightSegments?: number,
  depthSegments?: number
];
