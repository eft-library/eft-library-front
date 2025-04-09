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

  const shouldRenderWeapon = () => {
    return weaponCategory === "ALL";
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <GetClientColumn columnLength={2} columnList={specialColumn} />
      {specialList.map(
        (special) =>
          shouldRenderWeapon() && (
            <DefineGrid
              cols="2"
              id={special.id}
              pageId={pageId}
              key={special.id}
            >
              <CenterContents>
                <ImageView
                  src={special.image}
                  alt={special.name_en}
                  popWidth={special.image_width * 128}
                  popHeight={special.image_height * 128}
                  size={(special.image_width * 64).toString()}
                  wrapWidth={special.image_width * 64}
                  wrapHeight={special.image_height * 64}
                />
              </CenterContents>
              <CenterContents>
                <TextSpan>{special.name_kr}</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
