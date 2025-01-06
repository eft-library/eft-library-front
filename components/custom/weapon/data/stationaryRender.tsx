"use client";

import { useAppStore } from "@/store/provider";
import GetClientColumn from "../../getColumn/getClientColumn";
import { formatImage } from "@/lib/func/formatImage";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";
import DefineGrid from "../../gridContents/defineGrid";
import CenterContents from "../../gridContents/centerContents";
import TextSpan from "../../gridContents/textSpan";

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
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, stationaryList, "WEAPON");

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
            <DefineGrid
              cols="5"
              id={stationary.id}
              pageId={pageId}
              key={stationary.id}
            >
              <CenterContents>
                <ImageView
                  src={formatImage(stationary.image)}
                  alt={stationary.name}
                  popWidth={1200}
                  popHeight={800}
                  size="240px"
                  wrapWidth={240}
                  wrapHeight={140}
                />
              </CenterContents>
              <CenterContents>
                <TextSpan>{stationary.short_name}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{stationary.carliber}</TextSpan>
              </CenterContents>
              <CenterContents>
                {stationary.modes_kr.map((mode, index) => (
                  <TextSpan key={`mode-${mode}-${index}`} isCenter={false}>
                    {mode}
                  </TextSpan>
                ))}
              </CenterContents>
              <CenterContents>
                <TextSpan>{stationary.fire_rate}</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
