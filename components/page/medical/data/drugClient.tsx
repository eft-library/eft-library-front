"use client";

import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { DrugClient } from "./medicalTypes";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import { drugTableColumn } from "@/lib/consts/columnConsts";
import {
  filteringData,
  highlightMatchedText,
  hasMatchInList,
  drugText,
} from "@/lib/func/jsxfunction";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { effectI18N, itemDetailI18N } from "@/lib/consts/i18nConsts";

export default function DrugClient({ medicalList, searchWord }: DrugClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <>
      {hasMatchInList(medicalList, searchWord) && (
        <TableColumn
          columnDesign={8}
          columnData={drugTableColumn}
          isNameLarge
        />
      )}

      <div className="w-full">
        {medicalList.map(
          (drug) =>
            filteringData(
              searchWord,
              drug.name.en,
              drug.name.ko,
              drug.name.ja
            ) && (
              <DefineGrid
                cols="8"
                id={drug.id}
                key={drug.id}
                isDetail
                detailLink={`/item/${drug.url_mapping}`}
              >
                <CenterContents>
                  <ImageView
                    src={drug.image}
                    alt={drug.name.en}
                    popWidth={drug.image_width * 128}
                    popHeight={drug.image_height * 128}
                    size={(drug.image_width * 64).toString()}
                    wrapWidth={drug.image_width * 64}
                    wrapHeight={drug.image_height * 64}
                  />
                </CenterContents>
                <CenterContents colSpan="3">
                  {highlightMatchedText(drug.name[localeKey], searchWord)}
                </CenterContents>

                <div className="flex flex-col justify-center ">
                  <span className="font-bold text-base text-PaleYellow mt-[4px]">
                    {drug.info.painkiller_duration}
                    {effectI18N.duration[localeKey]}
                  </span>
                  <div className={"flex mb-[4px]"}>
                    <TextSpan isCenter={false}>-&nbsp;</TextSpan>
                    <TextSpan isCenter={false} textColor="BrightCyan">
                      {effectI18N.painKiller[localeKey]}
                    </TextSpan>
                  </div>
                  {drug.info.hydration_impact > 0 &&
                    drugText("수분", drug.info.hydration_impact, true)}
                  {drug.info.energy_impact > 0 &&
                    drugText("에너지", drug.info.energy_impact, true)}
                </div>

                <CenterContents isCol>
                  {drug.info.hydration_impact < 0 &&
                    drugText("수분", drug.info.hydration_impact, false)}
                  {drug.info.energy_impact < 0 &&
                    drugText("에너지", drug.info.energy_impact, false)}
                </CenterContents>

                <CenterContents>
                  <TextSpan>{drug.info.uses}</TextSpan>
                </CenterContents>

                <CenterContents>
                  <TextSpan>
                    {drug.info.use_time} {itemDetailI18N.sec[localeKey]}
                  </TextSpan>
                </CenterContents>
              </DefineGrid>
            )
        )}
      </div>
    </>
  );
}
