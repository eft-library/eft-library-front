import { ALL_COLOR } from "@/util/consts/colorConsts";
import { HStack, Text } from "@chakra-ui/react";
import { Vector3 } from "three";

interface SubMapSelectorType {
  onClickMap: Function;
  subMap: SubMap[];
  mapId: string;
}

type Vector3Like = [
  width?: number,
  height?: number,
  depth?: number,
  widthSegments?: number,
  heightSegments?: number,
  depthSegments?: number
];

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

export default function SubMapSelector({
  onClickMap,
  subMap,
  mapId,
}: SubMapSelectorType) {
  return (
    <HStack justifyContent="center">
      {subMap.map((sub, index) => (
        <Text
          key={index}
          onClick={() => onClickMap(sub)}
          color={mapId === sub.id ? ALL_COLOR.YELLOW : ALL_COLOR.DARK_YELLOW}
          fontWeight="bold"
          _hover={{ color: ALL_COLOR.DARK_YELLOW }}
          p="2"
          cursor="pointer"
        >
          * {sub.name_kr}
        </Text>
      ))}
    </HStack>
  );
}
