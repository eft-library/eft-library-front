"use client";

import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";
import TextSpan from "../../gridContents/textSpan";
import DefineGrid from "../../gridContents/defineGrid";
import CenterContents from "../../gridContents/centerContents";
import { returnQuestText } from "@/lib/func/jsxfunction";

interface KeyClient {
  keyList: Key[];
}

interface Key {
  id: string;
  uses: number;
  use_map_en: string[];
  use_map_kr: string[];
  map_value: string[];
  notes: QuestNotes[];
  name: string;
  image: string;
}

interface QuestNotes {
  id: string;
  name: string;
  count: number;
  in_raid: boolean;
  name_kr: string;
  url_mapping: string;
}

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
                  popWidth={220}
                  popHeight={180}
                  size="240px"
                  wrapWidth={240}
                  wrapHeight={100}
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
