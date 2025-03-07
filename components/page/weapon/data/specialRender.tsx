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
import type { SpecialRender } from "./weaponTypes";

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
    <div className="flex flex-col gap-4 w-full">
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
                  popWidth={special.width * 128}
                  popHeight={special.height * 128}
                  size={(special.width * 64).toString()}
                  wrapWidth={special.width * 64}
                  wrapHeight={special.height * 64}
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
