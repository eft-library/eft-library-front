"use client";

import { useAppStore } from "@/store/provider";
import Efficiency from "./efficency";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";
import DefineGrid from "../../gridContents/defineGrid";
import CenterContents from "../../gridContents/centerContents";
import TextSpan from "../../gridContents/textSpan";

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
      return "white";
    } else if (value > 0) {
      return "BrightCyan";
    } else {
      return "Red";
    }
  };

  const recoilColor = (value: number) => {
    if (value === 0) {
      return "white";
    } else if (value < 0) {
      return "BrightCyan";
    } else {
      return "Red";
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
            <DefineGrid cols="11" pageId={pageId} id={ammo.id} key={ammo.id}>
              <CenterContents>
                <ImageView
                  src={ammo.image}
                  alt={ammo.name}
                  popWidth={200}
                  popHeight={180}
                  wrapHeight={140}
                  wrapWidth={240}
                  size="240px"
                />
              </CenterContents>
              <CenterContents>
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
                  textColor={checkColor(floatToPercent(ammo.accuracy_modifier))}
                >
                  {addPlusMinus(floatToPercent(ammo.accuracy_modifier))} %
                </TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan
                  textColor={recoilColor(floatToPercent(ammo.recoil_modifier))}
                >
                  {addPlusMinus(floatToPercent(ammo.recoil_modifier))}
                </TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan
                  textColor={checkColor(
                    floatToPercent(ammo.light_bleed_modifier)
                  )}
                >
                  {addPlusMinus(floatToPercent(ammo.light_bleed_modifier))} %
                </TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan
                  textColor={checkColor(
                    floatToPercent(ammo.heavy_bleed_modifier)
                  )}
                >
                  {addPlusMinus(floatToPercent(ammo.heavy_bleed_modifier))} %
                </TextSpan>
              </CenterContents>

              <CenterContents colSpan="2">
                {ammo.efficiency &&
                  ammo.efficiency.map((efficiency, index) => (
                    <Efficiency
                      key={`${efficiency}-${index}`}
                      value={efficiency}
                    />
                  ))}
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
