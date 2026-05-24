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
  popupHtml?: string;
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

function getRelaxedMapBounds(bounds: FindInfo["map_bounds"]) {
  return L.latLngBounds(bounds).pad(1.4);
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
  focusedMarkerId,
  location,
  mapKey,
  markers,
  onMarkerClick,
  onPopupImageClick,
  onMousePositionChange,
}: {
  activeFloorId: string;
  coordinateInfo: FindInfo;
  focusedMarkerId?: string | null;
  floors: LiveMapFloor[];
  location: LiveMapLocation | null;
  mapKey: string;
  markers: LiveMapCanvasMarker[];
  onMarkerClick: (marker: LiveMapCanvasMarker) => void;
  onPopupImageClick: (image: LiveMapPopupImage) => void;
  onMousePositionChange: (latlng: LatLng) => void;
}) {
  const containerRef = useRef<LeafletContainerElement | null>(null);
  const imageOverlayRefs = useRef<LeafletImageOverlay[]>([]);
  const mapRef = useRef<LeafletMap | null>(null);
  const pointMarkerRefs = useRef<LeafletMarker[]>([]);
  const pointMarkerByIdRef = useRef<Map<string, LeafletMarker>>(new Map());
  const lastFocusedMarkerRef = useRef<string | null>(null);
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
      pointMarkerRefs.current.forEach((marker) => marker.remove());
      pointMarkerRefs.current = [];
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
    coordinateInfo.image_bounds,
    coordinateInfo.map_bounds,
    mapKey,
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
  }, [activeFloorId, coordinateInfo.image_bounds, floors]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map) {
      return;
    }

    pointMarkerRefs.current.forEach((marker) => marker.remove());
    pointMarkerRefs.current = [];
    pointMarkerByIdRef.current.clear();

    pointMarkerRefs.current = markers.map((point) => {
      const isDimmed = point.floorId !== null && point.floorId !== activeFloorId;
      const marker = L.marker(getPointMarkerPosition(mapKey, point), {
        icon: PointIcon(point.kind, isDimmed),
        keyboard: true,
        title: point.label,
      });

      if (point.popupHtml) {
        marker.bindPopup(point.popupHtml, {
          className: "live-map-point-popup",
          closeButton: true,
          maxWidth: 460,
          minWidth: 460,
          offset: [0, -30],
        });
      }

      marker.on("click", () => onMarkerClick(point));
      marker.addTo(map);
      pointMarkerByIdRef.current.set(point.id, marker);

      return marker;
    });

    return () => {
      pointMarkerRefs.current.forEach((marker) => marker.remove());
      pointMarkerRefs.current = [];
      pointMarkerByIdRef.current.clear();
    };
  }, [activeFloorId, mapKey, markers, onMarkerClick]);

  useEffect(() => {
    const map = mapRef.current;

    if (!map || !focusedMarkerId) {
      return;
    }

    const marker = pointMarkerByIdRef.current.get(focusedMarkerId);

    if (!marker) {
      return;
    }

    if (lastFocusedMarkerRef.current === focusedMarkerId && marker.isPopupOpen()) {
      return;
    }

    lastFocusedMarkerRef.current = focusedMarkerId;
    const frameId = window.requestAnimationFrame(() => {
      if (!map.getContainer().isConnected || !pointMarkerByIdRef.current.has(focusedMarkerId)) {
        return;
      }

      const currentMarker = pointMarkerByIdRef.current.get(focusedMarkerId);

      if (!currentMarker) {
        return;
      }

      map.panTo(currentMarker.getLatLng(), { animate: false });

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
