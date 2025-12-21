/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMapEvent } from "react-leaflet";
import L, { DivIcon } from "leaflet";

export const dynamic = "force-dynamic";

export const MouseMoveEvent = ({
  onMove,
  mapId,
}: {
  onMove: (latlng: any) => void;
  mapId: string;
}) => {
  // 맵별 좌표 변환 함수 매핑
  const transformMap: Record<
    string,
    (latlng: { lat: number; lng: number }) => { lat: number; lng: number }
  > = {
    THE_LAB: ({ lat, lng }) => ({ lat: lng, lng: -lat }),
    FACTORY: ({ lat, lng }) => ({ lat: -lng, lng: lat }),
  };

  useMapEvent("mousemove", (e) => {
    const { lat, lng } = e.latlng;

    // 변환 함수 없으면 기본 변환 (그 외)
    const transform =
      transformMap[mapId] ?? (({ lat, lng }) => ({ lat: -lat, lng: -lng }));

    const latLng = transform({ lat, lng });

    onMove(latLng); // 마우스 위치 좌표 업데이트
  });

  return null;
};

export const FindLocationIcon = new DivIcon({
  className: "",
  html: `<svg width="20" height="20"><circle cx="10" cy="10" r="10" fill="lime" /></svg>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10], // 중심 정렬
});

export const PlayerIcon = (rotation: number) =>
  L.divIcon({
    className: "player-icon",
    html: `
      <div style="
        transform: rotate(${rotation}deg);
        width: 24px;
        height: 24px;
        position: relative;
      ">
        <!-- 몸통 -->
        <div style="
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #A3E635, #4ADE80); /* 밝은 연두 → 민트 */
          border-radius: 4px;
          position: absolute;
          top: 4px;
          left: 4px;
          border: 2px solid rgba(0,0,0,0.5); /* 테두리 강조 */
        "></div>
        <!-- 앞부분 화살표 -->
        <div style="
          width: 0;
          height: 0;
          border-left: 6px solid transparent;
          border-right: 6px solid transparent;
          border-bottom: 12px solid #FFD60A; /* 밝은 노랑 */
          position: absolute;
          top: -2px;
          left: 6px;
          filter: drop-shadow(0 0 3px rgba(0,0,0,0.6));
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
