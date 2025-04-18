"use client";

import { Separator } from "@/components/ui/separator";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { MapSlider } from "./mapOfTarkovType";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CRS, DivIcon } from "leaflet";
import MapController from "./mapController";
import { MouseMoveEvent } from "@/lib/func/leafletFunction";
import { MapContainer, ImageOverlay, Marker } from "react-leaflet";

const CustomSvgIcon = new DivIcon({
  className: "",
  html: `<svg width="20" height="20"><circle cx="10" cy="10" r="10" fill="lime" /></svg>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10], // 중심 정렬
});

export default function MapInfo({ mapInfo, imageSelect, findInfo }: MapSlider) {
  const [where, setWhere] = useState<string>("");
  const [isViewWhere, setIsViewWhere] = useState<boolean>(false);
  const [imageCoord, setImageCoord] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  const onClickWhere = () => {
    if (where.length > 0) {
      const splitStr = where.split("]_")[1];

      if (splitStr) {
        const matches = splitStr.match(/[-+]?\d*\.\d+/g);

        if (matches && matches.length >= 3) {
          const x = parseFloat(matches[0]);
          const y = parseFloat(matches[2]);
          setImageCoord({ x: x, y: y });
        } else {
          setImageCoord({ x: 0, y: 0 });
        }

        setIsViewWhere(true);
      } else {
        setImageCoord({ x: 0, y: 0 });
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <TextSpan isCenter={false} size="3xl">
          {mapInfo.name_kr}
        </TextSpan>
      </div>

      <Separator className="bg-white" />

      <Gallery>
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
      </Gallery>

      <Separator className="bg-white" />

      <div className="flex justify-between items-center">
        <TextSpan isCenter={false} size="3xl">
          내 위치 찾기
        </TextSpan>

        <div className="flex gap-4 border-2 border-white rounded-lg p-2">
          <span className="font-bold">X: {mousePosition.lng.toFixed(2)}</span>
          <br />
          <span className="font-bold">Z: {mousePosition.lat.toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <Input
            className="text-base font-bold border-white placeholder:text-SilverGray w-[400px]"
            value={where}
            placeholder="좌표를 입력하세요"
            onChange={(e) => setWhere(e.currentTarget.value)}
          />
          <Button
            onClick={() => onClickWhere()}
            className={
              "rounded-lg font-bold text-base text-white bg-Background border-white border-solid border-2 hover:bg-NeutralGray"
            }
          >
            검색
          </Button>
        </div>
      </div>

      <MapContainer
        center={[0, 0]}
        zoom={0}
        minZoom={0}
        maxZoom={4}
        crs={CRS.Simple}
        className="w-full h-[800px]"
        style={{ backgroundColor: ALL_COLOR.DarkBluishGray }}
        maxBounds={findInfo[0].map_bounds}
        maxBoundsViscosity={1.0}
      >
        <MapController imageCoord={imageCoord} isViewWhere={isViewWhere} />
        <MouseMoveEvent onMove={setMousePosition} />
        {isViewWhere && (
          <Marker
            position={[-imageCoord.y, -imageCoord.x]}
            icon={CustomSvgIcon}
          />
        )}

        <ImageOverlay
          url={findInfo[0].image}
          bounds={findInfo[0].image_bounds}
        />
      </MapContainer>
    </div>
  );
}
