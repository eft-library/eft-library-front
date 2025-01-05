"use client";

import { useAppStore } from "@/store/provider";
import GetClientColumn from "../../getColumn/getClientColumn";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";

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
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, specialList, "WEAPON");

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
              className={`${
                special.id === pageId && "bg-NeutralGray"
              } w-full grid grid-cols-2 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3`}
              key={special.id}
              id={special.id}
            >
              <div className="flex justify-center items-center">
                <ImageView
                  src={special.image}
                  alt={special.name}
                  popWidth={340}
                  popHeight={420}
                  size="240px"
                  wrapWidth={240}
                  wrapHeight={140}
                />
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
