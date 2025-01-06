"use client";

import { useScrollMove } from "@/lib/hooks/useScrollMove";
import { useSearchParams } from "next/navigation";
import ImageView from "../../imageView/imageView";
import DefineGrid from "../../gridContents/defineGrid";
import CenterContents from "../../gridContents/centerContents";
import TextSpan from "../../gridContents/textSpan";

interface ContainerList {
  containerList: Container[];
}

interface Container {
  id: string;
  name_en: string;
  name_kr: string;
  image: string;
  capacity: number;
  grids: Size[];
}

interface Size {
  width: number;
  height: number;
}

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
              popWidth={260}
              popHeight={200}
              wrapWidth={240}
              wrapHeight={120}
              size="240px"
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
