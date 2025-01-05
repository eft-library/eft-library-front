"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { useAppStore } from "@/store/provider";
import Efficiency from "./efficency";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";

interface AmmoClient {
  ammoList: Ammo[];
}

interface Ammo {
  id: string;
  name: string;
  round: string;
  damage: number;
  penetration_power: number;
  armor_damage: number;
  accuracy_modifier: number;
  recoil_modifier: number;
  light_bleed_modifier: number;
  heavy_bleed_modifier: number;
  efficiency: number[];
  image: string;
  category: string;
}

export default function AmmoClient({ ammoList }: AmmoClient) {
  const { ammoCategory } = useAppStore((state) => state);
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, ammoList, "AMMO");

  const addPlusMinus = (text: number | string) => {
    if (typeof text === "number") {
      if (text === 0) return "0";
      return text > 0 ? `+${text}` : `${text}`;
    }
    return "";
  };

  const checkViewAmmo = (newCategory: string) => {
    return ammoCategory === "ALL" || ammoCategory === newCategory;
  };

  const checkColor = (value: number) => {
    if (value === 0) {
      return "text-white";
    } else if (value > 0) {
      return "text-BrightCyan";
    } else {
      return "text-Red";
    }
  };

  const recoilColor = (value: number) => {
    if (value === 0) {
      return "text-white";
    } else if (value < 0) {
      return "text-BrightCyan";
    } else {
      return "text-Red";
    }
  };

  const floatToPercent = (value: number) => {
    if (value !== 0) {
      return Math.round(value * 100);
    } else {
      return value;
    }
  };

  return (
    <div className="w-full">
      {ammoList.map(
        (ammo) =>
          checkViewAmmo(ammo.category) && (
            <div
              className={`${
                ammo.id === pageId && "bg-NeutralGray"
              } w-full grid grid-cols-11 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3`}
              key={ammo.id}
              id={ammo.id}
            >
              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center relative w-[240px] h-[140px]">
                  <Gallery>
                    <Item original={ammo.image} width="200" height="180">
                      {({ ref, open }) => (
                        <Image
                          ref={ref}
                          onClick={open}
                          src={ammo.image}
                          fill
                          sizes="240px"
                          style={{ objectFit: "contain" }}
                          alt={ammo.name}
                          priority
                        />
                      )}
                    </Item>
                  </Gallery>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {ammo.name}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {ammo.damage}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {ammo.penetration_power}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {ammo.armor_damage} %
                </span>
              </div>
              <div className="flex justify-center items-center">
                <span
                  className={`text-center font-bold text-sm ${checkColor(
                    floatToPercent(ammo.accuracy_modifier)
                  )}`}
                >
                  {addPlusMinus(floatToPercent(ammo.accuracy_modifier))} %
                </span>
              </div>
              <div className="flex justify-center items-center">
                <span
                  className={`text-center font-bold text-sm ${recoilColor(
                    floatToPercent(ammo.recoil_modifier)
                  )}`}
                >
                  {addPlusMinus(floatToPercent(ammo.recoil_modifier))}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <span
                  className={`text-center font-bold text-sm ${checkColor(
                    floatToPercent(ammo.light_bleed_modifier)
                  )}`}
                >
                  {addPlusMinus(floatToPercent(ammo.light_bleed_modifier))} %
                </span>
              </div>
              <div className="flex justify-center items-center">
                <span
                  className={`text-center font-bold text-sm ${checkColor(
                    floatToPercent(ammo.heavy_bleed_modifier)
                  )}`}
                >
                  {addPlusMinus(floatToPercent(ammo.heavy_bleed_modifier))} %
                </span>
              </div>
              <div className="flex justify-center items-center col-span-2">
                {ammo.efficiency &&
                  ammo.efficiency.map((efficiency, index) => (
                    <Efficiency
                      key={`${efficiency}-${index}`}
                      value={efficiency}
                    />
                  ))}
              </div>
            </div>
          )
      )}
    </div>
  );
}
