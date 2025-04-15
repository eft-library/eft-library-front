"use client";

import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { BackpackList } from "./backpackTypes";

export default function BackpackClient({ backpackList }: BackpackList) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";

  return (
    <div className="w-full">
      {backpackList.map((backpack) => (
        <DefineGrid
          cols="5"
          id={backpack.id}
          pageId={pageId}
          key={backpack.id}
          isDetail
          detailLink={`/item/${backpack.url_mapping}`}
        >
          <CenterContents>
            <ImageView
              src={backpack.image}
              alt={backpack.name_en}
              popWidth={backpack.image_width * 72}
              popHeight={backpack.image_height * 72}
              wrapWidth={backpack.image_width * 36}
              wrapHeight={backpack.image_height * 36}
              size={(backpack.image_width * 36).toString()}
            />
          </CenterContents>
          <CenterContents>
            <TextSpan>{backpack.name_kr}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{backpack.info.capacity}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>
              {backpack.info.grids[0].width} X {backpack.info.grids[0].height}
            </TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{backpack.info.weight} kg</TextSpan>
          </CenterContents>
        </DefineGrid>
      ))}
    </div>
  );
}
