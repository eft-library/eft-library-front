"use client";

import { Box, Text, Stack } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useState, useEffect } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import PageParent from "@/components/pageParent/pageParent";
import LinkSelector from "@/components/linkSelector/linkSelector";
import { MAP_COLUMN } from "@/util/consts/columnConsts";
import { useItemFilter } from "@/hooks/useItemFilter";
import ItemSelector from "./contents/itemSelector";
import SubMapSelector from "./contents/subMapSelector";
import JPGView from "./contents/jpgView";
import ThreeView from "./contents/threeView";
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
  const [subMap, setSubMap] = useState<SubMap[]>([]);
  const { viewItemList, onClickItem, onClickAllItem } = useItemFilter(
    mapData.jpg_item_path
  );
  const param = useParams();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_MAP}/${param.id}`,
      (data: MapInfo) => {
        // setMapData를 호출하여 mapData 상태를 업데이트합니다.
        setMapData(data);

        // 데이터에 sub 속성이 있는지 확인하고, 있을 경우에만 setSubMap을 호출하여 subMap 상태를 업데이트합니다.
        if (data.sub) {
          setSubMap(data.sub);
        }
      }
    );
  }, [param.id]);

  const onClickMap = (value: MapInfo) => {
    setMapData(value);
    if (value.depth === 1) {
      setSubMap(value.sub);
    }
  };

  const sortList = () => {
    const result = MAP_COLUMN.json_value.sort((a, b) => {
      return a.order - b.order;
    });
    return result;
  };

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
        itemList={sortList()}
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
        {subMap && subMap.length > 1 && (
          <SubMapSelector
            onClickMap={onClickMap}
            subMap={subMap}
            mapId={mapData.id}
          />
        )}
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
