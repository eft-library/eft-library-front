"use client";

import { Box, Text, Stack } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useState, useEffect } from "react";
import { fetchDataWithNone } from "@/lib/api";
import PageParent from "@/components/pageParent/pageParent";
import LinkSelector from "@/components/linkSelector/linkSelector";
import { MAP_COLUMN } from "@/util/consts/columnConsts";
import { useAppStore } from "@/store/provider";
import { useItemFilter } from "../../../../hooks/useItemFilter";

export default function Map() {
  const { itemFilter, setItemFilter } = useAppStore((state) => state);
  const [originalData, setOriginalData] = useState<MapInfo[]>([]);
  const [mapData, setMapData] = useState<MapInfo | SubMap>();
  const [subMap, setSubMap] = useState<SubMap[]>([]);

  // const {viewItemList, onClickItem, onClickAllItem} = useItemFilter()
  const param = useParams();

  useEffect(() => {
    fetchDataWithNone(`/api/item_filter/all`, setItemFilter);
  }, [setItemFilter]);

  // useEffect(() => {
  //   fetchDataWithNone(`/api/map/all`, setOriginalData);
  //   const newMap: MapInfo = originalData.find((item) => {
  //     return item.id === param.id;
  //   })!;

  //   setMapData(newMap);
  //   setSubMap(newMap.sub);
  // }, [param.id, originalData]);

  return <div></div>;
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
  boxArgs: number[];
  position: number[];
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
