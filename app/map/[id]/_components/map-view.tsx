"use client";

import { MapData, MapViewTypes } from "./map.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { interactiveMapI18N } from "@/lib/consts/i18nConsts";
import { useState } from "react";
// import { useItemFilter } from "@/lib/hooks/useItemFilter";
import Map3DNoItem from "./Map3D/map-3d-no-item";
import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";
import AdBanner from "@/components/custom/Adsense/ad-banner";
import MapSelector from "./MapSelector/map-selector";

export default function MapView({ mapInfo }: MapViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [mapData, setMapData] = useState<MapData>(mapInfo.map);
  // const [mapType, setMapType] = useState<string>("2D");
  // const { viewItemList, onClickItem, onClickAllItem } = useItemFilter(
  //   mapData.jpg_item_path
  // );

  return (
    <ViewWrapper>
      <div className="flex flex-col min-h-screen dark:bg-[#1e2124] dark:text-white bg-gray-50 text-black p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-center mb-6 relative">
          <h1 className="text-xl md:text-4xl font-bold text-center">
            {interactiveMapI18N.title[localeKey]}
          </h1>
        </div>
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
          maxWidth={1220}
        />
        <div className="flex flex-col flex-1 w-full max-w-7xl mx-auto space-y-6 mt-4">
          <MapSelector
            onClickMapAction={setMapData}
            mapData={mapData}
            mapSelector={mapInfo.map_selector}
          />
          <Map3DNoItem mapData={mapData} />
        </div>
        {/* 지금은 안쓰는 2D 코드들 */}
        {/* <div className="flex flex-col flex-1 w-full max-w-7xl mx-auto space-y-6">
          <MapSelector
            onClickMapAction={setMapData}
            mapData={mapData}
            mapSelector={mapInfo.map_selector}
          />

          <ItemFilter
            originItemList={mapData.jpg_item_path}
            viewItemList={viewItemList}
            onClickItemAction={onClickItem}
            onClickAllItemAction={onClickAllItem}
            mapType={mapType}
            setMapType={setMapType}
          />

          {mapType === "2D" ? (
            <Map2D viewItemList={viewItemList} mapData={mapData} />
          ) : (
            <Map3D viewItemList={viewItemList} mapData={mapData} />
          )}
        </div> */}
      </div>
    </ViewWrapper>
  );
}
