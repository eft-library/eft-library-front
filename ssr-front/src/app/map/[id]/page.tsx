"use client";

import { Box, Text, Stack } from "@chakra-ui/react";
import { useParams } from "next/navigation";
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
import type { Column, Map } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function Map() {
  const { blackWhite } = useColorValue();
  const [mapData, setMapData] = useState<Map>({
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
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.map}`,
      setColumn
    );
  }, []);

  useEffect(() => {
    fetchDataWithNone(`${API_ENDPOINTS.GET_MAP}/${param.id}`, setMapData);
  }, [param.id]);

  const onClickMap = (value: Map) => {
    setMapData(value);
  };

  const sortList = (columnList: Column) => {
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
          <Text as={"b"} color={blackWhite}>
            2D MAP
          </Text>
          <JPGView map={mapData} viewItemList={viewItemList} />
          <br />
          <Text as={"b"} color={blackWhite}>
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
