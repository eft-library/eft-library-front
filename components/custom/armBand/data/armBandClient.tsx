"use client";

import { useScrollMove } from "@/lib/hooks/useScrollMove";
import { useSearchParams } from "next/navigation";
import ImageView from "../../imageView/imageView";
import DefineGrid from "../../gridContents/defineGrid";
import CenterContents from "../../gridContents/centerContents";
import TextSpan from "../../gridContents/textSpan";

interface ArmBand {
  id: string;
  name: string;
  short_name: string;
  weight: string;
  image: string;
}

interface ArmBandList {
  armBandList: ArmBand[];
}

export default function ArmBandClient({ armBandList }: ArmBandList) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, armBandList);

  return (
    <div className="w-full">
      {armBandList.map((armBand) => (
        <DefineGrid id={armBand.id} cols="2" pageId={pageId} key={armBand.id}>
          <CenterContents>
            <ImageView
              src={armBand.image}
              alt={armBand.name}
              popWidth={220}
              popHeight={220}
              wrapWidth={240}
              wrapHeight={100}
              size="240px"
            />
          </CenterContents>
          <CenterContents>
            <TextSpan>{armBand.name}</TextSpan>
          </CenterContents>
        </DefineGrid>
      ))}
    </div>
  );
}
