"use client";

import { Separator } from "@/components/ui/separator";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { formatImage } from "@/lib/func/formatImage";
import Image from "next/image";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { MapSlider, CoordPx } from "./mapOfTarkovType";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function MapSlider({ mapInfo, imageSelect }: MapSlider) {
  const [where, setWhere] = useState("");
  const [isViewWhere, setIsViewWhere] = useState(false);
  const [imageCoord, setImageCoord] = useState({ x: 0, y: 0 });

  // TODO: 나중에 맵 별로 다 다르게 해야 함
  const customCoordPxMap: CoordPx[] = [
    [656.66, -167.3, 220, 140],
    [676.0, 125.98, 500, 40],
    [-37.96, 129.9, 400, 970],
    [-326.19, -67.8, 220, 1220],
    [-328.35, -236.4, 110, 1090],
    [360.48, -190.65, 180, 470],
  ];

  const getPixelCoordinates = (x: number, y: number, coordPxMap: CoordPx[]) => {
    for (let i = 0; i < coordPxMap.length - 1; i++) {
      const [x1, y1, px1, py1] = coordPxMap[i];
      const [x2, y2, px2, py2] = coordPxMap[i + 1];

      if (x1 <= x && x <= x2 && y1 <= y && y <= y2) {
        const pxRatio = (px2 - px1) / (x2 - x1);
        const pyRatio = (py2 - py1) / (y2 - y1);

        const newPx = px1 + (x - x1) * pxRatio;
        const newPy = py1 + (y - y1) * pyRatio;

        return [newPx, newPy];
      }
    }

    return [0, 0];
  };

  const onClickWhere = () => {
    if (where.length > 0) {
      const splitStr = where.split("]_")[1];

      if (splitStr) {
        const matches = splitStr.match(/[-+]?\d*\.\d+/g);

        if (matches && matches.length >= 3) {
          const x = parseFloat(matches[0]);
          const y = parseFloat(matches[2]);
          const [newPx, newPy] = getPixelCoordinates(x, y, customCoordPxMap);
          setImageCoord({ x: newPx, y: newPy });
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
        <div className="flex gap-2">
          <Button
            onClick={() => onClickWhere()}
            className={
              "rounded-lg font-bold text-base text-white bg-Background border-white border-solid border-2 hover:bg-NeutralGray"
            }
          >
            현재 내 위치
          </Button>
          <Input
            className="text-base font-bold border-white placeholder:text-SilverGray w-[400px]"
            value={where}
            placeholder="현재 내 위치"
            onChange={(e) => setWhere(e.currentTarget.value)}
          />
        </div>
      </div>
      <Separator className="bg-white" />
      <Gallery>
        {mapInfo.sub.map(
          (map) =>
            map.id === imageSelect && (
              <Item
                key={map.id}
                original={formatImage(map.mot_image)}
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
                      src={formatImage(map.mot_image)}
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
                    {isViewWhere && (
                      <div
                        className={`absolute top-[${imageCoord.x}px] left-[${imageCoord.y}px] w-6 h-6 bg-CloudGray rounded-3xl`}
                      />
                    )}
                  </div>
                )}
              </Item>
            )
        )}
      </Gallery>
    </div>
  );
}
