"use client";

import L, { type LatLng, type LeafletMouseEvent } from "leaflet";
import { useMapEvent } from "react-leaflet";

export function transformMousePosition(
  mapId: string,
  latlng: { lat: number; lng: number },
) {
  switch (mapId) {
    case "THE_LAB":
      return { lat: latlng.lng, lng: -latlng.lat };
    case "FACTORY":
      return { lat: -latlng.lng, lng: latlng.lat };
    default:
      return { lat: -latlng.lat, lng: -latlng.lng };
  }
}

export function getPlayerMarkerPosition(
  mapId: string,
  coord: { x: number; y: number; yaw: number },
): [number, number] {
  switch (mapId) {
    case "FACTORY":
      return [coord.x, -coord.y];
    case "THE_LAB":
      return [-coord.x, coord.y];
    default:
      return [-coord.y, -coord.x];
  }
}

export function getPlayerMarkerYaw(mapId: string, yaw: number) {
  switch (mapId) {
    case "FACTORY":
      return (yaw + 270) % 360;
    case "THE_LAB":
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
      <div style="transform: rotate(${rotation}deg); width: 28px; height: 28px; position: relative;">
        <div style="width: 20px; height: 20px; background: linear-gradient(135deg, #A3E635, #4ADE80); border-radius: 50%; position: absolute; top: 4px; left: 4px; border: 2px solid rgba(0,0,0,0.5); box-sizing: border-box;"></div>
        <div style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 12px solid #FF0000; position: absolute; top: -8px; left: 50%; transform: translateX(-50%); filter: drop-shadow(0 0 2px rgba(0,0,0,0.6));"></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}
