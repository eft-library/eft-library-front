"use client";

import { useAppStore } from "@/store/provider";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";
import TextSpan from "../../gridContents/textSpan";
import DefineGrid from "../../gridContents/defineGrid";
import CenterContents from "../../gridContents/centerContents";

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

  const checkViewKey = (mapValue: Array<string>) => {
    return keyCategory === "ALL" || mapValue.includes(keyCategory);
  };

  const returnQuestText = (note: QuestNotes) => {
    return note.in_raid ? (
      <div className="flex items-center">
        <Link href={`/quest/detail/${note.url_mapping}`} key={note.url_mapping}>
          <TextSpan textColor="GoldenYellow" hoverColor="LightYellow">
            {note.name_kr.substring(0, note.name_kr.indexOf("(")).trim()}
          </TextSpan>
        </Link>
        <TextSpan isCenter={false}>&nbsp;(</TextSpan>
        <TextSpan textColor="SoftPink" isCenter={false}>
          인레이드&nbsp;
        </TextSpan>
        <TextSpan isCenter={false}>{note.count}개 필요)</TextSpan>
      </div>
    ) : (
      <div className="flex items-center ">
        <Link href={`/quest/detail/${note.url_mapping}`} key={note.url_mapping}>
          <TextSpan textColor="GoldenYellow" hoverColor="LightYellow">
            {note.name_kr.substring(0, note.name_kr.indexOf("(")).trim()}
          </TextSpan>
        </Link>
        <TextSpan isCenter={false}>&nbsp;({note.count}개 필요)</TextSpan>
      </div>
    );
  };

  return (
    <div className="w-full">
      {keyList.map(
        (key) =>
          checkViewKey(key.map_value) && (
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
