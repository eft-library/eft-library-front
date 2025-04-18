import { useMapEvent } from "react-leaflet";

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
