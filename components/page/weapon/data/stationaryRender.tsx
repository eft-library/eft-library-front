"use client";

import { useAppStore } from "@/store/provider";
import GetClientColumn from "../../../custom/getColumn/getClientColumn";
import { formatImage } from "@/lib/func/formatImage";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import { stationaryColumn } from "@/lib/consts/gridContsts";
import type { StationaryRender } from "./weaponTypes";

export default function StationaryRender({ stationaryList }: StationaryRender) {
  const { weaponCategory } = useAppStore((state) => state);
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, stationaryList, "WEAPON");

  const shouldRenderWeapon = (itemCategory: string) => {
    const isGeneralCategory = itemCategory === "Stationary weapons";
    const isMatchingCategory =
      itemCategory === "Stationary weapons" || weaponCategory === "ALL";
    return isGeneralCategory && isMatchingCategory;
  };

  return (
    <div className="flex flex-col gap-4 w-full">
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
