"use client";

import { useState } from "react";
import type {
  MapDetailClient,
  MapData,
} from "@/components/page/mapDetail/data/mapType";
import MapWrapper from "@/components/page/mapDetail/data/mapWrapper";

export default function MapDetailClient({ mapInfo }: MapDetailClient) {
  const [mapData, setMapData] = useState<MapData>(mapInfo.map);

  const onClickMap = (value: MapData) => {
    setMapData(value);
  };
  if (!mapData) return null;

  return (
    <div className="w-full">
      <MapWrapper
        mapData={mapData}
        mapSelector={mapInfo.map_selector}
        onClickMapAction={onClickMap}
      />
    </div>
  );
}
