"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import BossRender from "./bossRender";
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
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { mapOfTarkovI18n } from "@/lib/consts/i18nConsts";

export default function MapOfTarkovClient({
  mapData,
  imageSelect,
}: MapOfTarkovClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
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
            {mapOfTarkovI18n.boss[localeKey]}
          </TextSpan>
          <Separator className="bg-white" />
          <TableColumn columnDesign={7} columnData={motBossTableColumn} />
          {mapData.boss_info.map((boss, index) => (
            <BossRender key={`${boss.id}-${index}`} bossData={boss} />
          ))}
        </div>
        <div className="w-full flex flex-col gap-2">
          <TextSpan isCenter={false} size="3xl">
            {mapOfTarkovI18n.extraction[localeKey]}
          </TextSpan>
          <Separator className="bg-white" />
          <TableColumn
            columnDesign={13}
            columnData={extractionTableColumn}
            isExtraction
          />
          {mapData.extraction_info.map((extraction) => (
            <ExtractionRender key={extraction.id} extractionInfo={extraction} />
          ))}
        </div>
        <div className="w-full flex flex-col gap-2">
          <TextSpan isCenter={false} size="3xl">
            {mapOfTarkovI18n.transit[localeKey]}
          </TextSpan>
          <Separator className="bg-white" />
          <TableColumn
            columnDesign={13}
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
