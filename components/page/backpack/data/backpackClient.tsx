"use client";

import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";

interface BackpackList {
  backpackList: Backpack[];
}
interface Backpack {
  name: string;
  image: string;
  id: string;
  capacity: number;
  grids: Size[];
  weight: number;
}
interface Size {
  width: number;
  height: number;
}

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
              popWidth={300}
              popHeight={400}
              wrapWidth={240}
              wrapHeight={140}
              size="240px"
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
