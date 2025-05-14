import { useMapEvent } from "react-leaflet";
import { DivIcon } from "leaflet";

export const dynamic = "force-dynamic";

export const MouseMoveEvent = ({
  onMove,
}: {
  onMove: (latlng: any) => void;
}) => {
  useMapEvent("mousemove", (e) => {
    const reversedLatLng = {
      lat: -e.latlng.lat, // Y 좌표 반전
      lng: -e.latlng.lng, // X 좌표 반전
    };
    onMove(reversedLatLng); // 마우스 위치 좌표 업데이트
  });
  return null;
};

export const FindLocationIcon = new DivIcon({
  className: "",
  html: `<svg width="20" height="20"><circle cx="10" cy="10" r="10" fill="lime" /></svg>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10], // 중심 정렬
});
