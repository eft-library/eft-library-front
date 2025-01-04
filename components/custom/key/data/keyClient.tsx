"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { useAppStore } from "@/store/provider";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";

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

  return (
    <div className="w-full">
      {keyList.map(
        (key) =>
          checkViewKey(key.map_value) && (
            <div
              className={`${
                key.id === pageId && "bg-NeutralGray"
              } w-full grid grid-cols-5 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3`}
              key={key.id}
              id={key.id}
            >
              <div className="flex justify-center items-center">
                <Gallery>
                  <Item original={key.image} width="200" height="180">
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={key.image}
                        height={0}
                        width={120}
                        style={{ width: "auto", height: "auto" }}
                        alt={key.name}
                        priority
                      />
                    )}
                  </Item>
                </Gallery>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {key.name}
                </span>
              </div>
              <div className="flex flex-col justify-center items-center">
                {key.use_map_kr.map((area, index) => (
                  <span key={index} className="font-bold text-sm">
                    {area}
                  </span>
                ))}
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {key.uses}
                </span>
              </div>
              <div className="flex items-center">
                {key.notes.length > 0 ? (
                  <div>
                    <span className="font-bold text-sm text-white">퀘스트</span>
                    {key.notes.map((quest) => (
                      <div key={quest.url_mapping}>
                        {returnQuestText(quest)}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="font-bold text-sm">-</span>
                )}
              </div>
            </div>
          )
      )}
    </div>
  );
}
