"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapControllerProps {
  imageCoord: { x: number; y: number };
  isViewWhere: boolean;
}

export default function MapController({
  imageCoord,
  isViewWhere,
}: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (isViewWhere) {
      const newCenter: [number, number] = [-imageCoord.y, -imageCoord.x];
      map.setView(newCenter, 0); // 줌 0으로 초기화 후 위치 이동
    }
  }, [imageCoord, isViewWhere, map]);

  return null;
}
