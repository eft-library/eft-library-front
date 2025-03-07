"use client";

import { useScrollMove } from "@/lib/hooks/useScrollMove";
import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { ArmBandList } from "./armBandType";

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
              popWidth={armBand.width * 128}
              popHeight={armBand.height * 128}
              wrapWidth={armBand.width * 64}
              wrapHeight={armBand.height * 64}
              size={(armBand.width * 64).toString()}
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
