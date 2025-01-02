"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import Link from "next/link";

interface GlassesClient {
  glasses_data: RigData;
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

export default function GlassesClient({
  glasses_data,
  isClass,
}: GlassesClient) {
  const returnQuestText = (note: QuestNotes) => {
    return note.in_raid ? (
      <div className="flex items-center">
        <Link href={`/quest/detail/${note.url_mapping}`} key={note.url_mapping}>
          <span className="font-bold text-lg text-GoldenYellow hover:text-LightYellow">
            {note.name_kr.substring(0, note.name_kr.indexOf("(")).trim()}
          </span>
        </Link>
        <span className="font-bold">&nbsp;(</span>
        <span className="font-bold text-SoftPink text-lg">인레이드&nbsp;</span>
        <span className="font-bold text-lg">{note.count}개 필요)</span>
      </div>
    ) : (
      <div className="flex items-center ">
        <Link href={`/quest/detail/${note.url_mapping}`} key={note.url_mapping}>
          <span className="font-bold text-lg text-GoldenYellow hover:text-LightYellow">
            {note.name_kr.substring(0, note.name_kr.indexOf("(")).trim()}
          </span>
        </Link>
        <span className="font-bold text-lg">&nbsp;({note.count}개 필요)</span>
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
        glasses_data.class_glasses.map((glasses) => (
          <div
            className="w-full grid grid-cols-5 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3"
            key={glasses.id}
          >
            <div className="flex justify-center items-center">
              <Gallery>
                <Item original={glasses.image} width="400" height="380">
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={glasses.image}
                      height={0}
                      width={140}
                      style={{ width: "auto", height: "auto" }}
                      alt={glasses.name}
                      priority
                    />
                  )}
                </Item>
              </Gallery>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {glasses.name}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {glasses.class_value}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {glasses.durability}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {floatToPercent(glasses.blindness_protection)} %
              </span>
            </div>
          </div>
        ))}
      {!isClass &&
        glasses_data.no_class_glasses.map((glasses) => (
          <div
            className="w-full grid grid-cols-4 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3"
            key={glasses.id}
          >
            <div className="flex justify-center items-center">
              <Gallery>
                <Item original={glasses.image} width="400" height="380">
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={glasses.image}
                      height={0}
                      width={140}
                      style={{ width: "auto", height: "auto" }}
                      alt={glasses.name}
                      priority
                    />
                  )}
                </Item>
              </Gallery>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {glasses.name}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {floatToPercent(glasses.blindness_protection)} %
              </span>
            </div>
            <div className="flex items-center">
              {glasses.notes.length > 0 ? (
                <div>
                  <span className="font-bold text-lg text-white">퀘스트</span>
                  {glasses.notes.map((quest) => (
                    <div key={quest.url_mapping}>{returnQuestText(quest)}</div>
                  ))}
                </div>
              ) : (
                <span className="font-bold text-lg">-</span>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
