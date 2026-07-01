"use client";

import L, { type LatLng, type LeafletMouseEvent } from "leaflet";
import { useMapEvent } from "react-leaflet";

export function transformMousePosition(
  mapId: string,
  latlng: { lat: number; lng: number },
) {
  switch (mapId.toLowerCase()) {
    case "the-lab":
    case "the-labyrinth":
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
    case "the-labyrinth":
      return [-coord.x, coord.y];
    default:
      return [-coord.y, -coord.x];
  }
}

export function getPlayerMarkerYaw(mapId: string, yaw: number) {
  switch (mapId.toLowerCase()) {
    case "the-lab":
    case "the-labyrinth":
      return (yaw + 90) % 360;
    case "factory":
      return (yaw + 270) % 360;
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
      <div class="player-location-marker" style="
        transform: rotate(${rotation}deg);
      ">
        <div class="player-icon-pulse"></div>
        <div class="player-icon-view-cone"></div>
        <div class="player-icon-heading"></div>
        <div class="player-icon-ring"></div>
        <div class="player-icon-body"></div>
        <div class="player-icon-center"></div>
      </div>
    `,
    iconSize: [64, 64],
    iconAnchor: [32, 32],
  });
}
