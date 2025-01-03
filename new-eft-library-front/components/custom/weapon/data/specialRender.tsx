"use client";

import { useAppStore } from "@/store/provider";
import GetClientColumn from "../../getColumn/getClientColumn";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
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

interface SpecialRender {
  specialList: Gun[];
}

export default function SpecialRender({ specialList }: SpecialRender) {
  const { weaponCategory } = useAppStore((state) => state);

  const specialColumn = [
    { name: "사진", colSpan: 1 },
    { name: "이름", colSpan: 1 },
  ];
  const shouldRenderWeapon = (itemCategory: string) => {
    const isGeneralCategory = itemCategory === "Special weapons";
    const isMatchingCategory =
      itemCategory === "Special weapons" || weaponCategory === "ALL";
    return isGeneralCategory && isMatchingCategory;
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <GetClientColumn columnLength={2} columnList={specialColumn} />
      {specialList.map(
        (special) =>
          shouldRenderWeapon(special.category) && (
            <div
              className="w-full grid grid-cols-2 gap-4 border-solid border-white border-2 mb-4 rounded-lg p-3"
              key={special.id}
            >
              <div className="flex justify-center items-center">
                <Gallery>
                  <Item original={special.image} width="200" height="180">
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={special.image}
                        height={0}
                        width={180}
                        style={{ width: "auto", height: "auto" }}
                        alt={special.name}
                        priority
                      />
                    )}
                  </Item>
                </Gallery>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-base">
                  {special.short_name}
                </span>
              </div>
            </div>
          )
      )}
    </div>
  );
}
