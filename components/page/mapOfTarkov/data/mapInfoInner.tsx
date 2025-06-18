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
  return (
    <MapContainer
      center={[0, 0]}
      zoom={0}
      minZoom={0}
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
          position={[-imageCoord.y, -imageCoord.x]}
          icon={FindLocationIcon}
        />
      )}

      <ImageOverlay url={findInfo.image} bounds={findInfo.image_bounds} />
    </MapContainer>
  );
}
