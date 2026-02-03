"use client";

import { CRS } from "leaflet"; // ✔ 이제 안전
import { MapContainer, ImageOverlay, Marker, Tooltip } from "react-leaflet";
import {
  MouseMoveEvent,
  PlayerIcon,
  QuestIcon,
} from "@/lib/func/leafletFunction";
import { FindLocationInnerTypes } from "../map-of-tarkov.types";
import FindLocationController from "./find-location-controller";
import { useLocale } from "next-intl";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";

export default function FindLocationInner({
  findInfo,
  imageCoord,
  isViewWhere,
  setMousePosition,
}: FindLocationInnerTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const getMarkerPosition = (
    mapId: string,
    coord: { x: number; y: number; yaw: number },
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

  const getMarkerYaw = (mapId: string, yaw: number) => {
    switch (mapId) {
      case "FACTORY":
        return (yaw + 270) % 360;
      case "THE_LAB":
        return (yaw + 90) % 360;
      default:
        return (yaw + 180) % 360;
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
      className="w-full h-200"
      maxBounds={findInfo.map_bounds}
      maxBoundsViscosity={1.0}
      doubleClickZoom={false}
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
          eventHandlers={{
            click: () => {
              console.log("마커 클릭됨", findInfo.id);
            },
          }}
        >
          <Tooltip direction="top" offset={[0, -10]} opacity={1}>
            플레이어 위치
          </Tooltip>
        </Marker>
      )}
      {/* {findInfo.quests.map((quest) => (
        <Marker
          position={[quest.x, quest.y]}
          icon={QuestIcon()}
          key={quest.id}
          eventHandlers={{
            click: () => {
              window.open(
                `/quest/detail/${quest.normalizedName}`,
                "_blank",
                "noopener,noreferrer",
              );
            },
          }}
        >
          <Tooltip
            direction="top"
            offset={[0, -30]}
            opacity={1}
            className="quest-tooltip"
          >
            {quest[getOtherLocalizedKey(localeKey)]}
          </Tooltip>
        </Marker>
      ))} */}

      <ImageOverlay url={findInfo.image} bounds={findInfo.image_bounds} />
    </MapContainer>
  );
}
