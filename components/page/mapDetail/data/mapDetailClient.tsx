"use client";

import { useState } from "react";
import type {
  MapDetailClient,
  MapData,
} from "@/components/page/mapDetail/data/mapType";
import MapWrapper from "@/components/page/mapDetail/data/mapWrapper";

export default function MapDetailClient({ mapInfo, mapType }: MapDetailClient) {
  const [mapData, setMapData] = useState<MapData>(mapInfo);

  const onClickMap = (value: MapData) => {
    setMapData(value);
  };

  return (
    <div className="w-full">
      <MapWrapper
        mapData={mapData}
        onClickMapAction={onClickMap}
        mapType={mapType}
      />
    </div>
  );
}
