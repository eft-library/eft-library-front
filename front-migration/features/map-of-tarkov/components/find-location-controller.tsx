"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

import { getPlayerMarkerPosition } from "@/lib/map/leaflet-utils";

export function FindLocationController({
  defaultZoomLevel,
  imageCoord,
  isViewWhere,
  mapKey,
}: {
  defaultZoomLevel: number;
  imageCoord: { x: number; y: number; yaw: number };
  isViewWhere: boolean;
  mapKey: string;
}) {
  const map = useMap();

  useEffect(() => {
    if (!isViewWhere) {
      return;
    }

    let isActive = true;
    const frameId = window.requestAnimationFrame(() => {
      if (!isActive) {
        return;
      }

      const container = map.getContainer();
      if (!container || !container.isConnected) {
        return;
      }

      map.setView(getPlayerMarkerPosition(mapKey, imageCoord), defaultZoomLevel, {
        animate: false,
      });
    });

    return () => {
      isActive = false;
      window.cancelAnimationFrame(frameId);
    };
  }, [defaultZoomLevel, imageCoord, isViewWhere, map, mapKey]);

  return null;
}
