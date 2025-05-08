"use client";

import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import { hasMatchInList } from "@/lib/func/jsxfunction";
import type { StimulantClient } from "./medicalTypes";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { stimulantTableColumn } from "@/lib/consts/columnConsts";
import {
  filteringData,
  highlightMatchedText,
  checkSkillPlus,
  checkValuePlus,
  noReturnSkill,
  getPlusMinus,
} from "@/lib/func/jsxfunction";
import { useLocale } from "next-intl";
import { getEffectLocalizedKey, getLocaleKey } from "@/lib/func/localeFunction";
import type { StimEffect } from "../../provisions/data/provisionsTypes";
import { effectI18N } from "@/lib/consts/i18nConsts";

export default function StimulantClient({
  medicalList,
  searchWord,
}: StimulantClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <>
      {hasMatchInList(medicalList, searchWord) && (
        <TableColumn columnDesign={3} columnData={stimulantTableColumn} />
      )}

      <div className="w-full">
        {medicalList.map(
          (stimulant) =>
            filteringData(
              searchWord,
              stimulant.name.en,
              stimulant.name.ko,
              stimulant.name.ja
            ) && (
              <DefineGrid
                id={stimulant.id}
                cols="3"
                key={stimulant.id}
                isDetail
                detailLink={`/item/${stimulant.url_mapping}`}
              >
                <CenterContents>
                  <ImageView
                    src={stimulant.image}
                    alt={stimulant.name.en}
                    popWidth={stimulant.image_width * 128}
                    popHeight={stimulant.image_height * 128}
                    size={(stimulant.image_width * 64).toString()}
                    wrapWidth={stimulant.image_width * 64}
                    wrapHeight={stimulant.image_height * 64}
                  />
                </CenterContents>
                <CenterContents>
                  {highlightMatchedText(stimulant.name[localeKey], searchWord)}
                </CenterContents>

                <div className="flex justify-center flex-col">
                  {(() => {
                    const groupedEffects = stimulant.info.stim_effects.reduce<
                      Record<string, StimEffect[]>
                    >((acc, effect) => {
                      const key = `${effect.delay}-${effect.duration}`; // delay-duration 기준 그룹화
                      if (!acc[key]) acc[key] = [];
                      acc[key].push(effect);
                      return acc;
                    }, {} as Record<string, typeof stimulant.info.stim_effects>);

                    const entries = Object.entries(groupedEffects);

                    return entries.length > 0 ? (
                      entries.map(([key, effects]) => {
                        const [delay, duration] = key.split("-");

                        return (
                          <div key={`group-${key}`}>
                            <span className="font-bold text-base text-PaleYellow mt-[4px]">
                              {delay}
                              &nbsp;{effectI18N.delay[localeKey]} / {duration}
                              &nbsp;{effectI18N.duration[localeKey]}
                            </span>
                            {effects.map((effect, index) => (
                              <div
                                key={`effect-${effect.type}-${stimulant.id}-${index}`}
                                className="flex mb-[4px]"
                              >
                                <TextSpan isCenter={false}>-&nbsp;</TextSpan>
                                <TextSpan
                                  isCenter={false}
                                  textColor={checkSkillPlus(
                                    effect.skill_name_en || ""
                                  )}
                                >
                                  {effect[getEffectLocalizedKey(localeKey)]}
                                  &nbsp;
                                </TextSpan>
                                {effect.skill_name_en &&
                                  !noReturnSkill.includes(
                                    effect.skill_name_en
                                  ) && (
                                    <TextSpan
                                      isCenter={false}
                                      textColor={checkValuePlus(effect.value)}
                                    >
                                      {` ${getPlusMinus(effect.value)}`}
                                    </TextSpan>
                                  )}
                              </div>
                            ))}
                          </div>
                        );
                      })
                    ) : (
                      <TextSpan>-</TextSpan>
                    );
                  })()}
                </div>
              </DefineGrid>
            )
        )}
      </div>
    </>
  );
}
