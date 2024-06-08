"use client";

import { ALL_COLOR } from "@/util/consts/colorConsts";
import { HStack, Text } from "@chakra-ui/react";
import { Vector3 } from "three";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";

export default function SubMapSelector({
  onClickMap,
  mapId,
}: SubMapSelectorType) {
  const param = useParams<{ id: string }>();
  const [subMap, setSubMap] = useState<SubMap[]>();

  useEffect(() => {
    fetchDataWithNone(`${API_ENDPOINTS.GET_SUB_MAP}/${param.id}`, setSubMap);
  }, [param.id]);

  if (!subMap) return null;

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
interface SubMapSelectorType {
  onClickMap: Function;
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
