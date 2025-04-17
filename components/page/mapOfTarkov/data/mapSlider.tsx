"use client";

import { Separator } from "@/components/ui/separator";
// import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
// import Image from "next/image";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { MapSlider } from "./mapOfTarkovType";
import { useState } from "react";
import { MapContainer, ImageOverlay, useMapEvent } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MouseMoveEvent = ({ onMove }: { onMove: (latlng: any) => void }) => {
  useMapEvent("mousemove", (e) => {
    // X좌표를 반전시키고, Y좌표는 그대로 두거나 반전시킬 수도 있음
    const reversedLatLng = {
      lat: -e.latlng.lat, // Y 좌표는 그대로 두거나 반전 (반전 원할 시 -e.latlng.lat)
      lng: -e.latlng.lng, // X 좌표는 반전
    };
    onMove(reversedLatLng); // 마우스 위치 좌표 업데이트
  });
  return null;
};

// imageSelect
export default function MapSlider({ mapInfo }: MapSlider) {
  const [mousePosition, setMousePosition] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });
  const imageSrc =
    "https://image.eftlibrary.com/eftlibrary/tkl_map/customs/main/customs.svg";

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <TextSpan isCenter={false} size="3xl">
          {mapInfo.name_kr}
        </TextSpan>
      </div>
      <Separator className="bg-white" />
      <div>
        <p>x: {mousePosition.lng.toFixed(2)}</p>
        <p>y: {mousePosition.lat.toFixed(2)}</p>
      </div>
      <MapContainer
        center={[0, 0]}
        zoom={0}
        minZoom={-1}
        maxZoom={4}
        crs={L.CRS.Simple}
        style={{ width: "100%", height: "800px" }}
      >
        <MouseMoveEvent onMove={setMousePosition} />
        <ImageOverlay
          url={imageSrc}
          bounds={[
            [0 - 272, 0 - 792],
            [589 - 272, 1350 - 792],
          ]}
        />
      </MapContainer>
      {/* <Gallery>
        {mapInfo.sub.map(
          (map) =>
            map.id === imageSelect && (
              <Item
                key={map.id}
                original={map.mot_image}
                width="1600"
                height="900"
              >
                {({ ref, open }) => (
                  <div
                    ref={ref}
                    onClick={open}
                    className="flex justify-center items-center cursor-pointer min-h-[600px] relative"
                  >
                    <Image
                      src={map.mot_image}
                      alt={map.name_en}
                      width={1100}
                      height={600}
                      style={{ width: "auto", height: "auto" }}
                      priority
                      placeholder="blur"
                      blurDataURL={
                        "data:image/jpeg;base64," +
                        "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                      }
                    />
                  </div>
                )}
              </Item>
            )
        )}
      </Gallery> */}
    </div>
  );
}
