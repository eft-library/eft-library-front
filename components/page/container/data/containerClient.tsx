"use client";

import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { ContainerList } from "./containerTypes";

export default function ContainerClient({ containerList }: ContainerList) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";

  return (
    <div className="w-full">
      {containerList.map((container) => (
        <DefineGrid
          id={container.id}
          pageId={pageId}
          cols="4"
          key={container.id}
          isDetail
          detailLink={`/item/${container.url_mapping}`}
        >
          <CenterContents>
            <ImageView
              src={container.image}
              alt={container.name_en}
              popWidth={container.image_width * 128}
              popHeight={container.image_height * 128}
              wrapWidth={container.image_width * 64}
              wrapHeight={container.image_height * 64}
              size={(container.image_width * 64).toString()}
            />
          </CenterContents>
          <CenterContents>
            <TextSpan>{container.name_kr}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{container.info.capacity}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>
              {container.info.grids[0].width} X {container.info.grids[0].height}
            </TextSpan>
          </CenterContents>
        </DefineGrid>
      ))}
    </div>
  );
}
