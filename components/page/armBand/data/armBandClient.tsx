"use client";

import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { ArmBandList } from "./armBandType";

export default function ArmBandClient({ armBandList }: ArmBandList) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";

  return (
    <div className="w-full">
      {armBandList.map((armBand) => (
        <DefineGrid
          id={armBand.id}
          cols="2"
          pageId={pageId}
          key={armBand.id}
          isDetail
          detailLink={`/item/${armBand.url_mapping}`}
        >
          <CenterContents>
            <ImageView
              src={armBand.image}
              alt={armBand.name_en}
              popWidth={armBand.image_width * 128}
              popHeight={armBand.image_height * 128}
              wrapWidth={armBand.image_width * 64}
              wrapHeight={armBand.image_height * 64}
              size={(armBand.image_width * 64).toString()}
            />
          </CenterContents>
          <CenterContents>
            <TextSpan>{armBand.name_kr}</TextSpan>
          </CenterContents>
        </DefineGrid>
      ))}
    </div>
  );
}
