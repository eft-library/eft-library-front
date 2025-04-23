"use client";

import { useSearchParams } from "next/navigation";
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
} from "@/lib/func/jsxfunction";

export default function DrugClient({ medicalList, searchWord }: DrugClient) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";

  const drugText = (label: string, value: number, positive: boolean) => {
    return (
      <div className={"flex mb-[4px]"}>
        <TextSpan isCenter={false}>{label} :&nbsp;</TextSpan>
        <TextSpan isCenter={false} textColor={positive ? "BrightCyan" : "Red"}>
          {value}
        </TextSpan>
      </div>
    );
  };

  return (
    <>
      {hasMatchInList(medicalList, searchWord) && (
        <TableColumn columnDesign={7} columnData={drugTableColumn} isMedical />
      )}

      <div className="w-full">
        {medicalList.map(
          (drug) =>
            filteringData(
              searchWord,
              drug.name_en,
              drug.name_kr,
              drug.name_kr
            ) && (
              <DefineGrid
                cols="7"
                id={drug.id}
                pageId={pageId}
                key={drug.id}
                isDetail
                detailLink={`/item/${drug.url_mapping}`}
              >
                <CenterContents>
                  <ImageView
                    src={drug.image}
                    alt={drug.name_en}
                    popWidth={drug.image_width * 128}
                    popHeight={drug.image_height * 128}
                    size={(drug.image_width * 64).toString()}
                    wrapWidth={drug.image_width * 64}
                    wrapHeight={drug.image_height * 64}
                  />
                </CenterContents>
                <CenterContents colSpan="2">
                  {highlightMatchedText(drug.name_kr, searchWord)}
                </CenterContents>

                <div className="flex flex-col justify-center ">
                  <span className="font-bold text-base text-PaleYellow mt-[4px]">
                    {drug.info.painkiller_duration}초 지속
                  </span>
                  <div className={"flex mb-[4px]"}>
                    <TextSpan isCenter={false}>-&nbsp;</TextSpan>
                    <TextSpan isCenter={false} textColor="BrightCyan">
                      진통제
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
                  <TextSpan>{drug.info.use_time} 초</TextSpan>
                </CenterContents>
              </DefineGrid>
            )
        )}
      </div>
    </>
  );
}
