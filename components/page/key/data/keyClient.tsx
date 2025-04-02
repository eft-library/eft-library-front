"use client";

import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import TextSpan from "../../../custom/gridContents/textSpan";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import type { KeyClient } from "./keyTypes";

export default function KeyClient({ keyList }: KeyClient) {
  const { keyCategory } = useAppStore((state) => state);
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, keyList, "KEY");

  const checkKeyCategory = (mapValue: Array<string>, keyCategory: string) => {
    return keyCategory === "ALL" || mapValue.includes(keyCategory);
  };

  return (
    <div className="w-full">
      {keyList.map(
        (key) =>
          checkKeyCategory(key.info.map_value, keyCategory) && (
            <DefineGrid cols="4" id={key.id} pageId={pageId} key={key.id}>
              <CenterContents>
                <ImageView
                  src={key.image}
                  alt={key.name_kr}
                  popWidth={key.image_width * 128}
                  popHeight={key.image_height * 128}
                  size={(key.image_width * 64).toString()}
                  wrapWidth={key.image_width * 64}
                  wrapHeight={key.image_height * 64}
                />
              </CenterContents>
              <CenterContents>
                <TextSpan>{key.name_kr}</TextSpan>
              </CenterContents>
              <CenterContents isCol>
                {key.info.use_map_kr.map((area, index) => (
                  <TextSpan key={`${index}-area-${key.id}`}>{area}</TextSpan>
                ))}
              </CenterContents>
              <CenterContents>
                <TextSpan>{key.info.uses}</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
