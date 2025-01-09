"use client";

import { useParams } from "next/navigation";
import React from "react";
import { Separator } from "@/components/ui/separator";
import MapSlider from "./mapSlider";
import BossRender from "./bossRender";
import GetClientColumn from "../../../custom/getColumn/getClientColumn";
import ExtractionRender from "./extractionRender";
import AdBanner from "../../../custom/adsense/adBanner";
import TextSpan from "../../../custom/gridContents/textSpan";
import { checkIdCategory } from "@/lib/func/jsxfunction";
import type { MapOfTarkovClient, Extraction, Boss } from "./mapOfTarkovType";

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
            <div
              key={mapOfTarkov.map_id}
              className="flex flex-col gap-6 items-center"
            >
              <MapSlider mapInfo={mapOfTarkov.map_info} />

              <div className="w-[1200px]">
                <AdBanner
                  dataAdFormat={"auto"}
                  dataFullWidthResponsive={true}
                  dataAdSlot="2690838054"
                />
              </div>
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
