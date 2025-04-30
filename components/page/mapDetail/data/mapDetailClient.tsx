"use client";

import { useState } from "react";
import type {
  MapDetailClient,
  Map,
} from "@/components/page/mapDetail/data/mapType";
import MapWrapper from "@/components/page/mapDetail/data/mapWrapper";

export default function MapDetailClient({ mapInfo }: MapDetailClient) {
  const [mapData, setMapData] = useState<Map>(mapInfo.map);

  const onClickMap = (value: Map) => {
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
