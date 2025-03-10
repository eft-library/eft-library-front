"use client";

import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import {
  getPlusMinus,
  checkCategory,
  getColor,
  floatToPercent,
} from "@/lib/func/jsxfunction";
import type { AmmoClient } from "./ammoTypes";

export default function AmmoClient({ ammoList }: AmmoClient) {
  const { ammoCategory } = useAppStore((state) => state);
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, ammoList, "AMMO");

  const getEfficiencyColor = (val: number) => {
    switch (val) {
      case 6:
        return "bg-VividGreen";
      case 5:
        return "bg-ForestGreen";
      case 4:
        return "bg-AmberGold";
      case 3:
        return "bg-WalnutBrown";
      case 2:
        return "bg-ChestnutBrown";
      case 1:
        return "bg-DeepBurgundy";
      case 0:
        return "bg-DarkMahogany";
    }
  };

  return (
    <div className="w-full">
      {ammoList.map(
        (ammo) =>
          checkCategory(ammo.category, ammoCategory) && (
            <DefineGrid cols="12" pageId={pageId} id={ammo.id} key={ammo.id}>
              <CenterContents>
                <ImageView
                  src={ammo.image}
                  alt={ammo.name}
                  popWidth={140}
                  popHeight={140}
                  wrapHeight={ammo.height * 64}
                  wrapWidth={ammo.width * 64}
                  size={(ammo.width * 64).toString()}
                />
              </CenterContents>
              <CenterContents colSpan="2">
                <TextSpan>{ammo.name}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{ammo.damage}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{ammo.penetration_power}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{ammo.armor_damage} %</TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan
                  textColor={getColor(
                    floatToPercent(ammo.accuracy_modifier),
                    "check"
                  )}
                >
                  {getPlusMinus(floatToPercent(ammo.accuracy_modifier))} %
                </TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan
                  textColor={getColor(
                    floatToPercent(ammo.recoil_modifier),
                    "recoil"
                  )}
                >
                  {getPlusMinus(floatToPercent(ammo.recoil_modifier))}
                </TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan
                  textColor={getColor(
                    floatToPercent(ammo.light_bleed_modifier),
                    "check"
                  )}
                >
                  {getPlusMinus(floatToPercent(ammo.light_bleed_modifier))} %
                </TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan
                  textColor={getColor(
                    floatToPercent(ammo.heavy_bleed_modifier),
                    "check"
                  )}
                >
                  {getPlusMinus(floatToPercent(ammo.heavy_bleed_modifier))} %
                </TextSpan>
              </CenterContents>

              <CenterContents colSpan="2">
                {ammo.efficiency &&
                  ammo.efficiency.map((efficiency, index) => (
                    <div
                      key={`${efficiency}-${index}`}
                      className={`${getEfficiencyColor(
                        efficiency
                      )} flex items-center justify-center rounded w-10 h-10 border-white border-solid border-[1px] ml-2`}
                    >
                      <TextSpan size="lg" isCenter={false}>
                        {efficiency}
                      </TextSpan>
                    </div>
                  ))}
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
