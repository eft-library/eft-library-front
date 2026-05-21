"use client";

import { useEffect, useRef } from "react";
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
import type { LiveMapFloor } from "@/types/api/live-map";
import type { FindInfo } from "@/types/api/map-of-tarkov";
import type { LiveMapLocation } from "./live-map-utils";

export type LiveMapMarkerKind = "quest" | "story" | "event" | "static";

export interface LiveMapCanvasMarker {
  id: string;
  kind: LiveMapMarkerKind;
  label: string;
  x: number;
  y: number;
  floorId: string | null;
}

type LeafletContainerElement = HTMLDivElement & {
  _leaflet_id?: number;
};

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

function getPointMarkerPosition(
  mapId: string,
  point: Pick<LiveMapCanvasMarker, "x" | "y">,
): [number, number] {
  return getPlayerMarkerPosition(mapId, { x: point.x, y: point.y, yaw: 0 });
}

function PointIcon(kind: LiveMapMarkerKind, isDimmed: boolean) {
  const color = markerColorByKind[kind];

  return L.divIcon({
    className: "live-map-marker-icon",
    html: `
      <div style="
        width: 28px;
        height: 34px;
        position: relative;
        opacity: ${isDimmed ? "0.32" : "1"};
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.5));
      ">
        <svg width="28" height="34" viewBox="0 0 24 28" fill="none" aria-hidden="true">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 16 12 16S24 21 24 12C24 5.373 18.627 0 12 0z" fill="${color}" />
          <circle cx="12" cy="12" r="5" fill="#1A1C1F" />
        </svg>
      </div>
    `,
    iconAnchor: [14, 34],
    iconSize: [28, 34],
  });
}

export function LiveMapCanvas({
  activeFloorId,
  coordinateInfo,
  floors,
  location,
  mapKey,
  markers,
  onMarkerClick,
  onMousePositionChange,
}: {
  activeFloorId: string;
  coordinateInfo: FindInfo;
  floors: LiveMapFloor[];
  location: LiveMapLocation | null;
  mapKey: string;
  markers: LiveMapCanvasMarker[];
  onMarkerClick: (marker: LiveMapCanvasMarker) => void;
  onMousePositionChange: (latlng: LatLng) => void;
}) {
  const containerRef = useRef<LeafletContainerElement | null>(null);
  const imageOverlayRefs = useRef<LeafletImageOverlay[]>([]);
  const mapRef = useRef<LeafletMap | null>(null);
  const pointMarkerRefs = useRef<LeafletMarker[]>([]);
  const markerRef = useRef<LeafletMarker | null>(null);

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
      center: [0, 0],
      crs: CRS.Simple,
      doubleClickZoom: false,
      fadeAnimation: false,
      markerZoomAnimation: false,
      maxBounds: coordinateInfo.map_bounds,
      maxBoundsViscosity: 1,
      maxZoom: 4,
      minZoom: -2,
      zoom: coordinateInfo.default_zoom_level,
      zoomAnimation: false,
      zoomSnap: 0.5,
    });

    map.on("mousemove", (event: LeafletMouseEvent) => {
      onMousePositionChange(transformMousePosition(mapKey, event.latlng) as LatLng);
    });

    mapRef.current = map;

    return () => {
      markerRef.current?.remove();
      markerRef.current = null;
      pointMarkerRefs.current.forEach((marker) => marker.remove());
      pointMarkerRefs.current = [];
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
    };
  }, [
    coordinateInfo.default_zoom_level,
    coordinateInfo.image_bounds,
    coordinateInfo.map_bounds,
    mapKey,
    onMousePositionChange,
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
  }, [activeFloorId, coordinateInfo.image_bounds, floors]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    pointMarkerRefs.current.forEach((marker) => marker.remove());
    pointMarkerRefs.current = [];

    pointMarkerRefs.current = markers.map((point) => {
      const isDimmed = point.floorId !== null && point.floorId !== activeFloorId;
      const marker = L.marker(getPointMarkerPosition(mapKey, point), {
        icon: PointIcon(point.kind, isDimmed),
        keyboard: true,
        title: point.label,
      }).bindTooltip(point.label, {
        direction: "top",
        offset: [0, -28],
        opacity: 1,
      });

      marker.on("click", () => onMarkerClick(point));
      marker.addTo(map);

      return marker;
    });

    return () => {
      pointMarkerRefs.current.forEach((marker) => marker.remove());
      pointMarkerRefs.current = [];
    };
  }, [activeFloorId, mapKey, markers, onMarkerClick]);

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
    }).bindTooltip("Player", {
      direction: "top",
      offset: [0, -10],
      opacity: 1,
    });

    marker.addTo(map);
    markerRef.current = marker;

    const frameId = window.requestAnimationFrame(() => {
      if (map.getContainer().isConnected) {
        map.setView(position, coordinateInfo.default_zoom_level, { animate: false });
      }
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      marker.remove();

      if (markerRef.current === marker) {
        markerRef.current = null;
      }
    };
  }, [coordinateInfo.default_zoom_level, location, mapKey]);

  return <div ref={containerRef} className="eft-leaflet-map live-map-canvas h-full w-full" />;
}
