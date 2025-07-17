"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { FindLocationControllerTypes } from "../map-of-tarkov.types";

export default function FindLocationController({
  imageCoord,
  isViewWhere,
  default_zoom_level,
}: FindLocationControllerTypes) {
  const map = useMap();

  useEffect(() => {
    if (isViewWhere) {
      const newCenter: [number, number] = [-imageCoord.y, -imageCoord.x];
      map.setView(newCenter, default_zoom_level);
    }
  }, [imageCoord, isViewWhere, map]);

  return null;
}
