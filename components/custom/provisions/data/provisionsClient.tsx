"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import EffectText from "./effectText";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";

interface ProvisionsList {
  provisionsList: Provisions[];
}

interface Provisions {
  id: string;
  name_kr: string;
  name_en: string;
  image: string;
  category: string;
  short_name: string;
  energy: number;
  hydration: number;
  stim_effects: StimEffet[];
  notes: QuestNotes[];
}
interface StimEffet {
  type: string;
  delay?: number;
  value: number;
  krSkill: string;
  duration?: number;
  skillName: string;
}

interface QuestNotes {
  id: string;
  name: string;
  count: number;
  in_raid: boolean;
  name_kr: string;
  url_mapping: string;
}

export default function ProvisionsClient({ provisionsList }: ProvisionsList) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, provisionsList);

  const checkPlus = (effect: number | string) => {
    if (typeof effect === "number") {
      if (effect == 0) {
        return "text-white";
      } else if (effect > 0) {
        return "text-BrightCyan";
      } else {
        return "text-Red";
      }
    }
  };

  const addPlusMinus = (text: number | string) => {
    if (typeof text === "number") {
      if (text > 0) {
        return `+${text}`;
      } else {
        return text;
      }
    }
  };

  const filterStimEffects = (effects: StimEffet[]) => {
    const seen = new Set();
    return effects.filter((effect) => {
      const key = `${effect.delay}-${effect.duration}`;
      if (!seen.has(key)) {
        seen.add(key);
        return true;
      } else if (effect.skillName !== "Painkiller") {
        delete effect.delay;
        delete effect.duration;
        return true;
      }
      return false;
    });
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
      {provisionsList.map((provisions) => (
        <div
          className={`${
            provisions.id === pageId && "bg-NeutralGray"
          } w-full grid grid-cols-8 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3`}
          key={provisions.id}
          id={provisions.id}
        >
          <div className="flex justify-center items-center">
            <Gallery>
              <Item original={provisions.image} width="200" height="320">
                {({ ref, open }) => (
                  <Image
                    ref={ref}
                    onClick={open}
                    src={provisions.image}
                    height={0}
                    width={120}
                    style={{ width: "auto", height: "auto" }}
                    alt={provisions.short_name}
                    priority
                  />
                )}
              </Item>
            </Gallery>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-sm">
              {provisions.name_kr}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span
              className={`text-center font-bold text-sm ${checkPlus(
                provisions.energy
              )}`}
            >
              {addPlusMinus(provisions.energy)}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span
              className={`text-center font-bold text-sm ${checkPlus(
                provisions.hydration
              )}`}
            >
              {addPlusMinus(provisions.hydration)}
            </span>
          </div>
          <div className="flex flex-col justify-center col-span-2 gap-1">
            {provisions.stim_effects.length > 0 ? (
              filterStimEffects(provisions.stim_effects).map(
                (effect, index) => (
                  <EffectText
                    effect={effect}
                    key={`${effect.krSkill}-${index}`}
                  />
                )
              )
            ) : (
              <span className="font-bold text-sm">-</span>
            )}
          </div>
          <div className="flex items-center col-span-2">
            {provisions.notes.length > 0 ? (
              <div>
                <span className="font-bold text-sm text-white">퀘스트</span>
                {provisions.notes.map((quest) => (
                  <div key={quest.url_mapping}>{returnQuestText(quest)}</div>
                ))}
              </div>
            ) : (
              <span className="text-center font-bold text-sm">-</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
