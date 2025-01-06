"use client";

import EffectText from "./effectText";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";
import TextSpan from "../../gridContents/textSpan";
import DefineGrid from "../../gridContents/defineGrid";
import CenterContents from "../../gridContents/centerContents";

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
      {provisionsList.map((provisions) => (
        <DefineGrid
          key={provisions.id}
          id={provisions.id}
          cols="8"
          pageId={pageId}
        >
          <CenterContents>
            <ImageView
              src={provisions.image}
              alt={provisions.name_en}
              popWidth={240}
              popHeight={320}
              size="240px"
              wrapWidth={240}
              wrapHeight={100}
            />
          </CenterContents>

          <CenterContents>
            <TextSpan>{provisions.name_kr}</TextSpan>
          </CenterContents>

          <CenterContents>
            <TextSpan textColor={checkPlus(provisions.energy)}>
              {addPlusMinus(provisions.energy)}
            </TextSpan>
          </CenterContents>

          <CenterContents>
            <TextSpan textColor={checkPlus(provisions.hydration)}>
              {addPlusMinus(provisions.hydration)}
            </TextSpan>
          </CenterContents>

          <div className="flex flex-col justify-center col-span-2">
            {provisions.stim_effects.length > 0 ? (
              filterStimEffects(provisions.stim_effects).map(
                (effect, index) => (
                  <EffectText
                    effect={effect}
                    key={`${effect.krSkill}-${index}-${provisions.id}`}
                  />
                )
              )
            ) : (
              <TextSpan>-</TextSpan>
            )}
          </div>

          <div className="flex flex-col justify-center col-span-2">
            {provisions.notes.length > 0 ? (
              <div>
                <TextSpan isCenter={false}>퀘스트</TextSpan>
                {provisions.notes.map((quest) => (
                  <div key={`${provisions.id}-${quest.url_mapping}`}>
                    {returnQuestText(quest)}
                  </div>
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
