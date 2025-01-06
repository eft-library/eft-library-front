"use client";

import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";
import DefineGrid from "../../gridContents/defineGrid";
import CenterContents from "../../gridContents/centerContents";
import TextSpan from "../../gridContents/textSpan";

interface HeadWearClient {
  headWearData: HeadWearData;
  isClass: boolean;
}

interface HeadWearData {
  class_headwear: DefenseData[];
  no_class_headwear: DefenseData[];
}

interface DefenseData {
  id: string;
  ricochet_str_kr: string;
  durability: number;
  class_value: number;
  areas_kr: string[];
  name: string;
  image: string;
  weight: string;
  blindness_protection: number;
}

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
