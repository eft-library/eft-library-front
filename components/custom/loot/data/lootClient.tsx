"use client";

import Link from "next/link";
import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";
import TextSpan from "../../gridContents/textSpan";
import DefineGrid from "../../gridContents/defineGrid";
import CenterContents from "../../gridContents/centerContents";

interface LootClient {
  lootList: Loot[];
}

interface Loot {
  id: string;
  category: string;
  name_en: string;
  name_kr: string;
  image: string;
  quest_notes: QuestNotes[];
  hideout_notes: HideoutNotes[];
}

interface HideoutNotes {
  name: string;
  count: number;
  item_id: string;
  name_kr: string;
  level_id: string;
  master_id: string;
}

interface QuestNotes {
  id: string;
  name: string;
  count: number;
  in_raid: boolean;
  name_kr: string;
  url_mapping: string;
}

export default function LootClient({ lootList }: LootClient) {
  const { setHideoutCategory, lootCategory } = useAppStore((state) => state);
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, lootList, "LOOT");

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

  const returnHideOutText = (note: HideoutNotes) => {
    return (
      <div className="flex items-center">
        <Link
          href={`/hideout?id=${note.level_id}`}
          scroll={false}
          onClick={() => setHideoutCategory(note.master_id)}
        >
          <TextSpan textColor="GoldenYellow" hoverColor="LightYellow">
            {note.name_kr}
          </TextSpan>
        </Link>
        <TextSpan isCenter={false}>({note.count}개 필요)</TextSpan>
      </div>
    );
  };

  const checkViewLoot = (newCategory: string) => {
    return lootCategory === "ALL" || lootCategory === newCategory;
  };

  return (
    <div className="w-full">
      {lootList.map(
        (loot) =>
          checkViewLoot(loot.category) && (
            <DefineGrid id={loot.id} pageId={pageId} cols="3" key={loot.id}>
              <CenterContents>
                <ImageView
                  src={loot.image}
                  alt={loot.name_en}
                  popWidth={220}
                  popHeight={180}
                  size="240px"
                  wrapWidth={240}
                  wrapHeight={100}
                />
              </CenterContents>
              <CenterContents>
                <TextSpan>{loot.name_kr}</TextSpan>
              </CenterContents>
              <div className="flex flex-col gap-2">
                {loot.quest_notes.length > 0 && (
                  <div className="mb-2">
                    <TextSpan>퀘스트</TextSpan>
                    {loot.quest_notes.map((quest) => (
                      <div key={quest.url_mapping}>
                        {returnQuestText(quest)}
                      </div>
                    ))}
                  </div>
                )}
                {loot.hideout_notes.length > 0 && (
                  <div>
                    <TextSpan>은신처</TextSpan>
                    {loot.hideout_notes.map((hideout, index) => (
                      <div key={`${hideout.level_id}-${index}`}>
                        {returnHideOutText(hideout)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </DefineGrid>
          )
      )}
    </div>
  );
}
