"use client";

import type { MapOfTarkovViewTypes } from "./map-of-tarkov.types";
import { useParams } from "next/navigation";
import { useState } from "react";
import MapSelector from "./MapSelector/map-selector";
import MapViewer from "./MapViewer/map-viewer";
import FindLocation from "./FindLocation/find-location";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { mapOfTarkovI18n } from "@/lib/consts/i18nConsts";
import MapBoss from "./MapBoss/map-boss";
import ExtractionsTransits from "./ExtractionsTransits/extractions-transits";
import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";
import AdBanner from "@/components/custom/Adsense/ad-banner";

export default function MapOfTarkovView({ mapData }: MapOfTarkovViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const param = useParams<{ id: string }>();
  const [imageSelect, setImageSelect] = useState<string>(param.id);

  return (
    <ViewWrapper>
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold mb-2 dark:text-white text-gray-900">
            {mapOfTarkovI18n.title[localeKey]}
          </h1>
        </div>
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
          maxWidth={1220}
        />
        <MapSelector
          imageSelect={imageSelect}
          setImageSelect={setImageSelect}
          mapData={mapData}
        />
        <MapViewer mapData={mapData.map_info} imageSelect={imageSelect} />
        <FindLocation findInfo={mapData.find_info} />
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
          maxWidth={1220}
        />
        <MapBoss bossInfo={mapData.boss_info} />
        <ExtractionsTransits
          extractionsOrTransits={mapData.extraction_info}
          title={mapOfTarkovI18n.extraction[localeKey]}
        />
        <ExtractionsTransits
          extractionsOrTransits={mapData.transits_info}
          title={mapOfTarkovI18n.transit[localeKey]}
        />
      </div>
    </ViewWrapper>
  );
}
