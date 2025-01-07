"use client";

import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { RigClient } from "./rigTypes";

export default function RigClient({ rig_data, isClass }: RigClient) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, rig_data);

  return (
    <div className="w-full">
      {isClass &&
        rig_data.class_rig.map((rig) => (
          <DefineGrid
            id={rig.id}
            gap="8px"
            pageId={pageId}
            key={rig.id}
            cols="7"
          >
            <CenterContents>
              <ImageView
                src={rig.image}
                alt={rig.name}
                popWidth={380}
                popHeight={400}
                size="240px"
                wrapWidth={240}
                wrapHeight={140}
              />
            </CenterContents>
            <CenterContents>
              <TextSpan>{rig.name}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{rig.durability}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{rig.capacity}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{rig.class_value}</TextSpan>
            </CenterContents>
            <CenterContents isCol>
              {rig.areas_kr.map((area, index) => (
                <TextSpan isCenter={false} key={`${index}-area-${rig.id}`}>
                  {area}
                </TextSpan>
              ))}
            </CenterContents>
            <CenterContents>
              <TextSpan>{rig.weight} kg</TextSpan>
            </CenterContents>
          </DefineGrid>
        ))}
      {!isClass &&
        rig_data.no_class_rig.map((rig) => (
          <DefineGrid
            id={rig.id}
            gap="8px"
            pageId={pageId}
            key={rig.id}
            cols="4"
          >
            <CenterContents>
              <ImageView
                src={rig.image}
                alt={rig.name}
                popWidth={380}
                popHeight={400}
                size="240px"
                wrapWidth={240}
                wrapHeight={140}
              />
            </CenterContents>
            <CenterContents>
              <TextSpan>{rig.name}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{rig.capacity}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{rig.weight} kg</TextSpan>
            </CenterContents>
          </DefineGrid>
        ))}
    </div>
  );
}
