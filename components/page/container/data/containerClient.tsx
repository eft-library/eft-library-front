"use client";

import { useScrollMove } from "@/lib/hooks/useScrollMove";
import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { ContainerList } from "./containerTypes";

export default function ContainerClient({ containerList }: ContainerList) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, containerList);

  return (
    <div className="w-full">
      {containerList.map((container) => (
        <DefineGrid
          id={container.id}
          pageId={pageId}
          cols="4"
          key={container.id}
        >
          <CenterContents>
            <ImageView
              src={container.image}
              alt={container.name_en}
              popWidth={container.width * 128}
              popHeight={container.height * 128}
              wrapWidth={container.width * 64}
              wrapHeight={container.height * 64}
              size={(container.width * 64).toString()}
            />
          </CenterContents>
          <CenterContents>
            <TextSpan>{container.name_kr}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{container.capacity}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>
              {container.grids[0].width} X {container.grids[0].height}
            </TextSpan>
          </CenterContents>
        </DefineGrid>
      ))}
    </div>
  );
}
