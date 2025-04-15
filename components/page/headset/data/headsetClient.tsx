"use client";

import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { HeadsetList } from "./headsetTypes";

export default function HeadsetClient({ headsetList }: HeadsetList) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";

  return (
    <div className="w-full">
      {headsetList.map((headset) => (
        <DefineGrid
          cols="2"
          id={headset.id}
          pageId={pageId}
          key={headset.id}
          isDetail
          detailLink={`/item/${headset.url_mapping}`}
        >
          <CenterContents>
            <ImageView
              src={headset.image}
              alt={headset.name_en}
              popWidth={headset.image_width * 128}
              popHeight={headset.image_height * 128}
              size={(headset.image_width * 64).toString()}
              wrapWidth={headset.image_width * 64}
              wrapHeight={headset.image_height * 64}
            />
          </CenterContents>
          <CenterContents>
            <TextSpan>{headset.name_kr}</TextSpan>
          </CenterContents>
        </DefineGrid>
      ))}
    </div>
  );
}
