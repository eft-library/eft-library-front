"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import L, {
  CRS,
  type ImageOverlay as LeafletImageOverlay,
  type LatLngBounds,
  type LatLng,
  type LeafletMouseEvent,
  type Map as LeafletMap,
  type Marker as LeafletMarker,
} from "leaflet";

import {
  PlayerIcon,
  getPlayerMarkerPosition,
  getPlayerMarkerYaw,
  transformMousePosition,
} from "@/lib/map/leaflet-utils";
import type { LiveMapCoordinateInfo, LiveMapFloor } from "@/types/api/live-map";
import type { LiveMapLocation } from "./live-map-utils";

export type LiveMapMarkerKind = "quest" | "story" | "event" | "static";
export type LiveMapDrawingMode = "hand" | "red" | "blue" | "erase";
export type LiveMapRotation = 0 | 90 | 180 | 270;

interface DrawingPoint {
  lat: number;
  lng: number;
}

interface DrawingStroke {
  color: string;
  erase: boolean;
  points: DrawingPoint[];
  width: number;
  zoom: number;
}

export interface LiveMapCanvasMarker {
  id: string;
  kind: LiveMapMarkerKind;
  label: string;
  popupHtml?: string;
  staticCategory?: string;
  staticFaction?: string;
  x: number;
  y: number;
  floorId: string | null;
}

export interface LiveMapPopupImage {
  alt: string;
  fit?: "contain" | "cover";
  images?: Array<{ alt: string; fit?: "contain" | "cover"; src: string }>;
  index?: number;
  src: string;
}

type LeafletContainerElement = HTMLDivElement & {
  _leaflet_id?: number;
};

interface PointMarkerEntry {
  label: string;
  marker: LeafletMarker;
  popupHtml?: string;
  point: LiveMapCanvasMarker;
  positionKey: string;
  presentationKey: string;
}

function clearLeafletContainer(container: LeafletContainerElement) {
  delete container._leaflet_id;
  container.replaceChildren();
}

const markerColorByKind: Record<LiveMapMarkerKind, string> = {
  event: "#60a5fa",
  quest: "#ffb400",
  static: "#34d399",
  story: "#a78bfa",
};

const staticMarkerColorByType: Record<string, string> = {
  "extract:pmc": "#38bdf8",
  "extract:scav": "#fb923c",
  "extract:shared": "#c084fc",
  black_div_spawn: "#4ade80",
  bloodhounds_spawn: "#4ade80",
  boss_spawn: "#f43f5e",
  btr_stop: "#fde047",
  cultist_spawn: "#a3e635",
  goons_spawn: "#ef4444",
  key_spawn: "#fbbf24",
  keycard_spawn: "#818cf8",
  locked_container: "#2dd4bf",
  locked_door: "#fb7185",
  pmc_spawn: "#60a5fa",
  raider_spawn: "#22d3ee",
  rogue_spawn: "#64748b",
  scav_spawn: "#fb923c",
  sniper_spawn: "#22d3ee",
  stationary_weapon: "#94a3b8",
  transit: "#f87171",
  transit_switch: "#facc15",
};

function getPointMarkerPosition(
  mapId: string,
  point: Pick<LiveMapCanvasMarker, "x" | "y">,
  coordinateInfo: LiveMapCoordinateInfo,
  rotation: number,
): [number, number] {
  return rotateLatLng(
    getPlayerMarkerPosition(mapId, { x: point.x, y: point.y, yaw: 0 }),
    coordinateInfo.image_bounds,
    rotation,
  );
}

function getRelaxedMapBounds(bounds: LatLngBounds) {
  return bounds.pad(1.4);
}

function getMapCenter(bounds: LiveMapCoordinateInfo["image_bounds"]) {
  return L.latLngBounds(bounds).getCenter();
}

function rotateLatLng(
  value: { lat: number; lng: number } | [number, number],
  bounds: LiveMapCoordinateInfo["image_bounds"],
  rotation: number,
): [number, number] {
  const point = Array.isArray(value) ? { lat: value[0], lng: value[1] } : value;
  const center = getMapCenter(bounds);
  const radians = (rotation * Math.PI) / 180;
  const cosine = Math.cos(radians);
  const sine = Math.sin(radians);
  const deltaLat = point.lat - center.lat;
  const deltaLng = point.lng - center.lng;

  return [
    center.lat - sine * deltaLng + cosine * deltaLat,
    center.lng + cosine * deltaLng + sine * deltaLat,
  ];
}

function unrotateLatLng(
  value: { lat: number; lng: number },
  bounds: LiveMapCoordinateInfo["image_bounds"],
  rotation: number,
) {
  const [lat, lng] = rotateLatLng(value, bounds, -rotation);
  return L.latLng(lat, lng);
}

function getRotatedMapBounds(
  bounds: LiveMapCoordinateInfo["map_bounds"],
  imageBounds: LiveMapCoordinateInfo["image_bounds"],
  rotation: LiveMapRotation,
) {
  const source = L.latLngBounds(bounds);
  return L.latLngBounds([
    rotateLatLng(source.getNorthWest(), imageBounds, rotation),
    rotateLatLng(source.getNorthEast(), imageBounds, rotation),
    rotateLatLng(source.getSouthWest(), imageBounds, rotation),
    rotateLatLng(source.getSouthEast(), imageBounds, rotation),
  ]);
}

function applyImageRotation(overlay: LeafletImageOverlay, rotation: number) {
  const element = overlay.getElement();

  if (!element) {
    return;
  }

  const baseTransform = element.style.transform.replace(/\srotate\([^)]*\)$/, "");
  element.style.transform = rotation === 0 ? baseTransform : `${baseTransform} rotate(${rotation}deg)`;
  element.style.transformOrigin = "center";
}

function getStaticMarkerType(point: LiveMapCanvasMarker) {
  if (point.staticCategory === "extract") {
    return getStaticCategoryMarkerType(point.staticCategory, point.staticFaction);
  }

  return point.staticCategory ?? "static";
}

export function getStaticCategoryMarkerType(category: string, faction?: string) {
  if (category === "extract") {
    return `extract:${faction ?? "unknown"}`;
  }

  return category || "static";
}

function getStaticMarkerColor(point: LiveMapCanvasMarker) {
  return getStaticMarkerColorByType(getStaticMarkerType(point));
}

function escapeMarkerLabel(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getStaticMarkerLabelHtml(point: LiveMapCanvasMarker, color: string) {
  if (point.staticCategory !== "boss_spawn" && point.staticCategory !== "extract") {
    return "";
  }

  return `<span class="live-map-static-marker-label" style="--live-map-label-color: ${color}">${escapeMarkerLabel(point.label)}</span>`;
}

export function getStaticMarkerColorByType(type: string) {
  return staticMarkerColorByType[type] ?? markerColorByKind.static;
}

function getStaticMarkerSizes(point: LiveMapCanvasMarker, isFocused: boolean) {
  switch (point.staticCategory) {
    case "extract":
      return {
        iconSize: isFocused ? 30 : 25,
        size: isFocused ? 36 : 30,
      };
    case "transit":
      return {
        iconSize: isFocused ? 30 : 25,
        size: isFocused ? 36 : 30,
      };
    case "stationary_weapon":
      return {
        iconSize: isFocused ? 28 : 23,
        size: isFocused ? 34 : 28,
      };
    case "sniper_spawn":
      return {
        iconSize: isFocused ? 28 : 23,
        size: isFocused ? 34 : 28,
      };
    case "btr_stop":
      return {
        iconSize: isFocused ? 31 : 26,
        size: isFocused ? 38 : 32,
      };
    case "boss_spawn":
    case "black_div_spawn":
    case "bloodhounds_spawn":
    case "cultist_spawn":
    case "goons_spawn":
    case "pmc_spawn":
    case "raider_spawn":
    case "rogue_spawn":
    case "scav_spawn":
      return {
        iconSize: isFocused ? 29 : 24,
        size: isFocused ? 36 : 30,
      };
    case "transit_switch":
      return {
        iconSize: isFocused ? 28 : 23,
        size: isFocused ? 34 : 28,
      };
    default:
      return {
        iconSize: isFocused ? 28 : 23,
        size: isFocused ? 34 : 28,
      };
  }
}

function PersonIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <g transform="translate(0 -0.6)">
        <circle cx="12" cy="5.2" r="2.45" fill="${color}" />
        <path d="M9 10.4c0-1.7 6-1.7 6 0v5.4H9z" fill="${color}" />
        <path d="M9.8 11.1 7.1 14.5M14.2 11.1l2.7 3.4M10.2 15.8 8.9 21M13.8 15.8l1.3 5.2" stroke="${color}" stroke-width="2.35" stroke-linecap="round" />
      </g>
    </svg>
  `;
}

function TransitIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <path d="M5 12h12" stroke="${color}" stroke-width="3" stroke-linecap="round" />
      <path d="m13 7 5 5-5 5" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
}

function SwitchIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <path d="m13.2 2.8-7 10.4h5.3l-1.2 8 7-10.5h-5.2z" fill="${color}" stroke="${color}" stroke-width="1.1" stroke-linejoin="round" />
    </svg>
  `;
}

function KeyIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <circle cx="7.5" cy="8" r="4" stroke="${color}" stroke-width="2.5" />
      <path d="m10.4 10.9 8.7 8.7M15.1 15.6l2.4-2.4M17.3 17.8l2.2-2.2" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <circle cx="7.5" cy="8" r="1.2" fill="${color}" />
    </svg>
  `;
}

function KeycardIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <rect x="2.8" y="5" width="18.4" height="14" rx="2.4" stroke="${color}" stroke-width="2.2" />
      <path d="M3.8 9h16.4" stroke="${color}" stroke-width="2.2" />
      <rect x="6" y="12" width="5.2" height="3.5" rx=".7" fill="${color}" />
      <path d="M14.2 13h3.8M14.2 15h2.5" stroke="${color}" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  `;
}

function LockedDoorIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <path d="M7.2 10V7.7a4.8 4.8 0 0 1 9.6 0V10" stroke="${color}" stroke-width="2.8" stroke-linecap="round" />
      <rect x="4.2" y="9.2" width="15.6" height="11.6" rx="2.3" fill="${color}" />
      <circle cx="12" cy="14.2" r="1.5" fill="#111827" />
      <path d="M12 15.5v2" stroke="#111827" stroke-width="1.8" stroke-linecap="round" />
    </svg>
  `;
}

function LockedContainerIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <path d="M3 8h18v12H3z" stroke="${color}" stroke-width="2.1" stroke-linejoin="round" />
      <path d="M3 12h18M7 8v12M17 8v12" stroke="${color}" stroke-width="1.5" opacity=".72" />
      <rect x="9" y="11.5" width="6" height="5.5" rx="1.1" fill="${color}" />
      <path d="M10.6 11.5v-1.1a1.4 1.4 0 0 1 2.8 0v1.1" stroke="${color}" stroke-width="1.7" stroke-linecap="round" />
      <circle cx="12" cy="14.2" r=".75" fill="#111827" />
    </svg>
  `;
}

function WeaponIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 40 32" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <rect x="12" y="9" width="26" height="4" rx="1" fill="${color}" />
      <rect x="35" y="8" width="3" height="6" rx=".8" fill="${color}" opacity=".7" />
      <rect x="7" y="8" width="10" height="7" rx="1.5" fill="${color}" opacity=".9" stroke="${color}" stroke-width=".6" />
      <rect x="8" y="7" width="7" height="3" rx="1" fill="${color}" opacity=".6" />
      <path d="m7 9-4-1-1 4 5 1Z" fill="${color}" opacity=".75" />
      <line x1="11" y1="15" x2="5" y2="28" stroke="${color}" stroke-width="2" stroke-linecap="round" />
      <line x1="13" y1="15" x2="20" y2="28" stroke="${color}" stroke-width="2" stroke-linecap="round" />
      <line x1="10" y1="15" x2="10" y2="27" stroke="${color}" stroke-width="1.5" stroke-linecap="round" opacity=".7" />
      <line x1="3" y1="28" x2="7" y2="28" stroke="${color}" stroke-width="1.8" stroke-linecap="round" />
      <line x1="18" y1="28" x2="22" y2="28" stroke="${color}" stroke-width="1.8" stroke-linecap="round" />
      <line x1="7" y1="23" x2="17" y2="23" stroke="${color}" stroke-width="1" stroke-linecap="round" opacity=".5" />
    </svg>
  `;
}

function SniperIconSvg(size: number) {
  const reticleColor = "#22d3ee";

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <circle cx="12" cy="12" r="6.8" stroke="${reticleColor}" stroke-width="2.4" />
      <path d="M12 3.8v4M12 16.2v4M3.8 12h4M16.2 12h4" stroke="${reticleColor}" stroke-width="2.4" stroke-linecap="round" />
      <circle cx="12" cy="12" r="1.8" fill="${reticleColor}" />
    </svg>
  `;
}

function VehicleIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size * 0.72}" viewBox="0 0 64 42" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <path d="M3 30 8 18h48l4 5v7Z" fill="${color}" />
      <path d="M3 30 8 18h2L5 30ZM56 18l4 5v7h-2v-6l-4-6Z" fill="#111827" opacity=".24" />
      <rect x="6" y="28" width="52" height="3" rx=".6" fill="${color}" opacity=".5" />
      <rect x="8" y="20" width="4" height="6" rx=".4" fill="#111827" opacity=".32" />
      <rect x="48" y="20" width="8" height="5" rx=".6" fill="#111827" opacity=".22" />
      <path d="M22 18 24 9h18l3 9Z" fill="${color}" />
      <path d="M42 9 45 18h2L44 9Z" fill="#111827" opacity=".25" />
      <ellipse cx="31" cy="9" rx="4" ry="1.8" fill="${color}" opacity=".75" />
      <ellipse cx="31" cy="9" rx="2.2" ry="1.1" fill="#111827" opacity=".32" />
      <rect x="43" y="12.8" width="19" height="1.8" rx=".6" fill="${color}" />
      <rect x="60" y="12.2" width="3" height="3" rx=".5" fill="${color}" opacity=".75" />
      <circle cx="12" cy="35" r="5" fill="#111827" />
      <circle cx="12" cy="35" r="5" fill="none" stroke="${color}" stroke-width="1" />
      <circle cx="26" cy="35" r="5" fill="#111827" />
      <circle cx="26" cy="35" r="5" fill="none" stroke="${color}" stroke-width="1" />
      <circle cx="40" cy="35" r="5" fill="#111827" />
      <circle cx="40" cy="35" r="5" fill="none" stroke="${color}" stroke-width="1" />
      <circle cx="54" cy="35" r="5" fill="#111827" />
      <circle cx="54" cy="35" r="5" fill="none" stroke="${color}" stroke-width="1" />
    </svg>
  `;
}

function SkullIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <path d="M12 3.2c-4.2 0-7.2 2.8-7.2 6.9 0 2.5 1.2 4.6 3.2 5.8v2.3c0 .6.4 1 1 1h6c.6 0 1-.4 1-1v-2.3c2-1.2 3.2-3.3 3.2-5.8 0-4.1-3-6.9-7.2-6.9Z" fill="${color}" />
      <circle cx="9.3" cy="10.7" r="1.7" fill="#111827" />
      <circle cx="14.7" cy="10.7" r="1.7" fill="#111827" />
      <path d="M10 16.2h4M9.7 19.2v1.7M12 19.2v1.7M14.3 19.2v1.7" stroke="${color}" stroke-width="1.7" stroke-linecap="round" />
    </svg>
  `;
}

function FlagIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <path d="M6 3.5v18" stroke="${color}" stroke-width="2.6" stroke-linecap="round" />
      <path d="M7 4.5 19 8.7 7 13.4Z" fill="${color}" />
    </svg>
  `;
}

function MaskIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <path d="M12 3.1c-4.2 0-6.7 3.2-6.7 7.3 0 2.8 1.1 5.1 2.8 6.5v2.2c0 .6.4 1 1 1h5.8c.6 0 1-.4 1-1v-2.2c1.7-1.4 2.8-3.7 2.8-6.5 0-4.1-2.5-7.3-6.7-7.3Z" fill="${color}" />
      <ellipse cx="9.5" cy="11" rx="1.8" ry="1.35" fill="#111827" />
      <ellipse cx="14.5" cy="11" rx="1.8" ry="1.35" fill="#111827" />
      <path d="M10 15.4q2 1.1 4 0" stroke="#111827" stroke-width="1.4" stroke-linecap="round" />
    </svg>
  `;
}

function KnifeIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 275.411 259.024" aria-hidden="true" style="color:${color};transform:rotate(-90deg) scaleX(-1)" shape-rendering="geometricPrecision">
      <path d="m0 259.024c9.779-1.009 21.603-3.007 34.657-6.928 13.775-4.138 25.257-9.318 34.262-14.121 11.356-7.548 23.254-16.038 35.472-25.572 10.89-8.498 20.905-16.943 30.076-25.163 14.112-13.9 28.224-27.799 42.336-41.699l10.037 10.19c.753.764 1.798 1.19 2.867 1.107.471-.037.977-.101 1.509-.203.88-.169 1.66-.41 2.329-.668.836-.323 1.585-.823 2.223-1.452l5.612-5.527c.738-.727 1.31-1.609 1.632-2.594.222-.678.424-1.446.573-2.294.206-1.178.26-2.241.244-3.133-.007-.395-.176-.77-.454-1.052l-.825-.837c-.453-.46-1.141-.598-1.737-.348l-8.481 3.559-15.832-16.074-.878-2.703 84.445-83.174 3.345 3.396 11.999-11.818-4.07-26.321-26.473-5.594-11.999 11.818 2.453 2.49-83.992 82.728-5.605-1.615-18.132-18.409c-1.077-1.093-2.613-1.603-4.129-1.37l-1.712.263c-1.851.284-3.565 1.144-4.899 2.458l-3.976 3.916c-1.094 1.078-1.891 2.42-2.313 3.897l-1.314 4.596c-.216.756-.012 1.571.536 2.135l.462.476c.59.607 1.473.823 2.275.552 2.35-.794 7.3-2.465 10.095-3.409l3.791 3.849-54.335 53.517c-4.095 4.984-8.405 10.738-12.67 17.289-4.296 6.599-7.834 12.913-10.747 18.711-1.372 3.296-2.721 6.898-3.974 10.794-1.954 6.078-4.253 16.775-4.253 16.775l.942 5.435s9.025-12.905 12.335-17.461c4.61-6.346 9.332-11.514 13.601-15.626 10.788-10.18 21.576-20.359 32.364-30.539l44.166-33.207 2.427 2.464s-12.498 14.572-16.169 19.065c-5.337 6.532-11.182 13.93-18.825 23.002-4.612 5.475-9.519 11.068-14.733 16.741-4.517 4.915-10.025 10.907-16.534 17.177-10.341 9.961-19.229 16.785-26.421 22.274-5.705 4.353-9.498 6.995-16.306 11.782-8.704 6.12-21.372 15.07-37.277 26.457Z" fill="currentColor" />
    </svg>
  `;
}

function RogueIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <path d="M4 14c0-7 4-11 8-11s8 4 8 11v4H4Z" fill="${color}" />
      <ellipse cx="12" cy="13" rx="4.5" ry="5" fill="#111827" />
      <ellipse cx="10" cy="12.5" rx="1.1" ry=".7" fill="${color}" opacity=".9" />
      <ellipse cx="14" cy="12.5" rx="1.1" ry=".7" fill="${color}" opacity=".9" />
      <path d="M10.5 15h3" stroke="${color}" stroke-width=".7" opacity=".35" stroke-linecap="round" />
      <path d="M7 18 6 23h12l-1-5Z" fill="${color}" opacity=".82" />
      <rect x="10.5" y="17" width="3" height="2" rx=".5" fill="${color}" opacity=".62" />
    </svg>
  `;
}

function RaiderIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <path d="M5 11c0-4.5 3-7 7-7s7 2.5 7 7Z" fill="${color}" />
      <rect x="4" y="10.5" width="16" height="1.5" rx=".5" fill="${color}" opacity=".62" />
      <path d="M7 12c0 4 2 7 5 7s5-3 5-7Z" fill="${color}" opacity=".45" />
      <rect x="6.5" y="11.5" width="11" height="3.5" rx="1.5" fill="#111827" stroke="${color}" stroke-width=".8" />
      <rect x="11" y="12" width="2" height="2.5" rx=".4" fill="#111827" stroke="${color}" stroke-width=".5" />
      <ellipse cx="9" cy="13.2" rx="1.8" ry="1.1" fill="${color}" opacity=".22" />
      <ellipse cx="15" cy="13.2" rx="1.8" ry="1.1" fill="${color}" opacity=".22" />
      <path d="M9.5 16.5q2.5 1 5 0" stroke="${color}" stroke-width="1" opacity=".55" stroke-linecap="round" />
      <path d="m8 19-1 5h10l-1-5Z" fill="${color}" opacity=".75" />
    </svg>
  `;
}

function BloodhoundsIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <path d="M4 12c0-5.5 3.5-9 8-9s8 3.5 8 9Z" fill="#475569" />
      <rect x="3.5" y="11.2" width="17" height="1.8" rx=".6" fill="#64748b" />
      <path d="M7 13c0 4.5 2.2 7.5 5 7.5s5-3 5-7.5Z" fill="#d6b884" />
      <path d="M6 13.5v2c0 .7.3 1 1 1h3.5c.7 0 1-.3 1-1v-2c0-.7-.3-1-1-1H7c-.7 0-1 .3-1 1ZM12.5 13.5v2c0 .7.3 1 1 1H17c.7 0 1-.3 1-1v-2c0-.7-.3-1-1-1h-3.5c-.7 0-1 .3-1 1Z" fill="#111827" />
      <path d="M11.5 14.5h1M10 18.5q2 .7 4 0" stroke="#475569" stroke-width=".8" stroke-linecap="round" />
      <path d="m8 20.5-1 4.5h10l-1-4.5Z" fill="#3f6212" />
      <circle cx="19" cy="6" r="2" fill="${color}" opacity=".92" />
    </svg>
  `;
}

function GoonIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <path d="M4 8V4l4 2.5L12 3l4 3.5L20 4v4Z" fill="${color}" />
      <circle cx="12" cy="4" r="1" fill="#111827" />
      <circle cx="7.5" cy="6" r=".7" fill="#111827" opacity=".75" />
      <circle cx="16.5" cy="6" r=".7" fill="#111827" opacity=".75" />
      <rect x="4" y="8" width="16" height="1.5" rx=".4" fill="${color}" opacity=".82" />
      <path d="M6 10c0-1.5 2.5-2 6-2s6 .5 6 2v7c0 2.5-2.5 4-6 4s-6-1.5-6-4Z" fill="${color}" opacity=".88" />
      <ellipse cx="9.5" cy="13.5" rx="2" ry="1.5" fill="#111827" />
      <ellipse cx="14.5" cy="13.5" rx="2" ry="1.5" fill="#111827" />
      <ellipse cx="9.5" cy="13.5" rx="1.1" ry=".85" fill="${color}" opacity=".95" />
      <ellipse cx="14.5" cy="13.5" rx="1.1" ry=".85" fill="${color}" opacity=".95" />
      <path d="m8.5 15.5 1.5 1M9.5 18l1-1 1.5 1.5 1.5-1.5 1 1" stroke="#111827" stroke-width=".75" stroke-linecap="round" stroke-linejoin="round" opacity=".62" />
    </svg>
  `;
}

export function getStaticIconSvgForType(type: string, size: number) {
  const color = getStaticMarkerColorByType(type);

  if (type.startsWith("extract:")) {
    return PersonIconSvg(color, size);
  }

  if (type === "transit") {
    return TransitIconSvg(color, size);
  }

  if (type === "transit_switch") {
    return SwitchIconSvg(color, size);
  }

  if (type === "key_spawn") {
    return KeyIconSvg(color, size);
  }

  if (type === "keycard_spawn") {
    return KeycardIconSvg(color, size);
  }

  if (type === "locked_door") {
    return LockedDoorIconSvg(color, size);
  }

  if (type === "locked_container") {
    return LockedContainerIconSvg(color, size);
  }

  if (type === "stationary_weapon") {
    return WeaponIconSvg(color, size);
  }

  if (type === "sniper_spawn") {
    return SniperIconSvg(size);
  }

  if (type === "btr_stop") {
    return VehicleIconSvg(color, size);
  }

  if (type === "boss_spawn") {
    return SkullIconSvg(color, size);
  }

  if (type === "pmc_spawn") {
    return FlagIconSvg(color, size);
  }

  if (type === "scav_spawn") {
    return MaskIconSvg(color, size);
  }

  if (type === "cultist_spawn") {
    return KnifeIconSvg(color, size);
  }

  if (type === "rogue_spawn") {
    return RogueIconSvg(color, size);
  }

  if (type === "raider_spawn") {
    return RaiderIconSvg(color, size);
  }

  if (type === "black_div_spawn" || type === "bloodhounds_spawn") {
    return BloodhoundsIconSvg(color, size);
  }

  if (type === "goons_spawn") {
    return GoonIconSvg(color, size);
  }

  return PersonIconSvg(color, size);
}

function getStaticIconSvg(point: LiveMapCanvasMarker, size: number) {
  return getStaticIconSvgForType(getStaticMarkerType(point), size);
}

function PointIcon(
  point: LiveMapCanvasMarker,
  isDimmed: boolean,
  isFocused: boolean,
  isMarkerSimplified: boolean,
  isHovered = false,
) {
  const { kind } = point;
  const color = kind === "static" ? getStaticMarkerColor(point) : markerColorByKind[kind];
  const markerOpacity = isDimmed && !isFocused ? "0.18" : "1";

  if (isMarkerSimplified && !isFocused && !isHovered) {
    const size = kind === "static" ? 16 : 14;
    const labelHtml = kind === "static" ? getStaticMarkerLabelHtml(point, color) : "";

    return L.divIcon({
      className: `live-map-marker-icon live-map-marker-icon-${kind}${isFocused ? " live-map-marker-focused" : ""}`,
      html: `
        <div style="
          width: ${size}px;
          height: ${size}px;
          position: relative;
          opacity: ${markerOpacity};
          border: 3px solid ${color};
          border-radius: 999px;
          background: #111827;
          box-sizing: border-box;
        ">
          <span style="
            position: absolute;
            inset: 3px;
            border-radius: 999px;
            background: ${color};
          "></span>
          ${labelHtml}
        </div>
      `,
      iconAnchor: [size / 2, size / 2],
      iconSize: [size, size],
    });
  }

  if (kind !== "static") {
    const size = isFocused ? 28 : 22;
    const taskWrapperStyle = `
      width: ${size}px;
      height: ${size}px;
      position: relative;
      opacity: ${markerOpacity};
      transition: transform 120ms ease, opacity 120ms ease;
      transform: ${isFocused ? "scale(1.12)" : "none"};
    `;

    return L.divIcon({
      className: `live-map-marker-icon live-map-marker-icon-${kind}${isFocused ? " live-map-marker-focused" : ""}`,
      html: `
        <div style="${taskWrapperStyle}">
          <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10.2" fill="#1a1c1f" stroke="#0b0d10" stroke-width="2.1" />
            <circle cx="12" cy="12" r="8.1" fill="#1a1c1f" stroke="${color}" stroke-width="2.2" />
            <path d="M8.2 14.1h1.95c.82 0 1.18-.4 1.18-1.06v-2.08c0-.66.36-1.06 1.18-1.06h3.29" stroke="#fff7ed" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="8" cy="14.1" r="1.12" fill="${color}" stroke="#fff7ed" stroke-width=".55" />
            <circle cx="12" cy="9.9" r="1.12" fill="${color}" stroke="#fff7ed" stroke-width=".55" />
            <circle cx="16" cy="9.9" r="1.12" fill="${color}" stroke="#fff7ed" stroke-width=".55" />
          </svg>
        </div>
      `,
      iconAnchor: [size / 2, size / 2],
      iconSize: [size, size],
    });
  }

  if (kind === "static") {
    const { iconSize, size } = getStaticMarkerSizes(point, isFocused);
    const staticWrapperStyle = `
      width: ${size}px;
      height: ${size}px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: ${markerOpacity};
      border-radius: 999px;
      background: linear-gradient(180deg, rgba(30,33,38,0.98), rgba(8,10,13,0.98));
      box-shadow: inset 0 0 0 2px ${color}, inset 0 0 0 4px rgba(255,255,255,0.18);
      transition: transform 120ms ease, opacity 120ms ease;
      transform: ${isFocused ? "scale(1.12)" : "none"};
    `;

    return L.divIcon({
      className: `live-map-marker-icon live-map-marker-icon-static${isFocused ? " live-map-marker-focused" : ""}`,
      html: `
        <div style="${staticWrapperStyle}">
          <span style="
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 0;
          ">
            ${getStaticIconSvg(point, iconSize)}
          </span>
          ${getStaticMarkerLabelHtml(point, color)}
        </div>
      `,
      iconAnchor: [size / 2, size / 2],
      iconSize: [size, size],
    });
  }

  return L.divIcon();
}

function getPointMarkerZIndex(
  point: LiveMapCanvasMarker,
  activeFloorId: string,
  focusedMarkerId?: string | null,
  hoveredMarkerId?: string | null,
) {
  if (point.id === focusedMarkerId) {
    return 3000;
  }

  if (point.id === hoveredMarkerId) {
    return 2200;
  }

  return point.floorId === null || point.floorId === activeFloorId ? 700 : 0;
}

function getPointMarkerPositionKey(mapKey: string, point: LiveMapCanvasMarker, rotation: LiveMapRotation) {
  return `${mapKey}:${point.x}:${point.y}:${rotation}`;
}

function getPointMarkerLatLng(mapKey: string, point: Pick<LiveMapCanvasMarker, "x" | "y">, coordinateInfo: LiveMapCoordinateInfo, rotation: LiveMapRotation) {
  return L.latLng(getPointMarkerPosition(mapKey, point, coordinateInfo, rotation));
}

function getPointMarkerPresentationKey(
  point: LiveMapCanvasMarker,
  activeFloorId: string,
  isMarkerSimplified: boolean,
  focusedMarkerId?: string | null,
  hoveredMarkerId?: string | null,
) {
  return [
    point.kind,
    point.staticCategory ?? "",
    point.staticFaction ?? "",
    point.floorId ?? "",
    activeFloorId,
    isMarkerSimplified ? "simplified" : "detailed",
    point.id === focusedMarkerId ? "focused" : "",
    point.id === hoveredMarkerId ? "hovered" : "",
  ].join("|");
}

function syncPointMarkerPopup(marker: LeafletMarker, point: LiveMapCanvasMarker) {
  if (!point.popupHtml) {
    marker.unbindPopup();
    return;
  }

  const popup = marker.getPopup();

  if (popup) {
    popup.setContent(point.popupHtml);
    return;
  }

  marker.bindPopup(point.popupHtml, {
    autoPan: false,
    className: "live-map-point-popup",
    closeButton: true,
    closeOnClick: false,
    maxWidth: 460,
    minWidth: 460,
    offset: [0, -30],
  });
}

function updatePointMarkerTooltipContent(marker: LeafletMarker, point: LiveMapCanvasMarker) {
  if (!point.label) {
    marker.unbindTooltip();
    return;
  }

  const tooltip = marker.getTooltip();

  if (tooltip) {
    tooltip.setContent(point.label);
  }
}

function openPointMarkerTooltip(marker: LeafletMarker, point: LiveMapCanvasMarker) {
  if (!point.label) {
    return;
  }

  const tooltip = marker.getTooltip();

  if (tooltip) {
    tooltip.setContent(point.label);
  } else {
    marker.bindTooltip(point.label, {
      className: "live-map-marker-tooltip",
      direction: "top",
      offset: [0, -28],
      opacity: 0.95,
    });
  }

  marker.openTooltip();
}

function closePointMarkerTooltip(marker: LeafletMarker) {
  marker.closeTooltip();
  marker.unbindTooltip();
}

function syncPointMarkerPresentation({
  activeFloorId,
  focusedMarkerId,
  hoveredMarkerId,
  isMarkerSimplified,
  mapKey,
  marker,
  point,
}: {
  activeFloorId: string;
  focusedMarkerId?: string | null;
  hoveredMarkerId?: string | null;
  isMarkerSimplified: boolean;
  mapKey: string;
  marker: LeafletMarker;
  point: LiveMapCanvasMarker;
}) {
  const isDimmed = point.floorId !== null && point.floorId !== activeFloorId;
  const isFocused = point.id === focusedMarkerId;
  const isHovered = point.id === hoveredMarkerId;

  marker.setIcon(PointIcon(point, isDimmed, isFocused, isMarkerSimplified, isHovered));
  marker.setZIndexOffset(getPointMarkerZIndex(point, activeFloorId, focusedMarkerId, hoveredMarkerId));
}

export function LiveMapCanvas({
  activeFloorId,
  clearDrawingRequest,
  coordinateInfo,
  drawingMode,
  floors,
  focusedMarkerId,
  focusRequestKey = 0,
  focusTarget,
  isAutoPanLocked,
  isMarkerSimplified,
  preserveFocusOnPopupEscape,
  location,
  mapKey,
  markers,
  onMarkerClick,
  onMapClick,
  onFloorStep,
  onFocusedMarkerClose,
  onPopupImageClick,
  onMousePositionChange,
  rotation,
  undoDrawingRequest,
}: {
  activeFloorId: string;
  clearDrawingRequest: number;
  coordinateInfo: LiveMapCoordinateInfo;
  drawingMode: LiveMapDrawingMode;
  focusedMarkerId?: string | null;
  focusRequestKey?: number;
  focusTarget?: { id: string; key: number; x: number; y: number } | null;
  floors: LiveMapFloor[];
  isAutoPanLocked: boolean;
  isMarkerSimplified: boolean;
  preserveFocusOnPopupEscape: boolean;
  location: LiveMapLocation | null;
  mapKey: string;
  markers: LiveMapCanvasMarker[];
  onMarkerClick: (marker: LiveMapCanvasMarker) => void;
  onMapClick?: () => void;
  onFloorStep: (direction: "next" | "previous") => void;
  onFocusedMarkerClose?: (markerId: string) => void;
  onPopupImageClick: (image: LiveMapPopupImage) => void;
  onMousePositionChange: (latlng: LatLng) => void;
  rotation: LiveMapRotation;
  undoDrawingRequest: number;
}) {
  const containerRef = useRef<LeafletContainerElement | null>(null);
  const drawingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingStrokesRef = useRef<DrawingStroke[]>([]);
  const drawingStrokesByFloorRef = useRef<Map<string, DrawingStroke[]>>(new Map());
  const currentDrawingStrokeRef = useRef<DrawingStroke | null>(null);
  const lastDrawingClientPointRef = useRef<{ x: number; y: number } | null>(null);
  const redrawDrawingRef = useRef<() => void>(() => undefined);
  const previousClearDrawingRequestRef = useRef(clearDrawingRequest);
  const previousUndoDrawingRequestRef = useRef(undoDrawingRequest);
  const imageOverlayRefs = useRef<LeafletImageOverlay[]>([]);
  const mapRef = useRef<LeafletMap | null>(null);
  const pointMarkerByIdRef = useRef<Map<string, PointMarkerEntry>>(new Map());
  const hoveredMarkerIdRef = useRef<string | null>(null);
  const dismissedPopupMarkerIdRef = useRef<string | null>(null);
  const openPopupMarkerIdRef = useRef<string | null>(null);
  const onMarkerClickRef = useRef(onMarkerClick);
  const onMapClickRef = useRef<typeof onMapClick>(onMapClick);
  const onFloorStepRef = useRef(onFloorStep);
  const lastFocusedMarkerRef = useRef<string | null>(null);
  const lastFocusedFloorRef = useRef<string | null>(null);
  const lastFocusedRequestRef = useRef<number | null>(null);
  const markerRef = useRef<LeafletMarker | null>(null);
  const activeFloorIdRef = useRef(activeFloorId);
  const focusedMarkerIdRef = useRef<string | null | undefined>(focusedMarkerId);
  const mapKeyRef = useRef(mapKey);
  const isAutoPanLockedRef = useRef(isAutoPanLocked);
  const isMarkerSimplifiedRef = useRef(isMarkerSimplified);
  const preserveFocusOnPopupEscapeRef = useRef(preserveFocusOnPopupEscape);
  const rotationRef = useRef<number>(rotation);
  const animatedRotationRef = useRef<number>(rotation);
  const rotationAnimationFrameRef = useRef<number | null>(null);
  const locationRef = useRef(location);
  const onFocusedMarkerCloseRef = useRef<typeof onFocusedMarkerClose>(onFocusedMarkerClose);
  const [renderBounds, setRenderBounds] = useState<LatLngBounds | null>(null);
  const imageBoundsKey = useMemo(
    () => JSON.stringify(coordinateInfo.image_bounds),
    [coordinateInfo.image_bounds],
  );
  const mapBoundsKey = useMemo(
    () => JSON.stringify(coordinateInfo.map_bounds),
    [coordinateInfo.map_bounds],
  );
  locationRef.current = location;

  function getDrawingCacheKey() {
    return `${mapKey}:${activeFloorId}`;
  }

  function cacheDrawingStrokes() {
    drawingStrokesByFloorRef.current.set(
      getDrawingCacheKey(),
      drawingStrokesRef.current,
    );
  }

  redrawDrawingRef.current = () => {
    const canvas = drawingCanvasRef.current;
    const map = mapRef.current;

    if (!canvas || !map) {
      return;
    }

    const rect = map.getContainer().getBoundingClientRect();
    const pixelRatio = window.devicePixelRatio || 1;
    const nextWidth = Math.max(1, Math.round(rect.width * pixelRatio));
    const nextHeight = Math.max(1, Math.round(rect.height * pixelRatio));

    if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    context.clearRect(0, 0, rect.width, rect.height);

    const drawStroke = (stroke: DrawingStroke) => {
      if (stroke.points.length === 0) {
        return;
      }

      const scale = 2 ** (map.getZoom() - stroke.zoom);
      const firstPoint = map.latLngToContainerPoint(
        rotateLatLng(stroke.points[0], coordinateInfo.image_bounds, animatedRotationRef.current),
      );

      context.globalCompositeOperation = stroke.erase ? "destination-out" : "source-over";
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = Math.max(1, Math.min(48, stroke.width * scale));
      context.strokeStyle = stroke.color;
      context.beginPath();
      context.moveTo(firstPoint.x, firstPoint.y);

      if (stroke.points.length === 1) {
        context.lineTo(firstPoint.x + 0.5, firstPoint.y + 0.5);
      } else {
        stroke.points.slice(1).forEach((point) => {
          const canvasPoint = map.latLngToContainerPoint(
            rotateLatLng(point, coordinateInfo.image_bounds, animatedRotationRef.current),
          );
          context.lineTo(canvasPoint.x, canvasPoint.y);
        });
      }

      context.stroke();
    };

    drawingStrokesRef.current.forEach(drawStroke);

    if (currentDrawingStrokeRef.current) {
      drawStroke(currentDrawingStrokeRef.current);
    }

    context.globalCompositeOperation = "source-over";
  };

  useEffect(() => {
    drawingStrokesRef.current = drawingStrokesByFloorRef.current.get(getDrawingCacheKey()) ?? [];
    currentDrawingStrokeRef.current = null;
    window.requestAnimationFrame(() => redrawDrawingRef.current());
  }, [activeFloorId, mapKey]);

  useEffect(() => {
    const canvas = drawingCanvasRef.current;

    if (!canvas) {
      return;
    }

    const resizeObserver = new ResizeObserver(() => redrawDrawingRef.current());
    resizeObserver.observe(canvas.parentElement ?? canvas);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (previousUndoDrawingRequestRef.current === undoDrawingRequest) {
      return;
    }

    previousUndoDrawingRequestRef.current = undoDrawingRequest;
    drawingStrokesRef.current.pop();
    cacheDrawingStrokes();
    redrawDrawingRef.current();
  }, [undoDrawingRequest]);

  useEffect(() => {
    if (previousClearDrawingRequestRef.current === clearDrawingRequest) {
      return;
    }

    previousClearDrawingRequestRef.current = clearDrawingRequest;
    drawingStrokesRef.current = [];
    currentDrawingStrokeRef.current = null;
    cacheDrawingStrokes();
    redrawDrawingRef.current();
  }, [clearDrawingRequest]);

  function getDrawingPoint(event: ReactPointerEvent<HTMLCanvasElement>) {
    const map = mapRef.current;

    if (!map) {
      return null;
    }

    const rect = map.getContainer().getBoundingClientRect();
    const rotatedPoint = map.containerPointToLatLng([
      event.clientX - rect.left,
      event.clientY - rect.top,
    ]);
    return unrotateLatLng(
      rotatedPoint,
      coordinateInfo.image_bounds,
      animatedRotationRef.current,
    );
  }

  function handleDrawingPointerDown(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (drawingMode === "hand" || !mapRef.current) {
      return;
    }

    const point = getDrawingPoint(event);

    if (!point) {
      return;
    }

    currentDrawingStrokeRef.current = {
      color: drawingMode === "red" ? "#ef4444" : drawingMode === "blue" ? "#3b82f6" : "#000",
      erase: drawingMode === "erase",
      points: [{ lat: point.lat, lng: point.lng }],
      width: drawingMode === "erase" ? 22 : 4,
      zoom: mapRef.current.getZoom(),
    };
    lastDrawingClientPointRef.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function handleDrawingPointerMove(event: ReactPointerEvent<HTMLCanvasElement>) {
    const stroke = currentDrawingStrokeRef.current;
    const lastPoint = lastDrawingClientPointRef.current;

    if (!stroke || !lastPoint) {
      return;
    }

    if (Math.hypot(event.clientX - lastPoint.x, event.clientY - lastPoint.y) < 2) {
      return;
    }

    const point = getDrawingPoint(event);

    if (!point) {
      return;
    }

    stroke.points.push({ lat: point.lat, lng: point.lng });
    lastDrawingClientPointRef.current = { x: event.clientX, y: event.clientY };
    redrawDrawingRef.current();
    event.preventDefault();
  }

  function finishDrawingStroke(event: ReactPointerEvent<HTMLCanvasElement>) {
    const stroke = currentDrawingStrokeRef.current;

    if (!stroke) {
      return;
    }

    drawingStrokesRef.current.push(stroke);
    currentDrawingStrokeRef.current = null;
    lastDrawingClientPointRef.current = null;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    cacheDrawingStrokes();
    redrawDrawingRef.current();
    event.preventDefault();
  }

  useEffect(() => {
    activeFloorIdRef.current = activeFloorId;
    focusedMarkerIdRef.current = focusedMarkerId;
    mapKeyRef.current = mapKey;
    isAutoPanLockedRef.current = isAutoPanLocked;
    isMarkerSimplifiedRef.current = isMarkerSimplified;
    preserveFocusOnPopupEscapeRef.current = preserveFocusOnPopupEscape;
    onFocusedMarkerCloseRef.current = onFocusedMarkerClose;
    onMarkerClickRef.current = onMarkerClick;
    onMapClickRef.current = onMapClick;
    onFloorStepRef.current = onFloorStep;
  }, [activeFloorId, focusedMarkerId, isAutoPanLocked, isMarkerSimplified, mapKey, onFloorStep, onFocusedMarkerClose, onMapClick, onMarkerClick, preserveFocusOnPopupEscape]);

  useEffect(() => {
    let accumulatedDelta = 0;
    let lastStepTime = 0;

    const handleFloorWheel = (event: WheelEvent) => {
      if (!event.altKey) {
        accumulatedDelta = 0;
        return;
      }

      const container = containerRef.current;
      const drawingCanvas = drawingCanvasRef.current;
      const target = event.target;

      if (
        !(target instanceof Node) ||
        (!container?.contains(target) && !drawingCanvas?.contains(target))
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const now = performance.now();

      if (now - lastStepTime < 250) {
        return;
      }

      const deltaMultiplier =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1;
      accumulatedDelta += event.deltaY * deltaMultiplier;

      if (Math.abs(accumulatedDelta) < 30) {
        return;
      }

      onFloorStepRef.current(accumulatedDelta < 0 ? "previous" : "next");
      accumulatedDelta = 0;
      lastStepTime = now;
    };

    window.addEventListener("wheel", handleFloorWheel, {
      capture: true,
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleFloorWheel, {
        capture: true,
      });
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    if (mapRef.current) {
      mapRef.current.off();
      mapRef.current.remove();
      mapRef.current = null;
    }

    clearLeafletContainer(container);

    const map = L.map(container, {
      center: getMapCenter(coordinateInfo.image_bounds),
      crs: CRS.Simple,
      doubleClickZoom: false,
      fadeAnimation: false,
      markerZoomAnimation: false,
      maxBounds: getRelaxedMapBounds(
        getRotatedMapBounds(coordinateInfo.map_bounds, coordinateInfo.image_bounds, rotation),
      ),
      maxBoundsViscosity: 0.1,
      maxZoom: 4,
      minZoom: -2,
      wheelDebounceTime: 80,
      wheelPxPerZoomLevel: 240,
      zoom: coordinateInfo.default_zoom_level,
      zoomAnimation: false,
      zoomDelta: 0.25,
      zoomSnap: 0.25,
    });
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize({ debounceMoveend: true, pan: false });
    });

    resizeObserver.observe(container);

    const updateRenderBounds = () => {
      setRenderBounds(map.getBounds().pad(1));
    };
    const startZoomInteraction = () => {
      container.classList.add("live-map-is-zooming");
      pointMarkerByIdRef.current.forEach(({ marker }) => closePointMarkerTooltip(marker));
    };
    const endZoomInteraction = () => {
      container.classList.remove("live-map-is-zooming");
    };

    updateRenderBounds();
    map.on("moveend zoomend resize", updateRenderBounds);
    map.on("move zoom viewreset resize", () => redrawDrawingRef.current());
    map.on("zoomstart", startZoomInteraction);
    map.on("zoomend", endZoomInteraction);

    map.on("mousemove", (event: LeafletMouseEvent) => {
      const basePosition = unrotateLatLng(
        event.latlng,
        coordinateInfo.image_bounds,
        rotationRef.current,
      );
      onMousePositionChange(transformMousePosition(mapKey, basePosition) as LatLng);
    });

    map.on("click", (event: LeafletMouseEvent) => {
      const target = event.originalEvent.target;

      if (
        target instanceof HTMLElement &&
        (target.closest(".leaflet-marker-icon") ||
          target.closest(".leaflet-popup") ||
          target.closest(".leaflet-control"))
      ) {
        return;
      }

      map.closePopup();
      onMapClickRef.current?.();
    });

    const handlePopupClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target.closest(".leaflet-popup-close-button")) {
        const currentFocusedMarkerId = focusedMarkerIdRef.current;

        if (currentFocusedMarkerId) {
          onFocusedMarkerCloseRef.current?.(currentFocusedMarkerId);
        }

        return;
      }

      const thumb = target.closest<HTMLButtonElement>(".live-map-popup-thumb");

      if (thumb) {
        event.preventDefault();
        event.stopPropagation();

        const card = thumb.closest<HTMLElement>(".live-map-popup-card");
        const mainImage = card?.querySelector<HTMLImageElement>(".live-map-popup-image");
        const count = card?.querySelector<HTMLElement>(".live-map-popup-count");
        const location = card?.querySelector<HTMLElement>(".live-map-popup-location");
        const src = thumb.dataset.src;
        const alt = thumb.dataset.alt ?? "";
        const description = thumb.dataset.description ?? "";
        const shouldContainImage = thumb.dataset.fit === "contain";
        const href = thumb.dataset.href ?? "";

        if (mainImage && src) {
          mainImage.src = src;
          mainImage.dataset.fullSrc = src;
          mainImage.dataset.fit = shouldContainImage ? "contain" : "cover";
          mainImage.alt = alt;
          mainImage.classList.toggle("live-map-popup-image-contain", shouldContainImage);
        }

        if (location) {
          const locationText = location.querySelector<HTMLElement>(".live-map-popup-location-text");

          if (locationText) {
            locationText.textContent = description;
          } else {
            location.textContent = description;
          }

          if (location instanceof HTMLAnchorElement) {
            const linkLabel = location.querySelector<HTMLElement>(".live-map-popup-item-link-label");

            if (href) {
              location.href = href;
            } else {
              location.removeAttribute("href");
            }

            if (linkLabel) {
              linkLabel.hidden = !href;
            }
          }

          location.hidden = !description;
        }

        card?.querySelectorAll(".live-map-popup-thumb").forEach((entry) => {
          entry.classList.toggle("live-map-popup-thumb-active", entry === thumb);
        });

        if (count) {
          const total = card?.querySelectorAll(".live-map-popup-thumb").length ?? 0;
          const index = Number(thumb.dataset.index ?? 0) + 1;
          count.textContent = `${index} / ${total}`;
        }

        return;
      }

      const image = target.closest<HTMLImageElement>(".live-map-popup-image");

      if (!image) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      const card = image.closest<HTMLElement>(".live-map-popup-card");
      const thumbs = Array.from(card?.querySelectorAll<HTMLButtonElement>(".live-map-popup-thumb") ?? []);
      const images = thumbs.map((thumb) => ({
        alt: thumb.dataset.alt ?? "",
        fit: thumb.dataset.fit === "contain" ? "contain" as const : "cover" as const,
        src: thumb.dataset.src ?? "",
      })).filter((entry) => entry.src);
      const currentSrc = image.dataset.fullSrc ?? image.src;
      const index = images.findIndex((entry) => entry.src === currentSrc);

      onPopupImageClick({
        alt: image.alt,
        fit: image.dataset.fit === "contain" ? "contain" : "cover",
        images: images.length > 0 ? images : undefined,
        index: index >= 0 ? index : undefined,
        src: image.dataset.fullSrc ?? image.src,
      });
    };

    const preventControlDrag = (event: DragEvent) => {
      const target = event.target;

      if (target instanceof HTMLElement && target.closest(".leaflet-control")) {
        event.preventDefault();
      }
    };

    const closePopupOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      const markerId = openPopupMarkerIdRef.current;
      const marker = markerId ? pointMarkerByIdRef.current.get(markerId)?.marker : null;

      if (!markerId || !marker?.isPopupOpen()) {
        return;
      }

      dismissedPopupMarkerIdRef.current = markerId;
      marker.closePopup();

      if (!preserveFocusOnPopupEscapeRef.current) {
        onFocusedMarkerCloseRef.current?.(markerId);
      }

      event.preventDefault();
      event.stopPropagation();
    };

    const preventDocumentSelection = (event: Event) => {
      event.preventDefault();
    };
    const endMapDrag = () => {
      document.documentElement.classList.remove("live-map-document-dragging");
      document.removeEventListener("selectstart", preventDocumentSelection);
    };
    const startMapDrag = () => {
      window.getSelection()?.removeAllRanges();
      document.documentElement.classList.add("live-map-document-dragging");
      document.addEventListener("selectstart", preventDocumentSelection);
    };

    container.addEventListener("click", handlePopupClick);
    container.addEventListener("dragstart", preventControlDrag);
    map.on("dragstart", startMapDrag);
    map.on("dragend", endMapDrag);
    window.addEventListener("mouseup", endMapDrag, true);
    window.addEventListener("pointerup", endMapDrag, true);
    window.addEventListener("pointercancel", endMapDrag, true);
    window.addEventListener("blur", endMapDrag);
    window.addEventListener("keydown", closePopupOnEscape, true);

    mapRef.current = map;
    window.requestAnimationFrame(() => redrawDrawingRef.current());

    return () => {
      endMapDrag();
      window.removeEventListener("mouseup", endMapDrag, true);
      window.removeEventListener("pointerup", endMapDrag, true);
      window.removeEventListener("pointercancel", endMapDrag, true);
      window.removeEventListener("blur", endMapDrag);
      window.removeEventListener("keydown", closePopupOnEscape, true);
      resizeObserver.disconnect();
      container.classList.remove("live-map-is-zooming");
      markerRef.current?.remove();
      markerRef.current = null;
      pointMarkerByIdRef.current.forEach(({ marker }) => marker.remove());
      pointMarkerByIdRef.current.clear();
      imageOverlayRefs.current.forEach((overlay) => overlay.remove());
      imageOverlayRefs.current = [];
      map.off();
      map.remove();
      mapRef.current = null;

      if (container.isConnected) {
        clearLeafletContainer(container);
      } else {
        delete container._leaflet_id;
      }

      container.removeEventListener("click", handlePopupClick);
      container.removeEventListener("dragstart", preventControlDrag);
    };
  }, [
    coordinateInfo.default_zoom_level,
    mapKey,
    mapBoundsKey,
    onMousePositionChange,
    onPopupImageClick,
  ]);

  const renderMarkers = useMemo(() => {
    if (!renderBounds) {
      return markers;
    }

    return markers.filter((point) => (
      point.id === focusedMarkerId ||
      renderBounds.contains(getPointMarkerLatLng(mapKey, point, coordinateInfo, rotation))
    ));
  }, [coordinateInfo, focusedMarkerId, mapKey, markers, renderBounds, rotation]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      animatedRotationRef.current = rotation;
      rotationRef.current = rotation;
      return;
    }

    if (rotationAnimationFrameRef.current !== null) {
      window.cancelAnimationFrame(rotationAnimationFrameRef.current);
      rotationAnimationFrameRef.current = null;
    }

    const container = map.getContainer();
    const startRotation = animatedRotationRef.current;
    let rotationDelta = (rotation - (startRotation % 360) + 360) % 360;

    if (rotationDelta > 180) {
      rotationDelta -= 360;
    }

    const baseCenter = unrotateLatLng(
      map.getCenter(),
      coordinateInfo.image_bounds,
      startRotation,
    );
    map.setMaxBounds(
      getRelaxedMapBounds(
        getRotatedMapBounds(coordinateInfo.map_bounds, coordinateInfo.image_bounds, rotation),
      ),
    );

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 0 : 180;
    const startTime = performance.now();

    if (duration > 0 && rotationDelta !== 0) {
      container.classList.add("live-map-is-rotating");
    }

    const renderRotationFrame = (timestamp: number) => {
      const progress = duration === 0 ? 1 : Math.min(1, (timestamp - startTime) / duration);
      const easedProgress = 1 - (1 - progress) ** 3;
      const currentRotation = startRotation + rotationDelta * easedProgress;
      const nextCenter = rotateLatLng(
        baseCenter,
        coordinateInfo.image_bounds,
        currentRotation,
      );

      animatedRotationRef.current = currentRotation;
      rotationRef.current = currentRotation;
      map.setView(nextCenter, map.getZoom(), { animate: false });
      imageOverlayRefs.current.forEach((overlay) => applyImageRotation(overlay, currentRotation));
      pointMarkerByIdRef.current.forEach((entry) => {
        entry.marker.setLatLng(
          getPointMarkerPosition(mapKey, entry.point, coordinateInfo, currentRotation),
        );
      });

      const currentLocation = locationRef.current;

      if (currentLocation && markerRef.current) {
        markerRef.current.setLatLng(
          rotateLatLng(
            getPlayerMarkerPosition(mapKey, {
              x: currentLocation.x,
              y: currentLocation.z,
              yaw: currentLocation.yaw,
            }),
            coordinateInfo.image_bounds,
            currentRotation,
          ),
        );
        const playerElement = markerRef.current
          .getElement()
          ?.querySelector<HTMLElement>(".player-location-marker");
        playerElement?.style.setProperty(
          "transform",
          `rotate(${(getPlayerMarkerYaw(mapKey, currentLocation.yaw) + currentRotation) % 360}deg)`,
        );
      }

      redrawDrawingRef.current();

      if (progress < 1) {
        rotationAnimationFrameRef.current = window.requestAnimationFrame(renderRotationFrame);
        return;
      }

      animatedRotationRef.current = rotation;
      rotationRef.current = rotation;
      rotationAnimationFrameRef.current = null;
      imageOverlayRefs.current.forEach((overlay) => applyImageRotation(overlay, rotation));
      container.classList.remove("live-map-is-rotating");
    };

    rotationAnimationFrameRef.current = window.requestAnimationFrame(renderRotationFrame);

    return () => {
      if (rotationAnimationFrameRef.current !== null) {
        window.cancelAnimationFrame(rotationAnimationFrameRef.current);
        rotationAnimationFrameRef.current = null;
      }
      container.classList.remove("live-map-is-rotating");
    };
  }, [coordinateInfo, mapKey, rotation]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    imageOverlayRefs.current.forEach((overlay) => overlay.remove());
    imageOverlayRefs.current = [];

    const drawableFloors = floors.filter((floor) => floor.image);
    const inactiveFloors = drawableFloors.filter((floor) => floor.id !== activeFloorId);
    const activeFloor = drawableFloors.find((floor) => floor.id === activeFloorId);
    const orderedFloors = activeFloor ? [...inactiveFloors, activeFloor] : drawableFloors;

    imageOverlayRefs.current = orderedFloors.map((floor) => {
      const isActive = floor.id === activeFloorId;
      const overlay = L.imageOverlay(floor.image ?? "", coordinateInfo.image_bounds, {
        className: isActive
          ? "live-map-floor-layer live-map-floor-layer-active"
          : "live-map-floor-layer live-map-floor-layer-inactive",
        opacity: isActive ? 1 : 0.2,
      });

      overlay.addTo(map);
      applyImageRotation(overlay, animatedRotationRef.current);

      if (isActive) {
        overlay.bringToFront();
      }

      return overlay;
    });

    const restoreImageRotation = () => {
      window.requestAnimationFrame(() => {
        imageOverlayRefs.current.forEach((overlay) =>
          applyImageRotation(overlay, animatedRotationRef.current),
        );
      });
    };

    map.on("viewreset zoomend", restoreImageRotation);

    return () => {
      map.off("viewreset zoomend", restoreImageRotation);
      imageOverlayRefs.current.forEach((overlay) => overlay.remove());
      imageOverlayRefs.current = [];
    };
  }, [activeFloorId, imageBoundsKey, floors]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    const nextIds = new Set(renderMarkers.map((point) => point.id));

    pointMarkerByIdRef.current.forEach((entry, id) => {
      if (!nextIds.has(id)) {
        entry.marker.remove();
        pointMarkerByIdRef.current.delete(id);
      }
    });

    renderMarkers.forEach((point) => {
      const existing = pointMarkerByIdRef.current.get(point.id);
      const hoveredMarkerId = hoveredMarkerIdRef.current;
      const nextPositionKey = getPointMarkerPositionKey(mapKey, point, rotation);
      const nextPresentationKey = getPointMarkerPresentationKey(
        point,
        activeFloorId,
        isMarkerSimplified,
        focusedMarkerId,
        hoveredMarkerId,
      );

      if (existing) {
        existing.point = point;

        if (existing.positionKey !== nextPositionKey) {
          existing.marker.setLatLng(
            getPointMarkerPosition(
              mapKey,
              point,
              coordinateInfo,
              animatedRotationRef.current,
            ),
          );
          existing.positionKey = nextPositionKey;
        }

        if (existing.label !== point.label) {
          existing.marker.options.title = point.label;
          updatePointMarkerTooltipContent(existing.marker, point);
          existing.label = point.label;
        }

        if (existing.popupHtml !== point.popupHtml) {
          syncPointMarkerPopup(existing.marker, point);
          existing.popupHtml = point.popupHtml;
        }

        if (existing.presentationKey !== nextPresentationKey) {
          syncPointMarkerPresentation({
            activeFloorId,
            focusedMarkerId,
            hoveredMarkerId,
            isMarkerSimplified,
            mapKey,
            marker: existing.marker,
            point,
          });
          existing.presentationKey = nextPresentationKey;
        }

        return;
      }

      const marker = L.marker(getPointMarkerPosition(
        mapKey,
        point,
        coordinateInfo,
        animatedRotationRef.current,
      ), {
        icon: PointIcon(
          point,
          point.floorId !== null && point.floorId !== activeFloorId,
          point.id === focusedMarkerId,
          isMarkerSimplified,
        ),
        keyboard: true,
        title: point.label,
        zIndexOffset: getPointMarkerZIndex(point, activeFloorId, focusedMarkerId, hoveredMarkerIdRef.current),
      });

      syncPointMarkerPopup(marker, point);

      marker.on("popupopen", () => {
        openPopupMarkerIdRef.current = point.id;
        dismissedPopupMarkerIdRef.current = null;
      });

      marker.on("popupclose", () => {
        if (openPopupMarkerIdRef.current === point.id) {
          openPopupMarkerIdRef.current = null;
        }

        dismissedPopupMarkerIdRef.current = point.id;
      });

      marker.on("click", (event) => {
        L.DomEvent.stopPropagation(event);

        const current = pointMarkerByIdRef.current.get(point.id)?.point ?? point;
        dismissedPopupMarkerIdRef.current = null;
        onMarkerClickRef.current(current);

        if (current.popupHtml && (!current.floorId || current.floorId === activeFloorIdRef.current)) {
          marker.openPopup();
        }
      });

      marker.on("mouseover", () => {
        hoveredMarkerIdRef.current = point.id;
        const current = pointMarkerByIdRef.current.get(point.id);

        if (current) {
          const nextPresentationKey = getPointMarkerPresentationKey(
            current.point,
            activeFloorIdRef.current,
            isMarkerSimplifiedRef.current,
            focusedMarkerIdRef.current,
            point.id,
          );

          syncPointMarkerPresentation({
            activeFloorId: activeFloorIdRef.current,
            focusedMarkerId: focusedMarkerIdRef.current,
            hoveredMarkerId: point.id,
            isMarkerSimplified: isMarkerSimplifiedRef.current,
            mapKey: mapKeyRef.current,
            marker: current.marker,
            point: current.point,
          });
          current.presentationKey = nextPresentationKey;
          openPointMarkerTooltip(current.marker, current.point);
        }
      });

      marker.on("mouseout", () => {
        if (hoveredMarkerIdRef.current === point.id) {
          hoveredMarkerIdRef.current = null;
        }

        const current = pointMarkerByIdRef.current.get(point.id);

        if (current) {
          const nextPresentationKey = getPointMarkerPresentationKey(
            current.point,
            activeFloorIdRef.current,
            isMarkerSimplifiedRef.current,
            focusedMarkerIdRef.current,
            hoveredMarkerIdRef.current,
          );

          syncPointMarkerPresentation({
            activeFloorId: activeFloorIdRef.current,
            focusedMarkerId: focusedMarkerIdRef.current,
            hoveredMarkerId: hoveredMarkerIdRef.current,
            isMarkerSimplified: isMarkerSimplifiedRef.current,
            mapKey: mapKeyRef.current,
            marker: current.marker,
            point: current.point,
          });
          current.presentationKey = nextPresentationKey;
          closePointMarkerTooltip(current.marker);
        }
      });

      marker.addTo(map);
      pointMarkerByIdRef.current.set(point.id, {
        label: point.label,
        marker,
        point,
        popupHtml: point.popupHtml,
        positionKey: nextPositionKey,
        presentationKey: nextPresentationKey,
      });
    });
  }, [activeFloorId, coordinateInfo, focusedMarkerId, isMarkerSimplified, mapKey, renderMarkers, rotation]);

  useEffect(() => {
    const map = mapRef.current;
    const targetId = focusTarget?.id ?? focusedMarkerId;

    if (!map || !targetId) {
      return;
    }

    const focusedPoint =
      focusTarget?.id === targetId
        ? focusTarget
        : renderMarkers.find((point) => point.id === targetId);

    if (!focusedPoint) {
      return;
    }

    const marker = pointMarkerByIdRef.current.get(targetId)?.marker;
    const requestKey = focusTarget?.key ?? focusRequestKey;

    const shouldMoveView =
      lastFocusedMarkerRef.current !== targetId ||
      lastFocusedFloorRef.current !== activeFloorId ||
      lastFocusedRequestRef.current !== requestKey;

    if (!shouldMoveView && dismissedPopupMarkerIdRef.current === targetId) {
      return;
    }

    if (!shouldMoveView && marker?.isPopupOpen()) {
      return;
    }

    if (shouldMoveView) {
      dismissedPopupMarkerIdRef.current = null;
    }

    lastFocusedMarkerRef.current = targetId;
    lastFocusedFloorRef.current = activeFloorId;
    lastFocusedRequestRef.current = requestKey;

    const moveToFocusedPoint = () => {
      if (!map.getContainer().isConnected) {
        return null;
      }

      const currentMarker = pointMarkerByIdRef.current.get(targetId)?.marker;
      const targetLatLng = currentMarker?.getLatLng() ?? getPointMarkerLatLng(
        mapKey,
        focusedPoint,
        coordinateInfo,
        rotation,
      );

      if (shouldMoveView) {
        map.setView(targetLatLng, map.getZoom(), { animate: false });
      }

      return currentMarker;
    };

    const markerAfterImmediateMove = moveToFocusedPoint();

    if (markerAfterImmediateMove) {
      try {
        markerAfterImmediateMove.openPopup();
      } catch {
        // Leaflet can throw when a marker is recreated during a fast repeated focus.
      }
    }

    const frameId = window.requestAnimationFrame(() => {
      const currentMarker = moveToFocusedPoint();

      if (currentMarker) {
        try {
          currentMarker.openPopup();
        } catch {
          // Leaflet can throw when a marker is recreated during a fast repeated focus.
        }
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [activeFloorId, coordinateInfo, focusedMarkerId, focusRequestKey, focusTarget, mapKey, renderMarkers, rotation]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    markerRef.current?.remove();
    markerRef.current = null;

    if (!location) {
      return;
    }

    const position = rotateLatLng(
      getPlayerMarkerPosition(mapKey, {
        x: location.x,
        y: location.z,
        yaw: location.yaw,
      }),
      coordinateInfo.image_bounds,
      animatedRotationRef.current,
    );
    const marker = L.marker(position, {
      icon: PlayerIcon(
        (getPlayerMarkerYaw(mapKey, location.yaw) + animatedRotationRef.current) % 360,
      ),
      zIndexOffset: 10000,
    });

    marker.addTo(map);
    marker.setZIndexOffset(10000);
    const markerElement = marker.getElement();
    markerElement?.classList.add("live-map-player-marker");
    markerElement?.style.setProperty("z-index", "10000");
    markerElement?.style.setProperty("pointer-events", "none");
    markerElement?.parentElement?.append(markerElement);
    marker.setOpacity(1);
    markerRef.current = marker;

    const frameId = window.requestAnimationFrame(() => {
      if (map.getContainer().isConnected && !isAutoPanLockedRef.current) {
        map.setView(position, map.getZoom(), { animate: false });
      }
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      marker.remove();

      if (markerRef.current === marker) {
        markerRef.current = null;
      }
    };
  }, [coordinateInfo.image_bounds, location, mapKey, rotation]);

  return (
    <>
      <div ref={containerRef} className="eft-leaflet-map live-map-canvas h-full w-full" />
      <canvas
        ref={drawingCanvasRef}
        aria-label="Map drawing layer"
        onPointerCancel={finishDrawingStroke}
        onPointerDown={handleDrawingPointerDown}
        onPointerMove={handleDrawingPointerMove}
        onPointerUp={finishDrawingStroke}
        className="absolute inset-0 z-[900] touch-none"
        style={{
          cursor: drawingMode === "hand" ? "default" : drawingMode === "erase" ? "cell" : "crosshair",
          pointerEvents: drawingMode === "hand" ? "none" : "auto",
        }}
      />
    </>
  );
}
