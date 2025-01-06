"use client";

import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";
import DefineGrid from "../../gridContents/defineGrid";
import CenterContents from "../../gridContents/centerContents";
import TextSpan from "../../gridContents/textSpan";

interface Headset {
  id: string;
  name: string;
  image: string;
}

interface HeadsetList {
  headsetList: Headset[];
}

export default function HeadsetClient({ headsetList }: HeadsetList) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, headsetList);

  return (
    <div className="w-full">
      {headsetList.map((headset) => (
        <DefineGrid cols="2" id={headset.id} pageId={pageId} key={headset.id}>
          <CenterContents>
            <ImageView
              src={headset.image}
              alt={headset.name}
              popWidth={340}
              popHeight={260}
              size="240px"
              wrapWidth={240}
              wrapHeight={140}
            />
          </CenterContents>
          <CenterContents>
            <TextSpan>{headset.name}</TextSpan>
          </CenterContents>
        </DefineGrid>
      ))}
    </div>
  );
}
