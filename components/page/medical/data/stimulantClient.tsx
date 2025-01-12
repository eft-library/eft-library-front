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
  filterStimEffects,
  checkPlus,
} from "@/lib/func/jsxfunction";
import type { StimulantClient } from "./medicalTypes";

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

  const getPlusMinusValue = (text: number | string) => {
    if (typeof text === "number") {
      if (text === 0) return "";
      return text > 0 ? `+${text}` : `${text}`;
    }
    return "";
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
              cols="10"
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
              <CenterContents colSpan="2">
                <TextSpan size="sm">{stimulant.name_kr}</TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan>-</TextSpan>
              </CenterContents>
              <div className="flex justify-center flex-col col-span-2">
                {stimulant.buff.length > 0 ? (
                  filterStimEffects(stimulant.buff).map((buff, index) => (
                    <div key={`${index}-buff-${buff.id}`}>
                      {buff.delay != null && buff.duration != null && (
                        <span className="text-center font-bold text-sm text-PaleYellow mt-4 ml-[4px]">
                          {stimulant.id === "5ed5166ad380ab312177c100"
                            ? `25% 확률 / ${buff.delay}초 지연 / ${buff.duration}초 지속`
                            : buff.delay === 0
                            ? `${buff.duration}초 지속`
                            : `${buff.delay}초 지연 / ${buff.duration}초 지속`}
                        </span>
                      )}
                      <div className={"flex ml-[4px] mt-[2px]"}>
                        <TextSpan size="sm">-&nbsp;</TextSpan>
                        <TextSpan
                          size="sm"
                          textColor={getSkillColor(buff.krSkill)}
                        >
                          {buff.krSkill}
                        </TextSpan>
                        <TextSpan size="sm" textColor={checkPlus(buff.value)}>
                          &nbsp;{getPlusMinusValue(buff.value)}
                        </TextSpan>
                      </div>
                    </div>
                  ))
                ) : (
                  <TextSpan>-</TextSpan>
                )}
              </div>
              <div className="flex justify-center flex-col col-span-2">
                {stimulant.debuff.length > 0 ? (
                  filterStimEffects(stimulant.debuff).map((debuff, index) => (
                    <div key={`${index}-debuff-${debuff.id}`}>
                      {debuff.delay != null && debuff.duration != null && (
                        <span className="text-center font-bold text-sm text-PaleYellow mt-4 ml-[4px]">
                          {stimulant.id === "5ed5166ad380ab312177c100"
                            ? `25% 확률 / ${debuff.delay}초 지연 / ${debuff.duration}초 지속`
                            : debuff.delay === 0
                            ? `${debuff.duration}초 지속`
                            : `${debuff.delay}초 지연 / ${debuff.duration}초 지속`}
                        </span>
                      )}
                      <div className={"flex ml-[4px] mt-[2px]"}>
                        <TextSpan size="sm">-&nbsp;</TextSpan>
                        <TextSpan
                          size="sm"
                          textColor={getSkillColor(debuff.krSkill)}
                        >
                          {debuff.krSkill}
                        </TextSpan>
                        <TextSpan size="sm" textColor={checkPlus(debuff.value)}>
                          &nbsp;{getPlusMinusValue(debuff.value)}
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
