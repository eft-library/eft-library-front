"use client";

import GetClientColumn from "../../../custom/getColumn/getClientColumn";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import { knifeColumn } from "@/lib/consts/gridContsts";
import type { KnifeRender } from "./weaponTypes";

export default function KnifeRender({ knifeList }: KnifeRender) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, knifeList, "WEAPON");

  return (
    <div className="flex flex-col gap-4 w-full">
      <GetClientColumn columnLength={5} columnList={knifeColumn} />
      {knifeList.map((knife) => (
        <DefineGrid cols="5" id={knife.id} pageId={pageId} key={knife.id}>
          <CenterContents>
            <ImageView
              src={knife.image}
              alt={knife.name_en}
              popWidth={knife.image_width * 128}
              popHeight={knife.image_height * 128}
              size={(knife.image_width * 64).toString()}
              wrapWidth={knife.image_width * 64}
              wrapHeight={knife.image_height * 64}
            />
          </CenterContents>
          <CenterContents>
            <TextSpan>{knife.name_kr}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{knife.info.slash_damage}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{knife.info.stab_damage}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{knife.info.hit_radius} m</TextSpan>
          </CenterContents>
        </DefineGrid>
      ))}
    </div>
  );
}
