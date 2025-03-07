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
                alt={headWear.name}
                popWidth={headWear.width * 128}
                popHeight={headWear.height * 128}
                size={(headWear.width * 64).toString()}
                wrapWidth={headWear.width * 64}
                wrapHeight={headWear.height * 64}
              />
            </CenterContents>
            <CenterContents>
              <TextSpan>{headWear.name}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{headWear.class_value}</TextSpan>
            </CenterContents>
            <CenterContents isCol>
              {headWear.areas_kr.map((area, index) => (
                <TextSpan key={`${index}-area-${headWear.id}`}>{area}</TextSpan>
              ))}
            </CenterContents>
            <CenterContents>
              <TextSpan>{headWear.durability}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{headWear.ricochet_str_kr}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{headWear.weight} kg</TextSpan>
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
                alt={headWear.name}
                popWidth={400}
                popHeight={380}
                size="240px"
                wrapWidth={240}
                wrapHeight={140}
              />
            </CenterContents>
            <CenterContents>
              <TextSpan>{headWear.name}</TextSpan>
            </CenterContents>
          </DefineGrid>
        ))}
    </div>
  );
}
