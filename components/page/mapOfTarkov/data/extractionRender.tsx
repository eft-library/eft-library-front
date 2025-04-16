"use client";

import ImageView from "../../../custom/imageView/imageView";
import DefineGrid from "../../../custom/gridContents/defineGrid";
import CenterContents from "../../../custom/gridContents/centerContents";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { ExtractionRender } from "./mapOfTarkovType";
import { SquareCheckBig, SquareX } from "lucide-react";

export default function ExtractionRender({ extractionInfo }: ExtractionRender) {
  const formatTextWithLineBreaks = (text: string) => {
    return text.split("\n").map((line) => (
      <span key={line}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <DefineGrid cols="11" id={extractionInfo.id} pageId="extraction">
      <CenterContents colSpan="2">
        <ImageView
          src={extractionInfo.image}
          alt={extractionInfo.name}
          popWidth={1600}
          popHeight={900}
          size="240px"
          wrapWidth={240}
          wrapHeight={130}
        />
      </CenterContents>
      <CenterContents colSpan="2">
        <TextSpan>{extractionInfo.name}</TextSpan>
      </CenterContents>
      <CenterContents>
        <TextSpan>{extractionInfo.faction}</TextSpan>
      </CenterContents>
      <CenterContents>
        <TextSpan>
          {extractionInfo.always_available ? (
            <SquareCheckBig color="#5EFF5E" strokeWidth={3} size={23} />
          ) : (
            <SquareX color="#FF0000" strokeWidth={3} size={25} />
          )}
        </TextSpan>
      </CenterContents>
      <CenterContents>
        <TextSpan>
          {extractionInfo.single_use ? (
            <SquareCheckBig color="#5EFF5E" strokeWidth={3} size={23} />
          ) : (
            <SquareX color="#FF0000" strokeWidth={3} size={25} />
          )}
        </TextSpan>
      </CenterContents>
      <div className="flex justify-center flex-col items-center col-span-2 gap-8">
        {extractionInfo.requirements &&
        extractionInfo.requirements.length > 0 ? (
          extractionInfo.requirements.map((require, index) => (
            <CenterContents key={`${require.image}-${index}`} isCol>
              {require.image && (
                <ImageView
                  src={require.image}
                  alt={require.desc}
                  popWidth={1600}
                  popHeight={900}
                  size="240px"
                  wrapWidth={200}
                  wrapHeight={120}
                />
              )}
              <TextSpan>{formatTextWithLineBreaks(require.desc)}</TextSpan>
            </CenterContents>
          ))
        ) : (
          <TextSpan>-</TextSpan>
        )}
      </div>
      <div className="flex justify-center flex-col items-center col-span-2 gap-8">
        {extractionInfo.tip && extractionInfo.tip.length > 0 ? (
          extractionInfo.tip.map((tip, index) => (
            <CenterContents key={`${tip.image}-${index}`} isCol>
              {tip.image && (
                <ImageView
                  src={tip.image}
                  alt={tip.desc}
                  popWidth={1600}
                  popHeight={900}
                  size="240px"
                  wrapWidth={200}
                  wrapHeight={120}
                />
              )}
              <TextSpan>{formatTextWithLineBreaks(tip.desc)}</TextSpan>
            </CenterContents>
          ))
        ) : (
          <TextSpan>-</TextSpan>
        )}
      </div>
    </DefineGrid>
  );
}
