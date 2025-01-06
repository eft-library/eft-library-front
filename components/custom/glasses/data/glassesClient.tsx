"use client";

import { useScrollMove } from "@/lib/hooks/useScrollMove";
import { useSearchParams } from "next/navigation";
import ImageView from "../../imageView/imageView";
import DefineGrid from "../../gridContents/defineGrid";
import CenterContents from "../../gridContents/centerContents";
import TextSpan from "../../gridContents/textSpan";
import { floatToPercent, returnQuestText } from "@/lib/func/jsxfunction";

interface GlassesClient {
  glassesData: RigData;
  isClass: boolean;
}

interface RigData {
  class_glasses: DefenseData[];
  no_class_glasses: DefenseData[];
}

interface DefenseData {
  id: string;
  durability: number;
  class_value: number;
  name: string;
  image: string;
  blindness_protection: number;
  notes: QuestNotes[];
}
interface QuestNotes {
  id: string;
  name: string;
  count: number;
  in_raid: boolean;
  name_kr: string;
  url_mapping: string;
}

export default function GlassesClient({ glassesData, isClass }: GlassesClient) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, glassesData);

  return (
    <div className="w-full">
      {isClass &&
        glassesData.class_glasses.map((glasses) => (
          <DefineGrid id={glasses.id} pageId={pageId} cols="5" key={glasses.id}>
            <CenterContents>
              <ImageView
                src={glasses.image}
                alt={glasses.name}
                popWidth={300}
                popHeight={200}
                wrapWidth={240}
                wrapHeight={100}
                size="240px"
              />
            </CenterContents>
            <CenterContents>
              <TextSpan>{glasses.name}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{glasses.class_value}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>{glasses.durability}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>
                {floatToPercent(glasses.blindness_protection)} %
              </TextSpan>
            </CenterContents>
          </DefineGrid>
        ))}
      {!isClass &&
        glassesData.no_class_glasses.map((glasses) => (
          <DefineGrid id={glasses.id} pageId={pageId} cols="4" key={glasses.id}>
            <CenterContents>
              <ImageView
                src={glasses.image}
                alt={glasses.name}
                popWidth={300}
                popHeight={200}
                wrapWidth={240}
                wrapHeight={100}
                size="240px"
              />
            </CenterContents>
            <CenterContents>
              <TextSpan>{glasses.name}</TextSpan>
            </CenterContents>
            <CenterContents>
              <TextSpan>
                {floatToPercent(glasses.blindness_protection)} %
              </TextSpan>
            </CenterContents>
            <div className="flex flex-col justify-center">
              {glasses.notes.length > 0 ? (
                <div>
                  <TextSpan>퀘스트</TextSpan>
                  {glasses.notes.map((quest) => (
                    <div key={quest.url_mapping}>{returnQuestText(quest)}</div>
                  ))}
                </div>
              ) : (
                <TextSpan>-</TextSpan>
              )}
            </div>
          </DefineGrid>
        ))}
    </div>
  );
}
