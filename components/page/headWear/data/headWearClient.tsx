"use client";

import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { HeadWearClient } from "./headwearTypes";

export default function HeadWearClient({
  headWearData,
  isClass,
}: HeadWearClient) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, headWearData);

  return (
    <div className="w-full">
      {isClass &&
        headWearData.class_headwear.map((headWear) => (
          <DefineGrid
            id={headWear.id}
            pageId={pageId}
            cols="7"
            key={headWear.id}
          >
            <CenterContents>
              <ImageView
                src={headWear.image}
                alt={headWear.name_en}
                popWidth={headWear.image_width * 128}
                popHeight={headWear.image_height * 128}
                size={(headWear.image_width * 64).toString()}
                wrapWidth={headWear.image_width * 64}
                wrapHeight={headWear.image_height * 64}
              />
            </CenterContents>
            <CenterContents>
              <TextSpan>{headWear.name_kr}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{headWear.info.class_value}</TextSpan>
            </CenterContents>
            <CenterContents isCol>
              {headWear.info.areas_kr.map((area, index) => (
                <TextSpan key={`${index}-area-${headWear.id}`}>{area}</TextSpan>
              ))}
            </CenterContents>
            <CenterContents>
              <TextSpan>{headWear.info.durability}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{headWear.info.ricochet_str_kr}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{headWear.info.weight} kg</TextSpan>
            </CenterContents>
          </DefineGrid>
        ))}
      {!isClass &&
        headWearData.no_class_headwear.map((headWear) => (
          <DefineGrid
            id={headWear.id}
            pageId={pageId}
            cols="2"
            key={headWear.id}
          >
            <CenterContents>
              <ImageView
                src={headWear.image}
                alt={headWear.name_en}
                popWidth={headWear.image_width * 128}
                popHeight={headWear.image_height * 128}
                size={(headWear.image_width * 64).toString()}
                wrapWidth={headWear.image_width * 64}
                wrapHeight={headWear.image_height * 64}
              />
            </CenterContents>
            <CenterContents>
              <TextSpan>{headWear.name_kr}</TextSpan>
            </CenterContents>
          </DefineGrid>
        ))}
    </div>
  );
}
