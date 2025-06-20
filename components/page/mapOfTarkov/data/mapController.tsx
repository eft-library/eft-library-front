"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { MapControllerProps } from "./mapOfTarkovType";

export default function MapController({
  imageCoord,
  isViewWhere,
  default_zoom_level,
}: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (isViewWhere) {
      const newCenter: [number, number] = [-imageCoord.y, -imageCoord.x];
      map.setView(newCenter, default_zoom_level);
    }
  }, [imageCoord, isViewWhere, map]);

  return null;
}
