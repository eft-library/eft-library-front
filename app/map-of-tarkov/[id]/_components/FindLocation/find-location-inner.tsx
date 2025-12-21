import { CRS } from "leaflet"; // ✔ 이제 안전
import { MapContainer, ImageOverlay, Marker } from "react-leaflet";
import {
  MouseMoveEvent,
  PlayerIcon,
  FindLocationIcon,
} from "@/lib/func/leafletFunction";
import { FindLocationInnerTypes } from "../map-of-tarkov.types";
import FindLocationController from "./find-location-controller";

export default function FindLocationInner({
  findInfo,
  imageCoord,
  isViewWhere,
  setMousePosition,
}: FindLocationInnerTypes) {
  const getMarkerPosition = (
    mapId: string,
    coord: { x: number; y: number; yaw: number }
  ): [number, number] => {
    switch (mapId) {
      case "FACTORY":
        return [coord.x, -coord.y];
      case "THE_LAB":
        return [-coord.x, coord.y];
      default:
        return [-coord.y, -coord.x];
    }
  };

  const getMarkerYaw = (mapId: string, yawDegrees: number) => {
    switch (mapId) {
      case "FACTORY":
        return -yawDegrees; // y 뒤집힘 고려
      case "THE_LAB":
        return yawDegrees; // x 뒤집힘 고려
      default:
        return (yawDegrees + 180) % 360; // x,y 뒤집힘 고려
    }
  };

  return (
    <MapContainer
      center={[0, 0]}
      zoom={findInfo.default_zoom_level}
      zoomSnap={0.5}
      minZoom={-2}
      maxZoom={4}
      crs={CRS.Simple}
      className="w-full h-[800px]"
      maxBounds={findInfo.map_bounds}
      maxBoundsViscosity={1.0}
    >
      <FindLocationController
        imageCoord={imageCoord}
        isViewWhere={isViewWhere}
        default_zoom_level={findInfo.default_zoom_level}
      />
      <MouseMoveEvent onMove={setMousePosition} mapId={findInfo.id} />
      {isViewWhere && (
        <Marker
          position={getMarkerPosition(findInfo.id, imageCoord)}
          icon={PlayerIcon(getMarkerYaw(findInfo.id, imageCoord.yaw))}
        />
      )}

      <ImageOverlay url={findInfo.image} bounds={findInfo.image_bounds} />
    </MapContainer>
  );
}
