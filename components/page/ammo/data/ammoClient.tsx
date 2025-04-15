"use client";

import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
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
        (item) =>
          checkCategory(item.info.ammo_category, ammoCategory) && (
            <DefineGrid
              cols="12"
              pageId={pageId}
              id={item.id}
              key={item.id}
              isDetail
              detailLink={`/item/${item.url_mapping}`}
            >
              <CenterContents>
                <ImageView
                  src={item.image}
                  alt={item.name_en}
                  popWidth={140}
                  popHeight={140}
                  wrapHeight={item.image_height * 64}
                  wrapWidth={item.image_width * 64}
                  size={(item.image_width * 64).toString()}
                />
              </CenterContents>
              <CenterContents colSpan="2">
                <TextSpan>{item.name_kr}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{item.info.damage}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{item.info.penetration_power}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>{item.info.armor_damage} %</TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan
                  textColor={getColor(
                    floatToPercent(item.info.accuracy_modifier),
                    "check"
                  )}
                >
                  {getPlusMinus(floatToPercent(item.info.accuracy_modifier))} %
                </TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan
                  textColor={getColor(
                    floatToPercent(item.info.recoil_modifier),
                    "recoil"
                  )}
                >
                  {getPlusMinus(floatToPercent(item.info.recoil_modifier))}
                </TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan
                  textColor={getColor(
                    floatToPercent(item.info.light_bleed_modifier),
                    "check"
                  )}
                >
                  {getPlusMinus(floatToPercent(item.info.light_bleed_modifier))}
                  %
                </TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan
                  textColor={getColor(
                    floatToPercent(item.info.heavy_bleed_modifier),
                    "check"
                  )}
                >
                  {getPlusMinus(floatToPercent(item.info.heavy_bleed_modifier))}
                  %
                </TextSpan>
              </CenterContents>

              <CenterContents colSpan="2">
                {item.info.efficiency &&
                  item.info.efficiency.map((efficiency, index) => (
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
