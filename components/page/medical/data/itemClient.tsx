"use client";

import { useAppStore } from "@/store/provider";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import { checkViewMedical } from "@/lib/func/jsxfunction";

interface ItemClient {
  medicalList: Item[];
}

interface Item {
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
  type: string;
  delay: number;
  value: number;
  chance: number;
  krSkill: string;
  duration: number;
  skillName: string;
}

export default function ItemClient({ medicalList }: ItemClient) {
  const { medicalCategory } = useAppStore((state) => state);
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, medicalList, "MEDICAL");

  if (medicalCategory !== "ALL" && medicalCategory !== "Medical item")
    return null;

  return (
    <div className="w-full">
      {medicalList.map(
        (item) =>
          checkViewMedical(medicalCategory, item.category, "Medical item") && (
            <DefineGrid cols="7" id={item.id} pageId={pageId} key={item.id}>
              <CenterContents>
                <ImageView
                  src={item.image}
                  alt={item.name_en}
                  popWidth={220}
                  popHeight={180}
                  size="240px"
                  wrapWidth={240}
                  wrapHeight={100}
                />
              </CenterContents>

              <CenterContents>
                <TextSpan>{item.name_kr}</TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan>-</TextSpan>
              </CenterContents>

              <CenterContents isCol>
                {item.cures_kr.map((cures, index) => (
                  <TextSpan key={`${index}-cures`} isCenter={false}>
                    {cures}
                  </TextSpan>
                ))}
              </CenterContents>

              <CenterContents>
                <TextSpan>-</TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan>{item.uses}</TextSpan>
              </CenterContents>

              <CenterContents>
                <TextSpan>{item.use_time} 초</TextSpan>
              </CenterContents>
            </DefineGrid>
          )
      )}
    </div>
  );
}
