"use client";

import { useAppStore } from "@/store/provider";
import GetClientColumn from "../../../custom/getColumn/getClientColumn";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import { gunColumn } from "@/lib/consts/gridContsts";

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
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, gunList, "WEAPON");

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
            <DefineGrid cols="9" id={gun.id} pageId={pageId} key={gun.id}>
              <CenterContents colSpan="2">
                <ImageView
                  src={gun.image}
                  alt={gun.name}
                  popWidth={540}
                  popHeight={200}
                  size="240px"
                  wrapWidth={240}
                  wrapHeight={140}
                />
              </CenterContents>
              <CenterContents>
                <TextSpan>{gun.short_name}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{sliceDefaultAmmo(gun.default_ammo)}</TextSpan>
              </CenterContents>
              <CenterContents>
                {gun.modes_kr.map((mode, index) => (
                  <TextSpan key={`mode-${mode}-${index}`}>{mode}</TextSpan>
                ))}
              </CenterContents>
              <CenterContents>
                <TextSpan>{gun.fire_rate}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{gun.ergonomics}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{gun.recoil_horizontal}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{gun.recoil_vertical}</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
