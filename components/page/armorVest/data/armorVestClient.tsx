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
              alt={armorVest.name}
              popWidth={armorVest.width * 96}
              popHeight={armorVest.height * 96}
              wrapWidth={armorVest.width * 48}
              wrapHeight={armorVest.height * 48}
              size={(armorVest.width * 48).toString()}
            />
          </CenterContents>
          <CenterContents>
            <TextSpan>{armorVest.name}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{armorVest.durability}</TextSpan>
          </CenterContents>
          <CenterContents>
            <TextSpan>{armorVest.class_value}</TextSpan>
          </CenterContents>
          <CenterContents isCol>
            {armorVest.areas_kr.map((area, index) => (
              <TextSpan key={`${index}-area-${armorVest.id}`}>{area}</TextSpan>
            ))}
          </CenterContents>
          <CenterContents>
            <TextSpan>{armorVest.weight} kg</TextSpan>
          </CenterContents>
        </DefineGrid>
      ))}
    </div>
  );
}
