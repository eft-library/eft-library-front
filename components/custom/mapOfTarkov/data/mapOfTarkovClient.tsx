"use client";

import { useParams } from "next/navigation";
import React from "react";
import { Separator } from "@/components/ui/separator";
import MapSlider from "./mapSlider";
import BossRender from "./bossRender";
import GetClientColumn from "../../getColumn/getClientColumn";
import ExtractionRender from "./extractionRender";
import AdBanner from "../../adsense/adBanner";
import TextSpan from "../../gridContents/textSpan";
import { checkIdCategory } from "@/lib/func/jsxfunction";

interface MapOfTarkovClient {
  mapOfTarkovList: MapOfTarkov[];
}

interface MapOfTarkov {
  boss_list: Boss[];
  map_info: Map;
  extraction_info: Extraction[];
  transits_info: Extraction[];
  map_id: string;
}
interface Requirement {
  desc: string;
  image: string;
  thumbnail: string;
}
interface Extraction {
  id: string;
  name: string;
  faction: string;
  single_use: boolean;
  tip: Requirement[];
  image: string;
  image_thumbnail: string;
  always_available: boolean;
  requirements: Requirement[];
  map: string;
}
interface Map {
  sub: SubMap[];
  id: string;
  name_en: string;
  three_image: string;
  jpg_image: string;
  depth: number;
  link: string;
  name_kr: string;
  mot_image: string;
  order: number;
  main_image: string;
}
interface SubMap {
  id: string;
  name_en: string;
  three_image: string;
  jpg_image: string;
  depth: number;
  link: string;
  name_kr: string;
  mot_image: string;
  order: number;
  main_image: string;
  parent_value: string;
}

interface Boss extends BossInfo {
  health_total: number;
  spawn: string[];
  faction: string;
  location_spawn_chance_en: SpawnChance[];
  location_spawn_chance_kr: SpawnChance[];
  followers_en: string[];
  followers_kr: string[];
  name_kr: string;
  name_en: string;
  image: string;
  order: number;
}
interface SpawnChance {
  order: number;
  chance: number;
  location: string;
}
interface BossInfo {
  id: string;
  location_guide: string;
  sub: BossLoot[];
  sub_followers: Followers[];
}
interface BossLoot {
  boss_name_en: string;
  boss_name_kr: string;
  item_id: string;
  boss_id: string;
  item_type: string;
  item_type_en: string;
  item_type_kr: string;
  item_name_en: string;
  item_name_kr: string;
  item_image: string;
  link: string;
}

interface Followers {
  id: string;
  name_kr: string;
  name_en: string;
  boss_id: string;
  health_image: string;
  loot: FollowersLoot[];
}

interface FollowersLoot {
  follower_name_en: string;
  follower_name_kr: string;
  follower_id: string;
  item_id: string;
  boss_id: string;
  item_type: string;
  item_type_en: string;
  item_type_kr: string;
  item_name_en: string;
  item_name_kr: string;
  item_image: string;
  link: string;
}

export default function MapOfTarkovClient({
  mapOfTarkovList,
}: MapOfTarkovClient) {
  const param = useParams<{ id: string }>();

  const bossColumn = [
    { name: "사진", colSpan: 1 },
    { name: "이름", colSpan: 1 },
    { name: "소속", colSpan: 1 },
    { name: "위치", colSpan: 1 },
    { name: "스폰확률", colSpan: 1 },
    { name: "피통", colSpan: 1 },
    { name: "추종자", colSpan: 1 },
  ];

  const extractionColumn = [
    { name: "사진", colSpan: 2 },
    { name: "이름", colSpan: 2 },
    { name: "소속", colSpan: 1 },
    { name: "항상 열림", colSpan: 1 },
    { name: "일회용", colSpan: 1 },
    { name: "필요 조건", colSpan: 2 },
    { name: "Tip", colSpan: 2 },
  ];

  const sortBossList = (bossList: Boss[]) => {
    bossList.sort((a, b) => {
      return a.order - b.order;
    });
    return bossList;
  };

  const sortExtractionList = (extractionList: Extraction[]) => {
    const order = ["ALL", "PMC", "Scav"];
    extractionList.sort((a, b) => {
      return order.indexOf(a.faction) - order.indexOf(b.faction);
    });
    return extractionList;
  };

  return (
    <div className="w-full">
      {mapOfTarkovList.map(
        (mapOfTarkov) =>
          checkIdCategory(param.id, mapOfTarkov.map_id) && (
            <div key={mapOfTarkov.map_id} className="flex flex-col gap-6">
              <MapSlider mapInfo={mapOfTarkov.map_info} />
              <AdBanner
                dataAdFormat={"auto"}
                dataFullWidthResponsive={true}
                dataAdSlot="2690838054"
              />
              <div className="w-full flex flex-col gap-2">
                <TextSpan isCenter={false} size="3xl">
                  보스
                </TextSpan>
                <Separator className="bg-white" />
                <GetClientColumn columnList={bossColumn} columnLength={7} />
                {sortBossList(mapOfTarkov.boss_list).map((boss, index) => (
                  <BossRender key={`${boss.id}-${index}`} bossInfo={boss} />
                ))}
              </div>
              <div className="w-full flex flex-col gap-2">
                <TextSpan isCenter={false} size="3xl">
                  탈출구
                </TextSpan>
                <Separator className="bg-white" />
                <GetClientColumn
                  columnList={extractionColumn}
                  columnLength={11}
                />
                {sortExtractionList(mapOfTarkov.extraction_info).map(
                  (extraction) => (
                    <ExtractionRender
                      key={extraction.id}
                      extractionInfo={extraction}
                    />
                  )
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <TextSpan isCenter={false} size="3xl">
                  Transits
                </TextSpan>
                <Separator className="bg-white" />
                <GetClientColumn
                  columnList={extractionColumn}
                  columnLength={11}
                />
                {sortExtractionList(mapOfTarkov.transits_info).map(
                  (transits) => (
                    <ExtractionRender
                      key={transits.id}
                      extractionInfo={transits}
                    />
                  )
                )}
              </div>
            </div>
          )
      )}
    </div>
  );
}
