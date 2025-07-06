// import { useMapEvent } from "react-leaflet";
// import { DivIcon } from "leaflet";

// export const dynamic = "force-dynamic";

// export const MouseMoveEvent = ({
//   onMove,
//   mapId,
// }: {
//   onMove: (latlng: any) => void;
//   mapId: string;
// }) => {
//   // 맵별 좌표 변환 함수 매핑
//   const transformMap: Record<
//     string,
//     (latlng: { lat: number; lng: number }) => { lat: number; lng: number }
//   > = {
//     THE_LAB: ({ lat, lng }) => ({ lat: lng, lng: -lat }),
//     FACTORY: ({ lat, lng }) => ({ lat: -lng, lng: lat }),
//   };

//   useMapEvent("mousemove", (e) => {
//     const { lat, lng } = e.latlng;

//     // 변환 함수 없으면 기본 변환 (그 외)
//     const transform =
//       transformMap[mapId] ?? (({ lat, lng }) => ({ lat: -lat, lng: -lng }));

//     const latLng = transform({ lat, lng });

//     onMove(latLng); // 마우스 위치 좌표 업데이트
//   });

//   return null;
// };

// export const FindLocationIcon = new DivIcon({
//   className: "",
//   html: `<svg width="20" height="20"><circle cx="10" cy="10" r="10" fill="lime" /></svg>`,
//   iconSize: [20, 20],
//   iconAnchor: [10, 10], // 중심 정렬
// });
