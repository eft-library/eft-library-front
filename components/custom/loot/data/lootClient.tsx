"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import Link from "next/link";
import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";

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
          <span className="font-bold text-sm text-GoldenYellow hover:text-LightYellow">
            {note.name_kr.substring(0, note.name_kr.indexOf("(")).trim()}
          </span>
        </Link>
        <span className="font-bold">&nbsp;(</span>
        <span className="font-bold text-SoftPink text-sm">인레이드&nbsp;</span>
        <span className="font-bold text-sm">{note.count}개 필요)</span>
      </div>
    ) : (
      <div className="flex items-center ">
        <Link href={`/quest/detail/${note.url_mapping}`} key={note.url_mapping}>
          <span className="font-bold text-sm text-GoldenYellow hover:text-LightYellow">
            {note.name_kr.substring(0, note.name_kr.indexOf("(")).trim()}
          </span>
        </Link>
        <span className="font-bold text-sm">&nbsp;({note.count}개 필요)</span>
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
          <span className="font-bold text-GoldenYellow text-sm hover:text-LightYellow">
            {note.name_kr}
          </span>
        </Link>
        <span className="font-bold text-sm text-white">
          &nbsp;({note.count}개 필요)
        </span>
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
            <div
              className={`${
                loot.id === pageId && "bg-NeutralGray"
              } w-full grid grid-cols-3 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3`}
              key={loot.id}
              id={loot.id}
            >
              <div className="flex justify-center items-center">
                <div className="flex justify-center items-center relative w-[240px] h-[100px]">
                  <Gallery>
                    <Item original={loot.image} width="220" height="180">
                      {({ ref, open }) => (
                        <Image
                          ref={ref}
                          onClick={open}
                          src={loot.image}
                          fill
                          sizes="240px"
                          style={{ objectFit: "contain" }}
                          alt={loot.name_en}
                          priority
                        />
                      )}
                    </Item>
                  </Gallery>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {loot.name_kr}
                </span>
              </div>
              <div className="flex flex-col ">
                {loot.quest_notes.length > 0 && (
                  <div className="mb-2">
                    <span className="font-bold text-sm text-white">퀘스트</span>
                    {loot.quest_notes.map((quest) => (
                      <div key={quest.url_mapping}>
                        {returnQuestText(quest)}
                      </div>
                    ))}
                  </div>
                )}
                {loot.hideout_notes.length > 0 && (
                  <div>
                    <span className="font-bold text-sm text-white">은신처</span>
                    {loot.hideout_notes.map((hideout, index) => (
                      <div key={`${hideout.level_id}-${index}`}>
                        {returnHideOutText(hideout)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
      )}
    </div>
  );
}
