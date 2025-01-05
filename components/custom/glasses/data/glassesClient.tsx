"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import Link from "next/link";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import { useSearchParams } from "next/navigation";

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

  const floatToPercent = (value: number) => {
    if (value !== 0) {
      return Math.round(value * 100);
    } else {
      return value;
    }
  };

  return (
    <div className="w-full">
      {isClass &&
        glassesData.class_glasses.map((glasses) => (
          <div
            className={`${
              glasses.id === pageId && "bg-NeutralGray"
            } w-full grid grid-cols-5 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3`}
            key={glasses.id}
            id={glasses.id}
          >
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center relative w-[240px] h-[100px]">
                <Gallery>
                  <Item original={glasses.image} width="220" height="180">
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={glasses.image}
                        fill
                        sizes="240px"
                        style={{ objectFit: "contain" }}
                        alt={glasses.name}
                        priority
                      />
                    )}
                  </Item>
                </Gallery>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {glasses.name}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {glasses.class_value}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {glasses.durability}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {floatToPercent(glasses.blindness_protection)} %
              </span>
            </div>
          </div>
        ))}
      {!isClass &&
        glassesData.no_class_glasses.map((glasses) => (
          <div
            className={`${
              glasses.id === pageId && "bg-NeutralGray"
            } w-full grid grid-cols-4 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3`}
            key={glasses.id}
            id={glasses.id}
          >
            <div className="flex justify-center items-center">
              <div className="flex justify-center items-center relative w-[240px] h-[100px]">
                <Gallery>
                  <Item original={glasses.image} width="300" height="200">
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={glasses.image}
                        fill
                        sizes="240px"
                        style={{ objectFit: "contain" }}
                        alt={glasses.name}
                        priority
                      />
                    )}
                  </Item>
                </Gallery>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {glasses.name}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {floatToPercent(glasses.blindness_protection)} %
              </span>
            </div>
            <div className="flex items-center">
              {glasses.notes.length > 0 ? (
                <div>
                  <span className="font-bold text-sm text-white">퀘스트</span>
                  {glasses.notes.map((quest) => (
                    <div key={quest.url_mapping}>{returnQuestText(quest)}</div>
                  ))}
                </div>
              ) : (
                <span className="font-bold text-sm">-</span>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
