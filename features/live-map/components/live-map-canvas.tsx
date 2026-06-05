"use client";

import { useEffect, useMemo, useRef } from "react";
import L, {
  CRS,
  type ImageOverlay as LeafletImageOverlay,
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
  src: string;
}

type LeafletContainerElement = HTMLDivElement & {
  _leaflet_id?: number;
};

interface PointMarkerEntry {
  marker: LeafletMarker;
  point: LiveMapCanvasMarker;
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
  stationary_weapon: "#94a3b8",
  transit: "#f87171",
  transit_switch: "#facc15",
};

function getPointMarkerPosition(
  mapId: string,
  point: Pick<LiveMapCanvasMarker, "x" | "y">,
): [number, number] {
  return getPlayerMarkerPosition(mapId, { x: point.x, y: point.y, yaw: 0 });
}

function getRelaxedMapBounds(bounds: LiveMapCoordinateInfo["map_bounds"]) {
  return L.latLngBounds(bounds).pad(1.4);
}

function getMapCenter(bounds: LiveMapCoordinateInfo["image_bounds"]) {
  return L.latLngBounds(bounds).getCenter();
}

function getStaticMarkerType(point: LiveMapCanvasMarker) {
  if (point.staticCategory === "extract") {
    return `extract:${point.staticFaction ?? "unknown"}`;
  }

  return point.staticCategory ?? "static";
}

function getStaticMarkerColor(point: LiveMapCanvasMarker) {
  return staticMarkerColorByType[getStaticMarkerType(point)] ?? markerColorByKind.static;
}

function getStaticMarkerSizes(point: LiveMapCanvasMarker, isFocused: boolean) {
  switch (point.staticCategory) {
    case "extract":
      return {
        iconSize: isFocused ? 39 : 34,
        size: isFocused ? 48 : 42,
      };
    case "transit":
      return {
        iconSize: isFocused ? 37 : 32,
        size: isFocused ? 46 : 40,
      };
    case "stationary_weapon":
      return {
        iconSize: isFocused ? 35 : 30,
        size: isFocused ? 42 : 38,
      };
    case "transit_switch":
      return {
        iconSize: isFocused ? 33 : 28,
        size: isFocused ? 40 : 36,
      };
    default:
      return {
        iconSize: isFocused ? 35 : 31,
        size: isFocused ? 42 : 36,
      };
  }
}

function PersonIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <circle cx="12" cy="5" r="2.6" fill="${color}" />
      <path d="M9.2 10.1c0-1.7 5.6-1.7 5.6 0l-.45 5.5h-4.9z" fill="${color}" />
      <path d="M9.8 10.7 7 14.2M14.2 10.7l2.8 3.5M10.2 15.6 8.8 21M13.8 15.6 15.2 21" stroke="${color}" stroke-width="2.3" stroke-linecap="round" />
    </svg>
  `;
}

function RunningIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <circle cx="13.8" cy="4.2" r="2.35" fill="${color}" />
      <path d="M9.7 8.7c1-1.75 4.7-1.85 6.1-.15l1.45 3.25-3.25 1-.95 4h-3.15l1.05-4-2.35-2z" fill="${color}" />
      <path d="M8.6 10.8 5.9 14M17.2 11.8l2.5-2.3M9.9 16.7 7.5 21M12.9 16.7l3.2 4.1" stroke="${color}" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
}

function SwitchIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <rect x="17" y="9" width="4.5" height="8" rx="1.5" fill="${color}" opacity="0.5" />
      <circle cx="19.2" cy="15" r="2.35" fill="${color}" />
      <path d="M19.2 15 8 5.6" stroke="${color}" stroke-width="3" stroke-linecap="round" />
      <rect x="5.2" y="2.2" width="5.6" height="5" rx="1.5" fill="${color}" transform="rotate(-45 8 4.7)" />
    </svg>
  `;
}

function GunIconSvg(color: string, size: number) {
  return `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true" shape-rendering="geometricPrecision">
      <path d="M6.3 9.1h6.2v4.1H6.3z" fill="${color}" />
      <path d="M12 10.1h10" stroke="${color}" stroke-width="2.7" stroke-linecap="round" />
      <path d="M6.4 10.2 3.2 9.5l-.9 3.4 4.1.2z" fill="${color}" opacity="0.9" />
      <path d="M9 13.3 5.6 21M10.6 13.3l4 7.7M9.7 13.3v7.2" stroke="${color}" stroke-width="2.2" stroke-linecap="round" />
    </svg>
  `;
}

function getStaticIconSvg(point: LiveMapCanvasMarker, size: number) {
  const color = getStaticMarkerColor(point);
  const type = getStaticMarkerType(point);

  if (type.startsWith("extract:")) {
    return PersonIconSvg(color, size);
  }

  if (type === "transit") {
    return RunningIconSvg(color, size);
  }

  if (type === "transit_switch") {
    return SwitchIconSvg(color, size);
  }

  if (type === "stationary_weapon") {
    return GunIconSvg(color, size);
  }

  return PersonIconSvg(color, size);
}

function PointIcon(point: LiveMapCanvasMarker, isDimmed: boolean, isFocused: boolean) {
  const { kind } = point;
  const color = markerColorByKind[kind];
  const width = isFocused ? 30 : 24;
  const height = isFocused ? 36 : 30;
  const circleRadius = isFocused ? 4.6 : 4.3;
  const wrapperStyle = `
    width: ${width}px;
    height: ${height}px;
    position: relative;
    opacity: ${isDimmed ? "0.32" : "1"};
    filter: drop-shadow(0 3px 6px rgba(0,0,0,0.48)) ${isFocused ? "drop-shadow(0 0 9px rgba(255,180,0,0.82))" : ""};
    transition: transform 120ms ease, opacity 120ms ease, filter 120ms ease;
    transform: ${isFocused ? "translateY(-3px) scale(1.06)" : "none"};
  `;

  if (kind === "quest") {
    const size = isFocused ? 28 : 22;
    const questWrapperStyle = `
      width: ${size}px;
      height: ${size}px;
      position: relative;
      opacity: ${isDimmed ? "0.32" : "1"};
      filter: drop-shadow(0 2px 5px rgba(0,0,0,0.5)) ${isFocused ? "drop-shadow(0 0 9px rgba(255,180,0,0.86))" : ""};
      transition: transform 120ms ease, opacity 120ms ease, filter 120ms ease;
      transform: ${isFocused ? "scale(1.12)" : "none"};
    `;

    return L.divIcon({
      className: "live-map-marker-icon live-map-marker-icon-quest",
      html: `
        <div style="${questWrapperStyle}">
          <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10.2" fill="#1a1c1f" stroke="#0b0d10" stroke-width="2.1" />
            <circle cx="12" cy="12" r="8.1" fill="#1a1c1f" stroke="#ffb400" stroke-width="2.2" />
            <path d="M8.2 14.1h1.95c.82 0 1.18-.4 1.18-1.06v-2.08c0-.66.36-1.06 1.18-1.06h3.29" stroke="#fff7ed" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="8" cy="14.1" r="1.12" fill="#ffb400" stroke="#fff7ed" stroke-width=".55" />
            <circle cx="12" cy="9.9" r="1.12" fill="#ffb400" stroke="#fff7ed" stroke-width=".55" />
            <circle cx="16" cy="9.9" r="1.12" fill="#ffb400" stroke="#fff7ed" stroke-width=".55" />
          </svg>
        </div>
      `,
      iconAnchor: [size / 2, size / 2],
      iconSize: [size, size],
    });
  }

  if (kind === "static") {
    const { iconSize, size } = getStaticMarkerSizes(point, isFocused);
    const color = getStaticMarkerColor(point);
    const staticWrapperStyle = `
      width: ${size}px;
      height: ${size}px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: ${isDimmed ? "0.32" : "1"};
      border-radius: 999px;
      background: rgba(15, 17, 20, 0.88);
      box-shadow: inset 0 0 0 1.5px rgba(255,255,255,0.82), inset 0 0 0 3.5px ${color}66;
      filter: drop-shadow(0 3px 7px rgba(0,0,0,0.62)) ${isFocused ? `drop-shadow(0 0 11px ${color})` : ""};
      transition: transform 120ms ease, opacity 120ms ease, filter 120ms ease;
      transform: ${isFocused ? "scale(1.12)" : "none"};
    `;

    return L.divIcon({
      className: "live-map-marker-icon live-map-marker-icon-static",
      html: `
        <div style="${staticWrapperStyle}">
          ${getStaticIconSvg(point, iconSize)}
        </div>
      `,
      iconAnchor: [size / 2, size / 2],
      iconSize: [size, size],
    });
  }

  return L.divIcon({
    className: "live-map-marker-icon",
    html: `
      <div style="${wrapperStyle}">
        <svg width="${width}" height="${height}" viewBox="0 0 24 28" fill="none" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 16 12 16S24 21 24 12C24 5.373 18.627 0 12 0z" fill="${color}" />
          <circle cx="12" cy="12" r="${circleRadius}" fill="#1A1C1F" />
        </svg>
      </div>
    `,
    iconAnchor: [width / 2, height],
    iconSize: [width, height],
  });
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
    className: "live-map-point-popup",
    closeButton: true,
    maxWidth: 460,
    minWidth: 460,
    offset: [0, -30],
  });
}

function syncPointMarkerTooltip(marker: LeafletMarker, point: LiveMapCanvasMarker) {
  if (!point.label) {
    marker.unbindTooltip();
    return;
  }

  const tooltip = marker.getTooltip();

  if (tooltip) {
    tooltip.setContent(point.label);
    return;
  }

  marker.bindTooltip(point.label, {
    className: "live-map-marker-tooltip",
    direction: "top",
    offset: [0, -28],
    opacity: 0.95,
  });
}

function syncPointMarkerPresentation({
  activeFloorId,
  focusedMarkerId,
  hoveredMarkerId,
  mapKey,
  marker,
  point,
}: {
  activeFloorId: string;
  focusedMarkerId?: string | null;
  hoveredMarkerId?: string | null;
  mapKey: string;
  marker: LeafletMarker;
  point: LiveMapCanvasMarker;
}) {
  const isDimmed = point.floorId !== null && point.floorId !== activeFloorId;
  const isFocused = point.id === focusedMarkerId;

  marker.setLatLng(getPointMarkerPosition(mapKey, point));
  marker.setIcon(PointIcon(point, isDimmed, isFocused));
  marker.setZIndexOffset(getPointMarkerZIndex(point, activeFloorId, focusedMarkerId, hoveredMarkerId));
}

export function LiveMapCanvas({
  activeFloorId,
  coordinateInfo,
  floors,
  focusedMarkerId,
  location,
  mapKey,
  markers,
  onMarkerClick,
  onFocusedMarkerClose,
  onPopupImageClick,
  onMousePositionChange,
}: {
  activeFloorId: string;
  coordinateInfo: LiveMapCoordinateInfo;
  focusedMarkerId?: string | null;
  floors: LiveMapFloor[];
  location: LiveMapLocation | null;
  mapKey: string;
  markers: LiveMapCanvasMarker[];
  onMarkerClick: (marker: LiveMapCanvasMarker) => void;
  onFocusedMarkerClose?: (markerId: string) => void;
  onPopupImageClick: (image: LiveMapPopupImage) => void;
  onMousePositionChange: (latlng: LatLng) => void;
}) {
  const containerRef = useRef<LeafletContainerElement | null>(null);
  const imageOverlayRefs = useRef<LeafletImageOverlay[]>([]);
  const mapRef = useRef<LeafletMap | null>(null);
  const pointMarkerByIdRef = useRef<Map<string, PointMarkerEntry>>(new Map());
  const hoveredMarkerIdRef = useRef<string | null>(null);
  const onMarkerClickRef = useRef(onMarkerClick);
  const lastFocusedMarkerRef = useRef<string | null>(null);
  const lastFocusedFloorRef = useRef<string | null>(null);
  const markerRef = useRef<LeafletMarker | null>(null);
  const activeFloorIdRef = useRef(activeFloorId);
  const focusedMarkerIdRef = useRef<string | null | undefined>(focusedMarkerId);
  const mapKeyRef = useRef(mapKey);
  const onFocusedMarkerCloseRef = useRef<typeof onFocusedMarkerClose>(onFocusedMarkerClose);
  const imageBoundsKey = useMemo(
    () => JSON.stringify(coordinateInfo.image_bounds),
    [coordinateInfo.image_bounds],
  );
  const mapBoundsKey = useMemo(
    () => JSON.stringify(coordinateInfo.map_bounds),
    [coordinateInfo.map_bounds],
  );

  useEffect(() => {
    activeFloorIdRef.current = activeFloorId;
    focusedMarkerIdRef.current = focusedMarkerId;
    mapKeyRef.current = mapKey;
    onFocusedMarkerCloseRef.current = onFocusedMarkerClose;
    onMarkerClickRef.current = onMarkerClick;
  }, [activeFloorId, focusedMarkerId, mapKey, onFocusedMarkerClose, onMarkerClick]);

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
      maxBounds: getRelaxedMapBounds(coordinateInfo.map_bounds),
      maxBoundsViscosity: 0.1,
      maxZoom: 4,
      minZoom: -2,
      zoom: coordinateInfo.default_zoom_level,
      zoomAnimation: false,
      zoomSnap: 0.5,
    });

    map.on("mousemove", (event: LeafletMouseEvent) => {
      onMousePositionChange(transformMousePosition(mapKey, event.latlng) as LatLng);
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
        const src = thumb.dataset.src;
        const alt = thumb.dataset.alt ?? "";

        if (mainImage && src) {
          mainImage.src = src;
          mainImage.dataset.fullSrc = src;
          mainImage.alt = alt;
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
      onPopupImageClick({
        alt: image.alt,
        src: image.dataset.fullSrc ?? image.src,
      });
    };

    container.addEventListener("click", handlePopupClick);

    mapRef.current = map;

    return () => {
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
    };
  }, [
    coordinateInfo.default_zoom_level,
    mapKey,
    mapBoundsKey,
    onMousePositionChange,
    onPopupImageClick,
  ]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    imageOverlayRefs.current.forEach((overlay) => overlay.remove());
    imageOverlayRefs.current = [];

    const inactiveFloors = floors.filter((floor) => floor.id !== activeFloorId);
    const activeFloor = floors.find((floor) => floor.id === activeFloorId);
    const orderedFloors = activeFloor ? [...inactiveFloors, activeFloor] : floors;

    imageOverlayRefs.current = orderedFloors.map((floor) => {
      const isActive = floor.id === activeFloorId;
      const overlay = L.imageOverlay(floor.image, coordinateInfo.image_bounds, {
        className: isActive
          ? "live-map-floor-layer live-map-floor-layer-active"
          : "live-map-floor-layer live-map-floor-layer-inactive",
        opacity: isActive ? 1 : 0.2,
      });

      overlay.addTo(map);

      if (isActive) {
        overlay.bringToFront();
      }

      return overlay;
    });

    return () => {
      imageOverlayRefs.current.forEach((overlay) => overlay.remove());
      imageOverlayRefs.current = [];
    };
  }, [activeFloorId, imageBoundsKey, floors]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    const nextIds = new Set(markers.map((point) => point.id));

    pointMarkerByIdRef.current.forEach((entry, id) => {
      if (!nextIds.has(id)) {
        entry.marker.remove();
        pointMarkerByIdRef.current.delete(id);
      }
    });

    markers.forEach((point) => {
      const existing = pointMarkerByIdRef.current.get(point.id);

      if (existing) {
        existing.point = point;
        existing.marker.options.title = point.label;
        syncPointMarkerPopup(existing.marker, point);
        syncPointMarkerTooltip(existing.marker, point);
        syncPointMarkerPresentation({
          activeFloorId,
          focusedMarkerId,
          hoveredMarkerId: hoveredMarkerIdRef.current,
          mapKey,
          marker: existing.marker,
          point,
        });
        return;
      }

      const marker = L.marker(getPointMarkerPosition(mapKey, point), {
        icon: PointIcon(point, point.floorId !== null && point.floorId !== activeFloorId, point.id === focusedMarkerId),
        keyboard: true,
        title: point.label,
        zIndexOffset: getPointMarkerZIndex(point, activeFloorId, focusedMarkerId, hoveredMarkerIdRef.current),
      });

      syncPointMarkerPopup(marker, point);
      syncPointMarkerTooltip(marker, point);

      marker.on("click", () => {
        const current = pointMarkerByIdRef.current.get(point.id)?.point ?? point;
        onMarkerClickRef.current(current);

        if (current.popupHtml && (!current.floorId || current.floorId === activeFloorIdRef.current)) {
          marker.openPopup();
        }
      });

      marker.on("mouseover", () => {
        hoveredMarkerIdRef.current = point.id;
        const current = pointMarkerByIdRef.current.get(point.id);

        if (current) {
          syncPointMarkerPresentation({
            activeFloorId: activeFloorIdRef.current,
            focusedMarkerId: focusedMarkerIdRef.current,
            hoveredMarkerId: point.id,
            mapKey: mapKeyRef.current,
            marker: current.marker,
            point: current.point,
          });
        }
      });

      marker.on("mouseout", () => {
        if (hoveredMarkerIdRef.current === point.id) {
          hoveredMarkerIdRef.current = null;
        }

        const current = pointMarkerByIdRef.current.get(point.id);

        if (current) {
          syncPointMarkerPresentation({
            activeFloorId: activeFloorIdRef.current,
            focusedMarkerId: focusedMarkerIdRef.current,
            hoveredMarkerId: hoveredMarkerIdRef.current,
            mapKey: mapKeyRef.current,
            marker: current.marker,
            point: current.point,
          });
        }
      });

      marker.addTo(map);
      pointMarkerByIdRef.current.set(point.id, { marker, point });
    });
  }, [activeFloorId, focusedMarkerId, mapKey, markers]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !focusedMarkerId) {
      return;
    }

    const marker = pointMarkerByIdRef.current.get(focusedMarkerId)?.marker;

    if (!marker) {
      return;
    }

    const shouldMoveView =
      lastFocusedMarkerRef.current !== focusedMarkerId ||
      lastFocusedFloorRef.current !== activeFloorId;

    if (!shouldMoveView && marker.isPopupOpen()) {
      return;
    }

    lastFocusedMarkerRef.current = focusedMarkerId;
    lastFocusedFloorRef.current = activeFloorId;
    const frameId = window.requestAnimationFrame(() => {
      if (!map.getContainer().isConnected || !pointMarkerByIdRef.current.has(focusedMarkerId)) {
        return;
      }

      const currentMarker = pointMarkerByIdRef.current.get(focusedMarkerId)?.marker;

      if (!currentMarker) {
        return;
      }

      if (shouldMoveView) {
        map.panTo(currentMarker.getLatLng(), { animate: false });
      }

      try {
        currentMarker.openPopup();
      } catch {
        // Leaflet can throw when a marker is recreated during a fast repeated focus.
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [activeFloorId, focusedMarkerId, markers]);

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

    const position = getPlayerMarkerPosition(mapKey, location);
    const marker = L.marker(position, {
      icon: PlayerIcon(getPlayerMarkerYaw(mapKey, location.yaw)),
      zIndexOffset: 10000,
    }).bindTooltip("Player", {
      direction: "top",
      offset: [0, -10],
      opacity: 1,
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
      if (map.getContainer().isConnected) {
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
  }, [location, mapKey]);

  return <div ref={containerRef} className="eft-leaflet-map live-map-canvas h-full w-full" />;
}
