"use client";

import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import TextSpan from "../../../custom/gridContents/textSpan";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import {
  checkCategory,
  returnQuestText,
  returnHideOutText,
} from "@/lib/func/jsxfunction";

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

  return (
    <div className="w-full">
      {lootList.map(
        (loot) =>
          checkCategory(loot.category, lootCategory) && (
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
                        {returnHideOutText(hideout, setHideoutCategory)}
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
