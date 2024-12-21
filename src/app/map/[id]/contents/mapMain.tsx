"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchDataWithNone } from "@/lib/api";
import PageParent from "@/components/pageParent/pageParent";
import LinkSelector from "@/components/linkSelector/linkSelector";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import type { Column, Map } from "@/types/types";
import ThreeViewDetail from "./threeViewDetail";
import JPGSkeleton from "../skeleton/jpgSkeleton";
import ThreeSkeleton from "../skeleton/threeSkeleton";
import ItemSelectorSkeleton from "../skeleton/itemSelectorSkeleton";

export default function MapMain() {
  const [mapData, setMapData] = useState<Map>();
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

  if (!column || !mapData)
    return (
      <PageParent>
        <ItemSelectorSkeleton />
        <JPGSkeleton />
        <ThreeSkeleton />
      </PageParent>
    );

  return (
    <PageParent leftAdUse={false}>
      <LinkSelector
        itemList={sortList(column)}
        itemDesc="name_kr"
        itemLink="link"
        mt={3}
      />
      <ThreeViewDetail mapData={mapData} onClickMap={onClickMap} />
    </PageParent>
  );
}
