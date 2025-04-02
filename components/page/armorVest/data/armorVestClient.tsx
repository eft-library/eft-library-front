"use client";

import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { ArmorVestList } from "./armorVestTypes";

export default function ArmorVestClient({ armorVestList }: ArmorVestList) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, armorVestList);

  return (
    <div className="w-full">
      {armorVestList.map((armorVest) => (
        <DefineGrid
          cols="6"
          id={armorVest.id}
          pageId={pageId}
          key={armorVest.id}
        >
          <CenterContents>
            <ImageView
              src={armorVest.image}
              alt={armorVest.name_en}
              popWidth={armorVest.image_width * 96}
              popHeight={armorVest.image_height * 96}
              wrapWidth={armorVest.image_width * 48}
              wrapHeight={armorVest.image_height * 48}
              size={(armorVest.image_width * 48).toString()}
            />
          </CenterContents>
          <CenterContents>
            <TextSpan>{armorVest.name_kr}</TextSpan>
          </CenterContents>
          <CenterContents>
            {/* <TextSpan>{armorVest.durability}</TextSpan> */}
            <TextSpan>0</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{armorVest.info.class_value}</TextSpan>
          </CenterContents>
          <CenterContents isCol>
            {armorVest.info.areas_kr.map((area, index) => (
              <TextSpan key={`${index}-area-${armorVest.id}`}>{area}</TextSpan>
            ))}
          </CenterContents>
          <CenterContents>
            <TextSpan>{armorVest.info.weight} kg</TextSpan>
          </CenterContents>
        </DefineGrid>
      ))}
    </div>
  );
}
