"use client";

import L, { type LatLng, type LeafletMouseEvent } from "leaflet";
import { useMapEvent } from "react-leaflet";

export function transformMousePosition(
  mapId: string,
  latlng: { lat: number; lng: number },
) {
  switch (mapId.toLowerCase()) {
    case "the_lab":
      return { lat: latlng.lng, lng: -latlng.lat };
    case "factory":
      return { lat: -latlng.lng, lng: latlng.lat };
    default:
      return { lat: -latlng.lat, lng: -latlng.lng };
  }
}

export function getPlayerMarkerPosition(
  mapId: string,
  coord: { x: number; y: number; yaw: number },
): [number, number] {
  switch (mapId.toLowerCase()) {
    case "factory":
      return [coord.x, -coord.y];
    case "the-lab":
      return [-coord.x, coord.y];
    default:
      return [-coord.y, -coord.x];
  }
}

export function getPlayerMarkerYaw(mapId: string, yaw: number) {
  switch (mapId.toLowerCase()) {
    case "factory":
      return (yaw + 270) % 360;
    case "the-lab":
      return (yaw + 90) % 360;
    default:
      return (yaw + 180) % 360;
  }
}

export function MouseMoveEvent({
  mapId,
  onMove,
}: {
  mapId: string;
  onMove: (latlng: LatLng) => void;
}) {
  useMapEvent("mousemove", (event: LeafletMouseEvent) => {
    onMove(transformMousePosition(mapId, event.latlng) as LatLng);
  });

  return null;
}

export function PlayerIcon(rotation: number) {
  return L.divIcon({
    className: "player-icon",
    html: `
      <div style="
        width: 38px;
        height: 38px;
        position: relative;
        transform: rotate(${rotation}deg);
        transform-origin: center;
        filter: drop-shadow(0 3px 6px rgba(0,0,0,0.55));
      ">

        <!-- 방향 화살표 -->
        <div style="
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-bottom: 18px solid #f97316;
          z-index: 5;
          filter:
            drop-shadow(0 1px 2px rgba(0,0,0,0.7))
            drop-shadow(0 0 6px rgba(249,115,22,0.45));
        "></div>

        <!-- 화살표 하이라이트 -->
        <div style="
          position: absolute;
          top: 2px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 10px solid rgba(255,255,255,0.85);
          z-index: 6;
          opacity: 0.75;
        "></div>

        <!-- 외곽 링 -->
        <div style="
          position: absolute;
          inset: 5px;
          border-radius: 50%;
          background: rgba(15,23,42,0.96);
          border: 2px solid rgba(255,255,255,0.9);
          box-sizing: border-box;
          z-index: 1;
        "></div>

        <!-- 몸통 -->
        <div style="
          position: absolute;
          inset: 10px;
          border-radius: 50%;
          background:
            radial-gradient(circle at 35% 30%,
              #dcfce7 0%,
              #4ade80 40%,
              #16a34a 100%);
          border: 1px solid rgba(0,0,0,0.45);
          box-sizing: border-box;
          z-index: 3;
          box-shadow:
            inset 0 1px 2px rgba(255,255,255,0.7),
            inset 0 -2px 3px rgba(0,0,0,0.3),
            0 0 8px rgba(74,222,128,0.45);
        "></div>

        <!-- 중심점 -->
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: white;
          z-index: 7;
          box-shadow: 0 0 5px rgba(255,255,255,0.9);
        "></div>

      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
  });
}