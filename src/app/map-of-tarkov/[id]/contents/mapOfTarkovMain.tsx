"use client";

import PageParent from "@/components/pageParent/pageParent";
import SubHeader from "@/components/subHeader/subHeader";
import LinkSelector from "@/components/linkSelector/linkSelector";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import MapOfTarkovContents from "./mapOfTarkovContents";
import type { Column, MapOfTarkov } from "@/types/types";
import ContentsSkeleton from "../../skeleton/contentsSkeleton";

export default function MapOfTarkovMain() {
  const param = useParams<{ id: string }>();
  const [mapOfTarkov, setMapOfTarkov] = useState<MapOfTarkov>();
  const [column, setColumn] = useState<Column>();

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.mapOfTarkov}`,
      setColumn
    );
  }, []);

  useEffect(() => {
    fetchDataWithNone(
      `${API_ENDPOINTS.GET_MAP_OF_TARKOV}/${param.id}`,
      setMapOfTarkov
    );
  }, [param.id]);

  const sortList = () => {
    const result = column.json_value.sort((a, b) => {
      return a.order - b.order;
    });
    return result;
  };

  if (!column || !mapOfTarkov) return <ContentsSkeleton />;

  return (
    <PageParent>
      <SubHeader title="지도" />
      <LinkSelector
        itemList={sortList()}
        itemDesc="name_kr"
        itemLink="link"
        mt={6}
      />
      <MapOfTarkovContents mapOfTarkov={mapOfTarkov} />
    </PageParent>
  );
}
