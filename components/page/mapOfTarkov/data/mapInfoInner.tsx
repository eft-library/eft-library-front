import { CRS } from "leaflet"; // ✔ 이제 안전
import { MapContainer, ImageOverlay, Marker } from "react-leaflet";
import { MouseMoveEvent, FindLocationIcon } from "@/lib/func/leafletFunction";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import MapController from "./mapController";
import type { MapInfoInner } from "./mapOfTarkovType";

export default function MapInfoInner({
  findInfo,
  imageCoord,
  isViewWhere,
  setMousePosition,
}: MapInfoInner) {
  const getMarkerPosition = (
    mapId: string,
    coord: { x: number; y: number }
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

  return (
    <MapContainer
      center={[0, 0]}
      zoom={findInfo.default_zoom_level}
      zoomSnap={0.5}
      minZoom={-2}
      maxZoom={4}
      crs={CRS.Simple}
      className="w-full h-[800px]"
      style={{ backgroundColor: ALL_COLOR.DarkBluishGray }}
      maxBounds={findInfo.map_bounds}
      maxBoundsViscosity={1.0}
    >
      <MapController
        imageCoord={imageCoord}
        isViewWhere={isViewWhere}
        default_zoom_level={findInfo.default_zoom_level}
      />
      <MouseMoveEvent onMove={setMousePosition} mapId={findInfo.id} />
      {isViewWhere && (
        <Marker
          position={getMarkerPosition(findInfo.id, imageCoord)}
          icon={FindLocationIcon}
        />
      )}

      <ImageOverlay url={findInfo.image} bounds={findInfo.image_bounds} />
    </MapContainer>
  );
}
