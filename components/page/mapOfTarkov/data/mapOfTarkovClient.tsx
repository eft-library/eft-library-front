"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
// import BossRender from "./bossRender";
import ExtractionRender from "./extractionRender";
import AdBanner from "../../../custom/adsense/adBanner";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { MapOfTarkovClient } from "./mapOfTarkovType";
import MapInfo from "./mapInfo";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import {
  extractionTableColumn,
  motBossTableColumn,
} from "@/lib/consts/columnConsts";

export default function MapOfTarkovClient({
  mapData,
  imageSelect,
}: MapOfTarkovClient) {
  return (
    <div className="w-full">
      <div key={mapData.map_id} className="flex flex-col gap-6 items-center">
        <MapInfo
          mapData={mapData.map_info}
          findInfo={mapData.find_info}
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
          <TableColumn columnDesign={7} columnData={motBossTableColumn} />
          {/* {mapData.boss_list.map((boss, index) => (
            <BossRender key={`${boss.id}-${index}`} bossInfo={boss} />
          ))} */}
        </div>
        <div className="w-full flex flex-col gap-2">
          <TextSpan isCenter={false} size="3xl">
            탈출구
          </TextSpan>
          <Separator className="bg-white" />
          <TableColumn
            columnDesign={11}
            columnData={extractionTableColumn}
            isExtraction
          />
          {mapData.extraction_info.map((extraction) => (
            <ExtractionRender key={extraction.id} extractionInfo={extraction} />
          ))}
        </div>
        <div className="w-full flex flex-col gap-2">
          <TextSpan isCenter={false} size="3xl">
            Transits
          </TextSpan>
          <Separator className="bg-white" />
          <TableColumn
            columnDesign={11}
            columnData={extractionTableColumn}
            isExtraction
          />
          {mapData.transits_info.map((transits) => (
            <ExtractionRender key={transits.id} extractionInfo={transits} />
          ))}
        </div>
      </div>
    </div>
  );
}
