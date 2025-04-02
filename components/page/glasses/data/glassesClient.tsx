"use client";

import { useScrollMove } from "@/lib/hooks/useScrollMove";
import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import { floatToPercent } from "@/lib/func/jsxfunction";
import type { GlassesClient } from "./glassesTypes";

export default function GlassesClient({ glassesData, isClass }: GlassesClient) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, glassesData);

  return (
    <div className="w-full">
      {isClass &&
        glassesData.class_glasses.map((glasses) => (
          <DefineGrid id={glasses.id} pageId={pageId} cols="5" key={glasses.id}>
            <CenterContents>
              <ImageView
                src={glasses.image}
                alt={glasses.name_en}
                popWidth={glasses.image_width * 128}
                popHeight={glasses.image_height * 128}
                wrapWidth={glasses.image_width * 64}
                wrapHeight={glasses.image_height * 64}
                size={(glasses.image_width * 64).toString()}
              />
            </CenterContents>
            <CenterContents>
              <TextSpan>{glasses.name_kr}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{glasses.info.class_value}</TextSpan>
            </CenterContents>
            <CenterContents>
              {/* <TextSpan>{glasses.info.durability}</TextSpan> */}
              <TextSpan>0</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>
                {floatToPercent(glasses.info.blindness_protection)} %
              </TextSpan>
            </CenterContents>
          </DefineGrid>
        ))}
      {!isClass &&
        glassesData.no_class_glasses.map((glasses) => (
          <DefineGrid id={glasses.id} pageId={pageId} cols="3" key={glasses.id}>
            <CenterContents>
              <ImageView
                src={glasses.image}
                alt={glasses.name_en}
                popWidth={glasses.image_width * 128}
                popHeight={glasses.image_height * 128}
                wrapWidth={glasses.image_width * 64}
                wrapHeight={glasses.image_height * 64}
                size={(glasses.image_width * 64).toString()}
              />
            </CenterContents>
            <CenterContents>
              <TextSpan>{glasses.name_kr}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>
                {floatToPercent(glasses.info.blindness_protection)} %
              </TextSpan>
            </CenterContents>
          </DefineGrid>
        ))}
    </div>
  );
}
