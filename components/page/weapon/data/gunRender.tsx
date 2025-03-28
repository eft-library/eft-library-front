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
import type { GunRender } from "./weaponTypes";

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
    <div className="flex flex-col gap-4 w-full">
      <GetClientColumn columnLength={9} columnList={gunColumn} />
      {gunList.map(
        (gun) =>
          shouldRenderWeapon(gun.category) && (
            <DefineGrid cols="9" id={gun.id} pageId={pageId} key={gun.id}>
              <CenterContents colSpan="2">
                <ImageView
                  src={gun.image}
                  alt={gun.name}
                  popWidth={gun.width * 128}
                  popHeight={gun.height * 128}
                  size={(gun.width * 64).toString()}
                  wrapWidth={gun.width * 64}
                  wrapHeight={gun.height * 64}
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
