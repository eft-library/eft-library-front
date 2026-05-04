"use client";

import { CRS, type LatLng } from "leaflet";
import { ImageOverlay, MapContainer, Marker, Tooltip } from "react-leaflet";

import type { FindInfo } from "@/types/api/map-of-tarkov";
import {
  MouseMoveEvent,
  PlayerIcon,
  getPlayerMarkerPosition,
  getPlayerMarkerYaw,
} from "@/lib/map/leaflet-utils";
import { FindLocationController } from "./find-location-controller";

export function FindLocationMap({
  findInfo,
  imageCoord,
  isViewWhere,
  onMousePositionChange,
}: {
  findInfo: FindInfo;
  imageCoord: { x: number; y: number; yaw: number };
  isViewWhere: boolean;
  onMousePositionChange: (latlng: LatLng) => void;
}) {
  return (
    <MapContainer
      key={findInfo.id}
      center={[0, 0]}
      zoom={findInfo.default_zoom_level}
      zoomSnap={0.5}
      minZoom={-2}
      maxZoom={4}
      crs={CRS.Simple}
      className="h-[520px] w-full rounded-lg md:h-[720px]"
      maxBounds={findInfo.map_bounds}
      maxBoundsViscosity={1}
      doubleClickZoom={false}
    >
      <FindLocationController
        defaultZoomLevel={findInfo.default_zoom_level}
        imageCoord={imageCoord}
        isViewWhere={isViewWhere}
      />
      <MouseMoveEvent mapId={findInfo.id} onMove={onMousePositionChange} />
      {isViewWhere ? (
        <Marker
          position={getPlayerMarkerPosition(findInfo.id, imageCoord)}
          icon={PlayerIcon(getPlayerMarkerYaw(findInfo.id, imageCoord.yaw))}
        >
          <Tooltip direction="top" offset={[0, -10]} opacity={1}>
            Player
          </Tooltip>
        </Marker>
      ) : null}
      <ImageOverlay url={findInfo.image} bounds={findInfo.image_bounds} />
    </MapContainer>
  );
}
