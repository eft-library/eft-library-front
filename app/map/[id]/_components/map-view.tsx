"use client";

import { MapData, MapViewTypes } from "./map.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { interactiveMapI18N } from "@/lib/consts/i18nConsts";
import { useState } from "react";
import { useItemFilter } from "@/lib/hooks/useItemFilter";
import ItemFilter from "./ItemFilter/item-filter";
import MapSelector from "./MapSelector/map-selector";
import Map2D from "./Map2D/map-2d";
import Map3D from "./Map3D/map-3d";
import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";

export default function MapView({ mapInfo }: MapViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [mapData, setMapData] = useState<MapData>(mapInfo.map);
  const [mapType, setMapType] = useState<string>("2D");
  const { viewItemList, onClickItem, onClickAllItem } = useItemFilter(
    mapData.jpg_item_path
  );

  return (
    <ViewWrapper>
      <div className="flex flex-col min-h-screen dark:bg-[#1e2124] dark:text-white bg-gray-50 text-black p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-center mb-6 relative">
          <h1 className="text-xl md:text-4xl font-bold text-center">
            {interactiveMapI18N.title[localeKey]}
          </h1>
        </div>

        {/* Main Content Area - Centered with max-w */}
        <div className="flex flex-col flex-1 w-full max-w-6xl mx-auto space-y-6">
          {/* <MapSelection /> */}
          <MapSelector
            onClickMapAction={setMapData}
            mapData={mapData}
            mapSelector={mapInfo.map_selector}
          />

          {/* ItemFilter now receives mapType and setMapType */}
          <ItemFilter
            originItemList={mapData.jpg_item_path}
            viewItemList={viewItemList}
            onClickItemAction={onClickItem}
            onClickAllItemAction={onClickAllItem}
            mapType={mapType}
            setMapType={setMapType}
          />

          {/* Map View - ToggleGroup is now inside ItemFilter */}
          {mapType === "2D" ? (
            <Map2D viewItemList={viewItemList} mapData={mapData} />
          ) : (
            <Map3D viewItemList={viewItemList} mapData={mapData} />
          )}
          {/* <MapView mapType={mapType} /> */}
        </div>
      </div>
    </ViewWrapper>
  );
}
