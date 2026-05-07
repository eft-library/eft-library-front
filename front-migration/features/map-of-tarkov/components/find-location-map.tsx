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

import type { FindInfo } from "@/types/api/map-of-tarkov";
import {
  PlayerIcon,
  getPlayerMarkerPosition,
  getPlayerMarkerYaw,
  transformMousePosition,
} from "@/lib/map/leaflet-utils";

type LeafletContainerElement = HTMLDivElement & {
  _leaflet_id?: number;
};

function clearLeafletContainer(container: LeafletContainerElement) {
  delete container._leaflet_id;
  container.replaceChildren();
}

export function FindLocationMap({
  findInfo,
  imageCoord,
  isViewWhere,
  mapKey,
  onMousePositionChange,
}: {
  findInfo: FindInfo;
  imageCoord: { x: number; y: number; yaw: number };
  isViewWhere: boolean;
  mapKey: string;
  onMousePositionChange: (latlng: LatLng) => void;
}) {
  const containerRef = useRef<LeafletContainerElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const imageOverlayRef = useRef<LeafletImageOverlay | null>(null);
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
      maxBounds: findInfo.map_bounds,
      maxBoundsViscosity: 1,
      maxZoom: 4,
      minZoom: -2,
      zoom: findInfo.default_zoom_level,
      zoomAnimation: false,
      zoomSnap: 0.5,
    });

    const imageOverlay = L.imageOverlay(findInfo.image, findInfo.image_bounds);
    imageOverlay.addTo(map);
    map.on("mousemove", (event: LeafletMouseEvent) => {
      onMousePositionChange(
        transformMousePosition(mapKey, event.latlng) as LatLng,
      );
    });

    mapRef.current = map;
    imageOverlayRef.current = imageOverlay;

    return () => {
      markerRef.current?.remove();
      markerRef.current = null;
      imageOverlayRef.current?.remove();
      imageOverlayRef.current = null;
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
    findInfo.default_zoom_level,
    findInfo.id,
    findInfo.image,
    findInfo.image_bounds,
    findInfo.map_bounds,
    mapKey,
    onMousePositionChange,
  ]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }

    markerRef.current?.remove();
    markerRef.current = null;

    if (!isViewWhere) {
      return;
    }

    const position = getPlayerMarkerPosition(mapKey, imageCoord);
    const marker = L.marker(position, {
      icon: PlayerIcon(getPlayerMarkerYaw(mapKey, imageCoord.yaw)),
    }).bindTooltip("Player", {
      direction: "top",
      offset: [0, -10],
      opacity: 1,
    });

    marker.addTo(map);
    markerRef.current = marker;

    const frameId = window.requestAnimationFrame(() => {
      const container = map.getContainer();
      if (!container.isConnected) {
        return;
      }

      map.setView(position, findInfo.default_zoom_level, { animate: false });
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      marker.remove();
      if (markerRef.current === marker) {
        markerRef.current = null;
      }
    };
  }, [findInfo.default_zoom_level, imageCoord, isViewWhere, mapKey]);

  return (
    <div
      ref={containerRef}
      className="eft-leaflet-map relative z-0 h-[520px] w-full rounded-lg md:h-[720px]"
    />
  );
}
