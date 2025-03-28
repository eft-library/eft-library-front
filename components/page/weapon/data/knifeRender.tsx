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
              alt={knife.name}
              popWidth={knife.width * 128}
              popHeight={knife.height * 128}
              size={(knife.width * 64).toString()}
              wrapWidth={knife.width * 64}
              wrapHeight={knife.height * 64}
            />
          </CenterContents>
          <CenterContents>
            <TextSpan>{knife.name}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{knife.slash_damage}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{knife.stab_damage}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{knife.hit_radius} m</TextSpan>
          </CenterContents>
        </DefineGrid>
      ))}
    </div>
  );
}
