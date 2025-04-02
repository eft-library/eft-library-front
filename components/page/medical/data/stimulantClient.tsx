"use client";

import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import { checkViewMedical, filterStimEffects } from "@/lib/func/jsxfunction";
import type { StimulantClient, Buff, Debuff } from "./medicalTypes";

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

  const checkPlus = (effect: Buff | Debuff) => {
    const red = ["BodyTemperature", "DamageModifier"];
    if (red.includes(effect.type)) {
      if (effect.value == 0) {
        return "white";
      } else if (effect.value > 0) {
        return "Red";
      } else {
        return "BrightCyan";
      }
    }

    if (typeof effect.value === "number") {
      if (effect.value == 0) {
        return "white";
      } else if (effect.value > 0) {
        return "BrightCyan";
      } else {
        return "Red";
      }
    }
  };

  return (
    <div className="w-full">
      {medicalList.map(
        (stimulant) =>
          checkViewMedical(
            medicalCategory,
            stimulant.info.medical_category,
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
                  popWidth={stimulant.image_width * 128}
                  popHeight={stimulant.image_height * 128}
                  size={(stimulant.image_width * 64).toString()}
                  wrapWidth={stimulant.image_width * 64}
                  wrapHeight={stimulant.image_height * 64}
                />
              </CenterContents>
              <CenterContents colSpan="2">
                <TextSpan size="sm">{stimulant.name_kr}</TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan>-</TextSpan>
              </CenterContents>
              <div className="flex justify-center flex-col col-span-2">
                {stimulant.info.buff.length > 0 ? (
                  filterStimEffects(stimulant.info.buff).map((buff, index) => (
                    <div key={`${index}-buff-${buff.skillName}`}>
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
                        <TextSpan size="sm" textColor={checkPlus(buff)}>
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
                {stimulant.info.debuff.length > 0 ? (
                  filterStimEffects(stimulant.info.debuff).map(
                    (debuff, index) => (
                      <div key={`${index}-debuff-${debuff.skillName}`}>
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
                          <TextSpan size="sm" textColor={checkPlus(debuff)}>
                            &nbsp;{getPlusMinusValue(debuff.value)}
                          </TextSpan>
                        </div>
                      </div>
                    )
                  )
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
