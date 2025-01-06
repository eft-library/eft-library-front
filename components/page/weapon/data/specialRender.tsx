"use client";

import { useAppStore } from "@/store/provider";
import GetClientColumn from "../../../custom/getColumn/getClientColumn";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import { specialColumn } from "@/lib/consts/gridContsts";

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
            <DefineGrid
              cols="2"
              id={special.id}
              pageId={pageId}
              key={special.id}
            >
              <CenterContents>
                <ImageView
                  src={special.image}
                  alt={special.name}
                  popWidth={340}
                  popHeight={420}
                  size="240px"
                  wrapWidth={240}
                  wrapHeight={140}
                />
              </CenterContents>
              <CenterContents>
                <TextSpan>{special.short_name}</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
