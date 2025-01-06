"use client";

import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import {
  checkViewMedical,
  getPlusMinus,
  filterStimEffects,
} from "@/lib/func/jsxfunction";

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

  if (medicalCategory !== "ALL" && medicalCategory !== "Stimulant") return null;

  const getSkillColor = (text: string) => {
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

  return (
    <div className="w-full">
      {medicalList.map(
        (stimulant) =>
          checkViewMedical(
            medicalCategory,
            stimulant.category,
            "Stimulant"
          ) && (
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
                        <TextSpan textColor={getSkillColor(buff.krSkill)}>
                          {buff.krSkill}
                        </TextSpan>
                        <TextSpan textColor="BrightCyan">
                          &nbsp;{getPlusMinus(buff.value)}
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
                        <TextSpan textColor={getSkillColor(debuff.krSkill)}>
                          {debuff.krSkill}
                        </TextSpan>
                        <TextSpan textColor="BrightCyan">
                          &nbsp;{getPlusMinus(debuff.value)}
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
