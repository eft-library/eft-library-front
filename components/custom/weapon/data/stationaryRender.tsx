"use client";

import { useAppStore } from "@/store/provider";
import GetClientColumn from "../../getColumn/getClientColumn";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { formatImage } from "@/lib/func/formatImage";
import Image from "next/image";

interface Weapon {
  id: string;
  category: string;
  name: string;
  short_name: string;
  image: string;
  update_time: string;
}

interface Gun extends Weapon {
  default_ammo: string;
  modes_kr: string[];
  modes_en: string[];
  ergonomics: number;
  recoil_horizontal: number;
  fire_rate: number;
  recoil_vertical: number;
  carliber: string;
}

interface StationaryRender {
  stationaryList: Gun[];
}

export default function StationaryRender({ stationaryList }: StationaryRender) {
  const { weaponCategory } = useAppStore((state) => state);

  const stationaryColumn = [
    { name: "사진", colSpan: 1 },
    { name: "이름", colSpan: 1 },
    { name: "탄약통", colSpan: 1 },
    { name: "발사모드", colSpan: 1 },
    { name: "발사속도", colSpan: 1 },
  ];

  const shouldRenderWeapon = (itemCategory: string) => {
    const isGeneralCategory = itemCategory === "Stationary weapons";
    const isMatchingCategory =
      itemCategory === "Stationary weapons" || weaponCategory === "ALL";
    return isGeneralCategory && isMatchingCategory;
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <GetClientColumn columnLength={5} columnList={stationaryColumn} />
      {stationaryList.map(
        (stationary) =>
          shouldRenderWeapon(stationary.category) && (
            <div
              className="w-full grid grid-cols-5 gap-4 border-solid border-white border-2 mb-4 rounded-lg p-3"
              key={stationary.id}
            >
              <div className="flex justify-center items-center col-span-2">
                <Gallery>
                  <Item
                    original={formatImage(stationary.image)}
                    width="200"
                    height="180"
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={formatImage(stationary.image)}
                        height={0}
                        width={180}
                        style={{ width: "auto", height: "auto" }}
                        alt={stationary.name}
                        priority
                      />
                    )}
                  </Item>
                </Gallery>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-base">
                  {stationary.short_name}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-base">
                  {stationary.carliber}
                </span>
              </div>
              <div className="flex flex-col justify-center items-center">
                {stationary.modes_kr.map((mode, index) => (
                  <span
                    key={`mode-${mode}-${index}`}
                    className="font-bold text-base"
                  >
                    {mode}
                  </span>
                ))}
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-base">
                  {stationary.fire_rate}
                </span>
              </div>
            </div>
          )
      )}
    </div>
  );
}
