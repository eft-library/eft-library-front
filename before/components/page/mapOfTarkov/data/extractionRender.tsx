"use client";

import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { ExtractionRender } from "./mapOfTarkovType";
import { SquareCheckBig, SquareX } from "lucide-react";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import HtmlWithImage from "@/components/custom/htmlWithImage/htmlWithImage";

export default function ExtractionRender({ extractionInfo }: ExtractionRender) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <DefineGrid cols="13" id={extractionInfo.id}>
      <CenterContents colSpan="2">
        <ImageView
          src={extractionInfo.image}
          alt={extractionInfo.name.en}
          popWidth={1600}
          popHeight={900}
          size="240px"
          wrapWidth={240}
          wrapHeight={130}
        />
      </CenterContents>
      <CenterContents colSpan="2">
        <TextSpan>{extractionInfo.name[localeKey]}</TextSpan>
      </CenterContents>
      <CenterContents>
        <TextSpan>{extractionInfo.faction}</TextSpan>
      </CenterContents>
      <CenterContents>
        <TextSpan>
          {extractionInfo.always_available ? (
            <SquareCheckBig
              color={ALL_COLOR.ScreaminGreen}
              strokeWidth={3}
              size={23}
            />
          ) : (
            <SquareX color={ALL_COLOR.Red} strokeWidth={3} size={25} />
          )}
        </TextSpan>
      </CenterContents>
      <CenterContents>
        <TextSpan>
          {extractionInfo.single_use ? (
            <SquareCheckBig
              color={ALL_COLOR.ScreaminGreen}
              strokeWidth={3}
              size={23}
            />
          ) : (
            <SquareX color={ALL_COLOR.Red} strokeWidth={3} size={25} />
          )}
        </TextSpan>
      </CenterContents>
      <CenterContents colSpan="3">
        {extractionInfo.requirements ? (
          <HtmlWithImage contents={extractionInfo.requirements[localeKey]} />
        ) : (
          <TextSpan>-</TextSpan>
        )}
      </CenterContents>
      <CenterContents colSpan="3">
        {extractionInfo.tip ? (
          <HtmlWithImage contents={extractionInfo.tip[localeKey]} />
        ) : (
          <TextSpan>-</TextSpan>
        )}
      </CenterContents>
    </DefineGrid>
  );
}
