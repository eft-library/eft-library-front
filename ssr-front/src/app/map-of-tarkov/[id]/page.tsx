"use client";

import PageParent from "@/components/pageParent/pageParent";
import SubHeader from "@/components/subHeader/subHeader";
import LinkSelector from "@/components/linkSelector/linkSelector";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { COLUMN_KEY } from "@/util/consts/columnConsts";
import MapOfTarkovContents from "./contents/MapOfTarkovContents";

export default function MapOfTarkov() {
  const param = useParams<{ id: string }>();
  const [mapOfTarkov, setMapOfTarkov] = useState<MapOfTarkovData>();
  const [column, setColumn] = useState<ColumnType>();

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

  if (!column || !mapOfTarkov) return null;

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

interface Boss {
  location_spawn_chance_en: SpawnChance[];
  id: string;
  name_kr: string;
  followers_en: string[];
  image: string;
  health_total: number;
  loot: string[];
  spawn: string[];
  faction: string;
  name_en: string;
  location_spawn_chance_kr: SpawnChance[];
  followers_kr: string[];
  health_image: string[];
  location_guide: string;
  update_time: string;
}

interface SpawnChance {
  order: number;
  chance: number;
  location: string;
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

interface Requirement {
  desc: string;
  image: string;
}

interface ExtractionInfo {
  name: string;
  faction: string;
  single_use: boolean;
  tip: string[];
  update_time: string;
  image: string;
  id: string;
  always_available: boolean;
  requirements: Requirement[];
  map: string;
}

interface MapOfTarkovData {
  boss_list: Boss[];
  map_info: MapInfo;
  extraction_info: ExtractionInfo[];
}
