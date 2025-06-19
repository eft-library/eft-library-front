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

  const getDefaultZoom = (mapId: string): number => {
    switch (mapId) {
      case "WOODS":
        return -1;
      case "FACTORY":
        return 2;
      case "INTERCHANGE":
        return -1;
      case "LIGHT_HOUSE":
        return -1;
      case "SHORELINE":
        return -1;
      case "THE_LAB":
        return 2;
      default:
        return 0;
    }
  };

  return (
    <MapContainer
      center={[0, 0]}
      zoom={getDefaultZoom(findInfo.id)}
      minZoom={-2}
      maxZoom={4}
      crs={CRS.Simple}
      className="w-full h-[800px]"
      style={{ backgroundColor: ALL_COLOR.DarkBluishGray }}
      maxBounds={findInfo.map_bounds}
      maxBoundsViscosity={1.0}
    >
      <MapController imageCoord={imageCoord} isViewWhere={isViewWhere} />
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
