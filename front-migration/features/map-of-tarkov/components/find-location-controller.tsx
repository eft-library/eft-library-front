"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

export function FindLocationController({
  defaultZoomLevel,
  imageCoord,
  isViewWhere,
}: {
  defaultZoomLevel: number;
  imageCoord: { x: number; y: number; yaw: number };
  isViewWhere: boolean;
}) {
  const map = useMap();

  useEffect(() => {
    if (!isViewWhere) {
      return;
    }

    map.setView([-imageCoord.y, -imageCoord.x], defaultZoomLevel);
  }, [defaultZoomLevel, imageCoord, isViewWhere, map]);

  return null;
}
