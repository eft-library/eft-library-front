"use client";

import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import TextSpan from "../../../custom/gridContents/textSpan";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import { returnQuestText } from "@/lib/func/jsxfunction";
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
          checkKeyCategory(key.map_value, keyCategory) && (
            <DefineGrid cols="5" id={key.id} pageId={pageId} key={key.id}>
              <CenterContents>
                <ImageView
                  src={key.image}
                  alt={key.name}
                  popWidth={key.width * 128}
                  popHeight={key.height * 128}
                  size={(key.width * 64).toString()}
                  wrapWidth={key.width * 64}
                  wrapHeight={key.height * 64}
                />
              </CenterContents>
              <CenterContents>
                <TextSpan>{key.name}</TextSpan>
              </CenterContents>
              <CenterContents isCol>
                {key.use_map_kr.map((area, index) => (
                  <TextSpan key={`${index}-area-${key.id}`}>{area}</TextSpan>
                ))}
              </CenterContents>
              <CenterContents>
                <TextSpan>{key.uses}</TextSpan>
              </CenterContents>
              <div className="flex flex-col justify-center">
                {key.notes.length > 0 ? (
                  <div>
                    <TextSpan>퀘스트</TextSpan>
                    {key.notes.map((quest) => (
                      <div key={quest.url_mapping}>
                        {returnQuestText(quest)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <TextSpan isCenter={false}>-</TextSpan>
                )}
              </div>
            </DefineGrid>
          )
      )}
    </div>
  );
}
