"use client";

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import React from "react";
import { Separator } from "@/components/ui/separator";
import BossRender from "./bossRender";
import GetClientColumn from "../../../custom/getColumn/getClientColumn";
import ExtractionRender from "./extractionRender";
import AdBanner from "../../../custom/adsense/adBanner";
import TextSpan from "../../../custom/gridContents/textSpan";
import { checkIdCategory } from "@/lib/func/jsxfunction";
import type { MapOfTarkovClient, Extraction, Boss } from "./mapOfTarkovType";
import { extractionColumn, motBossColumn } from "@/lib/consts/gridContsts";

const MapInfo = dynamic(() => import("./mapInfo"), { ssr: false });

export default function MapOfTarkovClient({
  mapOfTarkovList,
  imageSelect,
}: MapOfTarkovClient) {
  const param = useParams<{ id: string }>();

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
              <MapInfo
                mapInfo={mapOfTarkov.map_info}
                imageSelect={imageSelect}
              />

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
                <GetClientColumn columnList={motBossColumn} columnLength={7} />
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
