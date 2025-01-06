"use client";

import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";
import DefineGrid from "../../gridContents/defineGrid";
import CenterContents from "../../gridContents/centerContents";
import TextSpan from "../../gridContents/textSpan";

interface StimulantClient {
  medicalList: Stimulant[];
}

interface Stimulant {
  id: string;
  category: string;
  name_kr: string;
  name_en: string;
  image: string;
  short_name: string;
  cures_en: string[];
  cures_kr: string[];
  buff: Effect[];
  debuff: Effect[];
  use_time: number;
  uses: number;
  energy_impact: number;
  hydration_impact: number;
  painkiller_duration: number;
  hitpoints: number;
}
interface Effect {
  id: string;
  type: string;
  delay?: number;
  value: number;
  chance: number;
  krSkill: string;
  duration?: number;
  skillName: string;
}

export default function StimulantClient({ medicalList }: StimulantClient) {
  const { medicalCategory } = useAppStore((state) => state);
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, medicalList, "MEDICAL");

  const checkViewStimulant = (medi: Stimulant) => {
    return (
      (medicalCategory === "ALL" || medicalCategory === "Stimulant") &&
      medi.category === "Stimulant"
    );
  };

  const addPlusMinus = (text: string | number) => {
    if (typeof text === "number") {
      if (text === 0) return "";
      return text > 0 ? `+${text}` : `${text}`;
    }
    return "";
  };

  const checkSkillColor = (text: string) => {
    const blue = ["진통제", "해독제"];
    const red = ["손 떨림", "터널 효과"];

    if (blue.includes(text)) {
      return "BrightCyan";
    } else if (red.includes(text)) {
      return "Red";
    } else {
      return "white";
    }
  };

  const filterStimEffects = (effects: Effect[]) => {
    const seen = new Set();
    for (const effect of effects) {
      const key = `${effect.delay}-${effect.duration}`;
      if (!seen.has(key)) {
        seen.add(key);
      } else if (effect.skillName !== "Painkiller") {
        delete effect.delay;
        delete effect.duration;
      }
    }
    return effects;
  };

  if (medicalCategory !== "ALL" && medicalCategory !== "Stimulant") return null;

  return (
    <div className="w-full">
      {medicalList.map(
        (stimulant) =>
          checkViewStimulant(stimulant) && (
            <DefineGrid
              id={stimulant.id}
              pageId={pageId}
              cols="7"
              key={stimulant.id}
            >
              <CenterContents>
                <ImageView
                  src={stimulant.image}
                  alt={stimulant.name_en}
                  popWidth={260}
                  popHeight={220}
                  size="240px"
                  wrapWidth={240}
                  wrapHeight={100}
                />
              </CenterContents>
              <CenterContents>
                <TextSpan>{stimulant.name_kr}</TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan>-</TextSpan>
              </CenterContents>
              <div className="flex justify-center flex-col">
                {stimulant.buff.length > 0 ? (
                  filterStimEffects(stimulant.buff).map((buff, index) => (
                    <div key={`${index}-buff-${buff.id}`}>
                      {buff.delay != null && buff.duration != null && (
                        <span className="text-center font-bold text-sm text-PaleYellow mt-4 ml-[4px]">
                          {buff.id === "5ed5166ad380ab312177c100"
                            ? `25% 확률 / ${buff.delay}초 지연 / ${buff.duration}초 지속`
                            : buff.delay === 0
                            ? `${buff.duration}초 지속`
                            : `${buff.delay}초 지연 / ${buff.duration}초 지속`}
                        </span>
                      )}
                      <div className={"flex ml-[4px] mt-[2px]"}>
                        <TextSpan>-&nbsp;</TextSpan>
                        <TextSpan textColor={checkSkillColor(buff.krSkill)}>
                          {buff.krSkill}
                        </TextSpan>
                        <TextSpan textColor="BrightCyan">
                          &nbsp;{addPlusMinus(buff.value)}
                        </TextSpan>
                      </div>
                    </div>
                  ))
                ) : (
                  <TextSpan>-</TextSpan>
                )}
              </div>
              <div className="flex justify-center flex-col">
                {stimulant.debuff.length > 0 ? (
                  filterStimEffects(stimulant.debuff).map((debuff, index) => (
                    <div key={`${index}-debuff-${debuff.id}`}>
                      {debuff.delay != null && debuff.duration != null && (
                        <span className="text-center font-bold text-sm text-PaleYellow mt-4 ml-[4px]">
                          {debuff.id === "5ed5166ad380ab312177c100"
                            ? `25% 확률 / ${debuff.delay}초 지연 / ${debuff.duration}초 지속`
                            : debuff.delay === 0
                            ? `${debuff.duration}초 지속`
                            : `${debuff.delay}초 지연 / ${debuff.duration}초 지속`}
                        </span>
                      )}
                      <div className={"flex ml-[4px] mt-[2px]"}>
                        <TextSpan>-&nbsp;</TextSpan>
                        <TextSpan textColor={checkSkillColor(debuff.krSkill)}>
                          {debuff.krSkill}
                        </TextSpan>
                        <TextSpan textColor="BrightCyan">
                          &nbsp;{addPlusMinus(debuff.value)}
                        </TextSpan>
                      </div>
                    </div>
                  ))
                ) : (
                  <TextSpan>-</TextSpan>
                )}
              </div>
              <CenterContents>
                <TextSpan>-</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>-</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
