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

interface GunRender {
  gunList: Gun[];
}

export default function GunRender({ gunList }: GunRender) {
  const { weaponCategory } = useAppStore((state) => state);

  const gunColumn = [
    { name: "사진", colSpan: 2 },
    { name: "이름", colSpan: 1 },
    { name: "기본 탄약", colSpan: 1 },
    { name: "발사모드", colSpan: 1 },
    { name: "발사속도", colSpan: 1 },
    { name: "인체공학", colSpan: 1 },
    { name: "수평반동", colSpan: 1 },
    { name: "수직반동", colSpan: 1 },
  ];

  const shouldRenderWeapon = (itemCategory: string) => {
    const isGeneralCategory =
      itemCategory !== "Special weapons" &&
      itemCategory !== "Stationary weapons";
    const isMatchingCategory =
      itemCategory === weaponCategory || weaponCategory === "ALL";
    return isGeneralCategory && isMatchingCategory;
  };

  const sliceDefaultAmmo = (defaultAmmo: string) => {
    if (!defaultAmmo) return "";

    const pattern = "mm";
    const handGunPattern = "ACP";

    const index = defaultAmmo.indexOf(pattern);
    const handGunIndex = defaultAmmo.indexOf(handGunPattern);

    if (index !== -1) {
      return defaultAmmo.substring(0, index + pattern.length);
    } else if (handGunIndex !== -1) {
      return defaultAmmo.substring(0, handGunIndex + handGunPattern.length);
    } else {
      return defaultAmmo;
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <GetClientColumn columnLength={9} columnList={gunColumn} />
      {gunList.map(
        (gun) =>
          shouldRenderWeapon(gun.category) && (
            <div
              className="w-full grid grid-cols-9 gap-4 border-solid border-white border-2 mb-4 rounded-lg p-3"
              key={gun.id}
            >
              <div className="flex justify-center items-center col-span-2">
                <Gallery>
                  <Item original={gun.image} width="200" height="180">
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={gun.image}
                        height={0}
                        width={180}
                        style={{ width: "auto", height: "auto" }}
                        alt={gun.name}
                        priority
                      />
                    )}
                  </Item>
                </Gallery>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-base">
                  {gun.short_name}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-base">
                  {sliceDefaultAmmo(gun.default_ammo)}
                </span>
              </div>
              <div className="flex flex-col justify-center items-center">
                {gun.modes_kr.map((mode, index) => (
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
                  {gun.fire_rate}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-base">
                  {gun.ergonomics}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-base">
                  {gun.recoil_horizontal}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-base">
                  {gun.recoil_vertical}
                </span>
              </div>
            </div>
          )
      )}
    </div>
  );
}
