"use client";

import { Box, Text, Stack } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useState, useEffect } from "react";
import { fetchDataWithNone } from "@/lib/api";
import PageParent from "@/components/pageParent/pageParent";
import LinkSelector from "@/components/linkSelector/linkSelector";
import { useItemFilter } from "@/hooks/useItemFilter";
import ItemSelector from "./contents/itemSelector";
import SubMapSelector from "./contents/subMapSelector";
import JPGView from "./contents/jpgView";
import ThreeView from "./contents/threeView";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import { Vector3 } from "three";

export default function Map() {
  const [mapData, setMapData] = useState<MapInfo>({
    name_en: "Sample Name EN",
    three_image: null,
    jpg_image: "path/to/jpg_image",
    depth: 10,
    link: "http://example.com",
    update_time: "2023-01-01T00:00:00Z",
    name_kr: "Sample Name KR",
    id: "sample-id",
    three_item_path: [],
    jpg_item_path: [],
    order: 1,
    main_image: "path/to/main_image",
    sub: [],
  });
  const { viewItemList, onClickItem, onClickAllItem } = useItemFilter(
    mapData.jpg_item_path
  );
  const param = useParams();
  const [column, setColumn] = useState<ColumnType>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.map}`,
      setColumn
    );
  }, []);

  useEffect(() => {
    fetchDataWithNone(`${API_ENDPOINTS.GET_MAP}/${param.id}`, setMapData);
  }, [param.id]);

  const onClickMap = (value: MapInfo) => {
    setMapData(value);
  };

  const sortList = (columnList: ColumnType) => {
    const result = columnList.json_value.sort((a, b) => {
      return a.order - b.order;
    });
    return result;
  };

  if (!column) return null;

  return (
    <PageParent>
      {viewItemList && (
        <ItemSelector
          originItemList={mapData.jpg_item_path}
          viewItemList={viewItemList}
          onClickItem={onClickItem}
          onClickAllItem={onClickAllItem}
        />
      )}
      <LinkSelector
        itemList={sortList(column)}
        itemDesc="name_kr"
        itemLink="link"
        mt={3}
      />
      <Box
        className="CenterBox"
        borderRadius="lg"
        padding="20px"
        margin="5px"
        width="100%"
        height="100%"
      >
        <SubMapSelector onClickMap={onClickMap} mapId={mapData.id} />
        <Stack spacing={4}>
          <Text as={"b"} color={ALL_COLOR.WHITE}>
            2D MAP
          </Text>
          <JPGView map={mapData} viewItemList={viewItemList} />
          <br />
          <Text as={"b"} color={ALL_COLOR.WHITE}>
            3D MAP
          </Text>
          <ThreeView
            key={mapData.id}
            map={mapData}
            viewItemList={viewItemList}
          />
        </Stack>
      </Box>
    </PageParent>
  );
}

interface ColumnType {
  id: string;
  type: string;
  update_time: string;
  value_kr: string[] | null;
  value_en: string[] | null;
  json_value: JsonValueType[] | null;
}

// JsonValueType 인터페이스 정의
interface JsonValueType {
  value: string;
  desc_en: string;
  desc_kr: string;
  order: number;
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
