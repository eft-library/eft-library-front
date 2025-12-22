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

export const PlayerIcon = (rotation: number) =>
  L.divIcon({
    className: "player-icon",
    html: `
      <div style="
        transform: rotate(${rotation}deg);
        width: 28px;
        height: 28px;
        position: relative;
      ">
        <!-- 몸통 (완전 둥글게, 20px) -->
        <div style="
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #A3E635, #4ADE80);
          border-radius: 50%;
          position: absolute;
          top: 4px;
          left: 4px;
          border: 2px solid rgba(0,0,0,0.5);
          box-sizing: border-box;
        "></div>
        <!-- 앞부분 삼각형 화살표 -->
        <div style="
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 12px solid #FF0000; /* 빨강 */
          position: absolute;
          top: -8px; /* 몸통 위쪽 위치 조정 */
          left: 50%; /* 몸통 중앙 맞춤 */
          transform: translateX(-50%);
          filter: drop-shadow(0 0 2px rgba(0,0,0,0.6));
        "></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14], // 중앙 기준 회전
  });
