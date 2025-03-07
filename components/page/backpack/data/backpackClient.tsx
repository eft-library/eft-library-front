"use client";

import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { BackpackList } from "./backpackTypes";

export default function BackpackClient({ backpackList }: BackpackList) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, backpackList);

  return (
    <div className="w-full">
      {backpackList.map((backpack) => (
        <DefineGrid cols="5" id={backpack.id} pageId={pageId} key={backpack.id}>
          <CenterContents>
            <ImageView
              src={backpack.image}
              alt={backpack.name}
              popWidth={backpack.width * 72}
              popHeight={backpack.height * 72}
              wrapWidth={backpack.width * 36}
              wrapHeight={backpack.height * 36}
              size={(backpack.width * 36).toString()}
            />
          </CenterContents>
          <CenterContents>
            <TextSpan>{backpack.name}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{backpack.capacity}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>
              {backpack.grids[0].width} X {backpack.grids[0].height}
            </TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{backpack.weight} kg</TextSpan>
          </CenterContents>
        </DefineGrid>
      ))}
    </div>
  );
}
