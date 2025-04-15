"use client";

import { useSearchParams } from "next/navigation";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { RigClient } from "./rigTypes";

export default function RigClient({ rig_data, isClass }: RigClient) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";

  return (
    <div className="w-full">
      {isClass &&
        rig_data.class_rig.map((rig) => (
          <DefineGrid
            id={rig.id}
            gap="8px"
            pageId={pageId}
            key={rig.id}
            isDetail
            detailLink={`/item/${rig.url_mapping}`}
            cols="7"
          >
            <CenterContents>
              <ImageView
                src={rig.image}
                alt={rig.name_en}
                popWidth={rig.image_width * 96}
                popHeight={rig.image_height * 96}
                size={(rig.image_width * 48).toString()}
                wrapWidth={rig.image_width * 48}
                wrapHeight={rig.image_height * 48}
              />
            </CenterContents>
            <CenterContents>
              <TextSpan>{rig.name_kr}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{rig.info.durability}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{rig.info.capacity}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{rig.info.class_value}</TextSpan>
            </CenterContents>
            <CenterContents isCol>
              {rig.info.areas_kr.map((area, index) => (
                <TextSpan isCenter={false} key={`${index}-area-${rig.id}`}>
                  {area}
                </TextSpan>
              ))}
            </CenterContents>
            <CenterContents>
              <TextSpan>{rig.info.weight} kg</TextSpan>
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
            isDetail
            detailLink={`/item/${rig.url_mapping}`}
            cols="3"
          >
            <CenterContents>
              <ImageView
                src={rig.image}
                alt={rig.name_en}
                popWidth={rig.image_width * 96}
                popHeight={rig.image_height * 96}
                size={(rig.image_width * 48).toString()}
                wrapWidth={rig.image_width * 48}
                wrapHeight={rig.image_height * 48}
              />
            </CenterContents>
            <CenterContents>
              <TextSpan>{rig.name_kr}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{rig.info.weight} kg</TextSpan>
            </CenterContents>
          </DefineGrid>
        ))}
    </div>
  );
}
