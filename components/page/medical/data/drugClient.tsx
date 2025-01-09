"use client";

import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import { checkViewMedical } from "@/lib/func/jsxfunction";
import type { DrugClient } from "./medicalTypes";

export default function DrugClient({ medicalList }: DrugClient) {
  const { medicalCategory } = useAppStore((state) => state);
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, medicalList, "MEDICAL");

  if (medicalCategory !== "ALL" && medicalCategory !== "Drug") return null;

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
    <div className="w-full">
      {medicalList.map(
        (drug) =>
          checkViewMedical(medicalCategory, drug.category, "Drug") && (
            <DefineGrid cols="10" id={drug.id} pageId={pageId} key={drug.id}>
              <CenterContents>
                <ImageView
                  src={drug.image}
                  alt={drug.name_en}
                  popWidth={220}
                  popHeight={180}
                  size="240px"
                  wrapWidth={240}
                  wrapHeight={100}
                />
              </CenterContents>
              <CenterContents colSpan="2">
                <TextSpan size="sm">{drug.name_kr}</TextSpan>
              </CenterContents>
              <CenterContents>
                <TextSpan>-</TextSpan>
              </CenterContents>

              <div className="flex flex-col justify-center col-span-2">
                <span className="font-bold text-base text-PaleYellow mt-[4px]">
                  {drug.painkiller_duration}초 지속
                </span>
                <div className={"flex mb-[4px]"}>
                  <TextSpan isCenter={false}>-&nbsp;</TextSpan>
                  <TextSpan isCenter={false} textColor="BrightCyan">
                    진통제
                  </TextSpan>
                </div>
                {drug.hydration_impact > 0 &&
                  drugText("수분", drug.hydration_impact, true)}
                {drug.energy_impact > 0 &&
                  drugText("에너지", drug.energy_impact, true)}
              </div>

              <CenterContents isCol colSpan="2">
                {drug.hydration_impact < 0 &&
                  drugText("수분", drug.hydration_impact, false)}
                {drug.energy_impact < 0 &&
                  drugText("에너지", drug.energy_impact, false)}
              </CenterContents>

              <CenterContents>
                <TextSpan>{drug.uses}</TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan>{drug.use_time} 초</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
